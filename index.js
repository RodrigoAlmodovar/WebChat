(function () {

  var arrayPersonas;
  var chatZone =  $('.zona-chat');
  var msgToSend= $('#mensajeParaEnviar');
  $.ajax({
          url: 'http://api.randomuser.me/?results=6&nat=es',
          dataType: 'json',
          success: function(data){
          	arrayPersonas = data;
            var contactList = $('.lista-contactos');
        		arrayPersonas.results.forEach(function(elem){
  	        contactList.append( '<div class="contacto"' /*id="contacto '+elem.index+*/+'"> <img class="imgProfile centrado" src="\
                                          '+elem.picture.medium+'"/><p class="text-center">'+primeraLetraMayuscula(elem.name.first)+" \
                                          "+primeraLetraMayuscula(elem.name.last)+'</p><div>');   
          	})
          }           
  })

  $('#fecha').append( '<p class="text-right"> <span>'+moment().format("dddd, MMMM Do YYYY")+'</span></p>');

  msgToSend.on('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        enviarMensaje(mensajeParaEnviar);
        msgToSend.value=''; 
        setTimeout(mensajeAutomatico, 2000);           
      }
  });

  var animateMessages= function (){ 
    	$(".zona-chat").animate({ scrollTop: chatZone[0].scrollHeight}, 1000);
   }   	

  var enviarMensaje= function (mensajeParaEnviar){
     var stringMessage = mensajeParaEnviar.value; 
     chatZone.append('<div class="contenedor-mensaje col-lg-12 col-md-12 col-sm-12 col-xs-12"> \
                            <div class="mi-mensaje text-right col-lg-12 col-md-12 col-sm-12 col-xs-12" \
                            id="mensajeMio">'+'Yo:<br>'+stringMessage+'<p class="text-left gris-suave">'+moment().format("hh:mm")+'</p></div></div>');
     firebaseJS.insertMsgOnFirebase(stringMessage); 
     mensajeParaEnviar.value='';
     animateMessages();  
  }

  var mensajeDeOtro= function (user, msg){
    chatZone.append('<div class="contenedor-mensaje col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                          <div class="mensaje-otro text-left col-md-12 col-sm-12 col-xs-12" id="mensajeOtros">\
                          '+primeraLetraMayuscula(user)+':<br>'+msg+'<p class="text-right gris-suave">'+moment().format("LT")+'</p>'+'</div>');
    animateMessages();
  }

   var mensajeAutomatico= function (){
    var nombre = arrayPersonas.results[0].name.first || 'Desconocido';
    chatZone.append('<div class="contenedor-mensaje col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                          <div class="mensaje-otro text-left col-md-12 col-sm-12 col-xs-12" id="mensajeOtros">\
                          '+primeraLetraMayuscula(nombre)+':<br>¿Quien eres?<p class="text-right gris-suave">'+moment().format("LT")+'</p>'+'</div>');
    animateMessages();
  }

  var primeraLetraMayuscula = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return indexJS = {
    primeraLetraMayuscula: primeraLetraMayuscula,
    animateMessages: animateMessages,
    enviarMensaje: enviarMensaje,
    mensajeDeOtro: mensajeDeOtro,
    mensajeAutomatico: mensajeAutomatico

  };
})();
