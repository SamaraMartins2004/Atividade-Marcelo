const express = require('express');
const mysql= require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_form',
});
let app=express();

app.use(express.static('view'))
app.use(express.json());

app.get('/dados_form', 
    (req, res) => {
    console.log('rota acessando pelo metodo get');
    connection.execute(
        'SELECT * FROM bd_form',
        (err, results, fields) => {
            if(err)res.send(err);
            else res.send(results)
        }
      );
});


app.listen(8000,()=>{console.log("Executando a porta 8000")})
