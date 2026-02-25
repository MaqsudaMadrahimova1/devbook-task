const { Schema,model } = require("mongoose");

const Author = new Schema({
    fullName: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "fullName berilishi kerak"],
        minlength: [3, "fullName kamida 3 tadan kam  bo'lishi kerak"],
        maxlength: [50, "fullName 50 dan  uzun bo'lmasligi kerak"],
        // validate: {
        //     validator: function(v) {
        //         return typeof v === "string" && v.trim().length >= 3; 
        //     },
        //     message: "fullName kamida 3 ta belgidan iborat bo'lishi kerak "
        // }
    },
    birthDate: {
        type: Date,
        required: true
    },
    deathDate: {
        type: Date,
        required: true
    },
    period: {
        type: String,
        required: true,

    },
    bio: {
        type: String,
        required: true
    },  
     work : {
        type: String,
        required: true
    }

},{
    versionKey: false,
    timestamps: true
})
const AuthorSchema = model("author", Author)
module.exports = AuthorSchema