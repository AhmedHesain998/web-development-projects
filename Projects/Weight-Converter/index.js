const inputEl = document.getElementById("input")

const errorEl = document.getElementById("error")

let errorTime;
let resultTime;

const resultEl = document.getElementById("result")

function updateResults() {
    if (inputEl.value <= 0 || isNaN(inputEl.value)) {
        errorEl.innerText = "Please enter a valid number"

        clearTimeout(errorTime);
        errorTime = setTimeout(() => {
            errorEl.innerText = "";
            inputEl.value = "";
        }, 2000)
    }
    else {
        clearTimeout(resultTime);
        resultEl.innerText = (+inputEl.value / 2.2).toFixed(2);

        resultTime = setTimeout(() => {
            resultEl.innerText = "";
            inputEl.value = "";
        }, 10000)

    }
}

inputEl.addEventListener("input", updateResults)