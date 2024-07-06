const UrlBaseLogin = UrlBase + "user";

$("#btnLogin").click(function () {
  let correo = $("#correo").val();
  let pass = $("#pass").val();

  if (correo != "" && pass != "") {
    var data = { correo: correo, pass: pass };
    axios.post(UrlBaseLogin, data).then((res) => {
      if (res.status == 200) {
        var data = res.data;
        setCookie("token", "aprobado", 7);
        localStorage.setItem("usuario", JSON.stringify(data));
        window.location.href = "inicio";
      } else {
        swal({
          type: "error",
          title: "ocurrio un error",
          showConfirmButton: true,
          confirmButtonText: "Cerrar",
        }).then((result) => {});
      }
    });
  } else {
    swal({
      type: "error",
      title: "Datos incompletos",
      showConfirmButton: true,
      confirmButtonText: "Cerrar",
    }).then((result) => {});
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
