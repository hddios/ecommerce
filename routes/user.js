const express = require("express");
const router = express.Router();
const {
  userRegister,
  loginUser,
  checkEmailExists,
  getProfile,
  makeUserAdmin,
  getUserById,
  updateUserById,
} = require("../controller/user");
const { auth } = require("../auth/index");
// body parameter
// {
// 	"email":"ali@gmail.com"
// }
router.post("/checkEmail", checkEmailExists);

// body parameter
// {
// 	"email":"ali@gmail.com",
// 	"password":"123"
// }
router.post("/register", userRegister);

// body paramter
// {
// 	"email":"ali@gmail.com",
// 	"password":"123"
// }
// return response accessToken
router.post("/login", loginUser);

// body parameter
// {
// 	"userId":"61043797e9a4251bd24ed4c8"
// }
// Authorization header require
router.post("/details", auth.authenticateToken, auth.requireAdmin, getProfile);

// body parameter
// {
// 	"userId":"61043797e9a4251bd24ed4c8"
// }
// Authorization token header require
router.post("/setAsAdmin", auth.authenticateToken, makeUserAdmin);

// body parameter
// {
// 	"email":"ali12@gmail.com",
// 	"isAdmin":"true",
// 	"password":"123",
//  "userId":"61043797e9a4251bd24ed4c8"
// }
// header params user id that you want to make admin
// http://localhost:8000/api/user/61043797e9a4251bd24ed4c8
// Authorization token header require
router.put("/:id", auth.authenticateToken, auth.requireAdmin, updateUserById);

// header params user id that you want to search
// http://localhost:8000/api/user/61043797e9a4251bd24ed4c8
// Authorization token header require
router.get("/:id", auth.authenticateToken, getUserById);

module.exports.User = router;
