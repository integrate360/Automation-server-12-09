const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");

// Set your SendGrid API key
sgMail.setApiKey(
  "SG.7A14F9D06EED64E7A49BEC7F891653B4B083AF38B5985DC9771C45C635ED9E9AEAED0995DB2529034873EBC27A8F9AFA"
);

// Define a POST route to handle email submissions
router.post("/sendemail", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create an email message
    const msg = {
      to: "integrate360@gmail.com", // Replace with the recipient's email address
      from: email, // Use the sender's email from the form
      subject: subject,
      text: message,
    };

    // Send the email using SendGrid
    await sgMail.send(msg);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "An error occurred while sending the email" });
  }
});

module.exports = router;
