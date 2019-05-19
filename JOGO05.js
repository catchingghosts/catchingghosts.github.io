const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const timer = document.querySelector('.timer'); /* NOVO */
const moles = document.querySelectorAll('.mole');
const button = document.querySelector('#start');
let lastHole;
let timeUp = false;
let score = 0;
let time = 0;
let clock = 35;

 
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    
    if(hole === lastHole) {
        console.log('Same one');
        return randomHole(holes);
    }
    
    lastHole = hole;
    return hole;
}


function peep() {
    //const time = randomTime(200, 1000);
    clock--;
    timer.textContent = clock;/* NOVO */
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
               hole.classList.remove('up');
               if(!timeUp) peep();
               }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    time = randomTime(600, 600);
    timer.textContent = clock;/* NOVO */
    timeUp = false;
    score = 0;
    button.style.visibility = 'hidden';
    peep();
    setTimeout(() => {
               timeUp = true;
               button.innerHTML = 'Try again?'
               button.style.visibility = 'visible';
               clock = 0;
               timer.textContent = clock;
               clock = 35;
               }, 20000);
    
}

function bonk(e) {
    if(!e.isTrusted) return;
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}


moles.forEach(mole => mole.addEventListener('click', bonk));
