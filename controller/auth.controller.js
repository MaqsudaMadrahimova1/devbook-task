const CustomErrorHandler = require("../error/custom-error.handler")
const AuthSchema = require("../schema/auth.schema")
const { access_token } = require("../utils/jwt")
const sendMessage = require("../utils/send-email")

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
      await AuthSchema.create({
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
        const {email,password} = req.body
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
}
module.exports = {
    register,
    verify
}