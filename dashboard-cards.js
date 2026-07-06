import { URL_BASE } from "../services/firebase.js";

class DashboardCards extends HTMLElement {

    async connectedCallback() {

        const usersResponse = await fetch(`${URL_BASE}users.json`);
        const users = await usersResponse.json();

        const productsResponse = await fetch(`${URL_BASE}products.json`);
        const products = await productsResponse.json();

        const totalUsers = users ? Object.keys(users).length : 0;
        const totalProducts = products ? Object.keys(products).length : 0;

        this.innerHTML = `

        <section class="cards">

            <div class="card">

                <h3>Usuarios.</h3>

                <h2>${totalUsers}</h2>

            </div>

            <div class="card">

                <h3>Productos.</h3>

                <h2>${totalProducts}</h2>

            </div>

            <div class="card">

                <h3>Procesos.</h3>

                <h2>0</h2>

            </div>

        </section>

        `;

    }

}

customElements.define("dashboard-cards", DashboardCards);