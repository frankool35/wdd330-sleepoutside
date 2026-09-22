import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, updateCartCount } from "./utils.mjs";

const category = getParam("category");

const title = document.querySelector("#product-list-title");

if (title && category) {
    const formattedCategory = category
        .replace("-", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

    title.textContent = `Top Products: ${formattedCategory}`;
}

const dataSource = new ExternalServices();

const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, listElement);

productList.init();

updateCartCount();