$(document).ready(function() {
  var prizesContainer = $('#prices-show');
  var boxContainer = $('#briefcase');
  var game = new Game(prizesContainer, boxContainer);

  $('#btn-play').click(function() {
    $('#btn-play').hide();
    game.start();
    
  });
});