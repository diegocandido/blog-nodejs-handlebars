const localStrategy = require("passport-local");
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")


const { usuarios } = require("../models/Usuario");


module.exports = function(passport){

    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha' }, (email, senha, done) => {
        usuarios.findOne({email: email}).then((usuarios) =>{
            if(!usuarios){
                return done(null, false, {message: "Esta conta não existe"})
            }

            bcrypt.compare(senha, usuarios.senha, (erro, batem) => {
                if(batem){
                    return done(null, usuarios)
                }else{
                    return done(null, false, {message: "Senha incorreta"})
                }    
            })

        })
    }))

    passport.serializeUser((usuario, done) =>{
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) => {
        usuarios.findById(id, (err, usuario) =>{
            done(err, usuario)
        })
    })

}