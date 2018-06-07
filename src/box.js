function Box(id, value, onClick) {
  this.id = id;
  this.value = value;

  this.onClick = onClick;
}

Box.prototype.html = function() {

  var $box = $('<button></button>')
    .addClass('box')
    .append($('<p></p>').text(this.id))
    .click(function() {
      this.onClick(this);
    }.bind(this));
  return $box;
}
