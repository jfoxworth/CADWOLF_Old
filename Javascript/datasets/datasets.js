$(function(){

//-----------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- ON DOCUMENT READY -------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------//
	$(document).ready(function() 																							//	\
	{	Data=JSON.parse($('#parse_results').html());																		//	\
		$('#parse_results').html('');																						//	\
		$('#results_size').html(Data['size']);																				//	\
		$('#dataset_paste').val(Data['string']);																			//	\
		Format_Results(Data);																								//	\
		$('.settings_parse').each(function( index ) {	$(this).val(Data['Parsers'][index]);	});							//	\
	});																														//	\
//-----------------------------------------------------------------------------------------------------------------------------//

/*-----------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------*/
$(document).on('mouseover', '#leftColumnIconsWrapper', function(event) 														//	\
{	$('#leftColumnTextWrapper').fadeIn('500');																				//	\
});																															//	\
$(document).on('mouseout', '#leftColumnIconsWrapper, #leftColumnTextWrapper, .leftNavText, .leftNav, #saveFile, #saveFileText, #user, #userText, #logo, #logoText', function(event) 				//	\
{	if (event.pageX>200){	$('#leftColumnTextWrapper').fadeOut('500');		}												//	\
});																															//	\
/*-----------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------ HIDE AND SHOW DESCRIPTIONS IN LEFT BAR -------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------*/
	$("#view_main").on("hover", function(){$('#datasets_view').html('Main Window'); }); 									//	\
	$("#view_results").on("hover", function(){$('#datasets_view').html('Results');	  }); 									//	\
	$("#view_info").on("hover", function(){$('#datasets_view').html('Information'); 	});									//	\
	$("#view_settings").on("hover", function(){$('#datasets_view').html('Settings'); 	});									//	\
	$("#view_main, #view_results, #view_info, #view_settings").on("mouseout", function(){$('#datasets_view').html('');	});	//	\
/*-----------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------ HIDE AND SHOW SECTIONS FROM THE LEFT BAR -----------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------*/
	$("#view_settings, #view_settingsText").on("click", function(){ 														//	\
		$('#settings_wrapper').show(); 																						//	\
			$('#view_wrapper, #paste_wrapper, #results_wrapper, #info_wrapper').hide();										//	\
			$("#view_settings").attr('id','view_settings_current'); 														//	\
			$("#view_main_current").attr('id','view_main'); 																//	\
			$("#view_results_current").attr('id','view_results'); 															//	\
			$("#view_info_current").attr('id','view_info'); 																//	\
			$(".leftNavTextCurrent").addClass('leftNavText').removeClass('leftNavTextCurrent'); 							//	\
			$("#view_settingsText").addClass('leftNavTextCurrent').removeClass('leftNavText'); 								//	\
	});																														//	\
	$("#view_main, #view_mainText").on("click", function(){ 																//	\
		$('#paste_wrapper').show(); 																						//	\
		$('#view_wrapper, #settings_wrapper, #results_wrapper, #info_wrapper').hide();		 								//	\
		$("#view_settings_current").attr('id','view_settings'); 															//	\
		$("#view_main").attr('id','view_main_current'); 																	//	\
		$("#view_results_current").attr('id','view_results'); 																//	\
		$("#view_info_current").attr('id','view_info'); 																	//	\
		$(".leftNavTextCurrent").addClass('leftNavText').removeClass('leftNavTextCurrent'); 								//	\
		$("#view_mainText").addClass('leftNavTextCurrent').removeClass('leftNavText'); 										//	\
	});																														//	\
	$("#view_results, #view_resultsText").on("click", function(){ 															//	\
		$('#results_wrapper').show();	  																					//	\
		$('#view_wrapper, #paste_wrapper, #settings_wrapper, #info_wrapper').hide();		 								//	\
		$("#view_settings_current").attr('id','view_settings'); 															//	\
		$("#view_main_current").attr('id','view_main'); 																	//	\
		$("#view_results").attr('id','view_results_current'); 																//	\
		$("#view_info_current").attr('id','view_info'); 																	//	\
		$(".leftNavTextCurrent").addClass('leftNavText').removeClass('leftNavTextCurrent'); 								//	\
		$("#view_resultsText").addClass('leftNavTextCurrent').removeClass('leftNavText'); 									//	\
	});																														//	\
	$("#view_info, #view_infoText").on("click", function(){  																//	\
		$('#info_wrapper').show();																							//	\
		$('#view_wrapper, #paste_wrapper, #results_wrapper, #settings_wrapper').hide();										//	\
		$("#view_settings_current").attr('id','view_settings'); 															//	\
		$("#view_main_current").attr('id','view_main'); 																	//	\
		$("#view_results_current").attr('id','view_results'); 																//	\
		$("#view_info").attr('id','view_info_current'); 																	//	\
		$(".leftNavTextCurrent").addClass('leftNavText').removeClass('leftNavTextCurrent'); 								//	\
		$("#view_infoText").addClass('leftNavTextCurrent').removeClass('leftNavText'); 										//	\
	});																														//	\
/*-----------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------ RESIZE THE TEXT AREA WHEN DATA IS PASTED INTO IT ---------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------*/
	$('#dataset_paste').on("change", function() {																			//	\
		$("textarea").height( $("textarea")[0].scrollHeight );																//	\	
	});																														//	\
/*-----------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------ PARSE THE DATA ONCE IT HAS BEEN PASTED AND BUTTON CLICKED ------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------*/
	$('#parse_dataset').on("click", function() {																			//	\--- This is the function that actually does the parsing
		if (typeof(Data)=="undefined") { Data={}; }																			//	\
		var data=$('#dataset_paste').val();		var flag=0;	var RealObj={}; var ImagObj={}; var size='';	var key='';		//	\--- of the data. It is too simple now and simply takes
		var textval=$('#settings_parsetext').val();		var parseObj={};	Data['string']=data;							//	\--- the data and parses it in three dimensions
		$('.settings_parse').each(function( index ) {	parseObj[index]=$(this).val();	});									//	\
		if (flag==0)																										//	\
		{	var numdims=0;	var nument=1;																					//	\
			for (var i=0; i<$('.settings_parse').length; i++)																//	\
			{	var re=new RegExp('['+parseObj[i]+']');																		//	\
				var test=data.match(re);																					//	\
				if ((test=="null")||(test===null))	{	parseObj[i]="deleteme";	}else { numdims=i+1; }						//	\
			}																												//	\
			if (numdims==1)																									//	\
			{	var re=new RegExp('['+parseObj[0]+']');																		//	\
				result=data.split(re); 																						//	\
				for (var a=0; a<result.length; a++){ key='0-'+a; RealObj[key]=parseFloat(result[a]);	ImagObj[key]=0; }	//	\
				size='1x'+result.length;																					//	\
			}else if (numdims==2)																							//	\
			{	var re=new RegExp('['+parseObj[1]+']');																		//	\
				result=data.split(re); 																						//	\
				for (var a=0; a<result.length; a++)																			//	\
				{	result[a]=result[a].split(parseObj[Object.keys(parseObj).length-2]);									//	\
					for (var b=0; b<result[a].length; b++) { key=a+'-'+b; RealObj[key]=parseFloat(result[a][b]); ImagObj[key]=0; }	}	//	\
				size=result.length+'x'+result[0].length;																	//	\
			}else if (numdims==3)																							//	\
			{	var re=new RegExp('['+parseObj[2]+']');																		//	\
				result=data.split(re); 																						//	\
				for (var a=0; a<result.length; a++)																			//	\
				{	result[a]=result[a].split(parseObj[Object.keys(parseObj).length-2]);									//	\
					for (var b=0; b<result[a].length; b++)																	//	\
					{	result[a][b]=result[a][b].split(parseObj[Object.keys(parseObj).length-3]);							//	\
						for (var c=0; c<result[a][b].length; c++) 															//	\
						{	key=b+'-'+c+'-'+a; 		RealObj[key]=parseFloat(result[a][b][c]);	ImagObj[key]=0; }	} 		//	\
				}																											//	\
				size=result[0].length+'x'+result[0][0].length+'x'+result.length;											//	\
			}else if (numdims==4)																							//	\
			{	var re=new RegExp('['+parseObj[3]+']');																		//	\
				result=data.split(re); 																						//	\
				for (var a=0; a<result.length; a++)																			//	\
				{	result[a]=result[a].split(parseObj[Object.keys(parseObj).length-2]);									//	\
					for (var b=0; b<result[a].length; b++)																	//	\
					{	for (var c=0; c<result[b].length; c++)																//	\
						{	result[a][b][c]=result[a][b][c].split(parseObj[Object.keys(parseObj).length-4]);				//	\
							for (var d=0; d<result[a][b][c].length; d++) 													//	\
							{	key=c+'-'+d+'-'+b+'-'+a; RealObj[key]=parseFloat(result[a][b][c][d]); ImagObj[key]=0; } 	//	\
				}	}	}																									//	\
				size=result[0].length+'x'+result[0][0].length+'x'+result[0][0][0].length+'x'+result.length;					//	\
			}else if (numdims==5)																							//	\
			{	var re=new RegExp('['+parseObj[4]+']');																		//	\
				result=data.split(re); 																						//	\
				for (var a=0; a<result.length; a++)																			//	\
				{	result[a]=result[a].split(parseObj[Object.keys(parseObj).length-2]);									//	\
					for (var b=0; b<result[a].length; b++)																	//	\
					{	for (var c=0; c<result[b].length; c++)																//	\
						{	for (var d=0; d<result[c].length; d++)															//	\
							{	result[a][b][c][d]=result[a][b][c][d].split(parseObj[Object.keys(parseObj).length-5]);		//	\
								for (var e=0; e<result[a][b][c][d].length; e++) 											//	\
								{	key=d+'-'+e+'-'+c+'-'+b+'-'+a; RealObj[key]=parseFloat(result[a][b][c][d][e]); ImagObj[key]=0; }	//	\
				}	}	}	}																								//	\
size=result[0].length+'x'+result[0][0].length+'x'+result[0][0][0].length+'x'+result[0][0][0][0].length+'x'+result.length;	//	\
			}																												//	\
			if ($('#radio_overwrite').prop('checked'))																		//	\
			{	Data['size']=size;	Data['real']=RealObj;	Data['imag']=ImagObj;											//	\
			}else if ($('#radio_addrow').prop('checked')) 																	//	\
			{	var thissize=Data['size'].split('x');																		//	\
				var size1=size.split('x');																					//	\
				if ((size1[0]!='1')&&((size1[1]!='1'))) { Show_Message('Bad1');												//	\
				}else {																										//	\
					if (size1[0]=='1')																						//	\
					{	for (var a=0; a<size1[1]; a++){Data['real'][parseInt(thissize[0])+'-'+a]=parseFloat(RealObj['0-'+a]);//	\
													   Data['imag'][parseInt(thissize[0])+'-'+a]=0;		}					//	\
					}else if (size1[1]=='1')																				//	\
					{	for (var a=0; a<size1[0]; a++) {Data['real'][parseInt(thissize[0])+'-'+a]=parseFloat(RealObj[a+'-0']);//\
														Data['imag'][parseInt(thissize[0])+'-'+a]=0;		}				//	\
				}	}																										//	\
				Data['size']=parseInt(parseInt(thissize[0])+1)+'x'+thissize[1];												//	\
				for (var a=0; a<parseInt(parseInt(thissize[0])+1); a++)														//	\
				{	for (var b=0; b<thissize[1]; b++)																		//	\
					{	key=a+'-'+b;																						//	\
						if (Data['real'][key]===undefined) { Data['real'][key]=0;	Data['imag'][key]=0; }					//	\
				}	}																										//	\
			}else if ($('#radio_addcolumn').prop('checked')) 																//	\
			{	var thissize=Data['size'].split('x');																		//	\
				var size1=size.split('x');																					//	\
				if ((size1[0]!='1')&&((size1[1]!='1'))) { Show_Message('Bad1');												//	\
				}else {																										//	\
					if (size1[1]=='1')																						//	\
					{	for (var a=0; a<size1[0]; a++){Data['real'][a+'-'+parseInt(thissize[1])]=parseFloat(RealObj[a+'-0']);//	\
													   Data['imag'][a+'-'+parseInt(thissize[1])]=0;		}					//	\
					}else if (size1[0]=='1')																				//	\
					{	for (var a=0; a<size1[1]; a++){Data['real'][a+'-'+parseInt(thissize[1])]=parseFloat(RealObj['0-'+a]);//	\
													   Data['imag'][a+'-'+parseInt(thissize[1])]=0;		}					//	\
				}	}																										//	\
				Data['size']=thissize[0]+'x'+parseInt(parseInt(thissize[1])+1);												//	\
				for (var a=0; a<parseInt(parseInt(thissize[0])); a++)														//	\
				{	for (var b=0; b<parseInt(parseInt(thissize[1])+1); b++)													//	\
					{	key=a+'-'+b;																						//	\
						if (Data['real'][key]===undefined) { Data['real'][key]=0;	Data['imag'][key]=0; }					//	\
				}	}																										//	\
			}																												//	\
			$('#results_size').html(Data['size']);																			//	\
			Data['Parsers']={};																								//	\
			$('.settings_parse').each(function( index ) {	Data['Parsers'][index]=$(this).val();	});						//	\
			Format_Results(Data);																							//	\
		}																													//	\
		$('#results_wrapper').show();	  																					//	\
		$('#view_wrapper, #paste_wrapper, #settings_wrapper, #info_wrapper').hide();		 								//	\
	});																														//	\
/*-----------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------- SAVE THE DATASET ------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------*/
	$("#saveFile, #saveFileText").on("click", function(){ 					 												//	\
		var setid=$('#datasetid').attr('setid');																			//	\
		Data['DatasetID']=setid;																							//	\
		$.ajax ({																											//	\
			type:"POST",																									//	\
			url:"/Datasets/UploadData",																						//	\ 
			async: false,																									//	\
			data: { 																										//	\ 
				setid:setid,																								//	\
				thisdata:JSON.stringify(Data)																				//	\
			},																												//	\
	        error: function () { alert('There was an error updating that name');},											//	\
			success: function (data) { 																						//	\
				if (data=='0') {																							//	\
						$('#message_line').html('You do not have permission to alter the dataset.');						//	\
				}else if (data=='1')																						//	\
				{		$('#message_line').html('A folder by that name already exists.');									//	\
				}																											//	\
				Show_Message('Good1');																						//	\
				returndata=data;																							//	\
			}																												//	\
		});																													//	\				
	});																														//	\
/*-----------------------------------------------------------------------------------------------------------------------------*/


/*-----------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------- THIS IS THE FUNCTION THAT SHOWS THE MATRIX IN PROPER FORMAT ---------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------*/
function Format_Results(data)																								//	\
{	var test=data['size'].split('x');		var return_string='$$ \\begin{bmatrix}';										//	\
	if (test.length>2) { $('#parse_results').html('The data has more than two dimensions'); 								//	\
	}else																													//	\
	{	for (a=0; a<test[0]; a++)																							//	\
		{	for (b=0; b<test[1]; b++)																						//	\
			{  	key=a+'-'+b;																								//	\
				return_string=return_string+' '+data['real'][key]+' &';														//	\
			}																												//	\
			return_string=return_string.replace(/&$/,'');																	//	\
			return_string=return_string+'\\cr ';																			//	\
		}					 																								//	\
		return_string=return_string+'\\end{bmatrix} $$';																	//	\
	}																														//	\	
	$('#parse_results').html(return_string);																				//	\
	var id="parse_results";																									//	\
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,id]);																			//	\
}																															//	\
/*-----------------------------------------------------------------------------------------------------------------------------*/


/*-----------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------- EDIT AND SAVE THE DESCRIPTION OF THE DATASET ------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', '#dataset_description', function(event) 														//	\ 
	{	var text=$('#dataset_description').html();																			//	\	
		var insert='<textarea rows="20" cols="110"  id="text_to_edit">'+text+'</textarea>';									//	\
		$('#dataset_description_holder').html(insert);																		//	\
		$('#save_description').show();																						//	\
	});																														//	\
	$(document).on('click', '#save_description', function(event) 															//	\ 
	{	var text=$('#text_to_edit').val();																					//	\
		var setid=$('#datasetid').attr('setid');																			//	\
		var insert='<div id="dataset_description">'+text+'</div>';															//	\
		$('#dataset_description_holder').html(insert);																		//	\
		$('#save_description').hide();																						//	\
		$.ajax ({ type:"POST",	url:"/Datasets/SaveDescription",	data: { setid:setid,	description:text },				//	\
	        error: function () { alert('There was an error updating that description');},									//	\
			success: function (data) { 		Show_Message('Good2');	}														//	\
		});																													//	\				
	});																														//	\
/*-----------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------*/
/*---------------------- THIS IS THE FUNCTION THAT SHOWS THE MESSAGE WHENEVER THE USER DOES SOMETHING -------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------*/
function Show_Message(message)																								//	\
{	var text='';		var type='';																						//	\
	if (message=="Bad1"){ text="Data must be a single column or a single row";	type='Bad';}								//	\
	if (message=="Good1"){ text="Dataset Saved";		type='Good';}														//	\
	if (message=="Good2"){ text="Description Saved";		type='Good';}													//	\
	if (type=="Good"){$('#goodmessage').html(text);$('#GoodMessageWrapper').slideDown('500').delay(5000).slideUp('500');}	//	\
	if (type=="Bad"){$('#badmessage').html(text);$('#BadMessageWrapper').slideDown('500').delay(5000).slideUp('500');}		//	\
}																															//	\
/*-----------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------- SELECT ONE OF THE INPUT TYPES -------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', '#radio_overwrite', function(event) 															//	\ 
	{	$('#radio_addrow, #radio_addcolumn').prop("checked", false);	$('#radio_overwrite').prop("checked", true);		//	\
	});																														//	\
	$(document).on('click', '#radio_addrow', function(event) 																//	\ 
	{	$('#radio_addcolumn, #radio_overwrite').prop("checked", false);	$('#radio_addrow').prop("checked", true);			//	\
	});																														//	\
	$(document).on('click', '#radio_addcolumn', function(event) 															//	\ 
	{	$('#radio_addrow, #radio_overwrite').prop("checked", false);	$('#radio_addcolumn').prop("checked", true);		//	\
	});																														//	\
/*-----------------------------------------------------------------------------------------------------------------------------*/


});