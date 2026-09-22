import CheckoutProcess from "../js/CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", ".checkout");

checkout.init();

const zip = document.querySelector("#zip");

zip.addEventListener("blur", () => {
    checkout.calculateOrderTotal();
});

const form = document.querySelector("#checkout-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const response = await checkout.checkout(form);

        console.log("Order submitted:", response);

        if (response.message === "Order Placed") {
            alert(`Order placed successfully! Your order ID is ${response.orderId}.`);
            localStorage.removeItem("so-cart");
            window.location.href = "../index.html";
        }
    } catch (error) {
        console.error("Checkout failed:", error);
        alert("Sorry, your order could not be placed. Please try again.");
    }
});