function calcularFrete() {
    const distanciaKm = parseFloat(document.getElementById("distancia").value);
    const numPecas = parseInt(document.getElementById("pecas").value);
    const regiao = document.getElementById("regiao").value;
    const rastreamento = document.getElementById("rastreamento").checked;

    let valorFretePorPeca;
    let desconto;
    let valorFreteTotal;

    if (numPecas <= 1000) {
        switch (regiao) {
            case "sul":
                valorFretePorPeca = 1.0;
                break;
            case "sudeste":
                valorFretePorPeca = 1.2;
                break;
            case "centro-oeste":
                valorFretePorPeca = 1.3;
                break;
            default:
                alert("Região inválida!");
                return;
        }
    } else {
        switch (regiao) {
            case "sul":
                valorFretePorPeca = 1.0;
                desconto = 0.1;
                break;
            case "sudeste":
                valorFretePorPeca = 1.2;
                desconto = 0.12;
                break;
            case "centro-oeste":
                valorFretePorPeca = 1.3;
                desconto = 0.13;
                break;
            default:
                alert("regiao invalida");
                return;
        }
        const pecasExcedentes = numPecas - 1000;
        valorFretePorPeca -= valorFretePorPeca * desconto;
        valorFreteTotal = (1000 * valorFretePorPeca) + (pecasExcedentes * valorFretePorPeca);
    }

    const litrosCombustivel = distanciaKm;
    const valorFretePorKm = 1.0; 

    const totalFrete = valorFreteTotal || (numPecas * valorFretePorPeca);
    const taxaRastreamento = rastreamento ? 200.0 : 0.0;

    document.getElementById("taxaRastreamento").textContent = taxaRastreamento.toFixed(2);
    document.getElementById("valorFretePecas").textContent = totalFrete.toFixed(2);
    document.getElementById("valorFreteKm").textContent = (litrosCombustivel * valorFretePorKm).toFixed(2);
    document.getElementById("totalFrete").textContent = (totalFrete + (litrosCombustivel * valorFretePorKm) + taxaRastreamento).toFixed(2);
}