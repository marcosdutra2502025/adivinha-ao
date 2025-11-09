document.addEventListener("DOMContentLoaded", () => {
  const cepInput = document.querySelector("#cep");
  const ruaInput = document.querySelector("#rua");
  const numeroInput = document.querySelector("#numero");
  const cidadeInput = document.querySelector("#cidade");
  const estadoInput = document.querySelector("#estado");

  // Salva dados no localStorage
  function salvarDados() {
    const dados = {
      cep: cepInput.value,
      rua: ruaInput.value,
      numero: numeroInput.value,
      cidade: cidadeInput.value,
      estado: estadoInput.value,
    };
    localStorage.setItem("dadosFormulario", JSON.stringify(dados));
  }

  // Restaura dados do localStorage
  function restaurarDados() {
    const dadosSalvos = localStorage.getItem("dadosFormulario");
    if (!dadosSalvos) return;
    try {
      const dados = JSON.parse(dadosSalvos);
      cepInput.value = dados.cep || "";
      ruaInput.value = dados.rua || "";
      numeroInput.value = dados.numero || "";
      cidadeInput.value = dados.cidade || "";
      estadoInput.value = dados.estado || "";
    } catch (e) {
      console.warn("Erro ao restaurar dados:", e);
    }
  }

  // Função principal que busca o CEP e preenche os campos
  async function buscarCEP() {
    const cepRaw = cepInput.value;
    const cep = cepRaw.replace(/\D/g, "");

    // limpa campos se cep vazio
    if (!cep) {
      ruaInput.value = "";
      cidadeInput.value = "";
      estadoInput.value = "";
      salvarDados();
      return;
    }

    if (cep.length !== 8) {
      // opcional: você pode mostrar uma mensagem ou simplesmente não fazer nada
      console.log("CEP inválido (deve ter 8 dígitos):", cep);
      return;
    }

    // Indicação simples (console). Você pode mostrar spinner no DOM se quiser.
    console.log("Buscando CEP:", cep);

    try {
      const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!resp.ok) throw new Error(`HTTP error ${resp.status}`);
      const data = await resp.json();

      if (data.erro) {
        alert("CEP não encontrado.");
        // limpa campos caso queira:
        ruaInput.value = "";
        cidadeInput.value = "";
        estadoInput.value = "";
        salvarDados();
        return;
      }

      // Preenche os campos retornados (se houver)
      ruaInput.value = data.logradouro || "";
      cidadeInput.value = data.localidade || "";
      estadoInput.value = data.uf || "";

      salvarDados();
      console.log("Endereço preenchido:", data);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao buscar CEP. Verifique sua conexão e tente novamente.");
    }
  }

  // Eventos: blur (sair do campo) e pressionar Enter
  cepInput.addEventListener("blur", buscarCEP);

  cepInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // evita submetar form ou comportamento padrão
      buscarCEP();
    }
  });

  // Salva ao digitar nos campos (evita perda ao recarregar)
  [cepInput, ruaInput, numeroInput, cidadeInput, estadoInput].forEach((input) => {
    input.addEventListener("input", salvarDados);
  });

  // Restaura ao carregar
  restaurarDados();
});