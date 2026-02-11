
import { get, post, peticionDelete, patch } from "./peticiones.js";


document.addEventListener("DOMContentLoaded", asignarFuncionalidades)

export function asignarFuncionalidades() {

    document.getElementById("btnLogout").addEventListener("click", borrarSesion);
    misPrestamos();
    librosDisponibles();
}

export function borrarSesion() {

    const usuario = sessionStorage.clear("usuario");
    if (!usuario) {
        setTimeout(() => window.location.href = "./index.html", 1000)
    }
}


export function misPrestamos() {

    const prestados = document.getElementById("listadoPrestamos");
    const listaOrdenada = document.createElement("ol");
    prestados.append(listaOrdenada);
    const errorPrestados = document.createElement("span");

    prestados.append(errorPrestados);
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));

    get(`/libros?id_prestamo=${usuario.id}`, data => {

        console.log("***************** Prestados", data);

        data.forEach(libro => {

            const botonDevolver = document.createElement("button")
            botonDevolver.textContent = "Devolver"

            if (libro.id_prestamo == usuario.id) {

                const li = document.createElement("li");
                li.setAttribute("id", libro.id)
                li.textContent = `- Titulo: ${libro.titulo} - Autor ${libro.autor} - Fecha devolucion: ${libro.fecha_devolucion}`;
                li.append(botonDevolver)
                listaOrdenada.append(li);
                botonDevolver.addEventListener("click", devolverLibro);
            }
        });

    }, error => {

        console.log("Error: ", error);
        errorPrestados.textContent = "Error de servidor: 500"
    });
}

export function librosDisponibles() {

    const disponibles = document.getElementById("listadoDisponibles");
    const listaOrdenada = document.createElement("ol");
    disponibles.append(listaOrdenada);

    const errorPrestados = document.createElement("span");

    get(`/libros?id_prestamo=0`, data => {

        console.log("***************** Disponibles ", data);

        data.forEach(libro => {

            const botonPrestar = document.createElement("button");
            botonPrestar.textContent = "Prestar";

            const li = document.createElement("li");
            li.setAttribute("id", libro.id)
            li.textContent = `- Titulo: ${libro.titulo} - Autor ${libro.autor} - Fecha devolucion: ${libro.fecha_devolucion}`
            li.append(botonPrestar)
            listaOrdenada.append(li);
            botonPrestar.addEventListener("click", prestarLibro);
        });        
    }, error => {
        console.log("Error: ", error);
        errorPrestados.textContent = "Error de servidor: 500"
    });
}

export function devolverLibro(eventoDevolver) {

    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    const prestamos = document.getElementById("listadoPrestamos");

    const errorDevolver = document.createElement("span");
    prestamos.append(errorDevolver);

    const actualizarLibro = {
        id_prestamo: usuario.id === 0,
        fecha_devolucion: ""
    }

    patch(`/libros/${eventoDevolver.target.parentElement.id}`, actualizarLibro, data => {

        console.log("************ Devolver ", data);
        errorDevolver.textContent = "Libro devuelto"

    }, error => {
        console.log("Error: ", error);
        errorDevolver.textContent = "Error de servidor: 500";
    });
}

export function prestarLibro(eventoPrestar) {

    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    const disponibles = document.getElementById("listadoDisponibles");

    const errorActualizar = document.createElement("span");
    disponibles.append(errorActualizar);

    let fecha = Date.now()
    console.log(fecha);
    let calculo = fecha + (14 * 24 * 60 * 60 * 1000);

    const actualizarLibro = {
        id_prestamo: usuario.id,
        fecha_devolucion: new Date(calculo).toLocaleDateString()
    }

    patch(`/libros/${eventoPrestar.target.parentElement.id}`, actualizarLibro, data => {

        console.log("************ Actualizar ", data);
        errorActualizar.textContent = "Libro prestado"

    }, error => {
        console.log("Error: ", error);
        errorActualizar.textContent = "Error de servidor: 500";
    });
}