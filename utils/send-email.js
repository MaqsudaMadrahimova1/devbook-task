const nodemailer = require("nodemailer")
const CustomErrorHandler = require("../error/custom-error.handler")

async function sendMessage(code, email){
    try{
     const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: "maqsudamadrahimova.9@gmail.com",
            pass: process.env.GOOGLE_PASS
        }
     })
     await transporter.sendMail({
        subject: "Task",
        from: "maqsudamadrahimova.9@gmail.com",
        to: email,
        text: `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Xush kelibsiz</title>
</head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;margin:40px 0;border-radius:20px;overflow:hidden;box-shadow:0 15px 40px rgba(0,0,0,0.08);">

<!-- HEADER -->
<tr>
<td style="background:linear-gradient(135deg,#6C5CE7,#a29bfe);padding:40px 30px;text-align:center;color:white;">
<h1 style="margin:0;font-size:28px;letter-spacing:1px;">📚 BookLand</h1>
<p style="margin-top:10px;font-size:15px;opacity:0.9;">Kitoblar dunyosiga xush kelibsiz</p>
</td>
</tr>

<!-- BODY -->
<tr>
<td style="padding:40px 35px;color:#333333;">

<h2 style="margin-top:0;font-size:22px;">Salom, Aziz Kitobxon! ✨</h2>

<p style="font-size:15px;line-height:1.7;color:#555;">
Bugundan boshlab siz bilim, ilhom va hikoyalar olamiga qadam qo‘ydingiz. 
Har bir sahifa — yangi hayot, yangi fikr va yangi orzular demakdir.
</p>

<div style="background:#f8f9ff;border-radius:15px;padding:20px;margin:30px 0;">
<p style="margin:0;font-size:14px;color:#6C5CE7;font-weight:bold;">
🎁 Siz uchun maxsus tavsiyalar tayyor!
</p>
<p style="margin-top:8px;font-size:14px;color:#666;">
Eng mashhur kitoblar, yangi bestsellerlar va eksklyuziv chegirmalar sizni kutmoqda.
</p>
</div>

<!-- BUTTON -->
<div style="text-align:center;margin-top:30px;">
<a href="#" 
style="background:linear-gradient(135deg,#6C5CE7,#a29bfe);
color:white;
text-decoration:none;
padding:15px 35px;
border-radius:50px;
display:inline-block;
font-weight:bold;
font-size:14px;
box-shadow:0 10px 20px rgba(108,92,231,0.3);">
📖 Kitoblarni Ko‘rish
</a>
</div>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="background:#f4f6fb;padding:25px;text-align:center;font-size:12px;color:#888;">
© 2026 BookLand. Barcha huquqlar himoyalangan. <br>
Agar bu xat sizga xato yuborilgan bo‘lsa, uni e’tiborsiz qoldiring.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>`

     })
    }catch{
        throw CustomErrorHandler.InternalServerError(error.message)
    }
}
module.exports = sendMessage