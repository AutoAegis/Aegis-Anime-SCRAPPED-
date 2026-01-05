const container = document.querySelector('.snake-container');

const imagesList = [
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20White.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20Org.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20Purple.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20Red.png?raw=true',
  'https://github.com/AutoAegis/Aegis-Anime/blob/main/Aegis%20White.png?raw=true'
];

const maxSnakeLength = 5;
const amplitude = 50;
const speed = 0.05;
const spinSpeed = 2;

let snakes = [];

function getRandomImage() {
  return imagesList[Math.floor(Math.random() * imagesList.length)];
}

function createSnake(direction, startX) {
  const snake = [];
  const spacing = 60;
  const numImages = Math.floor(Math.random() * maxSnakeLength) + 1;

  for (let i = 0; i < numImages; i++) {
    const img = document.createElement('img');
    img.src = getRandomImage();
    img.classList.add('snake-image');
    img.style.top = `${i * spacing}px`;
    img.style.left = `${startX}px`;
    img.direction = direction;
    img.phase = Math.random() * Math.PI * 2;
    img.rotation = 0;
    container.appendChild(img);
    snake.push(img);
  }

  snakes.push(snake);
}

createSnake(1, window.innerWidth * 0.25);
createSnake(-1, window.innerWidth * 0.75);

function animate() {
  snakes.forEach(snake => {
    snake.forEach((img, index) => {
      let top = parseFloat(img.style.top);
      top += 1;
      if (top > window.innerHeight) top = -50;
      img.style.top = `${top}px`;

      img.phase += speed;
      const wiggle = Math.sin(img.phase + index * 0.5) * amplitude * img.direction;
      img.style.left = `${(window.innerWidth / 2) + wiggle}px`;

      img.rotation += spinSpeed;
      img.style.transform = `rotate(${img.rotation}deg)`;
    });
  });

  requestAnimationFrame(animate);
}

animate();
