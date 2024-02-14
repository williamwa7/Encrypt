let keys = [];

function toggleButtonCryptography(action) {
  let stringToProcess = textArea.value;
  if (keys.length === 0) {
    alert("Por favor, importe as chaves antes!");
    return;
  }

  let matrizCodigo = keys;
  for (let i = 0; i < matrizCodigo.length; i++) {
    const from =
      action === "btnEncriptar" ? matrizCodigo[i][0] : matrizCodigo[i][1];
    const to =
      action === "btnEncriptar" ? matrizCodigo[i][1] : matrizCodigo[i][0];
    stringToProcess = stringToProcess.replaceAll(from, to);
  }

  mensagem.value = stringToProcess;
  textArea.value = "";
}

function generateKeys() {
  alert(
    "Atenção! As chaves geradas são únicas. Guarde-as bem, pois você não poderá recuperá-las."
  );
  // Função para gerar um conjunto aleatório de 5 letras
  function gerarConjuntoAleatorio() {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Apenas letras maiúsculas
    let conjunto = "";
    for (let i = 0; i < 5; i++) {
      // Vamos fazer um loop para pegar 5 caracteres
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length); // Pegar um índice aleatório no conjunto de caracteres
      conjunto += caracteres.charAt(indiceAleatorio); // Adicionar o caractere correspondente ao conjunto
    }
    return conjunto;
  }

  // Lista de caracteres
  // const caracteres = "abcdefghijklmnopqrstuvwxyzáéíóúâêîôûàèìòùãõäëïöüçñ0123456789!@#$%&* ";
  const caracteres =
    "><:4o-2r[bò!i'19t8*.ê6mé|#zì@{lãí%+u7x`a/$^fû;_e?0dsj5ùóhè,nq}kõyvg]c3âwàáî&)(=ô~púõ ";
  // Array de pares de caracteres e códigos para encript
  const encrypt = caracteres
    .split("")
    .map((caractere) => [caractere, gerarConjuntoAleatorio()]);

  // Converter para formato JSON
  const jsonData = JSON.stringify(encrypt, null, 2);

  // Criar um objeto Blob contendo o JSON
  const blob = new Blob([jsonData], { type: "application/json" });

  // Criar um link de download para o arquivo
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "encryptKeys.json";

  // Simular um clique no link de download
  document.body.appendChild(a);
  a.click();

  // Limpar o objeto URL
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

async function importKeys() {
  const input = document.createElement("input");
  input.type = "file";

  input.addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function (event) {
      const jsonData = event.target.result;
      keys = JSON.parse(jsonData);
      console.log("Chaves importadas:", keys);

      // Aqui você pode fazer o que precisar com as chaves do arquivo JSON

      const btnImportar = document.getElementById("btnImportar");
      btnImportar.textContent = "Importado ✓";
      btnImportar.disabled = true;
      btnImportar.style.opacity = "0.4";
      btnImportar.style.cursor = "not-allowed";
    });

    reader.readAsText(file);
  });

  input.click();
}
