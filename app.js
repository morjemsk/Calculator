const display = document.getElementById("display");

// Event listeners for button clicks
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

// Keyboard event listener
document.addEventListener("keydown", handleKeyPress);

function handleButtonClick(e) {
  const target = e.target;

  if (target.classList.contains("number") || target.dataset.value === ".") {
    appendValue(target.dataset.value);
  } else if (target.classList.contains("operator")) {
    appendValue(target.dataset.value);
  } else if (target.classList.contains("clear")) {
    clearDisplay();
  } else if (target.classList.contains("delete")) {
    deleteLast();
  } else if (target.classList.contains("equal")) {
    calculateResult();
  }
}

function handleKeyPress(e) {
  const key = e.key.toLowerCase();

  // Number keys and decimal point
  if (/[0-9.]/.test(key)) {
    appendValue(key);
  }
  // Operators
  else if (key === "+" || key === "-" || key === "*" || key === "/") {
    e.preventDefault();
    appendValue(key);
  }
  // Percent
  else if (key === "%") {
    e.preventDefault();
    appendValue("%");
  }
  // Enter or equals
  else if (key === "enter" || key === "=") {
    e.preventDefault();
    calculateResult();
  }
  // Backspace
  else if (key === "backspace") {
    e.preventDefault();
    deleteLast();
  }
  // Clear
  else if (key === "c") {
    e.preventDefault();
    clearDisplay();
  }
}

function appendValue(value) {
  if (display.value === "0" && value !== ".") {
    display.value = value;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    if (display.value === "") {
      return;
    }
    // Use Function constructor instead of eval for better security
    const result = Function('"use strict"; return (' + display.value + ")")();
    display.value = parseFloat(result.toFixed(10));
  } catch (error) {
    display.value = "Error";
    setTimeout(() => {
      display.value = "";
    }, 1000);
  }
}
