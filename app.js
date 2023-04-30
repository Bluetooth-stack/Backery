const container = document.querySelector('.container');
const emptyTxt = document.querySelector('.empty');
const button = document.querySelector('#buy');
const listContainer = document.querySelector('.item-list');
const totalContainer = document.querySelector('.total');
const totalSpan = document.querySelector('.total>span');

let total = 0;


function createList(name, price){
    const div = document.createElement('div');
    div.className = "item";
    const p = document.createElement('p');
    p.innerText = `${name} - ${price}`;
    div.appendChild(p);
    total += price
    listContainer.appendChild(div);

    totalSpan.innerText = total.toFixed(2) +"$";

    if(listContainer.children.length == 0){
        emptyTxt.getElementsByClassName.display = "block";
        total = 0;
    }
    else{
        emptyTxt.style.display = "none";
        totalContainer.style.display = "inline-block";
        button.disabled = false;
        button.style.cursor = "pointer";
    }
    button.addEventListener('click', ()=>{
        button.disabled = true;
        listContainer.innerHTML = '';
        totalSpan.innerHTML=''
        alert(`Paid ${total} $, thankyou for eating with us today!`);
        total = 0;
        orderPrep();
    })
}

function createCard(object){
    const div1 = document.createElement('div');
    div1.className = 'card';
    const img = document.createElement('img');
    img.src = `${object.imgSrc}`;
    const div2 = document.createElement('div');
    div2.className = 'text';
    const name = document.createElement('span');
    name.innerText = `${object.name}`;
    const price = document.createElement('span');
    price.innerText = `${object.price} $`;
    const addBtn = document.createElement('button');
    addBtn.innerText = 'Add to Cart';
    addBtn.className = 'addBtn';

    div2.appendChild(name);
    div2.appendChild(price);
    div1.appendChild(img);
    div1.appendChild(div2);
    div1.appendChild(addBtn);
    
    container.appendChild(div1);

    addBtn.addEventListener('click', ()=>{
        // console.log(object.name, object.price);
        createList(object.name, object.price)
    })
}



(async function getMenu(){
    const url = 'https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json';
    let responce = await fetch(url);
    let data = await responce.json();
    // console.log(data[0]);
    data.forEach(obj => {
        createCard(obj);
    });
    // TakeOrder();
    let order = new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({order1: "Cheeseburger", order2: "Pizza", order3: "Grilled Cheese Sandwich"})
        },2500)
    });
    order.then(TakeOrder);
}())

function TakeOrder(val){
    console.log(val);
    let prepare = new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({order_status:true, paid:false})
        },1500)
    });
    prepare.then(orderPrep);
}


function orderPrep(val){
    console.log(val);
    let pay = new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({order_status:true, paid:true})
        },1000)
    });
    pay.then(payOrder);
}

function payOrder(val){
    console.log(val);
    if(val.paid==true){
       console.log("Payment successful");
    }
}

// function thankyouFnc(){
//     alert(`Paid ${total}, thankyou for eating with us today!`);
// }
