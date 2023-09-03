
const totalPriceWithoutDiscount = document.getElementById("price-wod");
const discountAmount = document.getElementById("discount-amount");
const totalPriceWithDiscount = document.getElementById("total-wd");
const discountInput = document.getElementById("discount-input");


function modalButtonEnable(){
     const modalButton = document.getElementById("modalButton");
    if(parseFloat(totalPriceWithoutDiscount.innerText) > 0){
       
        modalButton.disabled = false;
    }
    else{
        modalButton.disabled = true;
    }
    
}

function quantityChanged(data){
    const quantity = data.parentNode.children[0];
    if(quantity.value == 0){
        quantity.value = 1;
    }
    updateTotal();
    const itemName = data.parentNode.parentNode.childNodes[1].childNodes[3].innerText
    for(let i = 0; i < localStorage.length; i++){
        // console.log(localStorage.getItem(localStorage.key(i)))
        const localStorageItem = JSON.parse(localStorage.getItem(localStorage.key(i)))
        if(localStorageItem.name === itemName){
            localStorageItem['quantity'] = quantity.value
            localStorage.setItem(itemName, JSON.stringify(localStorageItem))
            console.log(localStorageItem)
        }
    }



    // console.log(data.parentNode.parentNode.childNodes[1].childNodes[3].innerText)

    
}

let discount = false;

function discountEnable(){
const discountButton = document.getElementById("discount");

if (parseInt(totalPriceWithoutDiscount.innerText) >= 200) {
   
  discountButton.disabled = false;
  discountInput.disabled = false;
}else{
    
   discountButton.disabled = true; 
   discountInput.disabled = true;
   discountInput.value = "";
   discountAmount.innerText = "00";

}
}

function coupon(data){
    const couponCode = data.parentNode.childNodes[3].innerText;
    
    if (parseInt(totalPriceWithoutDiscount.innerText) >= 200) {
        discountInput.value = couponCode;}
    
    navigator.clipboard.writeText(couponCode);
}

function applyButton(){
   
   if(discountInput.value === 'SELL200'){
        discount = true;
        discountAmount.innerText = ((20/100)*parseFloat(totalPriceWithoutDiscount.innerText)).toFixed(2);
        updateTotal();
        discountInput.value = '';
       
   }
    
}



function removeButton(data){
    const itemName = data.parentNode.parentNode.childNodes[1].childNodes[3].innerText
    localStorage.removeItem(itemName)
    data.parentNode.parentNode.parentNode.remove();
    updateTotal();
}

const storedCart = () =>{
    let cart = {};
    const storedCart = localStorage.getItem("cart");
    
    if(storedCart){
        cart = JSON.parse(storedCart);
    }
    // console.log(cart)
    return cart;
}





const addLocalStore = (productImg, productName, productPrice) => {
    const cart = storedCart();
   
//    console.log(quantity)
   cart['name'] = productName;
   cart['image'] = productImg;
   cart['price'] = productPrice;
   //    console.log(cart)
   
   localStorage.setItem(productName, JSON.stringify(cart));
   
    
}






function itemClicked(data){
    // const itemList = document.getElementById("items-list");
    const productImg = data.children[0].childNodes[1].children[0].src;
    const productName = data.childNodes[3].childNodes[3].innerText
    const productPrice = data.childNodes[3].childNodes[5].innerText.split(' ')[0]
   updateCart(productImg, productName, productPrice);
   addLocalStore(productImg, productName, productPrice);
}

const updateCart = (productImg, productName, productPrice,quantity=1) => {
  const itemList = document.getElementById("items-list");
  const div = document.createElement("div");
  div.innerHTML = `<div class="flex justify-between items-center gap-3 w-80">
                            <div class="flex items-center gap-1">
    <div class="bg-gray-300 p-2 rounded-xl w-12 h-12"><img class="" src="${productImg}" alt="">
                            </div>
                            <p class="text-base w-10">${productName}</p>
</div>
                            <p class="text-base font-semibold w-10"><span class="price-item">${productPrice}</span> TK</p>
                            <div class="flex items-center gap-2">
                                <input onchange="quantityChanged(this)" value="${quantity||1}" type="number" min="1"
                                    class="input item-quantity input-bordered input-sm w-12 p-1" />
                                <button onclick="removeButton(this)"
                                    class="remove bg-red-500 rounded-full text-white hover:bg-red-600 p-1 px-2"><i
                                        class="fa-solid fa-xmark"></i></button>
                            </div>
                        </div>`;
  for (const list of itemList.children) {
    const itemInList = list.childNodes[0].children[0].children[1].innerText;
    const itemToBeAdded = div.childNodes[0].children[0].children[1].innerText;
    if (itemToBeAdded == itemInList) {
      return 0;
    } else {
      div.innerHTML = `<div class="flex justify-between items-center gap-3 w-80">
                            <div class="flex items-center gap-1">
    <div class="bg-gray-300 p-2 rounded-xl w-12 h-12"><img class="" src="${productImg}" alt="">
                            </div>
                            <p class="text-base w-10">${productName}</p>
</div>
                            <p class="text-base font-semibold w-10"><span class="price-item">${productPrice}</span> TK</p>
                            <div class="flex items-center gap-2">
                                <input onchange="quantityChanged(this)" value="${
                                  quantity || 1
                                }" type="number" min="1"
                                    class="input item-quantity input-bordered input-sm w-12 p-1" />
                                <button onclick="removeButton(this)"
                                    class="remove bg-red-500 rounded-full text-white hover:bg-red-600 p-1 px-2"><i
                                        class="fa-solid fa-xmark"></i></button>
                            </div>
                        </div>`;
    }
  }
  itemList.appendChild(div);
  updateTotal();
  
};


function updateTotal(){
    const itemList = document.getElementById("items-list");
    
    let price = 0;
    for(const list of itemList.children){
        const priceItem = list.children[0].children[1].children[0].innerText;
        const quantity = list.children[0].children[2].children[0].value;
       
        price = price + parseFloat(priceItem)*quantity
    }
    totalPriceWithoutDiscount.innerText = price.toFixed(2)
    totalPriceWithDiscount.innerText = (parseFloat(totalPriceWithoutDiscount.innerText-discountAmount.innerText)).toFixed(2);
   
    discountUpdate();
    discountEnable();
    modalButtonEnable();
     if(discountAmount.innerText === '00'){
        totalPriceWithDiscount.innerText = (parseFloat(totalPriceWithoutDiscount.innerText)).toFixed(2);
    }
}
function gohomeButton(){
    const itemList = document.getElementById("items-list");
    itemList.innerHTML = '';
    totalPriceWithoutDiscount.innerText = '00'
    totalPriceWithDiscount.innerText = '00'
    discountAmount.innerText = '00'
    updateTotal();
    localStorage.clear();
}
function discountUpdate(){
    if(parseFloat(discountAmount.innerText)>0){
             discountAmount.innerText = ((20/100)*parseFloat(totalPriceWithoutDiscount.innerText)).toFixed(2);
    }
    
}


const displayStoredCart = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const storedItem = localStorage.getItem(localStorage.key(i));
    const getItem = JSON.parse(storedItem);

    const name = getItem.name;
    const image = getItem.image;
    const price = getItem.price;
    const quantity = getItem.quantity;
    if(name){
     updateCart(image, name, price, quantity);
    }
    
    // console.log(getItem.name);
    // console.log(getItem.image);
    // console.log(getItem.price);
  }
//   const discountStatus = JSON.parse(localStorage.getItem(discount))
  
};

displayStoredCart();
