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
trashImg.src = "./images/start_ball.png";

let monsterReady = false;
let monsterImg = new Image();
monsterImg.onload = () => {
  monsterReady = true;
};
monsterImg.src = "./images/gk_idle_0.png";
