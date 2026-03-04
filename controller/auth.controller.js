const CustomErrorHandler = require("../error/custom-error.handler")
const AuthSchema = require("../schema/auth.schema")
const { access_token } = require("../utils/jwt")
const sendMessage = require("../utils/send-email")
const bcrypt = require("bcrypt");

const register = async (req, res,next ) => {
    try {
        const {username,email,password} = req.body
        const foundedUser = await AuthSchema.find({email})
        if(foundedUser){
            throw CustomErrorHandler.BadRequest("User already exits")
        }
      const hashPassword = await bcrypt.hash(password,12)
      const code = Array.from({length: 6}, () => (Math.round() * 6)).join("")


      await sendMessage(code,email)
      const newUser = await AuthSchema.create({
        username,
        email,
        password,
        otp: code,
        otpTime: Date.now()+120000
      })

        return res.status(200).json(auth)
    } catch {
     next(error)
    }
}
const verify = async (req, res,next ) => {
    try {
        const {email,code} = req.body
        const foundedUser = await AuthSchema.find({email})
        if(!foundedUser){
            throw CustomErrorHandler.BadRequest("User not found")
        }
        if(!foundedUser.otp){
            throw CustomErrorHandler.UnAuthorized("Otp not found")
        }
        if(!foundedUser.otp !== code){
            throw CustomErrorHandler.UnAuthorized("Wrong otp")
        }
        if(!foundedUser.otpTime < Date.now()){
            throw CustomErrorHandler.UnAuthorized("Otp expired")
        }

         await AuthSchema.findByIdAndUpdate(foundedUser._id, {otp: "",otpTime: 0})

         const accessToken = access_token({ id: foundedUser._id , role: foundedUser.role,email: foundedUser.email})
         const refreshToken = refresh_token({ id: foundedUser._id , role: foundedUser.role,email: foundedUser.email})
         res.cookie("refresh_token",refreshToken,
            {maxAge: 1000*60*15,
            httpOnly:true})
    
    //   await sendMessage(code,email)
    //   await AuthSchema.create({
    //     email,
    //     password,
    //     otp: code,
    //     otpTime: Date.now()+120000
    //   })

        return res.status(200).json({
            message: "Succses",
            token
        }
        )
    } catch {
     next(error)
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user.id; 
        const { username, bio } = req.body;
        
        let updateData = { username, bio };

        if (req.file) {
            updateData.avatar = req.file.filename;
        }

        const updatedUser = await AuthSchema.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true }
        ).select("-password -otp -otpTime");

        res.status(200).json({
            message: "Profile updated",
            user: updatedUser
        });
    } catch (error) {
        next(error);
    }
};
module.exports = {
    register,
    verify
}