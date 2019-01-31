const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

exports.sendUpdate = functions.database.ref('/last')
  .onUpdate((snapshot, context) => {
    const original = snapshot.after.val();
    console.log(original)

    var businessLength = ""
    if(original.date.started) businessLength = original.date.month + "/" + original.date.year
    else businessLength = "Not started"

    var htmlMessage = "<h3>New Entry by " + original.information.name + "</h3><p>The parameters are as follows:<br><br><p>Amount Seeking: <span><h5>"+ original.seeking +"</h5></span></p><p>Credit Score: <span><h5>"+ original.credit +"</h5></span></p><p>Starting date of business: <span><h5>"+ businessLength +"</h5></span></p><br><p>Monthly revenue: <span><h5>"+ original.revenue +"</h5></span></p>"

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'dev@hightechxl.com',
            pass: 'GetOrganized17!'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Investment Calculator on CapitalAccessIntl" <admin@capitalaccessintl.com>', // sender address
        to: "joweidner@live.com", // list of receivers
        subject: 'New Entry to the Investment Calculator!', // Subject line
        text: htmlMessage, // plain text body
        html: htmlMessage // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        console.log("Email Sent!")
    });

    return "Email Sent"
  });