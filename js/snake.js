
// Configurar objetos canvas
const cvs = document.getElementById('the-snake')
const ctx = cvs.getContext('2d')

// Definir tamanho do bloco (pixels)
const bloco = 32

// Configurar imagem de fundo
const fundo = new Image();
fundo.src = './img/fundo.png'

// Configurar imagem do Neves
const nevesImg = new Image()
nevesImg.src = './img/neves.png'

// Configurar sons
const cimaAudio = new Audio('./audio/cima.mp3')
const baixoAudio = new Audio('./audio/baixo.mp3')
const direitaAudio = new Audio('./audio/direita.mp3')
const esquerdaAudio = new Audio('./audio/esquerda.mp3')
const nevesAudio = new Audio('./audio/neves.mp3')
const morreuAudio = new Audio('./audio/morreu.mp3')

// Instanciar estrutura de cobra
//const cobra = new Snake(9 * bloco, 10 * bloco)
const cobra = new Array()
cobra.push({
  x: 8 * bloco,
  y: 10 * bloco
})

// Configurar objeto comida
var neves = {
  x: Math.floor(Math.random() * 17 + 1) * bloco,
  y: Math.floor(Math.random() * 15 + 3) * bloco
}

// Definir variável para acumular pontuação
var score = 0

// Configurar eventos de controle da cobra
var direciao = ''
document.addEventListener('keydown', event => {
  if (event.keyCode == 37 && direciao != 'DIREITA') {
    direciao = 'ESQUERDA'
    esquerdaAudio.play()
  } else if(event.keyCode == 38 && direciao != "BAIXO") {
    direciao = 'CIMA'
    cimaAudio.play()
  } else if(event.keyCode == 39 && direciao != "ESQUERDA") {
    direciao = 'DIREITA'
    direitaAudio.play()
  } else if(event.keyCode == 40 && direciao != "CIMA") {
    direciao = 'BAIXO'
    baixoAudio.play()
  }
})

// Função para verificar evento de colisão
function colisao(cabeca, array) {
  for (let i = 0; i < array.length; i++) {
    if (cabeca.x == array[i].x && cabeca.y == array[i].y)
      return true
  }
  return false
}

// Função para desenhar elementos na tela
function desenha() {

  // Renderizar imagem de fundo
  ctx.drawImage(fundo, 0, 0)

  // Renderizar cobra
  for (let i = 0; i < cobra.length; i++) {
    ctx.fillStyle = i == 0 ? 'green' : 'white'
    ctx.fillRect(cobra[i].x, cobra[i].y, bloco, bloco)
    ctx.strokeStyle = 'red'
    ctx.strokeRect(cobra[i].x, cobra[i].y, bloco, bloco)
  }

  // Renderizar comida
  ctx.drawImage(nevesImg, neves.x, neves.y)

  // Gravar posição antiga da cabeça da cobra
  let cobraX = cobra[0].x
  let cobraY = cobra[0].y

  // Identificar direção da cobra
  switch (direciao) {
    case 'ESQUERDA':
      cobraX -= bloco
      break
    case 'CIMA':
      cobraY -= bloco
      break
    case 'DIREITA':
      cobraX += bloco
      break
    case 'BAIXO':
      cobraY += bloco
      break
  }

  // Capturar comida
  if (cobraX == neves.x && cobraY == neves.y) {
    nevesAudio.play()
    score++
    neves = {
      x: Math.floor(Math.random() * 17 + 1) * bloco,
      y: Math.floor(Math.random() * 15 + 3) * bloco
    }
  } else {
    // Remove a cauda
    cobra.pop()
  }

  let novaCabeca = {
    x: cobraX,
    y: cobraY
  }

  // Fim de jogo
  if (cobraX < bloco || cobraX > 17 * bloco || cobraY < 3 * bloco || cobraY > 17 * bloco || colisao(novaCabeca, cobra)) {
    clearInterval(jogo)
    morreuAudio.play()
  }

  // Adicionar nova cabeça
  cobra.unshift(novaCabeca)

  // Renderizar placar
  ctx.fillStyle = 'white'
  ctx.font = '45px Changa one'
  ctx.fillText(score, 2 * bloco, 1.6 * bloco)
}

// Iniciar partida e definir velocidade da cobra (em milissegundos)
let jogo = setInterval(desenha, 150)
