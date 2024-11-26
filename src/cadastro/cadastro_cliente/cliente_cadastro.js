import { Router } from "express";
import { conn } from "../../data/dbconnection.js";

const client_route = Router()

client_route.post('/cliente', (req, res) => {
    const {nome, idade, telefone} = req.body;
    
    if (nome == "" || idade == "" || telefone ==  ""){
        return res.json({
            msg: "preencha todos os campos !!"
        }) 
    } else if (nome == idade || idade == telefone || nome == telefone){
        return res.json({
            msg: "os campos não podem ser iguais!!"
        })
    } else if (idade > 100 || idade < 16){
        return res.json({
            msg: "idade não permitida"
        })
    } else if(nome.length > 20 || nome.length < 2){
        return res.json({
            msg: "use um nome adequado!!"
        })
    } else if(telefone.length > 11 || telefone.length < 9){
        return res.json({
            msg: "digite um telefone valido !!"
        })
    } else{
        conn.query(`insert into cliente(nome, idade, telefone) VALUES ('${nome}', ${idade}, ${telefone})`, (err, result)=>{
            if (err){
                return res.json(err.message)
            }
            res.json(
                {msg: `Cliente ${nome} cadastrado com sucesso !`}
            );
        });

    }

});

export{client_route};
