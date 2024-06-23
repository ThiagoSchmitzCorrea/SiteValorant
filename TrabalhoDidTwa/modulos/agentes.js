export async function buscarAgentes(atualizarProgresso) {
    const resposta = await fetch('https://valorant-api.com/v1/agents?language=pt-BR');
    const dados = await resposta.json();
    const agentes = dados.data.filter(agente => agente.isPlayableCharacter);
    
    console.log(dados);

    let progresso = 0;
    const totalAgentes = agentes.length;

    for (let i = 0; i < totalAgentes; i++) {
        progresso = Math.round(((i + 1) / totalAgentes) * 100);
        atualizarProgresso(progresso);
    }

    return agentes;
}
