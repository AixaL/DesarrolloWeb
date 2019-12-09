
sessionStorage.clear()
function registrar() {
  nombre = document.getElementById('nombre').value;
  password = document.getElementById('psswd').value;
  passwordC = document.getElementById('psswdC').value;
  correo = document.getElementById('correo').value;
  dir = document.getElementById('dir').value;
  apellido = document.getElementById('apellido').value;
  estado = document.getElementById('estado').value;
  ciudad = document.getElementById('ciudad').value;
  fecha = document.getElementById('fecha').value;

  if (nombre == "" || apellido == "" || ciudad == "" || fecha == ""||
    estado == "" || password == "" || passwordC == "" || correo == "" || dir == "" || estado == ""){
      alert("completa los campos")
    }else{
      if(passwordC!=password){
        alert("las contraseñas no coinciden")
      }else{
        $.ajax({
          method: 'POST',
          url: 'http://localhost:3001/usuarios/agregar',
          data: {
            nombre: nombre,
            password: password,
            tipo: 1,
            correo:correo,
            apellido: apellido,
            ciudad: ciudad,
            estado: estado,
            fechaNac: fecha,
            direccion: dir
          },
          dataType: 'json',
          // error: function (xhr, status, error) {
          //   alert(xhr.responseJSON.message+' Correo ya registrado')
          // }
        }).done(function (res) {
          if(res.code==1){
            alert('Registrado correctamente')
            sessionStorage.setItem('correo',correo)
            window.location = 'http://localhost:3001/adopta'
          }
          console.log(res)
        })
      }
    }
}

