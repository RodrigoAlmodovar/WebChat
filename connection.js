(function(){

	var myFirebaseRef = new Firebase("https://blazing-inferno-2751.firebaseio.com/");
	var commonFirebaseRef = new Firebase("https://boiling-fire-3561.firebaseio.com/");
	var lastMsgNumber;
	var actualMsgNumber;
	var user;


	myFirebaseRef.child("chat").on("child_added", function(snapshot){
		lastMsgNumber=parseInt(snapshot.key());
		user=snapshot.val().user;
		if(user!='Rodrigo'){
			msg=snapshot.val().text;
			indexJS.mensajeDeOtro(user, msg);
			indexJS.animateMessages();
		}
	}, function (errorObject) {
  		console.log("The Firebase read failed: " + errorObject.code);
  	})

	var insertMsgOnFirebase = function (stringMessage){
		actualMsgNumber=lastMsgNumber+1;
		var newMessageRef = myFirebaseRef.child('chat/'+actualMsgNumber).set({ "text": stringMessage, "user": "Rodrigo" });
	}
  	return firebaseJS = {
  		insertMsgOnFirebase: insertMsgOnFirebase
  	};
})();