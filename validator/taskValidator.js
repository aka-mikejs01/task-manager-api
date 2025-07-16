import { checkSchema, validationResult } from "express-validator";

const taskValidation = {
  title: {
    isLength: {
      option: { min: 3 },
    },
    notEmpty: {
      errorMessage: "please fill out the field",
    },
    trim: true,
  },
  completed: {
    isBoolean: true,
    notEmpty: {
      errorMessage: "please fill out the field",
    },
  },
};

export const taskValidator = [
  checkSchema(taskValidation),
  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty) return res.status(400).json({ error: error.array() });

    next();
  },
];
