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

  this.bankerMultiplier = 0.8;

  this.boxes = [];
  this.prizes = [];

  this.ownBox;
  this.lastBoxes;

  this.selectedBoxesCount = 0;
  this.state = "init"; // init, => step1, step2, step3, step4
  this.chosenBox = $("#chosen-box");
  this.information = $("#information");
  this.banker = $("#bankerOffer");

  //Botones
  this.dealBtn = $(".deal-btn");
  this.noDealBtn = $(".no-deal-btn");
  this.playAgainBtn = $(".play-again-btn");
  this.openBoxesBtn = $(".open-boxes-btn");
  this.switchBtn = $(".switch-boxes-btn");
  this.bankerPhone = $(".banker-phone");

  this.bankerArray = ["Pelota", "Piruleta", "Cacahuete", "Birra"];
  this.bankerArrayShuffled = shuffle(this.bankerArray);
}

Game.prototype.start = function() {
  this.prizes = [];

  this.prizeValues.forEach(
    function(value) {
      this.prizes.push(new Prize(value));
    }.bind(this)
  );

  var shuffledPrizes = shuffle(this.prizeValues);
  for (var i = 0; i < this.boxesCount; i++) {
    this.boxes.push(
      new Box(i + 1, shuffledPrizes[i], this.onClicBox.bind(this))
    );
  }

  this.information.append($("<p></p>").text("Choose your lucky briefcase!"));

  this.draw();
};

Game.prototype.onClicBox = function(box) {
  switch (this.state) {
    case "init":
      this.ownBox = box;
      this.removeBox(box);
      this.information
        .empty()
        .append($("<p></p>").text("Round 1: Open 6 briefcases!!!"));
      this.chosenBox.append(
        $("<p></p>")
          .text("Your briefcase: " + this.ownBox.id)
          .addClass("box")
      );

      this.state = "step1";
      this.selectedBoxesCount = 6;
      break;

    case "step1":
      this.removeBox(box);
      this.selectPrize(box.value);

      this.information
        .empty()
        .append(
          $("<p></p>").text(
            "Step1 - Caja elegida: " + box.id + " - Prize: " + box.value
          )
        );
      this.selectedBoxesCount--;
      if (this.selectedBoxesCount === 0) {
        this.state = "step2";
        this.selectedBoxesCount = 5;
        var lastsBoxes = this.boxes.map(function(box) {
          return box.value;
        });
        this.banker
          .empty()
          .append("<p></p>")
          .text("Banker's offer: " + this.bankerOffer(lastsBoxes) + " €");

        // this.banker
        //   .empty()
        //   .append("<p></p>")
        //   .text("Banker's offer: " + this.shuffleBankerOffer(this.bankerArray));

        this.playerOptions();
      }
      break;

    case "step2":
      this.removeBox(box);
      this.selectPrize(box.value);

      this.information.empty().append(
        $("<p></p>")
          .empty()
          .text("Step2 - Caja elegida: " + box.id + " - Prize: " + box.value)
      );

      this.selectedBoxesCount--;
      if (this.selectedBoxesCount === 0) {
        this.state = "step3";
        this.selectedBoxesCount = 4;

        var lastsBoxes = this.boxes.map(function(box) {
          return box.value;
        });

        this.banker
          .empty()
          .append("<p></p>")
          .text("Banker's offer: " + this.bankerOffer(lastsBoxes) + " €");

        this.playerOptions();
      }
      break;

    case "step3":
      this.removeBox(box);
      this.selectPrize(box.value);

      this.information.empty().append(
        $("<p></p>")
          .empty()
          .text("Step3 - Caja elegida: " + box.id + " - Prize: " + box.value)
      );
      this.selectedBoxesCount--;
      if (this.selectedBoxesCount === 0) {
        this.state = "step4";
        this.selectedBoxesCount = 3;

        var lastsBoxes = this.boxes.map(function(box) {
          return box.value;
        });
        this.banker
          .empty()
          .append("<p></p>")
          .text("Banker's offer: " + this.bankerOffer(lastsBoxes) + " €");

        this.playerOptions();
      }
      break;

    case "step4":
      this.removeBox(box);
      this.selectPrize(box.value);

      this.information.empty().append(
        $("<p></p>")
          .empty()
          .text("Step4 - Caja elegida: " + box.id + " - Prize: " + box.value)
      );
      this.selectedBoxesCount--;
      if (this.selectedBoxesCount === 0) {
        this.state = "step5";
        this.selectedBoxesCount = 2;

        var lastsBoxes = this.boxes.map(function(box) {
          return box.value;
        });
        this.banker
          .empty()
          .append("<p></p>")
          .text("Banker's offer: " + this.bankerOffer(lastsBoxes) + " €");

        this.playerOptions();
      }
      break;

    case "step5":
      this.removeBox(box);
      this.selectPrize(box.value);

      this.information.empty().append(
        $("<p></p>")
          .empty()
          .text("Step5 - Caja elegida: " + box.id + " - Prize: " + box.value)
      );

      this.selectedBoxesCount--;
      if (this.selectedBoxesCount === 0) {
        this.state = "step6";
        this.selectedBoxesCount = 1;

        var lastsBoxes = this.boxes.map(function(box) {
          return box.value;
        });
        this.banker
          .empty()
          .append("<p></p>")
          .text("Banker's offer: " + this.bankerOffer(lastsBoxes) + " €");

        this.playerOptions();
      }

      break;

    case "step6":
      this.removeBox(box);
      this.selectPrize(box.value);

      this.information.empty().append(
        $("<p></p>")
          .empty()
          .text("Step6 - Caja elegida: " + box.id + " - Prize: " + box.value)
      );
      this.selectedBoxesCount--;
      if (this.selectedBoxesCount === 0) {
        this.state = "step7";
        this.selectedBoxesCount = 1;

        var lastsBoxes = this.boxes.map(function(box) {
          return box.value;
        });
        this.banker
          .empty()
          .append("<p></p>")
          .text("Banker's offer: " + this.bankerOffer(lastsBoxes) + " €");

        this.playerOptions();
      }
      break;

    case "step7":
      this.removeBox(box);
      this.selectPrize(box.value);

      this.information.empty().append(
        $("<p></p>")
          .empty()
          .text("Step7 - Caja elegida: " + box.id + " - Prize: " + box.value)
      );
      this.selectedBoxesCount--;
      if (this.selectedBoxesCount === 0) {
        this.state = "step8";
        this.selectedBoxesCount = 1;

        var lastsBoxes = this.boxes.map(function(box) {
          return box.value;
        });
        this.banker
          .empty()
          .append("<p></p>")
          .text("Banker's offer: " + this.bankerOffer(lastsBoxes) + " €");

        this.playerOptions();
      }
      break;

    case "step8":
      this.removeBox(box);
      this.selectPrize(box.value);

      this.information.empty().append(
        $("<p></p>")
          .empty()
          .text("Step8 - Caja elegida: " + box.id + " - Prize: " + box.value)
      );
      this.selectedBoxesCount--;
      if (this.selectedBoxesCount === 0) {
        this.state = "step9";
        this.selectedBoxesCount = 1;

        var lastsBoxes = this.boxes.map(function(box) {
          return box.value;
        });
        this.banker
          .empty()
          .append("<p></p>")
          .text("Banker's offer: " + this.bankerOffer(lastsBoxes) + " €");

        this.playerOptions();
      }
      break;

    case "step9":
      this.removeBox(box);
      this.selectPrize(box.value);

      this.information.empty().append(
        $("<p></p>")
          .empty()
          .text("Step9 - Caja elegida: " + box.id + " - Prize: " + box.value)
      );
      this.selectedBoxesCount--;
      if (this.selectedBoxesCount === 0) {
        this.state = "step10";
        this.selectedBoxesCount = 1;

        var lastsBoxes = this.boxes.map(function(box) {
          return box.value;
        });
        this.banker
          .empty()
          .append("<p></p>")
          .text("Banker's offer: " + this.bankerOffer(lastsBoxes) + " €");

        this.playerOptions();
      }

      break;

    case "step10":


        var lastBox = this.boxes.map(function(array) {
          return array.id;
        });
        console.log(lastBox);
      break;
  }

  this.draw();
};

Game.prototype.clean = function() {
  this.prizesContainer.empty();
  this.boxContainer.empty();
};

Game.prototype.draw = function() {
  this.clean();

  this.prizes.forEach(
    function(prize) {
      this.prizesContainer.append(prize.html());
    }.bind(this)
  );

  this.boxes.forEach(
    function(box) {
      this.boxContainer.append(box.html());
    }.bind(this)
  );
};

//Función que borra la caja seleccionada
Game.prototype.removeBox = function(box) {
  this.boxes = this.boxes.filter(function(b) {
    return b.id !== box.id;
  });
};

//Función que compara los premios
Game.prototype.selectPrize = function(value) {
  var prize = this.prizes.find(function(prize) {
    return prize.value === value;
  });
  prize.isSelected = true;
};

//Función oferta banquero
Game.prototype.bankerOffer = function(array) {
  var sumMoney = 0;

  for (var i = 0; i < array.length; i++) {
    sumMoney += array[i];
  }
  var averageOnGameMoney = sumMoney / array.length;
  var bankerOfferAmount = Math.floor(averageOnGameMoney * this.bankerMultiplier);

  return bankerOfferAmount;
};

//Función que nos devuelve un array de premios no seleccionados
Game.prototype.noSelectedBox = function() {
  this.boxes.map(function(box) {
    return box.value;
  });
};

//Función pregunta banquero
Game.prototype.bankerQuestion = function() {
  this.dealBtn.show();
  this.noDealBtn.show();
  this.boxContainer.hide();
};

//Función oferta banquero
Game.prototype.noDealAnswer = function() {
  this.noDealBtn.click(
    function() {
      this.banker.empty();
      this.information
        .empty()
        .append(
          $("<p></p>").text(
            "Nice! Good choice or not... next round OPEN " +
              this.selectedBoxesCount +
              " BRIEFCASES!"
          )
        );
      this.boxContainer.show();
      this.dealBtn.hide();
      this.noDealBtn.hide();
    }.bind(this)
  );
};

//Función Deal
Game.prototype.dealAnswer = function() {
  this.dealBtn.click(
    function() {
      this.information.empty(); // Añadir texto
      this.banker.empty();
      this.playAgainBtn.show();
      this.chosenBox.hide();
      this.dealBtn.hide();
      this.noDealBtn.hide();
      this.prizesContainer.hide();
      this.boxContainer.hide();
    }.bind(this)
  );
};

//Función play again
Game.prototype.playAgain = function() {
  this.playAgainBtn.click(function() {
    location.reload();
  });
};

//Función que muestra las opciones del jugador a la llamada del banquero
Game.prototype.playerOptions = function() {
  this.bankerQuestion();
  this.noDealAnswer();
  this.dealAnswer();
  this.playAgain();
};

Game.prototype.switchBoxes = function() {};

Game.prototype.shuffleBankerOffer = function(array) {
  var numberPrizes = array.length;
  numberPrizes = Math.floor(Math.random() * array.length);

  return array[numberPrizes];
};

//Función shuffle
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
