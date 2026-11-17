
const API_URL = '/transacoes';

const dashboard = document.getElementById('dashboard');
const formularioTela = document.getElementById('formulario-tela');
const btnDashboard = document.getElementById('btn-dashboard');
const btnFormulario = document.getElementById('btn-formulario');

const formulario = document.getElementById('form-transacao');
const botaoSalvar = document.getElementById('salvar');
const mensagemFormulario = document.getElementById('mensagem-formulario');
const mensagemDashboard = document.getElementById('mensagem-dashboard');

const formatoMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function mostrarTela(tela) {
  const mostrarDashboard = tela === 'dashboard';

  dashboard.classList.toggle('oculta', !mostrarDashboard);
  formularioTela.classList.toggle('oculta', mostrarDashboard);

  btnDashboard.classList.toggle('ativa', mostrarDashboard);
  btnFormulario.classList.toggle('ativa', !mostrarDashboard);

  btnDashboard.setAttribute('aria-pressed', String(mostrarDashboard));
  btnFormulario.setAttribute('aria-pressed', String(!mostrarDashboard));

  if (mostrarDashboard) {
    carregarDashboard();
  }
}

function mostrarMensagem(elemento, texto, erro = false) {
  elemento.textContent = texto;
  elemento.classList.toggle('erro', erro);
}

function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);

  if (classe) {
    elemento.className = classe;
  }

  if (texto !== undefined) {
    elemento.textContent = texto;
  }

  return elemento;
}

function renderizarHistorico(historico) {
  const lista = document.getElementById('lista-transacoes');
  lista.replaceChildren();

  if (historico.length === 0) {
    lista.appendChild(
      criarElemento('p', 'vazio', 'Nenhuma transação cadastrada ainda.'),
    );
    return;
  }

  for (const transacao of historico) {
    const item = criarElemento('article', 'transacao');
    const detalhes = criarElemento('div');
    const titulo = criarElemento('h3', '', transacao.descricao);

    const categoria = transacao.categoria || 'Sem categoria';
    const classificacao = transacao.tipo === 'receita'
      ? 'Receita'
      : transacao.consumoConsciente === false
        ? 'Gasto por impulso'
        : 'Gasto consciente';

    const subtitulo = criarElemento(
      'p',
      '',
      `${categoria} • ${classificacao}`,
    );

    detalhes.append(titulo, subtitulo);

    const receita = transacao.tipo === 'receita';
    const valor = criarElemento(
      'strong',
      receita ? 'positivo' : 'negativo',
      `${receita ? '+' : '-'} ${formatoMoeda.format(transacao.valor)}`,
    );

    item.append(detalhes, valor);
    lista.appendChild(item);
  }
}

async function carregarDashboard() {
  mostrarMensagem(mensagemDashboard, 'Atualizando informações...');

  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error('Não foi possível consultar as transações.');
    }

    const dados = await resposta.json();

    document.getElementById('saldo-total').textContent =
      formatoMoeda.format(dados.metricas.saldoTotal);

    document.getElementById('total-despesas').textContent =
      formatoMoeda.format(dados.metricas.totalDespesas);

    document.getElementById('total-impulso').textContent =
      formatoMoeda.format(dados.metricas.totalGastoImpulso);

    renderizarHistorico(dados.historico);
    mostrarMensagem(mensagemDashboard, '');
  } catch (erro) {
    mostrarMensagem(
      mensagemDashboard,
      'Erro ao carregar os dados. Verifique se a API está funcionando.',
      true,
    );
    console.error(erro);
  }
}

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const dados = {
    descricao: document.getElementById('descricao').value.trim(),
    valor: Number(document.getElementById('valor').value),
    tipo: document.getElementById('tipo').value,
    categoria: document.getElementById('categoria').value.trim(),
    consumoConsciente:
      formulario.elements['consumoConsciente'].value === 'true',
  };

  if (
    !dados.descricao ||
    !dados.categoria ||
    !dados.tipo ||
    !Number.isFinite(dados.valor) ||
    dados.valor <= 0
  ) {
    mostrarMensagem(
      mensagemFormulario,
      'Preencha corretamente todos os campos.',
      true,
    );
    return;
  }

  botaoSalvar.disabled = true;
  botaoSalvar.textContent = 'Salvando...';
  mostrarMensagem(mensagemFormulario, '');

  try {
    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      throw new Error('Não foi possível salvar a transação.');
    }

    formulario.reset();
    mostrarTela('dashboard');
  } catch (erro) {
    mostrarMensagem(
      mensagemFormulario,
      'Erro ao salvar. Verifique a conexão e tente novamente.',
      true,
    );
    console.error(erro);
  } finally {
    botaoSalvar.disabled = false;
    botaoSalvar.textContent = 'Salvar transação';
  }
});

btnDashboard.addEventListener('click', () => mostrarTela('dashboard'));
btnFormulario.addEventListener('click', () => mostrarTela('formulario'));

document.getElementById('atualizar').addEventListener(
  'click',
  carregarDashboard,
);

carregarDashboard();
