const CustomErrorHandler = require("../error/custom-error.handler");
const AuthorSchema = require("../schema/author.schema")

const getAllAuthors = async (req, res,next ) => {
    try {
        const author = await AuthorSchema.find();
        return res.status(200).json(author)
    } catch {
     next(error)
    }
}


const search = async (req, res,next) => {
    try {
        const { seachingvalue } = req.query
        const result = await AuthorSchema.find({
            $or: [
                { fullName: { $regex: seachingvalue, $options: "i" } },
                { bio: { $regex: seachingvalue, $options: "i" } },
                { period: { $regex: seachingvalue, $options: "i" } }
            ]
        });

        return res.status(200).json(author)
    } catch {
        next(error)
    }
}
const getOneAuthor = async (req, res,next) => {
    try {

        const { id } = req.params

        const foundedAuthor = await AuthorSchema.findById(id)
        if (!foundedAuthor) {
    throw CustomErrorHandler.NotFound("Author not found")
        }


        res.status(200).json(foundedAuthor)
    } catch {
        next(error)
    }
}
const addAuthor = async (req, res,next) => {
    try {
        const { fullName, birthDate, deathDate, period, bio, work } = req.body
        await AuthorSchema.create({ fullName, birthDate, deathDate, period, bio, work })
        return res.status(201).json({
            message: "Added new author"
        })
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors: messages });
        }
        next(error)
    }
}
const updateAuthor = async (req, res,next) => {
    try {

        const { fullName, birthDate, deathDate, period, bio, work } = req.body

        const { id } = req.params

        const foundedAuthor = await AuthorSchema.findById(id)
        if (!foundedAuthor) {
       throw CustomErrorHandler.NotFound("Author not found")
        }
        await AuthorSchema.findByIdAndUpdate(id, { fullName, birthDate, deathDate, period, bio, work })
        res.status(200).json({
            message: "Update author"
        })
    } catch {
        next(error)
    }
}
const deleteAuthor = async (req, res,next) => {
    try {

        const { id } = req.params

        const foundedAuthor = await AuthorSchema.findById(id)
        if (!foundedAuthor) {
            throw CustomErrorHandler.NotFound("Author not found")
        }
        await AuthorSchema.findByIdAndDelete(id)
        res.status(200).json({
            message: "Delete author"
        })
    } catch {
        next(error)
    }
}
module.exports = {
    getAllAuthors,
    getOneAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor,
    search
}