function calcularSalario() {
    const codigo = parseInt(document.getElementById('codigo').value);
    const horasTrabalhadas = parseInt(document.getElementById('horasTrabalhadas').value);
    const turno = document.getElementById('turno').value;
    const categoria = document.getElementById('categoria').value;

    
    const salarioMinimo = 1000; 

    
    let valorHora;
    switch (categoria) {
        case 'G':
            valorHora = salarioMinimo * 0.04;
            break;
        case 'F':
            if (turno === 'N') {
                valorHora = salarioMinimo * 0.02;
            } else {
                valorHora = salarioMinimo * 0.01;
            }
            break;
    }

    const salarioInicial = valorHora * horasTrabalhadas;

    
    let auxilioAlimentacao;
    if (salarioInicial <= 800) {
        auxilioAlimentacao = salarioInicial * 0.25;
    } else if (salarioInicial <= 1200) {
        auxilioAlimentacao = salarioInicial * 0.20;
    } else {
        auxilioAlimentacao = salarioInicial * 0.15;
    }

    
    const salarioFinal = salarioInicial + auxilioAlimentacao;

    
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <p>Código: ${codigo}</p>
        <p>Horas Trabalhadas: ${horasTrabalhadas}</p>
        <p>Valor da Hora Trabalhada: R$ ${valorHora.toFixed(2)}</p>
        <p>Salário Inicial: R$ ${salarioInicial.toFixed(2)}</p>
        <p>Auxílio Alimentação: R$ ${auxilioAlimentacao.toFixed(2)}</p>
        <p>Salário Final: R$ ${salarioFinal.toFixed(2)}</p>
    `;
}