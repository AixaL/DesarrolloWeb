
function sendComment(){
  comment = document.getElementById('comments').value;
  containerForo = document.getElementById('foro');
  containerForo.innerHTML += "<div id='foro'>" + "<p id='comm'>" + "User: &nbsp " + comment + "</p>" + "</div>";
}

