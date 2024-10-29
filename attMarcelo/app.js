import express from "express";
import mysql from "mysql2";
import cors from "cors"; //baixado devido ao erro que estava apresentando no console

//conexão com banco de dados
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dados_forms",
});
const app = express();

app.use(express.static("view"));
app.use(express.json());
app.use(cors());

//rota de listragem de clientes
app.get("/dados_clientes", (req, res) => {
  console.log("rota acessando pelo metodo get");
  connection.execute("SELECT * FROM dados_clientes", (err, results, fields) => {
    if (err) res.send(err);
    else res.send(results);
  });
});

//rota para inserir novos clientes
app.post("/dados_clientes", (req, res) => {
  console.log("POST da rota produtos foi acionado");
  console.log("Dados Recebidos:");
  console.log(req.body);

  const sql =
    "INSERT INTO dados_clientes (nome, dataNascimento, enderec) VALUES (?, ?, ?)";
  const values = [req.body.nome, req.body.dataNascimento, req.body.endereco];

  console.log(sql);

  connection.execute(sql, values, (err, results, fields) => {
    if (err) res.send("ERRO: " + err.message);
    else res.send("ok" + results.message);
  });
});

app.listen(8003, () => {
  console.log("Executando a porta 8003");
});
