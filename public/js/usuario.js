// Função para exibir mensagens de feedback
function mostrarMensagem(tipo, texto) {
    const mensagem = document.getElementById("mensagem");
    mensagem.className = tipo; // Define a classe como 'sucesso' ou 'erro'
    mensagem.textContent = texto;
    mensagem.style.display = "block";

    setTimeout(() => {
        mensagem.style.display = "none";
    }, 3000);
}

// Evento para inscrição no evento
document.getElementById("form-presenca").addEventListener("submit", async (event) => {
    event.preventDefault();

    const nomeParticipante = document.getElementById("nome-participante").value;
    const cpfParticipante = document.getElementById("cpf-participante").value;
    const eventoId = document.getElementById("evento-selecionado").value;

    try {
        const response = await fetch("presenca/confirmar.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: nomeParticipante, cpf: cpfParticipante, evento_id: eventoId })
        });

        const result = await response.json();

        if (response.ok) {
            mostrarMensagem("sucesso", result.message);
            document.getElementById("form-presenca").reset();
        } else {
            mostrarMensagem("erro", result.message); // Exibe a mensagem de erro
        }
    } catch (error) {
        console.error("Erro ao confirmar presença:", error);
        mostrarMensagem("erro", "Erro ao conectar com o servidor.");
    }
});


// Função para listar eventos no campo de seleção
async function listarEventos() {
    try {
        const response = await fetch("evento/listar.php", { method: "GET" });
        
        if (!response.ok) {
            throw new Error("Erro ao carregar eventos. Status: " + response.status);
        }

        // Tente converter a resposta em JSON
        const eventos = await response.json();
        console.log("Eventos recebidos:", eventos); // Log dos eventos recebidos

        const eventoSelect = document.getElementById("evento-selecionado");
        eventoSelect.innerHTML = '<option value="" disabled selected>Escolha um evento</option>';

        eventos.forEach((evento) => {
            const option = document.createElement("option");
            option.value = evento.id;
            option.textContent = `${evento.nome} - ${evento.data_evento}`;
            eventoSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar eventos:", error);
        mostrarMensagem("erro", "Erro ao conectar com o servidor.");
    }
}

// Inicializa a listagem de eventos ao carregar
listarEventos();

