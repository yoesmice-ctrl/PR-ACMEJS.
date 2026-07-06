import { URL_BASE } from "../services/firebase.js";

class ProductionForm extends HTMLElement {

    constructor() {
        super();
        this.ingredients = [];
    }

    async connectedCallback() {

        this.render();

        await this.loadProducts();

        this.events();

    }

    render() {

        this.innerHTML = `

        <section class="inventory">

            <h2>Crear Fórmula de Producción.</h2>

            <form id="recipeForm">

                <label>Producto Terminado.</label>

                <select id="product" required>

                    <option value="">Seleccione...</option>

                </select>

                <label>Materia Prima.</label>

                <select id="material">

                    <option value="">Seleccione...</option>

                </select>

                <label>Cantidad Necesaria.</label>

                <input
                    type="number"
                    id="quantity"
                    min="1"
                >

                <button
                    type="button"
                    id="addIngredient"
                >

                    Agregar Ingrediente.

                </button>

            </form>

            <br>

            <table class="inventory-table">

                <thead>

                    <tr>

                        <th>Materia Prima.</th>
                        <th>Cantidad.</th>
                        <th>Acción.</th>

                    </tr>

                </thead>

                <tbody id="ingredientsTable">

                </tbody>

            </table>

            <br>

            <button id="saveRecipe">

                Guardar Fórmula.

            </button>

            <hr>

            <h2>Fabricar Producto.</h2>

            <form id="produceForm">

                <label>Producto.</label>

                <select id="produceProduct">

                    <option value="">Seleccione...</option>

                </select>

                <label>Cantidad a Fabricar.</label>

                <input
                    type="number"
                    id="produceQuantity"
                    min="1"
                    required
                >

                <button type="submit">

                    Fabricar.

                </button>

            </form>

        </section>

        `;

    }

    events() {

        this.querySelector("#addIngredient")
        .addEventListener("click", () => {

            this.addIngredient();

        });

        this.querySelector("#saveRecipe")
        .addEventListener("click", () => {

            this.saveRecipe();

        });

        this.querySelector("#produceForm")
        .addEventListener("submit", (event) => {

            this.produce(event);

        });

    }

    async loadProducts() {

        const response = await fetch(`${URL_BASE}products.json`);

        const data = await response.json();

        const product = this.querySelector("#product");

        const material = this.querySelector("#material");

        const produce = this.querySelector("#produceProduct");

        product.innerHTML = `<option value="">Seleccione...</option>`;
        material.innerHTML = `<option value="">Seleccione...</option>`;
        produce.innerHTML = `<option value="">Seleccione...</option>`;

        Object.values(data || {}).forEach(item => {

            if (item.type === "Producto Terminado.") {

                product.innerHTML += `
                    <option value="${item.code}">
                        ${item.code} - ${item.name}
                    </option>
                `;

                produce.innerHTML += `
                    <option value="${item.code}">
                        ${item.code} - ${item.name}
                    </option>
                `;

            }

            if (item.type === "Materia Prima.") {

                material.innerHTML += `
                    <option value="${item.code}">
                        ${item.code} - ${item.name}
                    </option>
                `;

            }

        });

    }

    addIngredient() {

        const materialCode = this.querySelector("#material").value;

        const quantity = Number(this.querySelector("#quantity").value);

        if (materialCode === "" || quantity <= 0) {

            alert("Complete todos los campos.");

            return;

        }

        this.ingredients.push({

            materialCode,

            quantity

        });

        this.paintTable();

        this.querySelector("#quantity").value = "";

    }

    paintTable() {

        const tbody = this.querySelector("#ingredientsTable");

        tbody.innerHTML = "";

        this.ingredients.forEach((ingredient, index) => {

            tbody.innerHTML += `

            <tr>

                <td>${ingredient.materialCode}</td>

                <td>${ingredient.quantity}</td>

                <td>

                    <button
                        type="button"
                        onclick="this.getRootNode().host.removeIngredient(${index})"
                    >

                        Eliminar

                    </button>

                </td>

            </tr>

            `;

        });

    }

    removeIngredient(index) {

        this.ingredients.splice(index, 1);

        this.paintTable();

    }

    async saveRecipe() {

        const productCode = this.querySelector("#product").value;

        if (productCode === "") {

            alert("Seleccione un Producto.");

            return;

        }

        if (this.ingredients.length === 0) {

            alert("Debe Agregar Al Menos Un Ingrediente.");

            return;

        }

        const recipe = {

            productCode,

            ingredients: this.ingredients

        };

        try {

            await fetch(`${URL_BASE}recipes.json`, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(recipe)

            });

            alert("Fórmula Guardada Correctamente.");

            this.ingredients = [];

            this.paintTable();

            this.querySelector("#recipeForm").reset();

        } catch (error) {

            console.error(error);

            alert("Error al guardar la fórmula.");

        }

    }

    async produce(event) {

        event.preventDefault();

        const product = this.querySelector("#produceProduct").value;

        const quantity = Number(this.querySelector("#produceQuantity").value);

        if (product === "") {

            alert("Seleccione un producto.");

            return;

        }

        if (quantity <= 0) {

            alert("Ingrese una Cantidad Válida.");

            return;

        }

        console.log("Producto:", product);

        console.log("Cantidad:", quantity);

        alert("En el Siguiente Paso Programaremos la Fabricación Automática.");

    }

}

customElements.define("production-form", ProductionForm);