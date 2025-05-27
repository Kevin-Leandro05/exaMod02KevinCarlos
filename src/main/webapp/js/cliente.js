$(document).ready(function () {

    let token = sessionStorage.getItem("token");
    let parametro = {opcion: 1, token: token};

    new DataTable('#clientes', {
        language: {
            decimal: "",
            emptyTable: "No hay datos",
            info: "Mostrando desde el _START_ al _END_ del total de _TOTAL_ registros",
            infoEmpty: "Mostrando desde el 0 al 0 del total de  0 registros",
            infoFiltered: "(Filtrados del total de _MAX_ registros)",
            infoPostFix: "",
            thousands: ",",
            lengthMenu: "Mostrar _MENU_ registros por página",
            loadingRecords: "Cargando...",
            processing: "Procesando...",
            search: "Buscar:",
            zeroRecords: "No se ha encontrado nada a través de ese filtrado.",
            paginate: {
                first: "Primero",
                last: "Última",
                next: "Siguiente",
                previous: "Anterior"
            },
            aria: {
                sortAscending: ": activar para ordenar la columna ascendente",
                sortDescending: ": activar para ordenar la columna descendente"
            }
        },
        ajax: {
            url: "http://localhost:8080/Preg01/listarUsuarios",
            type: "GET",
            data: {
                opcion: 1
            },
            dataSrc: ""
        },
        columns: [
            {data: 'codiEstdWeb'},
            {data: 'ndniEstdWeb',
                render: function (data) {
                    return data === 1 ? 'DNI' : 'RUC';
                }
            },
            {data: 'appaEstdWeb'},
            {data: 'apmaEstdWeb'},
            {data: 'nombEstdWeb'},
            {data: 'fechNaciEstdWeb'},
            {data: 'logiEstd'},
            {
                data: 'codiEstdWeb', // Columna para colocar los botones
                render: function (data, type, row, meta) {
                    let para = {
                        'cod': row.codiEstdWeb,
                        'tipo': row.appaEstdWeb,
                        'aaa': row.apmaEstdWeb,
                        'num': row.nombEstdWeb,
                        'nomb': row.fechNaciEstdWeb
                    };
                    let paratxt = JSON.stringify(para);
                    return "<button class='btn btn-warning' onclick=$.fn.editar('" + encodeURIComponent(paratxt) + "') \n\
                    data-toggle='modal' data-target='#exampleModal'><i class='fas fa-pencil-alt'></i></button>" +
                            "<button class='btn btn-danger' onclick=$.fn.eliminar('" + row.codiClie + "') \n\
                    data-toggle='modal' data-target='#exampleModal'><i class='fas fa-trash-alt'></i></button>";
                }

            }
        ]
    });
    $.getJSON("http://localhost:8080/FacturaWeb/crudcliente", parametro, function (data) {
        data.forEach(cliente => {
            console.log(`Código Cliente: ${cliente.codiClie}`);
            console.log(`Tipo Documento: ${cliente.codiTipoDocuIden}`);
            console.log(`Número Documento: ${cliente.numeDocu}`);
            console.log(`Nombre: ${cliente.nombCli}`);
            console.log('================================');
        });
    });
    // Botón de crear en la tabla
    $("#btnCrearCliente").click(function () {

        let tipoDocu = $("#txtTipoDocu").val();

        let numDocu = $("#txtNumDocu").val().trim();
        if (numDocu === "") {
            alert('El número de documento no puede estar vacía');
            return;
        } else if (numDocu.length < 9 || isNaN(numDocu)) {
            alert('El número de documento debe de tener 9 a más números');
            return;
        }

        // Variable pa permitir letras, tildes, ñ y espacios
        let letrasValidas = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

        let nomb = $("#txtNombre").val().trim().toUpperCase();
        if (!letrasValidas.test(nomb)) {
            alert('El campo solo debe de contener letras');
            return;
        }

        $.ajax({
            url: 'http://localhost:8080/FacturaWeb/crudcliente',
            method: 'POST',
            data: {
                token: sessionStorage.getItem("token"),
                codiTipoDocuIden: tipoDocu,
                numeDocu: numDocu,
                nombCli: nomb
            },
            success: function (response) {
                console.log("Respuesta del servidor:", response);
                $("#crearModal").modal('hide');
                $('#clientes').DataTable().ajax.reload();
                alert('Cliente creado exitosamente');

            },
            error: function (xhr, status, error) {
                console.error("Estado:", status, "Error:", error, "Respuesta:", xhr.responseText);
                alert("Hubo un error en la solicitud AJAX");
            }
        });
    });
    // Función para editar un registro
    $.fn.editar = function (code) {
        let obj = JSON.parse(decodeURIComponent(code));
        $("#txtCodiEdit").val(obj.cod);
        $("#txtTipoDocuEdit").val(obj.tipo);
        $("#txtNumDocuEdit").val(obj.num);
        $("#txtNombreEdit").val(obj.nomb);
        $("#modificarModal").modal('show');
    };

    $("#btnModificarCliente").click(function (event) {

        event.preventDefault();

        // Obtener los datos del formulario
        let codiEdit = $("#txtCodiEdit").val();
        let tipoEdit = $("#txtTipoDocuEdit").val();
        let nroEdit = $("#txtNumDocuEdit").val().trim();
        if (nroEdit === "") {
            alert('El número de documento no puede estar vacía');
            return;
        } else if (nroEdit.length < 9 || isNaN(nroEdit)) {
            alert('El número de documento debe de tener 9 a más números');
            return;
        }

        // Variable pa permitir letras, tildes, ñ y espacios
        let letrasValidas = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

        let nombEdit = $("#txtNombreEdit").val().trim().toUpperCase();
        if (!letrasValidas.test(nombEdit)) {
            alert('El campo solo debe de contener letras');
            return;
        }

        $.ajax({
            url: 'http://localhost:8080/FacturaWeb/actucliente',
            method: 'POST',
            data: {
                token: sessionStorage.getItem("token"),
                codiEdit: codiEdit,
                TipoDocuEdit: tipoEdit,
                numeDocuEdit: nroEdit,
                nombCliEdit: nombEdit
            },
            success: function (response) {
                console.log("Respuesta del servidor:", response);
                $("#modificarModal").modal('hide');
                $('#clientes').DataTable().ajax.reload();
                alert('Cliente editado exitosamente!');
            },
            error: function (jqXHR) {
                console.log("Error:", jqXHR.status, jqXHR.responseText); // Agregado para depurar
                alert('Error al modificar el registro.');
            }
        });
    });

    // Variable para almacenar el código a eliminar
    let codiParaEliminar = '';
    // Función para mostrar el modal de eliminar
    $.fn.eliminar = function (code) {
        codiParaEliminar = code;
        $("#eliminarCodi").text(code);
        $("#eliminarModal").modal('show');
    };
    // Botón de eliminar en la tabla
    $("#btnEliminarCliente").click(function () {
        $.ajax({
            url: 'http://localhost:8080/FacturaWeb/elicliente',
            method: 'POST',
            data: {
                token: sessionStorage.getItem("token"),
                codiDelete: codiParaEliminar
            },
            success: function (response) {
                console.log("Respuesta del servidor:", response);
                $("#eliminarModal").modal('hide');
                $('#clientes').DataTable().ajax.reload();
                alert('Cliente eliminado exitosamente!');
            },
            error: function (jqXHR) {
                console.log("Error:", jqXHR.status, jqXHR.responseText); // Agregado para depurar
                alert('Error al eliminar el registro.');
            }
        });
    });
});


