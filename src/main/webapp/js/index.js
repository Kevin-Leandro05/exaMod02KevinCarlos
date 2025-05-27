$(document).ready(function () {
    $("#btnIniciar").click(function () {
        let logi = $("#validaUsuario").val();
        let pass = $("#validaContra").val();

        // Validar que los campos no estén vacíos
        if (!logi || !pass) {
            alert('Por favor, ingrese usuario y contraseña');
            return;
        }

        let parametro = {logi: logi, pass: pass};
        $.getJSON("http://localhost:8080/FacturaWeb/validarusuario", parametro, function (data) {
            if (data.resultado === "ok") {
                // Almacenar token
                sessionStorage.setItem("token", data.token);

                // Almacenar el código de usuario
                sessionStorage.setItem("codiUsua", data.codiUsua);

                // Almacenar el login del usuario para mostrarlo en el perfil
                sessionStorage.setItem("username", logi);

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

