import { checkSchema, validationResult } from "express-validator";

const userValidation = {
  username: {
    isLength: {
      option: { min: 4, max: 32 },
      errorMessage: "Username must contain at least 4 characters.",
    },
    notEmpty: {
      errorMessage: "Username must not be empty.",
    },
    trim: true,
  },
  password: {
    isLength: {
      option: { min: 6 },
      errorMessage: "Password must contain at least 6 characters.",
    },
    notEmpty: {
      errorMessage: "Password must not be empty.",
    },
    trim: true,
  },
};

export const userValidator = [
  checkSchema(userValidation),
  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) return res.status(404).json({ error: error.array() });
    next();
  },
];
