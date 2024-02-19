const DEBUG = 1;

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

function startGame() {
    fetch("https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data=>{
        const champions = data.data;
        data.data;
        console.log(champions);
        for (const champion in champions) {
            let dragbox = document.createElement("div");
    
            dragbox.textContent = champion;
            dragbox.classList.add("draggable");
            dragbox.id = `${champion}_id`;
            dragbox.draggable = true;
    
            document.body.appendChild(dragbox);
        }
        for (const champion in champions) {
            let champDiv = document.createElement("div");
            let champImg = document.createElement("img");
            let dropbox = document.createElement("div");

            champImg.src = `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion}.png`;
            champDiv.appendChild(champImg);

            dropbox.classList.add("droppable");
            dropbox.classList.add("dropzone");

            champDiv.appendChild(dropbox)
            document.body.appendChild(champDiv);
        }

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
    })
}

startGame()