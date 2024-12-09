import { Router } from "express";
import { conn } from "../data/dbconnection.js";

const divida_router = Router();

divida_router.put("/divida", (req, res) =>{
    const {nome_cliente, id_nova_compra} = req.body;

    conn.query(`SELECT * FROM cliente WHERE nome = "${nome_cliente}"`, (err, result6) =>{
        if (err){
            return res.json("falha ao encontrar cliente" + err.message)
        }
        if (result6.length === 0 ){
            return res.json("cliente não encontrado")
        }

        const cliente_id = result6[0].id

        conn.query(`SELECT * FROM divida WHERE id_cliente = ${cliente_id}`, (err, result7) =>{
            if (err) {
                return res.json({
                    error: "divida não encontrada" + err.message
                })
            }
            if (result7.length === 0){
                return res.json({
                    error: "cliente não possui divida"
                })
            }

            const valor_divida = result7[0].valor;
            const id_dividas = result7[0].id
            
            conn.query('SELECT * FROM compras WHERE id = ?', [id_nova_compra], (err, result8) => {
                if (err) {
                    return res.json({
                        error: "Erro ao ler  nova compra: " + err.message
                    });
                }
        
                if (result2.length === 0) {
                    return res.json({
                        error: "Compra não encontrada."
                    });
                }
        
                const valor_compras = result8[0].valorTotal;  
                const valor_divida_final = valor_compras + valor_divida;
                
                conn.query(`UPDATE divida SET valor = ${valor_divida_final} WHERE id_cliente = ${cliente_id}`, (err, result9) =>{
                    if (err) {
                        return res.json({
                            error: "erro ao acrescentar novas compras a divida" + err.message
                        })
                    }
                    conn.query(`INSERT INTO divida_compras (id_divida, id_compras) VALUES (${id_dividas}, ${id_nova_compra})`, (err, result10) =>{
                        if (err) {
                            return res.json({
                                error: "erro na ligação com compras" + err.message
                            })
                        }
                        return res.json({
                            sucesso: `divida do cliente ${nome_cliente} atualizada com sucesso !`
                        })
                    })
                }) 
            })
        })
    })
});
export { divida_router } 