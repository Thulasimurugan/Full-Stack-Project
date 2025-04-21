import { userCommon } from "../../common/index.js";
import { status } from "../../statusCode/index.js";

const statusCode = status.statusCode;
const statusMessage = status.statusMessage;

async function sendContact(req, res){
    const { fullname, email, phone, message } = req.body;
    const responce = {status:null, msg:null};
    const is_deleted = false;
    const contactValue = {
        ...(fullname !== undefined && fullname !== "" && fullname !== null) && { fullname },
        ...(email !== undefined && email !== "" && email !== null) && { email },
        ...(phone) && { phone },
        ...(message) && { message },
    };

    const arReqField = ["fullname", "email", "phone", "message"];
    const query = "INSERT INTO contact (fullname, email, phone, message) VALUES($1, $2, $3, $4)";
    const queryValue = await userCommon.getMissingValue(arReqField, contactValue);

    if(queryValue.status === statusCode.OK && queryValue.arMissField.length === 0 &&  queryValue.queryValue.length > 0){
        const queryData = await userCommon.getQueryValue(query, queryValue);
        
        if(queryData.status === statusCode.OK && queryData.userData.length === 0){
            const query = "SELECT * FROM contact WHERE email = $1";
            const arReqField = ["email"];
            const contactValue = {
                ...(email) && { email }
            }
            const queryValue = await userCommon.getMissingValue(arReqField, contactValue);
            const queryData = await userCommon.getQueryValue(query, queryValue);
            const userFullname = queryData.status === statusCode.OK && queryData.userData.length > 0 ? queryData.userData[0].fullname : "";
            const userEmail = queryData.status === statusCode.OK && queryData.userData.length > 0 ? queryData.userData[0].email : "";
            const userPhone = queryData.status === statusCode.OK && queryData.userData.length > 0 ? queryData.userData[0].phone : "";
            const userMessage = queryData.status === statusCode.OK && queryData.userData.length > 0 ? queryData.userData[0].message : "";
            if(queryData.status === statusCode.OK && queryData.userData.length > 0 && fullname !== "" && email !== ""){
                const mailOption  = {
                    from:'bmthulasi51@gmail.com',
                    to:"bobmurugan51@gmail.com",
                    subject:`You've Received a New Inquiry from [${userFullname}]`,
                    text:`Dear Admin,\n   \nA New message has been submitted through the Contact Us Page.Below are the details\n  \nName:   ${userFullname}\nEmail:    ${userEmail}\nPhone:  ${userPhone}\nMessage: \n${userMessage}\n \nPlease review the message and respond as soon as possible\n \nFor urgent matters, you may contact the user directly via email:[${userEmail}] or phone:[${userPhone}],\n \nBest Regards\nVitamins Medicine Shop`,
                };
                const sendEmail = await userCommon.sendEmail(mailOption);
                if(sendEmail.status === statusCode.OK){
                    const mailOption  = {
                        from:'bmthulasi51@gmail.com',
                        to:userEmail,
                        subject:`Thank You for Contacting Us`,
                        text:`We Received Your Message!`,
                    };
                    const user = await userCommon.sendEmail(mailOption);
                    if(user.status === statusCode.OK){
                        responce.status = user.status;
                        responce.msg = user.msg;
                    } else {
                        responce.status = user.status;
                        responce.msg = user.msg;
                        responce.error = user.error;
                    }
                } else {
                    responce.status = sendEmail.status;
                    responce.msg = sendEmail.msg;
                    responce.error = sendEmail.error;
                }
                
            } else {
                responce.status = queryData.status;
                responce.msg = queryData.msg;
                responce.error = queryData.error;
            }
            // const mailOption  = {
            //     from:'bmthulasi51@gmail.com',
            //     to:email,
            //     subject:'Use This OTP to Verify Your Identity',
            //     text:`Dear ${fullname},\n   \nTo complete your verification,Please use the One-Time-Password (OTP) provided below\n \nOTP Code:${newOTP}\n \nThis code is valid for 10 minutes. Do not share it with anyone. if you did not request this code, please ignore this email.\n \nBest regards,\nVitamins Medicine Shop`,
            // };
            //const sendEmail = await userCommon.sendEmail(mailOption);
            //console.log(sendEmail);
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

export const contact = {
    sendContact,
}