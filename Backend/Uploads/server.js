const express = require('express');
const cors = require('cors');
const bodyParser = require ('body-parser');
const multer = require ('multer');
const fs = require ('fs');
const path = require ('path');
const transporter = require ('./config//emailConfig');



const app = express();
const PORT = 3000;

//middlewares

app.use(cors());
app.use(bodyParser());
app.use(express.static(Front));
app.use('./Uploads', express.static(path.join(__dirname, 'Uploads')));

//Configuração do upload de arquivos

const storage  =  multer.diskStorage(
    {
        destination: './Backend/Uploads', 
        filername: (req, file, cb) => {
            cb(null, '${Date.now()}-${File.originalname}');
        }
    }
);

const Upload = multer({storage: Sorage});

// Rota para receber denúncias
app.post('/api/denuncia', upload.single('anexo'), (req, res) => {
    const { setor, data, descricao } = req.body;
    const anexo = req.file ? req.file.filename : null;
    const novaDenuncia = {
        id: Date.now(),
        setor,
        data,
        descricao,
        anexo
    };

    // Salvar no arquivo JSON
    const filePath = path.join(__dirname, 'data', 'denuncias.json');
    const denuncias = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
    denuncias.push(novaDenuncia);
    fs.writeFileSync(filePath, JSON.stringify(denuncias, null, 2));

    // Enviar email
    const mailOptions = {
        from: 'Canal de Denúncias <seuemail@gmail.com>',
        to: 'compliance@empresa.com',
        subject: 'Nova Denúncia Recebida',
        text: `Setor: ${setor}\nData: ${data}\nDescrição: ${descricao}\nAnexo: ${anexo ? 'Sim' : 'Não'}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar email:', error);
        } else {
            console.log('Email enviado:', info.response);
        }
    });

    res.json({ message: 'Denúncia enviada com sucesso!' });
});

// Rota para buscar denúncias (painel admin)
app.get('/api/denuncias', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'denuncias.json');
    const denuncias = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
    res.json(denuncias);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



