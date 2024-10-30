/// <reference path="Scripts\typings\lodash\lodash.d.ts" />
var GAME_BLOCK_NUMBER = 0;
var canvas;
var ctx;
var videos;
var answersRounds;
var gameBlock = [];

gameBlock[0] = [
  [
    // Name popular Indian Cricketrs
    ["Virat Kohli", 35],
    ["MS Dhoni", 30],
    ["Sachin Tendulkar", 25],
    ["Kapil Dev", 10],
  ],
  [
    // Name popular places to get Biriyani in Hyderabad
    ["Shadab", 45],
    ["Paradise", 25],
    ["Pista House", 20],
    ["Shah Ghouse", 10],
  ],
  [
    // Name top Shah Rukh Khan movies
    ["Chennai Express", 45],
    ["Om Shanti Om", 30],
    ["My Name Is Khan", 15],
    ["Dilwale Dulhania La Jayenge", 10],
  ],
  [
    // Name Popular Spots in MJ
    ["Blue Shed", 40],
    ["Non-Veg Canteen", 25],
    ["Library", 20],
    ["Rock Garden", 15],
  ],
];

var turnedBox = [false, false, false, false];
function pad(num, size) {
  var s = "0000000000" + num;
  return s.substr(s.length - size);
}
var boxLocations = [80, 230, 80, 535, 1020, 230, 1020, 535];
var numLocations = [755, 230, 755, 535, 1720, 230, 1720, 535];
var teamScore = [0, 0];
var curTeamScore = [0, 0];
var curTeam = 0;
var curWrongAnswer = [0, 0];
var curRound = 0;
function resetToNewRound() {
  for (var i = 0; i < curTeamScore.length; ++i) {
    teamScore[i] += curTeamScore[i];
    curTeamScore[i] = 0;
    curWrongAnswer[i] = 0;
  }
  if (curRound + 1 >= answersRounds.length) {
    drawFinish();
    return;
  }
  noAdd = false;
  ctx.clearRect(0, 0, 1920, 1080);
  var reset = document.getElementById("reset");
  reset.currentTime = 0;
  reset.style.display = "block";
  _.forEach(videos, function (video) {
    video.style.display = "none";
    video.currentTime = 0;
  });
  reset.play();
  drawLowerText(0, 0, curTeam);
  setTimeout(function () {
    _.forEach(videos, function (video) {
      video.style.display = "block";
    });
    reset.style.display = "none";
    reset.currentTime = 0;
  }, 1000);
  for (var i = 0; i < turnedBox.length; ++i) {
    turnedBox[i] = false;
  }
  curRound += 1;
}
function pointsSteal() {
  curTeamScore[curTeam] += curTeamScore[Math.abs(curTeam - 1)];
  curTeamScore[Math.abs(curTeam - 1)] = 0;
  drawLowerText(curTeamScore[0], curTeamScore[1], curTeam);
}
function drawLowerText(score1, score2, currentTeam) {
  ctx.font = "400px Bebas Neue ";
  var textSize = 400;
  ctx.clearRect(canvas.width / 2 - textSize * 2, 1010 - 400, textSize * 4, 450);
  if (currentTeam == 0) {
    ctx.fillStyle = "yellow";
    ctx.fillText(score1, 250, 1010);
    ctx.fillStyle = "white";
    ctx.fillText(score2, 1310, 1010);
  }
  if (currentTeam == 1) {
    ctx.fillStyle = "white";
    ctx.fillText(score1, 250, 1010);
    ctx.fillStyle = "yellow";
    ctx.fillText(score2, 1310, 1010);
  }
}
var finished = false;
function drawFinish() {
  finished = true;
  ctx.clearRect(0, 0, 1920, 1080);
  animate("ending", 1000);
  _.forEach(videos, function (video) {
    video.style.display = "none";
    video.currentTime = 0;
  });
  ctx.font = "600px Bebas Neue ";
  ctx.fillText(
    pad(teamScore[0], 3) + "   " + pad(teamScore[1], 3),
    100,
    800,
    1800
  );
}
function animate(element, duration) {
  var animation = document.getElementById(element);
  animation.currentTime = 0;
  animation.style.display = "block";
  animation.play();
  setTimeout(function () {
    animation.style.display = "none";
  }, duration);
}
var startUsed = false;
function start() {
  if (startUsed === true) {
    return;
  }
  answersRounds = gameBlock[GAME_BLOCK_NUMBER];
  var main = document.getElementById("main");
  main.style.display = "none";
  animate("beginning", 1000);
  setTimeout(function () {
    _.forEach(videos, function (video) {
      video.style.display = "block";
      video.currentTime = 0;
    });
  }, 700);
}
var noAdd = false;
function turnText(boxId) {
  if (!turnedBox[boxId]) {
    videos[boxId].play();
    setTimeout(function () {
      if (curTeam !== -1 && !noAdd) {
        curTeamScore[curTeam] += answersRounds[curRound][boxId][1];
      }
      if (
        (curTeam === 0 && _.isEqual(curWrongAnswer, [2, 3])) ||
        (curTeam === 1 && _.isEqual(curWrongAnswer, [3, 2]))
      ) {
        pointsSteal();
        noAdd = true;
      }

      ctx.fillStyle = "white";
      ctx.shadowColor = "black";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.clearRect(
        boxLocations[boxId * 2 + 0],
        boxLocations[boxId * 2 + 1] - 300,
        850,
        350
      );

      var strlen = answersRounds[curRound][boxId][0].length;
      if (strlen < 20) {
        ctx.font = "200px Bebas Neue";
        ctx.fillText(
          answersRounds[curRound][boxId][0],
          boxLocations[boxId * 2 + 0],
          boxLocations[boxId * 2 + 1],
          650
        );
      } else if (strlen < 40) {
        ctx.font = "100px Bebas Neue";
        ctx.fillText(
          answersRounds[curRound][boxId][0],
          boxLocations[boxId * 2 + 0],
          boxLocations[boxId * 2 + 1] - (200 - 100) / 3,
          650
        );
      } else {
        ctx.font = "100px Bebas Neue";
        var str = answersRounds[curRound][boxId][0];
        var half = strlen / 2;
        while (half < strlen) {
          if (str.charAt(half) == " ") {
            break;
          } else {
            half++;
          }
        }

        var line1 = "esimene asd asd asd asd asd asd";
        var line2 = "teine asd asd asd asd asd asd";
        if (half >= strlen) {
          //jagame julmalt pooleks
          line1 = str.substring(0, strlen / 2);
          line2 = str.substring(strlen / 2, strlen);
        } else {
          //jagame ilusasti
          line1 = str.substring(0, half);
          line2 = str.substring(half + 1, strlen);
        }

        ctx.fillText(
          line1,
          boxLocations[boxId * 2 + 0],
          boxLocations[boxId * 2 + 1] - 100 + 15,
          650
        );
        ctx.fillText(
          line2,
          boxLocations[boxId * 2 + 0],
          boxLocations[boxId * 2 + 1] - 0 + 15,
          650
        );
      }

      ctx.font = "200px Bebas Neue";
      ctx.fillText(
        answersRounds[curRound][boxId][1],
        numLocations[boxId * 2],
        numLocations[boxId * 2 + 1]
      );
      drawLowerText(curTeamScore[0], curTeamScore[1], curTeam);
    }, 450);
  }
  turnedBox[boxId] = true;
}
function wrongAnswer(wrongNum) {
  if (wrongNum < 1 || wrongNum > 3) {
    console.log("error in wrong number");
    return;
  }
  var cross = document.getElementById("cross" + wrongNum);
  cross.style.display = "block";
  cross.play();
  setTimeout(function () {
    cross.style.display = "none";
  }, 1000);
}
function wrongAnswerTeams() {
  console.log("Current team false: " + curTeam);
  curWrongAnswer[curTeam] += 1;
  wrongAnswer(curWrongAnswer[curTeam]);
  if (
    curWrongAnswer[curTeam] === 3 &&
    curWrongAnswer[Math.abs(curTeam - 1)] === 3
  ) {
    noAdd = true;
  } else if (curWrongAnswer[curTeam] === 3 && 3) {
    switchTeam();
    drawLowerText(curTeamScore[0], curTeamScore[1], curTeam);
    curWrongAnswer[curTeam] = 2;
  }
}

function selectTeam(team) {
  curTeam = team;
  console.log(curTeam);
  drawLowerText(curTeamScore[0], curTeamScore[1], curTeam);
}

function switchTeam() {
  curTeam = Math.abs(curTeam - 1);
}

function unloadScrollBars() {
  document.documentElement.style.overflow = "hidden";
}

function toggleMusic() {
  audioEl = document.getElementById("theme");
  if (audioEl.paused) {
    audioEl.play();
  } else {
    var duration = 5000;
    fade(
      1,
      0,
      duration,
      function () {
        return audioEl.volume;
      },
      function (newVolume) {
        return (audioEl.volume = newVolume);
      }
    );
    setTimeout(function () {
      audioEl.pause();
      audioEl.currentTime = 0;
    }, duration);
  }
}

function fade(start, end, duration, getter, setter) {
  // var dt = (end-start) / duration * 10; // (*10) since we are gonna set it every 10 ms

  var t = start * duration;
  var dt = 10;

  var fader = setInterval(function () {
    var cur = getter();
    next = (t * t) / (start * duration) / (start * duration);
    if (t <= 0) {
      setter(end);
      clearInterval(fader);
      return;
    }
    console.log(next);
    setter(next);
    t -= dt;
  }, dt);
}

window.onload = function () {
  unloadScrollBars();
  canvas = document.getElementById("vastus");
  ctx = canvas.getContext("2d");
  videos = document.getElementsByClassName("anim");
};
window.addEventListener("mousedown", function (event) {
  console.log("X: " + event.clientX + " Y: " + event.clientY);
});
window.addEventListener("keypress", function (event) {
  if (event.charCode == 49) {
    // 1
    turnText(0);
  } else if (event.charCode == 50) {
    // 2
    turnText(1);
  } else if (event.charCode == 51) {
    // 3
    turnText(2);
  } else if (event.charCode == 52) {
    // 4
    turnText(3);
  } else if (event.charCode == 53) {
    // 5
    wrongAnswer(1);
  } else if (event.charCode == 54) {
    // 6
    wrongAnswer(2);
  } else if (event.charCode == 55) {
    // 7
    wrongAnswer(3);
  } else if (event.charCode == 106) {
    // j
    selectTeam(0);
  } else if (event.charCode == 107) {
    // k
    selectTeam(1);
  } else if (event.charCode == 114) {
    // r
    resetToNewRound();
  } else if (event.charCode == 113) {
    // q
    wrongAnswerTeams();
  } else if (event.charCode == 115) {
    // s
    start();
  } else if (event.charCode == 105) {
    // i
    pointsSteal();
  } else if (event.charCode == 48) {
    // 0
    noAdd = true;
  } else if (event.charCode == 109) {
    // m
    toggleMusic();
  } else if (event.charCode == 109) {
    // m
    toggleMusic();
  } else {
    console.log(event.charCode);
  }
});
