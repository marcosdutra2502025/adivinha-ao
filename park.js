// Classe Parquimetro
        class Parquimetro {
            constructor(valor) {
                this.valor = valor;
            }

            calcularTempo() {
                if (this.valor < 1) {
                    return {
                        mensagem: "Valor insuficiente para estacionar!",
                        tempo: null,
                        troco: null
                    };
                }

                let tempo = 0;
                let troco = 0;

                if (this.valor >= 1 && this.valor < 1.75) {
                    tempo = 30;
                    troco = this.valor - 1;
                } else if (this.valor >= 1.75 && this.valor < 3) {
                    tempo = 60;
                    troco = this.valor - 1.75;
                } else {
                    tempo = 120;
                    troco = this.valor - 3;
                }

                return {
                    mensagem: "Tempo calculado com sucesso!",
                    tempo: tempo,
                    troco: troco.toFixed(2)
                };
            }
        }

        function calcular() {
            const valor = parseFloat(document.getElementById("valor").value);
            const parquimetro = new Parquimetro(valor);

            const resultado = parquimetro.calcularTempo();

            const divResultado = document.getElementById("resultado");

            if (resultado.tempo === null) {
                divResultado.innerHTML = `<p class="erro">${resultado.mensagem}</p>`;
            } else {
                divResultado.innerHTML = `
                    <p><strong>${resultado.mensagem}</strong></p>
                    <p>Tempo de permanência: <strong>${resultado.tempo} minutos</strong></p>
                    <p>Troco: <strong>R$ ${resultado.troco}</strong></p>
                `;
            }
        }