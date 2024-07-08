const UrlBase = "https://paypo-api.vercel.app/api/";
// const UrlBase = "http://localhost:3000/api/";

// function cargarHeader() {
//   $("#headerContainer").load("../../page/header.html");

//   setTimeout(() => {
//     var ruta = window.location.pathname.substring(1);
//     $("#" + ruta).addClass("active");
//   }, 1000);
// }

function loadCabecera(){
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    // console.log(usuario.first_name)
    $('.js-nombrecito').html(usuario.first_name + " " + usuario.last_name);
}

function sweetAlert(){
    swal({
        type: "info",
        title: "Datos incompletos!",
        showConfirmButton: true,
        confirmButtonText: "Cerrar",
    }).then((result) => {});
}

function sweetError(){
    swal({
        type: "error",
        title: "ocurrio un error",
        showConfirmButton: true,
        confirmButtonText: "Cerrar",
    }).then((result) => {
    });
}

function sweetErrorMonto(){
    swal({
        type: "error",
        title: "Error de monto",
        text: "El monto tiene que ser mayor a cero",
        showConfirmButton: true,
        confirmButtonText: "Cerrar",
    }).then((result) => {
    });
}

function sweetSuccessUpdate(){
    swal({
        type: "success",
        title: "Actualización exitosa",
        showConfirmButton: true,
        confirmButtonText: "Cerrar",
    }).then((result) => {
    });
}

function deleteCookie(){
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location = 'login';
}