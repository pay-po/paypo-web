const UrlBaseReminder = UrlBase + "reminder";

$("#addCategoria").change(function () {
    var opcion = $(this).val();
    if (opcion == 2 || opcion == 5) {
        $("#addCuotas").attr("readonly", false);
        $("#addRango").attr("disabled", false);
    } else {
        $("#addRango").attr("disabled", true).val("30");
        $("#addCuotas").attr("readonly", true);
        $("#addCuotas").val("1")
    }
});

$("#btnRegisterPago").click(function () {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    var categoria = $("#addCategoria").val();
    var nropago = $("#addNroPago").val();
    var empresa = $("#addEmpresa").val();
    var fecha = $("#addFecha").val();
    var cuota = $("#addCuotas").val();
    var monto = $("#addMonto").val();
    var rango = $("#addRango").val();

    if (categoria != '' && nropago != '' && fecha != '' &&
        cuota != '' && monto != '' && empresa != '') {

        monto = parseFloat(monto).toFixed(2);

        if (monto > 0) {

            let data = {
                categoria: categoria,
                nropago: nropago,
                empresa: empresa,
                fecha: fecha,
                cuota: cuota,
                monto: monto,
                rango: rango,
                iduser: usuario.id_user,
            };

            axios.post(UrlBaseReminder+"/register", data).then((res) => {
                if (res.status == 201) {
                    swal({
                        type: "success",
                        title: "Registro exitoso",
                        showConfirmButton: true,
                        confirmButtonText: "Cerrar",
                    }).then((result) => {
                        $("#addNroPago").val("");
                        $("#addEmpresa").val("");
                        $("#addCuotas").val("1");
                        $("#addMonto").val("");
                    });
                } else {
                    sweetError()
                }
            });

        } else {
            sweetErrorMonto()
        }

    } else {
        sweetAlert()
    }
})