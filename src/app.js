import Particle from './entities/particle.js';

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const mouse = {
  x: undefined,
  y: undefined,
  radius: (canvas.width / 80) * (canvas.height / 80)
};

//handle particles
const particles = [];
function particlesCreate() {
  particles.length = 0;

  const numberOfParticles = (canvas.width * canvas.height) * 0.0001;

  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle(canvas.width, canvas.height));
  }
}
function particlesAnimation(ctx, mouse) {
  particles.forEach(p => {
    p.draw(ctx);
    p.update(mouse);
  });
}
function particlesConnect(ctx) {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {

      const dist = ((particles[a].pos.x - particles[b].pos.x) ** 2) + ((particles[a].pos.y - particles[b].pos.y) ** 2);

      if (dist < ((canvas.width * 0.11) * (canvas.height * 0.11))) {
        ctx.beginPath();
        ctx.globalAlpha = 1 - (dist / (canvas.width * canvas.height)) * 80;
        ctx.strokeStyle = '#7267CB';
        ctx.lineWidth = 1;
        ctx.moveTo(particles[a].pos.x, particles[a].pos.y);
        ctx.lineTo(particles[b].pos.x, particles[b].pos.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.closePath();
      }
    };
  };
}

// game animation loop
function animate() {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesConnect(ctx);
  particlesAnimation(ctx, mouse);
}


//?    /////////////////////////
//?   //// EVENT LISTENERS ////
//?  /////////////////////////
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  mouse.radius = (canvas.width / 80) * (canvas.height / 80);

  particlesCreate();
});
canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
});
canvas.addEventListener('mouseout', (e) => {
  mouse.x = undefined;
  mouse.y = undefined;
});
window.addEventListener('load', () => {
  particlesCreate();
  animate();
});
