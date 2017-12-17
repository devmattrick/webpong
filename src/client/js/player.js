const MAX_SPEED = 1;
const SPEED_INCREMENT = 0.05;
const FRICTION = 0.6;

export class Player {
  constructor(paddle) {
    this.paddle = paddle;
    this.keys = [];
    this.velocity = 0;

    document.addEventListener('keydown', this.handleKeydown.bind(this));
    document.addEventListener('keyup', this.handleKeyup.bind(this));
  }

  handleKeydown(event) {
    this.keys[event.keyCode] = true;
  }

  handleKeyup(event) {
    this.keys[event.keyCode] = false;
  }

  update() {
    if (this.keys[37] || this.keys[65]) {
      if (this.velocity < MAX_SPEED) {
        this.velocity += SPEED_INCREMENT;
      }
    }

    if (this.keys[39] || this.keys[68]) {
      if (this.velocity > -MAX_SPEED) {
        this.velocity -= SPEED_INCREMENT;
      }
    }

    this.velocity *= FRICTION;
    this.paddle.rot += this.velocity;
  }
}
