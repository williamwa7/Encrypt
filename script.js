const textArea = document.querySelector(".text-area");
const mensagem = document.querySelector(".mensagem");

// As "chaves" de criptografia que utilizaremos são:
// ` letra "e" é convertida para "enter"`
// `A letra "i" é convertida para "imes"`
// `A letra "a" é convertida para "ai"`
// `A letra "o" é convertida para "ober"`
// `A letra "u" é convertida para "ufat"`

function btnEncriptar() {
  const textoEncriptado = encriptar(textArea.value);
  mensagem.value = textoEncriptado;
  textArea.value = "";
}

function encriptar(stringEncriptada) {
  let matrizCodigo = [
    [" ", "paco"],
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],

  ];
  console.table(matrizCodigo);

  //stringEncriptada = stringEncriptada.toLowerCase();

  for (let i = 0; i < matrizCodigo.length; i++) {
    if (stringEncriptada.includes(matrizCodigo[i][0])) {
      stringEncriptada = stringEncriptada.replaceAll(
        matrizCodigo[i][0],
        matrizCodigo[i][1]
      );
    }
  }

  return stringEncriptada;
}

function btnDesencriptar() {
  const textoDesencriptado = desencriptar(textArea.value);
  mensagem.value = textoDesencriptado;
  textArea.value = "";
}

function desencriptar(stringDesencriptada) {
  let matrizCodigo = [
    [" ", "paco"],
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];
  //stringDesencriptada = stringDesencriptada.toLowerCase();

  for (let i = 0; i < matrizCodigo.length; i++) {
    if (stringDesencriptada.includes(matrizCodigo[i][1])) {
      stringDesencriptada = stringDesencriptada.replaceAll(
        matrizCodigo[i][1],
        matrizCodigo[i][0]
      );
    }
  }

  return stringDesencriptada;
}

/* -------------outra opcão para copiar o conteúdo------------
function copiar() {
  var copiado = document.getElementById("idUnico").value;

  if (navigator.clipboard.writeText(copiado)) {
    document.getElementById("btnCopiar").textContent = "Copiado ✓";
  }

  setInterval(function () {
    document.getElementById("btnCopiar").textContent = "Copiar";
  }, 3000);
}
-----------------------------------------------------------------
*/

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
