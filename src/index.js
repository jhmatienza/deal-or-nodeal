$(document).ready(function() {
  var prizesContainer = $('#prices-show');
  var boxContainer = $('#briefcase');
  var game = new Game(prizesContainer, boxContainer);

  $('#btn-1player').click(function() {
    $('#btn-1player').hide();
    game.start();
    
  });
});