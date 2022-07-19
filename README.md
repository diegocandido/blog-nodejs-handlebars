[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://github.com/diegocandido/) 


# BLOG EM NODEJS

Por [Diego Candido](https://diegocandido.com)

Montei esse projeto básico para usar NodeJS e MongoDB com uma template engine, nesse projeto usei o Handlebars.


## Imagem da construção do Blog

![img](https://user-images.githubusercontent.com/1766790/179835732-c4aff040-7eec-4476-9490-b803129d3c9e.jpg)


## Tutorial do Blog em NodeJS

Montei uma sequência de vídeos explicando a montagem desse projeto: 
[YouTube](https://youtube.com/playlist?list=PLEBXNCFr1wJIINQArd6vwlKz2BY1tI9I0)


## Banco de dados: Usei o MongoDB 

1) Obtendo um MongoDB 100% grátis e integrando com o VSCode:
[YouTube](https://www.youtube.com/watch?v=jLiSj_ZsdXc)

2) Montando uma conexão segura com o MongoDB:
[YouTube](https://www.youtube.com/watch?v=E-B7BonaKHE)

## Criando a conexão com o MongoDB

1) Crie na raiz do projeto um arquivo chamado:
```
.env
```

2) Coloque as seguintes informações:
```
MONGO_URL=COLE AQUI A URL DO MONGODB
PORT=5001
```

## Clonando o Repositório ##
Com o Git e o Node.js instalado na sua maquina e a **URL** do projeto em mãos, cria em algum lugar do seu pc uma pasta para criarmos uma copia do repositório, dentro dela abra o **cmd** ou **powershell** e digite os comandos abaixo:
```
git clone https://github.com/diegocandido/blog-nodejs-handlebars
cd blognodejs-handlebars
npm install
npm run dev
```

