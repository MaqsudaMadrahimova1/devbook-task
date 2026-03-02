const joi = require("joi")

const bookValidator = (data) => {
    const schema = joi.object({
        title: joi.string().min(3).max(1000).required(),
        pages: joi.number().required(),
        publishedYear: joi.number().required(),
        publishedHome: joi.string().required(),
        description: joi.string().required(),
        period: joi.string().valid('Temuriylar davri','Jadid davri','Sovet davri','Mustaqillik davri').required(),
        genre: joi.string().valid('Comedy','Romance','Thriller','Horror','Tragediya','Action','Documentary','Science fiction','Fantasy','History').required(),
        imageUrl: joi.string().uri().required(),
        authorInfo: joi.string().required(),
 
    })
    return schema.validate(data)
}
module.exports = bookValidator