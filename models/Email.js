const sgMail = require("@sendgrid/mail");

// Set your SendGrid API key
sgMail.setApiKey("7A14F9D06EED64E7A49BEC7F891653B4B083AF38B5985DC9771C45C635ED9E9AEAED0995DB2529034873EBC27A8F9AFA");

// Create a function to send an email
async function sendEmail(toEmail, subject, textContent, htmlContent) {
  const msg = {
    to: toEmail,
    from: "integrate360@gmail.com", 
    subject: subject,
    text: textContent,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Example usage:
sendEmail(
  "recipient@example.com",
  "Test Email",
  "This is a plain text email.",
  "<p>This is an HTML email.</p>"
);
