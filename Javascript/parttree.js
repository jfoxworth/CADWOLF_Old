$(function(){
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------- To Do on Load -----------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------ ON DOCUMENT READY --------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	When the page is loaded, a div which is holding some data is parsed and placed into a global variable named partTreeData. This variable holds the decription data 	\
	and the block data - which is the series of blocks defining the part tree. It then buids out the part tree structure and prepares it for editing.					\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).ready(function(){ 																																		//	\
	partTreeData=$('#partTreeData').html();																															//	\
	if (partTreeData==''){ partTreeObject={};  }else { partTreeObject=JSON.parse(partTreeData);	}																	//	\
	if (partTreeObject['description']===undefined) {	partTreeObject['description']='<p>Enter your description of this part tree here.</p>'; }					//	\
	$('#partTreeDescription').html(partTreeObject['description']);																									//	\
	if (partTreeObject['dataBlocks']===undefined) 																													//	\
	{	partTreeObject['dataBlocks']={};																															//	\
		partTreeObject['dataBlocks'][0]={}; 																														//	\
		partTreeObject['dataBlocks'][0]['type']='Number'; 																											//	\
		partTreeObject['dataBlocks'][0]['Name']='Part Number'; 																										//	\
		partTreeObject['dataBlocks'][0]['low']=0; 																													//	\
		partTreeObject['dataBlocks'][0]['high']=9999;																												//	\
		partTreeObject['dataBlocks'][0]['options']={};																												//	\
		partTreeObject['dataBlocks'][0]['last']=1; 																													//	\
		partTreeObject['dataBlocks'][0]['position']=0; 																												//	\
		partTreeObject['dataBlocks'][0]['description']='<p>Enter Description Here</p>';																				//	\
	}																																								//	\
	setPartTreeBlocks();																																			//	\
	showInitialData(function() { checkStatus(); });																													//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

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

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------ SET THE DATA BLOCKS FOR THE PART TREE ------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	When the page is loaded, this function displays the blocks that hold the names of the sections of the part tree.													\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function setPartTreeBlocks()																																		//	\
{	var setText='';																																					//	\
	for (var index=0; index<Object.keys(partTreeObject['dataBlocks']).length; index++)																				//	\
	{	setText=setText+'<div class="dataBlockAdd"></div>';																											//	\
			setText=setText+'<div class="vertLineWrapper"><div class="vertLineLeft"></div><div class="vertLineRight"></div></div>';									//	\
			if(index==Object.keys(partTreeObject['dataBlocks']).length-1) {	setText=setText+'<div class="dataBlockDeleteNull"></div>';								//	\
																			setText=setText+'<div class="horLineWrapperNull"></div>';								//	\
			}else { 										setText=setText+'<div class="dataBlockDelete"></div>';													//	\
					setText=setText+'<div class="horLineWrapper"><div class="horLineUp"></div><div class="horLineDown"></div></div>';		}						//	\
			setText=setText+'<div class="dataBlockName">'+partTreeObject['dataBlocks'][index]['Name']+'</div>';														//	\
			if (index<Object.keys(partTreeObject['dataBlocks']).length-1) 																							//	\
			{	setText=setText+'<div class="vertLineWrapper"><div class="vertLineLeft"></div><div class="vertLineRight"></div></div>';	}							//	\
	}																																								//	\
	$('#partTreeList').html(setText);																																//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------- END OF ON LOAD EVENTS -----------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------- FUNCTIONS RELATING TO THE LEFT NAVIGATION AND OVERALL ITEMS -----------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is a series of bindings that simply show a description of what is going to happen when a link in the left tree is clicked on.									\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', "#viewStructure, #viewStructureText", function()																							//	\
{	$('.mainBodyPart').hide();																																		//	\
	$('#partStructureWrapper').show();																																//	\
	$('#viewStructure').attr('id', 'viewStructure_current');																										//	\
	$('#viewList_current').attr('id', 'viewList');																													//	\
	$('#viewPermissions_current').attr('id', 'viewPermissions');																									//	\
	$('.leftNavTextCurrent').addClass('leftNavText').removeClass('leftNavTextCurrent');																				//	\
	$('#viewStructureText').addClass('leftNavTextCurrent').removeClass('leftNavText');																				//	\
}); 																																								//	\
$(document).on('click', "#viewList, #viewListText", function(){																										//	\
	$('.mainBodyPart').hide();																																		//	\
	$('#partListWrapper').show();																																	//	\
	$('#viewStructure_current').attr('id', 'viewStructure');																										//	\
	$('#viewList').attr('id', 'viewList_current');																													//	\
	$('#viewPermissions_current').attr('id', 'viewPermissions');																									//	\
	$('.leftNavTextCurrent').addClass('leftNavText').removeClass('leftNavTextCurrent');																				//	\
	$('#viewListText').addClass('leftNavTextCurrent').removeClass('leftNavText');																					//	\
}); 																																								//	\
$(document).on('click', "#viewPermissions, #viewPermissionsText", function(){																						//	\
	$('.mainBodyPart').hide();																																		//	\
	$('#partPermissionsWrapper').show();	 																														//	\
	$('#viewStructure_current').attr('id', 'viewStructure');																										//	\
	$('#viewList_current').attr('id', 'viewList');																													//	\
	$('#viewPermissions').attr('id', 'viewPermissions_current');																									//	\
	$('.leftNavTextCurrent').addClass('leftNavText').removeClass('leftNavTextCurrent');																				//	\
	$('#viewPermissionsText').addClass('leftNavTextCurrent').removeClass('leftNavText');																			//	\
}); 																																								//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------- SAVE AND SAVE AND CHECKIN FILE ------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function saveFile (callback) 																																		//	\
{	partTreeObject['description']=$('#partTreeDescription').html();																									//	\
	$.ajax ({																																						//	\
		type:"POST", url:"/PartTree/SaveFile", data: { thisFileID:window.location.href , partData:JSON.stringify(partTreeObject)	},								//	\
		success: function(data) {																																	//	\
            if (data=="00") { ShowMessage('NoFilePerm');  }																											//	\
            if (data=="10") { ShowMessage('NoUserPerm'); }																											//	\
 //         if (data=="11") { ShowMessage('SaveFile');  	}																										//	\
            if (data=="01") { ShowMessage('SaveError');  }																											//	\
			if (typeof(callback)=="function"){ callback(); }																										//	\
        },																																							//	\
        error: function () { alert('There was an error updating the page order.');}																					//	\
	});																																								//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------- FUNCTION TO SHOW MESSAGES -------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function ShowMessage(num)																																			//	\
{	var message='';		var type='';																																//	\
	if (num=="SaveFile")		{ type="good"; 	message="File Saved"; }																								//	\
	if (num=="SaveFirst")		{ type="bad"; 	message="You must save the file after making those changes to access the part tree"; }								//	\
	if (num=="NoFilePerm") 		{ type="bad"; 	message="You do not have permissions to save this file"; }															//	\
	if (num=="NoUserPerm") 		{ type="bad"; 	message="Users are not allowed to edit this file"; }																//	\
	if (num=="SaveError") 		{ type="bad"; 	message="Error while saving file"; }																				//	\
	if (num=="LostPerm") 		{ type="bad"; 	message="You permissions have expired and you need to log in again"; }												//	\
	if (num=="PartDeleted")	 	{ type="good"; 	message="Component Deleted"; }																						//	\
	if (num=="FileExist") 		{ type="bad"; 	message="All contents must be deleted before that folder can be deleted"; }											//	\
	if (num=="SystemDeleted") 	{ type="good"; 	message="System Deleted"; }																							//	\
	if (num=="NewBlock") 		{ type="good"; 	message="A new block was added"; }																					//	\
	if (num=="DeleteBlock") 	{ type="good"; 	message="That block was deleted"; }																					//	\
	if (num=="ChangeName") 		{ type="good"; 	message="Name successfully changed"; }																				//	\
	if (num=="BadLocation") 	{ type="bad"; 	message="The address entered is not valid"; }																		//	\
	if (num=="FileMoved") 		{ type="good"; 	message="The file was successfully moved"; }																		//	\
	if (type=="good") 	{ $('#goodmessage').html(message); $('#GoodMessageWrapper').slideDown('500').delay(5000).slideUp('500'); }									//	\
	if (type=="bad") 	{ $('#badmessage').html(message); $('#BadMessageWrapper').slideDown('500').delay(5000).slideUp('500'); }									//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- END OF LEFT NAVIGATION ITEMS -----------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------ FUNCTIONS RELATING TO THE MAIN TREE STRUCTURE PAGE -----------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- EDIT A PART TREE DESCRIPTION -----------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This event occurs when a user clicks on the description with the intention of editing it. It simply sets the block to editable and prepares it to be edited.		\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', "#partTreeDescription", function()																											//	\
{	var config =																																					//	\
 	{   skin: 'kama',	uiColor:'#ECECEC',	extraPlugins : 'autogrow', extraPlugins : 'sharedspace', removePlugins : 'elementspath',								//	\
	    toolbarCanCollapse : false, width:'750', resize_enabled: false, sharedSpaces :  {  top : 'cktoolbar' },														//	\
		toolbar :  [ [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Bold', 'Italic', 'Underline', 'Strike', 											//	\
		'-', 'RemoveFormat', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'Link', 'Unlink', 										//	\
		'Image', 'Table', 'HorizontalRule', 'ShowBlocks', 'TextColor', 'BGColor', 'FontSize' ] ] 																	//	\
	}; 																																								//	\
	$('#partTreeDescription').attr('contenteditable','true');																										//	\
	$('#partTreeDescription').ckeditor(config);																														//	\
});																																									//	\
$(document).on('blur', "#partTreeDescription", function(){	saveFile();		});																						//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------- ADD A NEW BLOCK TO THE PART TREE SYSTEM ------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	When a user adds a new block section to the part tree system, this code adds the block to the current object. It also calls an ajax function that pushes down all	\
	subsequent files and folders that may already exist. It places those items in a new option which was created to be a temporary placeholder.							\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', ".dataBlockAdd", function()																													//	\
{	if (Object.keys(partTreeObject['dataBlocks']).length<=7)																										//	\
	{	$('.dataBlockNameCurrent').removeClass('dataBlockNameCurrent');																								//	\
		setText='<div class="dataBlockAdd"></div>';																													//	\
		setText=setText+'<div class="vertLineWrapper"><div class="vertLineLeft"></div><div class="vertLineRight"></div></div>';										//	\
		setText=setText+'<div class="dataBlockDelete"></div>';																										//	\
		setText=setText+'<div class="horLineWrapper"><div class="horLineUp"></div><div class="horLineDown"></div></div>';											//	\
		setText=setText+'<div class="dataBlockName">Component Name</div>';																							//	\
		setText=setText+'<div class="vertLineWrapper"><div class="vertLineLeft"></div><div class="vertLineRight"></div></div>';										//	\
		$(this).before(setText);																																	//	\
		var Index=$('.dataBlockAdd').index($(this))-1;																												//	\
		$.ajax ({																																					//	\
			type:"POST", url:"/PartTree/addBlock",data:{thisFile:window.location.href, index:Index	},																//	\
			success: function(data) {																																//	\
	            if (data=="00") { ShowMessage('NoFilePerm'); 	 																									//	\
	            }else if (data=="10") { ShowMessage('NoUserPerm'); 																									//	\
	            }else	{ 	var num=JSON.parse(JSON.stringify(Object.keys(partTreeObject['dataBlocks']).length));													//	\
//	                		for (var a=0; a<num; a++)																												//	\
//							{	if (a>=Index){	partTreeObject['dataBlocks'][a+1]=JSON.parse(JSON.stringify(partTreeObject['dataBlocks'][a]));	}	}				//	\
	                		for (var a=num; a>Index; a--)																											//	\
							{	partTreeObject['dataBlocks'][a]=JSON.parse(JSON.stringify(partTreeObject['dataBlocks'][a-1]));	}									//	\
							partTreeObject['dataBlocks'][Index]={}; 																								//	\
							partTreeObject['dataBlocks'][Index]['type']='List'; 																					//	\
							partTreeObject['dataBlocks'][Index]['Name']='Component Name'; 																			//	\
							partTreeObject['dataBlocks'][Index]['low']=0; 																							//	\
							partTreeObject['dataBlocks'][Index]['high']=9999;																						//	\
							partTreeObject['dataBlocks'][Index]['options']={};																						//	\
							partTreeObject['dataBlocks'][Index]['options'][0]="New Option";																			//	\
							partTreeObject['dataBlocks'][Index]['last']=1; 																							//	\
							partTreeObject['dataBlocks'][Index]['position']=0; 																						//	\
							partTreeObject['dataBlocks'][Index]['description']='<p>Enter Description Here</p>';														//	\
							setPartTreeBlocks();																													//	\
							showInitialData(function () { saveFile(); });																							//	\
							ShowMessage('NewBlock'); 																												//	\
	            }																																					//	\
			},																																						//	\
	        error: function () { alert('There was an error changing the block name.');}																				//	\
		});																																							//	\
		showOptionList(Index);																																		//	\
	}																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------- DELETE A DATA BLOCK FROM THE PART TREE SYSTEM -------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	When a user clicks on the icon to delete a section of numbers to the part numbering scheme. It removes the relevant section of HTML and deletes from tree.			\
	This is done by sending an ajax call to the server to delete the node. After this is done, the data is reloaded and the part tree is redisplayed.					\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', ".dataBlockDelete", function()																												//	\
{	$('.dataBlockNameCurrent').removeClass('dataBlockNameCurrent');																									//	\
	var Index=$('.dataBlockDelete').index($(this));																													//	\
	$('.dataBlockName').eq(Index).remove(); 																														//	\
	$('.dataBlockAdd').eq(Index).remove(); 																															//	\
	$('.horLineWrapper').eq(Index).remove(); 																														//	\
	$('.dataBlockDelete').eq(Index).remove(); 																														//	\
	$('.vertLineWrapper').eq(2*Index).remove(); 																													//	\
	$.ajax ({																																						//	\
		type:"POST", url:"/PartTree/deleteBlock",data:{thisFile:window.location.href, Index:Index	},																//	\
		success: function(data) {																																	//	\
            if (data=="00") { ShowMessage('NoFilePerm'); 	 																										//	\
            }else if (data=="10") { ShowMessage('NoUserPerm'); 																										//	\
            }else	{ 	for (var a=0; a<Object.keys(partTreeObject['dataBlocks']).length; a++)																		//	\
						{	if (a>Index)																															//	\
							{	partTreeObject['dataBlocks'][a-1]=JSON.parse(JSON.stringify(partTreeObject['dataBlocks'][a]));	}									//	\
						}																																			//	\
						delete partTreeObject['dataBlocks'][Object.keys(partTreeObject['dataBlocks']).length-1];													//	\
						setPartTreeBlocks();																														//	\
						showInitialData(function () { saveFile(); });																								//	\
						ShowMessage('DeleteBlock');																													//	\
					}																																				//	\
		},																																							//	\
        error: function () { alert('There was an error deleting the block.');}																						//	\
	});																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------- HOVER OVER A DATABLOCK TO SEE PROPERTIES -----------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This event is triggered when a user hovers over a name for a part tree section. It shows and then hides the relavent info											\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('mouseover', ".dataBlockName", function()																											//	\
{	Index=$('.dataBlockName').index($('.dataBlockNameCurrent')); 																									//	\
	if (Index!=-1)																																					//	\
	{	partTreeObject['dataBlocks'][Index]['description']=$('#partTreeComponentDescription').html();																//	\
		saveFile();  																																				//	\
	}																																								//	\
	var Index=0, listText='', optionText='';																														//	\
	$('.dataBlockInnerWrapper').css({top: '-30px', left: '-9999px', position:'relative'});																			//	\
	$(this).closest('.dataBlock').find('.dataBlockInnerWrapper').css({top: '-30px', left: '0px', position:'relative'});												//	\
	$('.dataBlockName').removeClass('dataBlockNameCurrent');																										//	\
	$(this).addClass('dataBlockNameCurrent');																														//	\
	Index=$('.dataBlockName').index($(this));																														//	\
	$('#partTreeName').html('<input id="partTreeNameInput" type="text" value="'+partTreeObject['dataBlocks'][Index]['Name']+'" >');									//	\
	$('#partTreeComponentDescription').html(partTreeObject['dataBlocks'][Index]['description']);																	//	\
	var config =																																					//	\
 	{   skin: 'kama',	uiColor:'#ECECEC',	extraPlugins : 'autogrow', extraPlugins : 'sharedspace', removePlugins : 'elementspath',								//	\
	    toolbarCanCollapse : false, width:'750', resize_enabled: false, sharedSpaces :  {  top : 'cktoolbar' },														//	\
		toolbar :  [ [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Bold', 'Italic', 'Underline', 'Strike', 											//	\
		'-', 'RemoveFormat', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'Link', 'Unlink', 										//	\
		'Image', 'Table', 'HorizontalRule', 'ShowBlocks', 'TextColor', 'BGColor', 'FontSize' ] ] 																	//	\
	}; 																																								//	\
	$('#partTreeComponentDescription').attr('contenteditable','true');																								//	\
	$('#partTreeComponentDescription').ckeditor(config);																											//	\
	showOptionList(Index);																																			//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------- CHANGE THE NAME OF A DATA BLOCK ---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	Whenever a user changes the name of a data block, a call to the appropriate ajax function is made. There, the code simply renames the item in the database.			\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('keyup', "#partTreeNameInput", function(e)																											//	\
{	var oldName='', newName='';																																		//	\
	if ((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))) 																									//	\
	{	if ($('.dataBlockNameCurrent').length==1)																													//	\
		{	Index=$('.dataBlockName').index($('.dataBlockNameCurrent')); 																							//	\
			oldName=JSON.parse(JSON.stringify(partTreeObject['dataBlocks'][Index]['Name']));																		//	\
			newName=$('#partTreeNameInput').val(); 																													//	\
			oldName=oldName.replace(/ /g, '_');																														//	\
			newName=newName.replace(/ /g, '_');																														//	\
			partTreeObject['dataBlocks'][Index]['Name']=$('#partTreeNameInput').val(); 																				//	\
			partTreeObject['dataBlocks'][Index]['description']=$('#partTreeComponentDescription').html();															//	\
			$('.dataBlockName').eq(Index).html($('#partTreeNameInput').val());																						//	\
			$.ajax ({																																				//	\
				type:"POST", url:"/PartTree/changeBlockName",data:{thisFile:window.location.href, oldName:oldName, newName:newName	},								//	\
				success: function(data) {																															//	\
		            if (data=="00") { ShowMessage('NoFilePerm'); 	 																								//	\
		            }else if (data=="10") { ShowMessage('NoUserPerm'); 																								//	\
		            }else	{ 	saveFile(); 																														//	\
		            			ShowMessage('ChangeName'); }																										//	\
				},																																					//	\
		        error: function () { alert('There was an error changing the block name.');}																			//	\
			});																																						//	\
		}																																							//	\
	}																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------ CHANGE THE DESCRIPTION OF A DATA BLOCK -----------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	Whenever a user changes the description of a data block, a call to the appropriate ajax function is made. 															\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('blur', "#partTreeComponentDescription", function(e)																									//	\
{	Index=$('.dataBlockName').index($('.dataBlockNameCurrent')); 																									//	\
	partTreeObject['dataBlocks'][Index]['description']=$('#partTreeComponentDescription').html();																	//	\
	saveFile();  																																					//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- ADD A NEW OPTION TO THE LIST -----------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This code lets the user add a new option to the list of possible choices for a data block.																			\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '#partTreeAdd', function(e) 																												//	\
{	var Index=$('.dataBlockName').index($('.dataBlockNameCurrent'));																								//	\
	var flag=0, num=Object.keys(partTreeObject['dataBlocks'][Index]['options']).length, Index=$('.dataBlockName').index($('.dataBlockNameCurrent')); 				//	\
	for (item in partTreeObject['dataBlocks'][Index]['options'])	{	if (partTreeObject['dataBlocks'][Index]['options'][item]=="New Option") { flag=1; } }		//	\
	if (flag==0) { partTreeObject['dataBlocks'][Index]['options'][num]="New Option"; }																				//	\
	showOptionList(Index);																																			//	\
	saveFile(function () { showInitialData(); });  																													//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------- FINISHED EDITING A LIST ITEM -------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	When a user finishes editing the name of an option, an ajax function is called and all of the relevant folder names on the server are changed. It then resends and	\
	reparses the data to create the original data tree variable.																										\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('keyup', '.optionInput', function(e)			 																										//	\
{	var Index=$('.dataBlockName').index($('.dataBlockNameCurrent')), compIndex=$('.optionInput').index($(this)), list='', components='';							//	\
	if ((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))) 																									//	\
	{	oldName=JSON.parse(JSON.stringify(partTreeObject['dataBlocks'][Index]['options'][compIndex]));																//	\
		partTreeObject['dataBlocks'][Index]['options'][compIndex]=$(this).val();																					//	\
		newName=$(this).val(); 																																		//	\
		oldName=oldName.replace(/ /g, '_');																															//	\
		newName=newName.replace(/ /g, '_');																															//	\
		$.ajax ({																																					//	\
			type:"POST", url:"/PartTree/changeOptionName",data:{thisFile:window.location.href, index:Index, oldName:oldName, newName:newName	},					//	\
			success: function(data) {																																//	\
	            if (data=="00") { ShowMessage('NoFilePerm'); 	 																									//	\
	            }else if (data=="10") { ShowMessage('NoUserPerm'); 																									//	\
	            }else	{ 	ShowMessage('ChangeName'); 																												//	\
							showInitialData(function () { saveFile(); });		}																					//	\
			},																																						//	\
	        error: function () { alert('There was an error changing the list name.');}																				//	\
		});																																							//	\
	}																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------- DELETE A LIST ITEM ------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	In this case, the user is deleting one of the options available in this block for the part numbering scheme. The code makes an ajax call that checks to see if 		\
	there are any files or subfolders with this option. If there is, the user is warned that they cannot delete the item. If there is nothing beneath is, the item		\
	is removed from the tree and the list.																																\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '.optionDelete', function(e)		 																										//	\
{	var Index=$('.dataBlockName').index($('.dataBlockNameCurrent'));																								//	\
	var compIndex=$('.optionDelete').index($(this));																												//	\
	var listName=partTreeObject['dataBlocks'][Index]['options'][compIndex];																							//	\
	listName=listName.replace(/ /g, '_');																															//	\
	$.ajax ({																																						//	\
		type:"POST", url:"/PartTree/deleteOption",data:{thisFile:window.location.href, index:Index, listName:listName	},											//	\
		success: function(data) {																																	//	\
            if (data=="0") { ShowMessage('NoFilePerm'); 	 																										//	\
            }else if (data=="1") { ShowMessage('FileExist'); 																										//	\
            }else	{ 	ShowMessage('FileExist');																											 		//	\
						showInitialData(function () { saveFile(); });		}																						//	\
		},																																							//	\
        error: function () { alert('There was an error deleting the list name.');}																					//	\
	});																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------- SHOW ALL THE OPTIONS ON THE LIST ----------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function places all of the relevant HTML into place for the data blocks.																						\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function showOptionList (Index)																																		//	\
{	listText='';																																					//	\
	if(partTreeObject['dataBlocks'][Index]['type']=="List") 																										//	\
	{	for (var a in partTreeObject['dataBlocks'][Index]['options'])																								//	\
		{	listText=listText+'<div class="optionLine">';																											//	\
				listText=listText+'<div class="optionDeleteNull"></div>';																							//	\
				listText=listText+'<div class="optionText"><input class="optionInput" value="'+partTreeObject['dataBlocks'][Index]['options'][a]+'"></div>';		//	\
			listText=listText+'</div>'; 																															//	\
		}																																							//	\
	}else																																							//	\
	{	listText=listText+'<div class="numberLine"><div class="numberText">Low Number</div>';																		//	\
		listText=listText+'<div class="numberItem"><input type="text" id="numberLowInput" value="'+partTreeObject['dataBlocks'][Index]['low']+'"/></div></div>'; 	//	\
		listText=listText+'<div class="numberLine"><div class="numberText">High Number</div>';																		//	\
		listText=listText+'<div class="numberItem"><input type="text" id="numberHighInput" value="'+partTreeObject['dataBlocks'][Index]['high']+'"/></div></div>'; 	//	\
	}																																								//	\
	$('#partTreeListBlock').html(listText);																															//	\
	if(partTreeObject['dataBlocks'][Index]['type']=="List") {	$('#partTreeAddLine').show(); }else { $('#partTreeAddLine').hide(); }								//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------- SHOW A DELETE OPTION WHEN THE LINE IS HOVERED OVER -------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('mouseover', '.optionLine', function(e)		 																										//	\
{	$(this).find('.optionDeleteNull').addClass('optionDelete').removeClass('optionDeleteNull');	});																	//	\
$(document).on('mouseout', '.optionLine', function(e)		 																										//	\
{	$(this).find('.optionDelete').addClass('optionDeleteNull').removeClass('optionDelete');	});																		//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------- ITEMS RELATING TO THE PART TREE PAGE ------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------- SHOW THE INITIAL SYSTEMS AVAILABLE WITHIN THE STRUCTURE ----------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is called whenever the page is initially loaded. The function uses an ajax call that downoads all of the relevant components and systems for the tree.\
	After this, the first level is shown as folders. Note that a folder is shown for each level even though it may not exist yet in the tree.							\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function showInitialData (callback)																																	//	\
{	$.ajax ({																																						//	\
		type:"POST", url:"/PartTree/getFullData", data: { thisFile:window.location.href	},																			//	\
		success: function(data) {																																	//	\
            if (data=="00") { ShowMessage('NoFilePerm'); 	 																										//	\
            }else if (data=="10") { ShowMessage('NoUserPerm'); 																										//	\
            }else			 																																		//	\
			{	var tempObj=JSON.parse(data);																														//	\
				parseData(tempObj, '', function(){ setData(callback); });																							//	\
			}																																						//	\
		},																																							//	\
        error: function () { alert('There was an error obtaining the system data.');}																				//	\
	});																																								//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------- PARSE THE ORIGINAL DATA FOR THE PART TREE ------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is called whenever the page is initially loaded. The function uses an ajax call that downoads all of the relevant components and systems for the tree.\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function parseData(thisObject, path, callback)																														//	\
{	var sP='';																																						//	\
	if (path=='')																																					//	\
	{	partTreeObject['Tree']={};																																	//	\
		partTreeObject['Tree']['adminStatus']=thisObject[0]['Workspace']['admin_status'];																			//	\
		partTreeObject['Tree']['editStatus']=thisObject[0]['Workspace']['edit_status'];																				//	\
		partTreeObject['Tree']['useStatus']=thisObject[0]['Workspace']['use_status'];																				//	\
		partTreeObject['Tree']['viewStatus']=thisObject[0]['Workspace']['view_status'];																				//	\
		partTreeObject['Tree']['permissions']={};																													//	\
		for (var pindex in thisObject[0]['Permission'])																												//	\
		{	partTreeObject['Tree']['permissions'][pindex]={};																										//	\
			partTreeObject['Tree']['permissions'][pindex]['view']=thisObject[0]['Permission'][pindex]['view'];														//	\
			partTreeObject['Tree']['permissions'][pindex]['use']=thisObject[0]['Permission'][pindex]['use'];														//	\
			partTreeObject['Tree']['permissions'][pindex]['edit']=thisObject[0]['Permission'][pindex]['edit'];														//	\
			partTreeObject['Tree']['permissions'][pindex]['admin']=thisObject[0]['Permission'][pindex]['admin'];													//	\
			partTreeObject['Tree']['permissions'][pindex]['userid']=thisObject[0]['Permission'][pindex]['userid'];													//	\
			partTreeObject['Tree']['permissions'][pindex]['username']=thisObject[0]['Permission'][pindex]['username'];												//	\
			partTreeObject['Tree']['permissions'][pindex]['usertype']=thisObject[0]['Permission'][pindex]['usertype'];												//	\
		}																																							//	\			
		for (var index in thisObject['0']['children'])																												//	\
		{	var name=thisObject['0']['children'][index]['Workspace']['name'];																						//	\
			partTreeObject['Tree'][name]={}																															//	\
			partTreeObject['Tree'][name]['active']=0;																												//	\
			partTreeObject['Tree'][name]['created']=thisObject[0]['children'][index]['Workspace']['created'];														//	\
			partTreeObject['Tree'][name]['modified']=thisObject[0]['children'][index]['Workspace']['modified'];														//	\
			partTreeObject['Tree'][name]['type']=thisObject[0]['children'][index]['Workspace']['File_or_Folder'];													//	\
			partTreeObject['Tree'][name]['quantity']=thisObject[0]['children'][index]['Workspace']['quantity'];														//	\
			partTreeObject['Tree'][name]['viewStatus']=thisObject[0]['children'][index]['Workspace']['view_status'];												//	\
			partTreeObject['Tree'][name]['editStatus']=thisObject[0]['children'][index]['Workspace']['edit_status'];												//	\
			partTreeObject['Tree'][name]['useStatus']=thisObject[0]['children'][index]['Workspace']['use_status'];													//	\
			partTreeObject['Tree'][name]['adminStatus']=thisObject[0]['children'][index]['Workspace']['admin_status'];												//	\
			partTreeObject['Tree'][name]['updateStatus']=thisObject[0]['children'][index]['Workspace']['needsUpdate'];												//	\
			partTreeObject['Tree'][name]['permissions']={};																											//	\
			for (var pindex in thisObject[0]['children'][index]['Permission'])																						//	\
			{	partTreeObject['Tree'][name]['permissions'][pindex]={};																								//	\
				partTreeObject['Tree'][name]['permissions'][pindex]['view']=thisObject[0]['children'][index]['Permission'][pindex]['view'];							//	\
				partTreeObject['Tree'][name]['permissions'][pindex]['use']=thisObject[0]['children'][index]['Permission'][pindex]['use'];							//	\
				partTreeObject['Tree'][name]['permissions'][pindex]['edit']=thisObject[0]['children'][index]['Permission'][pindex]['edit'];							//	\
				partTreeObject['Tree'][name]['permissions'][pindex]['admin']=thisObject[0]['children'][index]['Permission'][pindex]['admin'];						//	\
				partTreeObject['Tree'][name]['permissions'][pindex]['userid']=thisObject[0]['children'][index]['Permission'][pindex]['userid'];						//	\
				partTreeObject['Tree'][name]['permissions'][pindex]['username']=thisObject[0]['children'][index]['Permission'][pindex]['username'];					//	\
				partTreeObject['Tree'][name]['permissions'][pindex]['usertype']=thisObject[0]['children'][index]['Permission'][pindex]['usertype'];					//	\
			}																																						//	\			
			if (thisObject['0']['children'][index]['Workspace']['File_or_Folder']==0){ parseData(thisObject['0']['children'][index], name); }						//	\
		}																																							//	\
	}else																																							//	\
	{	sP=path.split('/');																																			//	\
		for (var index in thisObject['children'])																													//	\
		{	var name=thisObject['children'][index]['Workspace']['name'];																							//	\
			if(sP.length==1) {  pTO=partTreeObject['Tree'][sP[0]];															}										//	\
			if(sP.length==2) {  pTO=partTreeObject['Tree'][sP[0]][sP[1]];													}										//	\
			if(sP.length==3) {  pTO=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]];											}										//	\
			if(sP.length==4) {  pTO=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]];										}										//	\
			if(sP.length==5) {  pTO=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]];								}										//	\
			if(sP.length==6) {  pTO=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]];						}										//	\
			if(sP.length==7) {  pTO=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]];				}										//	\
			if(sP.length==8) {  pTO=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]][sP[7]];			}										//	\
			if(sP.length==9) {  pTO=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]][sP[7]][sP[8]];	}										//	\
			pTO[name]={};																																			//	\
			pTO[name]['created']=thisObject['children'][index]['Workspace']['created'];																				//	\
			pTO[name]['modified']=thisObject['children'][index]['Workspace']['modified'];																			//	\
			pTO[name]['type']=thisObject['children'][index]['Workspace']['File_or_Folder'];																			//	\
			pTO[name]['quantity']=thisObject['children'][index]['Workspace']['quantity'];																			//	\
			pTO[name]['viewStatus']=thisObject['children'][index]['Workspace']['view_status'];																		//	\
			pTO[name]['editStatus']=thisObject['children'][index]['Workspace']['edit_status'];																		//	\
			pTO[name]['useStatus']=thisObject['children'][index]['Workspace']['use_status'];																		//	\
			pTO[name]['adminStatus']=thisObject['children'][index]['Workspace']['admin_status'];																	//	\
			pTO[name]['updateStatus']=thisObject['children'][index]['Workspace']['needsUpdate'];																	//	\
			pTO[name]['active']=0;																																	//	\
			pTO[name]['permissions']={};																															//	\
			for (var pindex in thisObject['children'][index]['Permission'])																							//	\
			{	pTO[name]['permissions'][pindex]={};																												//	\
				pTO[name]['permissions'][pindex]['view']=thisObject['children'][index]['Permission'][pindex]['view'];												//	\
				pTO[name]['permissions'][pindex]['use']=thisObject['children'][index]['Permission'][pindex]['use'];													//	\
				pTO[name]['permissions'][pindex]['edit']=thisObject['children'][index]['Permission'][pindex]['edit'];												//	\
				pTO[name]['permissions'][pindex]['admin']=thisObject['children'][index]['Permission'][pindex]['admin'];												//	\
				pTO[name]['permissions'][pindex]['userid']=thisObject['children'][index]['Permission'][pindex]['userid'];											//	\
				pTO[name]['permissions'][pindex]['username']=thisObject['children'][index]['Permission'][pindex]['username'];										//	\
				pTO[name]['permissions'][pindex]['usertype']=thisObject['children'][index]['Permission'][pindex]['usertype'];										//	\
			}																																						//	\			
			if (thisObject['children'][index]['Workspace']['File_or_Folder']==0){ parseData(thisObject['children'][index], path+'/'+name); }						//	\
		}																																							//	\
	}																																								//	\
	if (typeof(callback)=="function"){ callback(); }																												//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------- SET THE DATA THAT HAS BEEN PARSED -------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is called after the initial data has been parsed and whenever the user adds a new section to the part list.											\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function setData (callback)																																			//	\
{	var addText='';																																					//	\
	for (var Index in partTreeObject['dataBlocks'][0]['options'])																									//	\
	{	addText=addText+'<ol class="systemBlock notDisplayed" systemID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'">';									//	\
			addText=addText+'<li class="systemLine" systemID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'">';												//	\
				addText=addText+'<div class="systemLogo"></div>';																									//	\
				addText=addText+'<div class="systemName">'+partTreeObject['dataBlocks'][0]['options'][Index]+'</div>';												//	\
				addText=addText+'<div class="editBar">';																											//	\
					if (Object.keys(partTreeObject['dataBlocks']).length>2) 																						//	\
					{	addText=addText+'<div class="addSystem"></div>'; }else { addText=addText+'<div class="addPart"></div>'; }									//	\
					addText=addText+'<div class="statusGreen" systemID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'"></div>';								//	\
					addText=addText+'<div class="dummyBlock"></div>';																								//	\
					addText=addText+'<div class="includeMeNot" systemID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'"></div>'; 							//	\
					addText=addText+'<div class="moveItem" systemID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'"></div>';								//	\
				addText=addText+'</div>';																															//	\
				addText=addText+'<div id="'+partTreeObject['dataBlocks'][0]['options'][Index]+'" class="propertyValue" partID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'"></div>';						//	\
			addText=addText+'</li>';																																//	\
		addText=addText+'</ol>';																																	//	\
		if(partTreeObject['Tree'][partTreeObject['dataBlocks'][0]['options'][Index]]===undefined)																	//	\
		{	partTreeObject['Tree'][partTreeObject['dataBlocks'][0]['options'][Index]]={};																			//	\
			partTreeObject['Tree'][partTreeObject['dataBlocks'][0]['options'][Index]]['active']=0;																	//	\
		}																																							//	\
	}																																								//	\
	$('#partListContent').html(addText);																															//	\
	addText='';																																						//	\
	for (var Index in partTreeObject['dataBlocks'][0]['options'])																									//	\
	{	addText=addText+'<ol class="systemBlock notDisplayed" systemID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'">';									//	\
			addText=addText+'<li class="systemLine" systemID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'">';												//	\
				addText=addText+'<div class="systemPermLogo"></div>';																								//	\
				addText=addText+'<div class="systemPermName">'+partTreeObject['dataBlocks'][0]['options'][Index]+'</div>';											//	\
				addText=addText+'<div class="permBar">';																											//	\
					if (partTreeObject['Tree'][partTreeObject['dataBlocks'][0]['options'][Index]]['adminStatus']==0) 												//	\
					{	addText=addText+'<div class="permWrapper" permType="admin"><div class="listPerm" systemID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'">Admin : As Listed</div><div class="editList"></div></div>';}//	\
					if (partTreeObject['Tree'][partTreeObject['dataBlocks'][0]['options'][Index]]['adminStatus']==2) 												//	\
					{	addText=addText+'<div class="permWrapper" permType="admin"><div class="inheritPerm" systemID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'">Admin : Inherited</div></div>';}//	\
					if (partTreeObject['Tree'][partTreeObject['dataBlocks'][0]['options'][Index]]['editStatus']==0) 												//	\
					{	addText=addText+'<div class="permWrapper" permType="edit"><div class="listPerm" systemID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'">Edit : As Listed</div><div class="editList"></div></div>';}//	\
					if (partTreeObject['Tree'][partTreeObject['dataBlocks'][0]['options'][Index]]['editStatus']==2) 												//	\
					{	addText=addText+'<div class="permWrapper" permType="edit"><div class="inheritPerm" systemID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'">Edit : Inherited</div></div>';}//	\
					if (partTreeObject['Tree'][partTreeObject['dataBlocks'][0]['options'][Index]]['useStatus']==0) 													//	\
					{	addText=addText+'<div class="permWrapper" permType="use"><div class="listPerm" systemID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'">Use : As Listed</div><div class="editList"></div></div>';}	//	\
					if (partTreeObject['Tree'][partTreeObject['dataBlocks'][0]['options'][Index]]['useStatus']==1) 													//	\
					{	addText=addText+'<div class="permWrapper" permType="use"><div class="openPerm" systemID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'">Use : Everyone</div></div>';}		//	\
					if (partTreeObject['Tree'][partTreeObject['dataBlocks'][0]['options'][Index]]['useStatus']==2) 													//	\
					{	addText=addText+'<div class="permWrapper" permType="use"><div class="inheritPerm" systemID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'">Use : Inherited</div></div>';}//	\
					if (partTreeObject['Tree'][partTreeObject['dataBlocks'][0]['options'][Index]]['viewStatus']==0) 												//	\
					{	addText=addText+'<div class="permWrapper" permType="view"><div class="listPerm" systemID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'">View : As Listed</div><div class="editList"></div></div>';}//	\
					if (partTreeObject['Tree'][partTreeObject['dataBlocks'][0]['options'][Index]]['viewStatus']==1) 												//	\
					{	addText=addText+'<div class="permWrapper" permType="view"><div class="openPerm" systemID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'">View : Everyone</div></div>';}		//	\
					if (partTreeObject['Tree'][partTreeObject['dataBlocks'][0]['options'][Index]]['viewStatus']==2) 												//	\
					{	addText=addText+'<div class="permWrapper" permType="view"><div class="inheritPerm" systemID="'+partTreeObject['dataBlocks'][0]['options'][Index]+'">View : Inherited</div></div>';}//	\
				addText=addText+'</div>';																															//	\
			addText=addText+'</li>';																																//	\
		addText=addText+'</ol>';																																	//	\
		if(partTreeObject['Tree'][partTreeObject['dataBlocks'][0]['options'][Index]]===undefined)																	//	\
		{	partTreeObject['Tree'][partTreeObject['dataBlocks'][0]['options'][Index]]={};																			//	\
			partTreeObject['Tree'][partTreeObject['dataBlocks'][0]['options'][Index]]['active']=0;																	//	\
		}																																							//	\
	}																																								//	\
	$('#partPermissionContent').html(addText);																														//	\
	if (typeof(callback)=="function"){ callback(); }																												//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- CHECK THE STATUS OF SYSTEM PARTS -------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*																																						\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function checkStatus()																																				//	\
{	for (var Item in partTreeObject['Tree'])																														//	\
	{	if ((typeof(partTreeObject['Tree'][Item])=="object")&&(Item!=="Permissions")){	getStatus(partTreeObject['Tree'][Item], Item);	}							//	\
	}																																								//	\
}																																									//	\
function getStatus(thisObject, address)																																//	\
{	for (var Item in thisObject)																																	//	\
	{	if ((typeof(thisObject[Item])=="object")&&(Item!=="Permissions"))																							//	\
		{	if (thisObject[Item]['updateStatus']=="1")																												//	\
			{	var sL=address.split('/');																															//	\
				var thisSystem='';																																	//	\
				for (var a=0; a<sL.length; a++)																														//	\
				{	thisSystem=thisSystem+'/'+sL[a];																												//	\
					thisSystem=thisSystem.replace(/^\//,'');																										//	\
					$('.statusGreen[systemID="'+thisSystem+'"]').addClass('statusRed').removeClass('statusGreen');													//	\
					if (a==0){ partTreeObject['Tree'][sL[0]]['updateStatus']='1'; }																					//	\
					if (a==1){ partTreeObject['Tree'][sL[0]][sL[1]]['updateStatus']='1'; }																			//	\
					if (a==2){ partTreeObject['Tree'][sL[0]][sL[1]][sL[2]]['updateStatus']='1'; }																	//	\
					if (a==3){ partTreeObject['Tree'][sL[0]][sL[1]][sL[2]][sL[3]]['updateStatus']='1'; }															//	\
					if (a==4){ partTreeObject['Tree'][sL[0]][sL[1]][sL[2]][sL[3]][sL[4]]['updateStatus']='1'; }														//	\
					if (a==5){ partTreeObject['Tree'][sL[0]][sL[1]][sL[2]][sL[3]][sL[4]][sL[5]]['updateStatus']='1'; }												//	\
					if (a==6){ partTreeObject['Tree'][sL[0]][sL[1]][sL[2]][sL[3]][sL[4]][sL[5]][sL[6]]['updateStatus']='1'; }										//	\
					if (a==7){ partTreeObject['Tree'][sL[0]][sL[1]][sL[2]][sL[3]][sL[4]][sL[5]][sL[6]][sL[7]]['updateStatus']='1'; }								//	\
					if (a==8){ partTreeObject['Tree'][sL[0]][sL[1]][sL[2]][sL[3]][sL[4]][sL[5]][sL[6]][sL[7]][sL[8]]['updateStatus']='1'; }							//	\
				}																																					//	\
			}else {	getStatus(thisObject[Item], address+'/'+Item);	}																								//	\
		}																																							//	\
	}																																								//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------- ADD A SUBSYSTEM TO THE TREE --------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is called whenever the user clicks on the icon to add a subsystem to the tree. It adds a new system line to the DOM and populates the options for 	\
	naming that system with the relevant options from the object. No database actions are taken yet.																	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '.addSystem', function(e)			 																										//	\
{	var Path=$(this).closest('.systemBlock').attr('systemID');																										//	\
	var num=Path.split('/').length;																																	//	\
	var totalNum=Object.keys(partTreeObject['dataBlocks']).length-1;																								//	\
	var width=1000-(num*30);																																		//	\
	var addText='', thisObject={};																																	//	\
	var sP=Path.split('/');																																			//	\
	if (num==1) { thisObject=partTreeObject['Tree'][sP[0]]; }																										//	\
	if (num==2) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]]; }																								//	\
	if (num==3) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]]; }																							//	\
	if (num==4) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]]; }																					//	\
	if (num==5) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]]; }																			//	\
	if (num==6) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]]; }																	//	\
	if (num==7) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]]; }																//	\
	if (num==8) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]][sP[7]]; }														//	\
	if (num==9) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]][sP[7]][sP[8]]; }												//	\
	addText=addText+'<ol class="systemBlock notDisplayed" style=width:'+width+'px systemID="'+Path+'">';															//	\
		addText=addText+'<li class="systemLine" systemID="'+Path+'">';																								//	\
			addText=addText+'<input class="quantityBlock" value="1">';																								//	\
			addText=addText+'<div class="systemLogo"></div>';																										//	\
			addText=addText+'<div class="systemName">';																												//	\
				addText=addText+'<select class="openSystemName">';																									//	\
					addText=addText+'<option value="">Choose System</option>';																						//	\
					for (var option in partTreeObject['dataBlocks'][num]['options'])																				//	\
					{	var flag=0;																																	//	\
						for (var index in thisObject)	{	if (index==partTreeObject['dataBlocks'][num]['options'][option]) { flag=1; }  	}						//	\
						if (flag==0) 																																//	\
						{	addText=addText+'<option value="'+partTreeObject['dataBlocks'][num]['options'][option]+'">'+partTreeObject['dataBlocks'][num]['options'][option]+'</option>';	}
					}																																				//	\
					addText=addText+'<option value="Cancel">Cancel</option>';																						//	\
				addText=addText+'</select>';																														//	\
			addText=addText+'</div>';																																//	\
		addText=addText+'</li>';																																	//	\
	addText=addText+'</ol>';																																		//	\
	$(this).closest('.systemBlock').append(addText);																												//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------ SELECT A SUBSYTEM FROM THE LIST ------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the case where a user has selected the desired system name. The function to add a folder is called and the name is properly placed.							\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '.openSystemName', function(e)			 																									//	\
{	e.stopPropagation();																																			//	\
});																																									//	\
$(document).on('change', '.openSystemName', function(e)			 																									//	\
{	e.stopPropagation();																																			//	\
	if ($(this).val()=="Cancel")																																	//	\
	{	$(this).closest('.systemBlock').remove();																													//	\
	}else																																							//	\
	{	var addText='', newPath='';																																	//	\
		myDiv=$(this).closest('.systemBlock');																														//	\
		includeMe=$(myDiv).closest('.systemBlock').children('.systemLine').find('.includeMe').length;																//	\
		var Path=$(this).closest('.systemBlock').closest('.systemBlock').attr('systemID');																			//	\
		var num=Path.split('/').length;																																//	\
		var splitPath=Path.split('/');																																//	\
		var thisText=$(this).val();																																	//	\
		var totalNum=Object.keys(partTreeObject['dataBlocks']).length-2;																							//	\
		$.ajax ({																																					//	\
			type:"POST", url:"/PartTree/addSystem", data: { thisFile:window.location.href, systemPath:Path.replace(/ /g,'_'), systemName:thisText.replace(/ /g,'_')	},//\
			success: function(data) {																																//	\
	            if (data=="00") { ShowMessage('NoFilePerm'); 	 																									//	\
	            }else if (data=="10") { ShowMessage('NoUserPerm'); 																									//	\
	            }else			 																																	//	\
				{	addObject(Path, thisText);																														//	\
					changeProperty(Path+'/'+thisText, 'active', includeMe);																							//	\
					var addText='<li class="systemLine" systemID="'+Path+'/'+thisText+'">';																			//	\
						addText=addText+'<input class="quantityBlock" value="1">';																					//	\
						addText=addText+'<div class="systemLogo"></div>';																							//	\
						addText=addText+'<div class="systemName">'+thisText+'</div>';																				//	\
						addText=addText+'<div class="editBar">';																									//	\
							if (num==totalNum)  																													//	\
							{	addText=addText+'<div class="addPart"></div>';																						//	\
								addText=addText+'<div class="statusGreen" systemID="'+Path+'/'+thisText+'"></div>';													//	\
								addText=addText+'<div class="deleteSystem" systemID="'+Path+'/'+thisText+'"></div>'; 												//	\
								if ($(myDiv).children('.systemLine').find('.includeMe').length)																		//	\
								{		addText=addText+'<div class="includeMe" partID="'+Path+'/'+thisText+'"></div>';												//	\
								}else { addText=addText+'<div class="includeMeNot" partID="'+Path+'/'+thisText+'"></div>';	}										//	\
								addText=addText+'<div class="moveItem" systemID="'+Path+'/'+thisText+'"></div>';													//	\
							}else 																																	//	\
							{	addText=addText+'<div class="addSystem"></div>';																					//	\
								addText=addText+'<div class="statusGreen" systemID="'+Path+'/'+thisText+'"></div>';													//	\
								addText=addText+'<div class="deleteSystem" systemID="'+Path+'/'+thisText+'"></div>'; 												//	\
								if ($(myDiv).children('.systemLine').find('.includeMe').length)																		//	\
								{		addText=addText+'<div class="includeMe" partID="'+Path+'/'+thisText+'"></div>';												//	\
								}else { addText=addText+'<div class="includeMeNot" partID="'+Path+'/'+thisText+'"></div>';	}										//	\
								addText=addText+'<div class="moveItem" systemID="'+Path+'/'+thisText+'"></div>';													//	\
							}																																		//	\
						addText=addText+'</div>';																													//	\
						newPath=Path.replace(/\//g,'-');																											//	\
						addText=addText+'<div id="'+newPath+'-'+thisText+'" class="propertyValue" partID="'+newPath+'-'+thisText+'"></div>';						//	\
					addText=addText+'</li>';																														//	\
					$(myDiv).append(addText);																														//	\
					myDiv='';																																		//	\
				}																																					//	\
			},																																						//	\
	        error: function () { alert('There was an error setting the system name.');}																				//	\
		});																																							//	\
		$(this).closest('.systemBlock').attr('systemID', Path+'/'+thisText);																						//	\
		$(this).closest('.systemLine').remove();																													//	\
	}																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------- ADD A PART TO THE TREE ------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is called whenever the user clicks on the icon to add a part to the tree. It first calls a function that gets the next available part number.  It 	\
	then adds a part to the system tree with that number. The user is given no option to change that number yet.														\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '.addPart', function(e)			 																											//	\
{	myDiv=this.closest('.systemBlock');																																//	\
	var Path=$(this).closest('.systemBlock').attr('systemID');																										//	\
	includeMe=$(myDiv).closest('.systemBlock').children('.systemLine').find('.includeMe').length;																	//	\
	var num=Path.split('/').length;																																	//	\
	var splitPath=Path.split('/');																																	//	\
	var totalNum=Object.keys(partTreeObject['dataBlocks']).length-1;																								//	\
	var width=1000-(num*30);																																		//	\	
	$.ajax ({																																						//	\
		type:"POST", url:"/PartTree/getPartNumber", data: { thisFile:window.location.href, systemPath:Path.replace(/ /g,'_')	},									//	\
		success: function(data) {																																	//	\
            if (data=="00") { ShowMessage('NoFilePerm'); 	 																										//	\
            }else if (data=="10") { ShowMessage('NoUserPerm'); 																										//	\
            }else			 																																		//	\
            {	var addText='<li class="partLine"  style=width:'+width+'px partID="'+Path+'/'+data+'">';															//	\
					addText=addText+'<input class="quantityBlock" value="1">';																						//	\
					addText=addText+'<div class="partLogo"></div>';																									//	\
					addText=addText+'<div class="partName">'+Path+'/'+data+'</div>';																				//	\
					addText=addText+'<div class="editBar">';																										//	\
						addText=addText+'<div class="dummyBlock"></div>';																							//	\
						addText=addText+'<div class="statusGreen" systemID="'+Path+'/'+data+'"></div>';																//	\
						addText=addText+'<div class="deletePart" partID="'+Path+'/'+data+'"></div>';																//	\
						if ($(myDiv).children('.systemLine').find('.includeMe').length)																				//	\
						{		addText=addText+'<div class="includeMe" partID="'+Path+'/'+data+'"></div>';															//	\
						}else { addText=addText+'<div class="includeMeNot" partID="'+Path+'/'+data+'"></div>';	}													//	\
						addText=addText+'<div class="moveItem" systemID="'+Path+'/'+data+'"></div>';																//	\
					addText=addText+'</div>';																														//	\
					newPath=Path.replace(/\//g,'-');																												//	\
					addText=addText+'<div id="'+newPath+'-'+data+'" class="propertyValue" partID="'+newPath+'-'+data+'"></div>';									//	\
				addText=addText+'</li>';																															//	\
				addObject(Path, data);																																//	\
				changeProperty(Path+'/'+data, 'active', includeMe);																									//	\
				$(myDiv).append(addText);																															//	\
				myDiv='';																																			//	\
			}																																						//	\
		},																																							//	\
        error: function () { alert('There was an error updating the page order.');}																					//	\
	});																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------- VIEW THE CONTENTS OF A SYSTEM -------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is called whenever the user clicks on a system line. It shows the contents of a system.																\ 
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '.systemName, .systemLogo', function(e)																										//	\
{	myDiv=this, includeMe=0, thisObject={}, addText='';																												//	\
	includeMe=$(myDiv).closest('.systemBlock').children('.systemLine').find('.includeMe').length;																	//	\
	var Path=$(this).closest('.systemBlock').attr('systemID');																										//	\
	var thisLength=Object.keys(partTreeObject['dataBlocks']).length;																								//	\
	var num=Path.split('/').length;																																	//	\
	var sP=Path.split('/');																																			//	\
	var width=1000-(num*30);																																		//	\
	if (num==1) { thisObject=partTreeObject['Tree'][sP[0]]; }																										//	\
	if (num==2) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]]; }																								//	\
	if (num==3) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]]; }																							//	\
	if (num==4) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]]; }																					//	\
	if (num==5) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]]; }																			//	\
	if (num==6) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]]; }																	//	\
	if (num==7) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]]; }																//	\
	if ($(this).closest('.systemBlock').hasClass('notDisplayed'))																									//	\
	{	for (var index in thisObject)																																//	\
		{	if (typeof(thisObject[index])=="object")																												//	\
			{	if ((thisObject[index]['type']==0)&&(index!=="permissions"))																						//	\
				{	addText=addText+'<ol class="systemBlock notDisplayed" style=width:'+width+'px systemID="'+Path+'/'+index+'">';									//	\
						addText=addText+'<li class="systemLine" systemID="'+Path+'/'+index+'">';																	//	\
							addText=addText+'<input class="quantityBlock" value="'+thisObject[index]['quantity']+'">';												//	\
							addText=addText+'<div class="systemLogo"></div>';																						//	\
							addText=addText+'<div class="systemName">'+index+'</div>';																				//	\
							addText=addText+'<div class="editBar">';																								//	\
								if (num==Object.keys(partTreeObject['dataBlocks']).length-2) 																		//	\
								{	addText=addText+'<div class="addPart"></div>'; }else{ addText=addText+'<div class="addSystem"></div>'; }						//	\
								if (thisObject[index]['updateStatus']=='0')																							//	\
								{	addText=addText+'<div class="statusGreen" systemID="'+Path+'/'+index+'"></div>';												//	\
								}else if (thisObject[index]['updateStatus']=='1')																					//	\
								{	addText=addText+'<div class="statusRed" systemID="'+Path+'/'+index+'"></div>';		}											//	\
								addText=addText+'<div class="deleteSystem" systemID="'+Path+'/'+index+'"></div>';													//	\
								if (thisObject[index]['active']==1)																									//	\
								{		addText=addText+'<div class="includeMe" systemID="'+Path+'/'+index+'"></div>';												//	\
								}else { addText=addText+'<div class="includeMeNot" systemID="'+Path+'/'+index+'"></div>';	}										//	\
								addText=addText+'<div class="moveItem" systemID="'+Path+'/'+index+'"></div>';														//	\
							addText=addText+'</div>';																												//	\
							newPath=Path.replace(/\//g,'-');																										//	\
							if (thisObject[index]['active']==1)																										//	\
							{		addText=addText+'<div id="'+newPath+'-'+index+'" class="propertyValue" partID="'+newPath+'-'+index+'">'+thisObject[index]['Value']+'</div>';//	\
							}else{	addText=addText+'<div id="'+newPath+'-'+index+'" class="propertyValue" partID="'+newPath+'-'+index+'">-</div>';	}				//	\
						addText=addText+'</li>';																													//	\
					addText=addText+'</ol>';																														//	\
					$(myDiv).closest('.systemLine').siblings('.systemBlock').remove();																				//	\
					$(myDiv).closest('.systemBlock').append(addText);																								//	\
				}else if (index!=="permissions")																													//	\
				{	addText=addText+'<li class="partLine" style=width:'+width+'px partID="'+Path+'/'+index+'">';													//	\
						addText=addText+'<input class="quantityBlock" value="'+thisObject[index]['quantity']+'">';													//	\
						addText=addText+'<div class="partLogo"></div>';																								//	\
						addText=addText+'<div class="partName">'+Path+'/'+index+'</div>';																			//	\
						addText=addText+'<div class="editBar">';																									//	\
							addText=addText+'<div class="dummyBlock"></div>';																						//	\
							if (thisObject[index]['updateStatus']=='0')																								//	\
							{	addText=addText+'<div class="statusGreen" systemID="'+Path+'/'+index+'"></div>';													//	\
							}else if (thisObject[index]['updateStatus']=='1')																						//	\
							{	addText=addText+'<div class="statusRed" systemID="'+Path+'/'+index+'"></div>';		}												//	\
							addText=addText+'<div class="deletePart" partID="'+Path+'/'+index+'"></div>';															//	\
							if (thisObject[index]['active']==1)																										//	\
							{		addText=addText+'<div class="includeMe" partID="'+Path+'/'+index+'"></div>';													//	\
							}else { addText=addText+'<div class="includeMeNot" partID="'+Path+'/'+index+'"></div>';	}												//	\
							addText=addText+'<div class="moveItem" systemID="'+Path+'/'+index+'"></div>';															//	\
						addText=addText+'</div>';																													//	\
						newPath=Path.replace(/\//g,'-');																											//	\
						if (thisObject[index]['active']==1)																											//	\
						{		addText=addText+'<div id="'+newPath+'-'+index+'" class="propertyValue" partID="'+newPath+'-'+index+'">'+thisObject[index]['Value']+'</div>';//\
						}else{	addText=addText+'<div id="'+newPath+'-'+index+'" class="propertyValue" partID="'+newPath+'-'+index+'">-</div>';	}					//	\
					addText=addText+'</li>';																														//	\
					$(myDiv).closest('.systemLine').siblings('.partLine').remove();																					//	\
					$(myDiv).closest('.systemBlock').append(addText);																								//	\
				}																																					//	\
			}																																						//	\
		}																																							//	\
		$(this).closest('.systemBlock').addClass('isDisplayed').removeClass('notDisplayed');																		//	\
	}else																																							//	\
	{	$(this).closest('.systemBlock').addClass('notDisplayed').removeClass('isDisplayed');																		//	\
		$(this).closest('.systemBlock').children('.systemBlock').remove();																							//	\
		$(this).closest('.systemBlock').children('.partLine').remove();																								//	\
	}																																								//	\
	myDiv='';																																						//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------- DELETE A PART OR A SYSTEM ----------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is called whenever the user clicks on the icon to delete a part. It immediately deletes the part from the database and removes it 					\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '.deletePart', function(e)																													//	\
{	myDiv=$(this).closest('.partLine');																																//	\
	var partID=$(this).attr('partID');																																//	\
	$( "#deletePart-confirm" ).dialog({ resizable: false, height:180, width:350, modal: true,																		//	\
		buttons: {																																					//	\
			"Delete component": function() {																														//	\
				$( this ).dialog( "close" );																														//	\
				$.ajax ({																																			//	\
					type:"POST", url:"/PartTree/deletePart", data: { thisFile:window.location.href, partID:partID.replace(/ /g,'_')	},								//	\
					success: function(data) 																														//	\
		    	    {	var myData=JSON.parse(data); 																												//	\
						if (data=="00") { ShowMessage('NoFilePerm');  }																								//	\
						if (data=="11") { ShowMessage('PartDeleted'); myDiv.remove();  myDiv=''; deleteObject(partID); }											//	\
					},																																				//	\
			        error: function () { alert('There was an error deleting that part.');}																			//	\
				});																																					//	\			
        	},																																						//	\
	        Cancel: function() { $( this ).dialog( "close" ); }																										//	\
       	},																																							//	\
	});																																								//	\
	$('.ui-dialog :button').blur();																																	//	\
});																																									//	\
$(document).on('click', '.deleteSystem', function(e)																												//	\
{	myDiv=$(this).closest('.systemBlock');																															//	\
	var systemID=$(this).attr('systemID');																															//	\
	$( "#deleteSystem-confirm" ).dialog({ resizable: false, height:180, width:350, modal: true,																		//	\
		buttons: {																																					//	\
			"Delete system": function() {																															//	\
				$( this ).dialog( "close" );																														//	\
				$.ajax ({																																			//	\
					type:"POST", url:"/PartTree/deleteSystem", data: { thisFile:window.location.href, systemID:systemID.replace(/ /g,'_')	},						//	\
					success: function(data) 																														//	\
		    	    {	var myData=JSON.parse(data); 																												//	\
						if (data=="00") { ShowMessage('NoFilePerm');  }																								//	\
						if (data=="11") { ShowMessage('SystemDeleted'); myDiv.remove();  myDiv=''; deleteObject(systemID); }										//	\
					},																																				//	\
			        error: function () { alert('There was an error deleting that system.');}																		//	\
				});																																					//	\			
        	},																																						//	\
	        Cancel: function() { $( this ).dialog( "close" ); }																										//	\
       	},																																							//	\
    });																																								//	\
	$('.ui-dialog :button').blur();																																	//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- ACTIVATE OR DISACTIVATE A PART OR SYSTEM -----------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	Whenever a user clicks on the icon to include or not to include a part or system, the icon is changed and the system or part class on this line is changed.			\
	Then, all subsequent files and folders are adjusted as well. This means that when you turn a folder off, all of its subfiles and folders turn off and vice versa.	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '.includeMeNot', function(e){																												//	\
	if($(this).parent().parent().hasClass('partLine')) 	{ var Path=$(this).closest('.partLine').attr('partID');														//	\
	}else 												{ var Path=$(this).closest('.systemBlock').attr('systemID');		}										//	\
	var num=Path.split('/').length;																																	//	\
	var splitPath=Path.split('/');																																	//	\
	if($(this).parent().parent().hasClass('partLine')) 																												//	\
	{	$(this).addClass('includeMe').removeClass('includeMeNot');																									//	\
	}else if($(this).parent().parent().hasClass('systemLine'))																										//	\
	{	$(this).closest('.systemBlock').find('.includeMeNot').addClass('includeMe').removeClass('includeMeNot');													//	\
		$(this).addClass('includeMe').removeClass('includeMeNot');	}																								//	\
	changeProperty(Path, 'active', 1);																																//	\
	$(this).closest('.systemBlock').find('.systemBlock').each(function(){	changeProperty($(this).attr('systemID'), 'active', 1);	});								//	\
	bubbleUp(Path);																																					//	\
});																																									//	\
$(document).on('click', '.includeMe', function(e){																													//	\
	if($(this).parent().parent().hasClass('partLine')) 	{ var Path=$(this).closest('.partLine').attr('partID');														//	\
	}else 												{ var Path=$(this).closest('.systemBlock').attr('systemID');		}										//	\
	var num=Path.split('/').length;																																	//	\
	var splitPath=Path.split('/');																																	//	\
	if($(this).parent().parent().hasClass('partLine')) 																												//	\
	{	$(this).addClass('includeMeNot').removeClass('includeMe');																									//	\
	}else if($(this).parent().parent().hasClass('systemLine'))																										//	\
	{	$(this).closest('.systemBlock').find('.includeMe').addClass('includeMeNot').removeClass('includeMe');														//	\
		$(this).addClass('includeMeNot').removeClass('includeMe');		}																							//	\
	changeProperty(Path, 'active', 0);																																//	\
	$(this).closest('.systemBlock').find('.systemBlock').each(function(){	changeProperty($(this).attr('systemID'), 'active', 0);	});								//	\
	$(this).closest('.systemBlock').find('.partLine').each(function(){	changeProperty($(this).attr('partID'), 'active', 0);	});									//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------- MOVE A SYSTEM OR PART -------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*		These functions move files and folders from one place to another. When a user clicks on one of the move icons a block appears under the name where the user		\
		can enter a new location. When the user hits enter, that location and the folder is sent to the server. The function there changes the parent ID of the 		\
		item in question. 																																				\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '.moveItem', function(e)																													//	\
{	var htmlText='';																																				//	\
	htmlText=htmlText+'<div class="moveLine"><input class="moveInput" systemID="'+$(this).attr('systemID')+'" placeholder="Enter New Address"></div>';				//	\
	$(this).closest('.systemLine').after(htmlText);																													//	\
});																																									//	\
$(document).on('keyup', '.moveInput', function(e)																													//	\
{	if ((e.keyCode == 13)||(e.which == 13)) 																														//	\
	{	var systemID=$(this).attr('systemID');																														//	\
		var newAddress=$(this).val();																																//	\
		myDiv=this.closest('.moveLine');																															//	\
		$.ajax ({																																					//	\
			type:"POST", url:"/PartTree/moveItem", data: { thisFile:window.location.href, systemID:systemID.replace(/ /g,'_'), newAddress:newAddress	},			//	\
			success: function(data) {																																//	\
	            if (data=="00") { ShowMessage('NoFilePerm'); 	 																									//	\
    	        }else if (data=="1") { ShowMessage('BadLocation'); 																									//	\
        	    }else			 																																	//	\
            	{	ShowMessage('FileMoved');																														//	\
					myDiv.remove();																																	//	\
					myDiv='';																																		//	\
					showInitialData(function () {  });																												//	\
				}																																					//	\
			},																																						//	\
	        error: function () { alert('There was an error updating the page order.');}																				//	\
		});																																							//	\
	}else if ((e.keyCode == 27)||(e.which == 27))																													//	\
	{	$(this).closest('.moveLine').remove();	}																													//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------ CHANGE A PROPERTY --------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function takes in a path, a property to be altered, and the new value. It then parses out the path and changes the appropriate property in the gloabl object	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function changeProperty(Path, property, newValue)																													//	\
{	var num=Path.split('/').length;																																	//	\
	var sP=Path.split('/');																																			//	\
	var thisObject={};																																				//	\
	if (num==1) { thisObject=partTreeObject['Tree'][sP[0]];	}																										//	\
	if (num==2) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]];	}																								//	\
	if (num==3) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]]; }																							//	\
	if (num==4) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]]; }																					//	\
	if (num==5) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]]; }																			//	\
	if (num==6) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]];}																		//	\
	if (num==7) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]]; }																//	\
	if (num==8) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]][sP[7]]; }														//	\
	if (num==9) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]][sP[7]][sP[8]]; }												//	\
	thisObject[property]=newValue;																																	//	\
	for (var index in thisObject){  if(typeof(thisObject[index])=="object"){ changeProperty(Path+'/'+index, property, newValue); } }								//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------ ADD A SUBOBJECT ----------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function takes in a path and a new object name to be created at that location. It adds it to the proper place in the global object.							\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function addObject(Path, newObject)																																	//	\
{	var num=Path.split('/').length;																																	//	\
	var sP=Path.split('/');																																			//	\
	if (num==1) { partTreeObject['Tree'][sP[0]][newObject]={};	}																									//	\
	if (num==2) { partTreeObject['Tree'][sP[0]][sP[1]][newObject]={};	}																							//	\
	if (num==3) { partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][newObject]={}; }																						//	\
	if (num==4) { partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][newObject]={}; }																				//	\
	if (num==5) { partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][newObject]={}; }																		//	\
	if (num==6) { partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][newObject]={};}																	//	\
	if (num==7) { partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]][newObject]={}; }															//	\
	if (num==8) { partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]][sP[7]][newObject]={}; }													//	\
	if (num==9) { partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]][sP[7]][sP[8]][newObject]={}; }											//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------ DELETE AN OBJECT ---------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function takes in an object path and deletes that object.																										\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function deleteObject(Path)																																			//	\
{	var num=Path.split('/').length;																																	//	\
	var sP=Path.split('/');																																			//	\
	if (num==1) { delete partTreeObject['Tree'][sP[0]];	}																											//	\
	if (num==2) { delete partTreeObject['Tree'][sP[0]][sP[1]];	}																									//	\
	if (num==3) { delete partTreeObject['Tree'][sP[0]][sP[1]][sP[2]]; }																								//	\
	if (num==4) { delete partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]]; }																						//	\
	if (num==5) { delete partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]]; }																				//	\
	if (num==6) { delete partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]];}																			//	\
	if (num==7) { delete partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]]; }																	//	\
	if (num==8) { delete partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]][sP[7]]; }															//	\
	if (num==9) { delete partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]][sP[7]][sP[8]]; }													//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------- BUBBLE UP AN ACTIVE ITEM ------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	When a user clicks on a system or part to make it active in a calculation the code must ensure that all parent systems are included. This code simply does that.	\
	It is a recursive function that strips off the last entry and then activates the system and recalls the function.													\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function bubbleUp(Path)																																				//	\
{	console.log('The Path is '+Path);
	Path=Path.replace(/\/[0-9a-zA-Z]+$/,'');																														//	\
	var num=Path.split('/').length;																																	//	\
	var sP=Path.split('/');																																			//	\
	var thisObject={};																																				//	\
	if (num==1) { thisObject=partTreeObject['Tree'][sP[0]];	}																										//	\
	if (num==2) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]];	}																								//	\
	if (num==3) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]]; }																							//	\
	if (num==4) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]]; }																					//	\
	if (num==5) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]]; }																			//	\
	if (num==6) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]];}																		//	\
	if (num==7) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]]; }																//	\
	if (num==8) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]][sP[7]]; }														//	\
	if (num==9) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]][sP[7]][sP[8]]; }												//	\
	thisObject['active']=1;																																			//	\
	$('.includeMeNot[systemID="'+Path+'"]').addClass('includeMe').removeClass('includeMeNot');																		//	\
	if (num>1){ bubbleUp(Path); }																																	//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------- SHOW A PROPERTY --------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function shows what happens whenever a user enters a property to be displayed on the right side of the property line. The code grabs all the IDs of the 		\
	parts and systems that are to be displayed. It then packages those into an object and sends that object to a web worker. This worker grabs the property for each	\
	item and sends them back to the main code to be displayed. It also sums up the properties for the systems and sends those back.										\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('keyup', '#partListProperty', function(e)																											//	\
{	if ((e.keyCode == 13)||(e.which == 13)) 																														//	\
	{	$('.propertyValue').html('-');																																//	\
		var partTreeWorker = new Worker("http://www.cadwolf.com/js/partTreeSolver.js");																				//	\
		partTreeWorker.postMessage({																																//	\
			"fileName":window.location.href,																														//	\
			"parameter":$('#partListProperty').val(),																												//	\
			"partTreeObj":JSON.stringify(partTreeObject)																											//	\
		});																																							//	\
		partTreeWorker.onmessage = function(e) {																													//	\
			returnObject=e.data;																																	//	\
			var systemObj={};																																		//	\
			var thisData=JSON.parse(returnObject.responseData);																										//	\
			var parameter=returnObject.parameterKey;																												//	\
			for (var thisKey in thisData)																															//	\
			{	var newKey=thisKey.replace(/\//g,'-');																												//	\
				$('#'+newKey).html(thisData[thisKey]); 																												//	\
				changeProperty(thisKey, 'Value', thisData[thisKey]); 																								//	\
				var re=/\-[,0-9, a-z, A-Z]+$/;																														//	\
				thisSystem=newKey.replace(re, '');																													//	\
				systemObj[thisSystem]=1;																															//	\
			}																																						//	\	
			sumSystems(systemObj, parameter);																														//	\	
		};																																							//	\	
	}																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------ SUM A SYSTEMS PROPERTIES -------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is called after the properties from a system are downloaded. It takes the systems in question and sums those properties. 																			\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function sumSystems(systemObj, property)																															//	\
{	var thisSum='0', newID='', newObj={}, num=0, test='', sumNum=0;																									//	\
	for (var systemID in systemObj)																																	//	\
	{	var num=systemID.split('-').length;																															//	\
		var sP=systemID.split('-');																																	//	\
		if (num==1) { thisObject=partTreeObject['Tree'][sP[0]];	}																									//	\
		if (num==2) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]];	}																							//	\
		if (num==3) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]]; }																						//	\
		if (num==4) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]]; }																				//	\
		if (num==5) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]]; }																		//	\
		if (num==6) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]];}																	//	\
		if (num==7) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]]; }															//	\
		if (num==8) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]][sP[7]]; }													//	\
		if (num==9) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]][sP[7]][sP[8]]; }											//	\
		thisSum='0';																																				//	\
		for (var thisID in thisObject)																																//	\
		{	if ((thisObject[thisID]['Value']!==undefined)&&(thisObject[thisID]['active']=='1'))																		//	\
			{	num=thisObject[thisID]['Value'].match(/^[0-9.]+/); 																									//	\
				sumNum=thisSum.match(/^[0-9.]+/);																													//	\
				thisSum=parseFloat(sumNum[0])+(parseFloat(num[0])*parseInt(thisObject[thisID]['quantity'],10)); 													//	\
				test=thisObject[thisID]['Value'].split(' ');																										//	\
				if (test.length>1) { thisSum=thisSum+' '+test[1]; }																									//	\
		} 	}																																						//	\
		thisObject['Value']=thisSum.toString();																														//	\
		$('#'+systemID).html(thisSum);																																//	\
		newID=systemID.replace(/\-[0-9a-zA-Z]+$/, '');																												//	\
		if (newID!=systemID) { newObj[newID]=1; }																													//	\
	}																																								//	\
	if (Object.keys(newObj).length>0) { sumSystems(newObj, property);	}																							//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------- CLICK ON A PART LOGO TO OPEN THE DOCUMENT ------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '.partLogo', function(e)																													//	\
{	var path=$(this).closest('.partLine').attr('partID');																											//	\
	path=path.replace(/-/g,'/');																																	//	\
	var thisAddress=window.location.href;																															//	\
	thisAddress=thisAddress.replace('http://www.cadwolf.com/PartTree/','');																							//	\
	window.location.href='http://www.cadwolf.com/Documents/'+thisAddress+'/'+path;																					//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------ EDIT THE QUANTITY --------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function shows what happens whenever a user enters a new quantity. The number is forced into being an integer and then updated via an ajax function.			\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('keyup', '.quantityBlock', function(e)																												//	\
{	if ((e.keyCode == 13)||(e.which == 13)) 																														//	\
	{	var systemID='';																																			//	\
		var thisQuantity=$(this).val();																																//	\
		if ((thisQuantity%1!=0)||(thisQuantity<1)){ thisQuantity=1; $(this).val('1'); }																				//	\
		if ($(this).parent('.partLine').length>0) { systemID=$(this).parent('.partLine').attr('partID'); }															//	\
		if ($(this).parent('.systemLine').length>0) { systemID=$(this).parent('.systemLine').attr('systemID'); }													//	\
		var num=systemID.split('/').length;																															//	\
		var sP=systemID.split('/');																																	//	\
		if (num==1) { thisObject=partTreeObject['Tree'][sP[0]];	}																									//	\
		if (num==2) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]];	}																							//	\
		if (num==3) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]]; }																						//	\
		if (num==4) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]]; }																				//	\
		if (num==5) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]]; }																		//	\
		if (num==6) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]];}																	//	\
		if (num==7) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]]; }															//	\
		if (num==8) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]][sP[7]]; }													//	\
		if (num==9) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]][sP[7]][sP[8]]; }											//	\
		thisObject['quantity']=thisQuantity;																														//	\
		$.ajax ({																																					//	\
			type:"POST", url:"/PartTree/updateQuantity", data: { thisFile:window.location.href, systemID:systemID.replace(/ /g,'_'), quantity:thisQuantity	},		//	\
			success: function(data) 																																//	\
		    {																																						//	\
			},																																						//	\
			error: function () { }																																	//	\
		});																																							//	\			
	}																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------- ITEMS RELATED TO THE PERMISSIONS VIEW -----------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------- VIEW THE CONTENTS OF A SYSTEM -------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is called whenever the user clicks on a system line. It shows the contents of a system.																\ 
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '.systemPermName, .systemPermLogo', function(e)																								//	\
{	myDiv=this, includeMe=0, thisObject={}, addText='';																												//	\
	includeMe=$(myDiv).closest('.systemBlock').children('.systemLine').find('.includeMe').length;																	//	\
	var Path=$(this).closest('.systemBlock').attr('systemID');																										//	\
	var thisLength=Object.keys(partTreeObject['dataBlocks']).length;																								//	\
	var num=Path.split('/').length;																																	//	\
	var sP=Path.split('/');																																			//	\
	var width=1000-(num*30);																																		//	\
	if (num==1) { thisObject=partTreeObject['Tree'][sP[0]]; }																										//	\
	if (num==2) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]]; }																								//	\
	if (num==3) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]]; }																							//	\
	if (num==4) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]]; }																					//	\
	if (num==5) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]]; }																			//	\
	if (num==6) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]]; }																	//	\
	if (num==7) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]]; }																//	\
	if ($(this).closest('.systemBlock').hasClass('notDisplayed'))																									//	\
	{	for (var index in thisObject)																																//	\
		{	if (typeof(thisObject[index])=="object")																												//	\
			{	if ((thisObject[index]['type']==0)&&(index!=="permissions"))																						//	\
				{	addText=addText+'<ol class="systemBlock notDisplayed" style=width:'+width+'px systemID="'+Path+'/'+index+'">';									//	\
						addText=addText+'<li class="systemLine" systemID="'+Path+'/'+index+'">';																	//	\
							addText=addText+'<div class="systemPermLogo"></div>';																					//	\
							addText=addText+'<div class="systemPermName">'+index+'</div>';																			//	\
							addText=addText+'<div class="permBar">';																								//	\
								if (thisObject[index]['adminStatus']=="0") 																							//	\
								{	addText=addText+'<div class="permWrapper" permType="admin"><div class="listPerm" systemID="'+Path+'/'+index+'">Admin : As Listed</div><div class="editList"></div></div>';}	//	\
								if (thisObject[index]['adminStatus']=="2") 																							//	\
								{	addText=addText+'<div class="permWrapper" permType="admin"><div class="inheritPerm" systemID="'+Path+'/'+index+'">Admin : Inherited</div></div>';}//	\
								if (thisObject[index]['editStatus']=="0") 																							//	\
								{	addText=addText+'<div class="permWrapper" permType="edit"><div class="listPerm" systemID="'+Path+'/'+index+'">Edit : As Listed</div><div class="editList"></div></div>';}	//	\
								if (thisObject[index]['editStatus']=="2") 																							//	\
								{	addText=addText+'<div class="permWrapper" permType="edit"><div class="inheritPerm" systemID="'+Path+'/'+index+'">Edit : Inherited</div></div>';}//	\
								if (thisObject[index]['useStatus']=="0") 																								//	\
								{	addText=addText+'<div class="permWrapper" permType="use"><div class="listPerm" systemID="'+Path+'/'+index+'">Use : As Listed</div><div class="editList"></div></div>';}	//	\
								if (thisObject[index]['useStatus']=="1") 																								//	\
								{	addText=addText+'<div class="permWrapper" permType="use"><div class="openPerm" systemID="'+Path+'/'+index+'">Use : Everyone</div></div>';}			//	\
								if (thisObject[index]['useStatus']=="2") 																								//	\
								{	addText=addText+'<div class="permWrapper" permType="use"><div class="inheritPerm" systemID="'+Path+'/'+index+'">Use : Inherited</div></div>';}	//	\
								if (thisObject[index]['viewStatus']=="0") 																							//	\
								{	addText=addText+'<div class="permWrapper" permType="view"><div class="listPerm" systemID="'+Path+'/'+index+'">View : As Listed</div><div class="editList"></div></div>';}		//	\
								if (thisObject[index]['viewStatus']=="1") 																							//	\
								{	addText=addText+'<div class="permWrapper" permType="view"><div class="openPerm" systemID="'+Path+'/'+index+'">View : Everyone</div></div>';}			//	\
								if (thisObject[index]['viewStatus']=="2") 																							//	\
								{	addText=addText+'<div class="permWrapper" permType="view"><div class="inheritPerm" systemID="'+Path+'/'+index+'">View : Inherited</div></div>';}//	\
							addText=addText+'</div>';																												//	\
						addText=addText+'</li>';																													//	\
					addText=addText+'</ol>';																														//	\
					$(myDiv).closest('.systemLine').siblings('.systemBlock').remove();																				//	\
					$(myDiv).closest('.systemBlock').append(addText);																								//	\
				}else if (index!=="permissions")																													//	\
				{	addText=addText+'<li class="partLine" style=width:'+width+'px partID="'+Path+'/'+index+'">';													//	\
						addText=addText+'<div class="partPermLogo"></div>';																							//	\
						addText=addText+'<div class="partPermName">'+Path+'/'+index+'</div>';																		//	\
							addText=addText+'<div class="permBar">';																								//	\
								if (thisObject[index]['adminStatus']=="0") 																							//	\
								{	addText=addText+'<div class="permWrapper" permType="admin"><div class="listPerm" systemID="'+Path+'/'+index+'">Admin : As Listed</div><div class="editList"></div></div>';}	//	\
								if (thisObject[index]['adminStatus']=="2") 																							//	\
								{	addText=addText+'<div class="permWrapper" permType="admin"><div class="inheritPerm" systemID="'+Path+'/'+index+'">Admin : Inherited</div></div>';}//	\
								if (thisObject[index]['editStatus']=="0") 																							//	\
								{	addText=addText+'<div class="permWrapper" permType="edit"><div class="listPerm" systemID="'+Path+'/'+index+'">Edit : As Listed</div><div class="editList"></div></div>';}	//	\
								if (thisObject[index]['editStatus']=="2") 																							//	\
								{	addText=addText+'<div class="permWrapper" permType="edit"><div class="inheritPerm" systemID="'+Path+'/'+index+'">Edit : Inherited</div></div>';}//	\
								if (thisObject[index]['useStatus']=="0") 																								//	\
								{	addText=addText+'<div class="permWrapper" permType="use"><div class="listPerm" systemID="'+Path+'/'+index+'">Use : As Listed</div><div class="editList"></div></div>';}	//	\
								if (thisObject[index]['useStatus']=="1") 																								//	\
								{	addText=addText+'<div class="permWrapper" permType="use"><div class="openPerm" systemID="'+Path+'/'+index+'">Use : Everyone</div></div>';}			//	\
								if (thisObject[index]['useStatus']=="2") 																								//	\
								{	addText=addText+'<div class="permWrapper" permType="use"><div class="inheritPerm" systemID="'+Path+'/'+index+'">Use : Inherited</div></div>';}	//	\
								if (thisObject[index]['viewStatus']=="0") 																							//	\
								{	addText=addText+'<div class="permWrapper" permType="view"><div class="listPerm" systemID="'+Path+'/'+index+'">View : As Listed</div><div class="editList"></div></div>';}	//	\
								if (thisObject[index]['viewStatus']=="1") 																							//	\
								{	addText=addText+'<div class="permWrapper" permType="view"><div class="openPerm" systemID="'+Path+'/'+index+'">View : Everyone</div></div>';}			//	\
								if (thisObject[index]['viewStatus']=="2") 																							//	\
								{	addText=addText+'<div class="permWrapper" permType="view"><div class="inheritPerm" systemID="'+Path+'/'+index+'">View : Inherited</div></div>';}//	\
							addText=addText+'</div>';																												//	\
					addText=addText+'</li>';																														//	\
					$(myDiv).closest('.systemLine').siblings('.partLine').remove();																					//	\
					$(myDiv).closest('.systemBlock').append(addText);																								//	\
				}																																					//	\
			}																																						//	\
		}																																							//	\
		$(this).closest('.systemBlock').addClass('isDisplayed').removeClass('notDisplayed');																		//	\
	}else																																							//	\
	{	$(this).closest('.systemBlock').addClass('notDisplayed').removeClass('isDisplayed');																		//	\
		$(this).closest('.systemBlock').children('.systemBlock').remove();																							//	\
		$(this).closest('.systemBlock').children('.partLine').remove();																								//	\
	}																																								//	\
	myDiv='';																																						//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------ CLICK ON A PERMISSION WITH INTENT TO EDIT IT -----------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	When a user wants to change a permission between inheriting it, setting a list of users, and everyone, they click on the permission in question and an option box	\
	is shown.																																							\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '.inheritPerm, .openPerm, .listPerm', function(e)																							//	\
{	var htmlText='';										 																										//	\
	var permType=$(this).closest('.permWrapper').attr('permType');																									//	\
	$('.permWrapperActive').find('.permSelectBox, .permSelectBoxSmall').remove(); 																					//	\
	$('.permWrapperActive').removeClass('permWrapperActive'); 																										//	\
	$(this).closest('.permWrapper').addClass('permWrapperActive');																									//	\
	if ((permType=="admin")||(permType=="edit"))																													//	\
	{	htmlText='<div class="permSelectBoxSmall">';																												//	\
			htmlText=htmlText+'<div class="permSelectLine"><div class="permInherit">Inherited</div></div>';															//	\
			htmlText=htmlText+'<div class="permSelectLine"><div class="permList">As Listed</div></div>';															//	\
		htmlText=htmlText+'</div>';																																	//	\
	}else																																							//	\
	{	htmlText='<div class="permSelectBox">';																														//	\
			htmlText=htmlText+'<div class="permSelectLine"><div class="permInherit">Inherited</div></div>';															//	\
			htmlText=htmlText+'<div class="permSelectLine"><div class="permOpen">Everyone</div></div>';																//	\
			htmlText=htmlText+'<div class="permSelectLine"><div class="permList">As Listed</div></div>';															//	\
		htmlText=htmlText+'</div>';																																	//	\
	}																																								//	\
	$(this).closest('.permWrapper').append(htmlText);																												//	\
																																									//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------- SELECT A PERMISSION FOR A FILE OR FOLDER -------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	By selecting one of the options for the permission, the code alters the appearance of the permission and sets the database accordingly.								\
	Rules : Admin and Edit permissions cannot be set to everyone. They can only be set to a list or inherit																\
			When a permission is set to list, all higher permissions are set to list as well. An use permission cannot be for everyone while only some can view. Also,	\
				an edit perm cannot inherit while a view or use has a list.																								\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '.permOpen, .permList, .permInherit', function(e)																							//	\
{	var perm='', systemID='', openHtml='', listHtml='', inheritHtml='', permType='';																				//	\
	myDiv=this.closest('.permBar');							 																										//	\
	permType=$(this).closest('.permWrapperActive').attr('permType').replace(/\w\S*/g,function(txt){return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase();});//	\
	$(this).closest('.partLine, .systemLine').find('.editUserBlock').remove();																						//	\
	if ($(this).hasClass('permOpen')){ perm="open"; } 																												//	\
	if ($(this).hasClass('permList')){ perm="list"; } 																												//	\
	if ($(this).hasClass('permInherit')){ perm="inherit"; } 																										//	\
	if ($(this).closest('.partLine').length>0){ systemID=$(this).closest('.partLine').attr('partID'); } 															//	\
	if ($(this).closest('.systemLine').length>0){ systemID=$(this).closest('.systemLine').attr('systemID'); } 														//	\
	$.ajax ({																																						//	\
		type:"POST", url:"/PartTree/updatePermission", data:{thisFile:window.location.href,systemID:systemID.replace(/ /g,'_'), permType:permType, permission:perm},//	\
		success: function(data) 																																	//	\
	    {	myData=JSON.parse(data); 																																//	\
			if (myData.error!==undefined)																															//	\
			{	$('#errorLine').html(myData.error);																													//	\
			}else																																					//	\
			{	var num=systemID.split('/').length;																													//	\
				var sP=systemID.split('/');																															//	\
				if (num==1) { thisObject=partTreeObject['Tree'][sP[0]]; }																							//	\
				if (num==2) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]]; }																					//	\
				if (num==3) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]]; }																				//	\
				if (num==4) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]]; }																		//	\
				if (num==5) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]]; }																//	\
				if (num==6) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]]; }														//	\
				if (num==7) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]]; }													//	\
				if (myData.admin.toString()=="0"){ $(myDiv).find('.permWrapper[permType=admin]').html('<div class="listPerm" systemID="'+systemID+'" permType="admin">Admin - As Listed</div><div class="editList"></div>'); }	
				if (myData.admin.toString()=="2"){ $(myDiv).find('.permWrapper[permType=admin]').html('<div class="inheritPerm" systemID="'+systemID+'" permType="admin">Admin - Inherited</div>'); }	
				if (myData.edit.toString()=="0"){ $(myDiv).find('.permWrapper[permType=edit]').html('<div class="listPerm" systemID="'+systemID+'" permType="edit">Edit - As Listed</div><div class="editList"></div>'); }	
				if (myData.edit.toString()=="2"){ $(myDiv).find('.permWrapper[permType=edit]').html('<div class="inheritPerm" systemID="'+systemID+'" permType="edit">Edit - Inherited</div>'); }	
				if (myData.use.toString()=="0"){ $(myDiv).find('.permWrapper[permType=use]').html('<div class="listPerm" systemID="'+systemID+'" permType="use">Use - As Listed</div><div class="editList"></div>'); }	
				if (myData.use.toString()=="1"){ $(myDiv).find('.permWrapper[permType=use]').html('<div class="openPerm" systemID="'+systemID+'" permType="use">Use - Everyone</div>'); }	
				if (myData.use.toString()=="2"){ $(myDiv).find('.permWrapper[permType=use]').html('<div class="inheritPerm" systemID="'+systemID+'" permType="use">Use - Inherited</div>'); }	
				if (myData.view.toString()=="0"){ $(myDiv).find('.permWrapper[permType=view]').html('<div class="listPerm" systemID="'+systemID+'" permType="view">View - As Listed</div><div class="editList"></div>'); }	
				if (myData.view.toString()=="1"){ $(myDiv).find('.permWrapper[permType=view]').html('<div class="openPerm" systemID="'+systemID+'" permType="view">View - Everyone</div>'); }	
				if (myData.view.toString()=="2"){ $(myDiv).find('.permWrapper[permType=view]').html('<div class="inheritPerm" systemID="'+systemID+'" permType="view">View - Inherited</div>'); }	
				$('.permWrapper').removeClass('permWrapperActive'); 																								//	\
		 		$('.permSelectBox').remove(); 																														//	\
				thisObject['adminStatus']=myData.admin;																												//	\
				thisObject['editStatus']=myData.edit;																												//	\
				thisObject['useStatus']=myData.use;																													//	\
				thisObject['viewStatus']=myData.view;																												//	\
			}																																						//	\
		},																																							//	\
	    error: function () { alert('There was an error updating that permission.');}																				//	\
	});																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------- CLICK ON AN ICON TO ADD OR REMOVE USERS ON THE PERMISSIONS LIST -------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	An icon is shown next to all items with a permission of 2 meaning that the user must be on the list. By clicking this icon, the user is shown both an input box 	\
	to enter new names of users and groups and a list of current users with permisssion and the option to delete those users individually.								\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '.editList', function(e)																													//	\
{	var htmlText='', permission='';							 																										//	\
	var systemID=$(this).siblings('.listPerm').attr('systemID');																									//	\
	var num=systemID.split('/').length;																																//	\
	var sP=systemID.split('/');																																		//	\
	$(this).closest('.partLine, .systemLine').find('.editUserBlock').remove();																						//	\
	var permType=$(this).closest('.permWrapper').attr('permType');																									//	\
	if (permType=="view"){ permission="view_status"; }																												//	\
	if (permType=="use"){ permission="use_status"; }																												//	\
	if (permType=="edit"){ permission="edit_status"; }																												//	\
	if (permType=="admin"){ permission="admin_status"; }																											//	\
	if (num==1) { thisObject=partTreeObject['Tree'][sP[0]]; }																										//	\
	if (num==2) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]]; }																								//	\
	if (num==3) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]]; }																							//	\
	if (num==4) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]]; }																					//	\
	if (num==5) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]]; }																			//	\
	if (num==6) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]]; }																	//	\
	if (num==7) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]]; }																//	\
	htmlText=htmlText+'<div class="editUserBlock">';																												//	\
		htmlText=htmlText+'<div id="errorLine"></div>';																												//	\
		htmlText=htmlText+'<div class="enterUserLine"><input class="newUser" permType="'+permType+'" systemID="'+systemID+'" placeholder="Enter User Name"><div class="closeUserBlock"></div></div>';				//	\
		htmlText=htmlText+'<div class="usersBlock">';																												//	\
		htmlText=htmlText+'<div id="usersTitles"><div id="usersTitle1">User Name</div>';																			//	\
			htmlText=htmlText+'<div id="usersTitle2">Admin</div>';																									//	\
			htmlText=htmlText+'<div id="usersTitle3">Edit</div>';																									//	\
			htmlText=htmlText+'<div id="usersTitle4">Use</div>';																									//	\
			htmlText=htmlText+'<div id="usersTitle5">View</div>';																									//	\
		htmlText=htmlText+'</div>';																																	//	\
		for (var perm in thisObject['permissions'])																													//	\
		{	var admin=getInheritedPermission("admin", thisObject['permissions'][perm]['username'], systemID, systemID);												//	\
			var edit=getInheritedPermission("edit", thisObject['permissions'][perm]['username'], systemID, systemID);												//	\
			var use=getInheritedPermission("use", thisObject['permissions'][perm]['username'], systemID, systemID);													//	\
			var view=getInheritedPermission("view", thisObject['permissions'][perm]['username'], systemID, systemID);												//	\
			htmlText=htmlText+'<div class="userPermLine">';																											//	\
				htmlText=htmlText+'<div class="permUser">'+thisObject['permissions'][perm]['username']+'</div>'; 													//	\
				if (admin.toString()=='1')		{	htmlText=htmlText+'<div class="permEveryone" permType="admin" systemID="'+systemID+'"></div>'; 					//	\
				}else if (admin.toString()=='1a'){ 	htmlText=htmlText+'<div class="permYes" permType="admin" systemID="'+systemID+'"></div>'; 		 				//	\
				}else if (admin.toString()=='0a'){ 	htmlText=htmlText+'<div class="permNo" permType="admin" systemID="'+systemID+'"></div>'; 		 				//	\
				}else if (admin.toString()=='1b'){ 	htmlText=htmlText+'<div class="permYesInherit" permType="admin" systemID="'+systemID+'"></div>'; 				//	\
				}else if (admin.toString()=='0b'){ 	htmlText=htmlText+'<div class="permNoInherit" permType="admin" systemID="'+systemID+'"></div>'; }				//	\
				if (edit.toString()=='1')		{	htmlText=htmlText+'<div class="permEveryone" permType="edit" systemID="'+systemID+'"></div>'; 					//	\
				}else if (edit.toString()=='1a'){ 	htmlText=htmlText+'<div class="permYes" permType="edit" systemID="'+systemID+'"></div>'; 		 				//	\
				}else if (edit.toString()=='0a'){ 	htmlText=htmlText+'<div class="permNo" permType="edit" systemID="'+systemID+'"></div>'; 		 				//	\
				}else if (edit.toString()=='1b'){ 	htmlText=htmlText+'<div class="permYesInherit" permType="edit" systemID="'+systemID+'"></div>'; 				//	\
				}else if (edit.toString()=='0b'){ 	htmlText=htmlText+'<div class="permNoInherit" permType="edit" systemID="'+systemID+'"></div>'; }				//	\
				if (use.toString()=='1')		{	htmlText=htmlText+'<div class="permEveryone" permType="use" systemID="'+systemID+'"></div>'; 					//	\
				}else if (use.toString()=='1a'){ 	htmlText=htmlText+'<div class="permYes" permType="use" systemID="'+systemID+'"></div>'; 		 				//	\
				}else if (use.toString()=='0a'){ 	htmlText=htmlText+'<div class="permNo" permType="use" systemID="'+systemID+'"></div>'; 		 					//	\
				}else if (use.toString()=='1b'){ 	htmlText=htmlText+'<div class="permYesInherit" permType="use" systemID="'+systemID+'"></div>'; 					//	\
				}else if (use.toString()=='0b'){ 	htmlText=htmlText+'<div class="permNoInherit" permType="use" systemID="'+systemID+'"></div>'; }					//	\
				if (view.toString()=='1')		{	htmlText=htmlText+'<div class="permEveryone" permType="view" systemID="'+systemID+'"></div>'; 					//	\
				}else if (view.toString()=='1a'){ 	htmlText=htmlText+'<div class="permYes" permType="view" systemID="'+systemID+'"></div>'; 		 				//	\
				}else if (view.toString()=='0a'){ 	htmlText=htmlText+'<div class="permNo" permType="view" systemID="'+systemID+'"></div>'; 		 				//	\
				}else if (view.toString()=='1b'){ 	htmlText=htmlText+'<div class="permYesInherit" permType="view" systemID="'+systemID+'"></div>'; 				//	\
				}else if (view.toString()=='0b'){ 	htmlText=htmlText+'<div class="permNoInherit" permType="view" systemID="'+systemID+'"></div>'; }				//	\
				htmlText=htmlText+'<div class="permDelete" userName="'+thisObject['permissions'][perm]['username']+'" systemID="'+systemID+'"></div>'; 				//	\
			htmlText=htmlText+'</div>';																																//	\
		}																																							//	\
	htmlText=htmlText+'</div>';																																		//	\
	$(this).closest('.partLine, .systemLine').append(htmlText);																										//	\
																																									//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------ CLOSE THE USER EDIT BLOCK ------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	When the user has finished editing the user data, they click on the icon to close the block. This just removes that HTML from the DOM.								\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '.closeUserBlock', function(e)																												//	\
{	$(this).closest('.editUserBlock').remove();				 																										//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------ DELETE A USER PERMISSION -------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the case where the user clicks to delete the permissions of one user. The code removes the HTML element from the DOM and then pings the server to remove	\
	the permission from there.																																			\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '.permDelete', function(e)																													//	\
{	var systemID=$(this).attr('systemID');																															//	\
	var userName=$(this).attr('userName');																															//	\
	myDiv=this;																																						//	\
	$.ajax ({																																						//	\
		type:"POST", url:"/PartTree/deleteUserPerm", data:{thisFile:window.location.href, systemID:systemID.replace(/ /g,'_'), userName:userName.replace(/ /g,'_')},//	\
		success: function(data) 																																	//	\
		{	if (myData.error!==undefined)																															//	\
			{	$('#errorLine').html(myData.error);																													//	\
			}else																																					//	\
			{	$(myDiv).closest('.userPermLine').remove();		}																									//	\
		},																																							//	\
	    error: function () { alert('There was an error deleting that permission.');}																				//	\
	});																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------- ADD A USER PERMISSION ---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the case where the wants to add a new user to the list. The and it returns the default permissions based on this file or folders settings. This code then	\
	updates the data here and the DOM.																																	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('keyup', '.newUser', function(e)																														//	\
{	if ((e.keyCode == 13)||(e.which == 13)) 																														//	\
	{	var systemID=$(this).attr('systemID');																														//	\
		var userName=$(this).val();																																	//	\
		var num=systemID.split('/').length;																															//	\
		var sP=systemID.split('/');																																	//	\
		myDiv=this;																																					//	\
		if (num==1) { thisObject=partTreeObject['Tree'][sP[0]]; }																									//	\
		if (num==2) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]]; }																							//	\
		if (num==3) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]]; }																						//	\
		if (num==4) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]]; }																				//	\
		if (num==5) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]]; }																		//	\
		if (num==6) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]]; }																//	\
		if (num==7) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]]; }															//	\
		$.ajax ({																																					//	\
			type:"POST", url:"/PartTree/addUserPerm", data: { thisFile:window.location.href,systemID:systemID.replace(/ /g,'_'),userName:userName.replace(/ /g,'_')},//	\
			success: function(data) 																																//	\
			{	var myData=JSON.parse(data);																														//	\
				if (myData.error!==undefined)																														//	\
				{	$('#errorLine').html(myData.error);																												//	\
				}else																																				//	\
				{	var newIndex=thisObject['permissions'].length;																									//	\
					thisObject['permissions'][newIndex]={};							 																				//	\
					thisObject['permissions'][newIndex]['username']=userName;		 																				//	\
					thisObject['permissions'][newIndex]['userid']=myData.userid;		 																			//	\
					thisObject['permissions'][newIndex]['usertype']=myData.usertype;		 																		//	\
					thisObject['permissions'][newIndex]['admin']=myData.admin;		 																				//	\
					thisObject['permissions'][newIndex]['edit']=myData.edit;		 																				//	\
					thisObject['permissions'][newIndex]['use']=myData.use;		 																					//	\
					thisObject['permissions'][newIndex]['view']=myData.view;		 																				//	\
					var admin=getInheritedPermission("admin", userName, systemID, systemID);																		//	\
					var edit=getInheritedPermission("edit", userName, systemID, systemID);																			//	\
					var use=getInheritedPermission("use", userName, systemID, systemID);																			//	\
					var view=getInheritedPermission("view", userName, systemID, systemID);																			//	\
					htmlText='<div class="userPermLine">';																											//	\
						htmlText=htmlText+'<div class="permUser">'+thisObject['permissions'][newIndex]['username']+'</div>'; 										//	\
						if (admin.toString()=='1')		{	htmlText=htmlText+'<div class="permEveryone" permType="admin" systemID="'+systemID+'"></div>'; 			//	\
						}else if (admin.toString()=='1a'){ 	htmlText=htmlText+'<div class="permYes" permType="admin" systemID="'+systemID+'"></div>'; 		 		//	\
						}else if (admin.toString()=='0a'){ 	htmlText=htmlText+'<div class="permNo" permType="admin" systemID="'+systemID+'"></div>'; 		 		//	\
						}else if (admin.toString()=='1b'){ 	htmlText=htmlText+'<div class="permYesInherit" permType="admin" systemID="'+systemID+'"></div>'; 		//	\
						}else if (admin.toString()=='0b'){ 	htmlText=htmlText+'<div class="permNoInherit" permType="admin" systemID="'+systemID+'"></div>'; }		//	\
						if (edit.toString()=='1')		{	htmlText=htmlText+'<div class="permEveryone" permType="edit" systemID="'+systemID+'"></div>'; 			//	\
						}else if (edit.toString()=='1a'){ 	htmlText=htmlText+'<div class="permYes" permType="edit" systemID="'+systemID+'"></div>'; 		 		//	\
						}else if (edit.toString()=='0a'){ 	htmlText=htmlText+'<div class="permNo" permType="edit" systemID="'+systemID+'"></div>'; 		 		//	\
						}else if (edit.toString()=='1b'){ 	htmlText=htmlText+'<div class="permYesInherit" permType="edit" systemID="'+systemID+'"></div>'; 		//	\
						}else if (edit.toString()=='0b'){ 	htmlText=htmlText+'<div class="permNoInherit" permType="edit" systemID="'+systemID+'"></div>'; }		//	\
						if (use.toString()=='1')		{	htmlText=htmlText+'<div class="permEveryone" permType="use" systemID="'+systemID+'"></div>'; 			//	\
						}else if (use.toString()=='1a'){ 	htmlText=htmlText+'<div class="permYes" permType="use" systemID="'+systemID+'"></div>'; 		 		//	\
						}else if (use.toString()=='0a'){ 	htmlText=htmlText+'<div class="permNo" permType="use" systemID="'+systemID+'"></div>'; 		 			//	\
						}else if (use.toString()=='1b'){ 	htmlText=htmlText+'<div class="permYesInherit" permType="use" systemID="'+systemID+'"></div>'; 			//	\
						}else if (use.toString()=='0b'){ 	htmlText=htmlText+'<div class="permNoInherit" permType="use" systemID="'+systemID+'"></div>'; }			//	\
						if (view.toString()=='1')		{	htmlText=htmlText+'<div class="permEveryone" permType="view" systemID="'+systemID+'"></div>'; 			//	\
						}else if (view.toString()=='1a'){ 	htmlText=htmlText+'<div class="permYes" permType="view" systemID="'+systemID+'"></div>'; 		 		//	\
						}else if (view.toString()=='0a'){ 	htmlText=htmlText+'<div class="permNo" permType="view" systemID="'+systemID+'"></div>'; 		 		//	\
						}else if (view.toString()=='1b'){ 	htmlText=htmlText+'<div class="permYesInherit" permType="view" systemID="'+systemID+'"></div>'; 		//	\
						}else if (view.toString()=='0b'){ 	htmlText=htmlText+'<div class="permNoInherit" permType="view" systemID="'+systemID+'"></div>'; }		//	\
						htmlText=htmlText+'<div class="permDelete" userName="'+thisObject['permissions'][newIndex]['username']+'" systemID="'+systemID+'"></div>'; 	//	\
					htmlText=htmlText+'</div>';																														//	\
					$(myDiv).closest('.editUserBlock').find('.usersBlock').append(htmlText); 																		//	\
				}																																					//	\
			},																																						//	\
		    error: function () { alert('There was an error adding that permission.');}																				//	\
		});																																							//	\
	}																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------- GET THE INHERITED PERMISSION FOR A FOLDER AND USER ---------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is given a system ID and it then goes up the folder tree and finds the closest folder that isn't inherited. 											\
	1 - Came to folder where permission is sset to everyone 																											\
	1a - this folder has list permission with the user on it with permission 																							\
	0a - this folder has list permission without the user on it. 																										\
	1b - came to a folder that has list permission with the user on it with permission 																					\
	0b - came to a folder that has list permission without the user on it. 																								\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function getInheritedPermission(permType, userName, systemID, parentSystem)																							//	\
{	var permission='0';																																				//	\
	var num=systemID.split('/').length;																																//	\
	var sP=systemID.split('/');																																		//	\
	var admin=partTreeObject['Tree']['adminStatus'];																												//	\
	var edit=partTreeObject['Tree']['editStatus'];																													//	\
	var use=partTreeObject['Tree']['useStatus'];																													//	\
	var view=partTreeObject['Tree']['viewStatus'];																													//	\
	if (num==1) { thisObject=partTreeObject['Tree'][sP[0]]; }																										//	\
	if (num==2) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]]; }																								//	\
	if (num==3) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]]; }																							//	\
	if (num==4) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]]; }																					//	\
	if (num==5) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]]; }																			//	\
	if (num==6) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]]; }																	//	\
	if (num==7) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]]; }																//	\
	if (systemID==''){ thisObject=partTreeObject['Tree'];	}																										//	\
	if (thisObject[permType+'Status']=="1"){ return "1"; 																											//	\
	}else if (thisObject[permType+'Status']=="0")																													//	\
	{	for (pindex in thisObject['permissions'])																													//	\
		{	if (thisObject['permissions'][pindex]['username']==userName)																							//	\
			{	if (systemID==parentSystem)																															//	\
				{		if(thisObject['permissions'][pindex][permType]==true) { return "1a" }else { return "0a" } 													//	\
				}else{	if(thisObject['permissions'][pindex][permType]==true) { return "1b" }else { return "0b" } }	} }												//	\
		if (systemID==parentSystem){ return "0a" }else{ return "0b" } 																								//	\
	}else if (thisObject[permType+'Status']=="2")																													//	\
	{	var newSystemID=systemID.replace(/\-[0-9a-zA-Z]+$/,'');																										//	\
		if (newSystemID==systemID){newSystemID=''; }																												//	\
		return getInheritedPermission(permType, userName, newSystemID)																								//	\
	}																																								//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------- CHANGE A USERS PERMISSION -------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the case where the user has clicked on one of the permissions shown with the intent to change it. 															\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', '.permYes, .permNo', function(e)																											//	\
{	var systemID=$(this).attr('systemID');																															//	\
	var permType=$(this).attr('permType');																															//	\
	var userName=$(this).siblings('.permUser').html();																												//	\
	if ($(this).hasClass('permYes')) { var newPerm=0; }																												//	\
	if ($(this).hasClass('permNo')) { var newPerm=1; }																												//	\
	var num=systemID.split('/').length;																																//	\
	var sP=systemID.split('/');																																		//	\
	myDiv=this;																																						//	\
	if (num==1) { thisObject=partTreeObject['Tree'][sP[0]]; }																										//	\
	if (num==2) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]]; }																								//	\
	if (num==3) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]]; }																							//	\
	if (num==4) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]]; }																					//	\
	if (num==5) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]]; }																			//	\
	if (num==6) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]]; }																	//	\
	if (num==7) { thisObject=partTreeObject['Tree'][sP[0]][sP[1]][sP[2]][sP[3]][sP[4]][sP[5]][sP[6]]; }																//	\
		$.ajax ({																																					//	\
			type:"POST", url:"/PartTree/changeUserPerm", 																											//	\
			data: { thisFile:window.location.href, systemID:systemID.replace(/ /g,'_'), permType:permType, userName:userName.replace(/ /g,'_'), newPerm:newPerm },	//	\
			success: function(data) 																																//	\
			{	var myData=JSON.parse(data);																														//	\
				if (myData.error!==undefined)																														//	\
				{	$('#errorLine').html(myData.error);																												//	\
				}else																																				//	\
				{	for (var index in thisObject['permissions'])																									//	\
					{	if (thisObject['permissions'][index]['username']==userName) 																				//	\
						{	thisObject['permissions'][index]['view']=myData.view;																					//	\
							thisObject['permissions'][index]['use']=myData.use;																						//	\
							thisObject['permissions'][index]['edit']=myData.edit;																					//	\
							thisObject['permissions'][index]['admin']=myData.admin;																					//	\
						}																																			//	\
					}																																				//	\
					var admin=getInheritedPermission("admin", userName, systemID, systemID);																		//	\
					var edit=getInheritedPermission("edit", userName, systemID, systemID);																			//	\
					var use=getInheritedPermission("use", userName, systemID, systemID);																			//	\
					var view=getInheritedPermission("view", userName, systemID, systemID);																			//	\
					htmlText='<div class="permUser">'+userName+'</div>'; 																							//	\
					if (admin.toString()=='1')		{	htmlText=htmlText+'<div class="permEveryone" permType="admin" systemID="'+systemID+'"></div>'; 				//	\
					}else if (admin.toString()=='1a'){ 	htmlText=htmlText+'<div class="permYes" permType="admin" systemID="'+systemID+'"></div>'; 		 			//	\
					}else if (admin.toString()=='0a'){ 	htmlText=htmlText+'<div class="permNo" permType="admin" systemID="'+systemID+'"></div>'; 		 			//	\
					}else if (admin.toString()=='1b'){ 	htmlText=htmlText+'<div class="permYesInherit" permType="admin" systemID="'+systemID+'"></div>'; 			//	\
					}else if (admin.toString()=='0b'){ 	htmlText=htmlText+'<div class="permNoInherit" permType="admin" systemID="'+systemID+'"></div>'; }			//	\
					if (edit.toString()=='1')		{	htmlText=htmlText+'<div class="permEveryone" permType="edit" systemID="'+systemID+'"></div>'; 				//	\
					}else if (edit.toString()=='1a'){ 	htmlText=htmlText+'<div class="permYes" permType="edit" systemID="'+systemID+'"></div>'; 					//	\
					}else if (edit.toString()=='0a'){ 	htmlText=htmlText+'<div class="permNo" permType="edit" systemID="'+systemID+'"></div>'; 		 			//	\
					}else if (edit.toString()=='1b'){ 	htmlText=htmlText+'<div class="permYesInherit" permType="edit" systemID="'+systemID+'"></div>'; 			//	\
					}else if (edit.toString()=='0b'){ 	htmlText=htmlText+'<div class="permNoInherit" permType="edit" systemID="'+systemID+'"></div>'; }			//	\
					if (use.toString()=='1')		{	htmlText=htmlText+'<div class="permEveryone" permType="use" systemID="'+systemID+'"></div>'; 				//	\
					}else if (use.toString()=='1a'){ 	htmlText=htmlText+'<div class="permYes" permType="use" systemID="'+systemID+'"></div>'; 					//	\
					}else if (use.toString()=='0a'){ 	htmlText=htmlText+'<div class="permNo" permType="use" systemID="'+systemID+'"></div>'; 		 				//	\
					}else if (use.toString()=='1b'){ 	htmlText=htmlText+'<div class="permYesInherit" permType="use" systemID="'+systemID+'"></div>'; 				//	\
					}else if (use.toString()=='0b'){ 	htmlText=htmlText+'<div class="permNoInherit" permType="use" systemID="'+systemID+'"></div>'; }				//	\
					if (view.toString()=='1')		{	htmlText=htmlText+'<div class="permEveryone" permType="view" systemID="'+systemID+'"></div>'; 				//	\
					}else if (view.toString()=='1a'){ 	htmlText=htmlText+'<div class="permYes" permType="view" systemID="'+systemID+'"></div>'; 					//	\
					}else if (view.toString()=='0a'){ 	htmlText=htmlText+'<div class="permNo" permType="view" systemID="'+systemID+'"></div>'; 					//	\
					}else if (view.toString()=='1b'){ 	htmlText=htmlText+'<div class="permYesInherit" permType="view" systemID="'+systemID+'"></div>'; 			//	\
					}else if (view.toString()=='0b'){ 	htmlText=htmlText+'<div class="permNoInherit" permType="view" systemID="'+systemID+'"></div>'; }			//	\
					$(myDiv).closest('.userPermLine').html(htmlText); 																								//	\
				}																																					//	\
			},																																						//	\
		    error: function () { alert('There was an error adding that permission.');}																				//	\
		});																																							//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

});