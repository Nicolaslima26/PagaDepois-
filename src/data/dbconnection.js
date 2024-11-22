import mysql from "mysql"

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "paguedepois"
});

conn.connect((err) => {
    if (err) console.log("erro ao conectar ao bd", err);
    console.log("conectado ao bd...")
});

export{conn}
