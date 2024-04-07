function calcularMedia() {
    
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);

    const valor1 = 0.2;
    const valor2 = 0.5;
    const valor3 = 0.3;

    const somaValores = valor1 + valor2 + valor3;
    const mediaFinal = ((valor1 * nota1) + (valor2 * nota2) + (valor3 * nota3)) / somaValores;

    let notaFinal;

    if (mediaFinal >= 9) {
        notaFinal = 'A';
    } else if (mediaFinal >= 8) {
        notaFinal = 'B';
    } else if (mediaFinal >= 7) {
        notaFinal = 'C';
    } else if (mediaFinal >= 6) {
        notaFinal = 'D';
    } else {
        notaFinal = 'F';
    }

    const resultadoTexto = `A média do aluno é ${mediaFinal.toFixed(2)} e a sua classificação é ${notaFinal}.`;
    document.getElementById('resultado').textContent = resultadoTexto;
}