const apiURL = "http://localhost:3000/clientes";

// Cadastrar Cliente
async function cadastrarCliente() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    if (!nome || !email) {
        alert("Preencha todos os campos!");
        return;
    }

    await fetch(apiURL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ nome, email })
    });

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    listarClientes();
}

// Listar Clientes
async function listarClientes() {
    const response = await fetch(apiURL);
    const clientes = await response.json();

    const lista = document.getElementById("listaClientes");
    lista.innerHTML = "";

    clientes.forEach(cliente => {
        const li = document.createElement("li");
        li.innerHTML = `${cliente.nome} - ${cliente.email} 
            <button onclick="excluirCliente(${cliente.id})">Excluir</button>`;
        lista.appendChild(li);
    });
}

// Excluir Cliente
async function excluirCliente(id) {
    await fetch(`${apiURL}/${id}`, { method: "DELETE" });
    listarClientes();
}

// Atualiza lista ao abrir a página
listarClientes();