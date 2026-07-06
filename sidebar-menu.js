class SidebarMenu extends HTMLElement {

    connectedCallback() {

        this.innerHTML = `

        <aside class="sidebar">

            <h2>ACME.</h2>

            <nav>

                <a href="dashboard.html">🏠 Dashboard.</a>

                <a href="inventory.html">📦 Inventario.</a>

                <a href="users.html">👥 Usuarios.</a>

                <a href="production.html">🏭 Producción.</a>

                <a href="../index.html" id="logout">🚪 Cerrar Sesión.</a>

            </nav>

        </aside>

        `;

        this.querySelector("#logout").addEventListener("click", () => {

            localStorage.removeItem("user");

        });

    }

}

customElements.define("sidebar-menu", SidebarMenu);