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
  console.log(req.body);
  const sql = "INSERT INTO produto (nome, dataNascimento, enderec, genero) VALUES ('"+req.body.nome+"', "+req.body.dataNascimento+", "+req.body.enderec+" , "+req.body.genero+"); "
  console.log(sql)
  connection.execute(sql ,
    (err, results, fields) => {
        if(err) res.send('ERRO')
        else res.send('ok')

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

//rota para excluir registros
app.delete("/dados_clientes/:id", (req, res) =>{
  const id = req.params.id;
console.log('Apagando o registro'+req.params.id)
connection.execute(
  'DELETE FROM dados_clientes WHERE id='+req.params.id,
    (err, results, fields) => {
        if(err) res.send('ERRO')
        else res.send('ok')
    }
   );
})
app.put("/dados_clientes/:id", (req, res) => {
  console.log("PUT adicionado na rota dados_clientes")
  console.log(req.body)

  const sql = "UPDATE dados_clientes SET nome = ?, dataNascimento = ?, enderec = ?, genero = ? WHERE id = ?";
  const value = [req.body.nome, req.body.dataNascimento, req.body.endereco, req.body.genero, id];
  console.log(sql)
  connection.execute(sql ,value
    (err, results, fields) => {
        if(err) res.send('ERRO')
        else res.send('ok')
    }
  );
  })

app.listen(8003, () => {
  console.log("Executando a porta 8003");
});
