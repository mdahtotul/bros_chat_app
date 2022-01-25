// external imports
const express = require("express");

// internal imports
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controllers/usersController");
const { checkLogin, requireRole } = require("../middlewares/common/checkLogin");
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidator");

// internal imports

const router = express.Router();

// GET: users page
router.get("/", decorateHTMLResponse("Users"), checkLogin, getUsers);

// POST: add user
router.post(
  "/",
  checkLogin,
  requireRole(["admin"]),
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// DELETE: remove user
router.delete("/:id", checkLogin, requireRole(["admin"]), removeUser);

// module export
module.exports = router;
