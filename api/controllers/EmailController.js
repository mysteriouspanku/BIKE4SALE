const EmailController = require("express").Router();
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

// send mail with defined transport object
EmailController.post("/sendMail", (req, res) => {
  const { ownerEmail, ownerName, customerName, customerEmail, messageBody } =
    req.body;

  const companyName = "Bikes 4 Sale";

  // create reusable transporter object using the default SMTP transport and our gmail account credentials
  // as defined in the .env file
  let config = {
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(config);

  // Configure mailgen by setting a theme and your product info
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: companyName,
      link: "https://google.com/",
    },
  });

  // Prepare email contents
  let response = {
    body: {
      name: ownerName,
      intro: `${customerName} is interested in your bike, please contact him/her. Here's a message from him/her:- <br /><br /> ${customerName}: ${messageBody}`,
      action: {
        button: {
          color: "#22BC66", // Optional action button color
          text: "Contact this user",
          link: `https://mail.google.com/mail/?view=cm&fs=1&to=${customerEmail}`,
        },
      },
    },
  };

  // Generate an HTML email with the provided contents
  let emailBody = MailGenerator.generate(response);

  // message object
  let message = {
    from: process.env.EMAIL,
    to: ownerEmail,
    subject: "We got a Customer!",
    html: emailBody,
  };

  // send mail with defined transport object
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(200).json({
        message: "you should receive an email",
      });
    })
    .catch((err) => {
      return res.status(500).json({ err });
    });
});

module.exports = EmailController;
