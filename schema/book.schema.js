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
        type: Number,
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
    period: {
        type: String,
        required: true,
        enum: {
         values: ["Temuriylar davri" , "Jadid davri","Sovet davri","Mustaqillik davri"],
         message: "{VALUE} bunday qiymat qabul qilinmaydi"
        }
    }, 
     genre : {
        type: String,
        required: true,
        enum: {
        values: ["Comedy" , "Romance","Thriller","Horror","Tragediya","Action","Documentary","Science fiction","Fantasy","History"],
        message: "{VALUE} bunday qiymat qabul qilinmaydi"
    }
    },
    imageUrl : {
        type: String,
        required: true
    },
    authorInfo: {
        type: Schema.Types.ObjectId,
        ref: "author",
        required: true
    }

},{
    versionKey: false,
    timestamps: true
})
const BookSchema = model("book", Book)
module.exports = BookSchema