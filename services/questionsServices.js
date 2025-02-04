const AysncHandler = require("express-async-handler");
const Exam = require(".././models/Exam");
const Question = require(".././models/Questions");
const ApiError = require("../utils/apiError");

//@desc  Create Question
//@route POST /api/v1/questions/:examID
//@acess Private  Teachers only

exports.createQuestion = AysncHandler(async (req, res,next) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;
  //find the exam
  const examFound = await Exam.findById(req.params.examID);
  if (!examFound) {
    return next(new ApiError("Exam not found", 404));

   }
  //check if question
  const questionExists = await Question.findOne({ question });
  if (questionExists) {
     return next(new ApiError("Question already exists", 404));

  }
  //create exam
  const questionCreated = await Question.create({
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    createdBy: req.userAuth._id,
  });
  //add the question into exam
  examFound.questions.push(questionCreated._id);
  //save
  await examFound.save();
  res.status(201).json({
    status: "success",
    message: "Question created",
    data: questionCreated,
  });
});

//@desc  get all questions
//@route GET /api/v1/questions
//@acess  Private - Teacher only

exports.getQuestions = AysncHandler(async (req, res) => {
  res.status(200).json(res.results);

});

//@desc  get single Question
//@route GET /api/v1/questions/:id
//@acess  Private
exports.getQuestion = AysncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Question fetched successfully",
    data: question,
  });
});

//@desc   Update  Question
//@route  PUT /api/v1/questions/:id
//@acess  Private Teacher only

exports.updatQuestion = AysncHandler(async (req, res,next) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;
  //check name exists
  const questionFound = await Question.findOne({ question });
  if (questionFound) {
    return next(new ApiError("Question already exists", 404));
  }
  const program = await Question.findByIdAndUpdate(
    req.params.id,
    {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Question  updated successfully",
    data: program,
  });
});
