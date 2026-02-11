
import { get, post } from "./peticiones.js";

document.addEventListener("DOMContentLoaded", asignarValidadores)

export function asignarValidadores() {

    document.getElementById("nombre").addEventListener("blur", validarNombre);
    document.getElementById("apellidos").addEventListener("blur", validarApellidos);
    document.getElementById("email").addEventListener("blur", validarEmail);
    document.getElementById("repetirEmail").addEventListener("blur", validarRepetirEmail);
    document.getElementById("password").addEventListener("blur", validarContraseña);
    document.getElementById("repetirPassword").addEventListener("blur", validarRepetirContraseña);
    document.getElementById("formRegistro").addEventListener("submit", controlarEnvioRegistro);
}

export function controlarEnvioRegistro(eventoSubmit) {

    eventoSubmit.preventDefault();

    if (!validarNombre()) {

    } else if (!validarApellidos()) {

    } else if (!validarEmail()) {

    } else if (!validarRepetirEmail()) {

    } else if (!validarContraseña()) {

    } else if (!validarRepetirContraseña()) {

    } else {

        const condiciones = document.getElementById("condiciones").checked;
        const errorCondiciones = document.getElementById("errorCondiciones");

        if (!condiciones) {
            errorCondiciones.textContent = "Debe aceptar la condiciones para continuar";
        } else {
            registrarUsuario();
        }
    }
}


export function validarNombre() {

    const nombreUsuario = document.getElementById("nombre").value;
    const errorNombre = document.getElementById("errorNombre");

    if (nombreUsuario === "" || nombreUsuario.length < 3 || nombreUsuario[0] !== nombreUsuario[0].toUpperCase()) {

        errorNombre.textContent = "El nombre no puede estar vacio / menos de 3 caracteres / primera letra mayuscula"
        return false;

    } else {
        errorNombre.textContent = "Nombre valido";
        return true;
    }
}

export function validarApellidos() {

    const apellidosUsuario = document.getElementById("apellidos").value;
    const errorApellidos = document.getElementById("errorApellidos");

    if (apellidosUsuario === "" || apellidosUsuario.length < 3 || apellidosUsuario[0] !== apellidosUsuario[0].toUpperCase()) {

        errorApellidos.textContent = "El apellidos no puede estar vacio / menos de 3 caracteres / primera letra mayuscula"
        return false;

    } else {
        errorApellidos.textContent = "Apelldo valido";
        return true;
    }
}

export function validarEmail() {

    const emailUsuario = document.getElementById("email").value;
    const errorEmail = document.getElementById("errorEmail");

    const regexEmail = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);

    if (emailUsuario === "" || !regexEmail.test(emailUsuario)) {
        errorEmail.textContent = "Email vacio / no valido"
        return false;
    } else {
        errorEmail.textContent = "Email valido"
        return true;
    }
}

export function validarRepetirEmail() {

    const emailUsuario = document.getElementById("email").value;
    const repetirEmail = document.getElementById("repetirEmail").value;
    const errorRepetirEmail = document.getElementById("errorRepetirEmail");

    if (emailUsuario !== repetirEmail) {
        errorRepetirEmail.textContent = "El email no coincide";
        return false;
    } else {
        errorRepetirEmail.textContent = "Email igual"
        return true;
    }
}

export function validarContraseña() {

    const contraseñaUsuario = document.getElementById("password").value;
    const errorContraseña = document.getElementById("errorPassword");

    const regexContraseña = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/);

    if (contraseñaUsuario === "" || contraseñaUsuario.length < 8 || !regexContraseña.test(contraseñaUsuario)) {
        errorContraseña.textContent = "Contraseña vacia / no puede tener menos de 8 caracteres / contraseña no valida"
        return false;
    } else {
        errorContraseña.textContent = "Contraseña valida";
        return true;
    }
}


export function validarRepetirContraseña() {

    const contraseñaUsuario = document.getElementById("password").value;
    const repetirContraseña = document.getElementById("repetirPassword").value;

    const errorContraseña = document.getElementById("errorRepetirPassword");

    if (contraseñaUsuario !== repetirContraseña) {
        errorContraseña.textContent = "La contraseña no coincide";
        return false;
    } else {
        errorContraseña.textContent = "La contraseña coincide";
        return true;
    }
}

export function registrarUsuario() {

    const errorRegistro = document.getElementById("errorRegistro");

    const nuevoUsuario = {
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        news: document.getElementById("news").checked
    }

    post(`/usuarios`, nuevoUsuario, data => {

        console.log("Usuario ", data);
        errorRegistro.textContent = "Usuario registrado correctamente";

        setTimeout(()=> window.location.href = "./index.html", 1000);


    }, error => {
        errorRegistro.textContent = "Error de servidor: 500"
        console.log("Error: ", error);
    });
}
