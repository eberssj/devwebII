function converterData() {
    const dataInput = document.getElementById("dataInput").value;
    const partesData = dataInput.split("/"); 
    const dia = parseInt(partesData[0]);
    const mes = parseInt(partesData[1]);
    const ano = parseInt(partesData[2]);

 
    const meses = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];

    
    if (dia >= 1 && dia <= 31 && mes >= 1 && mes <= 12) {
        const dataExtenso = `${dia} de ${meses[mes - 1]} de ${ano}`;
        document.getElementById("dataExtenso").textContent = dataExtenso;
    } else {
        document.getElementById("dataExtenso").textContent = "Data inválida!";
    }
}