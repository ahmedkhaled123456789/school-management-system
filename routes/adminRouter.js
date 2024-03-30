const express = require("express");
const {
  registerAdminServices,
  loginAdminServices,
   getAdminsServices,
  updateAdminServices,
  deleteAdminServices,
  adminPuplishTeacherServices,
  adminUnpuplishTeacherServices,
  adminSuspendTeacherServices,
  adminUnsuspendTeacherServices,
  adminUnwitdrawTeacherServices,
  adminWitdrawTeacherServices,
  getAdminProfileServices,
} = require("./../services/adminServices");
const { isLogin } = require("../middlewares/isLogin");
const isAdmin = require("../middlewares/isAdmin");
  
const router = express.Router();

// routes

//admin register
router.post("/register", registerAdminServices);

//login
router.post("/login", loginAdminServices);

// get all admin

router.get("/", isLogin,getAdminsServices);

//profile

router.get("/profile", isLogin,isAdmin, getAdminProfileServices);
 
// update admin
router.put("/:id",updateAdminServices);
// delete admin
router.delete("/:id", deleteAdminServices);
// admin suspend teacher
router.put("/suspend/teacher:id", adminSuspendTeacherServices);
// admin unsuspend teacher

router.put("/unsuspend/teacher:id",adminUnsuspendTeacherServices);
// admin witdraw exam
router.put("/witdraw/teacher:id", adminWitdrawTeacherServices);
// admin unwitdraw exam
router.put("/unwitdraw/teacher:id", adminUnwitdrawTeacherServices);
// admin puplish exam
router.put("/puplish/teacher:id", adminPuplishTeacherServices);
// admin unpuplish exam
router.put("/unpuplish/teacher:id",adminUnpuplishTeacherServices);
module.exports = router;
