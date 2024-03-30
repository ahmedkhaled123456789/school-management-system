const adminRouter = require("./adminRouter");
 const academicYearRouter= require("./academincYearRouter")
 const academicTermRouter= require("./academincTermRouter")
 const classLevel= require("./classLevel")
 const program= require("./program")
 const subjects= require("./subjects")
 const yearGroups= require("./yearGroups")
 const teachers= require("./teachers")
 const examRoutes= require("./examRoutes")
 const student= require("./student")
 const questionRoutes= require("./questionRoutes")
 const examResultsRoute= require("./examRsultsRoute")

  const couponRoutes= (app) => { 
    app.use("/api/v1/admins", adminRouter);
    app.use("/api/v1/academics", academicYearRouter);
    app.use("/api/v1/terms", academicTermRouter);
    app.use("/api/v1/class-Level", classLevel);
    app.use("/api/v1/program", program);
    app.use("/api/v1/subjects", subjects);
    app.use("/api/v1/year-Groups", yearGroups);
    app.use("/api/v1/teachers", teachers);
    app.use("/api/v1/exams", examRoutes);
    app.use("/api/v1/students", student);
    app.use("/api/v1/questions", questionRoutes);
    app.use("/api/v1/exam-results", examResultsRoute);



  }

  module.exports = couponRoutes;