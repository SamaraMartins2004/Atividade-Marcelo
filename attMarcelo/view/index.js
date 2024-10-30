function carregaTabela() {
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
  const nome = document.getElementById("itemNome").value;
  const dataNascimento = document.getElementById("itemDataNasc").value;
  const endereco = document.getElementById("itemEndereco").value;
  const confirmaLeitura = document.getElementById("confirmaLeitura").checked;

  if (!nome || !dataNascimento || !endereco || !confirmaLeitura) {
    alert(
      "Favor preencher todos os campos solicitado e confirmar estar ciente das informações!!"
    );
    return;
  }
  const novoProduto = {
    nome: nome,
    dataNascimento: dataNascimento,
    endereco: endereco,
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
      alert("Erro ao incluir registro" + req.responseText);
    }
  };
  req.send(JSON.stringify(novoProduto));
}
