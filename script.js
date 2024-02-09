const textArea = document.querySelector(".text-area");
const mensagem = document.querySelector(".mensagem");
let keys = [];
console.log(keys);

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  const button = document.querySelector(
    `[onclick="togglePasswordVisibility('${inputId}')"]`
  );

  if (input.type === "password") {
    input.type = "text";
    button.innerHTML = '<i class="fas fa-eye-slash"></i>'; // Altera o ícone para olho com barra
    input.setAttribute("data-visible", "true"); // Define o atributo personalizado para indicar que a senha está visível
  } else {
    input.type = "password";
    button.innerHTML = '<i class="fas fa-eye"></i>'; // Altera o ícone para olho normal
    input.setAttribute("data-visible", "false"); // Define o atributo personalizado para indicar que a senha está oculta
  }
}

// function btnEncriptar(id) {
//   console.log("id", id);
//   if (keys.length === 0) {
//     alert("Por favor, importe as chaves antes de criptografar.");
//   } else {
//     const textoEncriptado = encriptar(textArea.value);
//     mensagem.value = textoEncriptado;
//     textArea.value = "";
//   }
// }

// function btnDesencriptar() {
//   if (keys.length === 0) {
//     alert("Por favor, importe as chaves antes de descriptografar.");
//   } else {
//     const textoDesencriptado = desencriptar(textArea.value);
//     mensagem.value = textoDesencriptado;
//     textArea.value = "";
//   }
// }

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

// function encriptar(stringEncriptada) {
//   let matrizCodigo = keys;
//   console.log("Encrypt Matriz:", matrizCodigo);

//   //stringEncriptada = stringEncriptada.toLowerCase();
// }

// function desencriptar(stringDesencriptada) {
//   let matrizCodigo = keys;
//   console.log("Decrypt Matriz:", matrizCodigo);

//   //stringDesencriptada = stringDesencriptada.toLowerCase();
// }

//código a seguir é para copiar e colar o conteúdo//
//fonte: https://youtu.be/r2f1v7KrCsM//

const btn_Copiar = document.querySelector(".btn-copiar");
const mensagem_Area = document.querySelector(".mensagem");

const btn_Colar = document.querySelector(".btn-colar");
const text_Area = document.querySelector(".text-area");

btn_Copiar.addEventListener("click", async (e) => {
  navigator.clipboard.writeText(mensagem_Area.value);
  if (navigator.clipboard.writeText()) {
    document.getElementById("btnCopiar").textContent = "Copiado ✓";
  }

  setInterval(function () {
    document.getElementById("btnCopiar").textContent = "Copiar";
  }, 3000);
});

btn_Colar.addEventListener("click", async (e) => {
  const resposta = await navigator.clipboard.readText();

  text_Area.value = resposta;

  if (navigator.clipboard.readText()) {
    document.getElementById("btnColar").textContent = "Colado ✓";
  }

  setInterval(function () {
    document.getElementById("btnColar").textContent = "Colar";
  }, 3000);
});

function generateKeys() {
  alert("Atenção! As chaves geradas são únicas. Guarde-as bem, pois você não poderá recuperá-las.");
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
