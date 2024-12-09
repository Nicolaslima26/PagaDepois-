import express from "express";
import { client_route } from "./cadastro/cadastro_cliente/cliente_cadastro.js";
import { produtos_router } from "./cadastro/cadastro_produtos/produtos.js";
import { lista_produtos } from "./compras_produtos/listagem.js";
import { compras_router } from "./compras_produtos/compras.js";
import { divida_router } from "./dividas_cliente/create divida.js";
import { delete_router } from "./dividas_cliente/delete_divida.js";

const app = express();
app.use(express.json())
app.use(client_route)
app.use(produtos_router)
app.use(lista_produtos)
app.use(compras_router)
app.use(divida_router)
app.use(delete_router)

app.listen(3333, ()=> console.log("servidor rodando..."))