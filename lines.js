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
var projectHistory = [];
var historyBack = document.querySelector(".history-button.backward");
var historyForward = document.querySelector(".history-button.forward");
var currentIndex = 0;
var isOut;

myCanvas.width = document.body.clientWidth;

myCanvas.addEventListener('mousedown', startDraw, false);
document.addEventListener('mousemove', drawLine, false);
document.addEventListener('mouseup', stopDrawing, false);
window.addEventListener('keydown', keyPressed, false);

button1.addEventListener('click', toggleButtonState, false);

colourPanel.addEventListener('click', chooseColour, false);
sizePanel.addEventListener('click', chooseSize, false);

historyBack.addEventListener('click', turnBack, false);
historyForward.addEventListener('click', turnForward, false);

var myColour = document.querySelector(".colour.chosen").dataset.colour;
context.strokeStyle = myColour;
context.fillStyle = myColour;
context.lineWidth = 2 * radius;

function toggleButtonState(e) {
        if (!pressed) {
            pressed = true;
            button1.innerHTML = "Turn off";
            document.getElementById("panels").classList.add("released");
        } else {
            pressed = false;
            button1.innerHTML = "Turn on";
            document.getElementById("panels").classList.remove("released");
        }
}

function startDraw(e) {
    if (pressed) {
        if (currentIndex !== 0) {
            projectHistory.splice(0, currentIndex);
            currentIndex = 0;
        }
        if (historyForward.classList.contains("activated") === true) {
            historyForward.classList.remove("activated");
        }
        drawPoint(Number(radius), e.pageX - myCanvas.offsetLeft, e.pageY - myCanvas.offsetTop);
        context.beginPath();
        context.moveTo(e.pageX - myCanvas.offsetLeft, e.pageY - myCanvas.offsetTop);
        mousePressed = true;
        isOut = false;
    }
}

function drawLine(e) {
    if (pressed && mousePressed) {
        if (isOut === false) {
            if (e.target === myCanvas) {
                context.lineTo(e.pageX - myCanvas.offsetLeft, e.pageY - myCanvas.offsetTop);
                context.stroke();
            } else {
                context.closePath();
                isOut = true;
            }
        } else if (e.target === myCanvas) {
            isOut = false;
            context.beginPath();
            context.moveTo(e.pageX - myCanvas.offsetLeft, e.pageY - myCanvas.offsetTop);
        }
        drawPoint(Number(radius), e.pageX - myCanvas.offsetLeft, e.pageY - myCanvas.offsetTop);
    }
}

function stopDrawing(e) {
    if (pressed === true && mousePressed === true) {
        context.closePath();
        mousePressed = false;
        isOut = false;
        projectHistory.unshift(context.getImageData(0, 0, myCanvas.width, myCanvas.height));
        if (projectHistory.length === 1) {
            historyBack.classList.add("activated");
        }
    }
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
    context.lineWidth = 2 * radius;
}

function turnBack(e) {
    if (currentIndex < projectHistory.length && historyBack.classList.contains("activated") === true) {
        context.clearRect(0, 0, myCanvas.width, myCanvas.height);
        currentIndex += 1;

        if (currentIndex <= projectHistory.length - 1) {
            context.putImageData(projectHistory[currentIndex], 0, 0);
        }

        if (currentIndex === 1) {
            historyForward.classList.add("activated");
        }

        if (currentIndex === projectHistory.length) {
            historyBack.classList.remove("activated");
        }
    }
}

function turnForward(e) {
    if (currentIndex !== 0 && historyForward.classList.contains("activated") === true) {
        context.clearRect(0, 0, myCanvas.width, myCanvas.height);
        currentIndex -= 1;
        context.putImageData(projectHistory[currentIndex], 0, 0);
        if (currentIndex === projectHistory.length - 1) {
            historyBack.classList.add("activated");
        }
        if (currentIndex === 0) {
            historyForward.classList.remove("activated");
        }
    }
}

function drawPoint(rad, x, y) {
    context.fillRect(x - 1, y - 1, 2, 2);
    if (rad > 1) {
        context.fillRect(x - rad, y - 1, 2 * rad, 2);
        context.fillRect(x - 1, y - rad, 2, 2 * rad);
        if (rad === 3) {
            context.fillRect(x - rad, y - rad + 1, 6, 4);
            context.fillRect(x - rad + 1, y - rad, 4, 6);
        }
        if (rad === 4) {
            context.fillRect(x - rad + 1, y - rad + 1, 6, 6);
        }
        if (rad === 5) {
            context.fillRect(x - rad + 1, y - rad + 2, 8, 6);
            context.fillRect(x - rad + 2, y - rad + 1, 6, 8);
        }
    }
}

function keyPressed(e) {
    switch(e.code) {
        case "KeyL":
            toggleButtonState(e);
            break;
    }
}
