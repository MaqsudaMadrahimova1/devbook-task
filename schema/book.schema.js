const { Schema,model } = require("mongoose");

const Book = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
        maxLength: 200,
        lowercase: true,
        // validate: {
        //     validator: function(v) {
        //         return typeof v === "string" && v.trim().length >= 3; 
        //     },
        //     message: "fullName kamida 3 ta belgidan iborat bo'lishi kerak (trim bilan tekshirildi)"
        // }
    },
    pages: {
        type: Number,
        required: true,
        min: [3, "kamida 3 bo'lishi kerak"],
        max: [1000,"1000 dan ko'p bo'lmasin"]
        
    },
    publishedYear: {
        type: Date,
        required: true
    },
    publishedHome: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },  
     genre : {
        type: String,
        required: true
    },
    imageUrl : {
        type: String,
        required: true
    }

},{
    versionKey: false,
    timestamps: true
})
const BookSchema = model("book", Book)
module.exports = BookSchema