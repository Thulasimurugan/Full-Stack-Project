import { status } from "../../statusCode/index.js";
import { userCommon } from "../../common/index.js";

const statusCode = status.statusCode;
const statusMessage = status.statusMessage;
const newOTP = Math.round(100000 + Math.random() * 900000);

async function verifySuperAdmin(req, res){

    const responce = { status:null, msg:null };
    const { email } = req.body;
    const is_deleted  = false;
    const arReqField = ["email", "is_deleted"];
    const objValueField = {
        ...( email ) && { email },
        ...( is_deleted !== undefined ) && { is_deleted }
    };
    const query = "SELECT * FROM users WHERE email = $1 AND is_deleted = $2";
    const queryValue = await userCommon.getMissingValue(arReqField, objValueField);
    const queryData = await userCommon.getQueryValue(query, queryValue);

    if(queryData.status === statusCode.OK && queryData.userData.length > 0 && queryData.userData[0].role === 'SUPER ADMIN'){
        const fullname = queryData.status === statusCode.OK && queryData.userData.length > 0 ? queryData.userData[0].firstname.at(0).toUpperCase() + queryData.userData[0].firstname.slice(1).toLowerCase() + " " + queryData.userData[0].lastname.at(0).toUpperCase() + queryData.userData[0].lastname.slice(1).toLowerCase() : "";
        const updateUserId = queryData.status === statusCode.OK && queryData.userData.length > 0 ? queryData.userData[0].id : 0;
        const otp_expiry = new Date();
        otp_expiry.setMinutes(otp_expiry.getMinutes() + 10);
        const updateQuery = "UPDATE users SET otp = $1, otp_expiry = $2 WHERE id = $3";
        const arReqField = ["newOTP", "otp_expiry", "updateUserId"]
        const objValueField = {
            ...( newOTP ) && { newOTP },
            ...( otp_expiry ) && { otp_expiry },
            ...( updateUserId ) && { updateUserId },
        };
        const queryValue = await userCommon.getMissingValue(arReqField, objValueField);
        const updateQueryData = await userCommon.getQueryValue(updateQuery, queryValue);
        
        if(updateQueryData.status === statusCode.OK) {
            const mailOption  = {
                from:'bobmurugan51@gmail.com',
                to:email,
                subject:'Secure Your Action: OTP for Role Change Request',
                text:`Dear ${fullname},\n   \nYou have requested to change a user's role in the system.To proceed,please use the following One-Time-Password(OTP)\n \nOTP Code:${newOTP}\n \nFor security reasons, this OTP is valid for 10 minutes and should not be shared with anyone.if you did not request this change,please ignore this email.\n \nBest regards,\nVitamins Medicine Shop`,
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
            responce.status = updateQueryData.status;
            responce.msg = updateQueryData.msg;
            responce.error = updateQueryData.error;
        }
    } else {
        responce.status = queryData.status !== statusCode.OK ? queryData.status : statusCode.NOT_SUPER_ADMIN;
        responce.msg = queryData.status !== statusCode.OK ? queryData.msg : statusMessage[statusCode.NOT_SUPER_ADMIN];
        responce.error = queryData.error;
    }
    
    res.status(statusCode.OK).send(responce);
}

export const role = {
    verifySuperAdmin,
}