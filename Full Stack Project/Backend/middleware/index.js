import { status } from "../statusCode/index.js";
import { userCommon } from "../common/index.js";
import Jwt from "jsonwebtoken";
import DotEnv from "dotenv";

const statusCode = status.statusCode;
const statusMessage = status.statusMessage;

async function verifyUser(req, res, next) {
    const { email, token } = req.body;
    const responce = {status:null, msg:null};
    const is_deleted = false;
    const userLogin = {
        ...(email !== undefined && email !== "") && { email },
        ...(is_deleted !== undefined && is_deleted !== "") && { is_deleted },
    };
    const arReqField = ["email", "is_deleted"];
    const query = "SELECT * FROM users WHERE email = $1 AND is_deleted = $2";
    const queryValue = await userCommon.getMissingValue(arReqField,userLogin);

    if(queryValue.arMissField.length === 0 && queryValue.queryValue.length > 0 && queryValue.status === statusCode.OK){
        const result = await userCommon.getQueryValue(query, queryValue);
        
        if(result.status === statusCode.OK && result.userData.length > 0){
            const userLogin = {
                ...(token !== undefined && token !== "" && token !== null) && { token },
            };
            const arReqField = ["token"];
            const tokenValue = await userCommon.getMissingValue(arReqField,userLogin);

            if(tokenValue.arMissField.length === 0 && tokenValue.queryValue.length > 0 && tokenValue.status === statusCode.OK){
                const token = tokenValue.status === statusCode.OK && tokenValue.queryValue.length > 0 && tokenValue.arMissField.length === 0 ? tokenValue.queryValue[0].split('bearer: ').join("") : '';
                const verifyToken = await userCommon.verifyUserToken(token);
                    
                if(verifyToken.status === statusCode.OK && verifyToken.tokenDetail.length > 0){
                    if(verifyToken.status === statusCode.OK && verifyToken.tokenDetail[0].email === email) {
                        return next();
                    } else {
                        responce.status = statusCode.MISSMATCH_EMAIL;
                        responce.msg = statusMessage[statusCode.MISSMATCH_EMAIL];
                    }
                } else {
                    responce.status = verifyToken.status;
                    responce.error = verifyToken.error;
                    responce.msg = verifyToken.msg;
                }
            } else {
                responce.status = tokenValue.status;
                responce.msg = tokenValue.arMissField[0] + " " + tokenValue.msg;
                responce.arMissField = tokenValue.arMissField;
            }
        } else {
            responce.status = statusCode.USER_NOT_FOUND;
            responce.msg = statusMessage[statusCode.USER_NOT_FOUND];
        }
    } else {
        responce.status = queryValue.status;
        responce.msg = queryValue.arMissField[0] + " " + queryValue.msg;
        responce.arMissField = queryValue.arMissField;
    }

    res.status(statusCode.OK).send(responce);
}

export const security = {
    verifyUser,
}