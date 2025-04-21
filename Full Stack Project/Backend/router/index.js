import  Express  from "express";
import { userLogin } from "../controller/login/index.js";
import { userCommon } from "../common/index.js";
import { security } from "../middleware/index.js";
import { userForgot } from "../controller/forgot/index.js";
import { contact } from "../controller/contact/index.js";
import { role } from "../controller/changeRole/index.js";
import { userDetails } from "../controller/user/index.js";

const router = Express.Router();

//sample
router.get("/welcome", (req, res) => {
    res.status(200).json({message:"Hi Welcome to this server"});
});

//get
router.get("/generateAllUser", security.verifyUser, userDetails.generateAllUser);

//post
router.post("/login",userLogin.login);
router.post("/createUser", userLogin.createUser);
router.post("/autoLogin", security.verifyUser, userLogin.autoLogin);
router.post("/logout", security.verifyUser, userLogin.logout);
router.post("/generateOneUser", security.verifyUser, userDetails.generateOneUser);
router.post("/editUser", security.verifyUser, userDetails.editUser);
router.post("/verifyEmail", userForgot.verifyEmail);
router.post("/verifySuperAdmin", security.verifyUser, role.verifySuperAdmin);
router.post("/verifyOtp", userForgot.verifyOtp);
router.post("/verifyAdminOtp", security.verifyUser, userForgot.verifyOtp);
router.post("/changePassword", userForgot.changePassword);
router.post("/changeRole", security.verifyUser, userDetails.changeRole);
router.post("/sendContact", security.verifyUser, contact.sendContact);


export default router;

