import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSubTotal();
    }

    calculateItemSubTotal() {
        this.itemTotal = this.list.reduce(
            (total, item) => total + Number(item.FinalPrice),
            0
        );

        const itemCount = this.list.length;

        const subtotal = document.querySelector(
            `${this.outputSelector} #subtotal`
        );

        const itemCountElement = document.querySelector(
            `${this.outputSelector} #item-count`
        );

        subtotal.innerText = `$${this.itemTotal.toFixed(2)}`;
        itemCountElement.innerText = itemCount;
    } 

    calculateOrderTotal() {
        this.tax = this.itemTotal * 0.06;

        this.shipping =
            this.list.length > 0
                ? 10 + (this.list.length - 1) * 2
                : 0;

        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const tax = document.querySelector(
            `${this.outputSelector} #tax`
        );

        const shipping = document.querySelector(
            `${this.outputSelector} #shipping`
        );

        const orderTotal = document.querySelector(
            `${this.outputSelector} #order-total`
        );

        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
    }
}