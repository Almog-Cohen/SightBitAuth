const { check, validationResult } = require("express-validator");

// Validate user register data (name,email,password)
exports.validateUserRegister = [
  check("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("User name can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail(),
  check("email").isEmail().withMessage("Must be vaild mail"),
  check(
    "password",
    "Password  must  include one lowercase character, one uppercase character, a number and length 8."
  ).matches(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(422)
        .json({ errors: errors.array().map((msg) => msg.msg) });
    next();
  },
];

// Validate user signin data (email,password)
exports.validateUserSignIn = [
  check("email").isEmail().withMessage("Must be vaild mail"),
  check(
    "password",
    "Password  must  include one lowercase character, one uppercase character, a number and length 8."
  ).matches(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(422)
        .json({ errors: errors.array().map((msg) => msg.msg) });
    next();
  },
];
