const PADDLE_THICKNESS = 15;
const PADDLE_WIDTH = Math.PI / 6;

export class Paddle {
  constructor(x = 0, y = 0, rot = 0, color = "#000", size) {
    this.x = x;
    this.y = y;
    this.rot = rot;
    this.color = color;
    this.size = size;
  }

  draw(ctx, deltaTime) {
    ctx.lineWidth = PADDLE_THICKNESS;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, this.rot, this.rot + Math.PI / 6);
    ctx.stroke();

    const paddleX1 = this.x + (Math.cos(this.rot) * (this.size + (PADDLE_THICKNESS / 2)));
    const paddleY1 = this.y + (Math.sin(this.rot) * (this.size + (PADDLE_THICKNESS / 2)));
    const paddleX2 = this.x + (Math.cos(this.rot + PADDLE_WIDTH) * (this.size + (PADDLE_THICKNESS / 2)));
    const paddleY2 = this.y + (Math.sin(this.rot + PADDLE_WIDTH) * (this.size + (PADDLE_THICKNESS / 2)));

    ctx.strokeStyle = "#0F0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(paddleX1, paddleY1);
    ctx.lineTo(paddleX2, paddleY2);
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    ctx.stroke();
  }
}
