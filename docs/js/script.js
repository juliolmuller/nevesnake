
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

// Configurar sons
const cimaAudio = new Audio('./audio/cima.mp3')
const baixoAudio = new Audio('./audio/baixo.mp3')
const direitaAudio = new Audio('./audio/direita.mp3')
const esquerdaAudio = new Audio('./audio/esquerda.mp3')
const maisNevesAudio = new Audio('./audio/mais-neves.mp3')
const menosNevesAudio = new Audio('./audio/menos-neves.mp3')
const morreuAudio = new Audio('./audio/morreu.mp3')
const sumiuAudio = new Audio('./audio/sumiu.mp3')

// Configurar objeto comida
const neves = new Food(TAM_BLOCO)

// Instanciar estrutura de cobra
const cobra = new Snake(9 * TAM_BLOCO, 10 * TAM_BLOCO)

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
function colisao(proxPasso) {

  // Verificar colisão nas bordas do tabuleiro
  if (proxPasso.x < TAM_BLOCO || proxPasso.x > 17 * TAM_BLOCO || proxPasso.y < 3 * TAM_BLOCO || proxPasso.y > 17 * TAM_BLOCO)
    return true

  // Verificar colisão no próprio corpo da cobra
  for (let i = 1; i < cobra.size(); i++) {
    if (proxPasso.x == cobra.getByIndex(i).x && proxPasso.y == cobra.getByIndex(i).y)
      return true
  }
  return false
}

// Função para desenhar elementos na tela
function renderizar() {

  // Renderizar imagem de fundo
  ctx.drawImage(fundo, 0, 0)

  // Renderizar placar
  ctx.fillStyle = 'white'
  ctx.font = '45px Changa one'
  ctx.fillText(score, 2 * TAM_BLOCO, 1.6 * TAM_BLOCO)

  // Renderizar comida
  ctx.drawImage(neves.img, neves.x, neves.y)

  // Renderizar cobra
  for (let i = 0; i < cobra.size(); i++) {
    ctx.fillStyle = i == 0 ? 'green' : 'white'
    ctx.fillRect(cobra.getByIndex(i).x, cobra.getByIndex(i).y, TAM_BLOCO, TAM_BLOCO)
    ctx.strokeStyle = 'red'
    ctx.strokeRect(cobra.getByIndex(i).x, cobra.getByIndex(i).y, TAM_BLOCO, TAM_BLOCO)
  }

  // Verificar próximo "passo" da cobra com base na direção
  let proxPasso = cobra.nextStep(direcao, TAM_BLOCO)

  // Verificar se haverá colisão
  if (colisao(proxPasso))
    terminarJogo(morreuAudio)

  // Capturar comida
  if (proxPasso.x == neves.x && proxPasso.y == neves.y) {
    if (neves.grow) {
      cobra.insert(cobra.walk(direcao, TAM_BLOCO))
      maisNevesAudio.play()
    } else {
      cobra.walk(direcao, TAM_BLOCO)
      cobra.remove()
      if (cobra.size())
        menosNevesAudio.play()
      else
        terminarJogo(sumiuAudio)
    }
    score++
    neves.regenerate()

  // Andar um bloco
  } else {
    cobra.walk(direcao, TAM_BLOCO)
  }
}

// Função para terminar jogo
function terminarJogo(som) {
  som.play()
  clearInterval(jogo)
}

// Iniciar partida e definir velocidade da cobra (em milissegundos)
let jogo = setInterval(renderizar, 120)
