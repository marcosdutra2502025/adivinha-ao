const apiURL = "http://localhost:3000/clientes";

// Mostrar mensagens ao usuário
function mostrarMensagem(texto, tipo = "sucesso") {
    const msg = document.getElementById("mensagem");
    msg.textContent = texto;
    msg.className = tipo === "erro" ? "erro" : "sucesso";
    msg.style.display = "block";

    setTimeout(() => {
        msg.style.display = "none";
    }, 3000);
}

// Cadastrar Cliente
async function cadastrarCliente() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!nome || !email) {
        mostrarMensagem("Preencha todos os campos!", "erro");
        return;
    }

    try {
        const resposta = await fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email })
        });

        if (!resposta.ok) throw new Error("Erro ao salvar na API");

        mostrarMensagem("✅ Cliente cadastrado com sucesso!");
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
        listarClientes();
    } catch (erro) {
        mostrarMensagem("❌ Erro ao cadastrar cliente! Verifique se a API está rodando.", "erro");
    }
}

// Listar Clientes
async function listarClientes() {
    try {
        const resposta = await fetch(apiURL);
        if (!resposta.ok) throw new Error("Erro ao buscar dados");

        const clientes = await resposta.json();
        const lista = document.getElementById("listaClientes");
        lista.innerHTML = "";

        clientes.forEach(cliente => {
            const li = document.createElement("li");
            li.innerHTML = `${cliente.nome} - ${cliente.email}
                <button onclick="excluirCliente(${cliente.id})">Excluir</button>`;
            lista.appendChild(li);
        });

    } catch (erro) {
        mostrarMensagem("❌ Erro ao carregar lista! API está rodando?", "erro");
    }
}

// Excluir Cliente
async function excluirCliente(id) {
    try {
        const resposta = await fetch(`${apiURL}/${id}`, { method: "DELETE" });
        if (!resposta.ok) throw new Error("Erro ao excluir cliente");

        mostrarMensagem("✅ Cliente excluído com sucesso!");
        listarClientes();
    } catch (erro) {
        mostrarMensagem("❌ Erro ao excluir cliente! API pode estar fora do ar.", "erro");
    }
}

// Carrega lista ao abrir a página
listarClientes();