import { get } from "./peticiones.js";

librosDisponibles();
document.getElementById("btnLogin").addEventListener("click", validarLogin);

export function validarLogin() {

    const nombreUsuario = document.getElementById("username").value;
    const contraseñaUsuario = document.getElementById("password").value;

    const errorLogin = document.getElementById("errorLogin");


    if (nombreUsuario === "" || contraseñaUsuario === "") {
        errorLogin.classList.add("resaltado");
        errorLogin.textContent = "El nombre o contraseña no puede estar vacio"
    } else {

        get(`/usuarios?email=${nombreUsuario}`, data => {

            if (!data || data.length === 0) {

                errorLogin.textContent = "Usuario no encontrado"
            } else {

                const usuario = data[0];

                errorLogin.textContent = `Bienvenido ${nombreUsuario}`
                sessionStorage.setItem("usuario", JSON.stringify({

                    id: usuario.id,
                    nombre: usuario.nombre,
                    apellidos: usuario.apellidos,
                    email: usuario.email
                }))
                
                setTimeout(() => window.location.href = "./libros.html", 1000);
            }
        }, error => {
            console.log("Error: ", error);

            errorLogin.textContent = "Fallo de servidor: 500"
        })
    }
}

export function librosDisponibles() {

    const listadoDisponibles = document.getElementById("listadoDisponibles");
    const listaOrdenada = document.createElement("ol");
    listadoDisponibles.append(listaOrdenada)

    get(`/libros`, data => {

        console.log("data: ", data);

        data.forEach(libro => {

            if (libro.fecha_devolucion === "") {

                const li = document.createElement("li");
                li.setAttribute("id", libro.id)
                li.textContent = `- Titulo: ${libro.titulo} - Autor ${libro.autor}`
                listaOrdenada.append(li);
            }
        });

    }, error => {
        console.log("Error: ", error);
    })
}