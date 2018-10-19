
var characters = [
  {name: "Darth Maul", picture: "./assets/images/darth-maul.png", health: 120, status: "start"},
  {name: "Darth Sidious", picture: "./assets/images/darth-sidious.jpg", health: 120, status: "start"},
  {name: "Luke Skywalker", picture: "./assets/images/luke-skywalker.jpg", health: 120, status: "start"},
  {name: "Obi Wan Kenobi", picture: "./assets/images/obi-wan-kenobi.jpg", health: 120, status: "start"},
];
var currentCharacter = 0;
var word = [];
var selectedLetters = [];
var guessesRemaining = 5;
var wins = 0;
var losses = 0;
$(document).ready(function() {
  renderYourCharacters();
});


function renderYourCharacters() {
  $("#YourCharacters").empty();
  for (var i = 0; i < characters.length; i++) {
    if(characters[i].status === "start" || characters[i].status === "chosen") {
      var charDiv = $("<div>");
      charDiv.addClass("character");
      charDiv.html("<div class='characterInfo'>" + characters[i].name + "</div><image src='" + characters[i].picture + "' class='characterIcon'/><div class='characterInfo'>" + characters[i].health + "</div>");
      $("#YourCharacters").append(charDiv);
    }
  }
}
