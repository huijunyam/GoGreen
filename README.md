#Go Green

[Go Green Link](https://huijunyam.github.io/GoGreen/)

##Background
Go Green is an educational game that teaches people how to sort and recycle the trash correctly. The game is designed based on the soccer game theme and it has 10 rounds per game. There will be three bins labeled as trash, compost, and recycle setting up in front of the player. The player will use keypad(up, down, left, right) to control and move the trash into the correct bin. The goalkeeper will try to catch the trash to prevent player from recycling. A scoreboard will display the score of the player based on the correct sorted trash. The player will lose the game if the player sorted the trash incorrectly for more than three times.    

For more information about the recyclable items, please visit this [recycle list] (https://www.buffalo.edu/recycling/recyclable.htm)
![image of game design](./images/game_design.png)

##Architecture and Technologies
Go Green is created with Javascript, HTML5, CSS3, and `howler.js`
- Vanilla Javascript for game logic and structure
- Javascript Canvas for DOM Manipulation and rendering
- `howler.js` for playing audio
- Webpack for bundling all the scripts file

##Implementation
Go Green uses the HTML Canvas to draw graphics via Javascript. It uses `requestAnimationFrame` to constantly render and update the canvas to provide animation in a cross browser way for the game.
```
let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame ||
                        w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
```

The splash page will be rendered when the users win or lose the game by manipulating the visibility style in CSS to visible and manipulated the DOM element by adding winning or losing messages using innerHTML tag.
```
let win = () => {
  const winSplash = document.getElementById("win-splash");
  const victory = document.getElementById("victory");
  victory.innerHTML = `You have a score of ${score + 10}`;
  winSplash.style.visibility = "visible";
};
```

Go Green uses `howler.js` to create the sound effect if player sorts the trash correctly or wrongly. There is a sound button that can mute the sound. A 'click' event listener is attached to the button and `clickHandler` function will be triggered when clicking occurred. The image of the sound button will be changed and rendered accordingly.   
```
//change the displayed image of sound button
let clickHandler = () => {
  if (elementIsClicked === false) {
    document.getElementById("muteButton").src = "./images/mute.png";
    elementIsClicked = true;
  } else {
    document.getElementById("muteButton").src = "./images/unmute.png";
    elementIsClicked = false;
  }
};
```
```
//condition checking the sound shoud be muted or played
if (elementIsClicked === true) {
          goalAudio.mute();
        } else {
          goalAudio.play();
        }
```

##Future Plan
My future plan for this project include the following features:
- Randomly generated bomb that can stop the movement of goalkeeper for few seconds
- Difficulty is increased by the score of the player
- A slider that can toggle between different themes such as basketball or football (original theme)
