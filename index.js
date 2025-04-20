const qrcode = require('qrcode-terminal');

const puppeteer = require('puppeteer');

const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user:'seuemail@gmail.com',
        pass:'senhadoemailparaaplicativos',
    },
    tls:{
        rejectUnauthorized: false
    }
});

const {Client, LocalAuth, MessageMedia} = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => { 
    console.log('Pronto pra começar!');
});

client.on('message', async (message) => {
    const body = message.body.trim();
    console.log(body);

    if (body.startsWith('!cad') && body.length > 5) {
        const args = body.slice(5).trim().split(/\s+/);

        if (args.length === 3) {
            const nome = args[0];
            const sobrenome = args[1];
            const email = args.slice(2).join(' ');

            const nomeCompleto = `${nome} ${sobrenome}`;

            await message.reply(`Cadastro recebido:\n🧍 Nome: ${nome} ${sobrenome}\n📧 Email: ${email}`);

            await cadastrarNaEven3(nomeCompleto, email, message);


        } else {
            await message.reply('⚠️ Formato incorreto. Use:\n\n !cad nome sobrenome email');
        }

        return;
    }

    else if (body === '!comandos') {
        await message.reply('Meus comandos são esses:\n\n Cadastrar pessoa no evento:\n !cad Nome Sobrenome Email\n\n Ver comandos:\n !comandos\n\n 😉😉');
        return;
    }

    else{
        await message.reply('Sou apenas um bot, mande !comandos para ver meus comandos. 👍')
    }
});

async function cadastrarNaEven3(nomeCompleto, email, message) {
    const navegador = await puppeteer.launch({ 
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        userDataDir: 'C:Diretório do seu User Data no Chrome'
    });

    const pagina = await navegador.newPage();

    try {
        await pagina.goto('https://www.even3.com.br/organizador/people/', { waitUntil: 'networkidle2' });

        // Clica em "Adicionar participante"
        await pagina.waitForSelector('.fa.fa-plus');
        await pagina.click('.fa.fa-plus');

        // Preenche os dados
        await pagina.waitForSelector('.form-control');
        const inputs = await pagina.$$('.form-control');
        await inputs[0].type(nomeCompleto); 
        await inputs[1].type(email);        

        // Seleciona o ingresso
        await pagina.waitForSelector('select[ng-model="novaPessoa.idIngresso"]');
        await pagina.evaluate(() => {
            const select = document.querySelector('select[ng-model="novaPessoa.idIngresso"]');
            select.value = 'number:616348';
            select.dispatchEvent(new Event('change', { bubbles: true }));
        });

        // Clica no botão de salvar
        await pagina.waitForSelector('.fa-check');
        await pagina.click('.fa-check');

// Aguarda a página atualizar (espera 3 segundos)
        await new Promise(resolve => setTimeout(resolve, 3000));

        await pagina.waitForSelector('.panel-pessoas'); // Espera os cartões renderizarem
        const emailParaBuscar = email.toLowerCase();
        const cards = await pagina.$$('.panel-pessoas');
        let painelEncontrado = false;
        
        for (const card of cards) {
            const textoCard = await pagina.evaluate(el => el.innerText.toLowerCase(), card);
            console.log(`🔍 Verificando cartão com texto: "${textoCard}"`);
        
            if (textoCard.includes(emailParaBuscar)) {
                painelEncontrado = true;
        
                console.log(`✅ Cartão encontrado com email ${email}`);
        
                // Clica no cartão
                await card.click();
                await new Promise(resolve => setTimeout(resolve, 3000));
        
                // Clica no botão "Inscrição" dentro do card
                await pagina.waitForSelector('.mm-item p');

                const botoes = await pagina.$$('.mm-item');
                
                let clicou = false;
                
                for (const botao of botoes) {
                    const texto = await pagina.evaluate(el => el.innerText.trim().toLowerCase(), botao);
                    if (texto.includes('inscrição')) {
                        await botao.click();
                        console.log("✅ Clicou no botão 'Inscrição'");
                        clicou = true;
                        break;
                    }
                }
                
                if (!clicou) {
                    console.log("❌ Não encontrou nenhum botão 'Inscrição' na página.");
                }

                break;
            }
        }

        // Acessa painel da inscrição
        await pagina.waitForSelector('.panel-heading.accordion-toggle', { visible: true });
        await pagina.click('.panel-heading.accordion-toggle');

        // Aguarda link de impressão
        await pagina.waitForSelector('a[href*="_impressaoentrada"]');
        const linkImpressao = await pagina.evaluate(() => {
            const link = document.querySelector('a[href*="_impressaoentrada"]');
            return link ? link.href : null;
        });

        if (linkImpressao) {
            await pagina.goto(linkImpressao, { waitUntil: 'networkidle2' });

            // Aguarda botão do crachá
            await pagina.waitForSelector('a[href*="printaccessbadge"]');
            const linkCracha = await pagina.evaluate(() => {
                const botaoCracha = document.querySelector('a[href*="printaccessbadge"]');
                return botaoCracha ? botaoCracha.href : null;
            });

            if (linkCracha) {
                await pagina.goto(linkCracha, { waitUntil: 'networkidle2' });

                await pagina.waitForSelector('.quadrante-1');
                const element = await pagina.$('.quadrante-1');
                await element.screenshot({ path: 'cracha.png' });

                const media = await MessageMedia.fromFilePath('cracha.png');
                await client.sendMessage(message.from, media);

                await sendClientEmail(email);
            }
        }


        await navegador.close();

    } catch (err) {
        console.error("Erro no processo de cadastro:", err);
        await navegador.close();
    }
};

async function sendClientEmail(email) {
    console.log('📨 Iniciando envio de e-mail para:', email);

    try {
        const info = await transport.sendMail({
            from: 'Seu email <seuemail@gmail.com>',
            to: email,
            subject: 'Assunto do Email',
            html: `
                <h1>Aqui está seu ingresso!</h1>
                <p>ATENÇÃO!!! Esse ingresso é único e uma vez escaneado no dia do evento, não pode ser usado denovo, NÃO COMPARTILHE!</p>
                <p>Apresente este QR Code na entrada do evento:</p>
                <img src="cid:qrcode" />
                <p>Se tiver algum problema, por favor entre em contato com os Administradores do evento!</p>

            `,
            attachments: [{
                filename: 'suafoto.png',
                path: 'suafoto.png',
                cid: 'qrcode' 
            }]
        });

        console.log('✅ Email enviado com sucesso: ' + info.messageId);
    } catch (error) {
        console.error('❌ Erro ao enviar email:', error);
    }
};

client.initialize();