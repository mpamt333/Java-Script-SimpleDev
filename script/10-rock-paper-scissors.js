
let playLog = loadScrore();

console.log(JSON.parse(localStorage.getItem('playLog')))

function loadScrore(){
let loadOK = JSON.parse(localStorage.getItem('playLog'))
|| {
Win :0,
Lose :0,
Tie: 0
};
return loadOK;
}

showResult();

let isAutoPlaying  = false;
let intervalIdPlay;

document.querySelector('.js-rock').addEventListener('click', () =>{
  getResult('Rock')
})
document.querySelector('.js-paper').addEventListener('click', () =>{
  getResult('Paper')
})
document.querySelector('.js-scissors').addEventListener('click', () =>{
  getResult('Scissors')
})
document.querySelector('.js-reset').addEventListener('click', () =>{
      resetLog();
      clearMove();
      showResult();
})
document.querySelector('.js-autoPlay').addEventListener('click', () =>{
  autoEngine();
})

document.body.addEventListener('keydown', (event) =>{
  if  (event.key === 'r'){
    getResult('Rock');
  }
  if  (event.key === 'p'){
    getResult('Paper');
  }
  if  (event.key === 's'){
    getResult('Scissors');
  }
  if (event.key === ' ' || event.code === 'Space'){
    resetLog();
    clearMove();
    showResult();
  }

})


function autoEngine(){
  if (!isAutoPlaying){
    intervalIdPlay = setInterval(() => {
        getResult(computerCalculate());
    
      }, 100);
      isAutoPlaying = true;
  }else{
    clearInterval(intervalIdPlay);
    isAutoPlaying = false;
  }
}

function computerCalculate(){
randomNumber = Math.random();

(randomNumber >=0 && randomNumber < 1/3) &&  (computerChoose = 'Rock');
(randomNumber >=1/3 && randomNumber < 2/3) &&  (computerChoose = 'Paper');
(randomNumber >=2/3 && randomNumber < 3) &&  (computerChoose = 'Scissors');
return computerChoose;
}



function getResult(playerMove, computerMove = computerCalculate()){


if (computerMove === playerMove) {
playLog['Tie'] += 1;
showMove(playerMove, computerMove);
showResult('Tie');
} else if (
computerMove === 'Paper' && playerMove === 'Rock' ||
computerMove === 'Rock' && playerMove === 'Scissors' ||
computerMove === 'Scissors' && playerMove === 'Paper'
) {
playLog.Lose += 1;
showMove(playerMove, computerMove);
showResult('Lose');
} else {
playLog['Win'] += 1;
showMove(playerMove, computerMove);
showResult('Win');
}


saveScore();
}
function resetLog(){
localStorage.removeItem('playLog');
playLog = loadScrore();
}

function saveScore(){
localStorage.setItem('playLog', JSON.stringify(playLog));
}

function showMove(playerMove, computerMove){
const move = document.querySelector(".js-showMove");
move.innerHTML = `You <img class="move-result" src="/Rock-papper-scissors/${playerMove}-emoji.png" alt=""><img class="move-result" src="/Rock-papper-scissors/${computerMove}-emoji.png" alt=""> Computer`;
}

function clearMove(){
const move = document.querySelector(".js-showMove");
move.innerHTML = '';
}

function showResult(message){
const result = document.querySelector(".js-showResult");
(!message) ? result.innerHTML = `You have'nt play yet!` : result.innerHTML = ` You ${message}! <br> Wins: ${playLog.Win} Loses: ${playLog.Lose} Ties: ${playLog.Tie}`;
}



