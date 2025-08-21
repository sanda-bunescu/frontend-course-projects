let pixelSize = 0;
const chooseBtn = document.querySelector("#choose-button");
chooseBtn.addEventListener("click", function(){
    pixelSize = prompt("Enter grid size:", "100");
    if (pixelSize <= 1 || pixelSize > 100){
        alert("You can choose a number between 1 and 100.");
        return;
    }
    removeCurrentGrid()
    generateGrid(pixelSize);
});


function generateGrid(size){
    const gridContainer = document.querySelector(".grid-container")
    gridContainer.style.width = `${size * 10}px`;
    gridContainer.style.height = `${size * 10}px`;
    for(let i = 0; i < size * size ; i++){
        let div = document.createElement("div");

        div.style.backgroundColor = "yellow";
        div.style.width = "10px";
        div.style.height = "10px";

        div.addEventListener("mouseover", function (e){
            e.target.style.backgroundColor = "red";
        });
        gridContainer.appendChild(div);
    }
}

function removeCurrentGrid(){
    const gridContainer = document.querySelector(".grid-container")
    while(gridContainer.firstChild){
        gridContainer.removeChild(gridContainer.firstChild);
    }
}