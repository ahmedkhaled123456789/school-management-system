const express = require("express");
const isAdmin = require("../middlewares/isAdmin");
const Subject = require("../models/Subject");
const advancedResults = require("../middlewares/advancedResults");
const { isLogin } = require("../middlewares/isLogin");
const {
 createSubject,getSubjects,getProgram,updatSubject,deleteSubject
} = require("../services/subjects");

const router = express.Router();
 router
  .route("/")
  .get(isLogin, isAdmin,advancedResults(Subject),  getSubjects);
 
  router
  .route("/:programID")
  .post(isLogin, isAdmin, createSubject)
  
router
  .route("/:id")
  .get(isLogin, isAdmin, getProgram)
  .put(isLogin, isAdmin, updatSubject)
  .delete(isLogin, isAdmin, deleteSubject);
 

module.exports = router;
