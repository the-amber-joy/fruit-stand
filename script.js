var startButton;
var isPaused = false;
var highScore = localStorage.getItem("highScore");
var gameover = false;
var totalCash = 100;
var defaultValues = {
  price: 0,
  averagePrice: 0,
  totalSpent: 0,
  totalPurchased: 0,
  inventory: 0,
  totalSold: 0,
  totalEarned: 0,
};
var apple = {
  name: "apple",
  ...defaultValues,
};
var orange = {
  name: "orange",
  ...defaultValues,
};
var banana = {
  name: "banana",
  ...defaultValues,
};
var pear = {
  name: "pear",
  ...defaultValues,
};
var fruitArray = [apple, orange, banana, pear];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}

function randomPrice(fruit) {
  // get number of cents to add or remove
  const fluctuationInCents = randomNumber(1, 50);

  var newPrice =
    randomNumber(
      fruit.price * 100 - fluctuationInCents,
      fruit.price * 100 + fluctuationInCents
    ) / 100;

  //Any given fruit is not allowed to go below a cost of 50 cents,
  //or above the cost of 9 dollars and 99 cents.

  //if goes below 50 cents, set it to 50 cents
  if (newPrice < 0.5) {
    newPrice = 0.5;
  } else if (newPrice > 9.99) {
    newPrice = 9.99;
  }

  if (newPrice === fruit.price) {
    randomPrice(fruit);
  } else {
    fruit.price = newPrice;
  }
}

function setInitialPrices() {
  for (var i = 0; i < fruitArray.length; i++) {
    var thisFruit = fruitArray[i];
    // pick initial price between $0.50 and $9.99
    var initialPrice = Math.floor(Math.random() * (999 - 50 + 1) + 50) / 100;

    thisFruit.price = initialPrice;
    $("[id= " + thisFruit.name + "-current-price]").text(thisFruit.price);
  }
}

function sellFruit(howMany, thisFruit) {
  $el = "#" + thisFruit.name;

  if (thisFruit.inventory > 0) {
    for (var i = 0; i < howMany; i++) {
      totalCash = Number(totalCash) + Number(thisFruit.price);
      $("#total-cash").text(totalCash.toFixed(2));
      thisFruit.inventory--;
      $(`${$el}-counter`).text(thisFruit.inventory);

      thisFruit.totalSold++;
      thisFruit.totalEarned += thisFruit.price;
    }
  }
}

function buyFruit(thisFruit) {
  if (totalCash >= thisFruit.price) {
    //subtract current price from total cash
    totalCash = (totalCash - thisFruit.price).toFixed(2);

    //Change Total Cash display
    $("#total-cash").text(totalCash);

    //Increase total # of this kind of fruit purchased by one
    thisFruit.inventory++;
    thisFruit.totalPurchased++;

    //Increase total spent on this kind of fruit by current cost
    //of this kind of fruit
    thisFruit.totalSpent += thisFruit.price;

    //adjust average cost of this kind of fruit
    thisFruit.averagePrice = thisFruit.totalSpent / thisFruit.totalPurchased;

    //Might be better to assign fruit specific ids to button divs
    //and to average price divs.
    //
    $(`#${thisFruit.name}-avg-price`).text(thisFruit.averagePrice.toFixed(2));

    //Show the increased total number of this kind of fruit bought
    $(`#${thisFruit.name}-counter`).text(thisFruit.inventory);
  } else {
    alert("you broke, fool");
  }
}

function sellAllFruits() {
  for (var i = 0; i < fruitArray.length; i++) {
    var thisFruit = fruitArray[i];
    sellFruit(thisFruit.inventory, thisFruit);
  }

  highScore =
    totalCash > highScore
      ? parseFloat(totalCash).toFixed(2)
      : parseFloat(highScore).toFixed(2);
  localStorage.setItem("highScore", highScore);
  $("#high-score").text(highScore);

  $(":button").prop("disabled", true);
}

function resetGame() {
  var apple = {
    name: "apple",
    ...defaultValues,
  };
  var orange = {
    name: "orange",
    ...defaultValues,
  };
  var banana = {
    name: "banana",
    ...defaultValues,
  };
  var pear = {
    name: "pear",
    ...defaultValues,
  };
  fruitArray = [apple, orange, banana, pear];
  totalCash = 100;
  $("#total-cash").text(totalCash.toFixed(2));

  for (var i = 0; i < fruitArray.length; i++) {
    var thisFruit = fruitArray[i];

    $(`#${thisFruit.name}-counter`).text("");
    $(`#${thisFruit.name}-avg-price`).text("");
  }
}

function startGame() {
  resetGame();

  startButton = $("#start-button").detach();

  $(":button").prop("disabled", false);

  // give all fruits an initial price, and change it every 15 seconds
  setInitialPrices();

  // start the game timer
  $("#start-button").remove();
  countdownTimer();

  // Add a pause button
  // var pauseButton = $('<div><button id="pause-button">PAUSE</button></div>');
  // pauseButton.insertAfter($(".countdown"))
  // $(".stuff").prepend(pauseButton);

  // change prices every 15 seconds
  var repriceInterval = setInterval(function () {
    if (gameover) clearInterval(repriceInterval);
    for (var i = 0; i < fruitArray.length; i++) {
      var thisFruit = fruitArray[i];
      randomPrice(thisFruit);

      $("[id= " + thisFruit.name + "-current-price]").text(
        thisFruit.price.toFixed(2)
      );
    }
  }, 15000);
}

function countdownTimer() {
  var timer1 = "5:00";
  var timerInterval = setInterval(function () {
    if (!isPaused) {
      var timer = timer1.split(":");
      //by parsing integer, I avoid all extra string processing
      var minutes = parseInt(timer[0], 10);
      var seconds = parseInt(timer[1], 10);
      --seconds;
      minutes = seconds < 0 ? --minutes : minutes;
      if (minutes < 0) {
        gameover = true;
        clearInterval(timerInterval);
        // end game after 5 minutes and sell all fruits in inventory
        sellAllFruits();
        $(".countdown").text("");
        $(".countdown").append(startButton);
      } else {
        seconds = seconds < 0 ? 59 : seconds;
        seconds = seconds.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
        });
        $(".countdown").text(minutes + ":" + seconds);
        timer1 = minutes + ":" + seconds;
      }
    }
  }, 1000);
}

$(document).ready(function () {
  $(".sell-button").prop("disabled", true);
  $(".buy-button").prop("disabled", true);

  highScore = highScore ? parseFloat(highScore).toFixed(2) : 0;

  $("#high-score").text(highScore);

  $("#start-button").on("click", function () {
    startGame();
  });

  // $("#pause-button").on("click", function (e) {
  //   console.log(e);
	// 	console.log("foo")
  //   isPaused = true;
  // });

  $(".buy-button").on("click", function () {
    //Loop through our array of fruits
    for (var i = 0; i < fruitArray.length; i++) {
      var thisFruit = fruitArray[i];
      //Identify the purchased fruit in the fruit array
      if (thisFruit.name == $(this).parent().attr("id")) {
        buyFruit(thisFruit);
      }
    }
  });

  $(".sell-button").on("click", function () {
    //Loop through our array of fruits
    for (var i = 0; i < fruitArray.length; i++) {
      var thisFruit = fruitArray[i];

      //Identify the purchased fruit in the fruit array
      if (thisFruit.name == $(this).parent().attr("id")) {
        sellFruit(1, thisFruit);
      }
    }
  });
});
