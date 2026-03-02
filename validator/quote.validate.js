const Joi = require("joi");

module.exports = (data) => {
  const schema = Joi.object({
    bookId: Joi.string().required(),
    authorId: Joi.string().required(),
    text: Joi.string().min(10).max(1000).required(),
  });

  return schema.validate(data);
};