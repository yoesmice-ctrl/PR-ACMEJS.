import { URL_BASE } from "./firebase.js";

export async function getProducts() {

    const response = await fetch(`${URL_BASE}products.json`);

    return await response.json();

}

export async function saveProduct(product) {

    await fetch(`${URL_BASE}products.json`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(product)

    });

}

export async function deleteProduct(id) {

    await fetch(`${URL_BASE}products/${id}.json`, {

        method: "DELETE"

    });

}