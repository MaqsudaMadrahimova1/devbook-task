const BookSchema = require("../schema/book.schema");

const getAllBooks = async (req, res) => {
    try {
        const book = await BookSchema.find().populate("authorInfo", "-_id fullName birthDate")
        return res.status(200).json(book)
    } catch {
        return res.status(500).json({ message: error.message })
    }
}
const getOneBook = async (req, res) => {
    try {
        const { id } = req.params
        const foundedBook = await BookSchema.findById(id)
        if (!foundedBook) {
            throw CustomErrorHandler.NotFound("Book not found")
        }
        res.status(200).json(foundedBook)
    } catch {
        return res.status(500).json({ message: error.message })
    }
}
const addBook = async (req, res) => {
    try {
        const { title, pages, publishedYear, publishedHome, description, genre, imageUrl, authorInfo } = req.body
        await BookSchema.create({ title, pages, publishedYear, publishedHome, description, genre, imageUrl, authorInfo })
        return res.status(201).json({
            message: "Added new book"
        })
    } catch {
        return res.status(500).json({ message: error.message })
    }
}
const updateBook = async (req, res) => {
    try {

        const { title, pages, publishedYear, publishedHome, description, genre, imageUrl, authorInfo } = req.body

        const { id } = req.params

        const foundedBook = await BookSchema.findById(id)
        if (!foundedBook) {
            throw CustomErrorHandler.NotFound("Book not found")
        }
        await BookSchema.findByIdAndUpdate(id, { title, pages, publishedYear, publishedHome, description, genre, imageUrl, authorInfo })
        res.status(200).json({
            message: "Update book"
        })
    } catch {
        return res.status(500).json({ message: error.message })
    }
}
const deleteBook = async (req, res) => {
    try {

        const { id } = req.params
        const foundedBook = await BookSchema.findById(id)
        if (!foundedBook) {
            throw CustomErrorHandler.NotFound("Book not found")
        }
        await BookSchema.findByIdAndDelete(id)
        res.status(200).json({
            message: "Delete book"
        })
    } catch {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    getAllBooks,
    getOneBook,
    addBook,
    updateBook,
    deleteBook
}