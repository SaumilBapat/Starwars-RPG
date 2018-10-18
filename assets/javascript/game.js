
var characters = [
  {name: "Darth Maul", picture: "./assets/images/darth-maul.png", health: 120},
  {},
  {},
  {},
];
var currentCharacter = 0;
var word = [];
var selectedLetters = [];
var guessesRemaining = 5;
var wins = 0;
var losses = 0;
$(document).ready(function() {
  window.alert( "ready!" );
  renderYourCharacters();
});


function renderYourCharacters() {
  var yourCharacters = $("#YourCharacters").empty();
  yourCharacters.empty();
  // for (var i = 0; i < characters.length; i++) {
  //   var character = characters[i];
  //   var letter = $("<div>");
  //   letter.addClass("letter");
  //   letter.attr("data-letter", selectedLetters[i]);
  //   letter.text(character.name);
  //   $("#YourCharacters").append(letter);
  // }
}
