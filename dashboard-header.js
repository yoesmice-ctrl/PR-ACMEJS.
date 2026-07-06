class DashboardHeader extends HTMLElement {

    connectedCallback() {

        const user = JSON.parse(localStorage.getItem("user"));

        this.innerHTML = `

        <header class="dashboard-header">

            <div>

                <h1>Sistema de Producción ACME.</h1>

                <p>

                    Bienvenido.

                    <strong>

                        ${user ? user.name : "Usuario."}

                    </strong>

                </p>

            </div>

        </header>

        `;

    }

}

customElements.define("dashboard-header", DashboardHeader);