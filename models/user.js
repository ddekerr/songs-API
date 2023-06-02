const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");
const { EMAIL_REG_EXP } = require("../constants");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: EMAIL_REG_EXP,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(EMAIL_REG_EXP).required(),
  password: Joi.string().min(6).required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REG_EXP).required(),
  password: Joi.string().min(6).required(),
});

const schemas = { registerUserSchema, loginUserSchema };

userSchema.post("save", handleMongooseError);
const User = model("user", userSchema);

module.exports = { User, schemas };
