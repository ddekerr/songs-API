const Joi = require("joi");

const songSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
});

module.exports = {
  songSchema,
};
