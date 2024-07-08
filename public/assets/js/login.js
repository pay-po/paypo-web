const UrlBaseUser = UrlBase + "user";

$("#btnLogin").click(function () {
	let correo = $("#correo").val();
	let pass = $("#pass").val();

	if (correo != "" && pass != "") {
		var data = { correo: correo, pass: pass };
		axios.post(UrlBaseUser, data).then((res) => {
			if (res.status == 200) {
				var data = res.data[0];
				setCookie("token", "aprobado", 7);
				localStorage.setItem("usuario", JSON.stringify(data));
				window.location.href = "inicio";
			} else {
				sweetError();
			}
		});
	} else {
		swal({
			type: "error",
			title: "Datos incompletos",
			showConfirmButton: true,
			confirmButtonText: "Cerrar",
		}).then((result) => { });
	}
});

$("#btnRegister").click(function () {
	var name = $("#addnombre").val();
	var lastName = $("#addapellidos").val();
	var email = $("#addemail").val();
	var pass = $("#addpassword").val();

	if (name != '' && lastName != '' && email != '' && pass != '') {
		var data = { email: email, pass: pass, name: name, lastName: lastName };
		axios.post(UrlBaseUser + '/register', data).then((res) => {
			if (res.status == 201) {
				swal({
					type: "success",
					title: "Registro exitoso",
					showConfirmButton: true,
					confirmButtonText: "Cerrar",
				}).then((result) => {
					$("#addnombre").val("");
					$("#addapellidos").val("");
					$("#addemail").val("");
					$("#addpassword").val("");
					$("#registerModal").modal("hide");
				});
			} else {
				swal({
					type: "error",
					title: "ocurrio un error",
					showConfirmButton: true,
					confirmButtonText: "Cerrar",
				}).then((result) => { });
			}
		});
	} else {
		swal({
			type: "error",
			title: "ocurrio un error",
			showConfirmButton: true,
			confirmButtonText: "Cerrar",
		}).then((result) => { });
	}

});


function setCookie(nombre, valor, expiracion) {
	const fechaExpiracion = new Date();
	fechaExpiracion.setTime(
		fechaExpiracion.getTime() + expiracion * 24 * 60 * 60 * 1000
	);
	const expiracionUTC = fechaExpiracion.toUTCString();
	const cookieString = `${nombre}=${valor}; expires=${expiracionUTC}; path=/`;
	document.cookie = cookieString;
}
