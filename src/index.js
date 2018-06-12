$(document).ready(function() {
  var prizesContainer = $('#prices-show');
  var boxContainer = $('#briefcase');
  var game = new Game(prizesContainer, boxContainer);

  $('#btn-play').click(function() {
    $('#btn-play').hide();
    $('#start-title').hide();
    boxContainer.css("display","flex");
    $('#information').show();
    $('#chosen-box').show();
    game.start();
    
  });
});