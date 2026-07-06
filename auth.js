import { URL_BASE } from "./firebase.js";

export async function login(identification, password) {

    const response = await fetch(`${URL_BASE}users.json`);

    const users = await response.json();

    if (!users) {

        return null;

    }

    const user = Object.values(users).find(item =>

        item.identification === identification &&
        item.password === password

    );

    if (user) {

        localStorage.setItem("user", JSON.stringify(user));

        return user;

    }

    return null;

}