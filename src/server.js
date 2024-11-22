import express from "express";
import { client_route } from "./cliente/cliente.js";

const app = express();
app.use(express.json())
app.use(client_route)

app.listen(3333, ()=> console.log("servidor rodando..."))