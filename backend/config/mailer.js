const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendCodeEmail = (to, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Mã xác nhận',
    html: `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;"> 
      <h1 style="color: #007BFF;">Chào bạn,</h1> 
      <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Dưới đây là mã xác minh của bạn:</p>
      <div style="background-color: #F0F0F0; padding: 10px; border-radius: 5px; text-align: center;"> 
        <h2 style="margin: 0; font-size: 24px; color: #007BFF;">${code}</h2> 
      </div> 
      <p style="margin-top: 20px;">Mã này sẽ hết hạn sau 15 phút.</p> 
      <p>Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.</p> 
    </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

const sendPasswordEmail = (to, password, loginPage) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Mật khẩu mới',
    html: `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;"> 
      <h1 style="color: #007BFF;">Chào bạn,</h1> 
      <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Dưới đây là mật khẩu mới của bạn:</p>
      <div style="background-color: #F0F0F0; padding: 10px; border-radius: 5px; text-align: center;"> 
        <h2 style="margin: 0; font-size: 24px; color: #007BFF;">${password}</h2> 
      </div> 
      <p style="margin-top: 20px;">Vui lòng đổi mật khẩu sau khi đăng nhập.</p>
      <a href="${loginPage}" style="padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">Nhấn vào đây để đăng nhập</a> 
    </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendCodeEmail, sendPasswordEmail };
