const ARENA_THICKNESS = 15;

export class Arena {
  constructor(x, y, players, size) {
    this.x = x;
    this.y = y;
    this.players = players;
    this.size = size;
  }

  draw(ctx, deltaTime) {
    ctx.lineWidth = ARENA_THICKNESS;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();

    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    ctx.closePath();
    ctx.stroke();
  }
}
