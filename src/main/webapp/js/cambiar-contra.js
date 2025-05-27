document.addEventListener("DOMContentLoaded", function () {
    //cargar el nombre de usuario desde sessionStorage
    const storedUserName = sessionStorage.getItem("username");
    if (storedUserName) {
        document.getElementById("logiUsua").value = storedUserName;
    } else {
        console.log('No se pudo guardar el nombre');
    }

    // Evento para el botón de cambio de contraseña
    document.getElementById("btnCambiarContra").addEventListener("click", cambiarPassword);
});


function cambiarPassword() {
    let token = sessionStorage.getItem("token");
    let user = document.getElementById("logiUsua").value;
    let pass = document.getElementById("passActual").value;
    let newpass = document.getElementById("passNueva").value;

    //validación básica
    if (!pass || !newpass) {
        mostrarMensaje("Por favor, completa todos los campos.", "danger");
        return;
    }

    //Preparar datos para enviar
    const formData = new URLSearchParams();
    formData.append("token", token);
    formData.append("user", user);
    formData.append("pass", pass);
    formData.append("newcontra", newpass);

    // Enviar la solicitud
    fetch("http://localhost:8080/FacturaWeb/validarusuario", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: formData
    })
            .then(response => response.json())
            .then(data => {
                if (data.resultado === "ok") {
                    mostrarMensaje(data.mensaje, "success");
                    setTimeout(() => window.location.href = "principal.html", 2000);
                } else {
                    mostrarMensaje(data.mensaje, "danger");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                mostrarMensaje("Ocurrió un error. Inténtalo nuevamente.", "danger");
            });
}

function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = document.getElementById("mensaje");
    mensajeDiv.style.display = "block";
    mensajeDiv.className = `alert alert-${tipo}`;
    mensajeDiv.innerText = mensaje;
}
