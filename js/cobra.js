const cvs = document.getElementById("cobra");
const ctx = cvs.getContext("2d");

// Unidade de medida
const caixa = 32;

// Imagens
const fundo = new Image();
fundo.src = "img/fundo.png";

const nevesImg = new Image();
nevesImg.src = "img/neves.png";

// Audios
const morreuAudio = new Audio();
const nevesAudio = new Audio();
const cimaAudio = new Audio();
const baixoAudio = new Audio();
const esquerdaAudio = new Audio();
const direitaAudio = new Audio();

morreuAudio.src = "./audio/morreu.mp3";
nevesAudio.src = "./audio/neves.mp3";
cimaAudio.src = "./audio/cima.mp3";
baixoAudio.src = "./audio/baixo.mp3";
esquerdaAudio.src = "./audio/esquerda.mp3";
direitaAudio.src = "./audio/direita.mp3";


// Estrutura da cobra
let cobra = [];
cobra[0] = {
    x : 9 * caixa,
    y : 10 * caixa
}

// Objeto comida
let neves = {
    x : Math.floor(Math.random()*17+1) * caixa,
    y : Math.floor(Math.random()*15+3) * caixa
}

let score = 0;

// Controles da cobra

let d;

document.addEventListener("keydown", direcao);

function direcao(event){
    if(event.keyCode == 37 && d != "DIREITA"){
        d = "ESQUERDA";
        esquerdaAudio.play();
    } else if(event.keyCode == 38 && d != "BAIXO"){
        d = "CIMA";
        cimaAudio.play();
    } else if(event.keyCode == 39 && d != "ESQUERDA"){
        d = "DIREITA"
        direitaAudio.play();
    } else if(event.keyCode == 40 && d != "CIMA"){
        d = "BAIXO";
        baixoAudio.play();
    }
}

// Verifica colisão
function colisao(cabeca, array){
    for(let i = 0; i < array.length; i++){
        if(cabeca.x == array[i].x && cabeca.y == array[i].y){
            return true;
        }
    }
    return false;
}

// Função para desenhar os elementos na tela
function desenha(){
    // Imagem de fundo
    ctx.drawImage(fundo,0,0);
    
    // Cobra
    for(let i = 0; i < cobra.length; i++){
        ctx.fillStyle = (i == 0)? "green" : "white";
        ctx.fillRect(cobra[i].x,cobra[i].y,caixa,caixa);

        ctx.strokeStyle = "red";
        ctx.strokeRect(cobra[i].x,cobra[i].y,caixa,caixa);
    }

    // Neves
    ctx.drawImage(nevesImg, neves.x, neves.y);

    // Posição antiga da cabeça
    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;


    // Direção da cobra
    if(d == "ESQUERDA") cobraX -= caixa;
    if(d == "CIMA") cobraY -= caixa;
    if(d == "DIREITA") cobraX += caixa;
    if(d == "BAIXO") cobraY += caixa;

    // Get Neves
    if(cobraX == neves.x && cobraY == neves.y){
        // Incrementa o placar e não remove a cauda
        score++;
        nevesAudio.play();
        neves = {
            x : Math.floor(Math.random()*17+1) * caixa,
            y : Math.floor(Math.random()*15+3) * caixa
        }
    } else {
        // Remove a cauda
        cobra.pop();
    }

    let novaCabeca = {
        x : cobraX,
        y : cobraY
    }
    // Fim de jogo
    if(cobraX < caixa || cobraX > 17 * caixa || cobraY < 3 * caixa || cobraY > 17 * caixa || colisao(novaCabeca, cobra)) {
        clearInterval(game);
        morreuAudio.play();
    }
    // Adicionar nova cabeça
    
    cobra.unshift(novaCabeca);

    // Placar
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*caixa,1.6*caixa);
}

// Velocidade da cobra
let game = setInterval(desenha,100);