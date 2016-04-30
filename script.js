setInterval(repriceAllFruit,15000);

var totalCash = 100;
var apple = {name: 'apple', price:0.69, averagePrice: 0.69, totalSpent: 0, totalPurchased:0};
var orange = {name: 'orange', price: 1.00, averagePrice:1.00, totalSpent:0, totalPurchased:0};
var banana = {name:'banana', price:0.50, averagePrice:0.50, totalSpent:0, totalPurchased:0};
var pear = {name:'pear', price:0.75, averagePrice:0.75, totalSpent:0, totalPurchased:0};
var fruitArray = [orange, apple, banana, pear];



$(document).ready(function(){
	$('.fruit').on('click', '.buybutton', clickBuy);
	$('.fruit').on('click', '.button', clickSell);
});
	

function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}

function randomPrice(fruit) {	
	if (newPrice < 0.50) {
		newPrice=0.50;
	} else if (newPrice > 9.99) {
		newPrice=9.99;
	}
	fruit.price=newPrice;

	var newPrice = randomNumber (fruit.price-0.50, fruit.price+0.50);
}


function clickBuy() {
	for (var i=0; i<fruitArray.length;i++) {
    	if (fruitArray[i].name == $(this).parent().attr('id')) {
    		if (totalCash >= fruitArray[i].price) {
		    	totalCash = (totalCash - fruitArray[i].price).toFixed(2);
		    	$("h2").children().first().text(totalCash);
				fruitArray[i].totalPurchased ++;
				fruitArray[i].totalSpent += fruitArray[i].price;
				fruitArray[i].averagePrice = Math.round(100*fruitArray[i].totalSpent/fruitArray[i].totalPurchased)/100;
				$("#" + fruitArray[i].name).find(".avg-price").text(fruitArray[i].averagePrice);
				$("#" + fruitArray[i].name).find(".current-price").text(fruitArray[i].price);
				$("#" + fruitArray[i].name).find(".fruit-counter").text(fruitArray[i].totalPurchased);
			} else  {
				alert("you broke, fool");
			}	
		}
	}
}


function clickSell() {
	for (var i=0; i<fruitArray.length;i++) {
		$el = "#" + fruitArray[i].name;

		if (fruitArray[i].name == $(this).parent().attr('id')) {
		    if (fruitArray[i].name == $(this).parent().attr('id') && "#" + fruitArray[i].name.find(".fruit-counter").text(fruitArray[i].totalPurchased) > 0) {
				totalCash = Number(totalCash) + Number(fruitArray[i].price);  	
				$("h2").children().first().text(totalCash);
			    fruitArray[i].totalPurchased--;
			    $($el).find(".fruit-counter").text(fruitArray[i].totalPurchased);
			}
		}
	}
}

function repriceAllFruit() {
	for (var i = 0; i<fruitArray.length; i++) {
		randomPrice(fruitArray[i]);
		$("[id= " + fruitArray[i].name ).children().first().next().children().first().text(fruitArray[i].price);
	}
}








