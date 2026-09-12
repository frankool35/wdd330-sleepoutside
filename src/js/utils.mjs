// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Get a URL parameter
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Render a list of items using a template function
export function renderListWithTemplate(
  templateFunction,
  parentElement,
  list,
  position = "beforeend",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map(templateFunction);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// retrieve data from localStorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });

  qs(selector).addEventListener("click", callback);
}

// Update the number displayed on the cart icon
export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart");
  const count = Array.isArray(cartItems) ? cartItems.length : 0;

  const cart = document.querySelector(".cart");

  if (!cart) return;

  let countElement = cart.querySelector(".cart-count");

  if (!countElement) {
    countElement = document.createElement("sup");
    countElement.classList.add("cart-count");
    cart.appendChild(countElement);
  }

  countElement.textContent = count;
}