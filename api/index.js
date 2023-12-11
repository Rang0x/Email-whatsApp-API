
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Nodemailer transporter
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rengawy1@gmail.com',
    pass: 'jpiofdzcpozcqepg'
  }
});

// Twilio client
const twilioClient = twilio('AC0c45c1427f514b5bb13edf044bc16f5e', 'a3e7f3e25a9e3eb75b62d93ad158d6c6');

// API endpoint for sending email and WhatsApp message
app.post('/send-message', async (req, res) => {
  const { toEmail, toWhatsApp, subject, body } = req.body;

  // Email options
  const emailOptions = {
    from: 'your@gmail.com',
    to: toEmail,
    subject,
    html: body
  };

  // Twilio WhatsApp message options
  const whatsappMessageOptions = {
    from: 'whatsapp:+14155238886', // Twilio's sandbox number, replace with your Twilio number
    to: `whatsapp:${toWhatsApp}`,
    body
  };

  try {
    // Send email
    await emailTransporter.sendMail(emailOptions);

    // Send WhatsApp message
    await twilioClient.messages.create(whatsappMessageOptions);

    res.status(200).send('Email and WhatsApp message sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending message');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
