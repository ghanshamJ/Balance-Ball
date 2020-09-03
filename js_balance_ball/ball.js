function Ball(x, y, radius, color, context) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.context = context;
  this.moveDown = function (dist) {
    if (this.y < this.context.height) this.y += dist;
  };
  this.moveLeft = function (dist) {
    if (this.x > this.radius) this.x -= dist;
    else this.x = this.radius;
  };
  this.moveRight = function (dist) {
    if (this.x + this.radius < this.context.width) this.x += dist;
    else this.x = this.context.width - this.radius;
  };
  this.drawBall = function () {
    this.context.ctx.beginPath();
    this.context.ctx.fillStyle = this.color;
    this.context.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.ctx.fill();
    this.context.ctx.closePath();
  };
}
