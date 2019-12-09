sessionStorage.clear()
function login() {
  correo = document.getElementById('correo').value;
  password = document.getElementById('psswd').value;

  if(correo=="" || password==""){
    alert('completa los campos')
  }else{
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3001/usuarios/login',
      data: {
        password: password,
        correo: correo,
      },
      dataType: 'json',
      // error: function (xhr, status, error) {
      //   alert(xhr.responseJSON.message+' Correo ya registrado')
      // }
    }).done(function (res) {
      // console.log(res.data[0].idPersona)
      if (res.code == 1) {
        // alert('')
        sessionStorage.setItem('correo', correo)
        sessionStorage.setItem('id', res.data[0].idPersona)
        window.location = 'http://localhost:3001/adopta'
      }
      console.log(res.code)
    })
  }

}
