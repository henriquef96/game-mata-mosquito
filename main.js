// Variáveis de posicionamento da tela
var altura = 0;
var largura = 0;

var nivel = window.location.search.replace('?', '');
var tempoMosquito = definirTempoMosquito(nivel);

// Vaviáveis display do game
var vidas = 1;
var tempo = 20;

// Inicialização do cronômetro
document.getElementById('cronometro').innerHTML = tempo;
var cronometro = iniciarCronometro();

// Função para o mosquito não sair da tela
function tamanhoTelaJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
}

tamanhoTelaJogo();

// Função para definir o tempo do mosquito com base no nível
function definirTempoMosquito(nivel) {
    switch (nivel) {
        case 'facil':
            return 2000;
        case 'medio':
            return 1500;
        case 'dificil':
            return 1000;
        default:
            return 1500;
    }
}

// Função para iniciar o cronômetro
function iniciarCronometro() {
    return setInterval(function () {
        tempo -= 1;
        if (tempo < 0) {
            clearInterval(cronometro);
            window.location.href = "winner.html";
        } else {
            document.getElementById('cronometro').innerHTML = tempo;
        }
    }, 1000);
}

// Função para criar um mosquito
function criarMosquito() {
    let posicaoX = Math.floor(Math.random() * (largura - 90));
    let posicaoY = Math.floor(Math.random() * (altura - 90));

    let mosquito = document.createElement('img');
    mosquito.src = 'img/mosquito.png';
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';
    mosquito.onclick = function () {
        this.remove();
    }

    removerMosquitoAnterior();

    document.body.appendChild(mosquito);
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
}

// Função para remover o mosquito anterior
function removerMosquitoAnterior() {
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove();

        if (vidas > 3) {
            window.location.href = "game_over.html";
        } else {
            document.getElementById('v' + vidas).src = "img/coracao_vazio.png";
            vidas++
        }
    }
}

// Função para gerar tamanho aleatório do mosquito
function tamanhoAleatorio() {
    return 'mosquito' + (Math.floor(Math.random() * 3) + 1);
}

// Função para gerar lado aleatório do mosquito
function ladoAleatorio() {
    return 'lado' + (Math.floor(Math.random() * 2) + 1);
}

// Event listener para ajustar a posição do mosquito quando o tamanho da tela muda
window.addEventListener('resize', function () {
    tamanhoTelaJogo();
    criarMosquito();
});

// Setando intervalo para surgimento dos mosquitos na tela
setInterval(function () {
    criarMosquito();
}, tempoMosquito);

// Event listener para tocar som ao clicar no mosquito
document.addEventListener('click', function (event) {
    if (event.target.id === 'mosquito') {
        document.getElementById('som_click').play();
    }
});

var pausado = false; // Variável para rastrear se o jogo está pausado

// Função para pausar ou retomar o jogo
function pausarJogo() {
    pausado = !pausado;
    if (pausado) {
        clearInterval(cronometro); // Pausa o cronômetro
    } else {
        cronometro = iniciarCronometro(); // Retoma o cronômetro
    }
}
