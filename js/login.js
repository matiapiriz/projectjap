document.addEventListener ("DOMContentLoaded", function(){
    document.getElementById('login').addEventListener('submit',validarForm)
      
   });

    function validarForm(evento){
    evento.preventDefault();

    var correo = document.getElementById("floatingInput").value;
    var contraseña = document.getElementById("floatingPassword").value;

    console.log(correo, contraseña)

    if (correo !== null && contraseña !== null){
        localStorage.email = correo;
        localStorage.password = contraseña;
        localStorage.cart = '[]';
        window.location.replace("index.html")
    }
}
