let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
}
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
}
var count = 0;


function createBG() {
  context.fillStyle = "lightgrey";
  context.fillRect(0, 0, 16 * box, 16 * box);
}


function createSnake() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "grey";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

function startGame() {

  if (snake[0].x > 15 * box && direction == "right") {
    clearInterval(game);
    alert('Colisão a direita!');
  }
  if (snake[0].x < 0 && direction == "left") {
    clearInterval(game);
    alert('Colisão a esquerda!');
  }
  if (snake[0].y > 15 * box && direction == "down") {
    clearInterval(game);
    alert('Colisão inferior!');
  }
  if (snake[0].y < 0 && direction == "up") {
    clearInterval(game);
    alert('Colisão superior!');
  }

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
      alert('Game Over! :(');
    }
  }

  createBG();
  createSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    count++;
    document.querySelector('span').innerHTML = count;
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  }

  snake.unshift(newHead);
}

let game = setInterval(startGame, 100);
