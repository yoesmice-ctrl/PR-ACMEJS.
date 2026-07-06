import { URL_BASE } from "./firebase.js";

export async function getUsers() {

    const response = await fetch(`${URL_BASE}users.json`);

    return await response.json();

}

export async function deleteUser(id) {

    await fetch(`${URL_BASE}users/${id}.json`, {

        method: "DELETE"

    });

}