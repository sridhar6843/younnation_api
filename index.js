// LOCAL MODULE

// CORE MODULE

// THIRD PARTY MODULE
const nodemailer = require("nodemailer");
const express = require("express");
const sendMail = require("./mail");
const app = express();
const path = require("path");

const PORT = 8080;

// DATA Parsing

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.post("/email", (req, res) => {
  console.log("Data:", req.body);
  const { email, subject, content } = req.body;

  let testAccount = nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "srimdga@gmail.com", // generated ethereal user
      pass: "RoyalEnfieldClassic350", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: "srimdga@gmail.com", // sender address
    to: "srimdga@gmail.com", // list of receivers
    subject: subject + " " + email, // Subject line
    html: "<b> Hello " + content + " </b> <br> <h3> Email: " + email + "</h3>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // sendMail(email, subject, text, function (err, data) {
  //   if (err) {
  //     res.status(500).json({ message: "INTERNAL ERROR" });
  //   } else {
  //     res.json({ message: "Email Sent" });
  //   }
  // });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log("serve is ", 8080);
});
