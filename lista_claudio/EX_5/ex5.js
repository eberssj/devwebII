function calcular() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operacao = document.getElementById('operacao').value.toLowerCase();

    let resultado;

    if (operacao === 'soma') {
        resultado = num1 + num2;
    } else if (operacao === 'subtração') {
        resultado = num1 - num2;
    } else {
        document.getElementById('resultado').textContent = 'Essa operação não existe, tente de novo digitando "soma" ou "subtração"';
        return;
    }

    document.getElementById('resultado').textContent = `O resultado é: ${resultado}.`;
}