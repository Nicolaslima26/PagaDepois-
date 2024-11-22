import { Router } from "express";
import { conn } from "../data/dbconnection.js";

const client_route = Router()

client_route.post('/cliente', (req, res) => {
    const {cpf, nome, idade, telefone} = req.body
    res.json({
        nome: nome
    })

    conn.query(`insert into cliente ${cpf,nome,idade,telefone}`, (err, result)=>{
        

    })


})

export{client_route}