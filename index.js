const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const bodyParser = require('body-parser');
const qrcode = require('qrcode-terminal');

// Inicializar o cliente WhatsApp com persistência de sessão
const client = new Client({
    authStrategy: new LocalAuth(), // Persistência automática
});

const app = express();
app.use(bodyParser.json());

// Evento para exibir o QR Code (apenas na primeira autenticação)
client.on('qr', (qr) => {
    console.log('QR Code gerado. Escaneie no WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Evento disparado quando o cliente está pronto
client.on('ready', () => {
    console.log('Client is ready!');
});

// Evento para monitorar desconexões
client.on('disconnected', (reason) => {
    console.log('Cliente desconectado:', reason);
    console.log('Reconectando...');
    client.initialize(); // Reinicializar o cliente
});

// Inicializar o cliente
client.initialize();

// Rota para receber dados do PHP e enviar a mensagem
app.post('/send-message', (req, res) => {
    let { telefone, mensagem } = req.body;

    // Remover caracteres não numéricos do telefone
    telefone = telefone.replace(/\D/g, ''); // Remove tudo que não for número

    // Verificar se o telefone possui DDD e número com tamanho correto
    if (telefone.length >= 12 && telefone.length <= 13) {
        // Formatar o telefone para o formato WhatsApp
        const telefoneWhatsApp = `${telefone}@c.us`;

        // Enviar mensagem pelo WhatsApp
        client.sendMessage(telefoneWhatsApp, mensagem)
            .then(() => res.status(200).send({ success: true }))
            .catch((err) => {
                console.error('Erro ao enviar mensagem:', err);
                res.status(500).send({ success: false, error: err });
            });
    } else {
        res.status(400).send({ success: false, error: 'Número inválido' });
    }
});

// Inicializar o servidor Node.js na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
