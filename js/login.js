document.addEventListener ("DOMContentLoaded", function(){
    document.getElementById('login').addEventListener('submit',validarForm)
      
   });

    function validarForm(evento){
    evento.preventDefault();

    var correo = document.getElementById("floatingInput").value;
    var contraseña = document.getElementById("floatingPassword").value;

    console.log(correo, contraseña)

    if (correo !== null && contraseña !== null){
        localStorage.nombre = correo;
        localStorage.password = contraseña;
        window.location.replace("index.html")
    }
}
