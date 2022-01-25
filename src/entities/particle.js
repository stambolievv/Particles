export default class Particle {
  constructor(gameWidth, gameHeight) {
    this.pos = { x: random(20, gameWidth - 20), y: random(20, gameHeight - 20) };
    this.vel = { x: random(-2, 2), y: random(-2, 2) };
    this.dim = { r: random(3, 8) };
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.dim.r, 0, 2 * Math.PI);
    ctx.fillStyle = '#6E3CBC';
    ctx.fill();
    ctx.closePath();
  }

  update(mouse) {
    this.collideWorldBounds();
    this.mouseCollision(mouse);

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  collideWorldBounds() {
    if (this.pos.x > this.gameWidth - this.dim.r || this.pos.x < this.dim.r) {
      this.vel.x *= -1;
    }

    if (this.pos.y > this.gameHeight - this.dim.r || this.pos.y < this.dim.r) {
      this.vel.y *= -1;
    }
  }

  mouseCollision(mouse) {
    const diffX = mouse.x - this.pos.x;
    const diffY = mouse.y - this.pos.y;

    const dist = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (dist < mouse.radius + this.dim.r) {
      if (mouse.x < this.pos.x && this.pos.x < this.gameWidth - this.dim.r * 20) {
        this.pos.x += 5;
        this.vel.x *= -1;
      }
      if (mouse.x > this.pos.x && this.pos.x > this.dim.r * 20) {
        this.pos.x -= 5;
        this.vel.x *= -1;
      }
      if (mouse.y < this.pos.y && this.pos.y < this.gameHeight - this.dim.r * 20) {
        this.pos.y += 5;
        this.vel.y *= -1;
      }
      if (mouse.y > this.pos.y && this.pos.y > this.dim.r * 20) {
        this.pos.y -= 5;
        this.vel.y *= -1;
      }
    }
  }
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}