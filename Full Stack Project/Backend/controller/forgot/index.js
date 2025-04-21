import { status } from "../../statusCode/index.js";
import { userCommon } from "../../common/index.js";
import DotEnv from "dotenv";
import nodeMailer from "nodemailer";

DotEnv.config({path:`.env.${process.env.ENVIRONMENT || "development"}`});
const statusCode = status.statusCode;
const statusMessage = status.statusMessage;

const transport = nodeMailer.createTransport({
    service: 'gmail',
    auth:{
        user:"bobmurugan51@gmail.com",
        pass:'iqng gkbr ecxk vpuw',
    }
})

const newOTP = Math.floor(100000 + Math.random() * 900000);

async function verifyEmail (req, res) {
    const { email } = req.body;
    const responce = { status:null, msg:null };
    const is_deleted = false;
    const verifyData = {
        ...( email ) && { email },
        ...( is_deleted !== undefined ) && { is_deleted }
    };
    const arReqField = ["email","is_deleted"];
    const query = "SELECT * FROM users WHERE email = $1 AND is_deleted = $2";
    const queryValue = await userCommon.getMissingValue(arReqField,verifyData);

    if(queryValue.arMissField.length === 0 && queryValue.queryValue.length > 0 && queryValue.status === statusCode.OK){
        
        const queryData = await userCommon.getQueryValue(query,queryValue);
        const fullname = queryData.status === statusCode.OK && queryData.userData.length > 0 ? queryData.userData[0].firstname.charAt(0).toUpperCase() + queryData.userData[0].firstname.slice(1).toLowerCase() + " " + queryData.userData[0].lastname.charAt(0).toUpperCase() + queryData.userData[0].lastname.slice(1).toLowerCase() : '';
        
        if(queryData.status === statusCode.OK && queryData.userData.length > 0 && fullname !== "") {

            const otp_expiry = new Date();
            otp_expiry.setMinutes(otp_expiry.getMinutes() + 10);
            
            const updateUserId = queryData.userData.length > 0 && queryData.status === statusCode.OK ? queryData.userData[0].id : undefined;
            const updateValue = {
                ...( newOTP ) && { newOTP },
                ...( otp_expiry ) && { otp_expiry },
                ...( updateUserId ) && { updateUserId },
            };
            const query = "UPDATE users SET otp = $1, otp_expiry = $2 WHERE id = $3";
            const arReqField = ["newOTP", "otp_expiry", "updateUserId"];
            const queryValue = await userCommon.getMissingValue(arReqField, updateValue);

            if(queryValue.status === statusCode.OK && queryValue.arMissField.length === 0 && queryValue.queryValue.length > 0) {
                const updateData = await userCommon.getQueryValue(query, queryValue);

                if(updateData.status === statusCode.OK && updateData.userData.length === 0){
                    const mailOption  = {
                        from:'bobmurugan51@gmail.com',
                        to:email,
                        subject:'Use This OTP to Verify Your Identity',
                        text:`Dear ${fullname},\n   \nTo complete your verification,Please use the One-Time-Password (OTP) provided below\n \nOTP Code:${newOTP}\n \nThis code is valid for 10 minutes. Do not share it with anyone. if you did not request this code, please ignore this email.\n \nBest regards,\nVitamins Medicine Shop`,
                    };
                    const sendEmail = await userCommon.sendEmail(mailOption);
                    
                    if(sendEmail.status === statusCode.OK){
                        responce.status = sendEmail.status;
                        responce.msg = sendEmail.msg;
                        responce.userData = queryData.userData;
                    } else {
                        responce.status = sendEmail.status;
                        responce.msg = sendEmail.msg;
                        responce.error = sendEmail.error;
                    }
                } else {
                    responce.status = updateData.status;
                    responce.msg = updateData.msg;
                    responce.error = updateData.error;
                }
            } else {
                responce.status = queryValue.status;
                responce.msg = queryValue.msg;
                responce.arMissField = queryValue.arMissField;
            }
        } else {
            responce.status = queryData.status;
            responce.msg = queryData.msg;
            responce.error = queryData.error;
        }
    } else {
        responce.status = queryValue.status;
        responce.msg = queryValue.msg;
        responce.arMissField = queryValue.arMissField;
    }

    res.status(statusCode.OK).send(responce);
}


async function verifyOtp(req,res){
    const { email, otp } = req.body;
    const responce = { status: null, msg:null };
    const is_deleted =  false;
    const query = "SELECT * FROM users WHERE email = $1 AND otp = $2 AND is_deleted = $3";
    const arReqField = ["email", "otp", "is_deleted"];
    const queryValue = {
        ...(email !== undefined && email !== null && email !== "") && { email },
        ...(otp !== undefined && otp !== null && otp !== "") && { otp },
        ...(is_deleted !== undefined && is_deleted !== null && is_deleted !== "") && { is_deleted },
    };
        
    const missingValue = await userCommon.getMissingValue(arReqField, queryValue);
    
    if(missingValue.status === statusCode.OK && missingValue.arMissField.length === 0 && missingValue.queryValue.length > 0){

        const queryData = await userCommon.getQueryValue(query,missingValue);
        
        if(queryData.status === statusCode.OK && queryData.userData.length > 0) {
            
            const database = queryData.userData.length > 0 && queryData.status === statusCode.OK ? new Date(queryData.userData[0].otp_expiry) : '';
            const databaseDate = database.getFullYear() + "-" + String(database.getMonth() + 1).padStart(2, "0") + "-" + String(database.getDate()).padStart(2, "0") + " " + String(database.getHours()).padStart(2, "0") + ":" + String(database.getMinutes()).padStart(2, "0") + ":" + String(database.getSeconds()).padStart(2, "0");
            const current = new Date();
            const currentDate = current.getFullYear() + "-" + String(current.getMonth() + 1).padStart(2, "0") + "-" + String(current.getDate()).padStart(2, "0") + " " + String(current.getHours()).padStart(2, "0") + ":" + String(current.getMinutes()).padStart(2, "0") + ":" + String(current.getSeconds()).padStart(2, "0");
            
            if(currentDate < databaseDate && databaseDate !== "") {
                responce.status = statusCode.OK;
                responce.userData = queryData.userData;
                responce.msg = statusMessage[statusCode.OK];
            } else {
                responce.status = statusCode.OTP_EXPIRED;
                responce.msg = statusMessage[statusCode.OTP_EXPIRED];
            }
        } else {
            responce.status = statusCode.INVALID_OTP;
            responce.msg = statusMessage[statusCode.INVALID_OTP];
        }

    } else {
        responce.status = missingValue.status;
        responce.arMissField = missingValue.arMissField;
        responce.msg = missingValue.msg;
    }
    
    res.status(statusCode.OK).send(responce);
};

async function changePassword(req, res){
    const { password, email } = req.body;
    const responce = { status: null, msg:null };
    const is_deleted =  false;
    const query = "SELECT * FROM users WHERE email = $1 AND is_deleted = $2";
    const arReqField = ["email", "is_deleted"];
    const queryValue = {
        ...(email !== undefined && email !== null && email !== "") && { email },
        ...(is_deleted !== undefined && is_deleted !== null && is_deleted !== "") && { is_deleted },
    };
        
    const missingValue = await userCommon.getMissingValue(arReqField, queryValue);

    if(missingValue.status === statusCode.OK && missingValue.arMissField.length === 0 && missingValue.queryValue.length > 0){
        const queryData = await userCommon.getQueryValue(query,missingValue);

        if(queryData.status === statusCode.OK && queryData.userData.length > 0) {
            const updateUserId = queryData.status === statusCode.OK && queryData.userData.length > 0 ? queryData.userData[0].id : '';
            const arReqField = ["password", "updateUserId"];
            const queryValue = {
                ...(password !== undefined && password !== null && password !== "") && { password },
                ...(updateUserId  !== undefined && updateUserId !== null && updateUserId !== "") && { updateUserId},
            };
            const updateValue = await userCommon.getMissingValue(arReqField, queryValue);
            
            if(updateValue.status === statusCode.OK && updateValue.arMissField.length === 0 && updateValue.queryValue.length > 0){
                const updateQuery = "UPDATE users SET password = $1 WHERE id = $2"
                const updateData = await userCommon.getQueryValue(updateQuery,updateValue);
                if(updateData.status === statusCode.OK){
                    responce.status = statusCode.OK;
                    responce.msg = statusMessage[statusCode.OK];
                } else {
                    responce.status = updateData.status;
                    responce.error = updateData.error;
                    responce.msg = updateData.msg;
                }
            } else {
                responce.status = updateValue.status;
                responce.arMissField = updateValue.arMissField;
                responce.msg = updateValue.msg;
            }
        } else {
            responce.status = queryData.status;
            responce.msg = queryData.msg;
            responce.error = queryData.error;
        }
    } else {
        responce.status = missingValue.status;
        responce.arMissField = missingValue.arMissField;
        responce.msg = missingValue.msg;
    }
    
    res.status(statusCode.OK).send(responce);
};

export const userForgot = {
    verifyEmail,
    verifyOtp,
    changePassword,
};