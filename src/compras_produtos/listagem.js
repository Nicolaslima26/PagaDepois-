import { Router } from "express";
import { conn } from "../data/dbconnection.js"

const lista_produtos = Router();

lista_produtos.get("/produtos/listagem", (req, res)=>{
    conn.query("select * from produtos_loja", (err, result) => {
        if (err) {
            return res.json("error" + err.message)
        } else{
            const nomes = result.map((item)=>{
                return item.nome
            })
            const nomes_product = result.map((item) => {
                const obj_prod = {
                    nome: item.nome,
                    quantidade: item.quantidade,
                    valor: item.valor_prod
                }
                return obj_prod;
            })
            res.json(nomes_product)
        }
    });
});

lista_produtos.post("/produtos/listagem", (req, res) => {
    // const {nome} = req.body
    // if (nome == nomes_product) {
    //     res.json("deu certo")
    // }
})

export{lista_produtos};
