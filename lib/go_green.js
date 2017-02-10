import { Howl } from 'howler';

const trashArr = [
      "paper", "banana skin", "napkins", "aluminium can", "food waste", "glass bottle",
      "motor oil can", "aluminum foil", "styrofoam containers",
      "waxed waterproof cardboard"
    ];
const recycle = ["aluminium can", "paper", "glass bottle", "aluminum foil"];
const compost = ["banana skin", "food waste"];
const waste = ["napkins", "motor oil can", "styrofoam containers", "waxed waterproof cardboard"];

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1350;
canvas.height = 500;

let trash = {
  speed: 200
};

let monster = {
  speed: 100
};

let trashBin = {};
let compostBin = {};
let recycleBin = {};
let trashText = {};
let score = 0;
let level = 1;
let lives = 3;
let keysDown = {};
let currentTrash = trashArr[level - 1];
let dx = 5;

//audio setup
let savedAudio = new Howl({
  src: ['./sounds/ball_saved.mp3']
});

let goalAudio = new Howl({
  src: ['./sounds/goal.mp3']
});

//load image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = () => {
  bgReady = true;
};
bgImage.src = "./images/bg_game.jpg";

let trashBinReady = false;
let trashBinImg = new Image();
trashBinImg.onload = () => {
  trashBinReady = true;
};
trashBinImg.src = "./images/trashBin.png";

let recycleBinReady = false;
let recycleBinImg = new Image();
recycleBinImg.onload = () => {
  recycleBinReady = true;
};
recycleBinImg.src = "./images/recycle_bin.png";

let compostBinReady = false;
let compostBinImg = new Image();
compostBinImg.onload = () => {
  compostBinReady = true;
};
compostBinImg.src = "./images/CompostBin.png";

let trashReady = false;
let trashImg = new Image();
trashImg.onload = () => {
  trashReady = true;
};
// trashImg.src = "./images/start_ball.png";

let monsterReady = false;
let monsterImg = new Image();
monsterImg.onload = () => {
  monsterReady = true;
};
monsterImg.src = "./images/gk_idle_0.png";


addEventListener("keydown", (e) => {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", (e) => {
  delete keysDown[e.keyCode];
}, false);

let reset = () => {
  trash.x = 600;
  trash.y = 400;
  trashBin.x = 300;
  trashBin.y = 40;
  compostBin.x = 565;
  compostBin.y = 40;
  recycleBin.x = 810;
  recycleBin.y = 40;
  trashText.x = 600;
  trashText.y = 460;
  monster.x = 650;
  monster.y = 150;
};

let update = (modifier) => {
  monster.x += dx;
  if (monster.x <= 300 || monster.x >= 890) {
    dx = -dx;
    monster.speed += 100;
  }

  if (38 in keysDown) {
    trash.y -= trash.speed * modifier;
  }
  if (40 in keysDown) {
    trash.y += trash.speed * modifier;
  }
  if (37 in keysDown) {
    trash.x -= trash.speed * modifier;
    // monster.x -= monster.speed * modifier;
  }
  if (39 in keysDown) {
    trash.x += trash.speed * modifier;
    // monster.x += monster.speed * modifier;
  }

  //touching
  if (lives <= 0) {
    savedAudio.play();
    loss();
  }
  if ((trash.x < 300 && trash.y < 200) || (trash.x >= 1070 && trash.y < 200)) {
    --lives;
    savedAudio.play();
    reset();
  }
  if (monster.x === trash.x && monster.y === (trash.y + 50)) {
    if (lives > 0) {
      savedAudio.play();
      --lives;
      reset();
    } else {
      savedAudio.play();
      loss();
    }
  }

  if (trash.x < 565 && trash.x > 300 && trash.y >= 40 && trash.y <= 250) {
    if (waste.indexOf(trashArr[level - 1]) !== -1) {
      if (level < 10 && lives > 0) {
        ++level;
        score += 10;
        goalAudio.play();
        reset();
      } else {
        win();
      }
    } else {
      console.log("try again");
      savedAudio.play();
      --lives;
      reset();
    }
  } else if (trash.x >= 565 && trash.x < 810 && trash.y >= 40 && trash.y <= 250) {
    if (compost.indexOf(trashArr[level - 1]) !== -1) {
      if (level < 10 && lives > 0) {
        ++level;
        score += 10;
        goalAudio.play();
        reset();
      } else {
        win();
      }
    } else {
      console.log("try again");
      savedAudio.play();
      --lives;
      reset();
    }
  } else if (trash.x >= 810 && trash.x < 1060 && trash.y >= 40 && trash.y <= 250) {
    if (recycle.indexOf(trashArr[level - 1]) !== -1) {
      if (level < 10 && lives > 0) {
        ++level;
        score += 10;
        goalAudio.play();
        reset();
      } else {
        win();
      }
    } else {
      console.log("try again");
      savedAudio.play();
      --lives;
      reset();
    }
  }
};

let renderTrash = () => {
  switch (level) {
    case 1:
      trashImg.src = "./images/paper.png";
      break;
    case 2:
      trashImg.src = "./images/banana_skin.jpg";
      break;
    case 3:
      trashImg.src = "./images/napkins.png";
      break;
    case 4:
      trashImg.src = "./images/aluminium_can.png";
      break;
    case 5:
      trashImg.src = "./images/vegetable.png";
      break;
    case 6:
      trashImg.src = "./images/glass_bottle.png";
      break;
    case 7:
      trashImg.src = "./images/motor_oil_can.png";
      break;
    case 8:
      trashImg.src = "./images/aluminium_foil.png";
      break;
    case 9:
      trashImg.src = "./images/styroform_container.png";
      break;
    case 10:
      trashImg.src = "./images/waxed_waterproof_container.png";
      break;
  }
};

let render = () => {
  renderTrash();
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (trashBinReady) {
    ctx.drawImage(trashBinImg, trashBin.x, trashBin.y, trashBinImg.width* 0.2, trashBinImg.height*0.2);
  }
  if (compostBinReady) {
    ctx.drawImage(compostBinImg, compostBin.x, compostBin.y, compostBinImg.width*0.2, compostBinImg.height*0.22);
  }
  if (recycleBinReady) {
    ctx.drawImage(recycleBinImg, recycleBin.x, recycleBin.y, recycleBinImg.width*0.33, recycleBinImg.height*0.34);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImg, monster.x, monster.y);
  }
  if (trashReady) {
    ctx.drawImage(trashImg, trash.x, trash.y, trashImg.width*0.3, trashImg.height*0.3);
    ctx.font = "18pt Calibri";
    ctx.fillText(`${trashArr[level - 1]}`, trashText.x, trashText.y);
  }
  ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "30px sans-serif";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText(`Score: ${score} \n Lives: ${lives}`, 32, 32);
};

let main = () => {
  let now = Date.now();
  let delta = now - then;
  update(delta / 1000);
  render();
  then = now;
  requestAnimationFrame(main);
};

let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame
|| w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

let loss = () => {
  console.log("you lose");
  const loseSplash = document.getElementById("lose-splash");
  loseSplash.style.visibility = "visible";
  // document.addEventListener("keydown", (e) => {
  //   if (e.keyCode === 32) {
  //     const loseSplashMessage = document.getElementById("lose-splash");
  //     loseSplashMessage.style.visibility = "hidden";
  //     restart();
  //   }
  // });
};

let win = () => {
  console.log("you win");
  const winSplash = document.getElementById("win-splash");
  const victory = document.getElementById("victory");
  victory.innerHTML = `You have a score of ${score + 10}`;
  winSplash.style.visibility = "visible";
  // document.addEventListener("keydown", (e) => {
  //   if (e.keyCode === 32) {
  //     const winSplashMessage = document.getElementById("win-splash");
  //     winSplashMessage.style.visibility = "hidden";
  //     restart();
  //   }
  // });
};

let hideSplash = () => {
  const splash = document.getElementById("splash");
  splash.style.visibility = "hidden";
};

let then;
let restart = () => {
  level = 1;
  score = 0;
  lives = 3;
  then = Date.now();
  reset();
  main();
};

document.addEventListener("keydown", hideSplash);
restart();
