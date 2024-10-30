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
    if (err) {
      res.send(err);
    } else {
      // corrigindo o conflito no banco de dados, pois la está como enderec`
      const mappedResults = results.map((item) => ({
        ...item,
        endereco: item.enderec,
      }));
      res.send(mappedResults);
      console.log(mappedResults);
    }
  });
});

//rota para inserir novos clientes
app.post("/dados_clientes", (req, res) => {
  const sql =
    "INSERT INTO dados_clientes (nome, dataNascimento, enderec) VALUES (?, ?, ?)";
  const values = [req.body.nome, req.body.dataNascimento, req.body.endereco];

  console.log("Tentando inserir no banco de dados:", values);

  connection.execute(sql, values, (err, results, fields) => {
    if (err) {
      console.error("Erro ao inserir no banco de dados:", err);
      res.status(500).send("ERRO: " + err.message);
    } else {
      console.log("Inserção bem-sucedida:", results);
      res.status(200).send("Registro incluído com sucesso.");
    }
  });
});

app.listen(8003, () => {
  console.log("Executando a porta 8003");
});
