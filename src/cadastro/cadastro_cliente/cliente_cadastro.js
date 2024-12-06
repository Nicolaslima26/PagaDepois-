import { Router } from "express";
import { conn } from "../../data/dbconnection.js";

const client_route = Router()

client_route.post('/cliente', (req, res) => {
    const {cpf, nome, data_nasc, telefone} = req.body;
    
    if (nome == "" || data_nasc == "" || telefone ==  ""){
        return res.json({
            erro: "preencha todos os campos !!"
        })
    } else if(nome.length > 20 || nome.length < 2){
        return res.json({
            erro: "use um nome adequado!!"
        })
    } else if(telefone.length > 11 || telefone.length < 9){
        return res.json({
            erro: "digite um telefone valido !!"
        })
    } else{
        conn.query(`insert into cliente(cpf, nome, idade, telefone) VALUES (${cpf}, "${nome}", "${data_nasc}", ${telefone})`, (err, result)=>{
            if (err){
                return res.json(err.message)
            }
            res.json(   
                {sucesso: `Cliente ${nome} cadastrado com sucesso !`}
            );
        });
    }

});

export{client_route};
