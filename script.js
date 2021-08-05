let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = 'right';

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y:Math.floor(Math.random() * 15 + 1) * box
}

let gameOver = document.getElementById('gameOver');
let jogadas = document.getElementById('qtdJogadas');
let amzJogadas = 0;

function criarBG() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for(i = 0; i < snake.length; i++) {
            context.fillStyle = 'white';
            context.fillRect(snake[i].x, snake[i].y, box, box)/*cria uma cobra do tamanho da array dele*/
    }
}

function drawFood() {
    context.fillStyle = 'rgb(81, 206, 255)';
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update) /*Detecta os botoes do teclado e executa a */

function update(event) {       /*O != serve para a cobra não andar para trás e 37 significa esquerda, 38 significa cima que nem está na função*/
    if(event.keyCode == 37 && direction != "right") direction = "left"; 
    if(event.keyCode == 38 && direction != "down") direction = "up"; 
    if(event.keyCode == 39 && direction != "left") direction = "right"; 
    if(event.keyCode == 40 && direction != "up") direction = "down"; 
}

function iniciarJogo() {

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo); /*clearInterval vai dar um break no jogo*/
            gameOver.style.display = 'block';
        }
    }

    criarBG();
    drawFood()
    criarCobrinha()

    

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == 'right') snakeX += box;
    if(direction == 'left') snakeX -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();   /*pop seleciona sempre a ultima variavel da array, assim excluindo o que está atrás*/
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        amzJogadas += 1;
        jogadas.innerText = amzJogadas;
    }
    

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);