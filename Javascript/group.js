$(function(){

	//---------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------ Populate the member names and permissions when the user clicks the group -------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------
	$(document).on('click', '.groups_groupline', function(event) { 																		//	\
		$('#group_groupbox').find('.active').removeClass('active');																		//	\
		$(this).addClass('active');																										//	\
		var groupid=$(this).attr('groupid');																							//	\
		$.ajax ({																														//	\
			type:"POST",																												//	\
			url:"/Groups/GetMembers",																									//	\ 
			data: { groupid:groupid	},																									//	\
	        error: function () { alert('There was an error retrieving the group members');},											//	\
			success: function (data) { 	$('#group_memberbox').html(data);	}															//	\
		});																																//	\
		$.ajax ({																														//	\
			type:"POST",																												//	\
			url:"/Groups/GetPermissions",																								//	\ 
			data: { groupid:groupid	},																									//	\
	        error: function () { alert('There was an error retrieving the group permissions');},										//	\
			success: function (data) { 	$('.group_permbox').html(data);	}																//	\
		});																																//	\
	}); 																																//	\
	//---------------------------------------------------------------------------------------------------------------------------------------



	//---------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------ Create a new group with this user as the admin and creator ---------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------
	$('#group_newgroup').click(function(){ 																								//	\
		$.ajax ({																														//	\
			type:"POST",																												//	\
			url:"/Groups/CreateGroup",																									//	\ 
	        error: function (data) { $('#group_messages').html(data); },																//	\
			success: function (data) { 																									//	\
				var groupinfo=data.split('::');																							//	\
				var text='<div class="groups_groupline" groupid="'+groupinfo[0]+'">';													//	\
				text=text+'<div class="groupline_username">'+groupinfo[1]+'</div>';														//	\
				text=text+'<div class="groupline_creator check">&nbsp</div>';															//	\
				text=text+'<div class="groupline_admin check">&nbsp</div>';																//	\
				text=text+'<div class="groupline_date">Today</div>';																	//	\
				text=text+'</div>';																										//	\
				$('#group_groupbox').append(text);																						//	\																
			}																															//	\
		});																																//	\
	}); 																																//	\
	//---------------------------------------------------------------------------------------------------------------------------------------


	//---------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------ Delete a group completely ------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------
	$('#group_deletegroup').click(function(){ 																							//	\
		var groupid=$('#group_groupbox').find('.active').attr('groupid');																//	\
		$.ajax ({																														//	\
			type:"POST",																												//	\
			url:"/Groups/DeleteGroup",																									//	\ 
			data: { groupid:groupid	},																									//	\
	        error: function (data) { $('#group_messages').html(data); },																//	\
			success: function (data) {																									//	\
				$('#group_groupbox').find('.active').remove();																			//	\
				$('#group_messages').html('Group Deleted');																				//	\
			}																															//	\
		});																																//	\
	}); 																																//	\
	//---------------------------------------------------------------------------------------------------------------------------------------


	//---------------------------------------------------------------------------------------------------------------------------------------
	//-------------- Add user to a selected group - add user bar - change name - end editing of name ----------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------
	$('#group_adduser').click(function(){ 																								//	\
		$('#group_memberbox').find('.active').removeClass('active');																	//	\
		var text='<div class="groups_memberline active">';																				//	\
		text=text+'<div class="memberline_username">New Member</div>';																	//	\
		text=text+'<div class="memberline_creator cross">&nbsp</div>';																	//	\
		text=text+'<div class="memberline_admin cross">&nbsp</div>';																	//	\
		text=text+'<div class="memberline_date">0000-00-00</div>';																		//	\
		text=text+'</div>';																												//	\
		$('#group_memberbox').append(text);																								//	\
	});																																	//	\

	$(document).on('dblclick', '.memberline_username', function(event) { 																//	\
		var oldtext=$(this).html();																										//	\
		$(this).html('<input type="text" class="membername" value="'+oldtext+'">');														//	\
	}); 																																//	\

	$(document).on('focusout keyup', '.membername', function(e) { 																		//	\
		if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))||(e.type=="focusout"))											//	\
		{																																//	\
			var newname=$(this).val();																									//	\		
			var groupid=$('#group_groupbox').find('.active').attr('groupid');															//	\
			$('#group_memberbox').find('.active').find('.memberline_username').html(newname);											//	\
			$.ajax ({																													//	\
				type:"POST",																											//	\
				url:"/Groups/AddMember",																								//	\ 
				data: { 																												//	\
					groupid:groupid,																									//	\
					newname:newname																										//	\
				},																														//	\
		        error: function (data) { $('#group_messages').html(data); },															//	\
				success: function (data) { 																								//	\
					if (data=="No User") 																								//	\
					{																													//	\
						$('#group_messages').html("That user name does not exist");														//	\
						$('#group_memberbox').find('.active').find('.memberline_username').css('color','red');							//	\
					}else if (data=="Already Member")																					//	\
					{																													//	\
						$('#group_memberbox').find('.active').find('.memberline_username').css('color','red');							//	\
						$('#group_messages').html(newname+" is already a member of that group");										//	\						
					}else if (data=="User Exists")																						//	\
					{																													//	\
						$('#group_memberbox').find('.active').find('.memberline_username').css('color','black');						//	\
						$('#group_messages').html("User "+newname+" added to the group");												//	\						
					}																													//	\
				}																														//	\
			});																															//	\		
		}																																//	\
	}); 																																//	\
	//---------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------

	//---------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------- Delete a user from a selected group -------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------
	$(document).on('click', '.groups_memberline', function(event) { 																	//	\
		$('#group_memberbox').find('.active').removeClass('active');																	//	\
		$(this).addClass('active');																										//	\
	});																																	//	\

	$('#group_removeuser').click(function(){ 																							//	\
		var groupid=$('#group_groupbox').find('.active').attr('groupid');																//	\
		var userid=$('#group_memberbox').find('.active').attr('userid');																//	\
		$.ajax ({																														//	\
			type:"POST",																												//	\
			url:"/Groups/DeleteMember",																									//	\ 
			data: { groupid:groupid,																									//	\
					userid:userid	},																									//	\
	        error: function (data) { $('#group_messages').html(data); },																//	\
			success: function (data) { 																									//	\
				if (data=='1') { $('div[groupid='+groupid+']').remove(); $('#group_messages').html('User deleted');						//	\
				}else { $('#group_messages').html(data); }																				//	\
			}																															//	\
		});																																//	\
	}); 																																//	\
	//---------------------------------------------------------------------------------------------------------------------------------------



	//---------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------- Change a group name --------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------
	$(document).on('dblclick', '.groupline_usernameadmin', function(event) { 															//	\
		if ($('#group_groupbox').find('.active').find('.groupline_usernameadmin').children().hasClass('groupname'))						//	\
		{}else{																															//	\
			var text=$('#group_groupbox').find('.active').find('.groupline_usernameadmin').html();										//	\
			$(this).html('');																											//	\
			$(this).html('<input type="text" class="groupname" value="'+text+'">');														//	\
		}																																//	\
	});																																	//	\


	$(document).on('focusout keyup', '.groupname', function(e) { 																		//	\
		if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))||(e.type=="focusout"))											//	\
		{																																//	\
			var newname=$(this).val();																									//	\		
			var groupid=$('#group_groupbox').find('.active').attr('groupid');															//	\
			$('#group_groupbox').find('.active').find('.groupline_usernameadmin').html(newname);										//	\
			$.ajax ({																													//	\
				type:"POST",																											//	\
				url:"/Groups/GroupName",																								//	\ 
				data: { 																												//	\
					groupid:groupid,																									//	\
					newname:newname																										//	\
				},																														//	\
		        error: function (data) { $('#group_messages').html(data); },															//	\
				success: function (data) { 																								//	\
				}																														//	\
			});																															//	\		
		}																																//	\
	}); 																																//	\
	//---------------------------------------------------------------------------------------------------------------------------------------


});