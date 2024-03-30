const asyncHandler = require("express-async-handler");
const Admin = require("../models/Admin");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");

const createToken = require("../utils/createToken");
// @desc     register admin
// @route   POST /api/v1/admins/register
// @access  private
exports.registerAdminServices = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  //Check if email exists
  const adminFound = await Admin.findOne({ email });
  if (adminFound) {
    return next(new ApiError("user exist", 404));
  }
  //register
  const user = await Admin.create({
    name,
    email,
    password,
  });

  // 2- Generate token
  const token = createToken(user._id);
  res.status(201).json({
    status: "success",
    data: user,
    token,
  });
});

// @desc     login admin
// @route   POST /api/v1/admins/login
// @access  private
exports.loginAdminServices = asyncHandler(async (req, res, next) => {
  // 1) check if password and email in the body (validation)
  // 2) check if user exist & check if password is correct
  const user = await Admin.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }
  // 3) generate token
  const token = createToken(user._id);
  // 4) send response to client side
  res.status(200).json({ data: user, token });
});

// @desc     get all admins
// @route   GET /api/v1/admins
// @access  private
exports.getAdminsServices = asyncHandler(async (req, res, next) => {
  const admin = await Admin.find();
  res.status(200).json({
    status: "success",
    message: "admin fetched successfully",
    data: admin,
  });
});

//@desc     Get profile admin
//@route    GET /api/v1/admins/:id
//@access   Private

exports.getAdminProfileServices = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.userAuth._id)
    .select("-password -createdAt -updatedAt")
    .populate("academicYears")
    .populate("academicTerms")
    .populate("programs")
    .populate("yearGroups")
    .populate("classLevels")
    .populate("teachers")
    .populate("students");
  if (!admin) {
    throw new ApiError("Admin Not Found");
  } else {
    res.status(200).json({
      status: "success",
      data: admin,
    });
  }
});

// @desc     update admin
// @route   put /api/v1/admins/:id
// @access  private
exports.updateAdminServices = asyncHandler(async (req, res, next) => {
  const { email, name, password } = req.body;
  //if email is taken
  const emailExist = await Admin.findOne({ email });
  if (emailExist) {
    return next(new ApiError("This email is taken/exist"));
  }

  //hash password
  //check if user is updating password

  if (password) {
    //update
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        password: await bcrypt.hash(req.body.password, 12),
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin updated successfully",
    });
  } else {
    //update
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin updated successfully",
    });
  }
});

//@desc     Delete admin
//@route    DELETE /api/v1/admins/:id
//@access   Private
exports.deleteAdminCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "delete admin",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc     admin suspends a teacher
//@route    PUT /api/v1/admins/suspend/teacher/:id
//@access   Private

exports.adminSuspendTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: " admin suspend teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

// @desc     delete admin
// @route   delete /api/v1/admins/:id
// @access  private
exports.deleteAdminServices = (req, res, next) => {
  try {
    res.status(201).json({ data: "User Registered Successfully!" });
  } catch (error) {
    res.json({ status: "failed", error: error.message });
  }
};

// @desc       Admin Suspend Teacher
// @route   put /api/v1/admins/:id
// @access  private
exports.adminSuspendTeacherServices = (req, res, next) => {
  try {
    res.status(201).json({ data: "User Registered Successfully!" });
  } catch (error) {
    res.json({ status: "failed", error: error.message });
  }
};

// @desc       Admin Unsuspend Teacher
// @route   put /api/v1/admins/:id
// @access  private
exports.adminUnsuspendTeacherServices = (req, res, next) => {
  try {
    res.status(201).json({ data: "User Registered Successfully!" });
  } catch (error) {
    res.json({ status: "failed", error: error.message });
  }
};

// @desc       Admin Witdraw Teacher
// @route   put /api/v1/admins/:id
// @access  private
exports.adminWitdrawTeacherServices = (req, res, next) => {
  try {
    res.status(201).json({ data: "User Registered Successfully!" });
  } catch (error) {
    res.json({ status: "failed", error: error.message });
  }
};

// @desc       Admin Unwitdraw Teacher
// @route   put /api/v1/admins/:id
// @access  private
exports.adminUnwitdrawTeacherServices = (req, res, next) => {
  try {
    res.status(201).json({ data: "User Registered Successfully!" });
  } catch (error) {
    res.json({ status: "failed", error: error.message });
  }
};

// @desc       Admin Puplish Teacher
// @route   put /api/v1/admins/:id
// @access  private
exports.adminPuplishTeacherServices = (req, res, next) => {
  try {
    res.status(201).json({ data: "User Registered Successfully!" });
  } catch (error) {
    res.json({ status: "failed", error: error.message });
  }
};

// @desc       Admin Unpuplish Teacher
// @route   put /api/v1/admins/:id
// @access  private
exports.adminUnpuplishTeacherServices = (req, res, next) => {
  try {
    res.status(201).json({ data: "User Registered Successfully!" });
  } catch (error) {
    res.json({ status: "failed", error: error.message });
  }
};
