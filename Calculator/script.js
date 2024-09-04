function show(value) {
    document.getElementById('calc-screen').value += value;
}

function clearScreen() {
    document.getElementById('calc-screen').value = '';
}

function calc() {
    let screen = document.getElementById('calc-screen');
    let result = eval(screen.value);
    screen.value = result;
}