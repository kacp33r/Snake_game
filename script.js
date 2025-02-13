// Snake Game Logic

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Wymiary węża i jedzenia
const grid = 20;
const canvasSize = 400;
const snakeColor = "#4caf50";
const foodColor = "#f44336";

// Wąż
let snake = [
    { x: 160, y: 160 },
    { x: 140, y: 160 },
    { x: 120, y: 160 }
];

let food = { x: 0, y: 0 };
let dx = grid;
let dy = 0;
let score = 0;
let gameLoop;
let gameStarted = false;

function randomFoodPosition() {
    return {
        x: Math.floor(Math.random() * (canvasSize / grid)) * grid,
        y: Math.floor(Math.random() * (canvasSize / grid)) * grid
    };
}

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Rysowanie węża
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#ffeb3b' : snakeColor; // Głowa węża w żółtym
        ctx.fillRect(segment.x, segment.y, grid, grid);
    });

    // Rysowanie jedzenia
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x, food.y, grid, grid);

    // Aktualizowanie wyniku
    document.getElementById('score').innerText = score;
}

function move() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Sprawdzanie kolizji z jedzeniem
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = randomFoodPosition();
    } else {
        snake.pop();
    }
}

function gameOver() {
    clearInterval(gameLoop);
    alert('Game Over! Twój wynik: ' + score);
    document.getElementById('startButton').style.display = 'block'; // Pokaż przycisk po zakończeniu gry
}

function collision() {
    const head = snake[0];
    // Kolizja ze ścianą
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }
    // Kolizja z własnym ciałem
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Obsługa sterowania
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w') {
        dx = 0;
        dy = -grid;
    } else if (e.key === 'ArrowDown' || e.key === 's') {
        dx = 0;
        dy = grid;
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        dx = -grid;
        dy = 0;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        dx = grid;
        dy = 0;
    }
});

// Inicjalizacja gry
function startGame() {
    snake = [
        { x: 160, y: 160 },
        { x: 140, y: 160 },
        { x: 120, y: 160 }
    ];
    food = randomFoodPosition();
    score = 0;
    dx = grid;
    dy = 0;
    document.getElementById('startButton').style.display = 'none'; // Ukryj przycisk po rozpoczęciu gry

    gameLoop = setInterval(() => {
        move();
        if (collision()) {
            gameOver();
        }
        draw();
    }, 150); // Wolniejsze poruszanie się węża (150ms)
}

// Obsługa kliknięcia przycisku "Graj"
document.getElementById('startButton').addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        startGame();
    }
});
