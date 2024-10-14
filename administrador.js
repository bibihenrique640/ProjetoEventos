document.getElementById("form-evento").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Capturar os valores do formulário
    const nomeEvento = document.getElementById("nome-evento").value;
    const palestranteEvento = document.getElementById("palestrante-evento").value;
    const dataEvento = document.getElementById("data-evento").value;
    const localEvento = document.getElementById("local-evento").value;

    // Criar um novo evento
    const novoEvento = {
        nome: nomeEvento,
        palestrante: palestranteEvento,
        data: dataEvento,
        local: localEvento,
        participantes: [] // Inicializa a lista de participantes
    };

    // Adicionar o evento ao localStorage
    let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
    eventos.push(novoEvento);
    localStorage.setItem("eventos", JSON.stringify(eventos));

    // Adicionar o evento à lista de eventos exibida
    adicionarEventoNaLista(novoEvento);
    document.getElementById("form-evento").reset();
});

// Função para adicionar evento na lista exibida
function adicionarEventoNaLista(evento) {
    const eventoItem = document.createElement("div");
    eventoItem.classList.add("evento-item");
    
    // Adicionar conteúdo do evento
    eventoItem.innerHTML = `
        <h3>${evento.nome}</h3>
        <p><strong>Palestrante:</strong> ${evento.palestrante}</p>
        <p><strong>Data:</strong> ${evento.data}</p>
        <p><strong>Local:</strong> ${evento.local}</p>
        <button class="editar-btn">Editar</button>
        <button class="excluir-btn">Excluir</button>
        <button class="presenca-btn">Lista de Presença</button>
    `;

    document.getElementById("lista-eventos").appendChild(eventoItem);

    // Funcionalidade de editar evento
    eventoItem.querySelector(".editar-btn").addEventListener("click", function() {
        // Ações para editar o evento
        const novoNome = prompt("Edite o nome do evento", evento.nome);
        const novoPalestrante = prompt("Edite o nome do palestrante", evento.palestrante);
        const novaData = prompt("Edite a data do evento", evento.data);
        const novoLocal = prompt("Edite o local do evento", evento.local);

        // Atualizar o evento
        evento.nome = novoNome || evento.nome;
        evento.palestrante = novoPalestrante || evento.palestrante;
        evento.data = novaData || evento.data;
        evento.local = novoLocal || evento.local;

        // Atualizar na lista
        eventoItem.querySelector("h3").innerText = evento.nome;
        eventoItem.querySelector("p:nth-child(2)").innerHTML = `<strong>Palestrante:</strong> ${evento.palestrante}`;
        eventoItem.querySelector("p:nth-child(3)").innerHTML = `<strong>Data:</strong> ${evento.data}`;
        eventoItem.querySelector("p:nth-child(4)").innerHTML = `<strong>Local:</strong> ${evento.local}`;

        // Atualizar o localStorage
        atualizarLocalStorage();
    });

    // Funcionalidade de excluir evento
    eventoItem.querySelector(".excluir-btn").addEventListener("click", function() {
        eventoItem.remove();
        eventos = eventos.filter(e => e.nome !== evento.nome); // Remove do array
        localStorage.setItem("eventos", JSON.stringify(eventos)); // Atualiza o localStorage
    });

    // Funcionalidade de ver lista de presença
    eventoItem.querySelector(".presenca-btn").addEventListener("click", function() {
        const listaParticipantes = evento.participantes.length ? evento.participantes.join(", ") : "Nenhum participante confirmado.";
        alert("Lista de Presença: \n" + listaParticipantes);
    });
}

// Função para atualizar o localStorage
function atualizarLocalStorage() {
    let eventos = JSON.parse(localStorage.getItem("eventos"));
    eventos.forEach((evento, index) => {
        eventos[index] = evento; // Atualiza os eventos
    });
    localStorage.setItem("eventos", JSON.stringify(eventos)); // Salva de volta
}

// Carregar eventos ao iniciar
window.onload = function() {
    let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
    eventos.forEach(evento => adicionarEventoNaLista(evento));
};
