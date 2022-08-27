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

$(document).ready(function () {
  $(".fruit").on("click", ".buybutton", clickBuy);
  $(".fruit").on("click", ".button", clickSell);
});

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
	var newPrice = newPriceInCents/100
  //Any given fruit is not allowed to go below a cost of 50 cents,
  //or above the cost of 9 dollars and 99 cents.

  //if goes below 50 cents, set it to 50 cents
  if (newPrice < 0.5) {
    newPrice = 0.5;
  } else if (newPrice > 9.99) {
    newPrice = 9.99;
  }
  fruit.price = newPrice;

  console.log(fruit.name, fruit.price);
}

function repriceAllFruit() {
  for (var i = 0; i < fruitArray.length; i++) {
    randomPrice(fruitArray[i]);

    $("[id= " + fruitArray[i].name + "-current-price]").text(
      fruitArray[i].price
    );
  }
}

function clickSell() {
  for (var i = 0; i < fruitArray.length; i++) {
    $el = "#" + fruitArray[i].name;

    if (fruitArray[i].name == $(this).parent().attr("id")) {
      if (
        fruitArray[i].name == $(this).parent().attr("id") &&
        "#" +
          fruitArray[i].name
            .find(".fruit-counter")
            .text(fruitArray[i].totalPurchased) >
          0
      ) {
        totalCash = Number(totalCash) + Number(fruitArray[i].price);
        $("h2").children().first().text(totalCash);
        fruitArray[i].totalPurchased--;
        $($el).find(".fruit-counter").text(fruitArray[i].totalPurchased);
      }
    }
  }
}

function clickBuy() {
  $("button").on("click", function () {
    //Loop through our array of fruits
    for (var i = 0; i < fruitArray.length; i++) {
      //Identify the purchased fruit in the fruit array
      if (fruitArray[i].name == $(this).parent().attr("id")) {
        if (totalCash >= fruitArray[i].price) {
          //subtract current price from total cash
          totalCash = (totalCash - fruitArray[i].price).toFixed(2);

          //Change Total Cash display

          $("h2").children().first().text(totalCash);

          //Increase total # of this kind of fruit purchased by one
          fruitArray[i].totalPurchased++;

          //Increase total spent on this kind of fruit by current cost
          //of this kind of fruit
          fruitArray[i].totalSpent += fruitArray[i].price;

          //adjust average cost of this kind of fruit
          fruitArray[i].averagePrice =
            Math.round(
              (100 * fruitArray[i].totalSpent) / fruitArray[i].totalPurchased
            ) / 100;

          //Show the updated average cost of this kind of fruit
          console.log(fruitArray[i].averagePrice);

          //Might be better to assign fruit specific ids to button divs
          //and to average price divs.
          //
          $(this)
            .parent()
            .children()
            .last()
            .prev()
            .prev()
            .prev()
            .children()
            .first()
            .text(fruitArray[i].averagePrice);

          //Show the increased total number of this kind of fruit bought
          $(this)
            .parent()
            .children()
            .last()
            .children()
            .first()
            .text(fruitArray[i].totalPurchased);
        } else {
          alert("you broke, fool");
        }
      }
    }
  });
}

$(document).ready(function () {
  setInterval(repriceAllFruit, 15000);
  repriceAllFruit();
  $("button").on("click", function () {
    //Loop through our array of fruits
    for (var i = 0; i < fruitArray.length; i++) {
      //Identify the purchased fruit in the fruit array
      if (fruitArray[i].name == $(this).parent().attr("id")) {
        if (totalCash >= fruitArray[i].price) {
          //subtract current price from total cash
          totalCash = (totalCash - fruitArray[i].price).toFixed(2);

          //Change Total Cash display

          $("h2").children().first().text(totalCash);

          //Increase total # of this kind of fruit purchased by one
          fruitArray[i].totalPurchased++;

          //Increase total spent on this kind of fruit by current cost
          //of this kind of fruit
          fruitArray[i].totalSpent += fruitArray[i].price;

          //adjust average cost of this kind of fruit
          fruitArray[i].averagePrice =
            Math.round(
              (100 * fruitArray[i].totalSpent) / fruitArray[i].totalPurchased
            ) / 100;

          //Show the updated average cost of this kind of fruit
          console.log(fruitArray[i].averagePrice);

          //Might be better to assign fruit specific ids to button divs
          //and to average price divs.
          //
          $("[id= " + fruitArray[i].name + "-avg-price]").text(
            fruitArray[i].averagePrice
          );

          //Show the increased total number of this kind of fruit bought
          $(this)
            .parent()
            .children()
            .last()
            .children()
            .first()
            .text(fruitArray[i].totalPurchased);
        } else {
          alert("you broke, fool");
        }
      }
    }
  });
});
