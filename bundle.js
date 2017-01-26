/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	
	var trashArr = ["paper", "bananaSkin", "napkins", "aluminiumCan", "vegetable", "glassBottle", "motor oil cans", "aluminum foil", "styrofoam containers", "waxed/waterproof cardboard"];
	var recycle = ["aluminiumCan", "paper", "glassBottle", "aluminum foil"];
	var compost = ["bananaSkin", "vegetable"];
	var waste = ["napkins", "motor oil cans", "styrofoam containers", "waxed/waterproof cardboard"];
	
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 1350;
	canvas.height = 500;
	
	var bgReady = false;
	var bgImage = new Image();
	bgImage.onload = function () {
	  bgReady = true;
	};
	bgImage.src = "./images/bg_game.jpg";
	
	var trashBinReady = false;
	var trashBinImg = new Image();
	trashBinImg.onload = function () {
	  trashBinReady = true;
	};
	trashBinImg.src = "./images/trashBin.png";
	
	var recycleBinReady = false;
	var recycleBinImg = new Image();
	recycleBinImg.onload = function () {
	  recycleBinReady = true;
	};
	recycleBinImg.src = "./images/recycle_bin.png";
	
	var compostBinReady = false;
	var compostBinImg = new Image();
	compostBinImg.onload = function () {
	  compostBinReady = true;
	};
	compostBinImg.src = "./images/CompostBin.png";
	
	var trashReady = false;
	var trashImg = new Image();
	trashImg.onload = function () {
	  trashReady = true;
	};
	trashImg.src = "./images/start_ball.png";
	
	var trash = {
	  speed: 150
	};
	
	var trashBin = {};
	var compostBin = {};
	var recycleBin = {};
	var trashText = {};
	var score = 0;
	var level = 1;
	var lives = 3;
	var keysDown = {};
	var currentTrash = trashArr[level - 1];
	
	addEventListener("keydown", function (e) {
	  keysDown[e.keyCode] = true;
	}, false);
	
	addEventListener("keyup", function (e) {
	  delete keysDown[e.keyCode];
	}, false);
	
	var reset = function reset() {
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
	
	var update = function update(modifier) {
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
	
	var render = function render() {
	  if (bgReady) {
	    ctx.drawImage(bgImage, 0, 0);
	  }
	  if (trashBinReady) {
	    ctx.drawImage(trashBinImg, trashBin.x, trashBin.y, trashBinImg.width * 0.2, trashBinImg.height * 0.2);
	  }
	  if (compostBinReady) {
	    ctx.drawImage(compostBinImg, compostBin.x, compostBin.y, compostBinImg.width * 0.2, compostBinImg.height * 0.22);
	  }
	  if (recycleBinReady) {
	    ctx.drawImage(recycleBinImg, recycleBin.x, recycleBin.y, recycleBinImg.width * 0.33, recycleBinImg.height * 0.34);
	  }
	  if (trashReady) {
	    ctx.drawImage(trashImg, trash.x, trash.y, trashImg.width * 0.3, trashImg.height * 0.3);
	    ctx.font = "15pt Calibri";
	    ctx.fillText("" + trashArr[level - 1], trashText.x, trashText.y);
	  }
	  ctx.fillStyle = "rgb(250, 250, 250)";
	  ctx.font = "24px Helvetica";
	  ctx.textAlign = "left";
	  ctx.textBaseline = "top";
	  ctx.fillText("Score: " + score + " \n Lives: " + lives, 32, 32);
	};
	
	var main = function main() {
	  var now = Date.now();
	  var delta = now - then;
	  update(delta / 1000);
	  render();
	  then = now;
	  requestAnimationFrame(main);
	};
	
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	
	var loss = function loss() {
	  console.log("you lose");
	  var loseSplash = document.getElementById("lose-splash");
	  loseSplash.style.visibility = "visible";
	  document.addEventListener("keydown", function (e) {
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
	
	var win = function win() {
	  console.log("you win");
	  var winSplash = document.getElementById("win-splash");
	  var victory = document.getElementById("victory");
	  victory.innerHTML = "You have " + (score + 10) + " score";
	  winSplash.style.visibility = "visible";
	  document.addEventListener("keydown", function (e) {
	    if (e.keyCode === 32) {
	      restart();
	    }
	  });
	};
	
	var hideSplash = function hideSplash() {
	  var splash = document.getElementById("splash");
	  splash.style.visibility = "hidden";
	};
	
	var restart = function restart() {
	  var loseSplash = document.getElementById("lose-splash");
	  loseSplash.style.visibility = "hidden";
	  var winSplash = document.getElementById("win-splash");
	  winSplash.style.visibility = "hidden";
	  level = 1;
	  score = 0;
	  lives = 3;
	  reset();
	  main();
	};
	
	document.addEventListener("keydown", hideSplash);
	var then = Date.now();
	reset();
	main();

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map