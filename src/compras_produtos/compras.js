import { Router } from "express";
import { conn } from "../data/dbconnection.js";

const compras_router = Router();

compras_router.post("/compras", (req, res) => {
    const { nome_prod, quantidade, nome_prod2, quantidade2 } = req.body;

    conn.query(`select * from produtos_loja where nome="${nome_prod}"`, (err, result1) => {
        if (err) {
            return res.json(err.message);
        } else {
            if (result1.length === 0) {
                return res.json(`Produto ${nome_prod} não encontrado.`);
            }
            const valorTotal1 = result1[0].valor_prod * quantidade;

            conn.query(`select * from produtos_loja where nome="${nome_prod2}"`, (err, result2) => {
                if (err) {
                    return res.json(err.message);
                } else {
                    if (result2.length === 0) {
                        return res.json(`Produto ${nome_prod2} não encontrado.`);
                    }
                    const valorTotal2 = result2[0].valor_prod * quantidade2;

                    const valorFinal = valorTotal1 + valorTotal2;
                    return res.json(`O valor final foi de ${valorFinal} R$`);
                }
            });
        };
    });
});

export { compras_router };
