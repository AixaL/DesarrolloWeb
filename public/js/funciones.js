if(sessionStorage.getItem('correo')==null){
    document.getElementById('iniciarS').style.display = 'block'
    document.getElementById('cerrarS').style.display = 'none'
    document.getElementById('cor').style.display='none'
}else{
    document.getElementById('iniciarS').style.display = 'none'
    document.getElementById('cerrarS').style.display = 'block'
    document.getElementById('cor').innerHTML = sessionStorage.getItem('correo')
}

function verificar(){
    if (sessionStorage.getItem('correo') == null) {
        alert("Inicia sesion para poder ver más")
    } else {
        document.getElementById('idP').setAttribute('href', '/adopta/perros')
        document.getElementById('idG').setAttribute('href', '/adopta/gatos')
        document.getElementById('idF').setAttribute('href', '/adopta/foro')
       
    }
}