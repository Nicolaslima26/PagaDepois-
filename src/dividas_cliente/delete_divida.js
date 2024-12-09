import { Router } from "express";
import { conn } from "../data/dbconnection.js";

const delete_router = Router();

delete_router.delete("/fechamento_conta", (req, res) =>{
    const {cpf} = req.body;

    conn.query(`select * from cliente where cpf = "${cpf}" `, (err, result) =>{
        if (err) {
            return res.json({
                error: "erro ao ler cliente" + err.message
            })
        }
        if (result.length === 0){
            return res.json({
                error: "cliente não encontrado"
            })
        }
        const id_clientes = result[0].id
        const nome_clientes = result[0].nome

        conn.query(`delete from divida where id_cliente = ${id_clientes}`, (err, result) => {
            if (err){
                return res.json({
                    error: "erro ao deletar divida" + err.message
                })
                
            }
            return res.json({
                sucesso: `${nome_clientes} pagou depois ! divida removida.`
            })
        })
    })
})

export {delete_router}