var gameover = false;
var totalCash = 100;
var apple = {
  name: "apple",
  price: 5,
  averagePrice: 5,
  totalSpent: 0,
  totalPurchased: 0,
};
var orange = {
  name: "orange",
  price: 5,
  averagePrice: 5,
  totalSpent: 0,
  totalPurchased: 0,
};
var banana = {
  name: "banana",
  price: 5,
  averagePrice: 5,
  totalSpent: 0,
  totalPurchased: 0,
};
var pear = {
  name: "pear",
  price: 5,
  averagePrice: 5,
  totalSpent: 0,
  totalPurchased: 0,
};
var fruitArray = [apple, orange, banana, pear];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}

function randomPrice(fruit) {
  // get number of cents to add or remove
  const fluctuation = randomNumber(1, 50);

  // convert currenet price to cents and add or remove flux
  var newPriceInCents = randomNumber(
    fruit.price * 100 - fluctuation,
    fruit.price * 100 + fluctuation
  );

  // convert it back to dollars
  var newPrice = newPriceInCents / 100;
  //Any given fruit is not allowed to go below a cost of 50 cents,
  //or above the cost of 9 dollars and 99 cents.

  //if goes below 50 cents, set it to 50 cents
  if (newPrice < 0.5) {
    newPrice = 0.5;
  } else if (newPrice > 9.99) {
    newPrice = 9.99;
  }
  fruit.price = newPrice;

  console.log(fruit.name, "is now", fruit.price);
}

function repriceAllFruit() {
  if (gameover) return;

  for (var i = 0; i < fruitArray.length; i++) {
    randomPrice(fruitArray[i]);

    $("[id= " + fruitArray[i].name + "-current-price]").text(
      fruitArray[i].price
    );
  }
}

function sellFruit(howMany, thisFruit) {
  $el = "#" + thisFruit.name;

  for (var i = 0; i < howMany; i++) {
    totalCash = Number(totalCash) + Number(thisFruit.price);
    $("#cash").text(totalCash.toFixed(2));
    thisFruit.totalPurchased--;
    $(`${$el}-counter`).text(thisFruit.totalPurchased);
  }
}

function buyFruit(thisFruit) {
  console.log("buying", thisFruit.name, "for", thisFruit.price);

  if (totalCash >= thisFruit.price) {
    //subtract current price from total cash
    totalCash = (totalCash - thisFruit.price).toFixed(2);

    //Change Total Cash display
    $("#cash").text(totalCash);

    //Increase total # of this kind of fruit purchased by one
    thisFruit.totalPurchased++;

    //Increase total spent on this kind of fruit by current cost
    //of this kind of fruit
    thisFruit.totalSpent += thisFruit.price;

    //adjust average cost of this kind of fruit
    thisFruit.averagePrice =
      Math.round((100 * thisFruit.totalSpent) / thisFruit.totalPurchased) / 100;

    //Might be better to assign fruit specific ids to button divs
    //and to average price divs.
    //
    $(`#${thisFruit.name}-avg-price`).text(thisFruit.averagePrice);

    //Show the increased total number of this kind of fruit bought
    $(`#${thisFruit.name}-counter`).text(thisFruit.totalPurchased);
  } else {
    alert("you broke, fool");
  }
}

function sellAllFruits() {
  if (gameover) return;

  for (var i = 0; i < fruitArray.length; i++) {
    var thisFruit = fruitArray[i];
    sellFruit(thisFruit.totalPurchased, thisFruit);
  }
  gameover = true;
}

$(document).ready(function () {
  // give all fruits an initial price, and change it every 15 seconds
  repriceAllFruit();

  setInterval(repriceAllFruit, 15000);

  // end game after 5 minutes and sell all fruits in inventory
  setInterval(sellAllFruits, 5 * 60 * 1000);

  $(".buy-button").on("click", function () {
    //Loop through our array of fruits
    for (var i = 0; i < fruitArray.length; i++) {
      //Identify the purchased fruit in the fruit array
      if (fruitArray[i].name == $(this).parent().attr("id")) {
        // var thisFruit = fruitArray[i];
        buyFruit(fruitArray[i]);
      }
    }
  });

  $(".sell-button").on("click", function () {
    //Loop through our array of fruits
    for (var i = 0; i < fruitArray.length; i++) {
      //Identify the purchased fruit in the fruit array
      if (fruitArray[i].name == $(this).parent().attr("id")) {
        // var thisFruit = fruitArray[i];
        sellFruit(1, fruitArray[i]);
      }
    }
  });
});
