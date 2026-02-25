const AuthorSchema = require("../schema/author.schema")

const getAllAuthors = async (req, res) => {
    try {
        const author = await AuthorSchema.find();
        return res.status(200).json(author)
    } catch {
        return res.status(500).json({ message: error.message })
    }
}
const getOneAuthor = async (req, res) => {
    try {

        const { id } = req.params

        const foundedAuthor = await AuthorSchema.findById(id)
        if (!foundedAuthor) {
            return res.status(404).json({
                message: "Author not found"
            })
        }


        res.status(200).json(foundedAuthor)
    } catch {
        return res.status(500).json({ message: error.message })
    }
}
const addAuthor = async (req, res) => {
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
        return res.status(500).json({ message: error.message });
    }
}
const updateAuthor = async (req, res) => {
    try {

        const { fullName, birthDate, deathDate, period, bio, work } = req.body

        const { id } = req.params

        const foundedAuthor = await AuthorSchema.findById(id)
        if (!foundedAuthor) {
            return res.status(404).json({
                message: "Author not found"
            })
        }
        await AuthorSchema.findByIdAndUpdate(id, { fullName, birthDate, deathDate, period, bio, work })
        res.status(200).json({
            message: "Update author"
        })
    } catch {
        return res.status(500).json({ message: error.message })
    }
}
const deleteAuthor = async (req, res) => {
    try {

        const { id } = req.params

        const foundedAuthor = await AuthorSchema.findById(id)
        if (!foundedAuthor) {
            return res.status(404).json({
                message: "Author not found"
            })
        }
        await AuthorSchema.findByIdAndDelete(id)
        res.status(200).json({
            message: "Delete author"
        })
    } catch {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    getAllAuthors,
    getOneAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor
}