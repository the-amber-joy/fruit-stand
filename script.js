var totalCash = 100
var apple = {name: 'apple', price: 5, averagePrice: 5, totalSpent: 0, totalPurchased: 0}
var orange = {name: 'orange', price: 5, averagePrice: 5, totalSpent: 0, totalPurchased: 0}
var banana = {name:'banana', price: 5, averagePrice: 5, totalSpent: 0, totalPurchased: 0}
var pear = {name:'pear', price: 5, averagePrice: 5, totalSpent: 0, totalPurchased: 0}
var fruitArray = [apple, orange, banana, pear];

function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}

function randomPrice(fruit) {
	var newPrice = randomNumber(fruit.price-0.50, fruit.price+0.50);
	//Any given fruit is not allowed to go below a cost of 50 cents, 
	//or above the cost of 9 dollars and 99 cents.

	//if goes below 50 cents, set it to 50 cents
	if (newPrice < 0.50) {
		newPrice=0.50;

	//if it goes higher than 9.99, set it to 9.99
	} else if (newPrice > 9.99) {
		newPrice=9.99;
	}
	fruit.price=newPrice;
	console.log("new price of " + fruit.name + ": " + fruit.price);
}

//Here's a function that reprices all the fruits

function repriceAllFruit() {
	for (var i = 0; i < fruitArray.length; i++) {
		randomPrice(fruitArray[i]);

	$("[id= " + fruitArray[i].name + "-current-price]" ).text(fruitArray[i].price);
};
};

//The above function needs to run every 15 seconds.
setInterval(repriceAllFruit,15000);


$(document).ready(function(){
	repriceAllFruit()
	$('button').on('click', function() {
		//Loop through our array of fruits
		for (var i=0; i<fruitArray.length;i++) {
				//Identify the purchased fruit in the fruit array
		    	if (fruitArray[i].name == $(this).parent().attr('id')) {
		    		if (totalCash>= fruitArray[i].price) {

			    		//subtract current price from total cash
				    	totalCash= (totalCash - fruitArray[i].price).toFixed(2);

				    	//Change Total Cash display

				    	
				    	$("h2").children().first().text(totalCash);
				    	
				    	//Increase total # of this kind of fruit purchased by one
						fruitArray[i].totalPurchased ++;
						
						//Increase total spent on this kind of fruit by current cost
						//of this kind of fruit
						fruitArray[i].totalSpent+= fruitArray[i].price;
						
						//adjust average cost of this kind of fruit
						fruitArray[i].averagePrice = Math.round(100*fruitArray[i].totalSpent/fruitArray[i].totalPurchased)/100;
						
						//Show the updated average cost of this kind of fruit 
						console.log(fruitArray[i].averagePrice);

						//Might be better to assign fruit specific ids to button divs 
						//and to average price divs.  
						//
						$("[id= " + fruitArray[i].name + "-avg-price]" ).text(fruitArray[i].averagePrice);

						//Show the increased total number of this kind of fruit bought
						$(this).parent().children().last().children().first().text(fruitArray[i].totalPurchased);
					} else  {alert("you broke, fool");
				};			
	} 
	}

	});
});
