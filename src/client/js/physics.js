const PADDLE_THICKNESS = 15;
const PADDLE_WIDTH = Math.PI / 6;

export function checkPaddleBallCollision(paddle, ball) {
  const innerCircleRadius = paddle.size - (PADDLE_THICKNESS / 2);

  const dX = paddle.x - ball.x;
  const dY = paddle.y - ball.y;
  const distance = Math.hypot(dX, dY);

  if (distance >= innerCircleRadius - 10 && distance <= innerCircleRadius + 10) {
    const paddleX1 = paddle.x + (Math.cos(paddle.rot) * (paddle.size + (PADDLE_THICKNESS / 2)));
    const paddleY1 = paddle.y + (Math.sin(paddle.rot) * (paddle.size + (PADDLE_THICKNESS / 2)));
    const paddleX2 = paddle.x + (Math.cos(paddle.rot + PADDLE_WIDTH) * (paddle.size + (PADDLE_THICKNESS / 2)));
    const paddleY2 = paddle.y + (Math.sin(paddle.rot + PADDLE_WIDTH) * (paddle.size + (PADDLE_THICKNESS / 2)));

    // https://github.com/mattdesl/point-in-triangle/blob/master/index.js

    const v0x = paddleX2 - paddle.x;
    const v0y = paddleY2 - paddle.y;
    const v1x = paddleX1 - paddle.x;
    const v1y = paddleY1 - paddle.y;
    const v2x = ball.x - paddle.x;
    const v2y = ball.y - paddle.y;

    const dot00 = v0x * v0x + v0y * v0y;
    const dot01 = v0x * v1x + v0y * v1y;
    const dot02 = v0x * v2x + v0y * v2y;
    const dot11 = v1x * v1x + v1y * v1y;
    const dot12 = v1x * v2x + v1y * v2y;

    const b = (dot00 * dot11 - dot01 * dot01);
    const inv = b === 0 ? 0 : (1 / b);
    const u = (dot11 * dot02 - dot01 * dot12) * inv;
    const v = (dot00 * dot12 - dot01 * dot02) * inv;

    return u >= 0 && v >= 0 && (u + v < 1);
  }

  return false;
}
