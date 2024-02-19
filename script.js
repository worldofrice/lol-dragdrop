const DEBUG = 1;

var draggableElements = document.querySelectorAll(".draggable");
var droppableElements = document.querySelectorAll(".droppable");

draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
});

droppableElements.forEach(elem => {
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("dragleave", dragLeave);
    elem.addEventListener("drop", drop);
});

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function dragEnter(event) {
    if (event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
        event.target.classList.add("droppable-hover");
    }
}

function dragOver(event) {
    if (event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
        event.preventDefault();
    }
}

function dragLeave(event) {
    if (event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
        event.target.classList.remove("droppable-hover");
    }
}

function drop(event) {
    event.preventDefault();
    event.target.classList.remove("droppable-hover");
    var data = event.dataTransfer.getData('text');
    if (!event.target.hasChildNodes() || event.target.childNodes[0].nodeName == "#text" && event.target.childNodes.length == 1) {
        event.target.appendChild(document.getElementById(data));
    }
    else if (DEBUG == true) {
        console.log("hmm miks miks miks")
        console.log(event.target.childNodes[0].nodeName == "#text" && event.target.childNodes.length == 1)
        console.log(event.target.childNodes)
    }
}