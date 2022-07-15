const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { eAdmin } = require("../helpers/eAdmin")

//Arquivos Models
const { usuarios } = require("../models/Usuario");
const passport = require('passport');


// Rotas 
router.get('/registro', eAdmin, (req,res) =>{
    usuarios.find().lean().then((usuarios) =>{
        res.render('usuario/registro', {usuarios: usuarios})
    })
})

router.get('/registro/add', eAdmin, (req,res) =>{
    res.render('usuario/addusuario')
})

router.post('/registro/nova', eAdmin, (req,res) =>{
    let erros = []

    if(!req.body.nome || req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"}) 
    }
    if(!req.body.email || req.body.email == undefined || req.body.email == null){
        erros.push({texto: "E-mail inválido"}) 
    }
    if(!req.body.senha || req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválido"}) 
    }
    if(req.body.length < 6){
        erros.push({texto: "Senha muito curta"}) 
    }
    if(req.body.senha != req.body.senha2){
        erros.push({texto: "Senhas diferentes"}) 
    }
    if(erros.length > 0){
        
        res.render("usuario/addusuario", {erros: erros})
    
    }else{

        
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.senha, salt);

                const novoUsuario = new usuarios({
                        nome: req.body.nome,
                        email: req.body.email,
                        senha : hash
                    })
                novoUsuario.save();

        
        res.redirect('/admin/registro')
        }
    })
        

    router.get('/login', (req,res) =>{
        res.render('usuario/login')
    })

    router.post('/login', (req,res, next) =>{
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "login",
            failureFlash: true
        })(req, res, next)
    })

    router.get("/logout", (req, res, next) => {
        req.logout((err) => {
            req.flash('success_msg', "Deslogado com sucesso!")
            res.redirect("/")
        })
    })

module.exports = router;