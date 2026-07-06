import { URL_BASE } from "../services/firebase.js";

class UsersForm extends HTMLElement {

    connectedCallback() {

        this.render();

        this.loadUsers();

        this.querySelector("#searchUser").addEventListener("keyup", () => {

            this.loadUsers();

        });

    }

    render() {

        this.innerHTML = `

        <section class="inventory">

            <h2>Usuarios Registrados.</h2>

            <div class="search-box">

                <input
                    type="text"
                    id="searchUser"
                    placeholder="Buscar por Identificación o Nombre..."
                >

            </div>

            <table class="inventory-table">

                <thead>

                    <tr>

                        <th>Identificación.</th>

                        <th>Nombre.</th>

                        <th>Cargo.</th>

                        <th>Acciones.</th>

                    </tr>

                </thead>

                <tbody id="usersTable">

                </tbody>

            </table>

        </section>

        `;

    }

    async loadUsers() {

        const response = await fetch(`${URL_BASE}users.json`);

        const data = await response.json();

        const tbody = this.querySelector("#usersTable");

        tbody.innerHTML = "";

        if (!data) {

            tbody.innerHTML = `

            <tr>

                <td colspan="4">

                    No existen usuarios registrados.

                </td>

            </tr>

            `;

            return;

        }

        const search = this.querySelector("#searchUser").value.toLowerCase();

        Object.entries(data).forEach(([id, user]) => {

            if (

                user.name.toLowerCase().includes(search)

                ||

                user.identification.toLowerCase().includes(search)

            ) {

                tbody.innerHTML += `

                <tr>

                    <td>${user.identification}</td>

                    <td>${user.name}</td>

                    <td>${user.position}</td>

                    <td>

                        <button class="editUser" data-id="${id}">

                            ✏️

                        </button>

                        <button class="deleteUser" data-id="${id}">

                            🗑️

                        </button>

                    </td>

                </tr>

                `;

            }

        });

        this.addDeleteEvents();

    }

    addDeleteEvents() {

        const buttons = this.querySelectorAll(".deleteUser");

        buttons.forEach(button => {

            button.addEventListener("click", () => {

                this.deleteUser(button.dataset.id);

            });

        });

    }

    async deleteUser(id) {

        const confirmDelete = confirm("¿Desea eliminar este usuario?");

        if (!confirmDelete) return;

        await fetch(`${URL_BASE}users/${id}.json`, {

            method: "DELETE"

        });

        alert("Usuario Eliminado Correctamente.");

        this.loadUsers();

    }

}

customElements.define("users-form", UsersForm);