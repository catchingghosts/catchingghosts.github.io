const nuvens = document.querySelectorAll('.nuvem');
const tabelaPontos = document.querySelector('.Pontos');
const Tempo = document.querySelector('.Tempo'); /* NOVO */
const fantasmas = document.querySelectorAll('.fantasma');
const botao = document.querySelector('#comecar');
let ultimaNuvem;
let fimTempo = false;
let Pontos = 0;
let tempo = 0;
let relogio = 35;

 
function tempoAleatorio(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function nuvemAleatoria(nuvens) {
    const idx = Math.floor(Math.random() * nuvens.length);
    const nuvem = nuvens[idx];
    
    if(nuvem === ultimaNuvem) {
        console.log('Same one');
        return nuvemAleatoria(nuvens);
    }
    
    ultimaNuvem = nuvem;
    return nuvem;
}


function espreitar() {
    //const tempo = tempoAleatorio(200, 1000);
    relogio--;
    Tempo.textContent = relogio;/* NOVO */
    const nuvem = nuvemAleatoria(nuvens);
    nuvem.classList.add('up');
    setTimeout(() => {
               nuvem.classList.remove('up');
               if(!fimTempo) espreitar();
               }, tempo);
}

function comecarJogo() {
    tabelaPontos.textContent = 0;
    tempo = tempoAleatorio(600, 600);
    Tempo.textContent = relogio;/* NOVO */
    fimTempo = false;
    Pontos = 0;
    botao.style.visibility = 'hidden';
    espreitar();
    setTimeout(() => {
               fimTempo = true;
               botao.innerHTML = 'Try again?'
               botao.style.visibility = 'visible';
               relogio = 0;
               Tempo.textContent = relogio;
               relogio = 35;
               }, 20000);
    
}

function pancada(e) {
    if(!e.isTrusted) return;
    Pontos++;
    this.classList.remove('up');
    tabelaPontos.textContent = Pontos;
}


fantasmas.forEach(fantasma => fantasma.addEventListener('click', pancada));
