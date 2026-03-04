const {Router} = require("express")
const { register, verify } = require("../controller/auth.controller")


const authRouter = Router()
const verifyToken = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const validateProfile = require("../middleware/auth.validator.middleware");
const { updateProfile } = require("../controller/auth.controller");
authRouter.put("/update", verifyToken,upload.single("avatar"), validateProfile, updateProfile);
authRouter.post("/register",register)
authRouter.post("/verify",verify)


module.exports = authRouter