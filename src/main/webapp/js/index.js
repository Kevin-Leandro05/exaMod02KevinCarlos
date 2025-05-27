$(document).ready(function () {
    $("#btnIniciar").click(function () {
        let logi = $("#validaUsuario").val();
        let pass = $("#validaContra").val();

        // Validar que los campos no estén vacíos
        if (!logi || !pass) {
            alert('Por favor, ingrese usuario y contraseña');
            return;
        }

        let parametro = {usuario: logi, contra: pass};
        $.getJSON("http://localhost:8080/Preg01/validarUsuario", parametro, function (data) {
            if (data.resultado === "ok") {
                // Almacenar el código de usuario
                sessionStorage.setItem("codiUsua", data.codiEstWeb);

                // Almacenar el login del usuario para mostrarlo en el perfil
                sessionStorage.setItem("username", data.logiEstd);
                
                // Almacenar el login del usuario para mostrarlo en el perfil
                sessionStorage.setItem("dni", data.ndniEstdWeb);

                console.log(data.token);
                window.location.href = "principal.html";
            } else {
                alert('USTED NO ES USUARIO');
                return;
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert('Error en la conexión: ' + textStatus);
        });
    });
});

