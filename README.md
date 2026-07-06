# PR-ACMEJS.
PoryectoJavaS.

STOCK FLOW.

Sistema de Gestión de Producción desarrollado como proyecto académico.

Descripción.

STOCK FLOW es una aplicación web que permite administrar el proceso de producción de una empresa, controlando usuarios, inventario, fórmulas de fabricación y producción.

La información se almacena en Firebase Realtime Database y la aplicación está desarrollada utilizando HTML, CSS, JavaScript ES6 y Web Components.


Tecnologías utilizadas.

- HTML5.
- CSS3.
- JavaScript (ES6).
- Web Components.
- Firebase Realtime Database.
- Fetch API.
- LocalStorage.


Funcionalidades.

Inicio de sesión.

- Inicio de sesión por identificación y contraseña.
- Validación de credenciales.
- Redirección al Dashboard.
- Almacenamiento de sesión.

  

Gestión de Usuarios.

- Registrar usuarios.
- Listar usuarios.
- Editar usuarios.
- Eliminar usuarios.

Cada usuario contiene:

- Identificación.
- Nombre.
- Cargo.
- Contraseña.


Inventario.

Permite administrar los productos de la empresa.

Se pueden registrar:

- Materias primas.
- Productos terminados.

Información registrada:

- Código.
- Nombre.
- Proveedor.
- Tipo.
- Stock inicial.


órmulas de Producción.

Permite crear las recetas necesarias para fabricar productos terminados.

Cada fórmula contiene:

- Producto terminado.
- Materias primas.
- Cantidad requerida por ingrediente.


roducción.

Permite fabricar productos.

Durante el proceso el sistema:

- Consulta la fórmula.
- Verifica existencia de materia prima.
- Descuenta automáticamente el inventario.
- Incrementa el stock del producto terminado.
- Registra el proceso de producción.


ashboard.

Panel principal del sistema con acceso a todos los módulos.

Incluye:

- Inventario.
- Usuarios.
- Producción.


Base de datos.

El proyecto utiliza Firebase Realtime Database.

Estructura principal:

```
users
products
recipes
production
```

---

Estructura del proyecto:

```
ProyectoACME

components/
    dashboard-cards.js
    dashboard-header.js
    inventory-form.js
    login-form.js
    production-form.js
    register-form.js
    sidebar-menu.js
    users-form.js

services/
    auth.js
    firebase.js
    inventory.js
    production.js
    users.js

pages/
    dashboard.html
    inventory.html
    production.html
    users.html

index.html
register.html
main.js
style.css
README.md
```

---

Instalación.

1. Clonar el repositorio.

```
git clone https://github.com/usuario/stock-flow.git
```

2. Abrir el proyecto en Visual Studio Code.

3. Instalar la extensión Live Server.

4. Ejecutar el proyecto desde **index.html** utilizando Live Server.

---

Firebase

Configurar la URL de Firebase en:

```
services/firebase.js
```

Ejemplo:

```javascript
export const URL_BASE =
"https://stock-flow-48bf0-default-rtdb.firebaseio.com/";
```

---

Autor: Yojhan Andrés Vega Miranda

## Estado del proyecto

Proyecto académico en desarrollo.

Versión 1.0
