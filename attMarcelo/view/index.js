function carregaTabela() {
  const req = new XMLHttpRequest();
  req.open("GET", "http://localhost:8003/dados_clientes");

  req.onload = () => {
    const produtos = JSON.parse(req.responseText);
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

    produtos.forEach((p) => {
      pJson = JSON.stringify(p);
      var dataInput = '2020-02-06';

      data = new Date(p.dataNascimento);
      dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

      var altGenero = (value) => (value == 0 ? "masculino" : "feminino");

      tab += `<tr id=linha${p.id}><td>${p.id}</td>`;
      tab += `<td>${p.nome}</td>`;
      tab += `<td>${dataFormatada}</td>`;
      tab += `<td>${p.enderec}</td>`;
      tab += `<td>${altGenero(p.genero)}</td>`;
      tab += `<td>
                <button onclick="apaga(${p.id})" title="Apagar">Excluir</button>
                <button onclick="criaFormAlt('${pJson}')" title="Alterar">Alterar</button>
            </td></tr>`;
    });

    document.getElementById("tabProduto").innerHTML = tab;
  };

  req.send();
}
function incProduto() {
  const nome = document.getElementById("itemNome").value;
  const dataNascimento = document.getElementById("itemDataNasc").value;
  const endereco = document.getElementById("itemEndereco").value;
  const genero = document.getElementById("genero").value;
  const confirmaLeitura = document.getElementById("confirmaLeitura").checked;

  if (!nome || !dataNascimento || !endereco || !genero || !confirmaLeitura) {
    alert(
      "Favor preencher todos os campos solicitado e confirmar estar ciente das informações!!"
    );
    return;
  }
  const novoProduto = {
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
      document.getElementById("genero").value = "";
      carregaTabela();
    } else {
      alert("Erro ao incluir registro " + req.responseText);
    }
  };
  req.send(JSON.stringify(novoProduto));
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