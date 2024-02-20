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
    var dropzoneChampionId = event.target.parentNode.firstChild.alt;
    if ((data === dropzoneChampionId) && (!event.target.hasChildNodes() || event.target.childNodes[0].nodeName == "#text" && event.target.childNodes.length == 1)) {
        event.target.appendChild(document.getElementById(data));
        event.target.classList.add("dropped");
        event.target.querySelector('div').draggable = false;
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
        let championsArray = Object.keys(champions);
        let randomChampions = [];
        for(let i = 0; i < 10; i++){
            let randomIndex = Math.floor(Math.random() * championsArray.length);
            randomChampions.push(champions[championsArray[randomIndex]]);
            championsArray.splice(randomIndex, 1);
        }
        console.log(randomChampions)
        for (let i = 0; i < randomChampions.length; i++) {
            const words = document.querySelector(".words");
            let champion = randomChampions[i];
            let dragbox = document.createElement("div");
    
            dragbox.textContent = champion.id;
            dragbox.classList.add("draggable");
            dragbox.id = `${champion.id}`;
            dragbox.draggable = true;
    
            words.appendChild(dragbox);
        }

        let currentIndex = randomChampions.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = randomChampions[currentIndex];
            randomChampions[currentIndex] = randomChampions[randomIndex];
            randomChampions[randomIndex] = temporaryValue;
        }

        for (let i = 0; i < randomChampions.length; i++) {
            const pictures = document.querySelector(".pictures");
            let champion = randomChampions[i];
            let champDiv = document.createElement("div");
            let champImg = document.createElement("img");
            let dropbox = document.createElement("div");

            champImg.src = `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion.id}.png`;
            champImg.alt = champion.id;
            champDiv.appendChild(champImg);

            dropbox.classList.add("droppable");
            dropbox.classList.add("dropzone");

            champDiv.appendChild(dropbox)
            pictures.appendChild(champDiv);
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