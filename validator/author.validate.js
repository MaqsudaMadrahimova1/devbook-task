const joi = require("joi")

const authorValidator = (data) => {
    const schema = joi.object({
        fullName: joi.string().min(3).max(50).pattern(new RegExp(/^[a-zA-Z]+$/)).required(),
        birthDate: joi.date().max('now').required(),
        deathDate: joi.date().max('now').required(),
        period: joi.string().valid('Temuriylar davri','Jadid davri','Sovet davri','Mustaqillik davri').required(),
        bio: joi.string().min(20).max(2000).required(),
        work: joi.string().pattern(new RegExp(/^[a-zA-ZÀ-žʻʼ’\s,.'-]+$/)).required(),
 
    })
    return schema.validate(data)
}
module.exports = authorValidator