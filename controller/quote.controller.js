const Quote = require("../schema/quote.schema");
const quoteValidator = require("../validator/quote.validate");

const addQuote = async (req, res) => {
  try {
    const { error } = quoteValidator(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const quote = await Quote.create(req.body);
    res.status(201).json(quote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchQuote = async (req, res) => {
  try {
    const { q } = req.query;

    const quotes = await Quote.find({$text: { $search: q }}).populate("bookId", "title")
   .populate("authorId", "fullName");

    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addQuote, searchQuote };