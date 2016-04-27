var arrayPersonas;

$.ajax({
        url: 'http://api.randomuser.me/?results=5&nat=es',
        dataType: 'json',
        success: function(data){
        	arrayPersonas = data;
      		arrayPersonas.results.forEach(function(elem){
	        	$('#listaContactos').append( '<div class="contacto"' /*id="contacto '+elem.index+*/+'"> <img class="imgProfile centrado" src="'+elem.picture.medium+'"/><p class="text-center">'+primeraLetraMayuscula(elem.name.first)+" "+primeraLetraMayuscula(elem.name.last)+'</p><div>');   
        	})
        }           
})
$('#hora').append( '<p class="text-right"> <span>'+moment().format("dddd, MMMM Do YYYY, h:mm:ss a")+'</span></p>');

function animateMessages(){ 
  	$("#zona-chat").animate({ scrollTop: $('#zona-chat')[0].scrollHeight}, 1000);
 }   	

function enviarMensaje(mensajeParaEnviar){
   $('#zona-chat').append('<div class="mi-mensaje text-right">'+'Yo:<br>'+mensajeParaEnviar.value+'</div>');
   mensajeParaEnviar.value=''; 
   animateMessages();  
}

function mensajeDeOtro(){
  var nombre = arrayPersonas.results[0].name.first || 'Desconocido';
  $('#zona-chat').append('<div class="mensaje-otro text-left">'+primeraLetraMayuscula(arrayPersonas.results[0].name.first)+':<br>'+'¿Quién eres?'+'</div>');
  animateMessages();
}

function primeraLetraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$('#mensajeParaEnviar').on('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      enviarMensaje(mensajeParaEnviar);
      $('#mensajeParaEnviar').value=''; 
      setTimeout(mensajeDeOtro, 2000);           
    }
});
/*
$('.imgProfile').onClick('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      enviarMensaje(mensajeParaEnviar);
      $('#mensajeParaEnviar').value=''; 
      setTimeout(mensajeDeOtro, 2000);           
    }
});*/