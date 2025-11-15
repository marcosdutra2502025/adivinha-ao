// utils.js
// Funções auxiliares da aplicação


export const apiURL = "https://crudcrud.com/api/b50173c9df6e4b419ef526903c5d7f91/clientes";


// Função pura para criar elementos
export function criarElemento(tag, texto = "", atributos = {}) {
const el = document.createElement(tag);
if (texto) el.textContent = texto;
Object.entries(atributos).forEach(([key, value]) => el.setAttribute(key, value));
return el;
}


// Mostrar mensagens na tela
export function mostrarMensagem(texto, tipo = "sucesso") {
const msg = document.getElementById("mensagem");
msg.textContent = texto;
msg.className = tipo;
msg.style.display = "block";


setTimeout(() => {
msg.style.display = "none";
}, 3000);
}