var Order = /** @class */ (function () {
    function Order(orderNumber, dish, price) {
        this.ready = false;
        this.orderNumber = orderNumber;
        this.dish = dish;
        this.price = price;
    }
    return Order;
}());
var Restaurant = /** @class */ (function () {
    function Restaurant() {
        this.kitchen = [];
        this.cashier = [];
        this.history = [];
        this.counter = 1;
    }
    Restaurant.prototype.createOrder = function (dish, price) {
        var order = new Order(this.counter++, dish, price);
        this.kitchen.push(order);
        showMessage("Sending order to kitchen...");
        setTimeout(function () {
            order.ready = true;
            render();
        }, 5000);
    };
    Restaurant.prototype.serveOrder = function (index) {
        var order = this.kitchen.splice(index, 1)[0];
        this.cashier.push(order);
    };
    Restaurant.prototype.payOrder = function (index) {
        var order = this.cashier.splice(index, 1)[0];
        this.history.push(order);
    };
    return Restaurant;
}());
var restaurant = new Restaurant();
function showMessage(text) {
    var msg = document.getElementById("message");
    msg.innerText = text;
    setTimeout(function () {
        msg.innerText = "";
    }, 3000);
}
function createOrder() {
    var dish = document.getElementById("dish").value;
    var price = Number(document.getElementById("price").value);
    if (!dish || !price) {
        showMessage("Complete the order information");
        return;
    }
    restaurant.createOrder(dish, price);
    render();
}
function serveOrder(index) {
    restaurant.serveOrder(index);
    render();
}
function payOrder(index) {
    restaurant.payOrder(index);
    render();
}
function searchOrder() {
    var value = Number(document.getElementById("search").value);
    var result = restaurant.cashier.filter(function (o) { return o.orderNumber === value; })[0];
    var box = document.getElementById("searchResult");
    if (result) {
        box.innerHTML = "\n        <div class=\"card\">\n        Order #".concat(result.orderNumber, "<br>\n        ").concat(result.dish, "<br>\n        $").concat(result.price, "<br>\n        <button onclick=\"payOrder(").concat(restaurant.cashier.indexOf(result), ")\">Pay</button>\n        </div>\n        ");
    }
    else {
        box.innerText = "Order not found";
    }
}
function render() {
    var kitchenDiv = document.getElementById("kitchen");
    var cashierDiv = document.getElementById("cashier");
    var historyDiv = document.getElementById("history");
    kitchenDiv.innerHTML = "";
    cashierDiv.innerHTML = "";
    historyDiv.innerHTML = "";
    restaurant.kitchen.forEach(function (o, i) {
        kitchenDiv.innerHTML += "\n        <div class=\"card\">\n        Order #".concat(o.orderNumber, "<br>\n        ").concat(o.dish, "<br>\n        ").concat(o.ready ? "✔ Ready" : "Preparing...", "<br>\n        ").concat(o.ready ? "<button onclick=\"serveOrder(".concat(i, ")\">Serve</button>") : "", "\n        </div>\n        ");
    });
    restaurant.cashier.forEach(function (o, i) {
        cashierDiv.innerHTML += "\n        <div class=\"card\">\n        Order #".concat(o.orderNumber, "<br>\n        ").concat(o.dish, "<br>\n        $").concat(o.price, "<br>\n        <button onclick=\"payOrder(").concat(i, ")\">Pay</button>\n        </div>\n        ");
    });
    restaurant.history.forEach(function (o) {
        historyDiv.innerHTML += "\n        <div class=\"card history\">\n        \u2714 Order #".concat(o.orderNumber, "<br>\n        ").concat(o.dish, "<br>\n        $").concat(o.price, "\n        </div>\n        ");
    });
}
