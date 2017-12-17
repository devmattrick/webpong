const BALL_SIZE = 10;

export class Ball {
  constructor(x = 0, y = 0, speed = 0.2, rot = Math.PI / 6) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.rot = rot;
  }

  draw(ctx, deltaTime) {
    this.x += Math.sin(this.rot) * this.speed * deltaTime;
    this.y += Math.cos(this.rot) * this.speed * deltaTime;

    ctx.fillStyle = "#BBB";
    ctx.beginPath();
    ctx.arc(this.x, this.y, BALL_SIZE, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#00F";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo((Math.sin(this.rot) * (BALL_SIZE + 10)) + this.x, (Math.cos(this.rot) * (BALL_SIZE + 10)) + this.y);
    ctx.stroke();
  }
}
