const {Router} = require("express");
const { addQuote, searchQuote } = require("../controller/quote.controller");


quoteRouter.post("/",addQuote);
quoteRouter.get("/search",searchQuote );

module.exports = quoteRouter;