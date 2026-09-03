// script.js

const carta = document.getElementById('carta');

const CAMINHO_CARTA_ABERTA = '/pagina-carta/assets/carta.png';
const LIMITE_ARRASTO = 100; // pixels para cima até considerar "aberta"

let arrastando = false;
let posicaoInicialY = 0;
let deslocamentoAtualY = 0;
let cartaJaAberta = false;

carta.addEventListener('pointerdown', iniciarArrasto);
carta.addEventListener('pointermove', moverArrasto);
carta.addEventListener('pointerup', finalizarArrasto);
carta.addEventListener('pointercancel', finalizarArrasto);

function iniciarArrasto(evento) {
    if (cartaJaAberta) return;

    arrastando = true;
    posicaoInicialY = evento.clientY;
    carta.setPointerCapture(evento.pointerId);
}

function moverArrasto(evento) {
    if (!arrastando || cartaJaAberta) return;

    deslocamentoAtualY = evento.clientY - posicaoInicialY;

    // só permite arrastar para cima (valores negativos)
    if (deslocamentoAtualY > 0) deslocamentoAtualY = 0;

    carta.style.transform = `translateY(${deslocamentoAtualY}px)`;

    if (Math.abs(deslocamentoAtualY) >= LIMITE_ARRASTO) {
        abrirCarta();
    }
}

function finalizarArrasto() {
    if (cartaJaAberta) return;

    arrastando = false;

    // se não arrastou o suficiente, volta pro lugar
    if (Math.abs(deslocamentoAtualY) < LIMITE_ARRASTO) {
        carta.classList.add('abrindo');
        carta.style.transform = 'translateY(0)';

        setTimeout(() => carta.classList.remove('abrindo'), 400);
    }

    deslocamentoAtualY = 0;
}

function abrirCarta() {
    cartaJaAberta = true;
    arrastando = false;

    carta.classList.add('abrindo');
    carta.style.opacity = '0';
    carta.style.transform = 'translateY(-150px)';

    setTimeout(() => {
        carta.src = CAMINHO_CARTA_ABERTA;
        carta.alt = 'Carta aberta';
        carta.style.transform = 'translateY(0)';
        carta.style.opacity = '1';

        // some com a dica de arrastar
        const dica = document.querySelector('.dica');
        if (dica) dica.style.display = 'none';
    }, 400);
}