function Prize(value) {
  this.value = value;
  this.isSelected = false; 
}

Prize.prototype.html = function() {
  var $prize = $('<div></div>')
    .addClass('price')
    .text(this.value + " €");

  if (this.isSelected) {
    $prize.addClass('selected');
  }

  return $prize;
}