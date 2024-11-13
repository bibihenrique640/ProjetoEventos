//administrador.js
// public/js/administrador.js

// Adicionar evento ao localStorage
// administrador.js

document.getElementById("form-evento").addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome-evento").value;
    const palestrante = document.getElementById("palestrante-evento").value;
    const dataEvento = document.getElementById("data-evento").value;
    const local = document.getElementById("local-evento").value;
    const capacidade = document.getElementById("capacidade-evento").value;

    try {
        const response = await fetch("/meu_projeto/public/evento/criar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, palestrante, data_evento: dataEvento, local, capacidade }),
        });

        if (response.ok) {
            alert("Evento criado com sucesso!");
            listarEventos(); // Função para atualizar a lista de eventos após criação
        } else {
            const errorData = await response.json();
            alert("Erro ao criar evento: " + errorData.message || "Erro desconhecido");
        }
    } catch (error) {
        console.error("Erro de rede ou no backend:", error);
        alert("Erro ao conectar com o servidor.");
    }
});

// Função para listar os eventos
async function listarEventos() {
    try {
        const response = await fetch("/meu_projeto/public/evento/listar", { method: "GET" });
        if (response.ok) {
            const eventos = await response.json();

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
                listaEventos.appendChild(eventoItem);
            });
        } else {
            alert("Erro ao carregar eventos.");
        }
    } catch (error) {
        console.error("Erro ao carregar eventos:", error);
        alert("Erro ao conectar com o servidor.");
    }
}

listarEventos(); // Chama a função para carregar os eventos ao abrir a página