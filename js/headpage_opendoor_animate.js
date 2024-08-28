// 開門動畫 start
var rest = document.querySelector("#mainImageRest");
rest.addEventListener("click", toggleDoorLeft);
btnRest.addEventListener("click", toggleDoorLeft);

function toggleDoorLeft() {
    console.log(123);
    rest.classList.toggle("doorOpenLeft");
    setTimeout(function () {
        window.location.href = '#';
    }, 1500);
}

var notes = document.querySelector("#mainImageNotes");
notes.addEventListener("click", toggleDoorRight);
btnNotes.addEventListener("click", toggleDoorRight);

function toggleDoorRight() {
    notes.classList.toggle("doorOpenRight");
    setTimeout(function () {
        window.location.href = '#';
    }, 1500);
}
// 開門動畫 end