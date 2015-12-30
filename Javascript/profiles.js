$(function(){
/*
//---------------------------------------------------------------------------------------------------------//  
//------------------------------ FACEBOOK INITIALIZATION FUNCTION -----------------------------------------//  
//---------------------------------------------------------------------------------------------------------//  
window.fbAsyncInit = function() 																		//	\
{																										//	\
	FB.init({																							//	\
		appId      : '376360529060281',																	//	\
		status     : true, // check login status														//	\
		cookie     : true, // enable cookies to allow the server to access the session					//	\
		xfbml      : true  // parse XFBML																//	\
	});																									//	\
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
*/
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------- ON DOCUMENT READY --------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).ready(function(){ 																																//	\
	var temp=$('#userimage').find('img').attr('src');																										//	\
	$('#userimage').css('background-image', 'url('+temp+')');																								//	\
	$('#userimage').find('img').attr('src', '');																											//	\
/*	if ($('#fbid').length>0)																																//	\
	{	FB.init({																																			//	\
			appId      : '376360529060281',																													//	\
			status     : true, // check login status																										//	\
			cookie     : true, // enable cookies to allow the server to access the session																	//	\
			xfbml      : true  // parse XFBML																												//	\
		});																																					//	\
																																							//	\
		FB.getLoginStatus(function(response) {																												//	\
			if (response.status==='connected') {HandleFaceBook('connected', response.authResponse.userID);													//	\
			} else if (response.status==='not_authorized') {	HandleFaceBook('not');																		//	\
			} else {HandleFaceBook('none');	}																												//	\
		});																																					//	\
	}																																						//	\
*/
});																																							//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------- DISPLAYS THE APPROPRIATE FACEBOOK MESSAGE ---------------------------------------------------------//  
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
function HandleFaceBook(type) {																																//	\
    if (type=="connected")																																	//	\
    {	var myid=$('#fbid').attr('fbuid');																													//	\
        var getUser = fbUser(function(model){																												//	\
	       	var user=GrabUserInfo(model.id);																												//	\
			$('#fbdata').attr('username',model.username);																									//	\
			$('#fbdata').attr('userid',model.id);																											//	\
			if (user=='0')																																	//	\
			{																																				//	\--- Logged on, but not linked to account
			}else																																			//	\
			{	var text='<div id="fbtext">You are Logged on to facebook as "'+model.username+'" ';															//	\
   				text=text+'which is tied to the CAD Wolf user "'+user+'". </div>';																			//	\
   				text=text+'<div id="fb_connected" userid="'+user+'">Log in as '+user+'</div>';																//	\
   				$('#facebook_data').html(text);																												//	\
				var text='<div id="fbtext">You are Logged on to facebook as "'+model.username+'" ';															//	\
   				text=text+'which is already tied to the CADWOLF user "'+user+'". You must log off ';														//	\
   				text=text+'facebook and log back on as another user to create an account.</div>';															//	\
   				$('#create_facebook').html(text);																											//	\
   				$('#create_facebook').attr('valid','0');																									//	\
   				$('#login3').hide();																														//	\
			}																																				//	\
    	});																																					//	\
    }else if (type=="not")																																	//	\--- Logged onto facebook as user with no previous CADWOLF
	{	var getUser = fbUser(function(model){ if ($('#fbid').attr('fbuid')=='0') { $('#fbid').html('<div id=fblink fbname="'+model.username+'" fbid="'+model.id+'">Link account to user '+model.username+'</div>'); } });	//	\
    }else if (type=="none")																																	//	\--- Not logged into facebook
    {	if ($('#fbid').attr('fbuid')=='0') { $('#fbid').html('Log on to facebook to link account');	}														//	\--- Prompted to log on to take action if no account linked
    }																																						//	\
}																																							//	\
function fbUser(callback){ FB.api('/me', function(response){ callback(response); });}																		//	\
//---------------------------------------------------------------------------------------------------------//  

//---------------------------------------------------------------------------------------------------------//  
//------------------------------- GET THE FACEBOOK USER INFO ----------------------------------------------//  
//---------------------------------------------------------------------------------------------------------//  
function GrabUserInfo(id) {																				//	\--- When the user has been identified to be logged into
	var image=''; var returnstring='';																	//	\--- facebook, this function grabs its information.
		$.ajax ({																						//	\--- an ajax function to see of this facebook ID is fixed
	   		type:"POST",																				//	\--- to a known account. It returns a 0 or the id of the.
	    	url:"/Users/TestUser",																		//	\--- associated CADWOLF account.
			async: false,																				//	\
			data: { id:id	},																			//	\
			success: function(data) {	returnstring=data;	},											//	\
	       	error: function () { alert('There was an error Testing the user.');}						//	\
		});																								//	\
	return returnstring;																				//	\
}																										//	\
//---------------------------------------------------------------------------------------------------------//  


//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------- HIDING AND SHOWING THE PROPER TAB ---------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', '#viewProfile, #viewProfileText', function(event)  																				//	\
	{	$('#personal_wrapper').show();																														//	\
		$('#FAF_wrapper').hide();																															//	\
		$('#Pass_wrapper').hide();																															//	\
		$('#viewFAF_current').attr('id', 'viewFAF');																										//	\
		$('#viewPass_current').attr('id', 'viewPass');																										//	\
		$('#viewProfile').attr('id', 'viewProfile_current');																								//	\
		$('.leftNavTextCurrent').addClass('leftNavText').removeClass('leftNavTextCurrent');																	//	\
		$('#viewProfileText').addClass('leftNavTextCurrent').removeClass('leftNavText');																	//	\
	});																																						//	\
	$(document).on('click', '#viewFAF, #viewFAFText', function(event) 																						//	\
	{	$('#personal_wrapper').hide();																														//	\
		$('#Pass_wrapper').hide();																															//	\
		$('#FAF_wrapper').show();																															//	\
		$('#viewProfile_current').attr('id', 'viewProfile');																								//	\
		$('#viewFAF').attr('id', 'viewFAF_current');																										//	\
		$('#viewPass_current').attr('id', 'viewPass');																										//	\
		$('.leftNavTextCurrent').addClass('leftNavText').removeClass('leftNavTextCurrent');																	//	\
		$('#viewFAFText').addClass('leftNavTextCurrent').removeClass('leftNavText');																		//	\
	});																																						//	\
	$(document).on('click', '#viewPass, #viewPassText', function(event) 																					//	\
	{	$('#personal_wrapper').hide();																														//	\
		$('#FAF_wrapper').hide();																															//	\
		$('#Pass_wrapper').show();																															//	\
		$('#viewProfile_current').attr('id', 'viewProfile');																								//	\
		$('#viewFAF_current').attr('id', 'viewFAF');																										//	\
		$('#viewPass').attr('id', 'viewPass_current');																										//	\
		$('.leftNavTextCurrent').addClass('leftNavText').removeClass('leftNavTextCurrent');																	//	\
		$('#viewPassText').addClass('leftNavTextCurrent').removeClass('leftNavText');																		//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('mouseover', '#leftColumnIconsWrapper', function(event) 																			//	\
{	$('#leftColumnTextWrapper').fadeIn('500');																									//	\
});																																				//	\
$(document).on('mouseout', '#leftColumnIconsWrapper, #leftColumnTextWrapper, .leftNavText, .leftNav, #saveFile, #saveFileText, #user, #userText, #logo, #logoText', function(event) 				//	\
{	if (event.pageX>200){	$('#leftColumnTextWrapper').fadeOut('500');		}																	//	\
});																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- ADDING A NEW FAF LINE ON THE PROFILES PAGE ---------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', '#Profile_Add', function(event)  																								//	\
	{	var text='<div class="Profile_FAF_line">';																											//	\
		text=text+'<div class="Profile_FAF_addressholder"><div class="Profile_FAF_address">URL</div></div>';												//	\
		text=text+'<div class="Profile_FAF_nameholder"><div class="Profile_FAF_name">Function Name</div></div>';											//	\
		text=text+'<div class="Profile_FAF_delete">&nbsp</div></div>';																						//	\
		$('#Profile_FAF').append(text);																														//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------- EDITING THE FAF URL IN THE PROFILES PAGE ----------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', '.Profile_FAF_address', function(event)  																						//	\
	{	var text=$(this).html();																															//	\
		if (text=="URL") { var insert='<input type="text" class="Profile_FAF_input" placeholder="Enter URL of File" />';									//	\
		}else { var insert='<input type="text" class="Profile_FAF_input" value="'+text+'">';	 }															//	\
		$(this).closest('.Profile_FAF_addressholder').html(insert);																							//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------ FINISHED EDITING FAF LINE IN THE PROFILE -------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('keyup', '.Profile_FAF_input', function(e) 	 																							//	\
	{	if ((e.keyCode == 13)||(e.which == 13))																												//	\
		{	$('#message').hide();																															//	\
			var text=$(this).val();																															//	\
			var inserttext='<div class="Profile_FAF_address">'+text+'</div>';																				//	\
			$(this).closest('.Profile_FAF_line').removeClass('error');																						//	\
			$.ajax ({ type:"POST", url:"/Profiles/VerifyAddress", async:false, data: { path:text }, success: function(data) { objectdata=JSON.parse(data); } });	
			if (objectdata['ID']=="false")  																												//	\
			{	$('#message').show().html('The path entered was not a valid file address.');																//	\
				$(this).closest('.Profile_FAF_line').addClass('error');																						//	\
				$(this).closest('.Profile_FAF_addressholder').html('<div class="Profile_FAF_address">'+text+'</div>');										//	\
				$(this).closest('.Profile_FAF_addressholder').siblings('.Profile_FAF_nameholder').html('<div class="Profile_FAF_name">NA</div>');			//	\
			}else if (objectdata['FunctionName']=="") 																										//	\
			{	$('#message').show().html('The file entered did not have a function name.');																//	\
				$(this).closest('.Profile_FAF_line').addClass('error');																						//	\
				$(this).closest('.Profile_FAF_addressholder').html('<div class="Profile_FAF_address">'+text+'</div>');										//	\
				$(this).closest('.Profile_FAF_addressholder').siblings('.Profile_FAF_nameholder').html('<div class="Profile_FAF_name">NA</div>');			//	\
			}else 																																			//	\
			{	NameCheck=VerifyName(objectdata['FunctionName']);																							//	\
				if (NameCheck) 																																//	\
				{ 	$('#message').show().html('The file chosen uses a function name -'+objectdata['FunctionName']+'- that already has a file assigned to it.');	//	\
					$(this).closest('.Profile_FAF_line').addClass('error');																					//	\
				}else { 																																	//	\
					$(this).closest('.Profile_FAF_line').attr('fileid',objectdata['ID']);																	//	\
					$(this).closest('.Profile_FAF_addressholder').siblings('.Profile_FAF_nameholder').html('<div class="Profile_FAF_name">'+objectdata['FunctionName']+'</div>');	
					$(this).closest('.Profile_FAF_addressholder').html('<div class="Profile_FAF_address">'+objectdata['address']+'</div>');					//	\
					UpdateFAFs();																															//	\
				}																																			//	\
			}																																				//	\
		}																																					//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------- FINISHED EDITING FAF LINE --------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('keyup', '.FAF_input', function(e) 	 																									//	\
	{	if ((e.keyCode == 13)||(e.which == 13))																												//	\
		{	var text=$(this).val();																															//	\
			var inserttext='<div class="Profile_FAF_address">'+text+'</div>';																				//	\
			$(this).closest('.Profile_FAF_line').removeClass('error');																						//	\
			$.ajax ({ type:"POST", url:"/Profiles/VerifyAddress", async:false, data: { path:text }, success: function(data) { objectdata=JSON.parse(data); } });	
			if (objectdata['ID']=="false")  																												//	\
			{	$('#message').show().html('The path entered was not a valid file address.');																//	\
				$(this).closest('.Profile_FAF_line').addClass('error');																						//	\
				$(this).closest('.Profile_FAF_addressholder').html('<div class="Profile_FAF_address">'+text+'</div>');										//	\
				$(this).closest('.Profile_FAF_addressholder').siblings('.Profile_FAF_nameholder').html('<div class="Profile_FAF_name">NA</div>');			//	\
			}else if (objectdata['FunctionName']=="") 																										//	\
			{	$('#message').show().html('The file entered did not have a function name.');																//	\
				$(this).closest('.Profile_FAF_line').addClass('error');																						//	\
				$(this).closest('.Profile_FAF_addressholder').html('<div class="Profile_FAF_address">'+text+'</div>');										//	\
				$(this).closest('.Profile_FAF_addressholder').siblings('.Profile_FAF_nameholder').html('<div class="Profile_FAF_name">NA</div>');			//	\
			}else 																																			//	\
			{	NameCheck=VerifyName(objectdata['FunctionName']);																							//	\
				if (NameCheck) 																																//	\
				{ 	$('#message').show().html('The file chosen uses a function name -'+objectdata['FunctionName']+'- that already has a file assigned to it.');	//	\
					$(this).closest('.Profile_FAF_line').addClass('error');																					//	\
				}else { 																																	//	\
					$(this).closest('.Profile_FAF_line').attr('fileid',objectdata['ID']);																	//	\
					$(this).closest('.Profile_FAF_addressholder').siblings('.Profile_FAF_nameholder').html('<div class="Profile_FAF_name">'+objectdata['FunctionName']+'</div>');	
					$(this).closest('.Profile_FAF_addressholder').html('<div class="Profile_FAF_address">'+objectdata['address']+'</div>');					//	\
					UpdateFileFAFs();																														//	\
				}																																			//	\
			}																																				//	\
		}																																					//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------- VERIFY THE NAME ENTERED BY THE USER ---------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
function VerifyName (name)																																	//	\
{	var flag=0;																																				//	\
	$('.Profile_FAF_line').each(function( index ) {																											//	\
		if ($(this).find('.Profile_FAF_name').html()==name) { flag=parseInt(flag)+1; }																		//	\
	});																																						//	\
	return flag																																				//	\
}																																							//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------- DELETE A FAF LINE ON THE PROFILES PAGE ------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', '.Profile_FAF_delete', function(e) 	 																							//	\
	{	$(this).closest('.Profile_FAF_line').remove();																										//	\
		UpdateFAFs();																																		//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------- CREATE THE FAF LIST FROM THE TABLE ON THE PROFILE PAGE ------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
function UpdateFAFs()																																		//	\
{	$('#message').hide(); CADWolf_FAFList={};																												//	\
	$('.Profile_FAF_line').each(function( index ) {																											//	\
		if (index>0)																																		//	\
		{	CADWolf_FAFList[index-1]={};																													//	\
			CADWolf_FAFList[index-1]['address']=$(this).find('.Profile_FAF_address').html();																//	\
			CADWolf_FAFList[index-1]['name']=$(this).find('.Profile_FAF_name').html();																		//	\
			CADWolf_FAFList[index-1]['fileid']=$(this).attr('fileid');																						//	\
		}																																					//	\
	});																																						//	\
	$.ajax (																																				//	\
	{	type:"POST", url:"/Profiles/UpdateFAFList", 																										//	\
		data: { FAFList:JSON.stringify(CADWolf_FAFList) }																									//	\
	});																																						//	\
}																																							//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------- EDIT A PROPERTY LINE ------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', '.profileedit', function(e) 	 																								//	\
	{	var property=$(this).attr('id');																													//	\
		var text=$(this).html();																															//	\
		$(this).parent('.profile_infoitemholder').attr('oldvalue', text);																					//	\
		var inserttext='<input type="text" id="'+property+'" class="profile_input" value="'+text+'" >';														//	\
		$(this).closest('.profile_infoitemholder').html(inserttext);																						//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- FINISHED EDITING A PROPERTY LINE -----------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('keyup', '.profile_input', function(e) 	 																								//	\
	{	if ((e.keyCode == 13)||(e.which == 13))																												//	\
		{	var text=$(this).val();																															//	\
			var thisid=$(this).attr('id');																													//	\
			var DOMItem=$(this);																															//	\
			var test=TestInput(thisid, text);																												//	\
			if (test=="1")																																	//	\
			{	$.ajax ({ 	type:"POST", url:"/Profiles/ChangeProperty", 																					//	\
						data: { property:thisid, value:text }, 																								//	\
						success: function(data) 																											//	\
						{ 	var inserttext='<div class="profile_infoitemholder"><div class="profile_infoitem profileedit" id="'+thisid+'">'+text+'</div></div>';
							$(DOMItem).closest('.profile_infoitemholder').html(inserttext);																	//	\
						} 																																	//	\
				});																																			//	\
			}																																				//	\
		}																																					//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------- CREATE THE FAF LIST FROM THE TABLE ON THE DOCUMENTS PAGE -----------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
function TestInput(thisid, text)																															//	\
{	var flag="1";																																			//	\
	$('#biomessage').hide();																																//	\
	if (thisid=="first name")																																//	\
	{	if (text.match(/[^a-zA-Z\ ]/)) { $('#biomessage').html("First and last names must be text only.").show(); flag=0; } }								//	\
	if (thisid=="last name")																																//	\
	{	if (text.match(/[^a-zA-Z\ ]/)) { $('#biomessage').html("First and last names must be text only.").show(); flag=0;} }								//	\
	if (thisid=="email")																																	//	\
	{	if (text.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/))
		{ }else { $('#biomessage').html("Email addresses must be of the format abc@abc123.xyz.").show(); flag=0;  } }										//	\
	return flag;																																			//	\
}																																							//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- SHOW THE UPLOAD IMAGE BUTTON ---------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', '#adduserimage', function(event) { $(this).hide();  $('#image_uploader').show();	});												//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- DEALING WITH THE UPLOADED IMAGE --------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$("#image_to_upload").change(function () {																												//	\
        $('#biomessage').hide();																															//	\
        var fileid=$('#fileid').attr('fileid');																												//	\
        var file = this.files[0];																															//	\
		var formdata = new FormData();																														//	\
		formdata.append("image", file);																														//	\
		$.ajax({																																			//	\
			url: "/Profiles/UploadImage",																													//	\
            type: "POST",																																	//	\
            data: formdata,																																	//	\
            processData: false,																																//	\
            contentType: false,																																//	\
            success:function(data){																															//	\
            	if (data=="0") { $('#biomessage').html('The image must be a jpg, bmp, or gif.'); 															//	\
            	}else																																		//	\
            	{	data=JSON.parse(data);																													//	\
					var timestamp = new Date().getTime();																									//	\
					$('#userimage').find('img').attr('src',data['address'] + '?' +timestamp );																//	\
            		$('#image_uploader').hide();																											//	\
            		$('#adduserimage').show();																												//	\
            	}																																			//	\
            }																																				//	\
        });																																					//	\
    });																																						//	\
	//---------------------------------------------------------------------------------------------------------------------------------------------------------//



//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- IMPORTING YOUR FAF LIST --------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', '#importlist', function(event) 																									//	\--- This is a function that is used on the documents page.
	{	var flag=0;	var text='';																															//	\--- It allows the user to attach his list of files as functions
		$.ajax ({ type:"POST", url:"/Documents/GetUserFAFList", async:false,																				//	\--- to an indepented file.
			error: function () { alert('There was an error retrieving this item');},																		//	\
		  	success: function (data) 																														//	\
			{	FAFList=JSON.parse(data);																													//	\
				for (var i in FAFList)																														//	\
				{	flag=0;																																	//	\
					$('.Profile_FAF_line').each(function( index ){ if (FAFList[i]['address']==$(this).find('.Profile_FAF_address').html())	{ flag=1; }	});	//	\
					if (!flag)																																//	\
					{	text='<div class="Profile_FAF_line" fileid="'+FAFList[i]['fileid']+'">';															//	\
							text=text+'<div class="Profile_FAF_addressholder"><div class="Profile_FAF_address">'+FAFList[i]['address']+'</div></div>';		//	\
							text=text+'<div class="Profile_FAF_nameholder"><div class="Profile_FAF_name">'+FAFList[i]['name']+'</div></div>';				//	\
							text=text+'<div class="File_FAF_delete">&nbsp</div>';																			//	\
						text=text+'</div>';																													//	\
						$('#Profile_FAF').append(text);																										//	\
					}																																		//	\
				}																																			//	\
				UpdateFileFAFs();																															//	\
			}																																				//	\
		});																																					//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- DEALING WITH THE UPLOADED IMAGE --------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
$("#activate_account").change(function () 																													//	\
{	var userid=$('#profile_username').attr('userid');																										//	\
	var vcode=$('#activate_account').val();																													//	\
	$.ajax ({ type:"POST", url:"/Profiles/ActivateAccount", async:false,																					//	\
		data: { userid:userid, vcode:vcode },																												//	\
		error: function () { alert('There was an error validating the account');},																			//	\
	  	success: function (data) 																															//	\
		{	if (data==0)																																	//	\
			{	$('#validationError').show();																												//	\
			}else																																			//	\
			{	UserInfo=JSON.parse(data);																													//	\
				$('#validationError').hide();																												//	\
				if (UserInfo=="1"){ $('#activate_account_wrapper').hide();	$('#activate_success').show(); }												//	\
			}																																				//	\
		}																																					//	\
	});																																						//	\
});																																							//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- LINKING A FB ACCOUNT TO A CADWOLF ACCOUNT ---------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', '#fblink', function (event) 																									//	\
	{	var fbid=$('#fblink').attr('fbid');																													//	\
		var fbname=$('#fblink').attr('fbname');																												//	\
		$.ajax ({ type:"POST", url:"/Profiles/LinkFB", async:false,																							//	\
			data: { fbid:fbid, fbname:fbname },																												//	\
			error: function () { alert('There was an error linking the accounts');},																		//	\
		  	success: function (data) 																														//	\
			{	UserData=JSON.parse(data);																													//	\
				if (UserData=="1"){ $('#fblink').html($('#fblink').attr('fbname'));	 }																		//	\
			}																																				//	\
		});																																					//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- ATTEMPTING TO RESET THE ACCOUNT PASSWORD ----------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('click', '#submitPass', function (event) 																									//	\
{	$('#passErrorBox').hide();																																//	\
	var flag1=0;																																			//	\
	var newPass1=$('#pass2').val();																															//	\
	var newPass2=$('#pass3').val();																															//	\
	if (newPass1==newPass2){ flag1=1; }else{ $('#passErrorBox').show(); $('#passErrorBox').html('The two new passwords do not match'); }					//	\
	if (flag1==1)																																			//	\
	{	$.ajax ({ type:"POST", url:"/Profiles/resetPass", 																									//	\
			data: { newPass:newPass1 },																														//	\
			error: function () { alert('There was an error changing the password');},																		//	\
		  	success: function (data) 																														//	\
			{	if (data=="1"){ $('#passErrorBox').show(); $('#passErrorBox').html('Password Changed');	 		}											//	\
				if (data=="0"){ $('#passErrorBox').show(); $('#passErrorBox').html('The old password is not valid');	} 									//	\
			}																																				//	\
		});																																					//	\
	}																																						//	\
});																																							//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

});															