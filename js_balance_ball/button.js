function Button(x, y, width, height, text, bgColor, foreColor) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.bgColor = bgColor;
  this.foreColor = foreColor;
  this.text = text;
  this.getMousePos = function (canv, event) {
    let rect = canv.getBoundingClientRect();
    return { x: event.pageX - rect.left, y: event.pageY - rect.top };
  };
  this.isInside = function (canv, event) {
    let pos = this.getMousePos(canv, event);
    return (
      pos.x > this.x &&
      pos.x < this.x + this.width &&
      pos.y < this.y + this.height &&
      pos.y > this.y
    );
  };
  this.drawButton = function (ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.bgColor;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.font = this.height / 2 + "+px Arial";
    ctx.fillStyle = this.foreColor;
    ctx.fillText(
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 4,
      this.width,
      this.height
    );
    ctx.fill();
    ctx.closePath();
  };
}
