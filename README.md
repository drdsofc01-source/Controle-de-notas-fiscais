# SOL & MAR LOGG — Notas Fiscais

- `/`        → formulário público de envio (sem login), funciona no celular.
- `/master`  → painel com login e senha (até 3 acessos), notas por mês, baixar uma/todas (ZIP), Excel por período,
               editar/excluir, conferência de inconsistências e ⚙️ Configurações (acessos).

## 1. Testar no seu computador (precisa do Node.js 18 ou superior)
```
npm install
MASTER_USER=seu_usuario MASTER_PASSWORD=sua_senha_forte npm start      (Windows PowerShell: $env:MASTER_USER="..."; $env:MASTER_PASSWORD="..."; npm start)
```
Abra http://localhost:3000 (envio) e http://localhost:3000/master (painel).

## 2. Colocar online
Use qualquer hospedagem que rode Node.js **e tenha disco persistente** (VPS, Railway, Render, Fly.io etc. —
confirme no plano escolhido). Sem disco persistente, as notas somem a cada reinicialização.
Configure estas variáveis de ambiente no servidor:

| Variável | Para quê |
|---|---|
| `MASTER_USER` / `MASTER_PASSWORD` | cria o primeiro acesso Master (só vale se ainda não houver nenhum) |
| `DATA_DIR` | pasta do disco persistente (notas e arquivos ficam aqui — faça backup dela) |
| `ANTHROPIC_API_KEY` | (opcional) permite conferir PDF e imagem por IA. XML é conferido sem chave |
| `CLAUDE_MODEL` | (opcional) modelo usado na conferência. Padrão: claude-sonnet-5-5 |

Comando de build: `npm install` — comando de start: `npm start`. Use HTTPS (a maioria das hospedagens já oferece).
Depois é só divulgar o endereço raiz (ex.: https://notas.suaempresa.com.br) aos prestadores.

## Notas
- Envio público tem proteções básicas: limite de 20 envios/hora por IP, campo anti-robô, tipos de arquivo conferidos e limite de 5 MB.
- Senhas Master ficam com hash (scrypt), sessão de 8 h, bloqueio após 10 tentativas erradas em 15 min.
- Os dados incluem CPF/CNPJ de terceiros: avise os prestadores sobre o uso dos dados (LGPD).
