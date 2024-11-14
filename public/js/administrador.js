// Função para exibir mensagens de feedback
function mostrarMensagem(tipo, texto) {
    const mensagem = document.getElementById("mensagem");
    mensagem.className = `visivel ${tipo}`; // Adiciona as classes 'visivel' e 'sucesso' ou 'erro'
    mensagem.textContent = texto;

    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        mensagem.classList.remove("visivel", tipo);
    }, 3000);
}


// Evento para criar um novo evento
document.getElementById("form-evento").addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome-evento").value;
    const palestrante = document.getElementById("palestrante-evento").value;
    const dataEvento = document.getElementById("data-evento").value;
    const local = document.getElementById("local-evento").value;
    const capacidade = document.getElementById("capacidade-evento").value;

    try {
        const response = await fetch("evento/criar.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, palestrante, data_evento: dataEvento, local, capacidade })
        });
    
        // Verifique se a resposta é válida antes de processar
        if (!response.ok) {
            throw new Error("Erro ao criar evento. Status: " + response.status);
        }
    
        // Tente converter a resposta em JSON
        const result = await response.json();
        console.log("Resposta JSON:", result);
        console.log("Eventos recebidos:", eventos); // Para listagem de eventos
    
        if (result && result.message) {
            mostrarMensagem("sucesso", result.message);
        } else {
            mostrarMensagem("erro", "Erro desconhecido ao criar evento");
        }
    
        listarEventos(); // Atualiza a lista de eventos
        document.getElementById("form-evento").reset(); // Limpa o formulário
    } catch (error) {
        console.error("Erro de rede ou no backend:", error);
        mostrarMensagem("erro", "Erro ao conectar com o servidor.");
    }
    
});

// Função para listar eventos
async function listarEventos() {
    try {
        const response = await fetch("evento/listar.php", { method: "GET" });
        if (response.ok) {
            const eventos = await response.json();
            console.log("Eventos recebidos:", eventos); // Verifica se os eventos estão corretos

            const listaEventos = document.getElementById("lista-eventos");
            listaEventos.innerHTML = "";

            eventos.forEach((evento) => {
                const eventoItem = document.createElement("div");
                eventoItem.classList.add("evento-item");

                eventoItem.innerHTML = `
                    <div class="evento-detalhes">
                        <h3>${evento.nome}</h3>
                        <p>Palestrante: ${evento.palestrante}</p>
                        <p>Data: ${evento.data_evento}</p>
                        <p>Local: ${evento.local}</p>
                        <p>Capacidade: ${evento.capacidade}</p>
                    </div>
                `;

                // Botão Editar
                const botaoEditar = document.createElement("button");
                botaoEditar.classList.add("botao-editar");
                botaoEditar.innerText = "Editar";
                botaoEditar.onclick = () => abrirModalEdicao(evento);
                eventoItem.appendChild(botaoEditar);

                // Botão Excluir
                const botaoExcluir = document.createElement("button");
                botaoExcluir.classList.add("botao-excluir");
                botaoExcluir.innerText = "Excluir";
                botaoExcluir.onclick = () => excluirEvento(evento.id);
                eventoItem.appendChild(botaoExcluir);

                listaEventos.appendChild(eventoItem);
            });
        } else {
            mostrarMensagem("erro", "Erro ao carregar eventos.");
        }
    } catch (error) {
        console.error("Erro ao carregar eventos:", error);
        mostrarMensagem("erro", "Erro ao conectar com o servidor.");
    }
}


// Função para excluir evento
async function excluirEvento(id) {
    if (!confirm("Tem certeza que deseja excluir este evento?")) return;

    try {
        const response = await fetch("evento/excluir.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });
        if (response.ok) {
            mostrarMensagem("sucesso", "Evento excluído com sucesso!");
            listarEventos();
        } else {
            mostrarMensagem("erro", "Erro ao excluir o evento.");
        }
    } catch (error) {
        console.error("Erro ao excluir evento:", error);
        mostrarMensagem("erro", "Erro ao conectar com o servidor.");
    }
}


// Função para abrir o modal de edição com os dados do evento
function abrirModalEdicao(evento) {
    document.getElementById("nome-evento-editar").value = evento.nome;
    document.getElementById("palestrante-evento-editar").value = evento.palestrante;
    document.getElementById("data-evento-editar").value = evento.data_evento;
    document.getElementById("local-evento-editar").value = evento.local;
    document.getElementById("capacidade-evento-editar").value = evento.capacidade;
    document.getElementById("indice-evento-editar").value = evento.id;
    document.getElementById("modal-editar").style.display = "flex";
}

// Função para salvar as alterações no evento
document.getElementById("form-editar").addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("indice-evento-editar").value;
    const nome = document.getElementById("nome-evento-editar").value;
    const palestrante = document.getElementById("palestrante-evento-editar").value;
    const dataEvento = document.getElementById("data-evento-editar").value;
    const local = document.getElementById("local-evento-editar").value;
    const capacidade = document.getElementById("capacidade-evento-editar").value;

    try {
        const response = await fetch("evento/editar.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, nome, palestrante, data_evento: dataEvento, local, capacidade })
        });
        

        if (response.ok) {
            mostrarMensagem("sucesso", "Evento atualizado com sucesso!");
            listarEventos();
            document.getElementById("modal-editar").style.display = "none";
        } else {
            mostrarMensagem("erro", "Erro ao atualizar o evento.");
        }
    } catch (error) {
        console.error("Erro ao atualizar evento:", error);
        mostrarMensagem("erro", "Erro ao conectar com o servidor.");
    }
});

// Inicializa a listagem de eventos ao carregar
listarEventos();
