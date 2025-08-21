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
        console.log(`You win! Score: ${humanScore}`);
        return humanScore;
    }else if (humanChoice === "scissors" &&  computerChoice === "paper"){
        humanScore++;
        console.log(`You win! Score: ${humanScore}`);
        return humanScore;
    }else if(humanChoice === "paper" && computerChoice === "rock"){
        humanScore++;
        console.log(`You win! Score: ${humanScore}`);
        return humanScore;
    }else if (humanChoice != computerChoice){
        humanScore--;
        console.log(`You loose!!! Score: ${humanScore}`);
        return humanScore;
    }
    console.log("Equallity");
    return humanScore;
}

function playGame(){
    let humanScore = 0
    for(let i = 0; i < 5; i++){
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();

        console.log(humanSelection)
        console.log(computerSelection)
        humanScore = playRound(humanSelection, computerSelection, humanScore);
    }

    console.log(`Final score ${humanScore}`)
}




playGame()