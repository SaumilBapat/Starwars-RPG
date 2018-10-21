var characters = {
  DarthMaul: {name: "Darth Maul", picture: "./assets/images/darth-maul.png", health: 120, attack: 10, status: "Start"},
  DarthSidious: {name: "Darth Sidious", picture: "./assets/images/darth-sidious.jpg", health: 120, attack: 25, status: "Start"},
  LukeSkywalker: {name: "Luke Skywalker", picture: "./assets/images/luke-skywalker.jpg", health: 120, attack: 20, status: "Start"},
  ObiWanKenobi: {name: "Obi Wan Kenobi", picture: "./assets/images/obi-wan-kenobi.jpg", health: 120, attack: 15, status: "Start"},
};
var yourCharacter = '';
var yourAttack = 10;
var defender = '';
var gameStatus = 'Start';
var wins = 0;
var losses = 0;

$(document).ready(function() {
  renderCharacters();
});


function renderCharacters() {
  emptyChars();
  for (var char in characters) {
    var character = characters[char];
    var charDiv = $("<div>");
    charDiv.addClass("character");
    charDiv.html("<div class='characterInfo'>" + character.name + "</div><image src='" + character.picture + "' class='characterIcon'/><div class='characterInfo'>" + character.health + "</div>");
    charDiv.attr("id", char);
    if(character.status === "Start") {
      $("#AvailableCharacters").append(charDiv);
      charDiv.attr("onclick", "selectCharacter(this)");
    } else if(character.status === "QueuedOpponents") {
      $("#QueuedOpponents").append(charDiv);
      charDiv.attr("onclick", "selectOpponent(this)");
    } else if(character.status === "YourCharacter") {
      $("#YourCharacter").append(charDiv);
    } else if(character.status === "Defender") {
      $("#Defender").append(charDiv);
      charDiv.attr("onclick", "attackOpponent()");
    }
  }
}

function emptyChars() {
  $("#AvailableCharacters").empty();
  $("#YourCharacter").empty();
  $("#QueuedOpponents").empty();
  $("#CurrentOpponent").empty();
  $("#Defender").empty();
}

function selectCharacter(charElement) {
    for (var char in characters) {
        if(char === charElement.id) {
            characters[char].status = 'YourCharacter';
            yourCharacter = char;
        } else {
            characters[char].status = 'QueuedOpponents';
        }
    }
    renderCharacters();
}

function selectOpponent(charElement) {
  if (gameStatus !== 'Won' && gameStatus !== 'Lost') {
    if(defender == '') {
        for (var char in characters) {
          if(char === charElement.id) {
            defender = char;
            characters[char].status = 'Defender';
          }
        }
        renderCharacters();
    }
  }
}

function attackOpponent() {
    if (gameStatus !== 'Won' && gameStatus !== 'Lost') {
      $("#Messages").empty();
      characters[defender].health -= yourAttack;
      var yourAttackInfo = $("<div>").html("<div class='userMessage'>You Attacked " + characters[defender].name + " for " + yourAttack + " damage.</div>");
      $("#Messages").append(yourAttackInfo);
      characters[yourCharacter].health -= characters[defender].attack;
      var defenderAttackInfo = $("<div>").html("<div class='userMessage'>" + characters[defender].name + " attached you for " + characters[defender].attack + " damage.</div>");
      $("#Messages").append(defenderAttackInfo);
      if(characters[defender].health < 0) {
        characters[defender].status = 'Defeated';
        var youDefeatedInfo = $("<div>").html("<div class='userMessage'>You Defeated " + characters[defender].name + ".</div>");
        $("#Messages").append(youDefeatedInfo);
        defender = '';
      }
      yourAttack *= 2;
      checkStatus();
      renderCharacters();
    }
}

function checkStatus() {
  gameStatus = 'Won';
  for (var char in characters) {
    if(char !== yourCharacter && characters[char].health > 0) {
      gameStatus = 'On-Going';
    }
  }
  if (characters[yourCharacter].health <= 0) {
    gameStatus = 'Lost';
    var youDied = $("<div>").html("<div class='userMessage'>You Died!</div>");
    $("#Messages").append(youDied);
    losses ++;
    var score = $("<div>").html("<div class='userMessage'><h5>Score - </h5><h6>Wins:</h6> " + wins + " <h6>Losses: </h6>" + losses + "</div>");
    $("#Messages").append(score);
    var resetButton = $("<button>").html("Reset");
    resetButton.attr("onclick", "resetGame()");
    $("#Messages").append(resetButton);
  }
  if (gameStatus === 'Won') {
    wins++;
    var youWon = $("<div>").html("<div class='userMessage'>You Won!</div>");
    $("#Messages").append(youWon);
    var resetButton = $("<button>").html("Reset");
    resetButton.attr("onclick", "resetGame()");
    $("#Messages").append(resetButton);
  }
}

function resetGame() {
    for (var char in characters) {
        characters[char].health = 120;
        characters[char].status = 'Start';
    }
    var yourCharacter = '';
    var yourAttack = 10;
    var defender = '';
    var gameStatus = 'Start';
    $("#Messages").empty();
    renderCharacters();
}
