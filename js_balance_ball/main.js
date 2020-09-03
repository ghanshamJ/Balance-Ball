var div;
var canvas;
function init() {
  div = document.getElementById("div1");
  let level = parseInt(document.getElementById("level").value);

  if (level <= 0) {
    alert("Please select level");
    return;
  }
  div.style.display = "none";

  canvas = document.getElementById("myCanvas");
  canvas.height = window.innerHeight;
  canvas.style.backgroundColor = "rgb(200,200,200)";

  if (window.innerHeight < window.innerWidth)
    canvas.width = window.innerWidth / 2;
  else canvas.width = window.innerWidth;

  canvas.style.display = "block";
  context1 = new Context(canvas);
  play(level, context1);
}

function play(level, context1) {
  let sizeComp = parseInt((context1.width / 200) * 5);
  let ball1 = new Ball(
    context1.width / 2,
    sizeComp * 3,
    sizeComp,
    "blue",
    context1
  );
  let steps = [];
  let obstacles = [];
  let bonuses = [];
  let lives = 5;
  let score = 0;
  let keyRightPress = false;
  let keyLeftPress = false;
  let animate = setInterval(animation, 500 / (level * 2));
  let addSteps = setInterval(addStep, 7000 / (level * 2));
  let addObstacles = setInterval(addObstacle, 12000 / (level * 2));
  let addBonuses = setInterval(addBonus, 50000 / (level * 2));

  let btnLeft = new Button(
    0,
    context1.height / 2,
    context1.width / 2,
    context1.height,
    "<",
    "rgb(200,200,200)",
    "white"
  );
  let btnRight = new Button(
    context1.width / 2,
    context1.height / 2,
    context1.width / 2,
    context1.height,
    ">",
    "rgb(200,200,200)",
    "white"
  );

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  canvas.addEventListener("click", function (e) {
    if (btnLeft.isInside(canvas, e)) {
      ball1.moveLeft(15);
    }

    if (btnRight.isInside(canvas, e)) {
      ball1.moveRight(15);
    }
  });

  function stopGame() {
    clearInterval(animate);
    clearInterval(addSteps);
    clearInterval(addObstacles);
    clearInterval(addBonuses);
  }
  function starGame() {
    animate = setInterval(animation, 100);
    addSteps = setInterval(addStep, 700);
    addObstacles = setInterval(addObstacle, 1200);
    addBonuses = setInterval(addBonus, 5000);
  }
  function addStep() {
    steps.push(
      new Step(
        getRandomArbitrary(0, context1.width - sizeComp * 5),
        context1.height,
        sizeComp * 5,
        sizeComp * 1.5,
        "blue",
        context1
      )
    );
  }
  function addObstacle() {
    let x = getRandomArbitrary(0, context1.width - sizeComp * 5);
    if (
      steps[steps.length - 1].y >=
      context1.height - steps[steps.length - 1].height
    ) {
      while (
        !(
          steps[steps.length - 1].x + steps[steps.length - 1].width < x ||
          steps[steps.length - 1].x - steps[steps.length - 1].width > x
        )
      ) {
        x = getRandomArbitrary(0, context1.width - sizeComp * 5);
      }
    }
    obstacles.push(
      new Obstacle(
        x,
        context1.height,
        sizeComp * 5,
        sizeComp * 1.5,
        "red",
        context1
      )
    );
  }
  function addBonus() {
    bonuses.push(
      new Bonus(
        steps[steps.length - 1].x + steps[steps.length - 1].width / 2,
        steps[steps.length - 1].y - sizeComp,
        sizeComp,
        "gold",
        context1
      )
    );
  }
  function animation() {
    context1.ctx.clearRect(0, 0, context1.width, context1.height);
    draw();
    for (let i in steps) steps[i].moveUp(10);
    for (let i in obstacles) obstacles[i].moveUp(10);
    for (let i in bonuses) bonuses[i].moveUp(10);
    if (!isBallonStep()) ball1.moveDown(10);
    if (keyRightPress) ball1.moveRight(20);
    if (keyLeftPress) ball1.moveLeft(20);
    collision();
    if (lives <= 0) gameEnd();
  }
  function gameEnd() {
    stopGame();
    alert("Game Over! Your Score: " + score);
    canvas.style.display = "none";
    div.style.display = "block";
  }
  function draw() {
    btnLeft.drawButton(context1.ctx);
    btnRight.drawButton(context1.ctx);
    ball1.drawBall();
    drawScore_lives();
    for (let i in steps) steps[i].drawStep();
    for (let i in obstacles) obstacles[i].drawObstacle();
    for (let i in bonuses) bonuses[i].drawBonus();
  }
  function drawScore_lives() {
    context1.ctx.beginPath();
    context1.ctx.font = "20px Arial";
    context1.ctx.fillStyle = "gray";
    context1.ctx.fillText(
      `Lives: ${lives}     Score: ${score} `,
      0,
      15,
      sizeComp * 15,
      sizeComp * 15
    );
    context1.ctx.fill();
    context1.ctx.closePath();
  }
  function isBallonStep() {
    for (var i in steps) {
      if (
        ball1.x + ball1.radius / 2 >= steps[i].x &&
        ball1.x - ball1.radius / 2 <= steps[i].x + steps[i].width &&
        ball1.y >= steps[i].y - steps[i].height &&
        ball1.y <= steps[i].y + steps[i].height
      ) {
        ball1.y = steps[i].y - ball1.radius;
        return true;
      }
    }
    return false;
  }
  function isBallonObstacle() {
    for (var i in obstacles) {
      if (
        ball1.x + ball1.radius / 2 >= obstacles[i].x &&
        ball1.x - ball1.radius / 2 <= obstacles[i].x + obstacles[i].width &&
        ball1.y >= obstacles[i].y - obstacles[i].height &&
        ball1.y <= obstacles[i].y + obstacles[i].height
      ) {
        lives -= 1;
        setBall_Position();
        return;
      }
    }
  }
  function setBall_Position() {
    try {
      ball1.y = steps[2].y - ball1.radius;
      ball1.x = steps[2].x + steps[2].width / 2;
      return;
    } catch (e) {}
    try {
      ball1.y = steps[1].y - ball1.radius;
      ball1.x = steps[1].x + steps[1].width / 2;
      return;
    } catch (e) {
      ball1.y = ball1.radius * 3;
      return;
    }
  }
  function isStep_clash_top_Window() {
    if (steps[0] ? steps[0].y <= 0 : false) {
      steps.shift();
      score += 10;
    }
  }
  function isObstacle_clash_top_Window() {
    if (obstacles[0] ? obstacles[0].y <= 0 : false) {
      obstacles.shift();
      score += 15;
    }
  }
  function isBonus_clash_top_Window() {
    if (bonuses[0] ? bonuses[0].y <= 0 : false) bonuses.shift();
  }
  function isBall_clash_top_Window() {
    if (ball1.y <= 0) {
      lives -= 1;
      setBall_Position();
      return;
    }
  }
  function isBall_clash_Bottom_Window() {
    if (ball1.y >= context1.height) {
      lives -= 1;
      setBall_Position();
      return;
    }
  }
  function isBall_clash_Bonus() {
    for (let i in bonuses)
      if (
        ball1.y === bonuses[i].y &&
        ((ball1.x <= bonuses[i].x &&
          ball1.x >= bonuses[i].x - bonuses[i].radius * 2) ||
          (ball1.x >= bonuses[i].x &&
            ball1.x <= bonuses[i].x + bonuses[i].radius * 2))
      ) {
        bonuses.splice(i, 1);
        lives += 1;
      }
  }
  function keyUpHandler(e) {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowLeft":
        keyLeftPress = keyRightPress = false;
        break;
    }
  }
  function keyDownHandler(e) {
    switch (e.key) {
      case "ArrowRight":
        keyRightPress = true;
        keyLeftPress = false;
        break;
      case "ArrowLeft":
        keyRightPress = false;
        keyLeftPress = true;
        break;
    }
  }
  function collision() {
    isStep_clash_top_Window();
    isObstacle_clash_top_Window();
    isBonus_clash_top_Window();
    isBall_clash_top_Window();
    isBall_clash_Bottom_Window();
    isBall_clash_Bonus();
    isBallonObstacle();
  }
  function drawMessage() {
    context1.ctx.beginPath();
    context1.ctx.fillStyle = "black";
    context1.ctx.rect(
      0,
      context1.height / 4,
      context1.width,
      context1.height / 2
    );
    context1.ctx.fill();
    context1.ctx.closePath();

    context1.ctx.beginPath();
    context1.ctx.font = "60 Arial";
    context1.ctx.fillStyle = "white";
    context1.ctx.fillText(
      `Game over! play again`,
      context1.width / 4,
      sizeComp * 30,
      sizeComp * 30,
      sizeComp * 30
    );
    context1.ctx.fill();
    context1.ctx.closePath();
  }
}
function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}
