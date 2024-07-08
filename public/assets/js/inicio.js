const UrlBaseReminder = UrlBase + "reminder";
const UrlBaseDetailReminder = UrlBase + "detailreminder";

function listReminders() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    var mes = $("#mes").val();
    var anio = $("#anio").val();

    if (mes != '' && anio != '') {

        let data = {
            mes: mes,
            anio: anio,
            iduser: usuario.id_user,
        };

        axios.post(UrlBaseReminder, data).then((res) => {
            if (res.status == 200) {
                let data = res.data;
                let alerta = data.filter((a) => a.alert)
                let html = data.map((reminder, index) => {
                    return `<tr class='text-center'>
                        <td>${index + 1}</td>
                        <td>${reminder.nam}</td>
                        <td>${reminder.nro_pay}</td>
                        <td>${reminder.company}</td>
                        <td>${reminder.quota}</td>
                        <td>${reminder.amount}</td>
                        <td>
                            <span class="badge text-bg-${reminder.color}">
                                ${reminder.payment_status === 2 ? 'No Pagado' : 'Pagado'}
                            </span>
                        </td>
                        <td>${reminder.payment_date}</td>
                        <td>
                        ${reminder.payment_status === 2 
                            ? `<button class="btn btn-sm btn-info" 
                            onclick="pagarReminder(${reminder.reminders_details_id})">Pagar</button>` : ''}
                        </td>
                    </tr>`
                }).join('')
                $('.body-detallerecordatorios').html(html)

                if (alerta.length > 0){
                    let htmlalert = alerta.map((s) => {
                        return `<p><strong>${s.nro_pay} - ${s.company}:</strong> S/. ${s.amount} - Vence hoy ${s.payment_date}</p>`;
                    }).join('')
                    $('.cls-detallenotificacion').html(htmlalert)
                    $('#mdlNotification').modal("show")
                }
            } else {
                sweetError()
            }
        });

    } else {
        sweetAlert()
    }
}

function pagarReminder(id){
    swal({
		type: "question",
		title: `¿Quieres pagar la deuda?`,
		cancelButtonColor: "#FB2C2C",
		showConfirmButton: true,
		showCancelButton: true,
		confirmButtonText: "Si",
		cancelButtonText: "Cancelar",
		closeOnConfirm: false,
	}).then((result) => {
		if (result.value) {
			let url = UrlBaseDetailReminder + "/pay/" + id;
			axios.put(url).then((res) => {
				if (res.status == 200) {
					listReminders();
				} else {
					sweetError()
				}
			}).catch((e) => console.log(e));
		}
	});
}