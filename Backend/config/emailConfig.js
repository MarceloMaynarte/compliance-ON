const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'marcelo.moreira@onmnia.com.br', // Coloque seu email
        pass: 'Admin@Admin' // Senha ou App Password
    }
});

module.exports = transporter;