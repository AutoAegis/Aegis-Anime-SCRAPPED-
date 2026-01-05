const container = document.querySelector('.snake-container');

const imagesList = [
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20White.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20Org.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20Purple.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20Red.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20White.png?raw=true'
];

const maxSnakeLength = 5;
const amplitude = 30;
const speed = 2;
const spinSpeed = 2;
const snakeSpacing = 80;

let snakes = [];

const numRows = Math.ceil(window.innerHeight / snakeSpacing);

function getRandomImage() {
  return imagesList[Math.floor(Math.random() * imagesList.length)];
}

for (let row = 0; row < numRows; row++) {
  const direction = row % 2 === 0 ? 1 : -1;
  const startY = row * snakeSpacing + 20;
  const snake = [];
  for (let i = 0; i < maxSnakeLength; i++) {
    const img = document.createElement('img');
    img.src = getRandomImage();
    img.classList.add('snake-image');
    img.style.top = `${startY + Math.sin(i * 0.5) * amplitude}px`;
    img.x = direction === 1 ? -i * 60 : window.innerWidth + i * 60;
    img.direction = direction;
    img.rotation = Math.random() * 360;
    img.phase = i * 0.5;
    container.appendChild(img);
    snake.push(img);
  }
  snakes.push(snake);
}

function animate() {
  snakes.forEach(snake => {
    snake.forEach((img, index) => {
      img.x += img.direction * speed;
      if (img.direction === 1 && img.x > window.innerWidth + 50) img.x = -50;
      if (img.direction === -1 && img.x < -50) img.x = window.innerWidth + 50;
      const y = parseFloat(img.style.top) + Math.sin(img.phase) * amplitude;
      img.style.top = `${y}px`;
      img.phase += 0.05;
      img.rotation += spinSpeed;
      img.style.transform = `translateX(${img.x}px) rotate(${img.rotation}deg)`;
    });
  });
  requestAnimationFrame(animate);
}

animate();
