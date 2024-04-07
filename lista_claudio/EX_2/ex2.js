function verificarFaixaEtaria() {
    const idade = parseInt(document.getElementById("idade").value);

    if (idade >= 0 && idade < 15) {
        document.getElementById("resultado").textContent = "Criança";
    } else if (idade >= 15 && idade < 30) {
        document.getElementById("resultado").textContent = "Jovem";
    } else if (idade >= 30 && idade < 60) {
        document.getElementById("resultado").textContent = "Adulto";
    } else {
        document.getElementById("resultado").textContent = "Idoso";
    }
}
