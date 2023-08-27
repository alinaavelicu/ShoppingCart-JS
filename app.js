const productForm = document.getElementById("productForm");
const cart = document.querySelector("#cart");
const cartTotalElement = document.querySelector("#cartTotal");

const productNameInput = document.querySelector("#productName");
const productNameError = document.querySelector("#productNameError");

const productPriceInput = document.querySelector("#productPrice");
const productPriceError = document.querySelector("#productPriceError");

const productQuantityInput = document.querySelector("#productQuantity");

let cartTotal = 0;

function checkIfRequired(e, errorElement) {
  const value = e.target.value;
  if (!value) {
    productNameError.innerHTML = "Acest camp este obligatoriu";
  } else {
    productNameError.innerHTML = "";
  }
}

document.querySelector("#cancel").addEventListener("click", (e) => {
  productForm.reset();
});

productNameInput.addEventListener("input", (e) => {
  checkIfRequired(e, productNameError);
});

productPriceInput.addEventListener("input", (e) => {
  checkIfRequired(e, productPriceError);
});

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const productName = productNameInput.value;
  const productPrice = parseFloat(productPriceInput.value);
  const productQuantity = parseInt(productQuantityInput.value);

  if (!productName || isNaN(productPrice) || isNaN(productQuantity)) {
    return;
  }

  let total = productPrice * productQuantity;
  cartTotal += total;

  const cartItem = document.createElement("li");
  cartItem.classList.add("list-group-item");
  cartItem.innerHTML = `
  <div class="d-flex justify-content-between align-items-center">
    <div>
        <strong>${productName}</strong> - ${productPrice.toFixed(2)}RON
        <span>Cantitate: ${productQuantity}<span>
        <button class="btn btn-danger btn-sm ml-2 delete-btn" >Sterge produs</button>
    </div>
    <div>
        <span>Total: RON${total.toFixed(2)}</span>
    </div>
</div>
    `;

  const deletetButton = cartItem.querySelector(".delete-btn");
  deletetButton.addEventListener("click", () => {
    const itemTotal = parseFloat(total.toFixed(2));
    cartTotal -= itemTotal;
    cartTotalElement.textContent = cartTotal.toFixed(2);
    cart.removeChild(cartItem);
  });

  cart.appendChild(cartItem);

  cartTotalElement.textContent = cartTotal.toFixed(2);

  productForm.reset();
});
