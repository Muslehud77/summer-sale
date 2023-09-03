const totalPriceWithoutDiscount = document.getElementById("price-wod");
const discountAmount = document.getElementById("discount-amount");
const totalPriceWithDiscount = document.getElementById("total-wd");
const discountInput = document.getElementById("discount-input");

function modalButtonEnable() {
  const modalButton = document.getElementById("modalButton");
  if (parseFloat(totalPriceWithoutDiscount.innerText) > 0) {
    modalButton.disabled = false;
  } else {
    modalButton.disabled = true;
  }
}

function quantityChanged(data) {
  const quantity = data.parentNode.children[0];
  if (quantity.value == 0) {
    quantity.value = 1;
  }
  updateTotal();
}

function discountEnable() {
  const discountButton = document.getElementById("discount");

  if (parseInt(totalPriceWithoutDiscount.innerText) >= 200) {
    discountButton.disabled = false;
    discountInput.disabled = false;
  } else {
    discountButton.disabled = true;
    discountInput.disabled = true;
    discountInput.value = "";
    discountAmount.innerText = "00";
  }
}

function coupon(data) {
  const couponCode = data.parentNode.childNodes[3].innerText;

  if (parseInt(totalPriceWithoutDiscount.innerText) >= 200) {
    discountInput.value = couponCode;
  }

  navigator.clipboard.writeText(couponCode);
}

function applyButton() {
  if (discountInput.value === "SELL200") {
    discountAmount.innerText = (
      (20 / 100) *
      parseFloat(totalPriceWithoutDiscount.innerText)
    ).toFixed(2);
    updateTotal();
    discountInput.value = "";
  }
}

function removeButton(data) {
  data.parentNode.parentNode.parentNode.remove();
  updateTotal();
}

function itemClicked(data) {
  const cartList = document.getElementById("items-list");
  const productImg = data.children[0].childNodes[1].children[0];
  const productName = data.childNodes[3].childNodes[3].innerText;
  const productPrice = data.childNodes[3].childNodes[5].innerText.split(" ")[0];
  const itemList = document.getElementById("items-list");
  const div = document.createElement("div");
  div.innerHTML = `<div class="flex justify-between items-center gap-3 w-80">
                            <div class="flex items-center gap-1">
    <div class="bg-gray-300 p-2 rounded-xl w-12 h-12"><img class="" src="${productImg.src}" alt="">
                            </div>
                            <p class="text-base w-10">${productName}</p>
</div>
                            <p class="text-base font-semibold w-10"><span class="price-item">${productPrice}</span> TK</p>
                            <div class="flex items-center gap-2">
                                <input onchange="quantityChanged(this)" value="1" type="number" min="1"
                                    class="input item-quantity input-bordered input-sm w-12 p-1" />
                                <button onclick="removeButton(this)"
                                    class="remove bg-red-500 rounded-full text-white hover:bg-red-600 p-1 px-2"><i
                                        class="fa-solid fa-xmark"></i></button>
                            </div>
                        </div>`;

  for (const list of cartList.children) {
    const itemInList = list.childNodes[0].children[0].children[1].innerText;
    const itemToBeAdded = div.childNodes[0].children[0].children[1].innerText;
    if (itemToBeAdded == itemInList) {
      return 0;
    } else {
      div.innerHTML = `<div class="flex justify-between items-center gap-3 w-80">
                            <div class="flex items-center gap-1">
    <div class="bg-gray-300 p-2 rounded-xl w-12 h-12"><img class="" src="${productImg.src}" alt="">
                            </div>
                            <p class="text-base w-10">${productName}</p>
</div>
                            <p class="text-base font-semibold w-10"><span class="price-item">${productPrice}</span> TK</p>
                            <div class="flex items-center gap-2">
                                <input onchange="quantityChanged(this)" value="1" type="number" min="1"
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
}

function updateTotal() {
  const cartList = document.getElementById("items-list");

  let price = 0;
  for (const list of cartList.children) {
    const priceItem = list.children[0].children[1].children[0].innerText;
    const quantity = list.children[0].children[2].children[0].value;

    price = price + parseFloat(priceItem) * quantity;
  }
  totalPriceWithoutDiscount.innerText = price.toFixed(2);
  totalPriceWithDiscount.innerText = parseFloat(
    totalPriceWithoutDiscount.innerText - discountAmount.innerText
  ).toFixed(2);

  discountUpdate();
  discountEnable();
  modalButtonEnable();
  if (discountAmount.innerText === "00") {
    totalPriceWithDiscount.innerText = parseFloat(
      totalPriceWithoutDiscount.innerText
    ).toFixed(2);
  }
}
function gohomeButton() {
  const itemList = document.getElementById("items-list");
  itemList.innerHTML = "";
  totalPriceWithoutDiscount.innerText = "00";
  totalPriceWithDiscount.innerText = "00";
  discountAmount.innerText = "00";
  updateTotal();
}
function discountUpdate() {
  if (parseFloat(discountAmount.innerText) > 0) {
    discountAmount.innerText = (
      (20 / 100) *
      parseFloat(totalPriceWithoutDiscount.innerText)
    ).toFixed(2);
  }
}
