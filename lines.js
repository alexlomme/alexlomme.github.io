var myCanvas = document.querySelector("#draw_space");
var context = myCanvas.getContext('2d');
var pressed = false;
var button1 = document.querySelector("#button_1");
var colour;
var colourPanel = document.getElementById("colours-panel");
var sizePanel = document.querySelector("#dot-size-panel");
var dotSize;

myCanvas.width = document.body.clientWidth;

myCanvas.addEventListener('click', drawPoint, false);

button1.addEventListener('click', buttonState, false);

colourPanel.addEventListener('click', chooseColour, false);
sizePanel.addEventListener('click', chooseSize, false);

var radius = 1;
context.strokeStyle = "#000000";
context.fillStyle = "#000000";

function buttonState(e) {
    if (!pressed) {
        pressed = true;
        button1.innerHTML = "Turn off";
        document.getElementById("panels").classList.add("released");
    }
    else {
        pressed = false;
        button1.innerHTML = "Turn on";
        document.getElementById("panels").classList.remove("released");
    }
}

function drawPoint(e) {
    if (pressed) {
        context.beginPath();
        context.arc(e.pageX - myCanvas.offsetLeft, e.pageY - myCanvas.offsetTop, radius, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();
        context.fill();
    }
}

function chooseColour(e) {
    if (e.target.closest(".colour") === null) return;

    if (!colour) {
        colour = document.querySelector(".colour");
    }

    colour.classList.remove("chosen");
    colour = e.target;

    colour.classList.add("chosen");
    context.strokeStyle = colour.dataset.colour;
    context.fillStyle = colour.dataset.colour;
}

function chooseSize(e) {
    var parentSquare = e.target.closest(".dot-size");

    if (parentSquare === null) return;

    if (!dotSize) {
        dotSize = document.querySelector(".dot-size");
    }

    dotSize.classList.remove("chosen");
    dotSize = parentSquare;
    dotSize.classList.add("chosen");
    radius = dotSize.dataset.size;

}

