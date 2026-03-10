class Order {

    orderNumber: number
    dish: string
    price: number
    ready: boolean = false

    constructor(orderNumber:number,dish:string,price:number){

        this.orderNumber = orderNumber
        this.dish = dish
        this.price = price

    }

}

class Restaurant{

    kitchen: Order[] = []
    cashier: Order[] = []
    history: Order[] = []

    counter:number = 1

    createOrder(dish:string,price:number){

        const order = new Order(this.counter++,dish,price)

        this.kitchen.push(order)

        showMessage("Sending order to kitchen...")

        setTimeout(()=>{

            order.ready = true
            render()

        },5000)

    }

    serveOrder(index:number){

        const order = this.kitchen.splice(index,1)[0]

        this.cashier.push(order)

    }

    payOrder(index:number){

        const order = this.cashier.splice(index,1)[0]

        this.history.push(order)

    }

}

const restaurant = new Restaurant()

function showMessage(text:string){

    const msg = document.getElementById("message")!

    msg.innerText = text

    setTimeout(()=>{
        msg.innerText = ""
    },3000)

}

function createOrder(){

    const dish = (document.getElementById("dish") as HTMLInputElement).value
    const price = Number((document.getElementById("price") as HTMLInputElement).value)

    if(!dish || !price){

        showMessage("Complete the order information")
        return

    }

    restaurant.createOrder(dish,price)

    render()

}

function serveOrder(index:number){

    restaurant.serveOrder(index)

    render()

}

function payOrder(index:number){

    restaurant.payOrder(index)

    render()

}

function render(){

    const kitchenDiv = document.getElementById("kitchen")!
    const cashierDiv = document.getElementById("cashier")!
    const historyDiv = document.getElementById("history")!

    kitchenDiv.innerHTML=""
    cashierDiv.innerHTML=""
    historyDiv.innerHTML=""

    restaurant.kitchen.forEach((o,i)=>{

        kitchenDiv.innerHTML += `
        <div class="card">
        Order #${o.orderNumber}<br>
        ${o.dish}<br>
        ${o.ready ? "✔ Ready" : "Preparing..."}<br>
        ${o.ready ? `<button onclick="serveOrder(${i})">Serve</button>` : ""}
        </div>
        `

    })

    restaurant.cashier.forEach((o,i)=>{

        cashierDiv.innerHTML += `
        <div class="card">
        Order #${o.orderNumber}<br>
        ${o.dish}<br>
        $${o.price}<br>
        <button onclick="payOrder(${i})">Pay</button>
        </div>
        `

    })

    restaurant.history.forEach(o=>{

        historyDiv.innerHTML += `
        <div class="card history">
        ✔ Order #${o.orderNumber}<br>
        ${o.dish}<br>
        $${o.price}
        </div>
        `

    })

}