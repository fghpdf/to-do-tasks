var nodemailer = require('nodemailer');

var smtpConfig = {
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: '522022703@qq.com',
        pass: 'QAZwsx940919@'
    }
};


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);



function send(receiver, subject, text, html) {
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '管理员<522022703@qq.com>', // sender address
        to: receiver, // list of receivers
        subject: subject, // Subject line
        text: text, // plaintext body
        html: html // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

module.exports = {
    send: send
};
