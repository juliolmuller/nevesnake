
// Configurar objetos canvas
const cvs = document.getElementById('the-snake')
const ctx = cvs.getContext('2d')

// Configurar imagem de fundo
const fundo = new Image()
fundo.src = './img/fundo.png'

// Definir tamanho do bloco (pixels)
const TAM_BLOCO = 32

// Definir variável para acumular pontuação
var score = 0

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
// const cobra = new Snake(9 * TAM_BLOCO, 10 * TAM_BLOCO)
const cobra = []
cobra.push({
  x: 9 * TAM_BLOCO,
  y: 10 * TAM_BLOCO
})

// Configurar objeto comida
const neves = new Food(TAM_BLOCO)

// Configurar eventos de controle da cobra
var direcao = undefined
document.addEventListener('keydown', event => {
  if (event.keyCode == 37 && direcao != Direction.RIGHT && direcao != Direction.LEFT) {
    direcao = Direction.LEFT
    esquerdaAudio.play()
  } else if(event.keyCode == 38 && direcao != Direction.DOWN && direcao != Direction.UP) {
    direcao = Direction.UP
    cimaAudio.play()
  } else if(event.keyCode == 39 && direcao != Direction.LEFT && direcao != Direction.RIGHT) {
    direcao = Direction.RIGHT
    direitaAudio.play()
  } else if(event.keyCode == 40 && direcao != Direction.UP && direcao != Direction.DOWN) {
    direcao = Direction.DOWN
    baixoAudio.play()
  }
})

// Função para verificar evento de colisão
function colisao(cabeca) {
  // if (cobraX < bloco || cobraX > 17 * bloco || cobraY < 3 * bloco || cobraY > 17 * bloco)
  //   return true
  for (let i = 0; i < cobra.length; i++) {
    if (cabeca.x == cobra[i].x && cabeca.y == cobra[i].y)
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
    ctx.fillRect(cobra[i].x, cobra[i].y, TAM_BLOCO, TAM_BLOCO)
    ctx.strokeStyle = 'red'
    ctx.strokeRect(cobra[i].x, cobra[i].y, TAM_BLOCO, TAM_BLOCO)
  }

  // Renderizar comida
  ctx.drawImage(nevesImg, neves.x, neves.y)

  // Gravar posição antiga da cabeça da cobra
  let cobraX = cobra[0].x
  let cobraY = cobra[0].y

  // Identificar direção da cobra
  switch (direcao) {
    case Direction.UP:
      cobraY -= TAM_BLOCO
      break
    case Direction.DOWN:
      cobraY += TAM_BLOCO
      break
    case Direction.LEFT:
      cobraX -= TAM_BLOCO
      break
    case Direction.RIGHT:
      cobraX += TAM_BLOCO
      break
  }

  // Capturar comida
  if (cobraX == neves.x && cobraY == neves.y) {
    nevesAudio.play()
    score++
    neves.regenerate()
  } else {
    // Remove a cauda
    cobra.pop()
  }

  let novaCabeca = {
    x: cobraX,
    y: cobraY
  }

  // Verificar se houve colisão
  // if (colisao(novaCabeca)) {
  if (cobraX < TAM_BLOCO || cobraX > 17 * TAM_BLOCO || cobraY < 3 * TAM_BLOCO || cobraY > 17 * TAM_BLOCO || colisao(novaCabeca)) {
    clearInterval(jogo)
    morreuAudio.play()
  }

  // Adicionar nova cabeça
  cobra.unshift(novaCabeca)

  // Renderizar placar
  ctx.fillStyle = 'white'
  ctx.font = '45px Changa one'
  ctx.fillText(score, 2 * TAM_BLOCO, 1.6 * TAM_BLOCO)
}

// Iniciar partida e definir velocidade da cobra (em milissegundos)
let jogo = setInterval(desenha, 150)
