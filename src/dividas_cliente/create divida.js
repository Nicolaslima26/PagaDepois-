import { Router } from "express";
import { conn } from "../data/dbconnection.js";

const divida_router = Router();

divida_router.post("/divida", (req, res) => {
    const { nome_cliente, id_compras } = req.body;
    console.log(req.body);

    conn.query(`SELECT * FROM cliente WHERE nome = '${nome_cliente}'`, (err, result) => {
        if (err) {
            return res.json({
                error: "Erro ao ler clientes: " + err.message
            });
        }

        if (result.length === 0) {
            return res.json({
                error: "Cliente não encontrado."
            });
        }

        const id_cliente = result[0].id; 

        conn.query('SELECT * FROM compras WHERE id = ?', [id_compras], (err, result2) => {
            if (err) {
                return res.json({
                    error: "Erro ao ler compra: " + err.message
                });
            }

            if (result2.length === 0) {
                return res.json({
                    error: "Compra não encontrada."
                });
            }

            const valor_compras = result2[0].valorTotal;  

            conn.query('INSERT INTO divida (valor, id_cliente) VALUES (?, ?)', [valor_compras, id_cliente], (err, result3) => {
                if (err) {
                    return res.json({
                        error: "Erro ao cadastrar dívida: " + err.message
                    });
                }
                conn.query(`SELECT * FROM divida WHERE id_cliente = ${id_cliente}`, (err, result4) =>{
                    if (err) {
                        return res.json({
                            error: "erro ao registrar divida a compra" + err.message
                        })
                    }
                    if (result4.length === 0){
                        return res.json({
                            error: "divida não encontrada"
                        })
                    }
                    const id_divida = result4[0].id
                    conn.query(`INSERT INTO divida_compras (id_divida, id_compras) VALUES (${id_divida}, ${id_compras})`, (err, result5) => {
                        if (err) {
                            return res.json({
                                error: "erro ao inserir compra na divida" + err.message
                            })
                        }else{
                            return res.json({
                                sucesso: `divida cadastrada com sucesso, cliente: ${nome_cliente}, valor atual: ${valor_compras}`
                            })
                        }
                    })
                })
            });
        });
    });
});

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
        
                if (result8.length === 0) {
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
                            sucesso: `divida do cliente ${nome_cliente} atualizada com sucesso`
                        })
                    })
                }) 
            })
        })
    })
});
export { divida_router } 
