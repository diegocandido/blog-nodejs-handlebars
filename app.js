const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const handlebars = exphbs.create({});
const mongoose = require('mongoose');
const path = require('path');
const passport = require("passport");
const moment = require("moment");

const { postagens } = require("./models/Postagem")
const { categorias } = require("./models/Categoria")

// Passport de autenticacao
require("./config/auth")(passport)

// ENV com dados do Mongo
require('dotenv').config();


// Rotas
const admin = require('./routes/admin');
const usuario = require('./routes/usuario');

// Encoded
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

//Sessao
app.use(session({
    secret:"blog-em-node-js",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Public Functions
app.use(express.static(path.join( __dirname, 'public' )));
//app.use(bodyparser.urlencoded({extended : true }));

//Rotas
app.use('/admin', admin)
app.use('/admin', usuario)

//Middleware
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error =req.flash("error")
    res.locals.user = req.user || null;
    res.locals.moment = moment;
    next();
});


// Conecation MongoDB
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_DB,
{useNewUrlParser: true})
.then(()=>{
    console.log('Mongo conectado')
}).catch((err)=> {
    console.log('Erro ao conectar ao Mongo online')
});


const PORT = process.env.PORT || 5005


app.get('/', (req, res) => {
    postagens.find().populate("categoria").sort({date:"desc"}).lean().then((postagens) =>{
        res.render('home', { postagens: postagens })
    }).catch((err) => {
        res.redirect("/404")
    })
    
});

app.get("/404", (req,res) => {
    res.send("Erro 404! :(")
})

app.listen(PORT, () => {
    console.log('Escutando na porta: ' + PORT )
})