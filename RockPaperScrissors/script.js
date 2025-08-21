humanScore = 0
computerScore = 0


function getComputerChoice(){
    const values = ["Rock", "Paper", "Scissors"];
    let index = Math.floor(Math.random() * 3);
    return values[index].toLowerCase();
}

function getHumanChoice(){
    let choice = prompt("Rock, Paper, Scissors?");
    return choice.toLowerCase();
}

function playRound(humanChoice, computerChoice, humanScore) {
    
    if (humanChoice === "rock" && computerChoice === "scissors"){
        humanScore++;
        div.textContent = `Computer choice: ${computerChoice}. You win! Score: ${humanScore}`;
        return humanScore;
    }else if (humanChoice === "scissors" &&  computerChoice === "paper"){
        humanScore++;
        div.textContent = `Computer choice: ${computerChoice}. You win! Score: ${humanScore}`;
        return humanScore;
    }else if(humanChoice === "paper" && computerChoice === "rock"){
        humanScore++;
        div.textContent = `Computer choice: ${computerChoice}. You win! Score: ${humanScore}`;
        return humanScore;
    }else if (humanChoice != computerChoice){
        humanScore--;
        div.textContent = `Computer choice: ${computerChoice}. You loose! Score: ${humanScore}`;
        return humanScore;
    }

    div.textContent = `Computer choice: ${computerChoice}. Equallity. Score: ${humanScore}`;
    return humanScore;
}



const buttonList = document.querySelector(".buttons");
const bodyEl = document.querySelector("body");
const div = document.createElement("div");
bodyEl.appendChild(div);
gameOver = false;
let userScore = 0
if (gameOver === true){
    div.textContent = ""
    gameOver = false;
}

buttonList.addEventListener("click", function(event){
    const selectedButtonId = event.target.id;
    const computerSelection = getComputerChoice();

    switch(selectedButtonId){
        case "rock":
            userScore = playRound("rock", computerSelection, userScore);
            break;
        case "paper":
            userScore = playRound("paper", computerSelection, userScore);
            break;
        case "scissors":
            userScore = playRound("scissors", computerSelection, userScore);
            break;
    }
    if (userScore === 5){
        div.textContent = "WOOOOW !!! YOU WON !!!"
        userScore = 0
        gameOver = true;
    }else if (userScore === -5){
        div.textContent = "YOU LOST! Maybe next time."
        userScore = 0
        gameOver = true;
    }
})




