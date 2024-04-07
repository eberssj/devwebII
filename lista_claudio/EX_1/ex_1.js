function calcularIMC() {

    const nome = prompt("nome:");
    const alturaCm = parseFloat(prompt("altura em centimetros:"));
    const alturaMetros = alturaCm / 100.0;
    const pesoKg = parseFloat(prompt("peso em quilogramas:"));

    const imc = pesoKg / (alturaMetros * alturaMetros);

    let classificacao;
    if (imc < 16) {
        classificacao = "Baixo peso muito grave";
    } else if (imc < 17) {
        classificacao = "Baixo peso grave";
    } else if (imc < 18.5) {
        classificacao = "Baixo peso";
    } else if (imc < 25) {
        classificacao = "Peso normal";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
    } else if (imc < 35) {
        classificacao = "Obesidade grau I";
    } else if (imc < 40) {
        classificacao = "Obesidade grau II";
    } else {
        classificacao = "Obesidade grau III";
    }

    
    alert(`${nome}, possui indice de massa corporal igual ${imc.toFixed(2)} , sendo classificado como ${classificacao}`);
}
