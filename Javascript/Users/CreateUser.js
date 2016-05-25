$(function(){

//---------------------------------------------------------------------------------------------------------//  
//------------------------------ FACEBOOK INITIALIZATION FUNCTION -----------------------------------------//  
//---------------------------------------------------------------------------------------------------------//  
window.fbAsyncInit = function() 																		//	\
{																										//	\
//	FB.init({																							//	\
//		appId      : '376360529060281',																	//	\
//		status     : true, // check login status														//	\
//		cookie     : true, // enable cookies to allow the server to access the session					//	\
//		xfbml      : true  // parse XFBML																//	\
//	});																									//	\
																										//	\
};																										//	\
//---------------------------------------------------------------------------------------------------------//  


//---------------------------------------------------------------------------------------------------------//  
//------------------------------------ LOAD THE FACEBOOK SDK ----------------------------------------------//  
//---------------------------------------------------------------------------------------------------------//  
  // Load the SDK asynchronously																		//	\
  (function(d){																							//	\
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];							//	\
   if (d.getElementById(id)) {return;}																	//	\
   js = d.createElement('script'); js.id = id; js.async = true;											//	\
   js.src = "//connect.facebook.net/en_US/all.js";														//	\
   ref.parentNode.insertBefore(js, ref);																//	\
  }(document));																							//	\
//---------------------------------------------------------------------------------------------------------//  

//---------------------------------------------------------------------------------------------------------//  
//---------------------------------------------------------------------------------------------------------//  
//---------------------------------------------------------------------------------------------------------//  
FB.Event.subscribe('auth.authResponseChange', function(response) {										//	\
   	if (response.status === 'connected') {HandleFaceBook('connected', response.authResponse.userID);	//	\
   	} else if (response.status === 'not_authorized') {	HandleFaceBook('not');							//	\
   	} else {HandleFaceBook('none');	}																	//	\
});																										//	\
//---------------------------------------------------------------------------------------------------------//  

//---------------------------------------------------------------------------------------------------------//  
//--------------------------------- FACEBOOK CHECK STATUS ON PAGE LOAD ------------------------------------//  
//---------------------------------------------------------------------------------------------------------//  
$(document).ready(function(){																			//	\
   	var text='<div id="fbtext">You are not logged in to facebook. Clicked the link below to log ';		//	\
    text=text+'in to facebook. Once logged in to facebook, you can log in to CAD Wolf through an ';		//	\
    text=text+'associated account.</div>';																//	\
   	$('#facebook_data').html(text);																		//	\
																										//	\
	FB.init({																							//	\
		appId      : '376360529060281',																	//	\
		status     : true, // check login status														//	\
		cookie     : true, // enable cookies to allow the server to access the session					//	\
		xfbml      : true  // parse XFBML																//	\
	});																									//	\
																										//	\
	FB.getLoginStatus(function(response) {																//	\
		if (response.status==='connected') {HandleFaceBook('connected', response.authResponse.userID);	//	\
		} else if (response.status==='not_authorized') {	HandleFaceBook('not');						//	\
		} else {HandleFaceBook('none');	}																//	\
	});																									//	\
});																										//	\
//---------------------------------------------------------------------------------------------------------//  
		

//---------------------------------------------------------------------------------------------------------//  
//---------------------------- DISPLAYS THE APPROPRIATE FACEBOOK MESSAGE ----------------------------------//  
//---------------------------------------------------------------------------------------------------------//  
function HandleFaceBook(type) {																			//	\--- When the user has been identified to be logged into
    if (type=="connected")																				//	\
    {																									//	\
        var getUser = fbUser(function(model){															//	\
	       	var user=GrabUserInfo(model.id);															//	\
			if (user=='0')																				//	\
			{	var text='<div id="fbtext">You are Logged on to facebook as "'+model.username+'". ';	//	\
   				text=text+'Click the button below to create an account tied to this user. By linking ';	//	\
   				text=text+'your CAD Wolf account to your facebook account, you only need to supply a ';	//	\
				text=text+'user name. ';																//	\
				text=text+'Note that CAD Wolf uses only your name, gender, and time zone. We neither ';	//	\
				text=text+'request nor use your friends list or other information.</div>';				//	\
   				text=text+'<div id="fb_link">Create account with "'+model.username+'"</div>';			//	\
   				$('#facebook_data').html(text);															//	\
			}else																						//	\
			{	var text='<div id="fbtext">You are Logged on to facebook as "'+model.username+'" ';		//	\
   				text=text+'which is tied to the CAD Wolf user "'+user+'". Only one CAD Wolf account ';	//	\
   				text=text+'can be created per facebook account.</div>';									//	\
   				text=text+'<div id="fb_connected" userid="'+user+'">Log in as '+user+'</div>';			//	\
   				$('#facebook_data').html(text);															//	\
			}																							//	\
    	});																								//	\
    }else if (type=="not")																				//	\
	{	var text='<div id="fbtext">You are logged into facebook as a user that has not logged into ';	//	\
		text=text+'this website before. Click the button below to approve this app for your facebook ';	//	\
		text=text+'profile and create a CAD Wolf account linked to it. Note that CAD Wolf uses only ';	//	\
		text=text+'your name, gender, and time zone. We neither request nor use your friends list or ';	//	\
		text=text+'other information.</div>';															//	\
		$('#facebook_data').html(text);																	//	\
    }else if (type=="none")																				//	\
    {																									//	\
       	var text='<div id="fbtext">You are not logged in to facebook. Clicked the link below to log ';	//	\
       	text=text+'into facebook. and then log into CAD Wolf through an associated account.</div>';		//	\
		$('#facebook_data').html(text);    																//	\
}	}																									//	\
function fbUser(callback){ FB.api('/me', function(response){ callback(response); });}					//	\
//---------------------------------------------------------------------------------------------------------//  


//---------------------------------------------------------------------------------------------------------//  
//---------------------------------------------------------------------------------------------------------//  
//---------------------------------------------------------------------------------------------------------//  
$(document).on('click', '#fb_link', function(event){  													//	\--- This is the case where the user is logged into facebook with the app
	var address=''; var flag=1;																			//	\--- and is offered to create a CAD Wolf account linked to this facebook
	if (!$('#UserUsername').val())																		//	\--- account. The code ensures that if the user entered an email and password
	{	flag=0;																							//	\--- that the repeat of those two matched. It also ensures that the user name
		$('#facebook_error').html('You must enter a user name.');										//	\--- is entered. When those items are OK, it calls the function to create a 
	}																									//	\--- new user based on this data.
	if ($('#UserPassword').val()!=$('#UserRepeatPassword').val())										//	\
	{	flag=0;																							//	\
		$('#facebook_error').html('The passwords entered did not match.');								//	\
	}																									//	\
	if ($('#UserEmail').val()!=$('#UserRepeatEmail').val())												//	\
	{	flag=0;																							//	\
		$('#facebook_error').html('The emails entered did not match.');									//	\
	}																									//	\
																										//	\
	if (flag==1)																						//	\
	{																									//	\
		FB.getLoginStatus(function(response) {															//	\
			if (response.status==='connected') 															//	\
			{	var image='';	var address='';															//	\
				FB.api('/me/picture?width=180&height=180', function(response) { image=response.data.url; });
				FB.api('/me', {fields: "id, first_name, last_name, gender, username"}, function(response) {	
					$.ajax ({																			//	\
				   		type:"POST",																	//	\
				    	url:"/Users/CreateFBUser",														//	\
						async: false,																	//	\
						data: { 																		//	\
								username:$('#UserUsername').val(),										//	\
								email:$('#UserEmail').val(),											//	\
								password:$('#UserPassword').val(),										//	\
								firstname:response.first_name,											//	\
								lastname:response.last_name,											//	\
								fbid:response.id,														//	\
								image:image,															//	\
								fbusername:response.username,											//	\
								gender:response.gender,													//	\
								timezone:$('#UserTimeZone').find(":selected").text()					//	\
						},																				//	\
						success: function(data) {														//	\
							if (data=='0')																//	\
							{																			//	\
								$('#facebook_error').html('The user name you entered is already in use.');	//	\
							}else																		//	\
							{	$.ajax ({																//	\
			   						type:"POST", url:"/Users/LoginUser", async: false,					//	\
									data: { id:response.id	},											//	\
									success: function(thisdata) {										//	\
										thisdata=JSON.parse(thisdata);									//	\
										thisdata=thisdata['name'].replace(" ","_");						//	\
										address='http://www.cadwolf.com/Workspaces/'+thisdata;			//	\
										window.location.href=address;									//	\
									}																	//	\	
								});																		//	\
							}																			//	\
						},																				//	\	
					    error: function () { alert('There was an error logging in through facebook.');}	//	\
					});																					//	\
				});																						//	\
			}																							//	\
		});																								//	\
	}																									//	\
});																										//	\
//---------------------------------------------------------------------------------------------------------//  


//---------------------------------------------------------------------------------------------------------//  
//---------------------------------------------------------------------------------------------------------//  
//---------------------------------------------------------------------------------------------------------//  
$(document).on('click', '#fb_connected', function(event){ 												//	\--- This is the case where the user has been found to be
	var address='';																						//	\--- linked to an existing account and has chosen to log
	FB.getLoginStatus(function(response) {																//	\--- into CAD Wolf.
		if (response.status==='connected') 																//	\
		{	var thisuser=response.authResponse.userID;													//	\
			FB.api('/me/picture?width=180&height=180', function(response) { image=response.data.url; 	
console.log('The image is '+image);
				$.ajax ({																				//	\
			   		type:"POST",																		//	\
			    	url:"/Users/LoginUser",																//	\
					async: false,																		//	\
					data: { id:thisuser, image:image	},												//	\
					success: function(data) {															//	\
						data=JSON.parse(data);															//	\
						data=data['name'].replace(" ","_");												//	\
						address='http://www.cadwolf.com/Workspaces/'+data;								//	\
						window.location.assign(address);												//	\
					},																					//	\	
				    error: function () { alert('There was an error logging in through facebook.');}		//	\
				});																						//	\
			});																							//	\
		}																								//	\
	});																									//	\
});																										//	\
//---------------------------------------------------------------------------------------------------------//  


//---------------------------------------------------------------------------------------------------------//  
//------------------------------- GET THE FACEBOOK USER INFO ----------------------------------------------//  
//---------------------------------------------------------------------------------------------------------//  
function GrabUserInfo(id) {																				//	\--- When the user has been identified to be logged into
	var image=''; var returnstring='';																	//	\--- facebook, this function grabs its information.
		$.ajax ({																						//	\--- an ajax function to see of this facebook ID is fixed
	   		type:"POST",																				//	\--- to a known account. It returns a 0 or the id of the.
	    	url:"/Users/TestUser",																		//	\--- associated CADWolf account.
			async: false,																				//	\
			data: { id:id	},																			//	\
			success: function(data) {	returnstring=data;	},											//	\
	       	error: function () { alert('There was an error Testing the user.');}						//	\
		});																								//	\
	return returnstring;																				//	\
}																										//	\
//---------------------------------------------------------------------------------------------------------//  
		
//    FB.api('/me/picture?width=180&height=180', function(response) { image=response.data.url; });		//	\
//    FB.api('/me', {fields: "id, first_name, last_name, gender, username"}, function(response) {			//	\
//		response.image=image;																			//	\


});
//---------------------------------------------------------------------------------------------------------//  
