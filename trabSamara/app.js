import express from "express";
import mysql from "mysql2";

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

//rota de listragem de clientes
app.get("/dados_clientes", (req, res) => {
  console.log("rota acessando pelo metodo get");
  connection.execute("SELECT * FROM dados_clientes", (err, results, fields) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});


//rota para inserir novos clientes
app.post("/dados_clientes", (req, res) => {
    console.log("Tentando inserir no banco de dados:");
    var genero

    console.log(req.body);
    const sql = "INSERT INTO dados_clientes (nome, dataNascimento, endereco, genero) VALUES ('"+req.body.nome+"', '"+req.body.dataNascimento+"', '"+req.body.endereco+"' , "+req.body.genero+"); "
    console.log(sql)
    connection.execute(
        sql
        , 
        (err, results, fields) => {
            if(err) res.send('ERRO')
            else res.send('ok')
        }
    )
});



//rota para excluir registros
app.delete("/dados_clientes/:id", (req, res) =>{
  const id = req.params.id;
console.log('Apagando o registro'+id)
connection.execute(
  'DELETE FROM dados_clientes WHERE id='+id,
    (err, results, fields) => {
        if(err) res.send('ERRO')
        else res.send('ok')
    }
   );
})


app.put("/dados_clientes/:id", (req, res) => {
  console.log("PUT adicionado na rota dados_clientes")
  console.log(req.body)

  const sql = "UPDATE dados_clientes SET nome = "+req.body.nome+", dataNascimento = "+req.body.dataNascimento+", endereco = "+req.body.endereco+", genero = "+req.body.genero+" WHERE id = "+req.body.id;
  console.log(sql)
  connection.execute(sql ,
        (err, results, fields) => {
            if(err) res.send('ERRO')
            else res.send('ok')
        }
    );
  })

app.listen(8003, () => {
  console.log("Executando a porta 8003");
});
