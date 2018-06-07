function Game(prizesContainer, boxContainer) {
  this.prizesContainer = prizesContainer;
  this.boxContainer = boxContainer;
  
  this.prizeValues = [
    0.01,
    1,
    5,
    10,
    25,
    50,
    75,
    100,
    200,
    300,
    400,
    500,
    750,
    1000,
    2500,
    10000,
    25000,
    50000,
    75000,
    100000,
    200000,
    300000,
    400000,
    500000,
    1000000,
    2000000
  ];

  this.boxesCount = 26;

  this.boxes = [];
  this.prizes = [];

  this.ownBox;
  this.selectedBoxesCount = 0;
  this.state = 'init'; // init, => step1, step2, step3, step4
}

Game.prototype.start = function() {
  this.prizes = [];

  this.prizeValues.forEach(function(value) {
    this.prizes.push(new Prize(value));
  }.bind(this));

  var shuffledPrizes = shuffle(this.prizeValues);
  for(var i = 0; i < this.boxesCount; i++) {
    this.boxes.push(new Box(i + 1, shuffledPrizes[i], this.onClicBox.bind(this)));
  }

  this.draw();
}

Game.prototype.onClicBox = function(box) {
  switch(this.state) {
    case 'init':
      this.ownBox = box;
      this.removeBox(box);
      this.boxContainer.append($('<p></p>').text('Caja elegida: ' + this.ownBox.id));
      
      this.state = 'step1';
      this.selectedBoxesCount = 6;
      break;
    case 'step1':

      this.removeBox(box);
      this.selectPrize(box.value);
      
      this.boxContainer.append($('<p></p>').text('Step1 - Caja elegida: ' + box.id + ' - Prize: ' + box.value));
      this.selectedBoxesCount--;
      if (this.selectedBoxesCount === 0) {
        this.state = 'step2';
        this.selectedBoxesCount = 5;
      }
      break;
    case 'step2':

      this.removeBox(box);
      this.selectPrize(box.value);
      
      this.boxContainer.append($('<p></p>').text('Step2 - Caja elegida: ' + box.id + ' - Prize: ' + box.value));
      this.selectedBoxesCount--;
      if (this.selectedBoxesCount === 0) {
        this.state = 'step3';
        this.selectedBoxesCount = 4;
      }
      break;
    
  }

  this.draw();
}

Game.prototype.clean = function() {
  this.prizesContainer.empty();
}

Game.prototype.draw = function() {
  this.clean();

  this.prizes.forEach(function(prize) {
    this.prizesContainer.append(prize.html());
  }.bind(this));

  this.boxes.forEach(function(box) {
    this.prizesContainer.append(box.html());
  }.bind(this));
}

Game.prototype.removeBox = function(box) {
  this.boxes = this.boxes.filter(function(b) {
    return b.id !== box.id;
  });
}

Game.prototype.selectPrize = function(value) {
  var prize = this.prizes.find(function(prize) {
    return prize.value === value;
  });
  prize.isSelected = true;
}

function shuffle(array) {
  array = Object.create(array);
  var aux;
  var ri;
  for (var i = 0; i < array.length; i++) {
    aux = array[i];
    ri = Math.floor(Math.random() * array.length);
    array[i] = array[ri];
    array[ri] = aux;
  }
  return array;
}

