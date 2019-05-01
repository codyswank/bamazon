var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require("cli-table");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err){
    if(err)throw err;
    console.log("connected as id" + connection.threadId)
});

function displayProducts(){
    var query = "Select * FROM products";
    connection.query(query, function(err, res){
        if(err) throw err;
        var displaytable = new table ({
            head: ["Item ID", "Products Name", "Catagory", "Price", "Quantity"],
            colWidths: [10,25,25,10,14]
        });
        for (var i=0; i < res.length; i++){
            displaytable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(displaytable.toString());
        purchasePrompt();
        });
}

function purchasePrompt(){
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Enter item ID to purchase",
            filter: Number
        },
        {
            name: "quantity",
            type: "input",
            message: "How many items do you want to purchase?",
            filter:Number
        },
    ]).then(function(answers){
        var quantityRequested = answers.quantity;
        var IDrequested = answers.ID;
        purchaseOrder (IDrequested, quantityRequested);
    });
};

function purchaseOrder(ID, amountNeeded){
    connection.query("SELECT * FROM products WHERE item_id = " + ID, function(err,res){
        if(err){console.log(err)};
        if(amountNeeded <= res[0].stock_quantity){
            var totalCost = res[0].price * amountNeeded;
            console.log("You orders in stock!");
            console.log("Your cost for " + amountNeeded + " " +res[0].product_name+ " is " + totalCost);

            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amountNeeded + "WHERE item_id = " + ID);
		} else{
			console.log("Insufficient quantity " + res[0].product_name + "to complete your order.");
		};
		displayProducts();
	});
};

displayProducts(); 
        