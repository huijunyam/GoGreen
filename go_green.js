const trashArr = [
      "paper", "bananaSkin", "napkins", "aluminiumCan", "vegetable", "glassBottle",
       "motor oil cans", "aluminum foil", "styrofoam containers",
      "waxed/waterproof cardboard"
    ];
const recycle = ["aluminiumCan", "paper", "glassBottle", "aluminum foil"];
const compost = ["bananaSkin", "vegetable"];
const waste = ["napkins", "motor oil cans", "styrofoam containers", "waxed/waterproof cardboard"];

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1350;
canvas.height = 500;

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
trashImg.src = "./images/start_ball.png";

let trash = {
  speed: 150
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
  trashText.y = 480;
};

let update = (modifier) => {
  // debugger
  console.log(level, trashArr[level - 1]);
  console.log(trash.x, trash.y);
  if (38 in keysDown) {
    trash.y -= trash.speed * modifier;
  }
  if (40 in keysDown) {
    trash.y += trash.speed * modifier;
  }
  if (37 in keysDown) {
    trash.x -= trash.speed * modifier;
  }
  if (39 in keysDown) {
    trash.x += trash.speed * modifier;
  }

  //touching
  if (lives <= 0) {
    loss();
  }

  if (trash.x < 565 && trash.x > 300 && trash.y >= 40 && trash.y <= 250) {
    if (waste.indexOf(trashArr[level - 1]) !== -1) {
      if (level < 10 && lives > 0) {
        ++level;
        score += 10;
        reset();
      } else {
        win();
      }
    } else {
      console.log("try again");
      --lives;
      reset();
    }
  } else if (trash.x >= 565 && trash.x < 810 && trash.y >= 40 && trash.y <= 250) {
    if (compost.indexOf(trashArr[level - 1]) !== -1) {
      if (level < 10 && lives > 0) {
        ++level;
        score += 10;
        reset();
      } else {
        win();
      }
    } else {
      console.log("try again");
      --lives;
      reset();
    }
  } else if (trash.x >= 810 && trash.x < 1060 && trash.y >= 40 && trash.y <= 250) {
    if (recycle.indexOf(trashArr[level - 1]) !== -1) {
      if (level < 10 && lives > 0) {
        ++level;
        score += 10;
        reset();
      } else {
        win();
      }
    } else {
      console.log("try again");
      --lives;
      reset();
    }
  }
};

let render = () => {
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
  if (trashReady) {
    ctx.drawImage(trashImg, trash.x, trash.y, trashImg.width*0.3, trashImg.height*0.3);
    ctx.font = "15pt Calibri";
    ctx.fillText(`${trashArr[level - 1]}`, trashText.x, trashText.y);
  }
  ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
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
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

let loss = () => {
  console.log("you lose");
  const loseSplash = document.getElementById("lose-splash");
  loseSplash.style.visibility = "visible";
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 32) {
      restart();
    }
  });
};

// function lossRound() {
//   const levelSplash = document.getElementById("level-splash");
//   const levelHeader = document.getElementById("level-header");
//   levelHeader.innerHTML = `Please try again`;
//   lives -= 1;
//   levelSplash.style.visibility = "visible";
// }

let win = () => {
  console.log("you win");
  const winSplash = document.getElementById("win-splash");
  const victory = document.getElementById("victory");
  victory.innerHTML = `You have ${score + 10} score`;
  winSplash.style.visibility = "visible";
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 32) {
      restart();
    }
  });
};

let hideSplash = () => {
  const splash = document.getElementById("splash");
  splash.style.visibility = "hidden";

};

let restart = () => {
  const loseSplash = document.getElementById("lose-splash");
  loseSplash.style.visibility = "hidden";
  const winSplash = document.getElementById("win-splash");
  winSplash.style.visibility = "hidden";
  level = 1;
  score = 0;
  lives = 3;
  reset();
  main();
};


document.addEventListener("keydown", hideSplash);
let then = Date.now();
reset();
main();

start_game() {
  
}
