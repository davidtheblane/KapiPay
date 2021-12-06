![production deploy status](https://github.com/davidtheblane/KapiPay/actions/workflows/production_deploy.yml/badge.svg)

![kapipay-banner (3)](https://user-images.githubusercontent.com/42559009/144868668-e8344fdf-ea14-4009-8a28-252dca15c6be.png)

## ⚙️ Descrição do projeto
Kapipay é uma aplicação feita no programa de formação da linkapi, com o intuito de treinar e capacitar os trainees do programa. Cada candidato pode escolher um projeto de interesse pessoal e desenvolve-lo durantes 3 meses com mentoria de um dev senior e aulas e workshops ministradas com devs experientes. 

O desafio é criar do **ZERO** o ciclo completo de desenvolvimento de um APP e uma API totalmente funcional com:
- Banco de Dados
- Versionamento
- Ambientes de Produção e Desenvolvimento 
- Deploy em cloud 
- CI/CD
- Integração com outras API's 
- Domínio
- Certificado SSL
- Documentação

## ⚙️ Descrição da aplicação
Essa aplicação é integrada a um gateway de pagamento onde o cliente pode cadastrar seus prestadores de serviços e suas faturas recebidas, e assim realizar o agendamento dos pagamentos para que o mesmo seja feito automaticamente na data escolhida.

## 📖 A proposta
A proposta é evitar que o usuário tenho que ficar acessando diversas plataformas diferentes para conseguir acessar suas contas e efetuar seus pagamentos, na kapipay uma vez o cadastro feito e a conta digital criada e verificada o usuário terá apenas que incluir seus fornecedores e faturas e agendar o pagamento que será feito com o crédito disponível na conta digital.(crédito inserido pelo usuário via cartão de crédito)

## 🔨 Funcionalidades
- `Criação de conta digital.`
- `Cadastro de prestadores de serviços.`
- `Cadastro de faturas e boletos.` 
- `Agendamento para pagamento.`

## 🎥 Overview do Sistema
![Screencast_12-06-2021_09_17_56 AM](https://user-images.githubusercontent.com/42559009/144866478-3448134f-6a89-4d49-98b8-d83691a1cef4.gif)

## 📑 Documentação
https://app.swaggerhub.com/apis-docs/davidtheblane/KapiPay/1.0.0

## 🛰️ Tecnologias utilizadas.
- Linguagem
  - Javascript
  - Nodes.JS

- UX/UI
  - EJS
  - HTML + CSS
  - Bootstrap
  - Sweet Alert 2

- Banco de dados
  - MongoDB Atlas

- Deploy
  - Digital Ocean
   
- Monitoramento de erros e logs
  - Sentry  
   
- API'S
  - Juno
  - Correios
  - Zenvia RCS
  - Linkapi

- Domínio 
  - Namecheap
   
- Certificado SSL
  - Let's Encrypt 
  
- Documentação da API
  - Swagger Hub 


## 🧪 Testar o projeto
A aplicação é dividida em duas, APP e API
- Clone o repositório na sua máquina
- Execute npm install
- Preencha as informações necessário no arquivo .env.development e renomeie para .env

## 🧔 Desenvolvedores do Projeto
Davi Bernardo

## 🧮 Licença
MIT
