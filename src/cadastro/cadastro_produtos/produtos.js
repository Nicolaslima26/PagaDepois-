import { Router } from "express";
import { conn } from "../../data/dbconnection.js";

const produtos_router = Router();

produtos_router.post("/cadastro/produtos", (req, res) => {
    const {nome, quantidade, valor_prod} = req.body

    const verifica_nome = (typeof(nome))
    const verifica_quantidade = (typeof(quantidade))
    const verifica_valor_prod = (typeof(valor_prod))

    if (nome == "" || valor_prod == "" || quantidade ==  ""){
        return res.json({
            erro: "preencha todos os campos !!"
        }) 
    } else if (nome == valor_prod || valor_prod == quantidade || nome == quantidade){
        return res.json({
            erro: "os campos não podem ser iguais!!"
        })
    } else if (verifica_nome != "string"){
        return res.json({
            erro: "digite um nome de produto valido !!"
        })
    } else if (verifica_quantidade != "number" || verifica_valor_prod != "number"){
        return res.json({
            erro: "por favor digite um valido !!"
        })
    } else if(nome.length > 25  || nome.length < 2){
        return res.json({
            erro: "use um nome adequado!!"
        })
    }else{
        conn.query(`insert into produtos_loja(nome, quantidade, valor_prod) VALUES ('${nome}', ${quantidade}, ${valor_prod})`, (err, result)=>{
            if (err){
                return res.json(err.message)
            }
            res.json(
                {mensagem: `Produto ${nome} cadastrado com sucesso !`}
            );
        });
    }
});

export {produtos_router};
