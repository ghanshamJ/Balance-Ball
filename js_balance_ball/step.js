function Step(x, y, width, height, color, context) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.context = context;
  this.moveUp = function (dist) {
    if (this.y + this.height >= 0) {
      this.y -= dist;
    }
  };
  this.moveDown = function (dist) {
    if (this.y <= this.context.height) {
      this.y += dist;
    }
  };
  this.drawStep = function () {
    this.context.ctx.beginPath();
    this.context.ctx.fillStyle = this.color;
    this.context.ctx.rect(this.x, this.y, this.width, this.height);
    this.context.ctx.fill();
    this.context.ctx.closePath();
  };
}
