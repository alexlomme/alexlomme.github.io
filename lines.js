var myCanvas = document.querySelector("#draw_space");
var context = myCanvas.getContext('2d');
var pressed = false;
var button1 = document.querySelector("#button_1");
var colour;
var colourPanel = document.querySelector("#colours-panel");
var sizePanel = document.querySelector("#dot-size-panel");
var dotSize;
var radius = document.querySelector(".dot-size.chosen").dataset.size;
var mousePressed = false;

myCanvas.width = document.body.clientWidth;

myCanvas.addEventListener('mousedown', drawPoint, false);
myCanvas.addEventListener('mousemove', drawLine, false);
document.addEventListener('mouseup', stopDrawing, false);

button1.addEventListener('click', buttonState, false);

colourPanel.addEventListener('click', chooseColour, false);
sizePanel.addEventListener('click', chooseSize, false);

var myColour = document.querySelector(".colour.chosen").dataset.colour;
context.strokeStyle = myColour;
context.fillStyle = myColour;

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
        context.beginPath();
        context.moveTo(e.pageX - myCanvas.offsetLeft, e.pageY - myCanvas.offsetTop);
        context.lineWidth = 2 * radius;
        mousePressed = true;
    }
}

function drawLine(e) {
    if (pressed && mousePressed) {
        context.lineTo(e.pageX - myCanvas.offsetLeft, e.pageY - myCanvas.offsetTop);
        context.stroke();
    }
}

function stopDrawing(e) {
    context.closePath();
    mousePressed = false;
    context.lineWidth = 1;

}

function chooseColour(e) {
    if (e.target.closest(".colour") === null) return;

    if (!colour) {
        colour = document.querySelector(".colour.chosen");
    }

    colour.classList.remove("chosen");
    colour = e.target;

    colour.classList.add("chosen");
    myColour = colour.dataset.colour;
    context.strokeStyle = myColour;
    context.fillStyle = myColour;
}

function chooseSize(e) {
    var parentSquare = e.target.closest(".dot-size");

    if (parentSquare === null) return;

    if (!dotSize) {
        dotSize = document.querySelector(".dot-size.chosen");
    }

    dotSize.classList.remove("chosen");
    dotSize = parentSquare;
    dotSize.classList.add("chosen");
    radius = dotSize.dataset.size;
}

