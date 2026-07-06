import { URL_BASE } from "./firebase.js";

/* ============================
OBTENER TODAS LAS FÓRMULAS
============================ */

export async function getRecipes() {

    const response = await fetch(`${URL_BASE}recipes.json`);

    return await response.json();

}

/* ============================
OBTENER TODOS LOS PRODUCTOS
============================ */

export async function getProducts() {

    const response = await fetch(`${URL_BASE}products.json`);

    return await response.json();

}

/* ============================
ACTUALIZAR UN PRODUCTO
============================ */

export async function updateProduct(id, product) {

    await fetch(`${URL_BASE}products/${id}.json`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(product)

    });

}

/* ============================
GUARDAR PRODUCCIÓN
============================ */

export async function saveProduction(production) {

    await fetch(`${URL_BASE}production.json`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(production)

    });

}