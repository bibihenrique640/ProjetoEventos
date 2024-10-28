//administrador.js

// Adicionar evento ao localStorage
document.getElementById("form-evento").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Capturar os valores do formulário
    const nomeEvento = document.getElementById("nome-evento").value;
    const palestranteEvento = document.getElementById("palestrante-evento").value;
    const dataEvento = document.getElementById("data-evento").value;
    const localEvento = document.getElementById("local-evento").value;
    const capacidadeEvento = document.getElementById("capacidade-evento").value;

    // Criar um novo evento
    const novoEvento = {
        nome: nomeEvento,
        palestrante: palestranteEvento,
        data: dataEvento,
        local: localEvento,
        capacidade: Number(capacidadeEvento),
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
        <p><strong>Capacidade:</strong> ${evento.capacidade}</p>
        <p><strong>Participantes Confirmados:</strong> ${evento.participantes.filter(p => p.confirmada).length}</p>
        <button class="editar-btn">Editar</button>
        <button class="excluir-btn">Excluir</button>
        <button class="presenca-btn">Lista de Presença</button>
    `;

    document.getElementById("lista-eventos").appendChild(eventoItem);

    // Funcionalidade de editar evento
    eventoItem.querySelector(".editar-btn").addEventListener("click", function() {
        const novoNome = prompt("Digite o novo nome do evento:", evento.nome);
        const novoPalestrante = prompt("Digite o novo palestrante do evento:", evento.palestrante);
        const novaData = prompt("Digite a nova data do evento:", evento.data);
        const novoLocal = prompt("Digite o novo local do evento:", evento.local);
        const novaCapacidade = prompt("Digite a nova capacidade do evento:", evento.capacidade);

        if (novoNome && novoPalestrante && novaData && novoLocal && novaCapacidade) {
            evento.nome = novoNome;
            evento.palestrante = novoPalestrante;
            evento.data = novaData;
            evento.local = novoLocal;
            evento.capacidade = Number(novaCapacidade);

            let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
            const eventoIndex = eventos.findIndex(e => e.nome === evento.nome);

            if (eventoIndex !== -1) {
                eventos[eventoIndex] = evento;
                localStorage.setItem("eventos", JSON.stringify(eventos));
                
                document.getElementById("lista-eventos").innerHTML = '';
                eventos.forEach(adicionarEventoNaLista);
            }
        }
    });

    // Funcionalidade de excluir evento
    eventoItem.querySelector(".excluir-btn").addEventListener("click", function() {
        if (confirm("Tem certeza que deseja excluir este evento?")) {
            let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
            eventos = eventos.filter(e => e.nome !== evento.nome);

            localStorage.setItem("eventos", JSON.stringify(eventos));
            document.getElementById("lista-eventos").removeChild(eventoItem);
        }
    });

    // Funcionalidade de mostrar lista de presença
    eventoItem.querySelector(".presenca-btn").addEventListener("click", function() {
        mostrarListaPresenca(evento);
    });
}

// Função para mostrar a lista de presença
function mostrarListaPresenca(evento) {
    document.querySelectorAll(".lista-presenca").forEach(el => el.remove());

    const listaPresencaContainer = document.createElement("div");
    listaPresencaContainer.classList.add("lista-presenca");

    const tituloPresenca = document.createElement("h4");
    tituloPresenca.innerText = "Lista de Participantes para " + evento.nome;
    listaPresencaContainer.appendChild(tituloPresenca);

    evento.participantes.forEach(participante => {
        const participanteItem = document.createElement("div");
        const presencaConfirmada = participante.confirmada ? 'confirmada' : 'nao-confirmada';

        participanteItem.innerHTML = `
            <span>${participante.nome} (CPF: ${participante.cpf})</span>
            <button class="confirmar-btn ${presencaConfirmada}" style="background-color: ${presencaConfirmada === 'confirmada' ? 'green' : ''};">Confirmar Presença</button>
        `;
        
        participanteItem.style.display = "flex";
        participanteItem.style.justifyContent = "space-between";
        participanteItem.style.alignItems = "center";
        participanteItem.style.marginBottom = "10px";

        listaPresencaContainer.appendChild(participanteItem);

        participanteItem.querySelector(".confirmar-btn").addEventListener("click", function() {
            const btnConfirmar = participanteItem.querySelector(".confirmar-btn");
            const isConfirmed = btnConfirmar.classList.toggle("confirmada");

            if (isConfirmed) {
                btnConfirmar.style.backgroundColor = "green";
                btnConfirmar.innerText = "Presença Confirmada";
            } else {
                btnConfirmar.style.backgroundColor = "";
                btnConfirmar.innerText = "Confirmar Presença";
            }

            atualizarPresenca(evento, participante, isConfirmed);
        });
    });

    document.getElementById("lista-eventos").appendChild(listaPresencaContainer);
}

// Função para atualizar a presença no localStorage
function atualizarPresenca(evento, participante, confirmado) {
    let eventos = JSON.parse(localStorage.getItem("eventos"));
    const eventoIndex = eventos.findIndex(e => e.nome === evento.nome);
    
    if (eventoIndex !== -1) {
        const participanteIndex = eventos[eventoIndex].participantes.findIndex(p => p.nome === participante.nome && p.cpf === participante.cpf);
        
        if (participanteIndex !== -1) {
            eventos[eventoIndex].participantes[participanteIndex].confirmada = confirmado;
        }
        
        localStorage.setItem("eventos", JSON.stringify(eventos));
    }
}

// Carregar eventos ao iniciar
window.onload = function() {
    let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
    eventos.forEach(adicionarEventoNaLista);
};
