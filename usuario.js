// Carregar eventos na página do usuário
function carregarEventos() {
    const listaEventos = document.getElementById("lista-eventos");
    const selectEvento = document.getElementById("evento-selecionado");

    listaEventos.innerHTML = '';
    selectEvento.innerHTML = '<option value="" disabled selected>Escolha um evento</option>';

    let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
    
    eventos.forEach(evento => {
        const eventoItem = document.createElement("div");
        eventoItem.classList.add("evento-item");
        eventoItem.innerHTML = `
            <h3>${evento.nome}</h3>
            <p><strong>Palestrante:</strong> ${evento.palestrante}</p>
            <p><strong>Data:</strong> ${evento.data}</p>
            <p><strong>Local:</strong> ${evento.local}</p>
            <p><strong>Capacidade:</strong> ${evento.capacidade}</p>
            <p><strong>Participantes Inscritos:</strong> ${evento.participantes.length}</p>
        `;
        listaEventos.appendChild(eventoItem);

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
    const cpfParticipante = document.getElementById("cpf-participante").value; // Novo campo para CPF
    const eventoSelecionado = document.getElementById("evento-selecionado").value;

    if (eventoSelecionado) {
        let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
        const evento = eventos.find(e => e.nome === eventoSelecionado);

        if (evento) {
            // Verifica se o CPF já está inscrito
            const cpfExistente = evento.participantes.find(participante => participante.cpf === cpfParticipante);

            if (cpfExistente) {
                alert(`CPF ${cpfParticipante} já está inscrito neste evento.`);
            } else {
                // Verifica se a capacidade do evento foi atingida
                if (evento.participantes.length >= evento.capacidade) {
                    alert(`Desculpe, a capacidade do evento "${evento.nome}" já foi atingida.`);
                } else {
                    // Adiciona participante na lista de presença
                    evento.participantes.push({ nome: nomeParticipante, cpf: cpfParticipante }); // Adiciona objeto com nome e CPF
                    localStorage.setItem("eventos", JSON.stringify(eventos)); // Atualiza no localStorage
                    alert(`Inscrição confirmada para ${nomeParticipante} no evento ${eventoSelecionado}!`);
                }
            }
        }
    }
});

// Carregar eventos ao iniciar
window.onload = carregarEventos;
