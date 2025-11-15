import { Cliente } from "./classes.js";
import { apiURL, mostrarMensagem, criarElemento } from "./utils.js";

// Função para listar clientes
async function listarClientes() {
    try {
        const resposta = await fetch(apiURL);
        if (!resposta.ok) throw new Error("Erro ao buscar clientes");

        const clientes = await resposta.json();
        const lista = document.getElementById("listaClientes");
        lista.innerHTML = "";

        clientes
            .map((c) => new Cliente(c._id, c.nome, c.email))  // <-- CORRIGIDO
            .forEach((cliente) => {
                const li = criarElemento("li");
                li.textContent = `${cliente.nome} - ${cliente.email}`;

                const botaoExcluir = criarElemento("button", "Excluir");
                botaoExcluir.addEventListener("click", () => excluirCliente(cliente.id));

                li.appendChild(botaoExcluir);
                lista.appendChild(li);
            });
    } catch (erro) {
        mostrarMensagem("Erro ao carregar lista de clientes!", "erro");
    }
}

// Função para cadastrar cliente
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

        if (!resposta.ok) throw new Error("Erro ao cadastrar");

        mostrarMensagem("Cliente cadastrado com sucesso!");
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";

        listarClientes();
    } catch (erro) {
        mostrarMensagem("Erro ao cadastrar cliente!", "erro");
    }
}

// Função para excluir cliente
async function excluirCliente(id) {
    try {
        const resposta = await fetch(`${apiURL}/${id}`, { method: "DELETE" }); // <-- ID DO CRUDCRUD
        if (!resposta.ok) throw new Error("Erro ao excluir");

        mostrarMensagem("Cliente excluído!", "sucesso");
        listarClientes();
    } catch (erro) {
        mostrarMensagem("Erro ao excluir cliente!", "erro");
    }
}

// Eventos
document.getElementById("btnCadastrar").addEventListener("click", cadastrarCliente);

// Carregar lista no início
listarClientes();