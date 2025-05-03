# 🤖 Bot de Cadastro Automático via WhatsApp para Even3

Este projeto é um bot desenvolvido em **Node.js** que automatiza o processo de cadastro de participantes na plataforma [Even3](https://www.even3.com.br/) através do **WhatsApp**. Ele foi criado para facilitar a inscrição de usuários em eventos, eliminando a necessidade de preenchimento manual de formulários.

---

## 🚀 Funcionalidades

- 📲 **Integração com WhatsApp**: Recebe mensagens dos usuários e coleta informações necessárias para o cadastro.
- 📝 **Coleta de Dados**: Solicita e armazena dados como nome completo, e-mail e telefone.
- 🔄 **Automação de Cadastro**: Utiliza as informações coletadas para realizar o cadastro automático na plataforma Even3.
- 📧 **Confirmação**: Envia uma mensagem de confirmação ao usuário após o cadastro bem-sucedido.

---

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/) – Ambiente de execução JavaScript.
- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) – Biblioteca para interação com o WhatsApp Web.
- [axios](https://axios-http.com/) – Cliente HTTP para envio de requisições à API da Even3.
- [dotenv](https://www.npmjs.com/package/dotenv) – Gerenciamento de variáveis de ambiente.

---

## 📂 Estrutura do Projeto

```
Bot_Cadastros/
├── index.js
├── package.json
├── package-lock.json
└── .env
```

- `index.js`: Arquivo principal que contém a lógica do bot.
- `package.json`: Gerencia as dependências do projeto.
- `.env`: Armazena variáveis de ambiente, como tokens de autenticação.

---

## ⚙️ Como Executar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/gabszin/Bot_Cadastros.git
   cd Bot_Cadastros
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Execute o bot:**

   ```bash
   node index.js
   ```

   Ao iniciar, o bot abrirá uma janela do navegador para autenticação no WhatsApp Web. Escaneie o QR Code com o aplicativo do WhatsApp.

---

## 🧪 Exemplo de Uso

1. O usuário envia uma mensagem para o número do bot no WhatsApp com o comando "!cad Nome Sobrenome E-mail".
2. Após receber todas as informações, o bot realiza o cadastro na plataforma Even3 e envia um email com uma mensagem padronizada e o QR-Code de acesso para o cliente do evento.
3. O usuário recebe uma mensagem de confirmação e o QR-Code de acesso do cliente do evento.
4. O bot conta com o comando "!comandos" para mostrar as funções e com mensagens de respostas automáticas personalizaveis para recebimento de mensagens que não correspondam a comandos existentes.

---

## 📌 Observações

- Certifique-se de que o número de telefone utilizado pelo bot esteja ativo e possa ser autenticado no WhatsApp Web.
- Para utilização correta deve-se estar logado na plataforma da even3 e com o evento já criado dentro da plataforma.
- Para rodar as ações em segundo plano, deve mudar o campo "headless" para "true"

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 👤 Autor

**Gabriel Henrique Braga Saraiva**

- [GitHub](https://github.com/gabszin)
- [LinkedIn](https://www.linkedin.com/in/gabriel-henrique-braga-saraiva/)
