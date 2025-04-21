import { userCommon } from "../../common/index.js";
import { status } from "../../statusCode/index.js";

const statusCode = status.statusCode;
const statusMessage = status.statusMessage;

async function generateOneUser(req, res){
    const { email } = req.body;
    console.log(email);
    const responce = { status:null, msg:null };
    const is_deleted = false;
    const arReqField = ["email", "is_deleted"];
    const objValueField = {
        ...( email ) && { email },
        ...( is_deleted !== undefined ) && { is_deleted },
    };
    const query = "SELECT * FROM users WHERE email = $1 AND is_deleted = $2"
    const queryValue = await userCommon.getMissingValue(arReqField, objValueField);
    
    if(queryValue.status === statusCode.OK && queryValue.arMissField.length === 0 && queryValue.queryValue.length > 0){
        const queryData = await userCommon.getQueryValue(query, queryValue);
        
        if(queryData.status === statusCode.OK && queryData.userData.length > 0){
            responce.status = queryData.status;
            responce.msg = queryData.msg;
            responce.userData = queryData.userData;
        } else {
            responce.status = queryData.status;
            responce.msg = queryData.msg;
            responce.error = queryData.error;
        }
    } else {
        responce.status = queryValue.status;
        responce.msg = `${queryValue.arMissField[0]} is required`;
        responce.arMissField = queryValue.arMissField;
    }

    res.status(statusCode.OK).send(responce);
}

async function generateAllUser(req, res){
    const responce = { status:null, msg:null };
    console.log("Hi");
    const is_deleted = false;
    const role = 'CUSTOMER';
    const arReqField = [ "role" ,"is_deleted"];
    const objValueField = {
        ...( role ) &&  { role },
        ...( is_deleted !== undefined ) && { is_deleted },
    };
    const query = "SELECT * FROM users WHERE role = $1 AND is_deleted = $2";
    const queryValue = await userCommon.getMissingValue(arReqField, objValueField);
    
    if(queryValue.status === statusCode.OK && queryValue.arMissField.length === 0 && queryValue.queryValue.length > 0){
        const queryData = await userCommon.getQueryValue(query, queryValue);
        
        if(queryData.status === statusCode.OK && queryData.userData.length > 0){
            responce.status = queryData.status;
            responce.msg = queryData.msg;
            responce.userData = queryData.userData;
        } else {
            responce.status = queryData.error ? queryData.status : statusCode.NO_USER_FOUND;
            responce.msg = queryData.error ? queryData.msg : statusMessage[statusCode.NO_USER_FOUND];
            responce.error = queryData.error;
        }
    } else {
        responce.status = queryValue.status;
        responce.msg = `${queryValue.arMissField[0]} is required`;
        responce.arMissField = queryValue.arMissField;
    }

    res.status(statusCode.OK).send(responce);
}

async function editUser(req, res){
    const { firstname, lastname, email, password, updateUserId } = req.body;
    const responce = { status:null, msg:null };
    const arReqField = ["firstname", "lastname", "email", "password", "updateUserId"];
    const objValueField = {
        ...( firstname ) && { firstname },
        ...( lastname ) && { lastname },
        ...( email ) && { email },
        ...( password ) && { password },
        ...(updateUserId) && { updateUserId },
    };
    const queryValue = await userCommon.getMissingValue(arReqField, objValueField);
    
    if(queryValue.status === statusCode.OK && queryValue.arMissField.length === 0 && queryValue.queryValue.length > 0){
        
        const query = "UPDATE users SET firstname = $1, lastname = $2, email = $3, password = $4 WHERE id = $5";
        const queryData = await userCommon.getQueryValue(query, queryValue);
        
        if(queryData.status === statusCode.OK){
            responce.status = queryData.status;
            responce.msg = queryData.msg;
        } else {
            responce.status = queryData.status;
            responce.msg = queryData.msg;
            responce.error = queryData.error;
        }
    } else {
        responce.status = queryValue.status;
        responce.msg = `${queryValue.arMissField[0]} is required`;
        responce.arMissField = queryValue.arMissField;
    }
    
    res.status(statusCode.OK).send(responce);
}

async function changeRole(req, res){
    const { email, role } = req.body;
    const responce = { status:null, msg:null };
    const is_deleted = false;
    const arReqField = ["email", "is_deleted"];
    const objValueField = {
        ...(email) && { email },
        ...( is_deleted !== undefined ) && { is_deleted },
    };
    const queryValue = await userCommon.getMissingValue(arReqField, objValueField);
    
    if(queryValue.status === statusCode.OK && queryValue.arMissField.length === 0 && queryValue.queryValue.length > 0){
        const query = "SELECT * FROM users WHERE email = $1 AND is_deleted = $2";
        const queryData = await userCommon.getQueryValue(query,queryValue);

        if(queryData.status === statusCode.OK && queryData.userData.length > 0 && queryData.userData[0].role !== 'SUPER ADMIN'){
            const updateUserId = queryData.status === statusCode.OK && queryData.userData.length > 0 ? queryData.userData[0].id : 0;
            const updateReqField = ["role", "updateUserId"];
            const updateValue = {
                ...(role) && { role },
                ...(updateUserId) && { updateUserId }
            };
            const updateQueryValue = await userCommon.getMissingValue(updateReqField, updateValue);
            
            if(updateQueryValue.status === statusCode.OK && updateQueryValue.arMissField.length === 0 && updateQueryValue.queryValue.length > 0){
                const fullname = queryData.status === statusCode.OK && queryData.userData.length > 0 ? queryData.userData[0].firstname.at(0).toUpperCase() + queryData.userData[0].firstname.slice(1).toLowerCase() + " " + queryData.userData[0].lastname.at(0).toUpperCase() + queryData.userData[0].lastname.slice(1).toLowerCase() : "";
                const mailOption  = {
                    from:'bobmurugan51@gmail.com',
                    to:email,
                    subject:"You've Been Assigned a New Role",
                    text:`Hi ${fullname},\n   \nWe wanted to let you know that your user role has been successfully updated.\n \nNew Role:${role}\n \nThis change may affect your access permissions and available features within the system. if you have any questions or believe this update was made in error,please contact your adminstrator or support team.\n \nBest regards,\nVitamins Medicine Shop`,
                };
                const sendEmail = await userCommon.sendEmail(mailOption);
                
                if(sendEmail.status === statusCode.OK){
                    const updateQuery = "UPDATE users SET role = $1 WHERE  id = $2";
                    const updateQueryData = await userCommon.getQueryValue(updateQuery, updateQueryValue);
                    if(updateQueryData.status === statusCode.OK){
                        responce.status = updateQueryData.status;
                        responce.msg = updateQueryData.msg;
                    } else {
                        responce.status = updateQueryData.status;
                        responce.msg = updateQueryData.msg;
                        responce.error = updateQueryData.error;
                    }
                } else {
                    responce.status =  statusCode.USER_MAIL_NOT_SENDED;
                    responce.msg = statusMessage[statusCode.USER_MAIL_NOT_SENDED];
                    responce.error = sendEmail.error;
                }
            } else {
                responce.status = updateQueryValue.status;
                responce.msg = updateQueryValue.arMissField[0] + " " + updateQueryValue.msg;
                responce.arMissField = updateQueryValue.arMissField;
            }
        } else {
            responce.status = queryData.status !== statusCode.OK ? queryData.status : statusCode.CHANGING_SUPER_ADMIN_ROLE;
            responce.msg = queryData.status !== statusCode.OK ? queryData.msg : statusMessage[statusCode.CHANGING_SUPER_ADMIN_ROLE];
            responce.error = queryData.error;
        }
    } else {
        responce.status = queryValue.status;
        responce.msg = queryValue.arMissField[0] + " " + queryValue.msg;
        responce.arMissField = queryValue.arMissField;
    }

    res.status(statusCode.OK).send(responce);

}

export const userDetails = {
    generateOneUser,
    generateAllUser,
    editUser,
    changeRole,
}