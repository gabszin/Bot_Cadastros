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

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto com as seguintes informações:

   ```env
   EVEN3_API_KEY=seu_token_even3
   ```

4. **Execute o bot:**

   ```bash
   node index.js
   ```

   Ao iniciar, o bot abrirá uma janela do navegador para autenticação no WhatsApp Web. Escaneie o QR Code com o aplicativo do WhatsApp.

---

## 🧪 Exemplo de Uso

1. O usuário envia uma mensagem para o número do bot no WhatsApp.
2. O bot responde solicitando as informações necessárias para o cadastro.
3. Após receber todas as informações, o bot realiza o cadastro na plataforma Even3.
4. O usuário recebe uma mensagem de confirmação.

---

## 📌 Observações

- Certifique-se de que o número de telefone utilizado pelo bot esteja ativo e possa ser autenticado no WhatsApp Web.
- A API da Even3 deve estar acessível e o token de autenticação deve ser válido.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 👤 Autor

**Gabriel Henrique Braga Saraiva**

- [GitHub](https://github.com/gabszin)
- [LinkedIn](https://www.linkedin.com/in/gabriel-henrique-braga-saraiva/)