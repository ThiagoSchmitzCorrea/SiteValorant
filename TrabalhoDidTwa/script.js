import { buscarAgentes } from './modulos/agentes.js';

let indiceAgenteAtual = 0;
let agentes = [];

const coresAgente = {
    Astra: '#7b2cbf',  // Roxo
    Breach: '#ff6f00', // Laranja
    Brimstone: '#b95114', // Laranja
    Chamber: '#978246', // Dourado
    Cypher: '#8e99b3', // Azul acizentado 
    Clove: '#d994f0', // Rosa bebê
    Deadlock: '#6682a1', // Azul cinza
    Fade: '#851e3d', // Vermelho escuro
    Gekko: '#caf55f', // Verde lima
    Harbor: '#2b6772', // Verde azulado
    Iso: '#5b45c3',  // Roxo azulado
    Jett: '#0ca4e3', // Azul
    KAYO: '#a1d7ff', // Azul
    Killjoy: '#f4d35e', // Amarelo
    Neon: '#00f3ff', // Ciano
    Omen: '#7359FF', // Roxo azulado
    Phoenix: '#ff5900', // Laranja forte
    Raze: '#fec753', // Amarelo Fosco
    Reyna: '#710193', // Roxo escuro
    Sage: '#1db39c', // Ciano
    Skye: '#009f4f', // Verde
    Sova: '#89c2d9', // Azul Claro
    Viper: '#08b647', // Verde Lima
    Yoru: '#5065b8' // Azul Claro
};

const coresFuncao = {
    'Duelista': '#333', // Cinza 
    'Iniciador': '#333', 
    'Controlador': '#333', 
    'Sentinela': '#333' 
};

const containerImagemAgente = document.getElementById('containerImagemAgente');
const imagemAgente = document.getElementById('imagemAgente');
const nomeAgente = document.getElementById('nomeAgente');
const FuncaoAgente = document.getElementById('FuncaoAgente');
const descricaoAgente = document.getElementById('descricaoAgente');
const habilidadesAgente = document.getElementById('habilidadesAgente');
const botaoAnterior = document.getElementById('botaoAnterior');
const botaoProximo = document.getElementById('botaoProximo');
const BuscaId = document.getElementById('BuscaId');
const botaoBusca = document.getElementById('botaoBusca');
const carregandoElemento = document.getElementById('carregando');
const porcentagemCarregamento = document.getElementById('porcentagemCarregamento');
const exibicaoAgente = document.getElementById('exibicaoAgente');
const iconeFuncao = document.getElementById('iconeFuncao');

// Atualiza o progresso de carregamento
function atualizarProgressoCarregamento(progresso) {
    porcentagemCarregamento.innerText = `${progresso}%`;
}

async function inicializar() {
    try {
        agentes = await buscarAgentes(atualizarProgressoCarregamento);
        agentes.sort((a, b) => a.displayName.localeCompare(b.displayName));
        exibirAgente(agentes[indiceAgenteAtual]);
        carregandoElemento.style.display = 'none';
        exibicaoAgente.style.display = 'grid';
        atualizarProgressoCarregamento(100); 
    } catch (error) {
        console.error('Erro ao buscar agentes:', error);
    }
}

function exibirDescricaoHabilidade(habilidade) {
    alert(`Descrição da habilidade:\n${habilidade.description}`);
}

function exibirAgente(agente) {
    imagemAgente.src = agente.fullPortrait;
    containerImagemAgente.style.backgroundImage = `url(${agente.background})`;
    containerImagemAgente.style.backgroundPosition = 'left -10px top -40px';
    containerImagemAgente.style.backgroundSize = '105%'; 
    nomeAgente.textContent = agente.displayName;
    FuncaoAgente.textContent = `Funcao: ${agente.role.displayName}`;
    descricaoAgente.textContent = agente.description;
    habilidadesAgente.innerHTML = '';

    iconeFuncao.src = agente.role.displayIcon;
    const corFuncao = coresFuncao[agente.role.displayName] || '#ffffff';
    iconeFuncao.style.backgroundColor = corFuncao;

    const corAgente = coresAgente[agente.displayName] || '#a1d7ff';
    containerImagemAgente.style.backgroundColor = corAgente;
    nomeAgente.style.backgroundColor = corAgente;

    const habilidadesParaExibir = agente.abilities.slice(0, 4);

    habilidadesParaExibir.forEach(habilidade => {
        const divHabilidade = document.createElement('div');
        divHabilidade.classList.add('habilidade');
        const imgHabilidade = document.createElement('img');
        imgHabilidade.src = habilidade.displayIcon;
        const nomeHabilidade = document.createElement('p');
        nomeHabilidade.textContent = habilidade.displayName;
        divHabilidade.appendChild(imgHabilidade);
        divHabilidade.appendChild(nomeHabilidade);
        divHabilidade.addEventListener('click', () => 
            exibirDescricaoHabilidade(habilidade)); 
        habilidadesAgente.appendChild(divHabilidade);
    });
}

function buscarAgente() {
    const termoBusca = BuscaId.value.trim().toLowerCase();
    const indiceAgenteEncontrado = agentes.findIndex(agente =>
        agente.displayName.toLowerCase().includes(termoBusca)
    );

    if (indiceAgenteEncontrado !== -1) {
        indiceAgenteAtual = indiceAgenteEncontrado;
        exibirAgente(agentes[indiceAgenteAtual]);
    } else {
        alert('Agente não encontrado!');
    }
}

function exibirAgenteAnterior() {
    indiceAgenteAtual = (indiceAgenteAtual - 1 + agentes.length) % agentes.length;
    exibirAgente(agentes[indiceAgenteAtual]);
}

function exibirProximoAgente() {
    indiceAgenteAtual = (indiceAgenteAtual + 1) % agentes.length;
    exibirAgente(agentes[indiceAgenteAtual]);
}

botaoAnterior.addEventListener('click', exibirAgenteAnterior);
botaoProximo.addEventListener('click', exibirProximoAgente);
botaoBusca.addEventListener('click', buscarAgente);
BuscaId.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        buscarAgente();
    }
});
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
        exibirAgenteAnterior();
    } else if (event.key === 'ArrowRight') {
        exibirProximoAgente();
    }
});

inicializar();