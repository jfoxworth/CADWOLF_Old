$(function(){

//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('mouseover', '#leftColumnIconsWrapper', function(event) 																			//	\
{	$('#leftColumnTextWrapper').fadeIn('500');																									//	\
});																																				//	\
$(document).on('mouseout', '#leftColumnIconsWrapper, #leftColumnTextWrapper, .leftNavText, .leftNav, #saveFile, #saveFileText, #user, '			//	\
	+'#userText, #logo, #logoText', function(event) 																							//	\
{	if (event.pageX>200){	$('#leftColumnTextWrapper').fadeOut('500');		}																	//	\
});																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------- FACEBOOK INITIALIZATION FUNCTION --------------------------------------------------------//  
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
window.fbAsyncInit = function() 																												//	\
{																																				//	\
	FB.init({																																	//	\
		appId      : '376360529060281',																											//	\
		status     : true, // check login status																								//	\
		cookie     : true, // enable cookies to allow the server to access the session															//	\
		xfbml      : true  // parse XFBML																										//	\
	});																																			//	\
																																				//	\
};																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- LOAD THE FACEBOOK SDK ----------------------------------------------------------------//  
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
  // Load the SDK asynchronously																												//	\
  (function(d){																																	//	\
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];																	//	\
   if (d.getElementById(id)) {return;}																											//	\
   js = d.createElement('script'); js.id = id; js.async = true;																					//	\
   js.src = "//connect.facebook.net/en_US/all.js";																								//	\
   ref.parentNode.insertBefore(js, ref);																										//	\
  }(document));																																	//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
FB.Event.subscribe('auth.authResponseChange', function(response) {																				//	\
   	if (response.status === 'connected') {HandleFaceBook('connected', response.authResponse.userID);											//	\
   	} else if (response.status === 'not_authorized') {	HandleFaceBook('not');																	//	\
   	} else {HandleFaceBook('none');	}																											//	\
});																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------- FACEBOOK CHECK STATUS ON PAGE LOAD ---------------------------------------------------------//  
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).ready(function(){																													//	\
	$('#Create_Block, #Login_Block').show();	$('#Default_Block').hide();																		//	\
	FB.init({																																	//	\
		appId      : '376360529060281',																											//	\
		status     : true, // check login status																								//	\
		cookie     : true, // enable cookies to allow the server to access the session															//	\
		xfbml      : true  // parse XFBML																										//	\
	});																																			//	\
																																				//	\
	FB.getLoginStatus(function(response) {																										//	\
		if (response.status==='connected') {HandleFaceBook('connected', response.authResponse.userID);											//	\
		} else if (response.status==='not_authorized') {	HandleFaceBook('not');																//	\
		} else {HandleFaceBook('none');	}																										//	\
	});																																			//	\
});																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
		
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------- DISPLAYS THE APPROPRIATE FACEBOOK MESSAGE -------------------------------------------------------//  
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
function HandleFaceBook(type, fbID) {																											//	\--- When the user has been identified to be logged into
    if (type=="connected")																														//	\
    {																																			//	\
        var getUser = fbUser(function(model){																									//	\
	       	var user=GrabUserInfo(model.id);																									//	\
			$('#fbdata').attr('username',model.name);																							//	\
			$('#fbdata').attr('userid',model.id);																								//	\
			if (user=='0')																														//	\
			{	var text='<div id="fbtext">You are Logged on to facebook using an account not linked to CADWOLF. Click the button below to ';	//	\
   				text=text+'create an account tied to this user. By linking your CADWOLF account to your facebook account, you only need to ';	//	\
   				text=text+'supply a user name.';																								//	\
				text=text+'Note that CADWOLF uses only your name, gender, and time zone. We neither ';											//	\
				text=text+'request nor use your friends list or other information.</div>';														//	\
   				text=text+'<div id="fb_link">Create account with "'+model.name+'"</div>';														//	\
				$('#facebook_data').html(text);																									//	\
       			var text='<div>You are logged on to facebook as the user "'+model.name+'." If the ';											//	\
    		   	text=text+'remaining info is filled out correctly, you will see a box below to create ';										//	\
    		   	text=text+'a CADWOLF account linked to this facebook account.</div>';															//	\
				$('#create_facebook').html('');  	  																							//	\
   				$('#create_facebook').attr('valid','1');																						//	\
   				$('#login3').hide();																											//	\
			}else																																//	\
			{	var text='<div id="fbtext">You are Logged on to facebook with an account linked ';												//	\
   				text=text+'to the CADWOLF user "'+user+'". </div>';																				//	\
   				text=text+'<div id="fb_connected" userid="'+user+'">Log in as '+user+'</div>';													//	\
   				$('#facebook_data').html(text);																									//	\
				var text='<div id="fbtext">You are Logged on to facebook as "'+model.name+'" ';													//	\
   				text=text+'which is already tied to the CADWOLF user "'+user+'". You must log off ';											//	\
   				text=text+'facebook and log back on as another user to create an account.</div>';												//	\
 				$('#create_facebook').html(text);																								//	\
   				$('#create_facebook').attr('valid','0');																						//	\
   				$('#login3').hide();																											//	\
			}																																	//	\
    	});																																		//	\
    }else if (type=="not")																														//	\
	{	var text='<div id="fbtext">You are logged into facebook as a user that has not logged into ';											//	\
		text=text+'this website before. Click the button below to approve this app for your facebook ';											//	\
		text=text+'profile. Note that CADWOLF uses only ';																						//	\
		text=text+'your name, gender, and time zone. We neither request nor use your friends list or ';											//	\
		text=text+'other information.</div>';																									//	\
		$('#facebook_data').html(text);																											//	\
		$('#create_facebook').attr('valid','1');																								//	\
		$('#login3').hide();																													//	\
		$('#create_facebook').html('');  											  															//	\
    }else if (type=="none")																														//	\
    {																																			//	\
       	var text='<div id="fbtext">You are not logged in to facebook. Clicked the link below to log ';											//	\
       	text=text+'into facebook, and then log into CADWOLF through an associated account.</div>';												//	\
		$('#facebook_data').html(text);    																										//	\
       	var text='<div>You are not logged in to facebook. Clicked the link below to log ';														//	\
       	text=text+'into facebook.</div>';																										//	\
		$('#create_facebook').html('');  	  																									//	\
		$('#create_facebook').attr('valid','1');																								//	\
//		$('#login3').show();																													//	\
//		$('#create_facebook').attr('valid','0');																								//	\
}	}																																			//	\
function fbUser(callback){ FB.api('/me', function(response){ callback(response); });}															//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
/*	This is the case where the user is logged into facebook with the app and is offered to create a CAD Wolf account linked to this facebook 		\
	account. The code ensures that if the user entered an email and password that the repeat of those two matched. It also ensures that the 		\
	user name is entered. When those items are OK, it calls the function to create a new user based on this data.									\
//-------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '#fb_link', function(event){  																							//	\
	var address=''; var flag=1;																													//	\
	if (!$('#UserUsername').val())																												//	\
	{	flag=0;																																	//	\
		$('#facebook_error').html('You must enter a user name.');																				//	\ 
	}																																			//	\
	if ($('#UserPassword').val()!=$('#UserRepeatPassword').val())																				//	\
	{	flag=0;																																	//	\
		$('#facebook_error').html('The passwords entered did not match.');																		//	\
	}																																			//	\
	if ($('#UserEmail').val()!=$('#UserRepeatEmail').val())																						//	\
	{	flag=0;																																	//	\
		$('#facebook_error').html('The emails entered did not match.');																			//	\
	}																																			//	\
																																				//	\
	if (flag==1)																																//	\
	{																																			//	\
		FB.getLoginStatus(function(response) {																									//	\
			if (response.status==='connected') 																									//	\
			{	var image='';	var address='';																									//	\
				FB.api('/me/picture?width=180&height=180', function(response) { image=response.data.url; });									//	\
				FB.api('/me', {fields: "id, first_name, last_name, gender, username"}, function(response) {										//	\
					$.ajax ({																													//	\
				   		type:"POST",																											//	\
				    	url:"/Users/CreateFBUser",																								//	\
						async: false,																											//	\
						data: { 																												//	\
								username:$('#UserUsername').val(),																				//	\
								email:$('#UserEmail').val(),																					//	\
								password:$('#UserPassword').val(),																				//	\
								firstname:response.first_name,																					//	\
								lastname:response.last_name,																					//	\
								fbid:response.id,																								//	\
								image:image,																									//	\
								fbusername:response.name,																						//	\
								gender:response.gender,																							//	\
								timezone:$('#UserTimeZone').find(":selected").text()															//	\
						},																														//	\
						success: function(data) {																								//	\
							if (data=='0')																										//	\
							{																													//	\
								$('#facebook_error').html('The user name you entered is already in use.');										//	\
							}else																												//	\
							{	$.ajax ({																										//	\
			   						type:"POST", url:"/Users/LoginUser", async: false,															//	\
									data: { id:response.id	},																					//	\
									success: function(thisdata) {																				//	\
										thisdata=JSON.parse(thisdata);																			//	\
										thisdata=thisdata['name'].replace(" ","_");																//	\
										address='http://www.cadwolf.com/Workspaces/'+thisdata;													//	\
										window.location.href=address;																			//	\
									}																											//	\	
								});																												//	\
							}																													//	\
						},																														//	\	
					    error: function () { alert('There was an error logging in through facebook.');}											//	\
					});																															//	\
				});																																//	\
			}																																	//	\
		});																																		//	\
	}																																			//	\
});																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
/*	This is the case where the user has been found to be linked to an existing account and has chosen to log into CAD Wolf.							\
//-------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '#fb_connected', function(event){ 																						//	\
	var address='';																																//	\
	FB.getLoginStatus(function(response) {																										//	\
		if (response.status==='connected') 																										//	\
		{	var thisuser=response.authResponse.userID;																							//	\
			FB.api('/me/picture?width=180&height=180', function(response) { image=response.data.url; 											//	\
				$.ajax ({																														//	\
			   		type:"POST",																												//	\
			    	url:"/Users/LoginUser",																										//	\
					async: false,																												//	\
					data: { id:thisuser, image:image	},																						//	\
					success: function(data) {																									//	\
						data=JSON.parse(data);																									//	\
						data=data['name'].replace(" ","_");																						//	\
						address='http://www.cadwolf.com/Workspaces/'+data;																		//	\
						window.location.assign(address);																						//	\
					},																															//	\	
				    error: function () { alert('There was an error logging in through facebook.');}												//	\
				});																																//	\
			});																																	//	\
		}																																		//	\
	});																																			//	\
});																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------- GET THE FACEBOOK USER INFO ------------------------------------------------------------//  
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
/*	When the user has been identified to be logged into facebook, this function grabs its information. an ajax function to see of this facebook 	\
	ID is fixed to a known account. It returns a 0 or the id of the associated CADWolf account.														\
//-------------------------------------------------------------------------------------------------------------------------------------------------*/
function GrabUserInfo(id) {																														//	\
	var image=''; var returnstring='';																											//	\ 
		$.ajax ({																																//	\ 
	   		type:"POST",																														//	\
	    	url:"/Users/TestUser",																												//	\
			async: false,																														//	\
			data: { id:id	},																													//	\
			success: function(data) {	returnstring=data;	},																					//	\
	       	error: function () { alert('There was an error Testing the user.');}																//	\
		});																																		//	\
	return returnstring;																														//	\
}																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
		
//    FB.api('/me/picture?width=180&height=180', function(response) { image=response.data.url; });		//	\
//    FB.api('/me', {fields: "id, first_name, last_name, gender, username"}, function(response) {		//	\
//		response.image=image;																			//	\


//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('keyup', '.droplogin', function(e){		 																					//	\
		if ((e.keyCode == 13)||(e.which == 13))																									//	\
		{	var name=$('#dropname').html();		var pass=$('#droppass').html();																	//	\
			$.ajax ({																															//	\
		   		type:"POST",																													//	\
		    	url:"/Users/LoginUser2",																										//	\
				async: false,																													//	\
				data: { name:name, pass:pass	},																								//	\
				success: function(data) {																										//	\
				},																																//	\	
			    error: function () { alert('There was an error logging in.');}																	//	\
			});																																	//	\
		}																																		//	\
	});																																			//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------- WHEN A NEW ACCOUNT PIECE OF INFO CHANGES ------------------------------------------------------//  
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
$("#create_username, #create_pass, #create_pass2, #create_email, #create_firstname, #create_lastname").on('change keyup',function(e)			//	\
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))||(e.type=="change")) 															//	\
	{ 	Check_Account();	}																													//	\
});																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------ CHECK NEW ACCOUNT PARAMETERS -------------------------------------------------------------//  
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
/*	This function looks at all the inputs for a user and if they are appropriate to create a new user, then the create user button is shown. The 	\
	user name is checked first. The name is read in and any leading or trailing spaces are removed. Then the following tests are performed:			\
	The name must have only letters, numbers, and spaces																							\
	The name must be at least 5 characters																											\
	The name cannot be a duplicate																													\
	The two entries for the password are checked next.																								\
	The two passwords must match and their length must be greater than 5 characters																	\
	The email must match the designated pattern																										\
	The email cannot be a duplicate																													\
//-------------------------------------------------------------------------------------------------------------------------------------------------*/
function Check_Account() 																														//	\ 
{	var flag1=0; 		var flag2=0; var flag3=0; var flag4=0;	var flag5=0; var flag6=0; 														//	\
	var duplicate=0;	var ret=0;																												//	\
	var fb=$('#create_facebook').attr('valid');																									//	\
	$('#name_error, #pass_error1, #pass_error2, #email_error, #name_duplicate').hide();															//	\
	$('#cu1, #cu2, #cu3, #cu4').addClass('left_error');																							//	\
																																				//	\
	var text=$("#create_username").val();																										//	\
	var name=text.replace(/\s+$/, '').replace(/^\s/,'');																						//	\
	var re=/[a-z,A-Z,0-9,\s]+/;																													//	\
	var testname=name.match(re);																												//	\
	if (testname==name){ flag1=1; $('#cu1').removeClass('left_error'); 																			//	\
	}else { if (name.length>0) { $('#name_error').show(); flag=0;} }																			//	\
	if (name.length>=5){ 	flag1=1;  																											//	\
	}else {  if (name.length>0){ $('#cu1').addClass('left_error'); $('#name_error').show(); flag1=0; } }										//	\
	if (flag1==1)																																//	\
	{	$.ajax ({ type:"POST",	url:"/Users/TestName",async: false, data: { name:name	},   													//	\
			success: function(data) {duplicate=data},error: function () 																		//	\
			{ alert('There was an error checking the user name.');}	});																			//	\
		if (duplicate==1){ flag1=1;  																											//	\
		}else { flag1=0; if (name.length>0) { $('#name_duplicate').show();}	}																	//	\
	}																																			//	\
																																				//	\
	var pass1=$("#create_pass").val();																											//	\
	if (pass1.length>=5){ flag2=1; $('#cu2').removeClass('left_error');																			//	\
	}else{ if (pass1.length>0) { $('#pass_error1').show(); } }																					//	\
	var pass2=$("#create_pass2").val();																											//	\	
	if (pass1==pass2){ flag3=1; $('#cu3').removeClass('left_error'); 																			//	\
	}else { flag2=0; if (pass2.length>0) { $('#pass_error2').show(); } }																		//	\
																																				//	\
	var email=$("#create_email").val();																											//	\	
//	var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;																							//	\
	var pattern = /^[a-zA-Z0-9\_\.\-\!]+@[0-9a-zA-Z_]+?\.[0-9a-zA-Z]{2,3}$/;																	//	\
	var pattern2 = /^[a-zA-Z0-9\_\.\-\!]+@[0-9a-zA-Z_]+?\.[0-9a-zA-Z_]+?\.[0-9a-zA-Z]{2,3}$/;													//	\
	var pattern3 = /^[a-zA-Z0-9\_\.\-\!]+@[0-9a-zA-Z_]+?\.[0-9a-zA-Z_]+?\.[0-9a-zA-Z_]+?\.[0-9a-zA-Z]{2,3}$/;      								//	\
	var testname=email.match(pattern);																											//	\
	var testname2=email.match(pattern2);																										//	\
	var testname3=email.match(pattern3);																										//	\
	if ((testname==email)||(testname2==email)||(testname3==email)) 																				//	\
	{	$.ajax ({ type:"POST",	url:"/Users/TestEmail",async: false, data: { name:email	},   													//	\
			success: function(data) {duplicate=data},error: function () 																		//	\
			{ alert('There was an error checking the email.');}	});																				//	\
		if (duplicate==1){ flag4=1;  $('#cu4').removeClass('left_error');	$('#email_error2').hide();											//	\
		}else { flag4=0; if (email.length>0) { $('#email_error2').show();}	}																	//	\
	}else { if (email.length>0) { $('#email_error').show(); } }																					//	\
																																				//	\
	var fname=$("#create_firstname").val();																										//	\	
	var pattern=/^[a-zA-Z-\']+$/;																												//	\
	var testname=fname.match(pattern);																											//	\
	if ((testname==fname)&&(fname.length>0)){ flag5=1; $('#cu5').removeClass('left_error'); 													//	\
	}else{ if (fname.length>0) { $('#firstname_error').show(); } }																				//	\
	var lname=$("#create_lastname").val();																										//	\	
	var pattern=/^[a-zA-Z-\']+$/;																												//	\
	var testname=lname.match(pattern);																											//	\
	if ((testname==lname)&&(lname.length>0)){ flag6=1; $('#cu6').removeClass('left_error'); 													//	\
	}else{ if (lname.length>0) { $('#lastname_error').show(); } }																				//	\
																																				//	\
	if ((flag1==1)&&(flag2==1)&&(flag3==1)&&(flag4==1)&&(flag5==1)&&(flag6==1)&&(fb==1))														//	\
	{	$('#create_button').show();		ret=1;	}else { $('#create_button').hide(); }															//	\
console.log('The flags are '+flag1+', '+flag2+', '+flag3+', '+flag4+', '+flag5+', '+flag6+', '+fb);												//	\
	return ret;																																	//	\
}																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------- ADD NEW USER ACCOUNT ----------------------------------------------------------------//  
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
/*
//-------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '#create_button', function(event)																						//	\
{	var test=Check_Account();																													//	\
	if (test==1)																																//	\ 
	{	var name=$("#create_username").val().replace(/\s+$/, '').replace(/^\s/,'');																//	\
		var pass=$("#create_pass").val();																										//	\
		var email=$("#create_email").val();																										//	\
		var fname=$('#create_firstname').val().replace(/\s+$/, '').replace(/^\s/,'');															//	\
		var lname=$('#create_lastname').val().replace(/\s+$/, '').replace(/^\s/,'');															//	\
		var fbid=$('#fbdata').attr('userid');																									//	\
		var fbname=$('#fbdata').attr('username');																								//	\
		$.ajax ({																																//	\
			type:"POST",																														//	\
			url:"/Users/CreateUser",																											//	\
			data: { name:name, pass:pass, email:email, fname:fname, lname:lname, fbid:fbid, fbname:fbname},										//	\
			success: function(data) {																											//	\
				data=JSON.parse(data);																											//	\
				data=String(data['name']);																										//	\
				data=data.replace(/\s/g,"_");																									//	\
				address='http://www.cadwolf.com/Profiles/'+data;																				//	\
				window.location.assign(address);																								//	\
			},																																	//	\	
		    error: function () { alert('There was an error creating an account.');}																//	\
		});																																		//	\
	}																																			//	\
});																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- KEEP TRACK OF THE LOGIN PARAMETERS ----------------------------------------------------------//  
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
$("#login_name").on('change keyup',function(e)																									//	|
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))||(e.type=="change")) 															//	|
	{ 	var name=$("#login_name").val();																										//	|
		$.ajax ({ type:"POST",	url:"/Users/TestActive",async: false, data: { name:name	},   													//	|
			success: function(data) {active=data},error: function () 																			//	|
			{ alert('There was an error checking the user name.');}	});																			//	|
		if (active==0)                                                                                                                          //  |
        {   $('#login_inactive').show();                                                                                                        //  |
            $('#loginsubmit').hide(); 	                                                                                                        //  |
            $('#login_noname').hide();                                                                  										//	|
            $('#login_name').closest('.form-group').addClass('has-error');                                                                      //	|
		}else if (active==1)                                                                                                                    //  |
        {   $('#login_inactive').hide();                                                                                                        //  |
            $('#login_noname').hide();                                                                                                          //  |
            $('#loginsubmit').show();                                                                                                           //  |
            $('#login_name').closest('.form-group').removeClass('has-error');	                                                                //	|
		}else if (active==2)                                                                                                                    //  |
        {   $('#login_inactive').hide();                                                                                                        //  |
            $('#loginsubmit').hide();                                                                                                           //  |
            $('#login_noname').show();                                                                  										//	|
            $('#login_name').closest('.form-group').addClass('has-error');                                                                      //	|
        }																																		//	|
	}																																			//	|
});																																				//	|
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- KEEP TRACK OF THE LOGIN PARAMETERS ----------------------------------------------------------//  
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
$("#passReset").on('keyup',function(e)																											//	\
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))) 																				//	\
	{ 	var email=$("#passReset").val();																										//	\
		$("#passReset1").hide();                          		                               													//	\
		$("#passReset2").hide(); 	                                                               												//	\
		$.ajax ({ type:"POST",	url:"/Users/resetPass", data: { email:email	},  			 													//	\
			success: function(data) 																											//	\
			{	if (data=="1"){ $("#passReset1").show(); }		                               													//	\
				if (data=="0"){ $("#passReset2").show(); }	                                     												//	\
			},																																	//	\
			error: function () { alert('There was an error checking that email.');}																//	\
		});																																		//	\
	}																																			//	\
});																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//

});
