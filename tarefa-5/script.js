const display = document.getElementById("result")

const btnClear = document.getElementById("clear")
const btnDivision = document.getElementById("division")
const btnMultiplication = document.getElementById("multiplication")
const btnSubtraction = document.getElementById("subtraction")
const btnSum = document.getElementById("sum")
const btnEqual = document.getElementById("equal")

const btnDelete = document.getElementById("delete")
const btnComma = document.getElementById("comma")

const num0 = document.getElementById("num0")
const num1 = document.getElementById("num1")
const num2 = document.getElementById("num2")
const num3 = document.getElementById("num3")
const num4 = document.getElementById("num4")
const num5 = document.getElementById("num5")
const num6 = document.getElementById("num6")
const num7 = document.getElementById("num7")
const num8 = document.getElementById("num8")
const num9 = document.getElementById("num9")

let current = ""
let previous = null
let operator = null
let shouldReset = false

function textToShow() {
  const left = previous !== null && operator ? `${previous} ${operator} ` : ""
  return left + current
}

function fitFont() {
  const len = textToShow().length
  let size = 36
  if (len > 14) size = 32
  if (len > 18) size = 28
  if (len > 22) size = 24
  if (len > 26) size = 20
  if (len > 30) size = 18
  display.style.fontSize = size + "px"
  display.style.lineHeight = "1.2"
}

function updateDisplay() {
  display.textContent = textToShow()
  fitFont()
}

function appendDigit(d) {
  if (shouldReset) {
    current = ""
    shouldReset = false
  }
  current += String(d)
  updateDisplay()
}

function addComma() {
  if (shouldReset) {
    current = ""
    shouldReset = false
  }
  if (!current.includes(".")) {
    current = current === "" ? "0." : current + "."
    updateDisplay()
  }
}

function setOperator(op) {
  if (operator && !shouldReset && current !== "") {
    evaluate()
  } else if (current !== "") {
    previous = current
  }
  operator = op
  current = "" 
  shouldReset = false
  updateDisplay()
}

function formatResult(n) {
  let num = Number(n)
  if (!Number.isFinite(num)) return "Erro"
  let s = String(num)
  if (s.length <= 12) return s
  s = num.toPrecision(12).replace(/\.?0+($|e)/, "$1")
  return s
}

function evaluate() {
  if (operator === null || previous === null || current === "") return
  const a = parseFloat(previous)
  const b = parseFloat(current)
  let result
  switch (operator) {
    case "+": result = a + b; break
    case "-": result = a - b; break
    case "*": result = a * b; break
    case "÷":
      if (b === 0) {
        current = "Erro"
        previous = null
        operator = null
        updateDisplay()
        shouldReset = true
        return
      }
      result = a / b
      break
    default: return
  }
  current = formatResult(result)
  previous = null
  operator = null
  updateDisplay()
  shouldReset = true
}

function clearAll() {
  current = ""
  previous = null
  operator = null
  shouldReset = false
  updateDisplay()
}

function backspace() {
  if (shouldReset) {
    current = ""
    shouldReset = false
    updateDisplay()
    return
  }
  current = current.slice(0, -1)
  updateDisplay()
}

[
  [num0, 0], [num1, 1], [num2, 2], [num3, 3], [num4, 4],
  [num5, 5], [num6, 6], [num7, 7], [num8, 8], [num9, 9]
].forEach(([btn, val]) => btn.addEventListener("click", () => appendDigit(val)))

btnComma.addEventListener("click", addComma)
btnSum.addEventListener("click", () => setOperator("+"))
btnSubtraction.addEventListener("click", () => setOperator("-"))
btnMultiplication.addEventListener("click", () => setOperator("*"))
btnDivision.addEventListener("click", () => setOperator("÷"))
btnEqual.addEventListener("click", evaluate)
btnClear.addEventListener("click", clearAll)
btnDelete.addEventListener("click", backspace)

const keyToOp = { "+": "+", "-": "-", "*": "*", "/": "÷" }

window.addEventListener("keydown", (e) => {
  const k = e.key
  if (/\d/.test(k)) {
    appendDigit(k)
    return
  }
  if (k === "." || k === ",") {
    addComma()
    return
  }
  if (k in keyToOp) {
    setOperator(keyToOp[k])
    return
  }
  if (k === "Enter" || k === "=") {
    e.preventDefault()
    evaluate()
    return
  }
  if (k === "Backspace") {
    backspace()
    return
  }
  if (k.toLowerCase() === "c") {
    clearAll()
    return
  }
})

updateDisplay()
