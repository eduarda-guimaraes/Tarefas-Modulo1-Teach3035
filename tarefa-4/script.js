const chameleonButton = document.getElementById("chameleon-button");
const chameleonBorder = document.body

const estilos = [
  { bg: "#a8006d", text: "white", border: "#a8006d" },
  { bg: "#1400a8", text: "white", border: "#1400a8" },
  { bg: "#a80000", text: "white", border: "#a80000" },
  { bg: "yellow", text: "black", border: "yellow" }
];

let i = 0;

chameleonButton.onclick = function () {
  const estilo = estilos[i];
  chameleonButton.style.backgroundColor = estilo.bg;
  chameleonButton.style.color = estilo.text;
  chameleonButton.style.border = estilo.border;

  chameleonBorder.style.border = `20px solid ${estilo.border}`;

  i = (i + 1) % estilos.length;
};
