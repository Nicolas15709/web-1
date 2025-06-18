// script.js

let musicaActiva = false;
let currentTheme = 'light';
let wishes = [];
let quizQuestions = [
  {
    question: "¿Cuál crees que es su color favorito?",
    options: ["💗 Rosa", "💙 Azul", "💜 Morado"],
    correct: 0,
    response: "¡Exacto! El rosa es perfecto para alguien tan dulce como tu, Dani 💗"
  },
  {
    question: "¿Qué actividad le gusta más?",
    options: ["📚 Leer", "🎵 Escuchar música", "🎨 Arte"],
    correct: 1,
    response: "¡Correcto! La música llena tu corazón de alegría 🎵"
  },
  {
    question: "¿Cuál es su personalidad?",
    options: ["😊 Alegre", "🤔 Pensativa", "⚡ Enérgica"],
    correct: 0,
    response: "¡Perfecto! tu alegría contagia a todos 😊"
  }
];
let currentQuizIndex = 0;
let pinataHits = 0;

window.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  setTimeout(() => document.getElementById('loading-screen').style.display = 'none', 3500);
  initializeMagicCursor();
  initializeFloatingElements();
  initializeCountdown();
  startTypingMessage();
  loadSavedWishes();
  startFloatingSnoopy();
  setTimeout(showSnoopyWelcome, 3600);


}

function initializeMagicCursor() {
  const cursor = document.getElementById('magic-cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.addEventListener('click', e => {
    createSparkles(e.clientX, e.clientY);
    playClickSound();
  });
}

function createSparkles(x, y) {
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.innerHTML = '✨';
      sparkle.style.position = 'fixed';
      sparkle.style.left = (x + Math.random() * 40 - 20) + 'px';
      sparkle.style.top = (y + Math.random() * 40 - 20) + 'px';
      sparkle.style.fontSize = '1rem';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '9999';
      sparkle.style.animation = 'sparkle 1s ease-out forwards';
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }, i * 100);
  }
}

function initializeFloatingElements() {
  createFloatingBalloons();
  createTwinklingStars();
  startFloatingHearts();
}

function createFloatingBalloons() {
  const container = document.getElementById('balloons-container');
  const balloons = ['🎈', '🎉', '🎊'];
  setInterval(() => {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.innerHTML = balloons[Math.floor(Math.random() * balloons.length)];
    balloon.style.left = Math.random() * 100 + 'vw';
    balloon.style.animationDelay = Math.random() * 2 + 's';
    balloon.style.animationDuration = (15 + Math.random() * 10) + 's';
    container.appendChild(balloon);
    setTimeout(() => balloon.remove(), 25000);
  }, 4000);
}

function createTwinklingStars() {
  const container = document.getElementById('stars-container');
  for (let i = 0; i < 20; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.innerHTML = '⭐';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.animationDelay = Math.random() * 2 + 's';
    star.style.animationDuration = (2 + Math.random() * 2) + 's';
    container.appendChild(star);
  }
}

function startFloatingHearts() {
  setInterval(() => {
    const heart = document.createElement('div');
    heart.innerHTML = ['💖', '💕', '💗', '💓', '💘'][Math.floor(Math.random() * 5)];
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-50px';
    heart.style.fontSize = '2rem';
    heart.style.animation = 'float-up 15s linear forwards';
    heart.style.pointerEvents = 'none';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 16000);
  }, 5000);
}

function playClickSound() {
  const clickSound = document.getElementById('click-sound');
  clickSound.currentTime = 0;
  clickSound.play();
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
}

function createFireworks() {
  const confetti = document.getElementById('confetti-container');
  const audio = document.getElementById('confetti-sound');
  audio.currentTime = 0;
  audio.play();
  for (let i = 0; i < 100; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.top = Math.random() * 100 + 'vh';
    piece.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
    confetti.appendChild(piece);
    setTimeout(() => piece.remove(), 3000);
  }
}

function startTypingMessage() {
  const mensaje = "Hoy celebramos a una persona maravillosa. ¡Feliz cumpleaños, Dani! 🎂✨";
  const target = document.getElementById('mensaje-animado');
  let i = 0;
  function typeChar() {
    if (i < mensaje.length) {
      target.textContent += mensaje.charAt(i);
      i++;
      setTimeout(typeChar, 80);
    }
  }
  typeChar();
}

// 1️⃣ Ajustar la fecha del cumpleaños dinámicamente según el día actual
function initializeCountdown() {
  const countdown = document.getElementById('countdown');

  function getNextBirthday() {
    const today = new Date();
    const year = today.getFullYear();
    const birthday = new Date(year, 5, 18); // 18 de junio (mes 5 porque enero = 0)
    if (today > birthday) {
      birthday.setFullYear(year + 1);
    }
    return birthday;
  }

  function updateCountdown() {
    const nextBirthday = getNextBirthday();
    const now = new Date();
    const diff = nextBirthday - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    countdown.innerHTML = `
      <div class="countdown-item"><div class="countdown-number">${days}</div><div class="countdown-label">días</div></div>
      <div class="countdown-item"><div class="countdown-number">${hours}</div><div class="countdown-label">horas</div></div>
      <div class="countdown-item"><div class="countdown-number">${minutes}</div><div class="countdown-label">min</div></div>
      <div class="countdown-item"><div class="countdown-number">${seconds}</div><div class="countdown-label">seg</div></div>
    `;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function fullScreenMode() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function openWishBox() {
  document.getElementById('wish-box').style.display = 'block';
}

function closeWishBox() {
  document.getElementById('wish-box').style.display = 'none';
}

function saveWish() {
  const text = document.getElementById('wish-text').value.trim();
  if (text) {
    wishes.push(text);
    document.getElementById('wish-text').value = '';
    loadSavedWishes();
    const audio = document.getElementById('success-sound');
    audio.play();
  }
}

function loadSavedWishes() {
  const container = document.getElementById('saved-wishes');
  container.innerHTML = wishes.map(w => `<div class="wish-item">${w}</div>`).join('');
}

function startQuiz() {
  currentQuizIndex = 0;
  document.getElementById('quiz-modal').style.display = 'block';
  showCurrentQuestion();
}

function closeQuiz() {
  document.getElementById('quiz-modal').style.display = 'none';
}

function showCurrentQuestion() {
  const q = quizQuestions[currentQuizIndex];
  document.getElementById('question-text').textContent = q.question;
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((btn, i) => {
    btn.textContent = q.options[i];
    btn.onclick = () => checkAnswer(i);
  });
  document.getElementById('quiz-result').textContent = '';
}

function checkAnswer(index) {
  const q = quizQuestions[currentQuizIndex];
  const result = document.getElementById('quiz-result');
  if (index === q.correct) {
    result.textContent = q.response;
  } else {
    result.textContent = '¡Ups! Esa no es la correcta 🥺';
  }
  if (currentQuizIndex < quizQuestions.length - 1) {
    currentQuizIndex++;
    setTimeout(showCurrentQuestion, 2500);
  }
}

function startPinataGame() {
  pinataHits = 0;
  document.getElementById('pinata-game').style.display = 'block';
  document.getElementById('pinata-hits').textContent = `Golpes: 0/5`;
}

function closePinataGame() {
  document.getElementById('pinata-game').style.display = 'none';
}

function hitPinata() {
  pinataHits++;
  document.getElementById('pinata-hits').textContent = `Golpes: ${pinataHits}/5`;
  document.getElementById('pinata').classList.add('hit');
  setTimeout(() => document.getElementById('pinata').classList.remove('hit'), 500);
  if (pinataHits >= 5) {
    const container = document.getElementById('candy-rain');
    for (let i = 0; i < 30; i++) {
      const candy = document.createElement('div');
      candy.className = 'candy';
      candy.innerHTML = '🍬';
      candy.style.left = Math.random() * 100 + 'vw';
      container.appendChild(candy);
      setTimeout(() => candy.remove(), 2000);
    }
    pinataHits = 0;
  }
}

function openCakeDecorator() {
  document.getElementById('cake-decorator').style.display = 'block';
}

function closeCakeDecorator() {
  document.getElementById('cake-decorator').style.display = 'none';
}

function resetCake() {
  document.querySelectorAll('.cake-decoration').forEach(e => e.remove());
}

function addDecoration(emoji) {
  const cake = document.getElementById('virtual-cake');
  const deco = document.createElement('div');
  deco.className = 'cake-decoration';
  deco.innerHTML = emoji;

  // Posicionar aleatoriamente pero dentro del pastel
  deco.style.position = 'absolute';
  deco.style.top = Math.random() * 60 + 20 + '%';
  deco.style.left = Math.random() * 70 + 10 + '%';
  deco.style.fontSize = '1.5rem';

  cake.appendChild(deco);
}

function addCandles() {
  addDecoration('🕯️');
}

function addFlowers() {
  addDecoration('🌸');
}

function addStars() {
  addDecoration('⭐');
}

function mostrarSorpresa() {
  document.getElementById('sorpresa').style.display = 'block';
}

function downloadImage(path) {
  const link = document.createElement('a');
  link.href = path;
  link.download = 'sorpresa.jpg';
  link.click();
}

function downloadCertificate() {
  const cert = document.querySelector('.certificate');
  html2canvas(cert).then(canvas => {
    const link = document.createElement('a');
    link.download = 'certificado.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

function shareOnFacebook() {
  window.open('https://www.facebook.com/sharer/sharer.php?u=' + location.href);
}

function shareOnWhatsApp() {
  window.open('https://wa.me/?text=' + encodeURIComponent(location.href));
}

function copyLink() {
  navigator.clipboard.writeText(location.href);
  alert('¡Link copiado al portapapeles!');
}

function toggleMusica() {
  const musica = document.getElementById('musica');
  if (musicaActiva) {
    musica.pause();
  } else {
    musica.play();
  }
  musicaActiva = !musicaActiva;



}


 // Mostrar regalo con cuadro bonito y confeti
window.mostrarRegalo = function(mensaje) {
  const modal = document.createElement('div');
  modal.className = 'gift-modal';

  const content = document.createElement('div');
  content.className = 'gift-content';

  const closeBtn = document.createElement('span');
  closeBtn.className = 'gift-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = () => document.body.removeChild(modal);

  const text = document.createElement('p');
  text.textContent = mensaje;

  content.appendChild(closeBtn);
  content.appendChild(text);
  modal.appendChild(content);
  document.body.appendChild(modal);

  createGiftConfetti();
};

function createGiftConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.top = Math.random() * 100 + 'vh';
    piece.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 3000);
  }
  setTimeout(() => container.remove(), 3500);
}


function startFloatingSnoopy() {
  setInterval(() => {
    for (let i = 0; i < 2; i++) { // Mostrar 2 Snoopys cada vez
      const img = document.createElement('img');
      const index = 1 + Math.floor(Math.random() * 3); // snoopy1.png a snoopy3.png
      img.src = `img/snoopy/snoopy${index}.png`;
      img.className = 'floating-snoopy';
      img.style.left = Math.random() * 100 + 'vw';
      document.body.appendChild(img);
      setTimeout(() => img.remove(), 15000);
    }
  }, 8000);
}

// Mostrar saludo especial de bienvenida con Snoopy con video y animación
function showSnoopyWelcome() {
  const modal = document.createElement('div');
  modal.className = 'snoopy-welcome';
  modal.id = 'snoopy-modal';

  const content = document.createElement('div');
  content.className = 'snoopy-content';

  const video = document.createElement('video');
  video.src = 'video/snoopy-baile1.mp4'; // Video saludo
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.className = 'snoopy-video';

  const message = document.createElement('p');
  message.className = 'typing-message';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '¡Gracias, Snoopy!';
  closeBtn.className = 'btn btn-primary';
  closeBtn.onclick = () => {
    const existing = document.getElementById('snoopy-modal');
    if (existing) existing.remove();
  };

  content.appendChild(video);
  content.appendChild(message);
  content.appendChild(closeBtn);
  modal.appendChild(content);
  document.body.appendChild(modal);

  const texto = '🐾 ¡Hola Dani! Snoopy también te desea un ¡feliz cumpleaños! 🎉';
  let i = 0;
  function escribir() {
    if (i < texto.length) {
      message.textContent += texto.charAt(i);
      i++;
      setTimeout(escribir, 50);
    }
  }
  escribir();
}




function initializeApp() {
  setTimeout(() => {
    document.getElementById('loading-screen').style.display = 'none';
    runMainApp();
  }, 3500); // Restaurado a espera fija como antes
}

function runMainApp() {
  initializeMagicCursor();
  initializeFloatingElements();
  initializeCountdown();
  startTypingMessage();
  loadSavedWishes();
  startFloatingSnoopy();
  setTimeout(showSnoopyWelcome, 500);
}


