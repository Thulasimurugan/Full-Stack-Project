import { status } from "../statusCode/index.js";
import bcrypt from 'bcryptjs';
import Jwt  from "jsonwebtoken";
import DotEnv from 'dotenv';
import pool from "../service/index.js";
import nodeMailer from 'nodemailer';

DotEnv.config({path:`.env.${process.env.ENVIRONMENT || "development"}`});
const statusCode = status.statusCode;
const statusMessage = status.statusMessage;

const transport = nodeMailer.createTransport({
    service: 'gmail',
    auth:{
        user:"bobmurugan51@gmail.com",
        pass:'iqng gkbr ecxk vpuw',
    }
});



async function generateToken(email, password, role){
    const responce = { status:null,msg:null};
    
    if(email !== undefined && password !== undefined && role !== undefined && process.env.JWT_SECRET_KEY !== undefined){
        const expiryTime = new Date();
        expiryTime.setHours(expiryTime.getHours() + 1);
        const time = await userCommon.generateDate(expiryTime);
        try{
            const token = Jwt.sign({email, password, role, time: time},process.env.JWT_SECRET_KEY,{algorithm:"HS256",expiresIn: "1h"});
            responce.token = 'bearer:' + " " + token;
            responce.status = statusCode.OK;
            responce.msg = statusMessage[statusCode.OK];
        } catch(err){
            responce.status = statusCode.INVALID_USER;
            responce.msg = statusMessage[statusCode.INVALID_USER];
        }
    } else {
        responce.status = statusCode.INVALID_USER;
        responce.msg = statusMessage[statusCode.INVALID_USER];
    }
    return responce;
};

async function generateRefreshToken(email, password, role){
    const responce = { status:null,msg:null };
    if(email !== undefined && password !== undefined && role !== undefined && process.env.JWT_SECRET_KEY !== undefined){
        const expiryTime = new Date();
        expiryTime.setHours(expiryTime.getDate() + 1);
        const time = await userCommon.generateDate(expiryTime);
        try{
            const token = Jwt.sign({email, password, role, time: time},process.env.JWT_SECRET_KEY,{algorithm:"HS256",expiresIn: "1d"});
            responce.token = 'bearer:' + " " + token;
            responce.status = statusCode.OK;
            responce.msg = statusMessage[statusCode.OK];
        } catch(err){
            responce.status = statusCode.INVALID_USER;
            responce.msg = statusMessage[statusCode.INVALID_USER];
        }
    } else {
        responce.status = statusCode.INVALID_USER;
        responce.msg = statusMessage[statusCode.INVALID_USER];
    }
    return responce;
};

async function verifyUserToken(token){
    const responce = { status:null, msg:null, tokenDetail:[] };
    
    try{
        responce.tokenDetail.push(Jwt.verify(token, process.env.JWT_SECRET_KEY));
        responce.status = statusCode.OK;
        responce.msg = statusMessage[statusCode.OK];
    } catch(err){
        responce.status = statusCode.INVALID_TOKEN;
        responce.error = err.message;
        responce.msg = statusMessage[statusCode.INVALID_TOKEN];
        if(err.name === "TokenExpiredError"){
            responce.status = statusCode.TOKEN_EXPIRED;
            responce.error = err.message;
            responce.msg = statusMessage[statusCode.TOKEN_EXPIRED];
        }
    }

    return responce;
};

async function hashPassword(objValueField){

    if(objValueField.password){
        const hashSalt = 10;
        objValueField.password = await bcrypt.hash(objValueField.password, hashSalt);
    } else {
        delete objValueField.password;
    }

    return objValueField;

}

async function hashVerifyPassword(verifyPassword, checkPassword){
    
    if(verifyPassword.status === statusCode.OK, verifyPassword.userData.length > 0 && verifyPassword.userData[0].password !== "" && checkPassword !== ""){
        verifyPassword.isVerify = await bcrypt.compare(checkPassword, verifyPassword.userData[0].password);
    } else {
        verifyPassword.status = statusCode.USER_NOT_FOUND;
        verifyPassword.msg = statusMessage[statusCode.USER_NOT_FOUND];
        verifyPassword.isVerify = false;
    }

    return verifyPassword;
}

async function getMissingValue(arReqField,objValueField) {
    const responce = { status:null, msg: null, arMissField:[], queryValue:[]}

    const hashPassword = await userCommon.hashPassword(objValueField);
    
    arReqField.forEach((value) => {
        if(hashPassword && hashPassword.hasOwnProperty(value)){
            responce.status = statusCode.OK;
            responce.msg = statusMessage[statusCode.OK];
        } else {
            responce.status = statusCode.MISSING_FIELDVALUES;
            responce.msg = statusMessage[statusCode.MISSING_FIELDVALUES];
            responce.arMissField.push(value);
        }
    });

    if(responce.status === statusCode.OK && responce.arMissField.length === 0){
        responce.queryValue = Object.values(hashPassword);
    } else {
        responce.status = statusCode.MISSING_FIELDVALUES;
        responce.msg = statusMessage[statusCode.MISSING_FIELDVALUES];
    }

    return responce;
}

async function getQueryValue(query,queryResponce) {
    const responce = {status:null, msg:null, userData:[]};
    
    if(queryResponce.arMissField.length === 0 && queryResponce.status === statusCode.OK && queryResponce.queryValue.length > 0){
        try {
            const result = await pool.query(query,[...queryResponce.queryValue]);
            
            if(result.rowCount !== 0){
                responce.userData = result.rowCount !== 0 && result.rows.length > 0 ? result.rows : [];
                responce.status = statusCode.OK;
                responce.msg = statusMessage[statusCode.OK];
            } else {
                responce.status = statusCode.USER_NOT_FOUND;
                responce.msg = statusMessage[statusCode.USER_NOT_FOUND];
            }
        } catch (err) {
            responce.status = statusCode.SERVER_ERROR;
            responce.error = err.message;
            responce.msg = statusMessage[statusCode.SERVER_ERROR];
        }
    } else {
        responce.status = statusCode.INVALID_USER_DETAILS;
        responce.msg = statusMessage[statusCode.INVALID_USER_DETAILS];
    };

    return responce;
};

async function generateDate(date){
    var currentDate; 
    if(date){
        currentDate = String( date.getFullYear()) + "-" + String( date.getMonth() + 1).padStart(2, "0") + "-" + String( date.getDate() ).padStart(2, "0") + " " + String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0") + ":" + String(date.getSeconds()).padStart(2, "0");
    } else {
        currentDate;
    }

    return currentDate;
};

async function sendEmail(mailOption){
    const responce = { status:null, msg:null};
    try {
        responce.status = statusCode.OK;
        responce.msg = statusMessage[statusCode.OK];
        await transport.sendMail(mailOption);
    } catch (err) {
        responce.status = statusCode.EMAIL_NOT_SENDED;
        responce.error = err.message;
        responce.msg = statusMessage[statusCode.EMAIL_NOT_SENDED];
    }

    return responce;

};

export const userCommon = {
    generateToken,
    generateRefreshToken,
    getQueryValue,
    getMissingValue,
    hashPassword,
    hashVerifyPassword,
    generateDate,
    verifyUserToken,
    sendEmail,
}