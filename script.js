const textArea = document.querySelector(".text-area");
const mensagem = document.querySelector(".mensagem");

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
