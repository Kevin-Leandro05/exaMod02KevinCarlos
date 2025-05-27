let detalles = [];

$(document).ready(function () {
    new DataTable('#miventa', {
        paging: false,
        searching: false,
        info: false,
        lengthChange: false,
        ordering: false,
        language: {
            emptyTable: "No hay productos seleccionados"
        }
    });

    let token = sessionStorage.getItem("token"); //obtener token

    let parametro = {opcion: 1, token};

    cargarClientes();
    cargarProductos();

    // Asigna el evento para cargar el precio al cambiar el producto seleccionado.
    $("#cmbProducto").change(() => cargarPrecio($("#cmbProducto").val()));


    $("#btnAgregar").click(() => {
        let codiProd = $("#cmbProducto").val(); // Código del producto seleccionado.
        let nombProd = $("#cmbProducto option:selected").text(); // Nombre del producto.
        let precProd = parseFloat($("#txtPrecio").val()); // Precio del producto.
        let cantProd = parseInt($("#txtCant").val(), 10); // Cantidad ingresada.

        if (isNaN(cantProd) || cantProd <= 0) {
            alert("La cantidad debe ser un número positivo mayor a 0");
            return;
        }

        // Verifica si el producto ya existe en los detalles.
        let existeProducto = detalles.find(detalle => detalle.codiProd === codiProd);
        if (existeProducto) {
            // Si ya existe, actualiza la cantidad y el subtotal.
            existeProducto.cantProd += cantProd;
            existeProducto.subtProd = (existeProducto.cantProd * existeProducto.precProd).toFixed(2);
        } else {
            // Si no existe, agrega un nuevo detalle.
            detalles.push({
                codiProd,
                nombProd,
                precProd: precProd.toFixed(2),
                cantProd,
                subtProd: (precProd * cantProd).toFixed(2)
            });
        }

        actualizarGrilla();
    });

    function cargarClientes() {
        $("#cmbCliente").empty();
        $.getJSON("http://localhost:8080/FacturaWeb/crudcliente", parametro, data => {
            data.forEach(cliente => {
                // Agrega cada cliente como una opción al combo box.
                $("#cmbCliente").append(new Option(cliente.nombCli, cliente.codiClie));
            });
        });
    }

    function cargarProductos() {
        $("#cmbProducto").empty();
        $.getJSON("http://localhost:8080/FacturaWeb/crudproducto", parametro, data => {
            data.forEach(producto => {
                // Agrega cada producto como una opción al combo box.
                $("#cmbProducto").append(new Option(producto.nombProd, producto.codiProd));
            });

            cargarPrecio(1);
        });
    }

    function cargarPrecio(codi) {
        let parametros = {opcion: 2, token, codiProd: codi};
        $.getJSON("http://localhost:8080/FacturaWeb/crudproducto", parametros, data => {
            // Actualiza el campo de texto con el precio del producto.
            $("#txtPrecio").val(data.precProd.toFixed(2));
        });
    }

    function actualizarGrilla() {
        let table = $("#miventa").DataTable();
        table.clear();

        let total = 0;

        // Agrega cada detalle como una fila en la tabla.
        detalles.forEach((detalle, index) => {
            table.row.add([
                detalle.codiProd,
                detalle.nombProd,
                detalle.precProd,
                detalle.cantProd,
                detalle.subtProd,
                `<button class="btn btn-danger" onclick="eliminarProducto(${index})">Eliminar</button>`
            ]);
            total += parseFloat(detalle.subtProd); // Suma el subtotal al total.
        });

        table.draw(); // Redibuja la tabla.

        // Actualiza el campo de texto con el total.
        $("#txtTotal").val(total.toFixed(2));
    }

    window.eliminarProducto = function (index) {
        detalles.splice(index, 1); // Elimina el producto del arreglo.
        actualizarGrilla(); // Actualiza la tabla.
    };

    //==================================================================================
    $("#btnGenerarVenta").click(function () {
        let codiClie = $("#cmbCliente").val(); // Código del cliente seleccionado.
        let token = sessionStorage.getItem("token");
        let codiUsua = sessionStorage.getItem("codiUsua"); // Código del usuario actual.

        if (!codiClie || detalles.length === 0) {
            alert("Selecciona un cliente y agrega al menos un producto.");
            return;
        }

        // Construye el objeto de datos de la venta.
        let ventaData = {
            codiClie: parseInt(codiClie),
            codiUsua: parseInt(codiUsua),
            detalle: detalles.map(detalle => ({
                    codiProd: parseInt(detalle.codiProd),
                    precProd: parseFloat(detalle.precProd),
                    cantProd: detalle.cantProd
                }))
        };

        $.ajax({
            url: 'http://localhost:8080/FacturaWeb/generarventa?token=' + token,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(ventaData),
            success: function (response) {
                if (response.resultado.includes("grabo, ok")) {
                    alert("Venta generada exitosamente: " + response.codiVent);
                    detalles = []; // Reinicia y limpia los detalles.
                    actualizarGrilla();
                    $("#txtTotal").val('0.00');
                    $("#txtCant").val('');  //limpiamos la cantidad

                    //reiniciar los combos
                    cargarClientes();
                    cargarProductos();

                    let codiVenta = parseInt(response.codiVent); // Convertir a número, por si acaso
                    window.open('http://localhost:8080/FacturaWeb/reporteVenta.jsp?xcodi=' + codiVenta, '_blank');

                } else {
                    alert(response.mensaje);
                }
            },
            error: function (xhr, status, error) {
                alert("Error al generar la venta: " + error);
            }
        });
    });
});


