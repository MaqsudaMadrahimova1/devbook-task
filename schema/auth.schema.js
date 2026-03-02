const { Schema,model } = require("mongoose");

const Auth = new Schema({
username: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Username berilishi kerak"],
        minlength: [3, "fullName kamida 3 tadan kam  bo'lishi kerak"],
        maxlength: [50, "fullName 50 dan  uzun bo'lmasligi kerak"],
        // validate: {
        //     validator: function(v) {
        //         return typeof v === "string" && v.trim().length >= 3; 
        //     },
        //     message: "fullName kamida 3 ta belgidan iborat bo'lishi kerak " 
        // }
        // match: /^[a-zA-Z]+$/
    },
    email: {
        type: Date,
        required: true,
        max: [Date.now, "birthDate kelajak sana bo'lmasn"]
    },
    password: {
        type: Date,
        required: true,
        max: [Date.now, "deathDate kelajak sana bo'lmasn"]
    },
    role: {
    type: String,
    default: "user"
    },

    otp: {
        type: String,
        required: true,
        trim: true,
        minlength: [20, "bio kamida 20 ta bo'lishi kerak"],
        maxlength: [2000, "bio 2000 tadan ko'p bo'lmasn"]
    },  
     otpTime : {
        type: Number,
        required: true,
        trim: true,
        match: [/^[a-zA-ZÀ-žʻʼ’\s,.'-]+$/, "work noto'g'ri formatda"]
    }

},{
    versionKey: false,
    timestamps: true
})
const AuthSchema = model("auth", Auth)
module.exports = AuthSchema