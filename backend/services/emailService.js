const nodemailer = require('nodemailer');

// Configure your email provider
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password_or_app_password'
  }
});

async function sendReminderEmail(to, name) {
  const mailOptions = {
    from: 'Student Progress Tracker <your_email@gmail.com>',
    to,
    subject: 'We Miss You! Get Back to Solving Problems 🚀',
    html: `<p>Hi ${name},</p>
           <p>We noticed you haven’t made any Codeforces submissions in the last 7 days.</p>
           <p>Keep pushing forward and continue your problem-solving journey!</p>
           <p>Best,<br/>Student Progress Management System</p>`
  };

  await transporter.sendMail(mailOptions);
  console.log(`📧 Reminder email sent to ${to}`);
}

module.exports = { sendReminderEmail };
