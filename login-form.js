import { URL_BASE } from "../services/firebase.js";

class LoginForm extends HTMLElement {

    connectedCallback() {

        this.innerHTML = `

        <div class="login-card">

            <h1>ACME</h1>

            <p>Sistema de Gestión de Producción.</p>

            <form id="loginForm">

                <label for="identification">
                    Identificación.
                </label>

                <input
                    type="text"
                    id="identification"
                    placeholder="Ingrese su Identificación."
                    required
                >

                <label for="password">
                    Contraseña
                </label>

                <input
                    type="password"
                    id="password"
                    placeholder="Ingrese su Contraseña."
                    required
                >

                <button type="submit">

                    Ingresar.

                </button>

                <p class="register">

                    ¿No tienes una cuenta?

                    <a href="register.html">

                        Regístrese.

                    </a>

                </p>

            </form>

        </div>

        `;

        const form = this.querySelector("#loginForm");

        form.addEventListener("submit", async (event) => {

            event.preventDefault();

            const identification = this.querySelector("#identification").value.trim();

            const password = this.querySelector("#password").value;

            try {

                console.log("Buscando usuarios...");

                const response = await fetch(`${URL_BASE}users.json`);

                const users = await response.json();

                console.log("Usuarios encontrados:", users);

                if (!users) {

                    alert("No hay usuarios registrados.");

                    return;

                }

                const user = Object.values(users).find(item =>

                    item.identification === identification &&
                    item.password === password

                );

                if (!user) {

                    alert("Identificación o contraseña incorrecta.");

                    return;

                }

                alert(`Bienvenido ${user.name}`);

                localStorage.setItem("session", JSON.stringify(user));

                window.location.href = "dashboard.html";

            }

            catch (error) {

                console.error(error);

                alert("Error al conectar con Firebase.");

            }

        });

    }

}

customElements.define("login-form", LoginForm);