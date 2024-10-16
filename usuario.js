// Carregar eventos na página do usuário
function carregarEventos() {
    const listaEventos = document.getElementById("lista-eventos");
    const selectEvento = document.getElementById("evento-selecionado");

    // Limpar lista e select para evitar duplicação de itens ao recarregar a página
    listaEventos.innerHTML = '';
    selectEvento.innerHTML = '<option value="" disabled selected>Escolha um evento</option>';

    // Obter eventos do localStorage
    let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
    
    eventos.forEach(evento => {
        // Exibir os eventos na lista
        const eventoItem = document.createElement("div");
        eventoItem.classList.add("evento-item");
        eventoItem.innerHTML = `
            <h3>${evento.nome}</h3>
            <p><strong>Palestrante:</strong> ${evento.palestrante}</p>
            <p><strong>Data:</strong> ${evento.data}</p>
            <p><strong>Local:</strong> ${evento.local}</p>
            <p><strong>Capacidade:</strong> ${evento.capacidade}</p>
            <p><strong>Participantes Confirmados:</strong> ${evento.participantes.length}</p> <!-- Exibir contagem de participantes -->
        `;
        listaEventos.appendChild(eventoItem);

        // Adicionar evento ao select
        const option = document.createElement("option");
        option.value = evento.nome;
        option.textContent = evento.nome;
        selectEvento.appendChild(option);
    });
}

// Confirmação de presença
document.getElementById("form-presenca").addEventListener("submit", function(e) {
    e.preventDefault();

    const nomeParticipante = document.getElementById("nome-participante").value;
    const eventoSelecionado = document.getElementById("evento-selecionado").value;

    if (eventoSelecionado) {
        // Obter eventos do localStorage
        let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
        const evento = eventos.find(e => e.nome === eventoSelecionado);

        if (evento) {
            // Verifica se o participante já está inscrito
            if (evento.participantes.includes(nomeParticipante)) {
                alert(`${nomeParticipante}, você já confirmou presença neste evento.`);
            } else {
                // Verifica se a capacidade do evento foi atingida
                if (evento.participantes.length >= evento.capacidade) {
                    alert(`Desculpe, a capacidade do evento "${evento.nome}" já foi atingida.`);
                } else {
                    // Adiciona participante na lista de presença
                    evento.participantes.push(nomeParticipante); 
                    localStorage.setItem("eventos", JSON.stringify(eventos)); // Atualiza no localStorage
                    alert(`Presença confirmada para ${nomeParticipante} no evento ${eventoSelecionado}!`);
                }
            }
        }
    }
});

// Carregar eventos ao iniciar
window.onload = carregarEventos;
