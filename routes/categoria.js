const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const { eAdmin } = require("../helpers/eAdmin")

//Arquivos Models
const { categorias } = require("../models/Categoria")

// Rotas Categorias
router.get('/categorias', eAdmin, (req,res) =>{
    categorias.find().lean().then((categorias) =>{
        res.render('admin/categorias', {categorias: categorias})
    })
})

router.get('/categorias/add', eAdmin, (req,res) =>{
    res.render('admin/addcategoria')
})

router.post('/categoria/nova', eAdmin, (req,res) =>{
    let erros = []
    if(!req.body.nome || req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"}) 
    }
    else if(!req.body.slug || req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug inválido"}) 
    }
    else if(erros.length > 0){
        res.render("admin/addcategoria", {erros: erros})
    }else{
        const novaCategoria = new categorias({
            nome: req.body.nome,
            slug: req.body.slug
            })
        novaCategoria.save();
        res.redirect('/admin/categorias')
    }
})

router.get('/categorias/edit/:id', eAdmin, (req,res) =>{
    categorias.findOne({_id:req.params.id}).lean().then((categorias) =>{
        res.render('admin/editcategoria', {categorias: categorias})
    })     
})

router.post('/categorias/edit', eAdmin, (req,res) =>{
    let filter = { _id: req.body.id }
    let update = { nome: req.body.nome, slug: req.body.slug }
    categorias.findOneAndUpdate(filter, update).then(() => {
        req.flash("success_msg", "Categoria atualizada")
        res.redirect('/admin/categorias')
    }).catch(err => {
      req.flash("error_msg", "Erro ao atualizar categoria")
    })
})

router.post('/categoria/apagar', eAdmin, (req,res) => {
    categorias.deleteOne({
        _id: req.body.id
    }).then(() =>{
        req.flash("success_msg", "Categoria deletada com sucesso!")
        res.redirect('/admin/categorias')
    })
})

module.exports = router;