function Bonus(x, y, radius, color, context) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.context = context;
  this.moveUp = function (dist) {
    if (this.y + this.radius >= 0) {
      this.y -= dist;
    }
  };
  this.moveDown = function (dist) {
    if (this.y <= this.context.height) {
      this.y += dist;
    }
  };
  this.moveLeft = function (dist) {
    if (this.x >= 0) {
      this.x -= dist;
    }
  };
  this.moveRight = function (dist) {
    if (this.x <= this.context.width) {
      this.x += dist;
    }
  };
  this.drawBonus = function () {
    this.context.ctx.beginPath();
    this.context.ctx.fillStyle = this.color;
    this.context.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.ctx.fill();
    this.context.ctx.closePath();
  };
}
