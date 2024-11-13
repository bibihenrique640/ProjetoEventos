//usuario.js
// public/js/usuario.js

// Carregar eventos na página do usuário
// usuario.js

document.getElementById("form-presenca").addEventListener("submit", async (event) => {
    event.preventDefault();

    const nomeParticipante = document.getElementById("nome-participante").value;
    const cpfParticipante = document.getElementById("cpf-participante").value;
    const eventoId = document.getElementById("evento-selecionado").value;

    const response = await fetch("/presenca/confirmar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nomeParticipante, cpf: cpfParticipante, evento_id: eventoId }),
    });

    if (response.ok) {
        alert("Inscrição confirmada!");
    } else {
        alert("Erro ao confirmar presença.");
    }
});

// Função para listar eventos no dropdown
async function listarEventos() {
    const response = await fetch("/evento/listar", { method: "GET" });
    const eventos = await response.json();

    const eventoSelect = document.getElementById("evento-selecionado");
    eventoSelect.innerHTML = '<option value="" disabled selected>Escolha um evento</option>';

    eventos.forEach((evento) => {
        const option = document.createElement("option");
        option.value = evento.id;
        option.textContent = evento.nome;
        eventoSelect.appendChild(option);
    });
}

listarEventos(); // Carregar os eventos no dropdown