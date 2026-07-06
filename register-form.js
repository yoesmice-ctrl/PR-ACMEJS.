import { URL_BASE } from "../services/firebase.js";

class RegisterForm extends HTMLElement {

    connectedCallback() {

        this.innerHTML = `

        <div class="login-card">

            <h1>Crear Usuario.</h1>

            <p>Complete la Información.</p>

            <form id="registerForm">

                <label>Identificación.</label>

                <input
                    type="text"
                    id="identification"
                    required
                >

                <label>Nombre Completo.</label>

                <input
                    type="text"
                    id="name"
                    required
                >

                <label>Cargo.</label>

                <select id="position" required>

                    <option value="">Seleccione un Cargo.</option>

                    <option value="Administrador.">Administrador.</option>

                    <option value="Supervisor.">Supervisor.</option>

                    <option value="Operario.">Operario.</option>

                    <option value="Almacenista.">Almacenista.</option>

                </select>

                <label>Contraseña.</label>

                <input
                    type="password"
                    id="password"
                    required
                >

                <label>Confirmar Contraseña.</label>

                <input
                    type="password"
                    id="confirmPassword"
                    required
                >

                <button type="submit">

                    Registrar.

                </button>

            </form>

        </div>

        `;

        const form = this.querySelector("#registerForm");

        form.addEventListener("submit", async (event) => {

            event.preventDefault();

            const identification = this.querySelector("#identification").value.trim();

            const name = this.querySelector("#name").value.trim();

            const position = this.querySelector("#position").value;

            const password = this.querySelector("#password").value;

            const confirmPassword = this.querySelector("#confirmPassword").value;

            if (password !== confirmPassword) {

                alert("Las contraseñas no coinciden.");

                return;

            }

            const user = {

                identification,

                name,

                position,

                password

            };

try {

    console.log("Consultando usuarios...");

    const response = await fetch(`${URL_BASE}users.json`);

    const users = await response.json();

    console.log("Usuarios actuales:", users);

    if (users) {

        const exists = Object.values(users).some(

            item => item.identification === identification

        );

        if (exists) {

            alert("Ya existe un usuario con esa identificación.");

            return;

        }

    }

    console.log("Guardando usuario...");

    const saveResponse = await fetch(`${URL_BASE}users.json`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(user)

    });

    console.log("Estado de la respuesta:", saveResponse.status);

    const data = await saveResponse.json();

    console.log("Respuesta Firebase:", data);

    if (!saveResponse.ok) {

        throw new Error("No se pudo guardar el usuario.");

    }

    alert("Usuario registrado correctamente.");

    form.reset();

    window.location.href = "index.html";

}
catch (error) {

    console.error("Error:", error);

    alert("Error al conectar con Firebase.");

}

        });

    }

}

customElements.define("register-form", RegisterForm);