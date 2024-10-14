// Carregar eventos na página do usuário
function carregarEventos() {
    const listaEventos = document.getElementById("lista-eventos");
    const selectEvento = document.getElementById("evento-selecionado");

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
        `;
        listaEventos.appendChild(eventoItem);

        // Adicionar os eventos no select para confirmar presença
        const option = document.createElement("option");
        option.value = evento.nome;
        option.text = evento.nome;
        selectEvento.appendChild(option);
    });
}

// Confirmação de presença
document.getElementById("form-presenca").addEventListener("submit", function(e) {
    e.preventDefault();

    const nomeParticipante = document.getElementById("nome-participante").value;
    const eventoSelecionado = document.getElementById("evento-selecionado").value;

    if (eventoSelecionado) {
        // Adicionar participante na lista de presença do evento
        let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
        const evento = eventos.find(e => e.nome === eventoSelecionado);

        if (evento) {
            evento.participantes.push(nomeParticipante); // Adiciona participante
            localStorage.setItem("eventos", JSON.stringify(eventos)); // Atualiza no localStorage
        }

        alert(`Presença confirmada para ${nomeParticipante} no evento ${eventoSelecionado}!`);
    }
});

// Carregar eventos quando a página carregar
window.onload = carregarEventos;
