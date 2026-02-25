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
        match: /^[a-zA-Z]+$/
    },
    birthDate: {
        type: Date,
        required: true,
        max: [Date.now, "birthDate kelajak sana bo'lmasn"]
    },
    deathDate: {
        type: Date,
        required: true,
        max: [Date.now, "deathDate kelajak sana bo'lmasn"]
    },
    period: {
       type: String,
       required: true,
       trim: true,
       enum: {
       values: ["Temuriylar davri" , "Jadid davri","Sovet davri","Mustaqillik davri"],
       message: "{VALUE} bunday qiymat qabul qilinmaydi"
       }
    },
    bio: {
        type: String,
        required: true,
        trim: true,
        minlength: [20, "bio kamida 20 ta bo'lishi kerak"],
        maxlength: [2000, "bio 2000 tadan ko'p bo'lmasn"]
    },  
     work : {
        type: String,
        required: true,
        trim: true,
        match: [/^[a-zA-ZÀ-žʻʼ’\s,.'-]+$/, "work noto'g'ri formatda"]
    }

},{
    versionKey: false,
    timestamps: true
})
const AuthorSchema = model("author", Author)
module.exports = AuthorSchema