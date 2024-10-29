function carregarTabela() {
  console.log("Carregando tabelas...");
  const req = new XMLHttpRequest();
  req.open("GET", "http://localhost:8003/dados_clientes");

  req.onload = () => {
    const produtos = JSON.parse(req.responseText);
    var tab =
      "<tr><th>id</th><th>nome</th><th>dataNascimento</th><th>endereco</th><tr>";
    produtos.forEach((p) => {
      pJson = JSON.stringify(p);
      tab += `<tr id=linha${p.id}><td>${p.id}</td>`;
      tab += `<td>${p.nome}</td>`;
      tab += `<td>${p.dataNascimento}</td>`;
      tab += `<td>${p.endereco}</td>`;
    });

    document.getElementById("tabProduto").innerHTML = tab;
  };

  req.send();
}
function incProduto() {
  if (!document.getElementById("confirmaLeitura").checked) {
    alert("Por favor, confirme estar ciente das informações necessárias.");
    return;
  }

  const novoProduto = {
    nome: document.getElementById("itemNome").value,
    dataNascimento: document.getElementById("itemDataNasc").value,
    endereco: document.getElementById("itemEndereco").value,
  };

  console.log("incluir registro : ");
  console.log(novoProduto);

  const req = new XMLHttpRequest();
  req.open("POST", "http://localhost:8003/dados_clientes");
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.onload = () => {
    alert("Registro incluido");
    document.getElementById("itemNome").value = "";
    document.getElementById("itemDataNasc").value = "";
    document.getElementById("itemEndereco").value = "";
    carregaTabela();
  };
  req.send(JSON.stringify(novoProduto));
}
