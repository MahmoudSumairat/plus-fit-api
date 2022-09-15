const nodemailer = require("nodemailer");
const handleResSuccess = require("../helpers/successHandler");
const handleResError = require("../helpers/errorHandler");
const { mailConfig, mailOptions } = require("../config/mail");

exports.reportVisit = (req, res) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailConfig.EMAIL,
      pass: mailConfig.PASSWORD,
    },
  });

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      handleResError(err, res);
    } else {
      console.log("Email sent: " + info.response);
      handleResSuccess(res, "email send successfully");
    }
  });
};
