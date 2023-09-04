// JavaScript para o sistema de orçamento
const orcamento = {
  cliente: "",
  modeloCarro: "",
  kmRecebida: 0,
  placa: "",
  dataEntrada: "",
  dataTermino: "",
  servicos: [],
  pecasMateriais: [],
};

function adicionarServico(nome, valor) {
  orcamento.servicos.push({ nome, valor });
  atualizarListaServicos();
}

function adicionarPecaMaterial(descricao, quantidade, precoPorUnidade) {
  orcamento.pecasMateriais.push({
    descricao,
    quantidade,
    precoPorUnidade,
    valorTotal: quantidade * precoPorUnidade,
  });
  atualizarListaPecasMateriais();
}

function atualizarListaServicos() {
  const listaServicos = document.getElementById("listaServicos");
  listaServicos.innerHTML = "";
  orcamento.servicos.forEach((servico) => {
    const li = document.createElement("li");
    li.textContent = `${servico.nome} - ${servico.valor}`;
    listaServicos.appendChild(li);
  });
}

function atualizarListaPecasMateriais() {
  const listaPecasMateriais = document.getElementById("listaPecasMateriais");
  listaPecasMateriais.innerHTML = "";
  orcamento.pecasMateriais.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.descricao} - Quantidade: ${item.quantidade} - Preço por Unidade: ${item.precoPorUnidade} - Valor Total: ${item.valorTotal}`;
    listaPecasMateriais.appendChild(li);
  });
}

function calcularTotal() {
  const totalServicos = orcamento.servicos.reduce((acc, servico) => acc + servico.valor, 0);
  const totalPecasMateriais = orcamento.pecasMateriais.reduce((acc, item) => acc + item.valorTotal, 0);
  return totalServicos + totalPecasMateriais;
}

const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  orcamento.cliente = document.getElementById("cliente").value;
  orcamento.modeloCarro = document.getElementById("modeloCarro").value;
  orcamento.kmRecebida = parseInt(document.getElementById("kmRecebida").value, 10);
  orcamento.placa = document.getElementById("placa").value;
  orcamento.dataEntrada = document.getElementById("dataEntrada").value;
  orcamento.dataTermino = document.getElementById("dataTermino").value;

  const nomeServico = document.getElementById("nomeServico").value;
  const valorServico = parseFloat(document.getElementById("valorServico").value);

  if (nomeServico && !isNaN(valorServico)) {
    adicionarServico(nomeServico, valorServico);
  }

  const descricaoPeca = document.getElementById("descricaoPeca").value;
  const quantidadePeca = parseInt(document.getElementById("quantidadePeca").value, 10);
  const precoPeca = parseFloat(document.getElementById("precoPeca").value);

  if (descricaoPeca && !isNaN(quantidadePeca) && !isNaN(precoPeca)) {
    adicionarPecaMaterial(descricaoPeca, quantidadePeca, precoPeca);
  }

  const total = calcularTotal();
  document.getElementById("total").textContent = `Total do Orçamento: ${total}`;
});
