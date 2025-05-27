$(document).ready(function () {
    let token = sessionStorage.getItem("token");
    new DataTable('#productos', {
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
            url: "http://localhost:8080/FacturaWeb/crudproducto",
            type: "GET",
            data: {
                opcion: 1,
                token: token
            },
            dataSrc: ""
        },
        columns: [
            {data: 'codiProd'},
            {data: 'nombProd'},
            {data: 'precProd'},
            {data: 'codiUnid',
                render: function (data) {
                    switch (data) {
                        case 1:
                            return 'UNIDAD';
                        case 2:
                            return 'KG';
                        case 3:
                            return 'METRO';
                        case 4:
                            return 'GALON';
                        default :
                            return data;
                    }
                }
            },
            {
                data: 'codiProd', // Columna para colocar los botones
                render: function (data, type, row, meta) {
                    let para = {
                        'cod': row.codiProd,
                        'nomb': row.nombProd,
                        'prec': row.precProd,
                        'uni': row.codiUnid
                    };
                    let paratxt = JSON.stringify(para);
                    return "<button class='btn btn-warning' onclick=$.fn.editar('" + encodeURIComponent(paratxt) + "') \n\
                    data-toggle='modal' data-target='#exampleModal'><i class='fas fa-pencil-alt'></i></button>" +
                            "<button class='btn btn-danger' onclick=$.fn.eliminar('" + row.codiProd + "') \n\
                    data-toggle='modal' data-target='#exampleModal'><i class='fas fa-trash-alt'></i></button>";
                }

            }
        ]
    });

    // Botón de crear en la tabla
    $("#btnCrearProducto").click(function () {
        // Variable pa permitir letras, tildes, ñ y espacios
        let letrasValidas = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

        let nombre = $("#txtNombreProd").val().trim().toUpperCase();
        if (!letrasValidas.test(nombre)) {
            alert('El campo nombre solo debe de contener letras');
            return;
        }

        let precio = $("#txtPrecioProd").val().trim();
        if (precio === "") {
            alert('El precio no puede estar vacía');
            return;
        } else if (precio.length < 0.1 || isNaN(precio)) {
            alert('El precio debe de ser mayor a S/.0.10');
            return;
        }

        let unidad = $("#txtUnidadProd").val();

        $.ajax({
            url: 'http://localhost:8080/FacturaWeb/crearproducto',
            method: 'POST',
            data: {
                token: sessionStorage.getItem("token"),
                nombProd: nombre,
                precProd: precio,
                codiUnid: unidad
            },
            success: function (response) {
                console.log("Respuesta del servidor:", response);
                $("#crearModal").modal('hide');
                $('#productos').DataTable().ajax.reload();
                alert('Producto creado exitosamente!');
            },
            error: function (jqXHR) {
                console.log("Error:", jqXHR.status, jqXHR.responseText); // Agregado para depurar
                alert('Error al crear el registro.');
            }
        });
    });
    // Función para editar un registro
    $.fn.editar = function (code) {
        let obj = JSON.parse(decodeURIComponent(code));
        $("#txtCodiProdEdit").val(obj.cod);
        $("#txtNombreProdEdit").val(obj.nomb);
        $("#txtPrecioProdEdit").val(obj.prec);
        $("#txtUnidadProdEdit").val(obj.uni);
        $("#modificarModal").modal('show');
    };

    $("#btnModificarProducto").click(function (event) {
        event.preventDefault();

        // Obtener los datos del formulario
        let codiEdit = $("#txtCodiProdEdit").val();

        // Variable pa permitir letras, tildes, ñ y espacios
        let letrasValidas = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

        let nombreEdit = $("#txtNombreProdEdit").val().trim();
        if (!letrasValidas.test(nombreEdit)) {
            alert('El campo nombre solo debe de contener letras');
            return;
        }

        let precioEdit = $("#txtPrecioProdEdit").val().trim();
        if (precioEdit === "") {
            alert('El precio no puede estar vacía');
            return;
        } else if (precioEdit.length < 0.1 || isNaN(precioEdit)) {
            alert('El precio debe de ser mayor a S/.0.10');
            return;
        }

        let unidadEdit = $("#txtUnidadProdEdit").val();


        $.ajax({
            url: 'http://localhost:8080/FacturaWeb/actuproducto',
            method: 'POST',
            data: {
                token: sessionStorage.getItem("token"),
                codiEdit: codiEdit,
                nombreEdit: nombreEdit,
                precioEdit: precioEdit,
                codiUnidEdit: unidadEdit
            },
            success: function (response) {
                console.log("Respuesta del servidor:", response);
                $("#modificarModal").modal('hide');
                $('#productos').DataTable().ajax.reload();
                alert('Producto editado exitosamente!');
            },
            error: function (jqXHR) {
                console.log("Error:", jqXHR.status, jqXHR.responseText);
                alert('Error al modificar el registro.');
            }
        });
    });

    let codiParaEliminar = '';

    $.fn.eliminar = function (code) {
        codiParaEliminar = code;
        $("#eliminarCodiProd").text(code);
        $("#eliminarModal").modal('show');
    };

    $("#btnEliminarProducto").click(function () {
        $.ajax({
            url: 'http://localhost:8080/FacturaWeb/eliproducto',
            method: 'POST',
            data: {
                token: sessionStorage.getItem("token"),
                codiDelete: codiParaEliminar
            },
            success: function (response) {
                console.log("Respuesta del servidor:", response);
                $("#eliminarModal").modal('hide');
                $('#productos').DataTable().ajax.reload();
                alert('Producto eliminado exitosamente!');
            },
            error: function (jqXHR) {
                console.log("Error:", jqXHR.status, jqXHR.responseText);
                alert('Error al eliminar el registro.');
            }
        });
    });
});
