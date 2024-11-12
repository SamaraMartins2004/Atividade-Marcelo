function carregaTabela() {
  const req = new XMLHttpRequest();
  req.open("GET", "http://localhost:8003/dados_clientes");

  req.onload = () => {
    const clientes = JSON.parse(req.responseText);
    var tab =`
    <tr>
    <th>id</th>
    <th>nome</th>
    <th>dataNascimento</th>
    <th>endereco</th>
    <th>genero</th>
    <th>Ação</th>
  </tr>
`;

    clientes.forEach((c) => {
      data = new Date(c.dataNascimento);
      dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
      var altGenero = (value) => (value == 0 ? "masculino" : "feminino");
      tab += `<tr id=linha${c.id}><td>${c.id}</td>`;
      tab += `<td>${c.nome}</td>`;
      tab += `<td>${dataFormatada}</td>`;
      tab += `<td>${c.endereco}</td>`;
      tab += `<td>${altGenero(c.genero)}</td>`;
      tab += `<td>
                <button onclick="apaga(${c.id})" title="Apagar">Excluir</button>
                <button onclick="criaFormAlt('${c.id}')" title="Alterar">Alterar</button>
            </td></tr>`;
    });

    document.getElementById("tabCliente").innerHTML = tab;
  };

  req.send();
}
function incCliente() {
  const nome = document.getElementById("itemNome").value;
  const dataNascimento = document.getElementById("itemDataNasc").value;
  const endereco = document.getElementById("itemEndereco").value;
  const confirmaLeitura = document.getElementById("confirmaLeitura").checked;
  if(document.getElementById("masc").checked) genero=0;
  if(document.getElementById("fem").checked) genero=1;

  if (!nome || !dataNascimento || !endereco || !confirmaLeitura) {
    alert(
      "Favor preencher todos os campos solicitado e confirmar estar ciente das informações!!"
    );
    return;
  }
  const novoCliente = {
    nome: nome,
    dataNascimento: dataNascimento,
    endereco: endereco,
    genero: genero,
  };

  const req = new XMLHttpRequest();
  req.open("POST", "http://localhost:8003/dados_clientes");
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.onload = () => {
    if (req.status == 200) {
      alert("Registro incluído");
      document.getElementById("itemNome").value = "";
      document.getElementById("itemDataNasc").value = "";
      document.getElementById("itemEndereco").value = "";
      carregaTabela();
    } else {
      alert("Erro ao incluir registro " + req.responseText);
    }
  };
  req.send(JSON.stringify(novoCliente));
}
function apaga(id){
  console.log('apagando registro: '+id)
  const req = new XMLHttpRequest()
  req.open('DELETE','http://localhost:8003/dados_clientes/'+id)
    req.onload = () => { 
        alert('Registro apagado')
        carregaTabela();
    }
    req.send()
}
function altEnvia(id){
  const dadosAlterados = {
    'id' : id,
    'nome' : document.getElementById('altNome').value,
    'dataNascimento' : document.getElementById('altDataNascimento').value,
    'enderec' : document.getElementById('altEnderec').value,
    'genero' : document.getElementById('altGnero').value,
}
  }