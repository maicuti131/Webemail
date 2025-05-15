require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Trang web gửi email đã sẵn sàng!');
});

// API gửi email
app.get('/send-email', async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // nếu dùng SMTP khác thì dùng host/port
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL,
      subject: 'Test Email từ Render',
      text: 'Xin chào! Đây là email được gửi tự động từ trang web dùng Render.'
    });

    res.send('Email đã được gửi!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Gửi email thất bại.');
  }
});

app.listen(PORT, () => {
  console.log(`Server chạy ở cổng ${PORT}`);
});
