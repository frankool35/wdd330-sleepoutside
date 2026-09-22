import CheckoutProcess from "../js/CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", ".checkout");

checkout.init();

const zip = document.querySelector("#zip");

zip.addEventListener("blur", () => {
    checkout.calculateOrderTotal();
});