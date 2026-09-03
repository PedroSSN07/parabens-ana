const yesButton = document.querySelector('.yes-button');
const noButton = document.querySelector('.no-button');

// Botão SIM: leva para outra página
yesButton.addEventListener('click', () => {
    window.location.href = './pagina-carta/index.html'; 
});

// Botão NÃO: foge ao passar o mouse (desktop) ou ao tocar (mobile)
noButton.addEventListener('mouseenter', moveNoButton);
noButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

function moveNoButton() {
    noButton.style.position = 'fixed';

    const larguraJanela = window.innerWidth;
    const alturaJanela = window.innerHeight;

    const larguraBotao = noButton.offsetWidth;
    const alturaBotao = noButton.offsetHeight;

    const margem = 20;
    const novoX = Math.random() * (larguraJanela - larguraBotao - margem * 2) + margem;
    const novoY = Math.random() * (alturaJanela - alturaBotao - margem * 2) + margem;

    noButton.style.left = `${novoX}px`;
    noButton.style.top = `${novoY}px`;
}