# Letmeask

Projeto desenvolvido durante a NLW, ofecerido pela RocketSeat.

### **Descrição**

O aplicativo e uma especie de chat, onde um usuario devidamente autenticado cria uma sala.
Esta sala gera um codigo(a **chave** disponibilizada pelo **firebase**) que é então fornecido a outros usuários,
que caso não sejam autenticados(os usuários) podem apenas visualizar as perguntas na sala, so e possivel postar alguma pergunta
estando devidamente autenticado.

### **Configuraçao**

O aplicativo vai ser configurado usando o **webpack**. Para os testes sera utilizado o **jest** em conjunto com suas ferramentas auxiliares.

1. No webpack serão criadas 4 configurações basicas de arquivos, sendo necessario seus respectivos loaders.
   - ts e tsx(babel-loader).
   - js e jsx(babel-loader).
   - svg(file-loader).
   - scss(style-loader, css-loader, sass-loader).
2. A biblioteca **dotenv** é necessaria para processar/passar as informações do arquivo **.env.local** para o aplicativo.

A configurção do ambiente de testes foi ligeiramente complexa:

1. **ts-jest** é necessario para habilitar o typescript no ambiente de testes.
2. No arquivo **jest.config.js** foram definidos as configurações para processar os arquivos de _assets_, foi
   usado o **identity-obj-proxy** para isso.
3. No arquivo **package.json** foi necessario incluir o parametro _--env=jsdom_, para configurar o ambiente de testes
   para renderizar corretamente os componentes.
