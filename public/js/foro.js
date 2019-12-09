function sendComment(){
  comment = document.getElementById('comments').value;
  containerForo = document.getElementById('foro');
  containerForo.innerHTML += "<div id='foro'>" + "<p id='comm'>" + "User: &nbsp " + comment + "</p>" + "</div>";

  if(comment==""){
    alert('Escriba algun mensaje')
  }else{
    let current_datetime = new Date()
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-0" + current_datetime.getDate()
    console.log(formatted_date)
     $.ajax({
       method: 'POST',
       url: 'http://localhost:3001/foro/agregar',
       data: {
         persona: sessionStorage.getItem('id'),
         comentario: comment,
         status: 1,
         foro: 1,
         fecha: formatted_date,
       },
       dataType: 'json',
       // error: function (xhr, status, error) {
       //   alert(xhr.responseJSON.message+' Correo ya registrado')
       // }
     }).done(function (res) {
       if (res.code == 1) {
      
       }
       console.log(res)
     })
  }

}
comentarios()




function comentarios(){
setTimeout(function () {
  let current_datetime = new Date()
  let diaM = current_datetime.getDate() - 1
  let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-0" + current_datetime.getDate();
  let formatted_date2 = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-0" + diaM;
  console.log(formatted_date2)
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3001/foro/todos',
    data: {
      fechaHoy: formatted_date,
      fechaAyer: formatted_date2,
    },
    dataType: 'json',
    // error: function (xhr, status, error) {
    //   alert(xhr.responseJSON.message+' Correo ya registrado')
    // }
  }).done(function (res) {
    if (res.code == 1) {
      containerForo = document.getElementById('foro');
      for(let x=0; x<res.message.length; x++){
      containerForo = document.getElementById('foro');
      containerForo.innerHTML += "<div id='foro'>" + "<p id='comm'>" + `Usuario:${res.message[x].nombre}` + res.message[x].comentario + "</p>" + "</div>";
      }
      
    }
    console.log(res)
  })

  // comentarios()
  }, 1000)
}
 


