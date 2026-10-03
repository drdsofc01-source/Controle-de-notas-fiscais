const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do diretório de dados persistentes (Render Disk ou local)
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');

// Garante que o diretório de dados existe
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Middlewares para parsing do corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve todos os arquivos estáticos da pasta 'public' (CSS, imagens, JS, HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Rota Principal: Serve o index.html quando acessar a raiz '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota alternativa/direta para a página master
app.get('/master', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'master.html'));
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Diretório de dados configurado em: ${DATA_DIR}`);
});