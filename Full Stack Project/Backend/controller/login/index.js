import { status } from "../../statusCode/index.js";
import { userCommon } from "../../common/index.js";
import DotEnv from "dotenv";
//import Redis from "redis";

const statusCode = status.statusCode;
const statusMessage = status.statusMessage;
DotEnv.config({path:`.env.${process.env.ENVIRONMENT || "development"}`});

async function login(req,res){
    const { email, password } = req.body;
    const responce = {status:null, msg:null};
    const is_deleted = false;
    const userLogin = {
        ...(email !== undefined && email !== "") && { email },
        ...(is_deleted !== undefined && is_deleted !== "") && { is_deleted },
    };
    const checkPassword = password !== undefined && password !== "" && password !== null ? password : '';
    const arReqField = ["email", "is_deleted"];
    const query = "SELECT * FROM users WHERE email = $1 AND is_deleted = $2";
    const queryValue = await userCommon.getMissingValue(arReqField,userLogin);
    
    if(queryValue.arMissField.length === 0 && queryValue.queryValue.length > 0 && queryValue.status === statusCode.OK){
        
        const result = await userCommon.getQueryValue(query,queryValue);

        if(result.status === statusCode.OK && result.userData.length > 0 ){

            const hashVerifyPassword = await userCommon.hashVerifyPassword(result,checkPassword);

            if(hashVerifyPassword.status === statusCode.OK && hashVerifyPassword.userData.length > 0 && hashVerifyPassword.isVerify === true){
                const data = hashVerifyPassword.userData.length > 0 && hashVerifyPassword.status === statusCode.OK ? hashVerifyPassword.userData[0] : [];
                    
                    if(data.email !== undefined && data.password !== undefined && data.role !== undefined ) {
                        const token = await userCommon.generateToken(data.email,data.password, data.role);
                        const refreshToken = await userCommon.generateRefreshToken(data.email, data.password, data.role);

                        if(refreshToken.status === statusCode.OK && token.status === statusCode.OK){

                            responce.userToken = token.token;
                            responce.refreshToken = refreshToken.token;
                            responce.userData = result.userData;
                            responce.status = token.status;
                            responce.msg = token.msg;
                        } else {
                            responce.status = statusCode.LOGIN_FAILED;
                            responce.msg = statusMessage[statusCode.LOGIN_FAILED];
                        }
                    } else {
                        responce.status = statusCode.USER_NOT_FOUND;
                        responce.msg = statusMessage[statusCode.USER_NOT_FOUND];
                    }
                } else {
                    responce.status = statusCode.INVALID_USER_DETAILS;
                    responce.msg = statusMessage[statusCode.INVALID_USER_DETAILS];
                }
        } else {
            responce.status = result.status;
            responce.msg = result.msg;
            responce.error = result.error;
        }
    } else {
        responce.status = queryValue.status;
        responce.msg = queryValue.arMissField[0] + " " +queryValue.msg;
        responce.arMissField = queryValue.arMissField;
    }

    res.status(statusCode.OK).send(responce);
}

async function createUser(req, res) {
    const {firstname, lastname, email, password} = req.body;
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

        if(result.status === statusCode.USER_NOT_FOUND && result.userData.length === 0){

            delete userLogin.is_deleted;
            let is_delete = true;
            const deleteReqField = ["email", "is_delete"];
            const deleteUserData = {
                ...userLogin,
                ...(is_delete !== undefined && is_delete !== "") && { is_delete },
            };
            const queryValue = await userCommon.getMissingValue(deleteReqField, deleteUserData);
            
            if(queryValue.arMissField.length === 0 && queryValue.queryValue.length > 0 && queryValue.status === statusCode.OK){
                const deleteUser = await userCommon.getQueryValue(query, queryValue);
                
                if(deleteUser.status === statusCode.USER_NOT_FOUND && deleteUser.userData.length === 0){

                const createUserData = {
                    ...( firstname !== undefined && firstname !== "") && { firstname },
                    ...( lastname !== undefined && lastname !== "")  && { lastname },
                    ...userLogin,
                    ...( password !== undefined && password !== "") && { password},
                };

                const createReqField = ["firstname", "lastname", "email", "password"];
                const createQuery = "INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4)";
                const queryValue = await userCommon.getMissingValue(createReqField, createUserData);
            
                if(queryValue.arMissField.length === 0 && queryValue.status === statusCode.OK && queryValue.queryValue.length > 0){
                    const createUser = await userCommon.getQueryValue(createQuery, queryValue);
                
                    if(createUser.status === statusCode.OK){
                        responce.status = statusCode.USER_CREATED;
                        responce.msg = statusMessage[statusCode.USER_CREATED];
                    } else {
                        responce.status = statusCode.SERVER_ERROR;
                        responce.error = createUser.error;
                        responce.msg = statusMessage[statusCode.SERVER_ERROR];
                    }
                } else {
                    responce.status = queryValue.status;
                    responce.msg = queryValue.arMissField[0] + " " + queryValue.msg;
                    responce.arMissField = queryValue.arMissField;
                }
            } else {
                const is_deleted = false;
                const updateUserId = deleteUser.status === statusCode.OK && deleteUser.userData.length > 0 ? deleteUser.userData[0].id : "";
                const arReqField = ["firstname", "lastname", "email", "password", "is_deleted", "updateUserId"];
                const updateValue = {
                    ...(firstname) && { firstname },
                    ...(lastname) && { lastname },
                    ...(email) && { email },
                    ...(password) && { password },
                    ...(is_deleted !== undefined) && { is_deleted },
                    ...(updateUserId) && { updateUserId },
                };
                const updateQuery = "UPDATE users SET firstname = $1, lastname = $2, email = $3, password = $4, is_deleted = $5 WHERE id = $6";
                const queryValue = await userCommon.getMissingValue(arReqField,updateValue);

                if(queryValue.arMissField.length === 0 && queryValue.queryValue.length > 0 && queryValue.status === statusCode.OK){
                    
                    const updateData = await userCommon.getQueryValue(updateQuery, queryValue);
                    
                    if(updateData.status === statusCode.OK && updateData.msg === statusMessage[statusCode.OK]){
                        responce.status = statusCode.USER_CREATED;
                        responce.msg = statusMessage[statusCode.USER_CREATED];
                    } else {
                        responce.status = statusCode.EMAIL_DELETED;
                        responce.msg = statusMessage[statusCode.EMAIL_DELETED];
                    }
                } else {
                    responce.status = queryValue.status;
                    responce.msg = queryValue.arMissField[0] + " " + queryValue.msg;
                    responce.arMissField = queryValue.arMissField;
                }
            }
            } else {
                responce.status = queryValue.status;
                responce.msg = queryValue.arMissField[0] + ' ' + queryValue.msg;
                responce.arMissField = queryValue.arMissField;
            }
        } else {
            responce.status = statusCode.ALREADY_USER_EXISTS;
            responce.msg = statusMessage[statusCode.ALREADY_USER_EXISTS];
        }
    } else {
        responce.status = queryValue.status;
        responce.msg = queryValue.arMissField[0] + " " + queryValue.msg;
        responce.arMissField = queryValue.arMissField;
    }

    res.status(statusCode.OK).send(responce);
}

async function autoLogin(req, res){
    const { email } = req.body;
    const responce = { status:null, msg:null};
    const is_deleted = false;
    const userLogin = {
        ...(email !== undefined && email !== "") && { email },
        ...(is_deleted !== undefined && is_deleted !== "") && { is_deleted },
    };
    const arReqField = ["email", "is_deleted"];
    const query = "SELECT * FROM users WHERE email = $1 AND is_deleted = $2";
    const queryValue = await userCommon.getMissingValue(arReqField,userLogin);
    const queryData = await userCommon.getQueryValue(query, queryValue);

    if(queryData.status === statusCode.OK && queryData.userData.length > 0){
        const data = queryData.status === statusCode.OK && queryData.userData.length > 0 ? queryData.userData[0] : undefined;

        if(data.email !== undefined && data.password !== undefined && data.role !== undefined && data !== undefined) {
            const token = await userCommon.generateToken(data.email,data.password, data.role);
            
            if(token.token && token.status === statusCode.OK){
                responce.userToken = token.token;
                responce.userData = queryData.userData;
                responce.status = token.status;
                responce.msg = token.msg;
            } else {
                responce.status = token.status;
                responce.msg = token.status;
            }
        } else {
            responce.status = statusCode.USER_NOT_FOUND;
            responce.msg = statusMessage[statusCode.USER_NOT_FOUND];
        }
    } else {
        responce.status = queryData.status;
        responce.error = queryData.error;
        responce.msg = queryData.msg;
    }

    res.status(statusCode.OK).send(responce);
}

async function logout(req, res){
    const { token } = req.body;
    console.log(token);
}

export const userLogin = {
    login,
    logout,
    createUser,
    autoLogin,
}