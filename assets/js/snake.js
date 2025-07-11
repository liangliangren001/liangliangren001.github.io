// 像素化贪吃蛇游戏 by AI
const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');
const gridSize = 20; // 16x16格
const tileCount = canvas.width / gridSize;
let snake = [
  {x: 8, y: 8},
  {x: 7, y: 8},
  {x: 6, y: 8}
];
let direction = {x: 0, y: 0};
let food = {x: 12, y: 8};
let growing = false;
let gameOver = false;
let score = 0;

function drawPixelRect(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 2;
  ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 画食物
  drawPixelRect(food.x, food.y, '#ff4444');
  // 画蛇
  snake.forEach((s, i) => drawPixelRect(s.x, s.y, i === 0 ? '#4caf50' : '#8bc34a'));
  // 画分数
  ctx.fillStyle = '#fff';
  ctx.font = '16px monospace';
  ctx.fillText('分数: ' + score, 8, 24);
  if (gameOver) {
    ctx.fillStyle = '#f44336';
    ctx.font = 'bold 32px monospace';
    ctx.fillText('游戏结束', 60, 180);
    ctx.font = '16px monospace';
    ctx.fillStyle = '#fff';
    ctx.fillText('按空格重新开始', 70, 210);
  }
}

function update() {
  if (gameOver) return;
  const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
  // 撞墙
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    gameOver = true;
    draw();
    return;
  }
  // 撞自己
  if (snake.some((s, i) => i > 0 && s.x === head.x && s.y === head.y)) {
    gameOver = true;
    draw();
    return;
  }
  snake.unshift(head);
  // 吃到食物
  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    snake.pop();
  }
  draw();
}

function placeFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } while (snake.some(s => s.x === newFood.x && s.y === newFood.y));
  food = newFood;
}

document.addEventListener('keydown', e => {
  if (gameOver && e.code === 'Space') {
    restart();
    return;
  }
  switch (e.code) {
    case 'ArrowUp': if (direction.y !== 1) direction = {x: 0, y: -1}; break;
    case 'ArrowDown': if (direction.y !== -1) direction = {x: 0, y: 1}; break;
    case 'ArrowLeft': if (direction.x !== 1) direction = {x: -1, y: 0}; break;
    case 'ArrowRight': if (direction.x !== -1) direction = {x: 1, y: 0}; break;
  }
});

function restart() {
  snake = [
    {x: 8, y: 8},
    {x: 7, y: 8},
    {x: 6, y: 8}
  ];
  direction = {x: 0, y: 0};
  food = {x: 12, y: 8};
  gameOver = false;
  score = 0;
  draw();
}

draw();
setInterval(() => {
  if (!gameOver && (direction.x !== 0 || direction.y !== 0)) update();
}, 180); 