document.getElementById("btnCrearUsuario").addEventListener("click", crearUsuario);

function crearUsuario() {
    let logiUsuario = document.getElementById("txtUsuario").value.toLowerCase();
    let contra = document.getElementById("txtContra").value;
    let confirmarContra = document.getElementById("txtConfirmarContra").value;

    //validación básica
    if (!logiUsuario || !contra || !confirmarContra) {
        mostrarMensaje("Por favor, completa todos los campos.", "danger");
        return;
    }

    if (contra.length < 3) {
        mostrarMensaje("La contraseña debe tener al menos 3 caracter", "danger");
        return;
    }

    if (confirmarContra !== contra) {
        mostrarMensaje("Las contraseñas deben de ser iguales", "danger");
        return;
    }

    //Preparar datos para enviar
    const formData = new URLSearchParams();
    formData.append("usuario", logiUsuario);
    formData.append("contra", contra);

    // Enviar la solicitud
    fetch("http://localhost:8080/FacturaWeb/crearusuario", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: formData
    })
            .then(response => response.json())
            .then(data => {
                if (data.resultado === "ok") {
                    mostrarMensaje(data.mensaje, "success");
                    setTimeout(() => window.location.href = "index.html", 2000);
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
    let mensajeDiv = document.getElementById("mensaje");
    mensajeDiv.style.display = "block";
    mensajeDiv.className = `alert alert-${tipo}`;
    mensajeDiv.innerText = mensaje;
    setTimeout(() => mensajeDiv.style.display = "none", 3500); // Ocultar automáticamente después de 5 segundos.
}


