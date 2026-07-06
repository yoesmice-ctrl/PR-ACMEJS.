import { URL_BASE } from "../services/firebase.js";

class InventoryForm extends HTMLElement {

    connectedCallback() {

        this.render();

        this.loadProducts();

        this.querySelector("#productForm").addEventListener("submit", (event) => {

            this.saveProduct(event);

        });

        this.querySelector("#search").addEventListener("keyup", () => {

            this.loadProducts();

        });

    }

    render() {

        this.innerHTML = `

        <section class="inventory">

            <h2>Registrar Producto.</h2>

            <form id="productForm">

                <label>Código.</label>

                <input
                    type="text"
                    id="code"
                    required
                >

                <label>Nombre.</label>

                <input
                    type="text"
                    id="name"
                    required
                >

                <label>Proveedor.</label>

                <input
                    type="text"
                    id="supplier"
                    required
                >

                <label>Tipo.</label>

                <select id="type">

                    <option value="Materia Prima.">

                        Materia Prima.

                    </option>

                    <option value="Producto Terminado.">

                        Producto Terminado.

                    </option>

                </select>

                <label>Stock Inicial.</label>

                <input
                    type="number"
                    id="stock"
                    value="0"
                    required
                >

                <button type="submit">

                    Guardar Producto.

                </button>

            </form>

            <hr>

            <div class="search-box">

                <input
                    type="text"
                    id="search"
                    placeholder="Buscar por código o nombre..."
                >

            </div>

            <table class="inventory-table">

                <thead>

                    <tr>

                        <th>Código.</th>
                        <th>Nombre.</th>
                        <th>Proveedor.</th>
                        <th>Tipo.</th>
                        <th>Stock.</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody id="products">

                </tbody>

            </table>

        </section>

        `;

    }

    async saveProduct(event) {

        event.preventDefault();

        const code = this.querySelector("#code").value.trim();

        const name = this.querySelector("#name").value.trim();

        const supplier = this.querySelector("#supplier").value.trim();

        const type = this.querySelector("#type").value;

        const stock = Number(this.querySelector("#stock").value);

        const response = await fetch(`${URL_BASE}products.json`);

        const data = await response.json();

        if (data) {

            const exists = Object.values(data).some(

                product => product.code === code

            );

            if (exists) {

                alert("Ese código ya existe.");

                return;

            }

        }

        const product = {

            code,

            name,

            supplier,

            type,

            stock

        };

        await fetch(`${URL_BASE}products.json`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(product)

        });

        alert("Producto registrado correctamente.");

        this.querySelector("#productForm").reset();

        this.loadProducts();

    }

    async loadProducts() {

        const response = await fetch(`${URL_BASE}products.json`);

        const data = await response.json();

        const tbody = this.querySelector("#products");

        tbody.innerHTML = "";

        if (!data) {

            tbody.innerHTML = `

            <tr>

                <td colspan="6">

                    No existen productos registrados.

                </td>

            </tr>

            `;

            return;

        }

        const search = this.querySelector("#search").value.toLowerCase();

        Object.entries(data).forEach(([id, product]) => {

            if (

                product.name.toLowerCase().includes(search)

                ||

                product.code.toLowerCase().includes(search)

            ) {

                tbody.innerHTML += `

                <tr>

                    <td>${product.code}</td>

                    <td>${product.name}</td>

                    <td>${product.supplier}</td>

                    <td>${product.type}</td>

                    <td>${product.stock}</td>

                    <td>

                        <button class="edit-btn" data-id="${id}">

                            ✏️

                        </button>

                        <button class="delete-btn" data-id="${id}">

                            🗑️

                        </button>

                        <button class="stock-btn" data-id="${id}">

                            ➕

                        </button>

                    </td>

                </tr>

                `;

            }

        });

        this.addDeleteEvents();

    }

    addDeleteEvents() {

        const buttons = this.querySelectorAll(".delete-btn");

        buttons.forEach(button => {

            button.addEventListener("click", () => {

                this.deleteProduct(button.dataset.id);

            });

        });

    }

    async deleteProduct(id) {

        const confirmDelete = confirm("¿Desea eliminar este producto?");

        if (!confirmDelete) return;

        await fetch(`${URL_BASE}products/${id}.json`, {

            method: "DELETE"

        });

        alert("Producto eliminado.");

        this.loadProducts();

    }

}

customElements.define("inventory-form", InventoryForm);