import { Arena } from './arena';
import { Ball } from './ball';
import { Paddle } from './paddle';
import { checkPaddleBallCollision } from "./physics";
import { Player } from "./player";

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Set canvas to proper size
    this.resizeCanvas();
    this.resized = true;

    // Register resize handler
    window.addEventListener('resize', this.resizeCanvas.bind(this));

    this.balls = [
      new Ball(this.width / 2, this.height / 2)
    ];

    const arenaSize = Math.min(this.width, this.height) / 2.5;

    this.paddles = [
      new Paddle(this.width / 2, this.height / 2, 0, '#F00', arenaSize)
    ];

    this.arena = new Arena(this.width / 2, this.height / 2, this.paddles, arenaSize);

    this.player = new Player(this.paddles[0]);

    // Initialize delta time
    this.then = Date.now();

    // Begin drawing on canvas
    requestAnimationFrame(this.draw.bind(this));
  }

  resizeCanvas() {
    this.canvas.width = this.width = window.innerWidth;
    this.canvas.height = this.height = window.innerHeight;
    this.resized = false;
  }

  draw() {
    if (!this.resized) {
      const arenaSize = Math.min(this.width, this.height) / 2.5;

      this.arena.size = arenaSize;
      this.arena.x = this.width / 2;
      this.arena.y = this.height / 2;

      this.paddles.forEach((paddle) => {
        paddle.size = arenaSize;
        paddle.x = this.width / 2;
        paddle.y = this.height / 2;
      });
    }

    this.player.update();

    // Calculate delta time for animations
    const now = Date.now();
    const deltaTime = now - this.then;
    this.then = now;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw each of the balls
    this.balls.forEach((ball) => {
      ball.draw(this.ctx, deltaTime);
    });

    this.arena.draw(this.ctx, deltaTime);

    // Draw each of the paddles
    this.paddles.forEach((paddle) => {
      paddle.draw(this.ctx, deltaTime);

      const collision = checkPaddleBallCollision(paddle, this.balls[0]);

      if (collision) {
        this.balls[0].rot +=  Math.PI;

        if (this.balls[0].rot > Math.PI * 2) {
          this.balls[0].rot %= Math.PI * 2;
        }
      }
    });

    // Request next frame
    requestAnimationFrame(this.draw.bind(this));
  }
}
