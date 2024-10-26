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
        const nomeEvento = prompt("Digite o novo nome do evento:", evento.nome);
        const palestranteEvento = prompt("Digite o novo palestrante do evento:", evento.palestrante);
        const dataEvento = prompt("Digite a nova data do evento:", evento.data);
        const localEvento = prompt("Digite o novo local do evento:", evento.local);
        const capacidadeEvento = prompt("Digite a nova capacidade do evento:", evento.capacidade);
        
        if (nomeEvento && palestranteEvento && dataEvento && localEvento && capacidadeEvento) {
            evento.nome = nomeEvento;
            evento.palestrante = palestranteEvento;
            evento.data = dataEvento;
            evento.local = localEvento;
            evento.capacidade = Number(capacidadeEvento);

            // Atualizar no localStorage
            let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
            localStorage.setItem("eventos", JSON.stringify(eventos));

            // Atualizar a lista de eventos exibida
            document.getElementById("lista-eventos").innerHTML = ''; // Limpar a lista atual
            eventos.forEach(addicionarEventoNaLista); // Recarregar os eventos
        }
    });

    // Funcionalidade de excluir evento
    eventoItem.querySelector(".excluir-btn").addEventListener("click", function() {
        if (confirm("Tem certeza que deseja excluir este evento?")) {
            let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
            eventos = eventos.filter(e => e.nome !== evento.nome); // Remove o evento da lista

            localStorage.setItem("eventos", JSON.stringify(eventos)); // Atualiza o localStorage

            // Atualizar a lista de eventos exibida
            document.getElementById("lista-eventos").innerHTML = ''; // Limpar a lista atual
            eventos.forEach(addicionarEventoNaLista); // Recarregar os eventos
        }
    });

    // Funcionalidade de mostrar lista de presença
    eventoItem.querySelector(".presenca-btn").addEventListener("click", function() {
        mostrarListaPresenca(evento);
    });
}

// Função para mostrar a lista de presença
function mostrarListaPresenca(evento) {
    const listaPresencaContainer = document.createElement("div");
    listaPresencaContainer.classList.add("lista-presenca");

    // Adicionar título da lista de presença
    const tituloPresenca = document.createElement("h4");
    tituloPresenca.innerText = "Lista de Participantes para " + evento.nome;
    listaPresencaContainer.appendChild(tituloPresenca);

    // Adicionar cada participante
    evento.participantes.forEach(participante => {
        const participanteItem = document.createElement("div");
        
        // Verificar se a presença já foi confirmada
        const presencaConfirmada = participante.confirmada ? 'confirmada' : 'nao-confirmada';

        participanteItem.innerHTML = `
            <span>${participante.nome} (CPF: ${participante.cpf})</span>
            <button class="confirmar-btn ${presencaConfirmada}" style="background-color: ${presencaConfirmada === 'confirmada' ? 'green' : ''};">Confirmar Presença</button>
        `;
        
        // Mover o botão para o lado direito
        participanteItem.style.display = "flex";
        participanteItem.style.justifyContent = "space-between";
        participanteItem.style.alignItems = "center";
        participanteItem.style.marginBottom = "10px"; // Espaçamento entre os participantes

        listaPresencaContainer.appendChild(participanteItem);

        // Funcionalidade de confirmar presença
        participanteItem.querySelector(".confirmar-btn").addEventListener("click", function() {
            const btnConfirmar = participanteItem.querySelector(".confirmar-btn");
            const isConfirmed = btnConfirmar.classList.toggle("confirmada");

            if (isConfirmed) {
                btnConfirmar.style.backgroundColor = "green"; // Muda a cor do botão para verde
                btnConfirmar.innerText = "Presença Confirmada"; // Altera o texto do botão
            } else {
                btnConfirmar.style.backgroundColor = ""; // Volta para a cor original
                btnConfirmar.innerText = "Confirmar Presença"; // Restaura o texto original
            }

            // Atualizar estado no localStorage
            atualizarPresenca(evento, participante, isConfirmed);
        });
    });

    // Adicionar o container da lista de presença ao evento
    document.getElementById("lista-eventos").appendChild(listaPresencaContainer);
}

// Função para atualizar a presença no localStorage
function atualizarPresenca(evento, participante, confirmado) {
    let eventos = JSON.parse(localStorage.getItem("eventos"));
    const eventoIndex = eventos.findIndex(e => e.nome === evento.nome);
    
    if (eventoIndex !== -1) {
        const participanteIndex = eventos[eventoIndex].participantes.findIndex(p => p.nome === participante.nome && p.cpf === participante.cpf);
        
        if (participanteIndex !== -1) {
            eventos[eventoIndex].participantes[participanteIndex].confirmada = confirmado; // Atualiza o estado de confirmação
        }
        
        localStorage.setItem("eventos", JSON.stringify(eventos)); // Salva as alterações
    }
}

// Carregar eventos ao iniciar
window.onload = function() {
    let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
    eventos.forEach(evento => {
        adicionarEventoNaLista(evento);
        
        // Carregar participantes e suas confirmações
        evento.participantes.forEach(participante => {
            participante.confirmada = participante.confirmada || false; // Garante que a propriedade exista
        });
    });
};
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
        // Coletar os novos dados
        const novoNomeEvento = prompt("Digite o novo nome do evento:", evento.nome);
        const novoPalestranteEvento = prompt("Digite o novo palestrante do evento:", evento.palestrante);
        const novaDataEvento = prompt("Digite a nova data do evento:", evento.data);
        const novoLocalEvento = prompt("Digite o novo local do evento:", evento.local);
        const novaCapacidadeEvento = prompt("Digite a nova capacidade do evento:", evento.capacidade);

        // Atualizar os dados do evento
        if (novoNomeEvento && novoPalestranteEvento && novaDataEvento && novoLocalEvento && novaCapacidadeEvento) {
            // Atualiza as propriedades do evento
            evento.nome = novoNomeEvento;
            evento.palestrante = novoPalestranteEvento;
            evento.data = novaDataEvento;
            evento.local = novoLocalEvento;
            evento.capacidade = Number(novaCapacidadeEvento);

            // Atualiza o localStorage
            let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
            const eventoIndex = eventos.findIndex(e => e.nome === evento.nome); // Encontra o índice do evento original

            if (eventoIndex !== -1) {
                eventos[eventoIndex] = evento; // Atualiza o evento
                localStorage.setItem("eventos", JSON.stringify(eventos)); // Salva as alterações
                alert("Evento editado com sucesso!");
                
                // Atualiza a lista de eventos exibida na página
                document.getElementById("lista-eventos").innerHTML = ''; // Limpa a lista
                eventos.forEach(addicionarEventoNaLista); // Recarrega os eventos
            }
        }
    });

    // Funcionalidade de excluir evento
    eventoItem.querySelector(".excluir-btn").addEventListener("click", function() {
        let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
        const eventoIndex = eventos.findIndex(e => e.nome === evento.nome); // Encontra o índice do evento

        if (eventoIndex !== -1) {
            eventos.splice(eventoIndex, 1); // Remove o evento do array
            localStorage.setItem("eventos", JSON.stringify(eventos)); // Atualiza o localStorage
            document.getElementById("lista-eventos").removeChild(eventoItem); // Remove o item da lista
            alert("Evento excluído com sucesso!");
        }
    });

    // Funcionalidade de mostrar lista de presença
    eventoItem.querySelector(".presenca-btn").addEventListener("click", function() {
        mostrarListaPresenca(evento);
    });
}

// Carregar eventos ao iniciar
window.onload = function() {
    let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
    eventos.forEach(adicionarEventoNaLista); // Carrega os eventos ao iniciar
};
