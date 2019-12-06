

function registrar(){
    var nombre=document.getElementById('nombre').value;
    var especie = document.getElementById('especie').value;
    var status = document.getElementById('status').value;
    var cuidador = document.getElementById('cuidador').value;
    var dueno = document.getElementById('dueno').value;
    var caract = document.getElementById('caract').value;
    var edad = document.getElementById('edad').value;

    if(nombre==""){
        alert("vacio")
    }


    console.log(nombre,especie,status,cuidador,dueno,caract,edad)

    $.ajax({
            method:'POST',
            url: 'http://localhost:3001/mascotas/agregar',
            data:{
                nombre:nombre,
                especie:especie,
                status:status,
                cuidador:cuidador,
                dueno:dueno,
                caracteristicas:caract,
                edad:edad,
            },
            dataType:'json'
        }).done(function(res){
            console.log(res)
        })

}