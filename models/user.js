const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");
const { EMAIL_REG_EXP } = require("../constants");

// Mongoose validate schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: EMAIL_REG_EXP,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

// Joi register validate schema
const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(EMAIL_REG_EXP).required(),
  password: Joi.string().min(6).required(),
});

// Joi login validate schema
const loginUserSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REG_EXP).required(),
  password: Joi.string().min(6).required(),
});

const schemas = { registerUserSchema, loginUserSchema };
// Catch the server mongoose error
userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = { User, schemas };
