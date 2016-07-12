/**
 * Created by davir on 7/10/2016.
 */
const nodemailer = require('nodemailer');
var smtpConfig = {
    pool: true,
    host: 'mail.sandwichcubano.com',
    port: 587,
    secure: false,
    ignoreTLS: true,
    debug: true,
    auth: {
        user: 'notiqbano@sandwichcubano.com',
        pass: '2016ObsequioQbano'
    }
};
var messages = [];
var transporter = nodemailer.createTransport( smtpConfig);

var sendMessages = function(){
    if(transporter.isIdle() && messages.length){
        var options = messages.shift();
        transporter.sendMail(options, function(error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response)
        });
    }
};

setInterval(sendMessages, 1000);


module.exports = {
    incription: function(dest){
        console.log(`Enviando correo a ${dest}`);
        var mailOptions = {
            from: 'notiqbano@sandwichcubano.com', // sender address
            to: dest, // list of receivers
            subject: 'Agranda y punto', // Subject line
            text: 'Si no puede ver este mensaje haga click en http://agrandaypunto.sandwichcubano.com/images/mail_templates/mensaje_correo.jpg ', // plaintext body
            html: '<img src="cid:unique@kreata.ee"/>', // html body
            attachments: [{
                filename: 'mensaje_correo.jpg',
                path: __dirname + '/../public/images/mail_templates/mensaje_correo.jpg',
                cid: 'unique@kreata.ee' //same cid value as in the html img src
            }]

        };
        messages.push(mailOptions);
    }
};