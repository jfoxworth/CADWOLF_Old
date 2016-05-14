$(function(){
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------- To Do on Load -----------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//-------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------- ON DOCUMENT READY --------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).ready(function(){ 																													//	\--- This function is called on page load. It places all
																																				//	\--- relevant items in memory, creates the necessary
	var fileid=$('#filenumber').attr('filenumber');			APLOT='';	CPLOT='';																//	\--- variables, and initializes the text objects. 
	PlaceInMemory('MainBody', function() { PlaceItems('MainBody', function () { FormatWhileLoops(function () { 									//	\
		FormatIfElseStatements(function () { HandleTOC( function() { BuildScaleUnits(function() { 												//	\
		BuildParseUnits(function(){ PlaceRefs (function(){ FormatItems(function(){ MakeBigChart( function(){ 	                            	//	\
		}); }); }); }); }); }); });  }); }); }); 	Big.DP=16;				                                               						//	\
});																																				//	\

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

//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
function FormatItems(callback)																													//	\--- This function is the last called on page load. It 
{																																				//	\--- initializes all the text items, and formats the 
	$('.main_item').addClass('notcurrent');																										//	\--- equatons and symbolics with MathJax.
	$(".equationblock, .subequationblock").each(function(index) {																				//	\
		var id=$(this).attr('id');																												//	\
		if (id!=='') { 																															//	\
			if (window[id].Errors_flag==1) 																										//	\
			{	$('#'+id).find('.eqshow').html('$$\\text{'+window[id].Errors_errors[0]+'}$$');	$('#'+id).find('.eqshow').css("color","red");	//	\
			}else { $('#'+id).find('.eqshow').html('$$'+window[id].Format_left+"="+window[id].Format_showequation+"="+window[id].Format_showsolution+'$$');	}
			$('#'+id).find('.eqparam').val(window[id].Format_name+"="+window[id].Format_right);													//	\
			for (eqID in window[id].connected_ids){ $('#'+eqID).closest('.main_item').hide(); }		}											//	\
			if (window[id]!==undefined) { if (window[id]['inputID']!=='') { $('#'+id).closest('.main_item').hide(); }	}						//	\
	});																																			//	\
	$(".symequationblock").each(function(index) {																								//	\
		var id=$(this).attr('id');																												//	\
		if (id!=='') { $('#'+id).find('.symeqshow').html('$$'+window[id].symbolictext+'$$');													//	\
		$('#'+id).find('.symeqparam').val(window[id].symbolictext);	}																			//	\
	});																																			//	\
	$(".tableblock").each(function(index) {																										//	\
		$(this).html($(this).siblings('.itemproperties').html());																				//	\
	});																																			//	\
	$(".plot_block").each(function(index) {																										//	\
		var PlotID=$(this).attr('id');																											//	\
		if (DOM_Object[PlotID]!==undefined) { delete DOM_Object[PlotID]['show'];	}															//	\
	});																																			//	\
																																				//	\
	$('#MainBody, .icon_holder').show();																										//	\
	$('.itemproperties').remove();																												//	\
																																				//	\
	for (var itemid in DOM_Object)																												//	\
	{	if (DOM_Object[itemid]['DatasetID']!=undefined)																							//	\
		{	var addtext='<div class="dataset_line">';																							//	\
			addtext=addtext+'<div class="datasetname_holder"><input type="text" class="dataset_name" DatasetID="'+itemid+'" value="'+DOM_Object[itemid]['DatasetName']+'"></div>';	//	\
			addtext=addtext+'<div class="dataseturl_holder"><input type="text" class="dataset_url" value="'+DOM_Object[itemid]['DatasetURL']+'"></div>';//	\
			addtext=addtext+'<div class="dataset_delete"></div>';																				//	\
			addtext=addtext+'</div>';																											//	\
			$('#DatasetList').append(addtext);																									//	\
			$('#'+itemid).closest('.main_item').remove();																						//	\
	}	}																																		//	\
																																				//	\
	callback();																																	//	\
}																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------ FUNCTION TO PLACE ALL ITEMS INTO MEMORY --------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
function PlaceInMemory(section, callback)																										//	\--- This function goes through the main objects that 
{	var id='', temp='', PlotID='', prop='', i='', DataID='', AxisID='', LineID='', BandID='';													//	\
	UnitList=new Array('A', 'K', 's', 'm', 'kg', 'cd', 'mol', 'rad');																			//	\
	ID_PlotData={}; DOM_Object={};	Functions={};	ImportedFunctions={};	var todelete={};													//	\
	if (section.length===0) { section="MainBody"; }																								//	\--- exist in the HTML. It reads the appropriate items
	$('#'+section).find('.main_item').each(function(index) {																					//	\--- into the memory for that item and deletes them from
		if ($(this).attr('type')=="2")																											//	\--- the html document.
		{	id=$(this).find('.header_block').attr('id');																						//	\
			if ($('#'+id+'_data').length>0)																										//	\
			{	$(this).find('.header_block').html('<div class="header_text">'+$('#'+id+'_data').html()+'</div>');		}						//	\
			if ($(this).find('.header_text h1').length) { $(this).find('.header_block').attr('htype','h1'); }									//	\
			if ($(this).find('.header_text h2').length) { $(this).find('.header_block').attr('htype','h2'); }									//	\
			if ($(this).find('.header_text h3').length) { $(this).find('.header_block').attr('htype','h3'); }									//	\
			if ($(this).find('.header_text h4').length) { $(this).find('.header_block').attr('htype','h4'); }									//	\
		}else if ($(this).attr('type')=="3")																									//	\
		{	id=$(this).find('.equationblock').attr('id');																						//	\
			window[id] = new Equation(id);																										//	\
			temp=JSON.parse($('#'+id).siblings('.itemproperties').html());																		//	\
			for (prop in temp) {window[id][prop]=temp[prop]; }																					//	\
			for (i in window[id].connected_ids){  todelete[i]=1; }																				//	\
		}else if ($(this).attr('type')=="4")																									//	\
		{	id=$(this).find('.symequationblock').attr('id');																					//	\
			window[id] = new SymEquation(id);																									//	\
			temp=JSON.parse($('#'+id).siblings('.itemproperties').html());																		//	\
			for (prop in temp) {window[id][prop]=temp[prop]; }																					//	\
			window[id].symbolictext=window[id].text;																							//	\
		}else if ($(this).attr('type')=="6")																									//	\
		{	id=$(this).find('.forloop').attr('id');																								//	\
			window[id] = new ForLoop(id);																										//	\
			temp=JSON.parse($('#'+id).siblings('.itemproperties').html());																		//	\
			for (prop in temp) {window[id][prop]=temp[prop]; }																					//	\
		}else if ($(this).attr('type')=="7")																									//	\
		{	id=$(this).find('.whileloop').attr('id');																							//	\
			window[id] = new WhileLoop(id);																										//	\
			temp=JSON.parse($('#'+id).siblings('.itemproperties').html());																		//	\
			for (prop in temp) {window[id][prop]=temp[prop]; }																					//	\
		}else if ($(this).attr('type')=="8")																									//	\
		{	id=$(this).find('.ifelse').attr('id');																								//	\
			window[id] = new IfElse(id);																										//	\
			temp=JSON.parse($('#'+id).siblings('.itemproperties').html());																		//	\
			for (prop in temp) {window[id][prop]=temp[prop]; }																					//	\
		}else if ($(this).attr('type')=="12")																									//	\
		{	id=$(this).find('.video_block').attr('id');																							//	\
			window[id] = new Video(id);																											//	\
			temp=JSON.parse($('#'+id).siblings('.itemproperties').html());																		//	\
			for (prop in temp) {window[id][prop]=temp[prop]; }																					//	\
		}else if ($(this).attr('type')=="9")																									//	\
		{	PlotID=$(this).find('.plot_block').attr('id');																						//	\
			window[PlotID] = new Plot(PlotID);																									//	\
			temp=JSON.parse($('#'+PlotID).siblings('.itemproperties').html());																	//	\
			if (temp.Chart_type!="surface")																										//	\
			{	for (prop in temp) {window[PlotID][prop]=temp[prop]; }																			//	\
				if ((PlotID!=='')&&(PlotID!==undefined)) 																						//	\
				{	for (DataID in window[PlotID].Chart_dataobj) 																				//	\
					{	temp=new PlotData(DataID, PlotID); 																						//	\
						for (prop in temp) 																										//	\
						{	if (typeof(temp[prop])!="function") 																				//	\
							{ 	if (window[PlotID].Chart_dataobj[DataID][prop]!==undefined)														//	\
								{	temp[prop]=window[PlotID].Chart_dataobj[DataID][prop]; }	}	}											//	\
						if (window[PlotID].Chart_dataobj[DataID]['piedata']!==undefined) { temp['piedata']=window[PlotID].Chart_dataobj[DataID]['piedata']; }
						window[PlotID].Chart_dataobj[DataID]=temp;																				//	\
					}																															//	\
					delete window[PlotID].Chart_dataobj['0'];																					//	\
					for (AxisID in window[PlotID].Chart_yaxesobj) 																				//	\
					{	temp=new PlotAxis(AxisID, PlotID); 																						//	\
						for (prop in temp) {temp[prop]=window[PlotID].Chart_yaxesobj[AxisID][prop]; }											//	\
						window[PlotID].Chart_yaxesobj[AxisID]=temp;																				//	\
					}																															//	\
					for (AxisID in window[PlotID].Chart_xaxesobj) 																				//	\
					{	temp=new PlotAxis(AxisID, PlotID); 																						//	\
						for (prop in temp) {temp[prop]=window[PlotID].Chart_xaxesobj[AxisID][prop]; }											//	\
						window[PlotID].Chart_xaxesobj[AxisID]=temp;																				//	\
					}																															//	\
					for (BandID in window[PlotID].Chart_bandsobj) 																				//	\
					{	temp=new PlotBand(BandID, PlotID); 																						//	\
						for (prop in temp) {temp[prop]=window[PlotID].Chart_bandsobj[BandID][prop]; }											//	\
						window[PlotID].Chart_bandsobj[BandID]=temp;																				//	\
					}																															//	\
					for (LineID in window[PlotID].Chart_linesobj) 																				//	\
					{	temp=new PlotLine(LineID, PlotID); 																						//	\
						for (prop in temp) {temp[prop]=window[PlotID].Chart_linesobj[LineID][prop]; }											//	\
						window[PlotID].Chart_linesobj[LineID]=temp;																				//	\
					}																															//	\
				}																																//	\
				CreatePlot(PlotID, 0);																											//	\
			}else																																//	\
			{	$('#'+PlotID).closest('.main_item').attr('type', '11');																			//	\
				$('#'+PlotID).find('.highcharts-container').remove();																			//	\
				$('#'+PlotID).siblings('.icon_holder').find('.expandbutton').addClass('expandsurface').removeClass('expandbutton');				//	\
				window[PlotID] = new Surface(PlotID);																							//	\
				temp=JSON.parse($('#'+PlotID).siblings('.itemproperties').html());																//	\
				window[PlotID]['Chart_dataobj']=temp['Chart_dataobj'];																			//	\
				window[PlotID]['Chart_axesobj']=temp['Chart_axesobj'];																			//	\
				window[PlotID]['Props']=temp['Props'];																							//	\
				window[PlotID]['Planes']=temp['Planes'];																						//	\
				window[PlotID]['axisHelper']=temp['axisHelper'];																				//	\
				CPLOT=PlotID;																													//	\
				window[PlotID].Initialize(2);																									//	\
				for (var DataID in window[PlotID]['Chart_dataobj'])																				//	\
				{	if ((window[PlotID]['Chart_dataobj'][DataID]['type']=="Surface")||(window[PlotID]['Chart_dataobj'][DataID]['type']=="PointCloud"))
					{	window[PlotID].setSurfaceVertices(DataID, 																				//	\
							function(){window[PlotID].setSurfaceColors(DataID, 																	//	\
							function(){window[PlotID].setMeshes(DataID,																			//	\
							function(){window[PlotID].setPositions() })} )} );																	//	\
					}else if (window[PlotID]['Chart_dataobj'][DataID]['type']=="Line") 															//	\
					{	window[PlotID].removeItem(DataID, 																						//	\
							function(){window[PlotID].setLineColors( DataID, 																	//	\
							function(){window[PlotID].setMeshes( DataID )} )} );																//	\
					}else if (window[PlotID]['Chart_dataobj'][DataID]['type']=="Grid") 															//	\
					{	window[PlotID].makeGrids(DataID);																						//	\
					}else if (window[PlotID]['Chart_dataobj'][DataID]['type']=="Axis") 															//	\
					{	window[PlotID].makeAxes(DataID);																						//	\
					}else  																														//	\
					{	window[PlotID].createShape(window[PlotID]['Chart_dataobj'][DataID]['type'], DataID, 0);									//	\
					}																															//	\
				}																																//	\
				window[PlotID].setPositions( function() { window[PlotID].setLegend( function(){window[PlotID].Render(PlotID)} )} );				//	\
				animate();																														//	\
			}																																	//	\
		}																																		//	\
	});																																			//	\
	for (i in todelete){  $('#'+i).closest('.main_item').remove(); }																			//	\
	if ($('#functioninputs').html()!=="")  { ImportedFunctions=JSON.parse($('#functioninputs').html());		}									//	\
	callback();																																	//	\
}																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------- PLACE ITEMS IN THE APPROPRIATE SPOT ---------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
function PlaceItems(section, callback)																											//	\--- This is one of the more complex functions called on page
{	var type='', id='', item='', target='', j='', FunctionName='', divtext='';																	//	\
	if (section.length===0) { section="MainBody"; }																								//	\--- load. Equations, loops, and statements can be embedded
	$('#'+section).find('.main_item').each(function(index) {																					//	\--- within other loops and statements. However, they are 
		type=$(this).attr('type');																												//	\--- read into the DOM in the order they appear and do not 
		id=$(this).children('.equationblock, .symequationblock, .forloop, .whileloop, .ifelse').attr('id');										//	\--- embed themselves. This function looks at each items parent
		if ((type=="3")||(type=="6")||(type=="7")&&(id!==undefined))																			//	\--- and places it into that div. It also checks the status of
		{																																		//	\--- the loops and sets the class accordingly.
			if ((window[id].Page_parentid=="none")&&(type=="3")){	$('#'+id).find().remove('.sublineshow');	}								//	\
			if (window[id].Page_parentid!="none")																								//	\
			{																																	//	\--- After that, it handles the case if repeating if / else
				item=$('#'+id).closest('.main_item');																							//	\--- statements
				target=$('#'+window[id].Page_parentid).find('.forloopcontent, .ifelsecontent, .whileloopcontent');								//	\
				item.appendTo(target); 																											//	\
				if (type=="3") 																													//	\
				{	$('#'+id).closest('.main_item').removeClass('top_item').css('width','100%');												//	\
					$('#'+id).removeClass('equationblock').addClass('subequationblock'); 														//	\
					$('#'+id).children('.eqshow').removeClass('eqshow').addClass('subeqshow').show(); 											//	\
					$('#'+id).children('.eqparam_cont').removeClass('eqparam_cont').addClass('subparam_cont'); 									//	\
					$('#'+id).find('.subeqshow').html(window[id].Format_name+'='+window[id].Format_equation);									//	\
					MathJax.Hub.Queue(["Typeset",MathJax.Hub,id]);																				//	\
					$('#'+id).find('.equationspecs_holder').remove();																			//	\
				}																																//	\
				if (type=="6") 																													//	\
				{	$('#'+id).closest('.main_item').removeClass('top_item').css('width','100%');												//	\
					$('#'+id).siblings('.icon_holder').find('.updateforloop').remove(); 														//	\
					$('#'+id).find('.forlooplabel').html(window[id].counter); 																	//	\
					if (window[id].status=="1") { $('#'+id).find('.forloopcontent').addClass('itemcurrent'); }									//	\
					if (window[id].status=="0") { $('#'+window[id].Page_topparentid).find('.forloopcontent').addClass('itemneedsupdate'); }		//	\
				}																																//	\
				if (type=="7") 																													//	\
				{	$('#'+id).closest('.main_item').removeClass('top_item').css('width','100%');												//	\
					$('#'+id).siblings('.icon_holder').find('.updateforloop').remove(); 														//	\
					if (window[id].Loop_status=="1") {$('#'+id).find('.whileloopcontent').addClass('itemcurrent'); }							//	\
					if (window[id].Loop_status=="0") {$('#'+window[id].Page_topparentid).find('.whileloopcontent').addClass('itemneedsupdate');}//	\
				}																																//	\
			}																																	//	\
		}else if ((type=="8")&&(id!==undefined))																								//	\
		{	if (window[id].Page_parentid!="none")																								//	\
			{	item=$('#'+id).closest('.main_item');																							//	\
				target=$('#'+window[id].Page_parentid).closest('.main_item');																	//	\
				target.append(item);																											//	\
				$('#'+id).closest('.main_item').removeClass('top_item').css('width','100%');													//	\
				$('#'+id).closest('.main_item').removeClass('main_item notcurrent').addClass('subifelse');										//	\
				$('#'+id).siblings('.icon_holder').find('.updateforloop').remove(); 															//	\
				$('#'+id).siblings('.icon_holder').find('.deletebutton').remove(); 																//	\
				if (window[id].status=="1") { $('#'+id).find('.ifelseloopcontent').addClass('itemcurrent'); }									//	\
				if (window[id].status=="0") { $('#'+window[id].Page_topparentid).find('.ifelsecontent').addClass('itemneedsupdate'); }			//	\
			}																																	//	\
	}	});																																		//	\
	for (FunctionName in ImportedFunctions)																										//	\
	{	divtext='<div class="FileAsFunction" id="FAF'+FunctionName+'">';																		//	\
   	    	divtext=divtext+'<div class="FAFLine">';																							//	\
   	    	divtext=divtext+'<div class="FAFname">Function Name : <a href="'+ImportedFunctions[FunctionName]['filepath']+'">'+FunctionName+'</a></div>';//	\
			divtext=divtext+'<div class="FAFinputs">Inputs : ';																					//	\
				for (j in ImportedFunctions[FunctionName]['inputs']) 																			//	\
				{ divtext=divtext+ImportedFunctions[FunctionName]['inputs'][j]+','; }															//	\
	    		divtext=divtext.replace(/\,$/,'');																								//	\
			divtext=divtext+'</div>';																											//	\
			divtext=divtext+'<div class="FAFoutputs">Outputs : ';																				//	\
	    		for (j in ImportedFunctions[FunctionName]['outputs']) 																			//	\
				{ divtext=divtext+ImportedFunctions[FunctionName]['outputs'][j]+','; }															//	\
		    	divtext=divtext.replace(/\,$/,'');																								//	\
			divtext=divtext+'</div>';																											//	\
		divtext=divtext+'</div></div>';																											//	\
		$('#importedfunctionslist').append(divtext);																							//	\
	}																																			//	\
	callback();																																	//	\	
}																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//


// Datasets, Aces, Bands, Lines - All these items need to be read into the memory

//-------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------ FORMAT WHILE LOOPS -----------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
function FormatWhileLoops(callback) 																											//	\
{	var flagtext='', deptext='', context='', id='', blockflag=0, bi=0, ws='', si=0, statementflag=0;											//	\--- This function takes the JSON object that the while loop is transmitted in and  
	$('.whileloop').each(function(index) 																										//	\--- breaks it down into the proper html to be show for the loop.  
	{	if ($(this).attr('id'))																													//	\
		{	id=$(this).attr('id');																												//	\
			blockflag=0; bi=0; ws='<div class="loopwhile">While</div>';																			//	\
			while (blockflag===0)																												//	\
			{	if (window[id].Loop_Values['blockindex'+bi]) 																					//	\
				{	si=0; statementflag=0;																										//	\
					ws=ws+'<div class="whileloopblock">';																						//	\
						while (statementflag===0)																								//	\
						{	if (window[id].Loop_Values['blockindex'+bi]['statement'+si]) 														//	\
							{	flagtext=window[id].Loop_Values['blockindex'+bi]['statement'+si]['flagtext'];									//	\
								deptext=window[id].Loop_Values['blockindex'+bi]['statement'+si]['dependenttext'];								//	\
								context=window[id].Loop_Values['blockindex'+bi]['statement'+si]['conditiontext'];								//	\
								if (window[id].Loop_Values['blockindex'+bi]['statement'+si]['truefalse'])										//	\
								{	ws=ws+'<div class="whileloopstatements truestatements" flag="'+flagtext+'" condition="'+context+'" dependent="'+deptext+'">';	//	\
								}else { ws=ws+'<div class="whileloopstatements falsestatements" flag="'+flagtext+'" condition="'+context+'" dependent="'+deptext+'">'; }
									ws=ws+'<div class="deleteblock"></div>';																	//	\
									ws=ws+'<div class="whileloopflag"><div class="whileloopvaluewrapper" type="flag"><div class="whileloopvalue">'+flagtext+'</div></div></div>';
									ws=ws+'<div class="whileloopcondition"><div class="whileloopconditionvalue">'+context+'</div></div>';		//	\
									ws=ws+'<div class="whileloopdependent"><div class="whileloopvaluewrapper" type="dependent"><div class="whileloopvalue">'+deptext+'</div></div></div>';//\
								ws=ws+'</div>';																									//	\
							}else { statementflag=1; }																							//	\
							if (window[id].Loop_Values['blockindex'+bi]['andor'+si]) 															//	\
							{	ws=ws+'<div class="andorstatements"><div class="andorvalue">'+window[id].Loop_Values['blockindex'+bi]['andor'+si]+'</div></div>';	//	\
							}else if (statementflag==1) { ws=ws+'<div class="whileloopaddstatements">+</div>'; }								//	\
							si=si+1;																											//	\
						}																														//	\
					ws=ws+'</div>';																												//	\
				}else {blockflag='1';  	} 																										//	\
				if (window[id].Loop_Values['andor'+bi]) 																						//	\
				{	ws=ws+'<div class="andorblock"><div class="andorvalue">'+window[id].Loop_Values['andor'+bi]+'</div></div>';					//	\
				}else if (blockflag==1) { ws=ws+'<div class="whileloopaddblock">+</div>'; }														//	\
				bi=bi+1;																														//	\
			}																																	//	\
			$(this).find('.whilelooptext').html(ws);																							//	\
		}																																		//	\
	});																																			//	\
	$(".forloop").each(function(index) {																										//	\
		id=$(this).attr('id');																													//	\
		if (window[id]!==undefined)																												//	\ 
		{	$(this).find('.forloopstart').find('.forloopvalue').html(window[id].starttext);														//	\
			$(this).find('.forloopwhilevalue').html(window[id].limitfactor);																	//	\
			$(this).find('.forloopend').find('.forloopvalue').html(window[id].stoptext);														//	\
			$(this).find('.forloopincrease').find('.forloopvalue').html(window[id].incrementtext);												//	\
		}																																		//	\
	});																																			//	\
	callback();																																	//	\
}																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------- FORMAT IF ELSE STATEMENTS -----------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
function FormatIfElseStatements(callback) 																										//	\
{	var flagtext='', deptext='', context='', id='', blockflag=0, bi=0, ws='', si=0, statementflag=0;											//	\--- This function takes the JSON object that the while loop is transmitted in and  
	$('.ifelse').each(function(index) {																											//	\--- breaks it down into the proper html to be show for the loop.  
		if ($(this).attr('id'))																													//	\
		{	id=$(this).attr('id');																												//	\
			blockflag=0; bi=0; 																													//	\
			if (window[id].Statement_Type=="if") 	{ ws='<div class="ifelseif">If</div>';	}													//	\
			if (window[id].Statement_Type=="elseif"){ ws='<div class="ifelseif">Else If</div>';	}												//	\
			if (window[id].Statement_Type=="else")	{ ws='<div class="ifelseif">Else</div>';	}												//	\
			if (window[id].Statement_Type=="if") 	{ $(this).find('.ifelsedelete').closest('.ifelseaddline').remove();	}						//	\
			if (window[id].Statement_Type=="else") 	{ $(this).find('.ifelseaddif, .ifelseaddelse').closest('.ifelseaddline').remove();	}		//	\
			if (window[id].Statement_Type!="else") 																								//	\ 
			{	while (blockflag===0)																											//	\
				{	if (window[id].Statement_Values['blockindex'+bi]) 																			//	\
					{	si=0; statementflag=0;																									//	\
						ws=ws+'<div class="ifelseblock">';																						//	\
							while (statementflag===0)																							//	\
							{	if (window[id].Statement_Values['blockindex'+bi]['statement'+si]) 												//	\
								{	flagtext=window[id].Statement_Values['blockindex'+bi]['statement'+si]['flagtext'];							//	\
									deptext=window[id].Statement_Values['blockindex'+bi]['statement'+si]['dependenttext'];						//	\
									context=window[id].Statement_Values['blockindex'+bi]['statement'+si]['conditiontext'];						//	\
									if (window[id].Statement_Values['blockindex'+bi]['statement'+si]['truefalse'])								//	\
									{	ws=ws+'<div class="ifelsestatements truestatements" flag="'+flagtext+'" condition="'+context+'" dependent="'+deptext+'">';	//	\
									}else { ws=ws+'<div class="ifelsestatements falsestatements" flag="'+flagtext+'" condition="'+context+'" dependent="'+deptext+'">'; }
										ws=ws+'<div class="deleteblock"></div>';																//	\
										ws=ws+'<div class="ifelseflag"><div class="ifelsevaluewrapper" type="flag"><div class="ifelsevalue">'+flagtext+'</div></div></div>';
										ws=ws+'<div class="ifelsecondition"><div class="ifelseconditionvalue">'+context+'</div></div>';			//	\
										ws=ws+'<div class="ifelsedependent"><div class="ifelsevaluewrapper" type="dependent"><div class="ifelsevalue">'+deptext+'</div></div></div>';//\
									ws=ws+'</div>';																								//	\
								}else { statementflag=1; }																						//	\
								if (window[id].Statement_Values['blockindex'+bi]['andor'+si]) 													//	\
								{	ws=ws+'<div class="andorstatements"><div class="andorvalue">'+window[id].Statement_Values['blockindex'+bi]['andor'+si]+'</div></div>';	//	\
								}else if (statementflag==1) { ws=ws+'<div class="ifelseaddstatements">+</div>'; }								//	\
								si=si+1;																										//	\
							}																													//	\
						ws=ws+'</div>';																											//	\
					}else {blockflag='1';  	} 																									//	\
					if (window[id].Statement_Values['andor'+bi]) 																				//	\
					{	ws=ws+'<div class="andorblock"><div class="andorvalue">'+window[id].Statement_Values['andor'+bi]+'</div></div>';		//	\
					}else if (blockflag==1) { ws=ws+'<div class="ifelseaddblock">+</div>'; }													//	\
					bi=bi+1;																													//	\
			}	}																																//	\
			$(this).find('.ifelsetext').html(ws);																								//	\
			if ((window[id].Statement_Type=="elseif")||(window[id].Statement_Type=="else")){$(this).addClass('subifelse').removeClass('ifelse'); }//\
		}																																		//	\
	});																																			//	\
	callback();																																	//	\
}																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------- IF THE DEFAULT IS A TABLE OF CONTENTS, CREATE IT AND SHOW IT --------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
function HandleTOC(callback)																													//	\--- In the case where the user has set the file to display the table
{	if ($('#DetailedData').length>0) { 																											//	\--- of contents on default instead of the file contents. This section
		$('.main_item').hide();																													//	\--- displays the TOC in that case.
		$('#DetailedData').remove();																											//	\
		DisplayTOC();																															//	\
		var temp=$('#TOC_holder').clone();																										//	\
		temp.insertAfter($('#clicktotopenter'));																								//	\
	}																																			//	\
	callback();																																	//	\
}																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------- GET DEPENDENTS AND INPUTS ---------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
function GetDependents(fileid, callback)																										//	\--- This function grabs the data written in the DOM on load
{	var j='', k='', changeflag=0, locationdata='', id='', thisblock='';																			//	\--- for the relationships between equations and between plots
	var eqdata=$('#equationrelations').html();																									//	\--- and the inputs to the page and places them in javascript 
	var plotdata=$('#plotrelations').html();																									//	\--- memory. It them deletes that item from the DOM.
	var inputdata=$('#fileinputs').html();																										//	\
	if ((inputdata===null)||(inputdata.length===0)) { FileInputs={}; }else { FileInputs=JSON.parse(inputdata);	}								//	\
	for (var i in FileInputs) 																													//	\
	{	if (Number(FileInputs[i]['Change_Status'])===1) 																						//	\
		{	changeflag=1;																														//	\
			for (j in DOM_Object)																												//	\
			{	for (k in DOM_Object[j]['Dependents'])																							//	\
				{	if (Number(DOM_Object[j]['Dependents'][FileInputs[i]['id']])===1)															//	\
					{ 	window[j].Solve_Equation(); 																							//	\
						$('#'+j).find('.eqshow').html("$${"+window[j].Format_showequation+"}$$");												//	\
						MathJax.Hub.Queue(["Typeset",MathJax.Hub,j]);																			// 	\
	} 	} 	}  	}	}																															//	\
	if (changeflag) {	$.ajax ({	type:"POST", url:"/Documents/SaveFile", async: false, data: { fileid:fileid, checkin:0	}	});		}		//	\
	$('#fileinputs').remove();																													//	\
	locationdata=$('#locationdata').html();																										//	\
	if ((locationdata===null)||(locationdata.length===0)||(locationdata=="{}")) 																//	\
	{	DOM_Object={}; 																															//	\
		$(".main_item").each(function(index) 																									//	\
		{	if ($(this).attr("type")!="0")																										//	\
			{	$(this).attr("location", index);																								//	\
				id=$(this).children('.equationblock, .subequationblock, .symequationblock, .tableblock, .forloop, .whileloop, .ifelse, .plot_block, .text_block, .header_block, .image').attr("id"); 
				DOM_Object[id]={};	DOM_Object[id]['active']=1;	DOM_Object[id]['Dependents']={};	DOM_Object[id]['parent']='none';			//	\
				DOM_Object[id]['location']=index;		DOM_Object[id]['topparent']='none';														//	\
				thisblock=$(this).children('.equationblock, .subequationblock, .symequationblock, .tableblock, .forloop, .whileloop, .ifelse, .plot_block, .text_block, .header_block, .image');
				if (thisblock.hasClass('equationblock')) { DOM_Object[id]['type']="equation"; DOM_Object[id]['name']=window[id].Format_name; }	//	\
				if (thisblock.hasClass('symequationblock')) { DOM_Object[id]['type']="symbolic"; }												//	\
				if (thisblock.hasClass('tableblock')) { DOM_Object[id]['type']="table"; }														//	\
				if (thisblock.hasClass('forloop')) { DOM_Object[id]['type']="forloop"; }														//	\
				if (thisblock.hasClass('whileloop')) { DOM_Object[id]['type']="whileloop"; }													//	\
				if (thisblock.hasClass('ifelse')) { DOM_Object[id]['type']="ifelse"; }															//	\
				if (thisblock.hasClass('text_block')) { DOM_Object[id]['type']="text"; }														//	\
				if (thisblock.hasClass('header_block')) { DOM_Object[id]['type']="header"; }													//	\
				if (thisblock.hasClass('image')) { DOM_Object[id]['type']="image"; }															//	\
				if (thisblock.hasClass('plot_block')) { DOM_Object[id]['type']="plot"; }														//	\
				if (thisblock.hasClass('subequationblock')) { DOM_Object[id]['type']="equation"; DOM_Object[id]['name']=window[id].Format_name;	}//	\
			}																																	//	\
		});																																		//	\
	}else { DOM_Object=JSON.parse(locationdata);	}																							//	\
	$('#locationdata').remove();																												//	\
	callback();																																	//	\
}																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------- GET DEPENDENTS AND INPUTS ---------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
function PlaceRefs(callback)																													//	\
{	var i='', j='', text='';																													//	\
	for (i in DOM_Object)																														//	\
	{	if (DOM_Object[i]['References']!==undefined)																							//	\
		{	text='<div class="refline">';																										//	\
			for (j in DOM_Object[i]['References'])																								//	\
			{ text=text+'<div class="reficon_wrapper"><div class="reficon" id="'+j+'">'+DOM_Object[i]['References'][j]['refnum']+'</div></div>';}//	\
			text=text+'</div>';																													//	\
			$('#'+i).append(text);																												//	\
	}	}																																		//	\
	callback();																																	//	\
}																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------- BUILD SCALE UNITS OBJECT -------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
function BuildScaleUnits(callback)																												//	\--- This function takes the object written to the DOM with
{	var unit='';																																//	\--- the scaled units items and places them into the memory
	Units_Object={};																															//	\--- for javascript. It then creates the display item and 
	$('#scaleunits').children('.suline').each(function(i) 																						//	\--- deletes the scaled unit item from the DOM.
	{ 	unit=$(this).find('.unit').html();																									//	\
		Units_Object[unit]={};																													//	\
		Units_Object[unit]['Class']=$(this).find('.Class').html();																				//	\
		Units_Object[unit]['conv_factor']=$(this).find('.conv_factor').html();																	//	\
		Units_Object[unit]['conv_unit']=$(this).find('.conv_unit').html();																		//	\
		Units_Object[unit]['name']=$(this).find('.name').html();																				//	\
		Units_Object[unit]['quantity']=$(this).find('.quantity').html();																		//	\
		if (Units_Object[unit]['quantity']=="Angle") 		{ $('#units_angle tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="length") 		{ $('#units_length tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="area") 		{ $('#units_length tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="force") 		{ $('#units_force tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="mass") 		{ $('#units_mass tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="pressure")		{ $('#units_pressure tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="velocity")		{ $('#units_velocity tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="time") 		{ $('#units_time tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="volume") 		{ $('#units_volume tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="torque") 		{ $('#units_torque tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="Capacitance") 	{ $('#units_capacitance tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="Electric Charge") { $('#units_electriccharge tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="Electric Power") 	{ $('#units_electricpower tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="Conductance") 	{ $('#units_conductance tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="Inductance") 	{ $('#units_inductance tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="Magnetic Field") 	{ $('#units_magneticfield tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="Magnetic Flux") 	{ $('#units_magneticflux tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="Voltage") 		{ $('#units_voltage tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
		if (Units_Object[unit]['quantity']=="Resistance")	{ $('#units_resistance tr:last').after('<tr><td>'+unit+'</td><td>'+Units_Object[unit]['conv_unit']+'</td><td>'+Units_Object[unit]['conv_factor']+'</td><td>'+Units_Object[unit]['name']+'</td></tr>'); }
	});																																			//	\
	$('#scaleunits').remove();																													//	\
	$('#units_temperature tr:last').after('<tr><td>C</td><td>K</td><td>Celsius+273.15</td><td>Celsius</td></tr>'); 								//	\
	$('#units_temperature tr:last').after('<tr><td>F</td><td>K</td><td>(Fahrenheit+459.67)*5/9</td><td>Fahrenheit</td></tr>'); 					//	\
	$('#units_temperature tr:last').after('<tr><td>R</td><td>K</td><td>0.555555555</td><td>Rankine</td></tr>'); 								//	\
	Units_Object['R']={};	Units_Object['C']={};	Units_Object['F']={};	Units_Object['K']={};												//	\
	Units_Object['R']['Class']='SI';	Units_Object['R']['conv_factor']='X';	Units_Object['R']['conv_unit']='K';								//	\
	Units_Object['R']['name']='R';	Units_Object['R']['quantity']='Temperature';																//	\
	Units_Object['C']['Class']='SI';		Units_Object['C']['conv_factor']='X';		Units_Object['C']['conv_unit']='K';						//	\
	Units_Object['C']['name']='C';	Units_Object['C']['quantity']='Temperature';																//	\
	Units_Object['K']['Class']='SI';		Units_Object['K']['conv_factor']=1;		Units_Object['K']['conv_unit']='K';							//	\
	Units_Object['K']['name']='K';	Units_Object['K']['quantity']='Temperature';																//	\
	Units_Object['F']['Class']='SI';	Units_Object['F']['conv_factor']='X';	Units_Object['F']['conv_unit']='K';								//	\
	Units_Object['F']['name']='F';	Units_Object['F']['quantity']='Temperature';																//	\	
	$('.units').hide();																															//	\
//	$('#constants').hide();																														//	\
	callback();																																	//	\
}																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------- BUILD SCALE UNITS OBJECT -------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------//
function BuildParseUnits(callback)																												//	\--- This function takes the parsed unit object written
{	var unit='';																																//	\--- to the DOM and places it into the javascript memory.
	ParseUnits={};																																//	\--- It then deletes the object from the DOM.
	$('#parseunits').children('.puline').each(function(i) 																						//	\
	{ 	unit=$(this).find('.base_unit').html();																									//	\
		ParseUnits[unit]={};																													//	\
		ParseUnits[unit]['name']=$(this).find('.name').html();																					//	\
		ParseUnits[unit]['showunits']=$(this).find('.showunits').html();																		//	\
		ParseUnits[unit]['quantity']=$(this).find('.quantity').html();																			//	\
		ParseUnits[unit]['rad']=$(this).find('.rad').html();																					//	\
		ParseUnits[unit]['m']=$(this).find('.m').html();																						//	\
		ParseUnits[unit]['kg']=$(this).find('.kg').html();																						//	\
		ParseUnits[unit]['s']=$(this).find('.s').html();																						//	\
		ParseUnits[unit]['A']=$(this).find('.A').html();																						//	\
		ParseUnits[unit]['K']=$(this).find('.K').html();																						//	\
		ParseUnits[unit]['mol']=$(this).find('.mol').html();																					//	\
		ParseUnits[unit]['cd']=$(this).find('.cd').html();																						//	\
	});																																			//	\
	$('#parseunits').remove();																													//	\
	callback();																																	//	\
}																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//

																

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------- End of On Load ----------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------ ORPHAN FUNCTIONS ---------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------- SHOW / HIDE LEFT SIDE DESCRIPTIONS -----------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(".lc_description").click(function () { 																															//	\
	if ($(this).siblings('.lc_description_bottom').is(":visible"))																									//	\
	{		$(this).siblings('.lc_description_bottom, .lc_description_left, .lc_description_right, .newblock_block, .left_section').slideUp();						//	\
	}else {	$(this).siblings('.lc_description_bottom, .lc_description_left, .lc_description_right, .newblock_block, .left_section').slideDown(); }					//	\
});																																									//	\
$(".left_header").click(function () 																																//	\
{																																									//	\
	if ($(this).children('.left_hide')[0]) { $(this).children().addClass('left_show').removeClass('left_hide'); 													//	\
	}else  { $(this).children().addClass('left_hide').removeClass('left_show'); }																					//	\
	$(this).siblings('.left_suboptions').slideToggle("slow");																										//	\
});																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------- CAMEL CASE -----------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function CFL(str)
{  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}); }
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------- FUNCTION TO SHOW MESSAGES -------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function ShowMessage(num)																																			//	\
{	$('#Format_Wrapper').hide();																																	//	\
	var message='';		var type='';																																//	\
	if (num=="SaveFile")	{ type="good"; 	message="File Saved"; }																									//	\
	if (num=="NoFilePerm") 	{ type="bad"; 	message="You do not have permissions to save this file"; }																//	\
	if (num=="NoUserPerm") 	{ type="bad"; 	message="Users are not allowed to edit this file"; }																	//	\
	if (num=="SaveError") 	{ type="bad"; 	message="Error while saving file"; }																					//	\
	if (num=="LostPerm") 	{ type="bad"; 	message="You permissions have expired and you need to log in again"; }													//	\
	if (num=="Mismatch DOM"){ type="bad";	message="The DOM and model have become mismatched";	}
	if (type=="good") 	{ $('#goodmessage').html(message); $('#GoodMessageWrapper').slideDown('500').delay(5000).slideUp('500'); }									//	\
	if (type=="bad") 	{ $('#badmessage').html(message); $('#BadMessageWrapper').slideDown('500').delay(5000).slideUp('500'); }									//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------- Populating a reference item ------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('click', ".reference_number", function(event) 																		//	\
{	$('.ref_active').removeClass('ref_active');																						//	\
	$(this).addClass('ref_active');																									//	\
	var type=$(this).closest('#symeq_spec, #table_spec, #image_spec, #equation_spec, #text_spec').attr('id');						//	\
	if (type=="symeq_spec") { var id=$("#symeq_spec").attr('symeqid');	}															//	\ 
	if (type=="image_spec") { var id=$("#image_spec").attr('imageid');	}															//	\ 
	if (type=="equation_spec") { id=$("#equation_spec").attr('equationid');	}														//	\ 
	if (type=="table_spec") { id=$("#table_spec").attr('tableid');	}																//	\ 
	if (type=="text_spec") { id=$("#text_spec").attr('textid');	}																	//	\ 
	var refid=$(this).attr('refid');																								//	\
	$('.ref_author').val(DOM_Object[id]['References'][refid]['author']);															//	\
	$('.ref_reftext').val(DOM_Object[id]['References'][refid]['reftext']);															//	\
	$('.ref_address').val(DOM_Object[id]['References'][refid]['address']);															//	\
	$('.ref_pagetitle').val(DOM_Object[id]['References'][refid]['pagetitle']);														//	\
	$('.ref_sitetitle').val(DOM_Object[id]['References'][refid]['sitetitle']);														//	\
	$('.ref_date').val(DOM_Object[id]['References'][refid]['dateaccessed']);														//	\
	$('.ref_booktitle').val(DOM_Object[id]['References'][refid]['booktitle']);														//	\
	$('.ref_publisher').val(DOM_Object[id]['References'][refid]['publisher']);														//	\
	$('.ref_publishdate').val(DOM_Object[id]['References'][refid]['datepublished']);												//	\
	$('.ref_magtitle').val(DOM_Object[id]['References'][refid]['pagetitle']);														//	\
	$('.ref_name').val(DOM_Object[id]['References'][refid]['magpapername']);														//	\
	$('.ref_page').val(DOM_Object[id]['References'][refid]['page']);																//	\
	$('.ref_entryname').val(DOM_Object[id]['References'][refid]['entryname']);														//	\
	$('.ref_encname').val(DOM_Object[id]['References'][refid]['encname']);															//	\
	$('.ref_edition').val(DOM_Object[id]['References'][refid]['edition']);															//	\
	$('.ref_year').val(DOM_Object[id]['References'][refid]['year']);																//	\
	if (DOM_Object[id]['References'][refid]['type']=="web") { ShowReference('web'); }												//	\
	if (DOM_Object[id]['References'][refid]['type']=="book") { ShowReference('book'); }												//	\
	if (DOM_Object[id]['References'][refid]['type']=="mag") { ShowReference('mag'); }												//	\
	if (DOM_Object[id]['References'][refid]['type']=="enc") { ShowReference('enc'); }												//	\
});  																																//	\ 
//-------------------------------------------------------------------------------------------------------------------------------------//


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------- End of Specific Symbolics -----------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------- For Loops --------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------ Functions for For Loops --------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------- THE FOR LOOP OBJCET ----------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------*/
function ForLoop (loopid) 																							//	\
{ 	this.Format_id=loopid;																							//	\--- The unique ID for this for loop
	this.Page_position=0;																							//	\--- The numerical position of the for loop within the document with 1 at the top
	this.Page_topparentid='none';																					//	\--- The top level parent for this loop
	this.Page_parentid='none';																						//	\--- The parent of the for loop
	this.Page_lastposition=0;																						//	\--- The final position of the equation considered in calculating loop values
	this.counter='a';																								//	\--- The counter for the loop i.e. a, b, c, etc
	this.Loop_countervalue=0;																						//	\--- The value of the counter - Not Saved in database
	this.valueid='';																								//	\--- The id of the equation that holds the value of the counter for the loop
	this.starttext='0';																								//	\--- The text entered by the user for the start value
	this.start=0;																									//	\--- The start number for the for loop
	this.stoptext='1';																								//	\--- The text entered by the user for the stop value
	this.stop=1;																									//	\--- The stop number for the loop
	this.increment=1;																								//	\--- The amount that the loop will increment through each time
	this.incrementtext='1';																							//	\--- The default value for the increment text
	this.numsteps=1;																								//	\--- The number of steps the loop will go through
	this.status=0;																									//	\--- Says whether or not the loop is valid. 0 for needs update, 1 for good
	this.Format_haschanged=1;																						// 	\--- Whether or not the loop has changed and needs to be updated
	this.Loop_firstrun=0;																							//	\--- A 1 if this is the first time through or prior, a zero after that - Not saved
	this.limitfactor='<';																							//	\--- This can be '<' or '>' or '<=' or '>='
	this.Errors_flag=0;																								//	\--- A 1 if there is a flag to prevent execution of the loop
	this.Errors_errors=new Array();																					// 	\--- An array of errors for this for loop
	this.fileid=$('#filenumber').attr('filenumber');																//	\
}																													//	\
/*---------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------- GETTING THE VALUES OF THE FOR LOOP PARAMETERS -----------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is called whenever the user updates the start, stop, or increment value for the For Loop. It takes the three equations being entered	\
	and sends them to a worker to be solved. When that worker finishes solving the equations, the values and dependents are entered into the loop 		\
	object. 																																			\
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
ForLoop.prototype.LoopValues = function () 																											//	\
{ 	var loopid=this.Format_id, eqArray=[];		DOM_Object[loopid]['Dependents']={};																//	\
	var loopWorker = new Worker("http://www.cadwolf.com/js/EquationSolver.js");																		//	\
	window[loopid]['Page_position']=DOM_Object[loopid]['location'];																					//	\
	Create_EqObj(loopid, function () { 																												//	\
		loopWorker.postMessage({																													//	\
			"cadwolfType":"SolveLoopParameters", 																									//	\
			"eqArray":eqArray,																														//	\
			"LoopID":loopid,																														//	\
			"ImportedFunctions":ImportedFunctions,																									//	\
			"Units_Object":Units_Object,																											//	\
			"ParseUnits":ParseUnits,																												//	\
			"FileInputs":FileInputs,																												//	\
			"EqObj":window[loopid].EqObj,																											//	\
			"FileID":$('#filenumber').attr('filenumber'),																							//	\
			"loopObject":window[loopid]																												//	\
		});																																			//	\
	});																																				//	\
	loopWorker.onmessage = function(e) { returnObject=e.data; UpdateLoopParams(returnObject); 	loopWorker.terminate();		loopWorker=undefined;}	//	\
};																																					//	\
function UpdateLoopParams(loopObj)																													//	\
{	var id=loopObj['ID'];																															//	\
	window[id].start=loopObj['loopObject']['start'];																								//	\
	window[id].stop=loopObj['loopObject']['stop'];																									//	\
	window[id].increment=loopObj['loopObject']['increment'];																						//	\
	window[id].numsteps=loopObj['loopObject']['numsteps'];																							//	\
}																																					//	\
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------- UPDATE A STRUCTURE FROM THE WORKER ----------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	After the worker has solved a structure like a for loop, while loop, or if/else statement, this function is called and places the results in the	\
	proper place. That code returns the show equations and this function shows the results for those equations as well.									\
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
function UpdateStructure(loopObj)																													//	\
{	console.log('In the update structure program with ID '+loopObj['ID']);
	structObj=loopObj;																																//	\
	var ID=loopObj['ID'];																															//	\
	for (var itemID in loopObj['structure'])																										//	\	
	{	window[itemID].Solution_real=loopObj['structure'][itemID]['real'];																			//	\	
		window[itemID].Solution_imag=loopObj['structure'][itemID]['imag'];																			//	\	
		window[itemID].Format_size=loopObj['structure'][itemID]['size'];																			//	\	
		window[itemID].Format_name=loopObj['structure'][itemID]['name'];																			//	\	
		window[itemID].Format_showequation=loopObj['structure'][itemID]['showeq'];																	//	\	
		DOM_Object[itemID]['name']=loopObj['structure'][itemID]['name'];																			//	\	
		window[itemID].Equation_Display();																											//	\
	}																																				//	\	
	$('#'+ID).removeClass('solving');																												//	\
//	$('#'+itemID).find('.itemneedsupdate').addClass('itemcurrent').removeClass('itemneedsupdate');													//	\
}																																					//	\
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------- CHECK FOR LOOP EQUATIONS -------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is called whenever the user changes something about the loop. If checks for any errors that may occur during the running of the 		\
	loop and sets the error flag if there is a problem. This problem could be improper parameters in the start and stop values or resetting the 		\
	counter somewhere within the loop - which is not allowed.																							\
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
ForLoop.prototype.CheckForLoop=function(callback)																									//	\ 
{	var loopid=this.itemid;	var tempid='';																											//	\
	if (this.limitfactor=="<=")	{ this.numsteps=parseInt(Math.floor((this.stop-this.start)/this.increment), 10);									//	\
	if ((this.stop<this.start)||(this.increment<0)) { this.numsteps=0; } }																			//	\
	if (this.limitfactor=="<")																														//	\
	{ this.numsteps=parseInt(Math.floor((this.stop-(this.start-this.increment/2))/this.increment), 10);												//	\
	if ((this.stop<this.start)||(this.increment<0)) { this.numsteps=0; } }																			//	\
	if (this.limitfactor==">=")	{ this.numsteps=parseInt(Math.floor(this.start-this.stop)/(-1*this.increment), 10);									//	\
	if ((this.start<this.stop)||(this.increment>0)) { this.numsteps=0; } }																			//	\
	if (this.limitfactor==">")																														//	\
	{ this.numsteps=parseInt(Math.floor((this.start-(this.stop-this.increment/2))/(-1*this.increment)), 10);										//	\
	if ((this.start<this.stop)||(this.increment>0)) { this.numsteps=0; } }																			//	\
	if (this.numsteps<0) { this.numsteps=0; }																										//	\
	if (this.numsteps===0) 	{	Set_Error(loopid, "ForLoop1"); }																					//	\
	$('#'+this.Format_id).find('.subequationblock').each( function(){																				//	\
		tempid=$(this).attr('id');																													//	\
		if (window[tempid].Format_name==this.counter) { Set_Error(loopid, "ForLoop2"); }															//	\
	});																																				//	\
	if (this.start=="Error")		{ Set_Error(loopid, "ForLoop3");	}																			//	\
	if (this.stop=="Error")			{ Set_Error(loopid, "ForLoop4");	}																			//	\
	if (this.increment=="Error")	{ Set_Error(loopid, "ForLoop5");	}																			//	\
	if (typeof(callback)=="function") { callback();	}																								//	\
}																																					//	\
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------- THE FUNCTION THAT ACTUALLY PERFORMS THE LOOPS ----------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
function UpdateLoopEqs (loopid, callback)																											//	\
{	UpdateDep(loopid, 1, 0);																														//	\
	if (typeof(callback)=="function") { callback();	}																								//	\
}																																					//	\
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------- WRITE THE EQUATIONS IN THE PROPER FORMAT ---------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the last step called in updating for loops. The show equation with the final solution is not written for each equation each time that 		\
	the equation is solved. This prevents possibly. 																									\
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
function WriteLoopEquations(loopid, callback)																										//	\
{																																					//	\
	$('div[id="'+loopid+'"]').find('.main_item').each( function(){																					//	\
		var type=$(this).attr('type');																												//	\
		var id=$(this).children('.forloop, .whileloop, .ifelse, .subequationblock').attr('id');														//	\
		if (type=="3")																																//	\ 
		{																																			//	\ 
			id=$(this).children('.subequationblock').attr("id");																					//	\ 
			$(this).find('.subeqshow').html("$${"+window[id].Format_left+"="+window[id].Format_right+"}$$");										//	\
			$(this).find('.subeqshow').show();																										//	\
			$(this).find('.subparam_cont').hide();																									//	\
			MathJax.Hub.Queue(["Typeset",MathJax.Hub,id]);																							//	\ 
		} 																																			//	\ 
	});																																				//	\ 
	if (typeof(callback)=="function") { callback();	}																								//	\
}																																					//	\ 
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/

//-------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------- CREATE THE STRUCTURE OBJECT -------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------//
/*	When the equation solver is called to solve a structure, a list of all previous equations, tables, loops and statements are sent. 	\
//-------------------------------------------------------------------------------------------------------------------------------------*/
function createStructureObj(thisid, callback)																						//	\
{	var row=0, col=0, flag1=0, flag2=0, numberObj={}, itemID='', tempID='';															//	\
	window[thisid].EqObj={};																										//	\
	for (var ItemID in DOM_Object)																									//	\
	{	if ((DOM_Object[ItemID]['type']=="equation")&&(DOM_Object[ItemID]['location']<=DOM_Object[thisid]['lastpos']))				//	\
		{	window[thisid].EqObj[ItemID]=DOM_Object[ItemID];																		//	\
			window[thisid].EqObj[ItemID]['size']=window[ItemID]['Format_size'];														//	\
			window[thisid].EqObj[ItemID]['real']=window[ItemID]['Solution_real'];													//	\
			window[thisid].EqObj[ItemID]['imag']=window[ItemID]['Solution_imag'];													//	\
			window[thisid].EqObj[ItemID]['units']=window[ItemID]['Units_units'];													//	\
			window[thisid].EqObj[ItemID]['basearray']=window[ItemID]['Units_base_array'];											//	\
			window[thisid].EqObj[ItemID]['equation']=window[ItemID]['Format_equation'];												//	\
			window[thisid].EqObj[ItemID]['active']=window[ItemID]['active'];														//	\
			window[thisid].EqObj[ItemID]['parent']=DOM_Object[ItemID]['parent'];													//	\
			window[thisid].EqObj[ItemID]['topparent']=DOM_Object[ItemID]['topparent'];												//	\
			window[thisid].EqObj[ItemID]['ID']=window[ItemID]['Format_id'];															//	\
			window[thisid].EqObj[ItemID]['fileid']=window[ItemID]['fileid'];														//	\
			window[thisid].EqObj[ItemID]['type']="equation";																		//	\
			window[thisid].EqObj[ItemID]['name']=window[ItemID]['Format_name'];														//	\
		}																															//	\
		if ((DOM_Object[ItemID]['type']=="table")&&(DOM_Object[ItemID]['location']<=DOM_Object[thisid]['lastpos']))					//	\
		{	window[thisid].EqObj[ItemID]=DOM_Object[ItemID];																		//	\
			numberObj={};																											//	\
			$('#'+DOM_Object[ItemID]['name']+' tr').each(function(rowindex){														//	\
			    $(this).find('td').each(function(columnindex){																		//	\
			        if ((columnindex>2)&&(rowindex>2)) 																				//	\
			        {	row=rowindex-3; col=columnindex-3;																			//	\
			            numberObj[row+'-'+col]=parseFloat($(this).attr('number'));													//	\
				    }																												//	\
			    });																													//	\
			});																														//	\
			window[thisid].EqObj[ItemID]['size']=row+'x'+col;																		//	\
			window[thisid].EqObj[ItemID]['real']=numberObj;																			//	\
			window[thisid].EqObj[ItemID]['type']="table";																			//	\
		}																															//	\
		if ((DOM_Object[ItemID]['type']=="forloop")&&(DOM_Object[ItemID]['location']<=DOM_Object[thisid]['lastpos']))				//	\
		{	window[thisid].EqObj[ItemID]=DOM_Object[ItemID];																		//	\
			window[thisid].EqObj[ItemID]['Loop_Perform']=window[ItemID]['Loop_Perform'];											//	\
			window[thisid].EqObj[ItemID]['Loop_firstrun']=window[ItemID]['Loop_firstrun'];											//	\
			window[thisid].EqObj[ItemID]['start']=window[ItemID]['start'];															//	\
			window[thisid].EqObj[ItemID]['stop']=window[ItemID]['stop'];															//	\
			window[thisid].EqObj[ItemID]['increment']=window[ItemID]['increment'];													//	\
			window[thisid].EqObj[ItemID]['Loop_countervalue']=window[ItemID]['Loop_countervalue'];									//	\
			window[thisid].EqObj[ItemID]['Loop_firstrun']=window[ItemID]['Loop_firstrun'];											//	\
			window[thisid].EqObj[ItemID]['counter']=window[ItemID]['counter'];														//	\
			window[thisid].EqObj[ItemID]['numsteps']=window[ItemID]['numsteps'];													//	\
			window[thisid].EqObj[ItemID]['valueid']=window[ItemID]['valueid'];														//	\
			window[thisid].EqObj[ItemID]['limitfactor']=window[ItemID]['limitfactor'];												//	\
			window[thisid].EqObj[ItemID]['Errors_flag']=window[ItemID]['Errors_flag'];												//	\
			window[thisid].EqObj[ItemID]['ID']=window[ItemID]['Format_id'];															//	\
		}																															//	\
		if ((DOM_Object[ItemID]['type']=="whileloop")&&(DOM_Object[ItemID]['location']<=DOM_Object[thisid]['lastpos']))				//	\
		{	window[thisid].EqObj[ItemID]=DOM_Object[ItemID];																		//	\
			window[thisid].EqObj[ItemID]['Loop_Perform']=window[ItemID]['Loop_Perform'];											//	\
			window[thisid].EqObj[ItemID]['Loop_firstrun']=window[ItemID]['Loop_firstrun'];											//	\
			window[thisid].EqObj[ItemID]['Loop_String']=window[ItemID]['Loop_String'];												//	\
			window[thisid].EqObj[ItemID]['Loop_TFString']=window[ItemID]['Loop_TFString'];											//	\
			window[thisid].EqObj[ItemID]['Loop_ValueString']=window[ItemID]['Loop_ValueString'];									//	\
			window[thisid].EqObj[ItemID]['Loop_Values']=window[ItemID]['Loop_Values'];												//	\
			window[thisid].EqObj[ItemID]['Loop_countervalue']=0;																	//	\
			window[thisid].EqObj[ItemID]['Loop_stepLimit']=window[ItemID]['Loop_stepLimit'];										//	\
			window[thisid].EqObj[ItemID]['Loop_truefalse']=window[ItemID]['Loop_truefalse'];										//	\
			window[thisid].EqObj[ItemID]['Errors_flag']=window[ItemID]['Errors_flag'];												//	\
			window[thisid].EqObj[ItemID]['ID']=window[ItemID]['Format_id'];															//	\
		}																															//	\
		if (((DOM_Object[ItemID]['type']=="ifelse")||(DOM_Object[ItemID]['type']=="elseif")||(DOM_Object[ItemID]['type']=="else"))	//	\
				&&(DOM_Object[ItemID]['location']<=DOM_Object[thisid]['lastpos']))													//	\
		{	window[thisid].EqObj[ItemID]=DOM_Object[ItemID];																		//	\
			window[thisid].EqObj[ItemID]['Statement_Order']=window[ItemID]['Statement_Order'];										//	\
			window[thisid].EqObj[ItemID]['Loop_Perform']=window[ItemID]['Loop_Perform'];											//	\
			window[thisid].EqObj[ItemID]['Statement_Parent']=window[ItemID]['Statement_Parent'];									//	\
			window[thisid].EqObj[ItemID]['Statement_String']=window[ItemID]['Statement_String'];									//	\
			window[thisid].EqObj[ItemID]['Statement_Execute']=window[ItemID]['Statement_Execute'];									//	\
			window[thisid].EqObj[ItemID]['Statement_TFString']=window[ItemID]['Statement_TFString'];								//	\
			window[thisid].EqObj[ItemID]['Statement_Type']=window[ItemID]['Statement_Type'];										//	\
			window[thisid].EqObj[ItemID]['Statement_ValueString']=window[ItemID]['Statement_ValueString'];							//	\
			window[thisid].EqObj[ItemID]['Statement_Values']=window[ItemID]['Statement_Values'];									//	\
			window[thisid].EqObj[ItemID]['Statement_truefalse']=window[ItemID]['Statement_truefalse'];								//	\
			window[thisid].EqObj[ItemID]['Errors_flag']=window[ItemID]['Errors_flag'];												//	\
			window[thisid].EqObj[ItemID]['ID']=window[ItemID]['Format_id'];															//	\
			window[thisid].EqObj[ItemID]['topparent']=DOM_Object[ItemID]['topparent']===undefined ? "none" :  DOM_Object[ItemID]['topparent'];
			window[thisid].EqObj[ItemID]['parent']=DOM_Object[ItemID]['parent']===undefined ? "none" :  DOM_Object[ItemID]['parent'];
		}																															//	\
	}																																//	\
	console.log('Finished createStructureObj with '+thisid);
	if (typeof(callback)=="function") { callback();	}																				//	\
};																																	//	\
//-------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------- CALL THE SOLVER FOR THE FOR LOOP -----------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------//
/*	This is the function that actually calls the web worker to solve the for loop, while loop, or if else statement.					\
//-------------------------------------------------------------------------------------------------------------------------------------*/
function callStructureSolver(thisid, fileid, callback)																				//	\
{	var structureWorker = new Worker("http://www.cadwolf.com/js/EquationSolver.js?");												//	\
	structureWorker.postMessage({																									//	\
		"cadwolfType":"SolveStructure", 																							//	\
		"ID":thisid,																												//	\
		"Units_Object":Units_Object,																								//	\
		"ImportedFunctions":ImportedFunctions,																						//	\
		"Units_Object":Units_Object,																								//	\
		"ParseUnits":ParseUnits,																									//	\
		"FileInputs":FileInputs,																									//	\
		"FileID":fileid,																											//	\
		"EqObj":window[thisid].EqObj																								//	\
	});																																//	\
	structureWorker.onmessage = function(e) {																						//	\
		returnObject=e.data;																										//	\
		if (returnObject.messageType=="StructureResult") { UpdateStructure(returnObject); }											//	\
	}																																//	\	
	if (typeof(callback)=="function") { callback();	}																				//	\
};																																	//	\
//-------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------//
function ToNum (num){	return parseFloat(parseFloat(num).toFixed(12));	}															//	\
//-------------------------------------------------------------------------------------------------------------------------------------//


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------ Event Handlers for For Loops ---------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------- ADD A NEW FOR LOOP ----------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', "#addforloop", function(event) {															//	\
		var id = Get_ID("ForLoop");																						//	\
		window[id]= new ForLoop(id);																					//	\
		temp=$('#tocloneforloop').clone();																				//	\
		temp.attr('type','6').attr('id','').attr('new','new').children('.forloop').attr('id', id);						//	\
		temp.find('#startselect').attr("id", id+"startselect");															//	\
		temp.find('#whileselect').attr("id", id+"whileselect");															//	\
		temp.find('#endselect').attr("id", id+"endselect");																//	\
		temp.children().attr("parent","none").attr("counter","a");														//	\
		temp.children().find('.forlooplabel').text("a");																//	\
		var addid=$('#currentitem').attr('itemid');																		//	\
		if ($('#currentitem').attr('itemid')=="top") 																	//	\
			{ temp.insertAfter($('#MainBody > .subtitleblock'));  														//	\
			}else { temp.insertAfter($('#'+addid).parent('.main_item'));  }												//	\
		AddNewItem(id, temp, "forloop", '6');																			//	\
	}); 																												//	\
/*-------------------------------------------------------------------------------------------------------------------------*/
	
/*-------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------- EDITING A LOOP VALUE -----------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".forloopvalue", function(event) 															//	\
	{	var id=$(this).closest(".forloop").attr("id");																	//	\
		var value=$(this).html();																						//	\
		$(this).closest('.forloopvaluewrapper').html('<input type="text" value="'+value+'" class="forloopinput">');		//	\
	});																													//	\
	$(document).on('keyup', ".forloopinput", function(e) 																//	\
	{	if ((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))													//	\
		{	var id=$(this).closest('.forloop').attr('id');																//	\
			var text=$(this).val();																						//	\
			var type=$(this).closest('.forloopvaluewrapper').attr('type');												//	\
			if (type=="start"){	window[id].starttext=text;	}															//	\
			if (type=="inc"){	window[id].incrementtext=text;	}														//	\
			if (type=="end"){	window[id].stoptext=text;	}															//	\
			window[id].Format_haschanged=1;																				//	\
			window[id].LoopValues();																					//	\
			$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');	//	\
			$(this).closest('.forloopvaluewrapper').html('<div class="forloopvalue">'+text+'</div>');					//	\
		}																												//	\
	});																													//	\ 
/*-------------------------------------------------------------------------------------------------------------------------*/
	
/*-------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------ EDIT FOR LOOP EQUAL NOT EQUAL ------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".forloopwhilevalue", function(event) 														//	\
	{	var id=$(this).closest(".forloop").attr("id");																	//	\
		temp=$('#tocloneequalblock2').clone();																			//	\
		temp.attr("id",'');																								//	\
		$(this).append(temp);																							//	\
		$(this).find('.equalitem2').addClass('forloopequalitem').removeClass('equalitem2');								//	\
		$(this).find('.equalblock2').show();																			//	\
		$(this).addClass('forloopwhilevaluetemp').removeClass('forloopwhilevalue');										//	\
	});																													//	\
	$(document).on('click', ".forloopwhilevaluetemp", function(event) 													//	\
	{	if ($(this).find('.equalblock2').length) { $(this).find('.equalblock2').remove();		}						//	\
		$(this).addClass('forloopwhilevalue').removeClass('forloopwhilevaluetemp');										//	\		
	});																													//	\
	$(document).on('click', ".forloopequalitem", function(e) 															//	\
	{	var text=$(this).text();																						//	\
		var id=$(this).closest(".forloop").attr("id");																	//	\
		$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');		//	\
		$(this).closest('.forloopwhilevaluetemp').addClass('forloopwhilevalue').removeClass('forloopwhilevaluetemp');	//	\
		$(this).closest('.forloopwhilevalue').html(text);																//	\
		$(this).closest('.forloopwhilevalue').find('.equalblock2').remove();											//	\
		window[id].limitfactor=text;																					//	\ 
		window[id].Format_haschanged=1;																					//	\ 
		window[id].LoopValues();																						//	\
	});																													//	\ 
/*-------------------------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------- UPDATE THE FOR LOOP -------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".updateforloop", function(event) {															//	\
		var id=$(this).closest('.icon_holder').siblings('.forloop').attr("id");											//	\
		var fileid=$('#filenumber').attr('filenumber');																	//	\
		window[id].Loop_firstrun=1;																						//	\
		$('#'+id).addClass('solving');																					//	\
		createStructureObj(id, function () { callStructureSolver(id, fileid); });										//	\
    });																													//	\
/*-------------------------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------------------------*/
	function Solving (type, id, callback)																				//	\
	{	$('#'+id).closest('.top_item').addClass('solving');	}															//	\
	function DoneSolving (type, id, callback)																			//	\
	{	if ((type=="forloop")||(type=="whileloop"))																		//	\
		{	$('#'+id).closest('.top_item').removeClass('solving');		}												//	\
		if (typeof(callback)=="function") { callback();	}																//	\
	}																													//	\
/*-------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------- Loop Specifics --------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/	
/*	This is the function that updates the parameters in the loop specifics box with new values. This is called for for loops, while loops, and if/else statements. 		\
	The code looks at each main item and then outputs a line that shows the status of the loop, statement, or equation. The user can click on that line and see the 	\
	specifics of that loop, item, or equation.																															\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/	
	$(document).on('click', ".loopspecs", function(event) 																											//	\
	{	event.stopPropagation();																																	//	\
		var id=$(this).closest('.icon_holder').siblings('.forloop, .whileloop, .ifelse').attr('id');																//	\
		Updateloopspec(id);																																			//	\
		$('#equation_spec, #image_spec, #table_spec, #symeq_spec, #text_spec, #plot_spec').hide();																	//	\
		$("#loop_spec").attr('LoopID',id);																															//	\ 
		$("#loop_spec").show();																																		//	\ 
    });  																																							//	\       
	$(document).on('click', "#loopspecs_showinfo", function(event) 																									//	\
	{	var id=$("#loop_spec").attr('LoopID');																														//	\		
		Updateloopspec(id);																																			//	\
		$('#loopspecs_table').toggle();																																//	\
    });  																																							//	\       
	function Updateloopspec(id)																																		//	\
	{	$('.loopspecs_leftline, .loopspecs_rightline').remove();																									//	\
		$('#'+id).closest('.top_item').find('.forloop, .whileloop, .ifelse, .subequationblock').each( function(){													//	\
			var type=$(this).closest('.main_item').attr('type');																									//	\
			var thisid=$(this).attr('id');																															//	\
			if (type=="3") { 																																		//	\
				temp='<div class="loopspecs_leftline" loopinfo="loopspecs'+thisid+'">Equation - '+window[thisid].Format_name+'</div>';								//	\																							//	\
				$('#loop_spec').find('.loopspecs_left').append(temp);																								//	\ 	
			}																																						//	\
			if (type=="6") { 																																		//	\
				temp='<div class="loopspecs_leftline" loopinfo="loopspecs'+thisid+'">For Loop - '+window[thisid].counter+'</div>';									//	\																						//	\
				$('#loop_spec').find('.loopspecs_left').append(temp);																								//	\ 
			}																																						//	\
			if (type=="7") { 																																		//	\
				temp='<div class="loopspecs_leftline" loopinfo="loopspecs'+thisid+'">While Loop</div>';																//	\																						//	\
				$('#loop_spec').find('.loopspecs_left').append(temp);																								//	\ 
			}																																						//	\
			if (type=="8") { 																																		//	\
				{ temp='<div class="loopspecs_leftline" loopinfo="loopspecs'+thisid+'">'+CFL(window[thisid].Statement_Type)+'</div>'; }								//	\
				$('#loop_spec').find('.loopspecs_left').append(temp);																								//	\ 
			}																																						//	\
		});																																							//	\
		$('#'+id).closest('.top_item').find('.forloop, .whileloop, .ifelse, .subequationblock').each( function(){													//	\
			var type=$(this).closest('.main_item').attr('type');																									//	\
			var thisid=$(this).attr('id');																															//	\
																																									//	\
			if (type=="3") { 																																		//	\
				temp='<div class="loopspecs_rightline" id="loopspecs'+thisid+'">';																					//	\
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Name</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].Format_name+'</div></div>';
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Value</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].Solution_real['0-0']+'</div></div>';
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Units</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].Units_units+'</div></div>';
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Size</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].Format_size+'</div></div>';
				temp=temp+"</div>";																																	//	\
			}																																						//	\
			if (type=="6") { 																																		//	\
				temp='<div class="loopspecs_rightline" id="loopspecs'+thisid+'">';																					//	\
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Counter</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].counter+'</div></div>';
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Start Text</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].starttext+'</div></div>';
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Start Value</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].start+'</div></div>';
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Limit</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].limitfactor+'</div></div>';
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Increment Text</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].incrementtext+'</div></div>';
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Increment Value</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].increment+'</div></div>';
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">End Text</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].stoptext+'</div></div>';
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">End Value</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].stop+'</div></div>';
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Iterations</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].numsteps+'</div></div>';
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Errors</div>';														//	\
					if (window[thisid].Errors_flag=="1"){	for (var a=0; a<window[thisid].Errors_errors.length; a=a+1)	{ temp=temp+'<div class="loopspecs_sublineright">'+window[thisid].Errors_errors[a]+'</div>';}	
					}	else {temp=temp+'<div class="loopspecs_sublineright">No Errors</div>';}																			//	\
					temp=temp+"</div>";																																//	\
				temp=temp+"</div>";																																	//	\
			}																																						//	\
			if (type=="7") { 																																		//	\
				temp='<div class="loopspecs_rightline" id="loopspecs'+thisid+'">';																					//	\
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Statement Text</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].Loop_String+'</div></div>';
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Statement Values</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].Loop_ValueString+'</div></div>';
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Statement Results</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].Loop_TFString+'=>'+window[thisid].Loop_truefalse+'</div></div>';
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Errors</div><div class="loopspecs_colon">:</div>';	
					if (window[thisid].Errors_flag=="1"){	for (var a=0; a<window[thisid].Errors_errors.length; a=a+1)	{ temp=temp+'<div class="loopspecs_sublineright">'+window[thisid].Errors_errors[a]+'</div>';}	temp=temp+"</div>";
					}	else {temp=temp+'<div class="loopspecs_sublineright">No Errors</div></div>';}																//	\
				temp=temp+"</div>";																																	//	\
			}																																						//	\
			if (type=="8") { 																																		//	\
				temp='<div class="loopspecs_rightline" id="loopspecs'+thisid+'">';																					//	\
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Statement Type</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].Statement_Type+'</div></div>';
					if (window[thisid].Statement_Type!="else") {																									//	\
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Statement Text</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].Statement_String+'</div></div>';
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Statement Values</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].Statement_ValueString+'</div></div>';
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Statement Results</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">'+window[thisid].Statement_TFString+'=>'+window[thisid].Statement_truefalse+'</div></div>';
					}																																				//	\
					if (window[thisid].Statement_Execute==1) { temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Statement Executed?</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">Yes</div></div>'; }
					if (window[thisid].Statement_Execute===0) { temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Statement Executed?</div><div class="loopspecs_colon">:</div><div class="loopspecs_sublineright">No</div></div>'; }
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Execution Path</div><div class="loopspecs_colon">:</div>';
					for (var a=0; a<window[window[thisid].Statement_Parent].Statement_Order.length; a=a+1)	{ 
						temp=temp+'<div class="loopspecs_sublineright">'+window[window[window[thisid].Statement_Parent].Statement_Order[a]].Statement_Type+' - ';	
						if (window[window[window[thisid].Statement_Parent].Statement_Order[a]].Statement_Execute==1) { temp=temp+'Executed</div>';}else {temp=temp+'Not Executed</div>';}}	
					temp=temp+'<div class="loopspecs_subline"><div class="loopspecs_sublineleft">Errors</div><div class="loopspecs_colon">:</div>';	
					if (window[thisid].Errors_flag=="1"){	for (var a=0; a<window[thisid].Errors_errors.length; a=a+1)	{ temp=temp+'<div class="loopspecs_sublineright">'+window[thisid].Errors_errors[a]+'</div>';}	temp=temp+"</div>";
					}	else {temp=temp+'<div class="loopspecs_sublineright">No Errors</div></div>';}																//	\
				temp=temp+"</div>";																																	//	\
			}																																						//	\
			$('#loop_spec').find('.loopspecs_right').append(temp);																									//	\ 
		});																																							//	\
	}																																								//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".loopspecs_leftline", function(event) {																								//	\
		var idtoshow=$(this).attr('loopinfo');	  																													//	\
		var idtohide=$('#loop_spec').attr('showing');																												//	\
		$('#loop_spec').attr('showing', idtoshow);																													//	\
		$('#'+idtohide).hide();																																		//	\
		$('#'+idtoshow).show();																																		//	\
   }); 																																								//	\       
	$(document).on('click', '#close_loopspec', function() { 	$("#loop_spec").hide();    }); 																		//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------- End of For Loops ------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/	


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------- SUB ITEMS - EQUATIONS, LOOPS, IF ELSE ----------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$.fn.reverse = [].reverse;
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//------------------------------------------------------------- FUNCTION TO ADD NEW SUB ITEMS -------------------------------------------------------------------------//
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function adds a new sub item to the document (DOM) and to the model. A sub item is a loop, statement, or equation that is contained within a loop or equation.	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function AddNewSubItem(id, insertitem, type, typenum, addtoid, placement, parent, topparent)																		//	\
{	DOM_Object[id]={};	DOM_Object[id]['type']=type;	DOM_Object[id]['name']=id;	DOM_Object[id]['children']={};	DOM_Object[id]['descendents']={}; 				//	\
	DOM_Object[id]['Dependents']={};	DOM_Object[id]['parent']=parent;	DOM_Object[id]['topparent']=topparent;	DOM_Object[id]['active']=1;						//	\
	var addloc=0; var thisloc=0;																																	//	\
	$('#Format_Wrapper, .icon_holder, .sublineshow, .updateforloop, .updatewhileloop, .updateifelse, .ifelseaddif, .ifelseaddelse, .ifelsedelete').hide(); 			//	\	
	$('.top_item').removeClass('current').addClass('notcurrent');																									//	\
	if (placement==1){	$('#'+window[id].Page_parentid).children(".forloopcontent, .whileloopcontent, .ifelsecontent").append(insertitem);							//	\
	}else																																							//	\
	{	if ($('#'+addtoid).hasClass("subequationblock")){	var thissibling=$('#'+addtoid).closest('.main_item');	insertitem.insertAfter(thissibling);			//	\
		}else{	$('#'+window[id].Page_parentid).children(".forloopcontent, .whileloopcontent, .ifelsecontent").prepend(insertitem);	}								//	\		
	}																																								//	\
	$('#'+id).siblings('.icon_holder').show();																														//	\
	$('#currentitem').attr('itemid',id).attr('type',type);																											//	\
	addloc=DOM_Object[addtoid]['location']; thisloc=parseInt(addloc, 10)+1; DOM_Object[id]['location']=thisloc;	DOM_Object[id]['lastpos']=thisloc;					//	\
	window[id].Page_position=parseInt(thisloc, 10);																													//	\
	for (var i in DOM_Object)																																		//	\
	{	if ((DOM_Object[i]['location']>=thisloc)&&(i!=id)) 																											//	\
		{	DOM_Object[i]['location']=parseInt(DOM_Object[i]['location'], 10)+1; 																					//	\
			if (window[i]) { window[i].Page_position=parseInt(window[i].Page_position, 10)+1; 																		//	\
	} 	} 	}																																						//	\
	var textstring=id+'::'+parseInt(thisloc, 10)+'::'+typenum+'::'+window[id].Page_parentid+'::'+window[id].Page_topparentid;										//	\
	$.ajax ({	type:"POST",url:"/Documents/UpdateLocations", async:false,																							//	\
		data: { fileid:$('#filenumber').attr('filenumber'),	text:textstring,	insert:1},																			//	\
        error: function () { alert('There was an error updating the page order.');}																					//	\
	});																																								//	\
	DOM_Object[parent]['children'][id]=1;	DOM_Object[DOM_Object[id]['topparent']]['descendents'][id]=1;															//	\
	AddressForLoopCounters(window[id].Page_topparentid);																											//	\
	SetLastPosition(parent);																																		//	\
	SetLastPosition(topparent);																																		//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------- ADDRESSING FOR LOOP COUNTERS ----------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function looks at the for loops and changes the counters. They are lettered from top to bottom from a to whatever letter is appropriate.						\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	function AddressForLoopCounters(topid) 																															//	\
	{	var id='';	var counter='a';																																//	\
		$("#"+topid).closest('.top_item').find('.forloop').each(function (i)																						//	\
		{	id=$(this).attr('id');																																	//	\
			window[id].counter=counter;																																//	\
			DOM_Object[id]['counter']=counter;																														//	\
			$('#'+id).find('.forlooplabel').html(counter);																											//	\
			counter=String.fromCharCode(counter.charCodeAt()+1); 																									//	\
		});																																							//	\
	} 																																								//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------- SETTING THE LAST PAGE POSITION ----------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is given the id of any loop or statement and it finds the position of the last item within that loop or statement. It records this position within	\
	the object. This last position is used by the code that solves the loops and statements.																			\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	function SetLastPosition(id) 																																	//	\
	{	var lastpos=DOM_Object[id]['location'];																														//	\
		for (var i in DOM_Object[id]['children']){ if (DOM_Object[i]['location']>lastpos) { lastpos=DOM_Object[i]['location'];  } }									//	\ 
		for (var i in DOM_Object[id]['descendents']){ if (DOM_Object[i]['location']>lastpos) { lastpos=DOM_Object[i]['location'];} }								//	\ 
		DOM_Object[id]['lastpos']=lastpos;																															//	\
	} 																																								//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- SHOWING AND HIDING THE BAR FOR SUBITEMS ------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".sublineshow", function(event) 																										//	\ 
	{	temp=$('#toclonesubline').clone();																															//	\ 
		temp.attr('id','').addClass("subline");																														//	\ 
		appended=$(this).parent().find(".sublineshow");																												//	\ 
		temp.hide().appendTo(appended).fadeIn(500);																													//	\ 
		$(this).addClass('sublinehide').removeClass('sublineshow');																									//	\
	}); 																																							//	\
	$(document).on('click', ".sublinehide", function(event) 																										//	\ 
	{	$(this).parent().find('.subline').fadeOut(500, function() { $(this).parent().find('.subline').remove(); });													//	\
		$(this).addClass('sublineshow').removeClass('sublinehide');																									//	\ 
	}); 																																							//	\ 
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------- ADDING A SUB FOR LOOP -----------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".addforloopsub", function(event) 																										//	\
	{	var parentforloop="NULL";	var counter='';		var parentcounter='';																						//	\
		var id = Get_ID("ForLoop");																																	//	\
		window[id]= new ForLoop(id);																																//	\
		temp=$('#tocloneforloop').clone();																															//	\
		temp.attr('type','6').attr('id','').children('.forloop').attr('id', id);																					//	\
		temp.find('.updateforloop').remove();																														//	\
		temp.find('#startselect').attr("id", id+"startselect");																										//	\
		temp.find('#whileselect').attr("id", id+"whileselect");																										//	\
		temp.find('#endselect').attr("id", id+"endselect");																											//	\
		temp.removeClass('top_item');																																//	\
		window[id].Page_topparentid=$(this).closest('.top_item').children('.forloop, .whileloop, .ifelse').attr("id");												//	\
		if ($(this).closest(".icon_holder").siblings().hasClass('subequationblock'))																				//	\
		{	window[id].Page_parentid=$(this).closest(".forloop, .ifelse, .whileloop").attr("id");																	//	\
			var addid=$(this).closest('.icon_holder').siblings('.subequationblock').attr('id');																		//	\
			$('#currentitem').attr('itemid', addid).attr('type','equation');																						//	\
		}else																																						//	\
		{	window[id].Page_parentid=$(this).closest(".icon_holder").siblings(".forloop, .whileloop, .ifelse").attr("id");											//	\
			$('#currentitem').attr('itemid',window[id].Page_parentid).attr('type','forloop');																		//	\
		}																																							//	\
		$(this).closest('.top_item').addClass('needsupdate');																										//	\
		var addid=$(this).closest(".icon_holder").siblings(".forloop, .whileloop, .ifelse, .subequationblock").attr("id");											//	\
		AddNewSubItem(id, temp, "forloop", 6, addid, 0, window[id].Page_parentid, window[id].Page_topparentid);														//	\
	}); 																																							//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
/*---------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------- ADDING A WHILE LOOP SUB ------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".addwhileloopsub", function(event) 																			//	\
	{	var id = Get_ID("WhileLoop");																										//	\
		window[id]= new WhileLoop(id);																										//	\
		temp=$('#toclonewhileloop').clone();																								//	\
		temp.attr('type','7').attr('id','').removeClass('top_item');																		//	\
		temp.find('.updatewhileloop').remove();																								//	\
		temp.children('.whileloop').attr('id', id);																							//	\
		temp.find('#whileflag').attr("id", id+"whileflag");																					//	\
		temp.find('#whiledependent').attr("id", id+"whiledependent");																		//	\
		window[id].Page_topparentid=$(this).closest('.top_item').children('.forloop, .whileloop, .ifelse').attr("id");						//	\
		if ($(this).closest(".icon_holder").siblings().hasClass('subequationblock'))														//	\
		{	window[id].Page_parentid=$(this).closest(".forloop, .ifelse, .whileloop").attr("id");											//	\
			var addid=$(this).closest('.icon_holder').siblings('.subequationblock').attr('id');												//	\
			$('#currentitem').attr('itemid', addid).attr('type','equation');																//	\
		}else																																//	\
		{	window[id].Page_parentid=$(this).closest(".icon_holder").siblings(".forloop, .whileloop, .ifelse").attr("id");					//	\
			$('#currentitem').attr('itemid',window[id].Page_parentid).attr('type','whileloop');												//	\
		}																																	//	\
		$(this).closest('.top_item').addClass('needsupdate');																				//	\
		var addid=$(this).closest(".icon_holder").siblings(".forloop, .whileloop, .ifelse, .subequationblock").attr("id");					//	\
		AddNewSubItem(id, temp, "whileloop", 7, addid, 0, window[id].Page_parentid, window[id].Page_topparentid);							//	\
		window[id].LoopValues(id);																											//	\
	});																																		//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------ ADDING AN IF ELSE SUB ----------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".addifelsesub", function(event) 																				//	\
	{	var id = Get_ID("IfElseStatement");																									//	\
		window[id]= new IfElse(id);																											//	\
		window[id].Page_topparentid=$(this).closest(".top_item").find(".forloop, .ifelse, .whileloop").attr("id");							//	\
		temp=$('#tocloneifelse').clone();																									//	\
		temp.attr('type','8').attr('id','').removeClass('top_item').find('.updateifelse').remove();											//	\
		temp.children('.ifelse').attr('id', id);																							//	\
		temp.find('#ifelseflag').attr("id", id+"ifelseflag");																				//	\
		temp.find('#ifelsedependent').attr("id", id+"ifelsedependent");																		//	\
		temp.find('.ifelsecontent').addClass("itemneedsupdate");																			//	\
		temp.removeClass('top_item');																										//	\
		if ($(this).closest(".icon_holder").siblings().hasClass('subequationblock'))														//	\
		{	window[id].Page_parentid=$(this).closest(".forloop, .ifelse, .whileloop").attr("id");											//	\
			var addid=$(this).closest('.icon_holder').siblings('.subequationblock').attr('id');												//	\
			$('#currentitem').attr('itemid', addid).attr('type','equation');																//	\
		}else																																//	\
		{	window[id].Page_parentid=$(this).closest(".icon_holder").siblings(".forloop, .whileloop, .ifelse").attr("id");					//	\
			$('#currentitem').attr('itemid',window[id].Page_parentid).attr('type','ifelse');												//	\
		}																																	//	\
		window[id].Statement_Order.push(id);																								//	\
		$(this).closest('.top_item').addClass('needsupdate');																				//	\
		var addid=$(this).closest(".icon_holder").siblings(".forloop, .whileloop, .ifelse, .subequationblock").attr("id");					//	\
		AddNewSubItem(id, temp, "ifelse", 8, addid, 0, window[id].Page_parentid, window[id].Page_topparentid);								//	\
	}); 																																	//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------*/

//------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------- ADD SUB EQUATION ---------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', ".addequationsub", function(event) {																		//	\
		var temp=$('#toclonesubeq').clone();																							//	\
		var id=Get_ID("Equation");																										//	\
		temp.attr('id','').attr('type','3').children('.subequationblock').attr('id',id);												//	\ 
		temp.addClass('update').removeClass('top_item');																				//	\
		window[id] = new Equation(id);																									//	\
		window[id].Page_topparentid=$(this).closest(".top_item").find(".forloop, .ifelse, .whileloop").attr("id");						//	\
		if ($(this).closest(".icon_holder").siblings().hasClass('subequationblock'))													//	\
		{	window[id].Page_parentid=$(this).closest(".forloop, .ifelse, .whileloop").attr("id");										//	\
			var addid=$(this).closest('.icon_holder').siblings('.subequationblock').attr('id');											//	\
			$('#currentitem').attr('itemid', addid).attr('type','equation');															//	\
		}else																															//	\
		{	window[id].Page_parentid=$(this).closest(".icon_holder").siblings(".forloop, .whileloop, .ifelse").attr("id");				//	\
			$('#currentitem').attr('itemid',window[id].Page_parentid).attr('type','forloop');											//	\
		}																																//	\
		$(this).closest('.top_item').addClass('needsupdate');																			//	\
		var addid=$(this).closest(".icon_holder").siblings(".forloop, .whileloop, .ifelse, .subequationblock").attr("id");				//	\
		AddNewSubItem(id, temp, "equation", 3, addid, 0, window[id].Page_parentid, window[id].Page_topparentid);						//	\
		if ((DOM_Object[DOM_Object[id]['parent']]['type']=="ifelse")||(DOM_Object[DOM_Object[id]['parent']]['type']=="elseif")||(DOM_Object[DOM_Object[id]['parent']]['type']=="else"))
		{	window[DOM_Object[id]['parent']].StatementValues(DOM_Object[id]['parent']);													//	\
		}																																//	\	
	}); 																																//	\
//------------------------------------------------------------------------------------------------------------------------------------------//
	
//------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------- EDIT A SUBEQUATION ---------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('dblclick', ".subeqshow", function(event) {																			//	\
		$(this).parent().find('.subeqshow').hide();																						//	\
		$(this).parent().find('.subparam_cont, .eqparam').show();																		//	\
		$(this).parent().find('.eqparam').focus();																						//	\
		$(this).closest('.main_item').addClass('update');																				//	\
	}); 																																//	\
//------------------------------------------------------------------------------------------------------------------------------------------//

//------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- FINISHED EDITING A SUBEQUATION -------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('keyup', ".subequationblock input", function(e) {																	//	\
		if ((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))																	//	\
		{																																//	\
			var id=$(this).closest('.subequationblock').attr("id");																		//	\
			var equation=$(this).val();																									//	\
			$(this).attr('value',equation);																								//	\
			window[id].Format_equation=equation;																						//	\
			window[id].Format_haschanged=1;																								//	\
			$(this).parent().parent().find('.subeqshow').html("$${"+equation+"}$$");													//	\
			$(this).parent().parent().find('.subeqshow').show();																		//	\
			$(this).parent().parent().find('.subparam_cont').hide();																	//	\
			$(this).closest('.top_item').addClass('needsupdate');																		//	\
			MathJax.Hub.Queue(["Typeset",MathJax.Hub,id]);																				//	\
			$('#'+id).find('.MathJax_Display').attr('style','text-align:left');															//	\
		}																																//	\
	}); 																																//	\
//------------------------------------------------------------------------------------------------------------------------------------------//
    
//------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------- MOVE A SUBITEM UP TO THE NEXT LEVEL ----------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', ".pulloutsub", function(e) {																				//	\--- This is the function where the user would like to pull a
		var id=$(this).closest('.icon_holder').siblings('.forloop, .whileloop, .ifelse, .subequationblock').attr('id');					//	\--- subitem out of a loop. It is deleted and placed into the
		var temp=$(this).closest('.main_item');																							//	\
		if ($(this).closest('.icon_holder').siblings('.forloop, .whileloop, .ifelse, .subequationblock').hasClass('.subequationblock'))	//	\
		{	var type="equation";	var num=3;																							//	\
			delete DOM_Object[DOM_Object[id]['parent']]['children'][id];																//	\
			window[id].Page_parentid=window[window[id].Page_parentid].Page_parentid;													//	\
			DOM_Object[id]['parent']=window[window[id].Page_parentid].Page_parentid;													//	\
			DOM_Object[DOM_Object[id]['parent']]['children'][id]=1;																		//	\
			var addid=$('#'+window[id].Page_parentid).last('.main_item').attr('id');													//	\
		}else 																															//	\
		{	window[id].Page_parentid=window[window[id].Page_parentid].Page_parentid;													//	\
			delete DOM_Object[DOM_Object[id]['parent']]['children'][id];																//	\
			DOM_Object[id]['parent']=window[window[id].Page_parentid].Page_parentid;													//	\
			DOM_Object[DOM_Object[id]['parent']]['children'][id]=1;																		//	\
			var addid=$('#'+window[id].Page_parentid).last('.main_item').attr('id');													//	\
			if ($(this).closest('.icon_holder').siblings('.forloop, .whileloop, .ifelse, .subequationblock').hasClass('.forloop'))		//	\
			{	var type="forloop"; var num=6; }																						//	\
			if ($(this).closest('.icon_holder').siblings('.forloop, .whileloop, .ifelse, .subequationblock').hasClass('.whileloop'))	//	\
			{	var type="whileloop"; var num=7; }																						//	\
			if ($(this).closest('.icon_holder').siblings('.forloop, .whileloop, .ifelse, .subequationblock').hasClass('.ifelse'))		//	\
			{	var type="whileloop"; var num=8; }																						//	\
		}																																//	\
		AddNewSubItem(id, temp, type, num, addid, 1, window[id].Page_parentid, window[id].Page_topparentid);							//	\																					
	}); 																																//	\
//------------------------------------------------------------------------------------------------------------------------------------------//

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------- While Loops ----------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------- Functions for While Loops ---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------- THE WHILE LOOP OBJECT -------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
function WhileLoop (loopid) 																																//	\
{ 																																							//	\
	this.Format_id=loopid;																																	//	\
	this.Format_haschanged=1;																																//	\
	this.Page_topparentid='none';																															//	\
	this.Page_parentid='none';																																//	\
	this.Page_position=0;																																	//	\
	this.Page_lastposition=0;																																//	\
	this.Loop_status='';																																	//	\
	this.Loop_numsteps='';																																	// 	\
	this.Loop_stepLimit=100;																																// 	\
	this.Loop_countervalue=0;																																//	\
	this.Loop_firstrun='1';																																	//	\
	this.Loop_String='';																																	//	\
	this.Loop_TFString='';																																	//	\
	this.Loop_ValuesString='';																																//	\ 
	this.Loop_Perform=new Array();																															//	\ 
	this.Errors_flag=0;																																		//	\
	this.Errors_errors=new Array();																															//	\
	this.Loop_Values={};																																	//	\
	this.Loop_Values['blockindex0']={};																														//	\
	this.Loop_Values['blockindex0']['statement0']={};																										//	\
	this.Loop_Values['blockindex0']['statement0']['conditiontext']="==";																					//	\
	this.Loop_Values['blockindex0']['statement0']['dependenttext']="1";																						//	\
	this.Loop_Values['blockindex0']['statement0']['dependentvalue']=1;																						//	\
	this.Loop_Values['blockindex0']['statement0']['flagtext']="flag";																						//	\
	this.Loop_Values['blockindex0']['statement0']['flagvalue']=1;																							//	\
	this.Loop_Values['blockindex0']['statement0']['truefalse']=false;																						//	\
	this.fileid=$('#filenumber').attr('filenumber');																										//	\
	// Example : While flag!=1 would be recorded as while flag condition dependent																			//	\
}																																							//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------ GETTING THE VALUES OF THE WHILE LOOP PARAMETERS ------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
/*	This function is called any time the user changes the flag, condition, or dependent values.	For each set of statements where the user has entered 			\
	Flag==Dependent, the text entered by the user is collected. The condition selected is also grabbed.															\
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
WhileLoop.prototype.LoopValues = function (loopid, firstrun, callback)																						//	\
{ 	var whileLoopWorker = new Worker("http://www.cadwolf.com/js/EquationSolver.js");																		//	\
	window[loopid].Errors_errors=new Array();	window[loopid].Errors_flag=0;	this.Loop_Values={};	var myobject={};									//	\
	$('#'+loopid).find('.whilelooptext').first().find('.whileloopblock').each( function(blockindex)															//	\
	{	myobject['blockindex'+blockindex]={};																												//	\
		$(this).find('.whileloopstatements').each( function(statementindex)																					//	\
		{																																					//	\
			myobject['blockindex'+blockindex]['statement'+statementindex]={};																				//	\
			myobject['blockindex'+blockindex]['statement'+statementindex]['flagtext']=$(this).attr('flag');													//	\
			myobject['blockindex'+blockindex]['statement'+statementindex]['conditiontext']=$(this).attr('condition');										//	\
			myobject['blockindex'+blockindex]['statement'+statementindex]['dependenttext']=$(this).attr('dependent');										//	\
		});																																					//	\
		$(this).find('.andorstatements').each( function(andorindex) 																						//	\
		{ myobject['blockindex'+blockindex]['andor'+andorindex]=$(this).find('.andorvalue').text(); });														//	\
	});																																						//	\
	$('#'+loopid).find('.andorblock').each( function(andorindex)	{	myobject['andor'+andorindex]=$(this).find('.andorvalue').text(); });				//	\
	DOM_Object[loopid]['Dependents']={};																													//	\
	DOM_Object[loopid]['Loop_Values']=myobject;																												//	\
	window[loopid]['Loop_Values']=myobject;																													//	\
	Create_EqObj(loopid, function () { 																														//	\
		whileLoopWorker.postMessage({																														//	\
			"cadwolfType":"SolveWhileLoopParameters", 																										//	\
			"LoopID":loopid,																																//	\
			"loopObject":window[loopid],																													//	\
			"Units_Object":Units_Object,																													//	\
			"ParseUnits":ParseUnits,																														//	\
			"ImportedFunctions":ImportedFunctions,																											//	\
			"FileInputs":FileInputs,																														//	\
			"EqObj":window[loopid].EqObj,																													//	\
			"firstrun":1,																																	//	\
			"location":DOM_Object[loopid]['location'],																										//	\
			"FileID":$('#filenumber').attr('filenumber'),																									//	\
			"location":DOM_Object[loopid]['location']																										//	\
		});																																					//	\
	});																																						//	\
	whileLoopWorker.onmessage=function(e){returnObject=e.data; UpdateWhileLoopParams(returnObject); whileLoopWorker.terminate(); whileLoopWorker=undefined;	}//	\
};																																							//	\
function UpdateWhileLoopParams(loopObj)																														//	\
{	var loopid=loopObj['ID'];																																//	\
	window[loopid]['Loop_Values']=loopObj['thisObject']['Loop_Values'];																						//	\
	window[loopid]['Loop_String']=loopObj['thisObject']['Loop_String'];																						//	\
	window[loopid]['Loop_TFString']=loopObj['thisObject']['Loop_TFString'];																					//	\
	window[loopid]['ValueString']=loopObj['thisObject']['ValueString'];																						//	\
	window[loopid]['Loop_truefalse']=loopObj['thisObject']['Loop_truefalse'];																				//	\
	DisplayWhileLoopFormat(loopid);																															//	\
}																																							//	\
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------- SHOW THAT THE WHILE LOOP BLOCKS ARE TRUE OR FALSE -------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
/*	This function is called when the worker returns the true/false for each block after evaluating the blocks. The function simply looks at the true/false		\
	and sets the appearance of those blocks accordingly.																										\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function DisplayWhileLoopFormat(loopid, callback)																											//	\
{	$('#'+loopid).find('.whileloopblock').each( function(bi)																								//	\
	{	$(this).find('.whileloopstatements').each( function(si) 																							//	\
		{	$(this).removeClass('truestatements falsestatements');																							//	\
			if (window[loopid]['Loop_Values']['blockindex'+bi]['statement'+si]['truefalse']) 																//	\
			{ $(this).addClass('truestatements'); }else { $(this).addClass('falsestatements'); }															//	\
		});																																					//	\
	});																																						//	\
	if (typeof(callback)=="function") { callback();	} 																										//	\
}																																							//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------- Event Handlers for While Loops --------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', "#addwhileloop", function(event) {																					//	\
		var id = Get_ID("WhileLoop");																											//	\
		window[id]= new WhileLoop(id);																											//	\
		temp=$('#toclonewhileloop').clone();																									//	\
		temp.attr('type','7').attr('id','').children('.whileloop').attr('id', id);																//	\
		temp.find('#whileflag').attr("id", id+"whileflag");																						//	\
		temp.find('#whiledependent').attr("id", id+"whiledependent");																			//	\
		temp.children().attr("parent","none").attr("counter","a").find('.whilelooplabel').text("a");											//	\
		AddNewItem(id, temp, 'whileloop', '7');																									//	\
	}); 																																		//	\
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
	
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------- ADD WHILE LOOP STATEMENTS ---------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".whileloopaddstatements", function(event) {																		//	\
		var id=$(this).closest(".whileloop").attr("id");																						//	\
		var appendtoitem=$(this).closest('.whileloopblock');																					//	\
		var temp='<div class="andorstatements"><div class="andorvalue">||</div></div>';															//	\
		appendtoitem.append(temp);																												//	\
		temp=$('#toclonewhileloopstatements').clone();																							//	\
		temp.attr('id','');																														//	\
		appendtoitem.append(temp);																												//	\
		$(this).remove();																														//	\
		temp='<div class="whileloopaddstatements">+</div>';																						//	\
		appendtoitem.append(temp);																												//	\
		window[id].Format_haschanged=1;																											//	\
		$(this).closest('.main_item').addClass('update');																						//	\
		$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');								//	\
    });																																			//	\
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- ADD WHILE LOOP BLOCK -----------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".whileloopaddblock", function(event) 																				//	\
	{	var id=$(this).closest(".whileloop").attr("id");																						//	\
		var appendtoitem=$(this).closest('.whilelooptext');																						//	\
		var temp='<div class="andorblock"><div class="andorvalue">||</div></div>';																//	\
		appendtoitem.append(temp);																												//	\
		temp=$('#toclonewhileloopblock').clone();																								//	\
		temp.attr('id','');																														//	\
		appendtoitem.append(temp);																												//	\
		$(this).remove();																														//	\
		temp='<div class="whileloopaddblock">+</div>';																							//	\
		appendtoitem.append(temp);																												//	\
		window[id].Format_haschanged=1;																											//	\
		$(this).closest('.main_item').addClass('update');																						//	\
		$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');								//	\
    });																																			//	\
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- EDIT WHILE LOOP VALUES ---------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".whileloopvalue", function(event) 																					//	\
	{	var id=$(this).closest(".whileloop").attr("id");																						//	\
		var value=$(this).html();																												//	\
		$(this).closest('.whileloopvaluewrapper').html('<input type="text" value="'+value+'" class="whileloopinput">');							//	\
	});																																			//	\
	$(document).on('keyup', ".whileloopinput", function(e) 																						//	\
	{	if ((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))																			//	\
		{	var id=$(this).closest('.whileloop').attr('id');																					//	\
			$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');							//	\
			var text=$(this).val();																												//	\
			var type=$(this).closest('.whileloopvaluewrapper').attr('type');																	//	\
			if (type=="flag") 		{	$(this).closest('.whileloopstatements').attr('flag', text);	}											//	\
			if (type=="dependent")	{	$(this).closest('.whileloopstatements').attr('dependent', text);	}									//	\
			$(this).closest('.whileloopstatements').attr('id', 'changedstatements');															//	\
			$(this).closest('.whileloopvaluewrapper').html('<div class="whileloopvalue">'+text+'</div>'); 										//	\
			window[id].Format_haschanged=1;																										//	\
			window[id].LoopValues(id, 1);																										//	\
		}																																		//	\
	});																																			//	\ 
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------- EDIT WHILE LOOP EQUAL NOT EQUAL ------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".whileloopconditionvalue", function(event) 																		//	\
	{	var id=$(this).closest(".whileloop").attr("id");																						//	\
		temp=$('#tocloneequalblock').clone();																									//	\
		temp.attr("id",'');																														//	\
		$(this).append(temp);																													//	\
		$(this).find('.equalblock').show();																										//	\
		$(this).addClass('whileloopconditionvaluetemp').removeClass('whileloopconditionvalue');													//	\
	});																																			//	\
	$(document).on('click', ".whileloopconditionvaluetemp", function(event) 																	//	\
	{	if ($(this).find('.equalblock').length) { $(this).find('.equalblock').remove();		}													//	\
		$(this).addClass('whileloopconditionvalue').removeClass('whileloopconditionvaluetemp');													//	\		
	});																																			//	\
	$(document).on('click', ".equalitem", function(e) 																							//	\
	{	var id=$(this).closest(".whileloop").attr("id");																						//	\
		$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');								//	\
		var text=$(this).text();																												//	\
		$(this).closest('.whileloopstatements').attr('condition', text);																		//	\
		$(this).closest('.whileloopconditionvaluetemp').addClass('whileloopconditionvalue').removeClass('whileloopconditionvaluetemp');			//	\
		$(this).closest('.whileloopconditionvalue').html(text);																					//	\
		window[id].Format_haschanged=1;																											//	\
		window[id].LoopValues(id, 1);																											//	\
	});																																			//	\ 
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------ EDIT WHILE LOOP AND / OR -----------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".andorblock", function(event) 																						//	\
	{	var id=$(this).closest(".whileloop").attr("id");																						//	\
		temp=$('#tocloneandorblock').clone();																									//	\
		temp.attr("id",'');																														//	\
		$(this).append(temp);																													//	\
		$(this).find('.andorsegment').show();																									//	\
		$(this).addClass('andorblocktemp').removeClass('andorblock');																			//	\
	});																																			//	\
	$(document).on('click', ".andorblocktemp", function(event) 																					//	\
	{	if ($(this).find('.andorsegment').length) { $(this).find('.andorsegment').remove();		}												//	\
		$(this).addClass('andorblock').removeClass('andorblocktemp');																			//	\		
	});																																			//	\
	$(document).on('click', ".andoritem", function(e) 																							//	\
	{	var id=$(this).closest(".whileloop").attr("id");																						//	\
		$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');								//	\
		var text=$(this).text();																												//	\
		$(this).closest('.andorblocktemp').addClass('andorblock').removeClass('andorblocktemp');												//	\
		$(this).closest('.andorblock').html('<div class="andorvalue">'+text+'</div>');															//	\
		$(this).closest('.andorsegment').remove();																								//	\
		window[id].Format_haschanged=1;																											//	\
		window[id].LoopValues(id, 1);																											//	\
	});																																			//	\ 
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------- EDIT WHILE LOOP STATEMENTS AND / OR --------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".andorstatements", function(event) 																				//	\
	{	var id=$(this).closest(".whileloop").attr("id");																						//	\
		temp=$('#tocloneandorstatements').clone();																								//	\
		temp.attr("id",'');																														//	\
		$(this).addClass('andorstatementstemp').removeClass('andorstatements');																	//	\
		$(this).append(temp);																													//	\
		$(this).find('.andorst').show();																										//	\
	});																																			//	\
	$(document).on('click', ".andorstatementstemp", function(event) 																			//	\
	{	if ($(this).find('.andorstatements').length) { $(this).find('.andorst').remove();		}												//	\
		$(this).addClass('andorst').removeClass('andorsttemp');																					//	\		
	});																																			//	\
	$(document).on('click', ".andoritemst", function(e) 																						//	\
	{	var id=$(this).closest(".whileloop").attr("id");																						//	\
		$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');								//	\
		var text=$(this).text();																												//	\
		$(this).closest('.andorstatementstemp').addClass('andorstatements').removeClass('andorstatementstemp');									//	\
		$(this).closest('.andorstatements').html('<div class="andorvalue">'+text+'</div>');														//	\
		$(this).closest('.andorst').remove();																									//	\
		window[id].Format_haschanged=1;																											//	\
		window[id].LoopValues(id, 1);																											//	\
	});																																			//	\ 
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------- DELETE A BLOCK ------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".deleteblock", function(event) 																					//	\
	{	var id=$(this).closest(".whileloop, .ifelse").attr("id");																				//	\
		$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');								//	\
		var num=$(this).closest(".whilelooptext, .ifelsetext").find(".whileloopstatements, .ifelsestatements").length;							//	\
		if (num>1)																																//	\
		{	if ($(this).closest(".whileloopstatements, .ifelsestatements").next('.ifelseandorst').length)										//	\
			{	$(this).closest(".whileloopstatements, .ifelsestatements").next('.ifelseandorst').remove();										//	\
			}else {	$(this).closest(".whileloopstatements, .ifelsestatements").prev('.ifelseandorst').remove();	}								//	\
			if ($(this).closest(".whileloopstatements, .ifelsestatements").next('.andorstatements').length)										//	\
			{	$(this).closest(".whileloopstatements, .ifelsestatements").next('.andorstatements').remove();									//	\
			}else {	$(this).closest(".whileloopstatements, .ifelsestatements").prev('.andorstatements').remove();	}							//	\
			var testnum=$(this).closest(".whileloopblock, .ifelseblock").find(".whileloopstatements, .ifelsestatements").length;				//	\
			if (testnum==1) 																													//	\
			{	if ($(this).closest(".whileloopblock, .ifelseblock").next('.ifelseandorblock, .andorblock').length)								//	\
				{	$(this).closest(".whileloopblock, .ifelseblock").next('.ifelseandorblock, .andorblock').remove(); 							//	\
				}else { $(this).closest(".whileloopblock, .ifelseblock").prev('.ifelseandorblock, .andorblock').remove();}						//	\
				$(this).closest(".whileloopblock, .ifelseblock").remove();																		//	\
			}else { $(this).closest(".whileloopstatements, .ifelsestatements").remove();	}													//	\
			if ($(this).closest(".whileloop, .ifelse").hasClass("whileloop"))																	//	\
			{	window[id].Format_haschanged=1;																									//	\
				window[id].Loop_firstrun=1;																										//	\
				window[id].LoopValues(id, 1);																									//	\
				window[id].CheckWhileLoop();																									//	\
			}else if ($(this).closest(".whileloop, .ifelse").hasClass("ifelse"))																//	\
			{	window[id].Format_haschanged=1;																									//	\
				window[id].StatementValues(id);																									//	\
			}																																	//	\
		}																																		//	\
	});																																			//	\
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------- UPDATE WHILE LOOP -----------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".updatewhileloop", function(event) {																				//	\
		var id=$(this).closest('.icon_holder').siblings('.whileloop').attr("id");																//	\
		window[id].Loop_countervalue=0;																											//	\
		window[id].Loop_firstrun=1;																												//	\
		$('#'+id).addClass('solving');																											//	\
		createStructureObj(id, function () { callStructureSolver(id, $('#filenumber').attr('filenumber')); });									//	\
    });																																			//	\
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------- End of While Loops -----------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------ IF/Else Statements -------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------- Functions for IF/Else Statements ------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------*/
function IfElse (statementid) 																									//	\
{ 	this.Format_id=statementid;																									//	\--- The unique ID for this statement
	this.Format_haschanged=1;																									//	\--- Whether or not the item has changed
	this.Page_topparentid='none';																								// 	\--- The top level parent for this statement
	this.Page_parentid='none';																									// 	\--- The parent of the statements
	this.Page_position=0;																										// 	\--- The numerical position of the statement within the document
	this.Page_lastposition=0;																									// 	\--- The last position that the statement looks at to get a value
	this.Statement_Type="if";																									//	\--- Whether this is an if statement, else if, or else statement
	this.Statement_String='';																									//	\--- The "true/false" string to be evaluated
	this.Statement_TFString='';																									//	\--- The "true/false" string to be evaluated
	this.Statement_ValueString='';																								//	\--- The "true/false" string to be evaluated
	this.Statement_truefalse=false;																								// 	\--- 0 if the statement is false, 1 if true
	this.Statement_Execute='0';																									// 	\--- Says whether or not the statement will be executed
	this.Statement_Parent=statementid;																							//	\--- If this is an else if or else statement, this is changed to the if statement
	this.Statement_Order=new Array();																							//	\--- For the parent statement, an array holding the ids of the children statements
	this.Errors_errors=new Array();																								// 	\--- An array of errors for this statement
	this.Errors_flag=0;																											// 	\--- A 1 or 0 depending on if there is an error
	this.Statement_Values={};																									//	\
	this.Statement_Values['blockindex0']={};																					//	\
	this.Statement_Values['blockindex0']['statement0']={};																		//	\
	this.Statement_Values['blockindex0']['statement0']['conditiontext']="==";													//	\
	this.Statement_Values['blockindex0']['statement0']['dependenttext']="1";													//	\
	this.Statement_Values['blockindex0']['statement0']['dependentvalue']=1;														//	\
	this.Statement_Values['blockindex0']['statement0']['flagtext']="flag";														//	\
	this.Statement_Values['blockindex0']['statement0']['flagvalue']=1;															//	\
	this.Statement_Values['blockindex0']['statement0']['truefalse']=false;														//	\
	this.Loop_firstrun=1;																										//	\
}																																//	\
/*----------------------------------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------- CALCULATE THE VALUES FOR THE STATEMENTS ---------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function calculates the values of the flags and the dependents for this particular if / else statement. This includes all statements and blocks. 		\
	The current if / else statement structure is a series of blocks and each block is a series of one or more statements. A statement is one instance of 		\
	flag==dependent. A block is any number of series of statements. There are two main steps. The first grabs all of the statements from the text block 		\
	and places them into an object. The second step is to get the values of the flags and dependents by solving them as equations.								\
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
IfElse.prototype.StatementValues = function (statementid, callback) 																						//	\
{	console.log('The statement in the values is '+statementid);
	window[statementid].Errors_errors=new Array();	window[statementid].Errors_flag=0; this.Statement_Values={}; var myobject={};							//	\
	$('#'+statementid).find('.ifelsetext').first().find('.ifelseblock').each( function(blockindex)															//	\
	{	myobject['blockindex'+blockindex]={};																												//	\
		$(this).find('.ifelsestatements').each( function(statementindex)																					//	\
		{																																					//	\
			myobject['blockindex'+blockindex]['statement'+statementindex]={};																				//	\
			myobject['blockindex'+blockindex]['statement'+statementindex]['flagtext']=$(this).attr('flag');													//	\
			myobject['blockindex'+blockindex]['statement'+statementindex]['conditiontext']=$(this).attr('condition');										//	\
			myobject['blockindex'+blockindex]['statement'+statementindex]['dependenttext']=$(this).attr('dependent');										//	\
		});																																					//	\
		$(this).find('.ifelseandorst').each( function(andorindex) 																							//	\
		{ myobject['blockindex'+blockindex]['andor'+andorindex]=$(this).find('.andorvalue').text(); });														//	\
	});																																						//	\
	$('#'+statementid).find('.ifelseandorblock').each( function(andorindex) {	myobject['andor'+andorindex]=$(this).text(); });							//	\
/*	var statementblock={};																																	//	\
	for (var statNum in window[window[statementid]['Statement_Parent']]['Statement_Order'])																	//	\
	{	var statID=window[window[statementid]['Statement_Parent']]['Statement_Order'][statNum];																//	\
		statementblock[statNum]={};																															//	\
		statementblock[statNum]['id']=statID;																												//	\
		statementblock[statNum]['type']=window[statID]['Statement_Type'];																					//	\
		statementblock[statNum]['status']=window[statID]['Statement_truefalse'];																			//	\
	}																																						//	\	
*/
	var ifElseWorker = new Worker("http://www.cadwolf.com/js/EquationSolver.js");																			//	\
	createStructureObj(statementid, function () { 																											//	\
		ifElseWorker.postMessage({																															//	\
			"cadwolfType":"SolveIfElseParameters", 																											//	\
			"StatementID":statementid,																														//	\
			"myobject":myobject,																															//	\
			"ImportedFunctions":ImportedFunctions,																											//	\
			"Units_Object":Units_Object,																													//	\
			"ParseUnits":ParseUnits,																														//	\
			"FileInputs":FileInputs,																														//	\
//			"statBlock":statementblock,																														//	\
			"EqObj":window[statementid].EqObj,																												//	\
			"firstrun":"1",																																	//	\
			"location":DOM_Object[statementid]['location'],																									//	\
			"Statement_Parent":window[statementid]['Statement_Parent'],																						//	\
			"Statement_Order":window[statementid]['Statement_Order'],																						//	\
			"FileID":$('#filenumber').attr('filenumber')																									//	\
		});																																					//	\
	});																																						//	\
	ifElseWorker.onmessage = function(e) {	returnData=e.data; UpdateIfElseParams(e.data); 	ifElseWorker.terminate();  ifElseWorker=undefined;	}							//	\
};																																							//	\
function UpdateIfElseParams(statementObj)																													//	\
{	console.log('Updating if else parameters');
	var statementid=statementObj['ID'];																														//	\
	testObj=statementObj;																																	//	\
	domObj=statementObj.thisObject;																															//	\
	for (var stInd in domObj[statementid]['Statement_Order'])																								//	\
	{	var stID=domObj[statementid]['Statement_Order'][stInd];																								//	\
		window[stID]['Statement_Values']=domObj[stID]['Statement_Values'];																					//	\
		window[stID]['Statement_String']=domObj[stID]['Statement_String'];																					//	\
		window[stID]['Statement_TFString']=domObj[stID]['Statement_TFString'];																				//	\
		window[stID]['Statement_ValueString']=domObj[stID]['Statement_ValueString'];																		//	\
		window[stID]['Statement_truefalse']=domObj[stID]['Statement_truefalse'];																			//	\
		window[stID]['Statement_Execute']=domObj[stID]['Statement_Execute'];																				//	\
		DisplayIfElseFormat(stID); 																															//	\
		SetActive(stID);																																	//	\
	}																																						//	\
}																																							//	\
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------ SHOW THAT THE IF ELSE BLOCKS ARE TRUE OR FALSE -------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
/*	This function is called when the worker returns the true/false for each block after evaluating the blocks. The function simply looks at the true/false		\
	and sets the appearance of those blocks accordingly.																										\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function DisplayIfElseFormat(stid, callback)																												//	\
{	if (window[stid]['Statement_Parent']==='') { var parentid=stid; }else { var parentid=window[stid]['Statement_Parent']; }								//	\
	for (var a=0; a<window[parentid].Statement_Order.length; a++)																							//	\
	{	var sid=window[parentid].Statement_Order[a];																										//	\
		$('#'+sid).find('.ifelsetext').first().find('.ifelseblock').each( function(bi)																		//	\
		{	$(this).find('.ifelsestatements').each( function(si) 																							//	\
			{	$(this).removeClass('truestatements falsestatements');																						//	\
				if (window[sid].Statement_Values['blockindex'+bi]['statement'+si]['truefalse']) 															//	\
				{ $(this).addClass('truestatements'); }else { $(this).addClass('falsestatements'); }														//	\
			});																																				//	\
		});																																					//	\
	}																																						//	\
	if (typeof(callback)=="function") { callback();	} 																										//	\
}																																							//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//


/*---------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------ SET ACTIVE OR INACTIVE ---------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------*/
function SetActive(id, callback)																								//	\
{	if (window[id]!==undefined)																									//	\
	{	for (var i=0; i<window[id].Statement_Order.length; i++)																	//	\
		{	if (window[window[id].Statement_Order[i]].Statement_Execute==1) 													//	\
			{ 	DOM_Object[window[id].Statement_Order[i]]['active']=1; $('#'+i).removeClass('inactive'); 						//	\
				$('#'+i).find('.MathJax_Display').attr('style','color:#000');													//	\
				for (var x in DOM_Object[window[id].Statement_Order[i]]['children']) 											//	\
				{	DOM_Object[x]['active']=1; $('#'+x).removeClass('inactive');   												//	\
					$('#'+x).find('.MathJax_Display').attr('style','color:#000');												//	\
				}																												//	\
			}else { DOM_Object[window[id].Statement_Order[i]]['active']=0; $('#'+i).addClass('inactive'); 						//	\
				$('#'+window[id].Statement_Order[i]).find('.MathJax_Display').attr('style','color:#ccc');						//	\
				for (var x in DOM_Object[window[id].Statement_Order[i]]['children']) 											//	\
				{	DOM_Object[x]['active']=0; $('#'+x).addClass('inactive');   												//	\
					$('#'+x).find('.MathJax_Display').attr('style','color:#ccc');												//	\
				}																												//	\
			}																													//	\
	}	}																														//	\
	if (typeof(callback)=="function") { callback();	}  																			//	\
}																																//	\
/*---------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------ Event Handlers for IF/Else Statements ------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------ ADDING A IF / ELSE BLOCK -------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', "#addifelse", function(event) 																		//	\
	{	var id = Get_ID("IfElseStatement");																						//	\
		window[id]= new IfElse(id);																								//	\
		temp=$('#tocloneifelse').clone();																						//	\
		temp.attr('type','8').attr('id','').children('.ifelse').attr('id', id);													//	\
		temp.find('.ifelsedelete').closest('.ifelseaddline').remove();															//	\
		window[id].Statement_Order.push(id);																					//	\
		AddNewItem(id, temp, 'ifelse', '8');																					//	\
	}); 																														//	\
/*---------------------------------------------------------------------------------------------------------------------------------*/
	
/*---------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------- ADD AN ELSE IF STATEMENT ---------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', '.ifelseaddif', function(event) 																	//	\
	{	var id = Get_ID("IfElseStatement");																						//	\
		window[id]= new IfElse(id);																								//	\
		var siblingid=$(this).closest('.main_item').find('.ifelse:first').attr('id');											//	\
		window[siblingid].Statement_Order.push(id);																				//	\
		DOM_Object[id]={};	DOM_Object[id]['type']="ifelse";	DOM_Object[id]['name']=id;	DOM_Object[id]['children']={};		//	\
		DOM_Object[id]['descendents']={}; DOM_Object[id]['parent']=window[siblingid].Page_parentid; DOM_Object[id]['active']=1;	//	\
		DOM_Object[id]['topparent']=window[siblingid].Page_topparentid;	DOM_Object[id]['Dependents']={};						//	\
		temp=$('#tocloneifelseadd').clone();																					//	\
		temp.attr('id','').find('.ifelsecontent').addClass("itemneedsupdate");													//	\
		temp.find('.ifelse').attr("id", id);																					//	\
		temp.find('.ifelseif').html('Else If');																					//	\
		var idp=$(this).closest('.ifelse').attr('id');																			//	\
		$('#currentitem').attr('itemid',id).attr('type','ifelse');																//	\
		DOM_Object[id]['type']="elseif";																						//	\
		DOM_Object[id]['location']=parseInt(DOM_Object[idp]['lastpos'], 10)+1;													//	\
		DOM_Object[id]['lastpos']=parseInt(DOM_Object[idp]['lastpos'], 10)+1;													//	\
		if (DOM_Object[idp]['type']=="ifelse") { DOM_Object[id]['parent']=idp; 													//	\
		}else { DOM_Object[id]['parent']=DOM_Object[idp]['parent']; }															//	\
		if (window[idp].Page_topparentid=="none") { DOM_Object[id]['topparent']=window[idp].Page_parentid; 						//	\
		}else { DOM_Object[id]['topparent']=window[idp].Page_topparentid; 	}													//	\
		if (DOM_Object[idp]['type']=="ifelse") { var addid=idp;		}else {  var addid=$(this).closest('.subifelse'); }			//	\
		$('#'+addid).after(temp);																								//	\
		window[id].Statement_Type="elseif";																						//	\
		window[id].Page_position=parseInt(DOM_Object[idp]['lastpos'], 10)+1;													//	\
		window[id].Statement_Parent=DOM_Object[id]['parent'];																	//	\
		window[id].Page_parentid=DOM_Object[id]['parent'];																		//	\
		window[id].Page_topparentid=window[idp].Page_topparentid; 																//	\
		window[id].Page_parentid=idp;						 																	//	\
		$(this).closest('.main_item').find('.ifelsedelete').closest('.ifelseaddline').show();									//	\
		$(this).closest('.main_item').addClass('update');																		//	\
		SetLastPosition(idp);																									//	\
		if (DOM_Object[idp]['topparent']!="none") { SetLastPosition(DOM_Object[idp]['topparent']);	}							//	\
		$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');				//	\
		var textstring=id+'::'+parseInt(parseInt(DOM_Object[idp]['lastpos'], 10)+1, 10)+'::8::'+window[id].Page_parentid+'::'+window[id].Page_topparentid;	
		$.ajax ({	type:"POST",url:"/Documents/UpdateLocations", async:false,													//	\
			data: { fileid:$('#filenumber').attr('filenumber'),	text:textstring,	insert:1},									//	\
	        error: function () { alert('There was an error updating the page order.');}											//	\
		});																														//	\
	});																															//	\
/*---------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------- ADD AN ELSE STATEMENT ------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', '.ifelseaddelse', function(event) 																	//	\
	{	var parentid=$(this).closest('.main_item').find('.ifelse:first').attr('id');											//	\
		window[parentid].Format_haschanged=1;																					//	\
		var id = Get_ID("IfElseStatement");																						//	\
		window[id]= new IfElse(id);																								//	\
		var siblingid=$(this).closest('.main_item').find('.ifelse:first').attr('id');											//	\
		window[siblingid].Statement_Order.push(id);																				//	\
		DOM_Object[id]={};	DOM_Object[id]['type']="ifelse";	DOM_Object[id]['name']=id;	DOM_Object[id]['children']={};		//	\
		DOM_Object[id]['descendents']={}; DOM_Object[id]['parent']=window[siblingid].Page_parentid; DOM_Object[id]['active']=1;	//	\
		DOM_Object[id]['topparent']=window[siblingid].Page_topparentid;	DOM_Object[id]['Dependents']={};						//	\
		temp=$('#tocloneifelseadd').clone();		DOM_Object[id]['active']=1;													//	\
		temp.attr('id','').find('.ifelsecontent').addClass("itemneedsupdate");													//	\
		temp.find('.ifelse').attr("id", id);																					//	\
		temp.find('.ifelseif').html('Else');																					//	\
		temp.find('.ifelseblock').remove();																						//	\
		temp.find('.ifelseaddblock').remove();																					//	\
		temp.find('.ifelseaddif, .ifelseaddelse').html('');																		//	\
		var idp=$(this).closest('.ifelse').attr('id');																			//	\
		$('#currentitem').attr('itemid',id).attr('type','ifelse');																//	\
		DOM_Object[id]['type']="else";																							//	\
		DOM_Object[id]['location']=parseInt(DOM_Object[idp]['lastpos'], 10)+1;													//	\
		DOM_Object[id]['lastpos']=parseInt(DOM_Object[idp]['lastpos'], 10)+1;													//	\
		if (DOM_Object[idp]['type']=="ifelse") { DOM_Object[id]['parent']=idp; 													//	\
		}else { DOM_Object[id]['parent']=DOM_Object[idp]['parent']; }															//	\
		if (window[idp].Page_topparentid=="none") { DOM_Object[id]['topparent']=window[idp].Page_parentid; 						//	\
		}else { DOM_Object[id]['topparent']=window[idp].Page_topparentid; 	}													//	\
		if (DOM_Object[idp]['type']=="ifelse") { var addid=idp;		}else {  var addid=DOM_Object[idp]['parent']; }				//	\
		$('#'+addid).closest('.main_item').append(temp);																		//	\
		window[id].Statement_Type="else";																						//	\
		window[id].Page_position=parseInt(DOM_Object[idp]['lastpos'], 10)+1;													//	\
		window[id].Statement_Parent=DOM_Object[id]['parent'];																	//	\
		window[id].Page_parentid=DOM_Object[id]['parent'];																		//	\
		window[id].Page_topparentid=window[idp].Page_topparentid; 																//	\
		window[id].Page_parentid=idp;						 																	//	\
		$(this).closest('.main_item').find('.ifelseaddelse').closest('.ifelseaddline').hide();									//	\
		$(this).closest('.main_item').find('.ifelsedelete').closest('.ifelseaddline').show();									//	\
		$(this).closest('.main_item').addClass('update');																		//	\
		SetLastPosition(idp);																									//	\
		if (DOM_Object[idp]['topparent']!="none") { SetLastPosition(DOM_Object[idp]['topparent']);	}							//	\
		$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');				//	\
		var textstring=id+'::'+parseInt(parseInt(DOM_Object[idp]['lastpos'], 10)+1)+'::8::'+window[id].Page_parentid+'::'+window[id].Page_topparentid;	
		$.ajax ({	type:"POST",url:"/Documents/UpdateLocations", async:false,													//	\
			data: { fileid:$('#filenumber').attr('filenumber'),	text:textstring,	insert:1},									//	\
	        error: function () { alert('There was an error updating the page order.');}											//	\
		});																														//	\
	});																															//	\
/*---------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------ DELETE AN IF/ELSE BLOCK --------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', '.ifelsedelete', function(event) 																	//	\
	{	var id=$(this).closest('.ifelse').attr('id');																			//	\
		var temp=$('#'+id);																										//	\
		var thisind=$('#'+id).closest('.main_item').find('.ifelse').index(temp);												//	\	
		var parentid=window[id].Statement_Parent;																				//	\
		if (window[id].Statement_Type=="else") 																					//	\
			{ $(this).closest('.main_item').find('.ifelseaddline').show();  }													//	\
		window[parentid].Statement_Order.splice(thisind,1);																		//	\
		$(this).closest('.ifelse').siblings('.icon_holder').remove();															//	\
		$(this).closest('.ifelse').remove();																					//	\
		delete window[id];																										//	\
		if (window[parentid].Statement_Order.length==1) 																		//	\
		{ $('#'+parentid).find('.ifelsedelete').closest('.ifelseaddline').hide(); }												//	\
		$(this).closest('.main_item').addClass('update');																		//	\
		window[id].StatementValues(id);																							//	\
		$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');				//	\
	});																															//	\
/*---------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------- EDIT IF / ELSE VALUES ---------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".ifelsevalue", function(event) 																	//	\
	{	var id=$(this).closest(".ifelse").attr("id");																			//	\
		var value=$(this).html();																								//	\
		$(this).closest('.ifelsevaluewrapper').html('<input type="text" value="'+value+'" class="ifelseinput">');				//	\
	});																															//	\
	$(document).on('keyup', ".ifelseinput", function(e) 																		//	\
	{	if ((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))															//	\
		{	var id=$(this).closest('.ifelse, .subifelse').attr('id');															//	\
			var text=$(this).val();																								//	\
			var type=$(this).closest('.ifelsevaluewrapper').attr('type');														//	\
			if (type=="flag") 		{	$(this).closest('.ifelsestatements').attr('flag', text);	}							//	\
			if (type=="dependent")	{	$(this).closest('.ifelsestatements').attr('dependent', text);	}						//	\
			$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');			//	\
			$(this).closest('.ifelsevaluewrapper').html('<div class="ifelsevalue">'+text+'</div>'); 							//	\
			if (window[id].Page_parentid=="none") { var checkid=id;	}else { var checkid=window[id].Page_parentid; }				//	\
			window[checkid].Format_haschanged=1;																				//	\
			console.log('The id is '+id);
			window[id].StatementValues(id);																						//	\
		}																														//	\
	});																															//	\ 
/*----------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------- EDIT  EQUAL NOT EQUAL ------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".ifelseconditionvalue", function(event) 															//	\
	{	var id=$(this).closest(".ifelse").attr("id");																			//	\
		temp=$('#tocloneequalblock').clone();																					//	\
		temp.attr("id",'');																										//	\
		$(this).append(temp);																									//	\
		$(this).find('.equalblock').show();																						//	\
		$(this).find('.equalblock').find('.equalitem').addClass('ifelseequalitem').removeClass('equalitem');					//	\
		$(this).addClass('ifelseconditionvaluetemp').removeClass('ifelseconditionvalue');										//	\
	});																															//	\
	$(document).on('click', ".ifelseconditionvaluetemp", function(event) 														//	\
	{	if ($(this).find('.equalblock').length) { $(this).find('.equalblock').remove();		}									//	\
		$(this).addClass('ifelseconditionvalue').removeClass('ifelseconditionvaluetemp');										//	\		
	});																															//	\
	$(document).on('click', ".ifelseequalitem", function(e) 																	//	\
	{	var id=$(this).closest('.ifelse').attr("id");																			//	\
		var text=$(this).text();																								//	\
		$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');				//	\
		$(this).closest('.ifelsestatements').attr('condition', text);															//	\
		$(this).closest('.ifelseconditionvaluetemp').addClass('ifelseconditionvalue').removeClass('ifelseconditionvaluetemp');	//	\
		$(this).closest('.ifelseconditionvalue').html(text);																	//	\
		window[id].Format_haschanged=1;																							//	\
		window[id].StatementValues(id);																							//	\
		if (window[id].Page_parentid=="none") { var checkid=id;	}else { var checkid=window[id].Page_parentid; }					//	\
	});																															//	\ 
/*---------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------- ADD AN IF / ELSE STATEMENT -------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', '.ifelseaddstatements', function(event) 															//	\
	{	var appendtoitem=$(this).closest('.ifelseblock');																		//	\
		var temp='<div class="ifelseandorst"><div class="andorvalue">||</div></div>';											//	\
		appendtoitem.append(temp);																								//	\
		temp=$('#tocloneifelsestatements').clone();																				//	\
		temp.attr('id','');																										//	\
		appendtoitem.append(temp);																								//	\
		$(this).remove();																										//	\
		temp='<div class="ifelseaddstatements">+</div>';																		//	\
		appendtoitem.append(temp);																								//	\
		$(this).closest('.main_item').addClass('update');																		//	\
 		$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');				//	\
   });																															//	\
/*---------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------- ADD AN IF / ELSE BLOCK --------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', '.ifelseaddblock', function(event)	 																//	\
	{	var appendtoitem=$(this).closest('.ifelsetext');																		//	\
		var temp='<div class="ifelseandorblock"><div class="andorvalue">||</div></div>';										//	\
		appendtoitem.append(temp);																								//	\
		temp=$('#tocloneifelseblock').clone();																					//	\
		temp.attr('id','');																										//	\
		appendtoitem.append(temp);																								//	\
		$(this).remove();																										//	\
		temp='<div class="ifelseaddblock">+</div>';																				//	\
		appendtoitem.append(temp);																								//	\
		$(this).closest('.main_item').addClass('update');																		//	\
		$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');				//	\
    });																															//	\
/*---------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------- EDIT IF ELSE BLOCK AND / OR -------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".ifelseandorblock", function(event) 																//	\
	{	var id=$(this).closest(".ifelse").attr("id");																			//	\
		temp=$('#tocloneandorblock').clone();																					//	\
		temp.attr("id",'');																										//	\
		$(this).append(temp);																									//	\
		$(this).find('.andoritem').addClass('ifelseandoritemblock').removeClass('andoritem');									//	\
		$(this).find('.andorsegment').show();																					//	\
		$(this).addClass('ifelseandorblocktemp').removeClass('ifelseandorblock');												//	\
	});																															//	\
	$(document).on('click', ".ifelseandorblocktemp", function(event) 															//	\
	{	if ($(this).find('.andorsegment').length) { $(this).find('.andorsegment').remove();		}								//	\
		$(this).addClass('ifelseandorblock').removeClass('ifelseandorblocktemp');												//	\		
	});																															//	\
	$(document).on('click', ".ifelseandoritemblock", function(e) 																//	\
	{	var id=$(this).closest(".ifelse").attr("id");																			//	\
		var text=$(this).text();																								//	\
		$(this).closest('.ifelseandorblocktemp').addClass('ifelseandorblock').removeClass('ifelseandorblocktemp');				//	\
		$(this).closest('.ifelseandorblock').html(text);																		//	\
		$(this).closest('.andorsegment').remove();																				//	\
		window[id].StatementValues(id);																							//	\
		$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');				//	\
	});																															//	\ 
/*---------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------- EDIT IF / ELSE STATEMENTS AND / OR -----------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', ".ifelseandorst", function(event) 																	//	\
	{	var id=$(this).closest(".ifelse").attr("id");																			//	\
		temp=$('#tocloneandorstatements').clone();																				//	\
		temp.attr("id",'');																										//	\
		$(this).addClass('ifelseandorsttemp').removeClass('ifelseandorst');														//	\
		$(this).append(temp);																									//	\
		$(this).find('.andorst').find('.andoritemst').addClass('ifelseandoritemst').removeClass('andoritemst');					//	\
		$(this).find('.andorst').show();																						//	\
	});																															//	\
	$(document).on('click', ".ifelseandorsttemp", function(event) 																//	\
	{	if ($(this).find('.ifelseandorst').length) { $(this).find('.andorst').remove();		}									//	\
		$(this).addClass('ifelseandorst').removeClass('ifelseandorsttemp');														//	\		
	});																															//	\
	$(document).on('click', ".ifelseandoritemst", function(e) 																	//	\
	{	var id=$(this).closest(".ifelse").attr("id");																			//	\
		var text=$(this).text();																								//	\
		$(this).closest('.ifelseandorsttemp').addClass('ifelseandorst').removeClass('ifelseandorsttemp');						//	\
		$(this).closest('.ifelseandorst').html('<div class="andorvalue">'+text+'</div>');										//	\
		$(this).closest('.andorst').remove();																					//	\
		window[id].StatementValues(id);																							//	\
		$(this).closest('.top_item').find('.itemcurrent').addClass('itemneedsupdate').removeClass('itemcurrent');				//	\
	});																															//	\ 
/*---------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', '.updateifelse', function(e)																		//	\
	{	var id=$(this).closest('.main_item').children('.ifelse').attr("id");													//	\ 
//		var parentid=window[id].Statement_Parent;																				//	\
		createStructureObj(id, function () { callStructureSolver(id, $('#filenumber').attr('filenumber')); });					//	\
    });																															//	\
/*---------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------- End of IF/Else Statements ----------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------- Plots and Charts ----------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function Plot(id) 																																					//	\
{ 	this.Format_id=id;																																				//	\
	this.Format_haschanged=1;																																		//	\
	this.Page_parentid="none";																																		//	\
	this.Page_topparentid="none";																																	//	\
																																									//	\
	this.Chart_type="bar";																																			//	\
	this.Chart_dataobj={};																																			//	\
	this.Chart_yaxesobj={};																																			//	\
	this.Chart_xaxesobj={};																																			//	\
	this.Chart_width="825px";																																		//	\
	this.Chart_height="500px";																																		//	\
	this.Chart_marginright=10;																																		//	\
	this.Chart_marginleft=75;																																		//	\
	this.Chart_marginbottom=65;																																		//	\
	this.Chart_margintop=60;																																		//	\
	this.Chart_Name='Chart_'+id;																																	//	\
	this.Chart_Labeltext='';																																		//	\
	this.Chart_Labels=new Array();																																	//	\
																																									//	\
	this.Title_onoff="1";																																			//	\
	this.Title_text='Chart Title';																																	//	\
	this.Title_xoffset=0;																																			//	\
	this.Title_yoffset=20;																																			//	\
																																									//	\
	this.Subtitle_onoff="0";																																		//	\
	this.Subtitle_text='Chart Subtitle';																															//	\
	this.Subtitle_xoffset=0;																																		//	\
	this.Subtitle_yoffset=30;																																		//	\
																																									//	\
	this.Legend_onoff=true;																																			//	\
	this.Legend_layout="horizontal";																																//	\
	this.Legend_floating=1;																																			//	\
	this.Legend_xoffset=0;																																			//	\
	this.Legend_yoffset=0;																																			//	\
	this.Legend_width=0;																																			//	\
	this.Legend_align="center";																																		//	\
	this.Legend_verticalalign="bottom";																																//	\ 
	this.Legend_rtl="false";																																		//	\
	this.Legend_marginRight=0;																																		//	\
	this.Legend_marginLeft=0;																																		//	\
	this.Legend_marginBottom=0;																																		//	\
	this.Legend_marginTop=0;																																		//	\
																																									//	\
	this.Chart_bandsobj={};																																			//	\
	this.Chart_linesobj={};																																			//	\
	this.Chart_textobj={};																																			//	\
}																																									//	\
																																									//	\
function PlotData (id, plotid)																																		//	\
{	this.Format_id=id;																																				//	\
	this.Format_plotid=plotid;																																		//	\
	this.Format_type="line";																																		//	\
	this.color='';																																					//	\
	this.symbol='';																																					//	\
	this.fillcolor='';																																				//	\
	this.outlinecolor='';																																			//	\
	this.markersize='3';																																			//	\
	this.xaxis=0;																																					//	\
	this.series=0;																																					//	\
	this.yaxis=0;																																					//	\
	this.xdata_plottext='';																																			//	\
	this.xdata_name='';																																				//	\
	this.xdata_id='';																																				//	\
	this.xdata_rawtable='';																																			//	\
	this.ydata_plottext='';																																			//	\
	this.ydata_name='';																																				//	\
	this.ydata_id='';																																				//	\
	this.ydata_rawtable='';																																			//	\
	this.zdata_name='';																																				//	\
	this.zdata_id='';																																				//	\
	this.zdata_rawtable='';																																			//	\
	this.dataname='';																																				//	\
	this.data_type=1;																																				//	\
	this.pielabels=new Array();																																		//	\
	this.piedata=new Array();																																		//	\
	this.data_plottext='';																																			//	\
	this.data_error=0;																																				//	\
	this.data_datalabels=false;																																		//	\
	this.data_labelSize=12;																																			//	\
	this.data_labelColor='#000000';																																	//	\
	this.data_labelBorderWidth=0;																																	//	\
	this.data_labelBorderColor="";																																	//	\
	this.data_labelBorderRadius=0;																																	//	\
	this.data_labelBorderPadding=0;																																	//	\
	this.data_labelBackgroundColor='';																																//	\
	this.data_labelRotation=0;																																		//	\
	this.data_labelX=0;																																				//	\
	this.data_labelY=0;																																				//	\
	this.data_labelDistance=30;																																		//	\
	this.data_labelFormat='Normal';																																	//	\
	this.data_pointmarkers=true;																																	//	\
	this.showInLegend=true;																																			//	\
	this.lineWidth='1';																																				//	\
	ID_PlotData[id]=plotid;																																			//	\
	this.Chart_startangle='0';																																		//	\
	this.Chart_stopangle='360';																																		//	\
	this.Chart_innersize='0';																																		//	\
	this.Chart_size='100';																																			//	\
	this.Chart_location='50%, 50%';																																	//	\
	this.Chart_translations={};																																		//	\
	this.Chart_connectorWidth=1;																																	//	\
	this.Chart_monoColor='';																																		//	\
	this.PointData={};																																				//	\
}																																									//	\
																																									//	\
function PlotAxis (id, plotid)																																		//	\
{																																									//	\
	this.Format_id=id;																																				// 	\
	this.Format_plotid=plotid;																																		// 	\
	this.Axis_name="";																																				// 	\
	this.Axis_num=0;																																				// 	\
	this.Axis_label="";																																				// 	\
	this.Axis_lineWidth=0;																																			// 	\
	this.Axis_linecolor="";																																			// 	\
	this.Axis_opposite="false";																																		// 	\
	this.Axis_type="linear";																																		// 	\
	this.Axis_xory="";																																				// 	\
	this.Axis_offset=0;																																				// 	\
	this.Axis_min="null";																																			// 	\
	this.Axis_max="null";																																			// 	\
	this.Axis_tickinterval=0;																																		// 	\
	this.Axis_gridlinesonoff="true";																																// 	\
	this.Axis_gridcolor="#C0C0C0";																																	//	\
	this.Axis_minortickinterval=0;																																	// 	\
	this.Axis_minorgridlinesonoff="false";																															// 	\
	this.Axis_minorgridcolor='#C0C0C0';																																// 	\
	this.Axis_gridlinewidth=1;																																		// 	\
	this.Axis_minorgridlinewidth=0;																																	// 	\
	this.Axis_reversed="false";																																		// 	\
}																																									//	\
																																									//	\
function PlotBand (id, plotid, input)																																//	\
{																																									//	\
	this.Format_id=id;																																				// 	\
	this.Format_plotid=plotid;																																		// 	\
	if (input!==0) { this.Axis_id=Object.keys(window[plotid].Chart_xaxesobj)[0];	}																				// 	\
	this.Band_start=0;																																				//	\
	this.Band_end=1;																																				//	\
	this.color="#FCFFC5";																																			// 	\
}																																									// 	\
																																									// 	\
function PlotLine (id, plotid)																																		// 	\
{																																									// 	\
	this.Format_id=id;																																				// 	\
	this.Format_plotid=plotid;																																		// 	\
	this.Axis_id=Object.keys(window[plotid].Chart_xaxesobj)[0];																										// 	\
	this.Line_value=1;																																				//	\
	this.Line_width=1;																																				// 	\
	this.color="#FCFFC5";																																			// 	\
}																																									//	\
function PlotText (id, plotid)		        																														//	\
{																																									//	\
	this.Format_id=id;																																				// 	\
	this.Format_plotid=plotid;																																		// 	\
	this.textRawText='';																																			//	\
	this.textFormattedText='';																																		//	\
	this.textXLoc=10;																																				//	\
	this.textYLoc=10;																																				//	\
	this.textRotAng=0;																																				//	\
	this.textSize='14px';																																			//	\
	this.textColor="000000";																																		// 	\
	this.textElement={};			        																														// 	\
}																																									// 	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10, 10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10, 10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10, 10).toString(16)).slice(-2) : '';
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------- CREATE A PLOT - PAGE LOAD -----------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function CreatePlot(PlotID, callback)																																//	\ 
{	var datafinal=new Array();																																		//	\
	$('#'+PlotID).css('height',window[PlotID].Chart_height).css('width',window[PlotID].Chart_width);																//	\
	thischart={}; thischart.chart={}; thischart.series=new Array();	thischart.title={};	thischart.subtitle={};	thischart.xAxis=new Array();						//	\
	thischart.yAxis=new Array();	thischart.legend={};	thischart.yAxis[0]={};	thischart.xAxis[0]={};		thischart.plotOptions={};							//	\
	thischart.chart.renderTo=PlotID;																																//	\
	if (thischart.chart.type!="combo") { thischart.chart.type=window[PlotID].Chart_type;	}																		//	\
	thischart.chart.margin='['+window[PlotID].Chart_margintop+', '+window[PlotID].Chart_marginright+', '+window[PlotID].Chart_marginbottom+', '+window[PlotID].Chart_marginleft+']';		//	\
	thischart.chart.backgroundColor='transparent';																													//	\
	thischart.chart.height=window[PlotID].Chart_height.replace(/[a-z]+$/,'');																						//	\
	thischart.chart.width=window[PlotID].Chart_width.replace(/[a-z]+$/,'');																							//	\
	if (window[PlotID].Title_onoff===true) 																															//	\
	{	thischart.title.margin=15; thischart.title.text=window[PlotID].Title_text; 	thischart.title.floating=true;													//	\
	}else { thischart.title.margin=0; thischart.title.text=''; }																									//	\
	if (window[PlotID].Subtitle_onoff===true) { thischart.subtitle.text=window[PlotID].Subtitle_text; }else { thischart.subtitle.text=''; }							//	\
	thischart.title.x=window[PlotID].Title_xoffset;			thischart.title.y=window[PlotID].Title_yoffset;															//	\
	thischart.subtitle.x=window[PlotID].Subtitle_xoffset;	thischart.subtitle.y=window[PlotID].Subtitle_yoffset;													//	\
	thischart.chart.marginBottom=window[PlotID].Chart_marginbottom;		thischart.chart.marginTop=window[PlotID].Chart_margintop;									//	\
	thischart.chart.marginLeft=window[PlotID].Chart_marginleft;			thischart.chart.marginRight=window[PlotID].Chart_marginright;								//	\
	thischart.tooltip={};	thischart.tooltip.shared=true;	thischart.tooltip.crosshairs=true;																		//	\
	thischart.tooltip.pointFormat='    {series.name}: <b>{point.y}</b>';																							//	\
	if (thischart.chart.type=="heatmap")																															//	\
	{	thischart.colorAxis={};																																		//	\
		if (window[PlotID].colorAxis===undefined) { window[PlotID].colorAxis={}; }																					//	\
		if (window[PlotID].colorAxis.min!==undefined) { thischart.colorAxis.min=window[PlotID].colorAxis.min; }														//	\
		if (window[PlotID].colorAxis.max!==undefined) { thischart.colorAxis.max=window[PlotID].colorAxis.max; }														//	\
		if (window[PlotID].colorAxis.type===undefined) { thischart.colorAxis.type="linear"; }else { thischart.colorAxis.type=window[PlotID].colorAxis.type; }		//	\
		if (window[PlotID].colorAxis.stops!==undefined) 																											//	\
		{	thischart.colorAxis.stops=new Array();																													//	\
			for (var a=0; a<window[PlotID].colorAxis.stops.length; a++)																								//	\
			{	thischart.colorAxis.stops[a]=new Array();																											//	\
				thischart.colorAxis.stops[a]['0']=window[PlotID].colorAxis.stops[a]['0'];																			//	\
				thischart.colorAxis.stops[a]['1']=window[PlotID].colorAxis.stops[a]['1']; }																			//	\
		}else 																																						//	\
		{	thischart.colorAxis.stops=new Array();																													//	\
			thischart.colorAxis.stops['0']=new Array();		thischart.colorAxis.stops['1']=new Array();		thischart.colorAxis.stops['2']=new Array();				//	\
			thischart.colorAxis.stops['0']['0']=0;		thischart.colorAxis.stops['0']['1']='#3060cf'; 																//	\
			thischart.colorAxis.stops['1']['0']=0.5;	thischart.colorAxis.stops['1']['1']='#fffbbc'; 																//	\
			thischart.colorAxis.stops['2']['0']=1;		thischart.colorAxis.stops['2']['1']='#c4463a'; 																//	\
		}																																							//	\
	}																																								//	\
	if (thischart.chart.type=="heatmap")																															//	\
	{	thischart.legend.align='center';																															//	\
		thischart.legend.layout='horizontal';																														//	\
		thischart.legend.verticalAlign='bottom';																													//	\
		thischart.legend.y=25;																																		//	\
		thischart.legend.margin=0;																																	//	\
	}else{																																							//	\
		thischart.legend.align=window[PlotID]['Legend_align'];																										//	\
		if (window[PlotID].Legend_floating==1) { thischart.legend.floating=true; }else { thischart.legend.floating=false; }											//	\
		thischart.legend.layout=window[PlotID]['Legend_layout'];																									//	\
		if (window[PlotID]['Legend_onoff']===false) { thischart.legend.enabled=false;	}else { thischart.legend.enabled=true; }									//	\
		thischart.legend.rtl=window[PlotID]['Legend_rtl'];																											//	\
		thischart.legend.verticalAlign=window[PlotID]['Legend_verticalalign'];																						//	\
		thischart.legend.x=ToNum(window[PlotID]['Legend_xoffset']);																									//	\
		thischart.legend.y=ToNum(window[PlotID]['Legend_yoffset']);																									//	\
		thischart.legend.itemMarginTop=15;																															//	\
	}																																								//	\
   	for (var AxisID in window[PlotID].Chart_yaxesobj)																												//	\
	{	var axisnum=window[PlotID].Chart_yaxesobj[AxisID]['Axis_num'];																								//	\
		thischart.yAxis[axisnum]={};																																//	\
		thischart.yAxis[axisnum].id=AxisID;																															//	\
		thischart.yAxis[axisnum].title={};																															//	\
		thischart.yAxis[axisnum].title.text=window[PlotID]['Chart_yaxesobj'][AxisID].Axis_label;																	//	\
		thischart.yAxis[axisnum].type=window[PlotID]['Chart_yaxesobj'][AxisID].Axis_type;																			//	\
		var opposite=window[PlotID]['Chart_yaxesobj'][AxisID].Axis_opposite; var reversed=window[PlotID]['Chart_yaxesobj'][AxisID].Axis_reversed;					//	\
		if ((opposite=="true")||(opposite===true)){ thischart.yAxis[axisnum].opposite=true;}else{thischart.yAxis[axisnum].opposite=false;}							//	\
		if ((reversed=="true")||(reversed===true)){ thischart.yAxis[axisnum].reversed=true;}else{thischart.yAxis[axisnum].reversed=false;}							//	\
		if (window[PlotID]['Chart_yaxesobj'][AxisID].Axis_min!="null") { thischart.yAxis[axisnum].min=window[PlotID]['Chart_yaxesobj'][AxisID].Axis_min;  }			//	\
		if (window[PlotID]['Chart_yaxesobj'][AxisID].Axis_max!="null") { thischart.yAxis[axisnum].max=window[PlotID]['Chart_yaxesobj'][AxisID].Axis_max;  }			//	\
		if (window[PlotID]['Chart_yaxesobj'][AxisID].Axis_gridlinesonoff=="true") 																					//	\
		{	thischart.yAxis[axisnum].gridLineWidth=window[PlotID]['Chart_yaxesobj'][AxisID].Axis_gridlinewidth;														//	\
			thischart.yAxis[axisnum].gridLineColor=window[PlotID]['Chart_yaxesobj'][AxisID].Axis_gridcolor;															//	\
			if ((window[PlotID]['Chart_yaxesobj'][AxisID].Axis_tickinterval!==0)&&(window[PlotID]['Chart_yaxesobj'][AxisID].Axis_tickinterval!="null"))				//	\
			{	thischart.yAxis[axisnum].tickInterval=parseFloat(window[PlotID]['Chart_yaxesobj'][AxisID].Axis_tickinterval); } 									//	\
		}																																							//	\
		if (window[PlotID]['Chart_yaxesobj'][AxisID].Axis_minorgridlinesonoff=="true") 																				//	\
		{	thischart.yAxis[axisnum].minorGridLineWidth=window[PlotID]['Chart_yaxesobj'][AxisID].Axis_minorgridlinewidth;											//	\
			thischart.yAxis[axisnum].minorGridLineColor=window[PlotID]['Chart_yaxesobj'][AxisID].Axis_minorgridcolor;												//	\
			if (window[PlotID]['Chart_yaxesobj'][AxisID].Axis_minortickinterval!==0) 																				//	\
			{	thischart.yAxis[axisnum].minorTickInterval=parseFloat(window[PlotID]['Chart_yaxesobj'][AxisID].Axis_minortickinterval); } 							//	\
		}																																							//	\
		thischart.yAxis[axisnum].plotBands=new Array();																												//	\
		for (var BandID in window[PlotID]['Chart_bandsobj'])																										//	\
		{	if (window[PlotID]['Chart_bandsobj'][BandID]['Axis_id']==AxisID)																						//	\
			{	var temp={};																																		//	\
				temp.color=window[PlotID]['Chart_bandsobj'][BandID]['color'];																						//	\
				temp.from=window[PlotID]['Chart_bandsobj'][BandID]['Band_start'];																					//	\
				temp.to=window[PlotID]['Chart_bandsobj'][BandID]['Band_end'];																						//	\
				thischart.yAxis[axisnum].plotBands.push(temp);																										//	\
			}																																						//	\
		}																																							//	\
		thischart.yAxis[axisnum].plotLines=new Array();																												//	\
		for (var LineID in window[PlotID]['Chart_linesobj'])																										//	\
		{	if (window[PlotID]['Chart_linesobj'][LineID]['Axis_id']==AxisID)																						//	\
			{	var temp={};																																		//	\
				temp.color=window[PlotID]['Chart_linesobj'][LineID]['color'];																						//	\
				temp.value=window[PlotID]['Chart_linesobj'][LineID]['Line_value'];																					//	\
				temp.width=window[PlotID]['Chart_linesobj'][LineID]['Line_width'];																					//	\
				thischart.yAxis[axisnum].plotLines.push(temp);																										//	\
			}																																						//	\
		}																																							//	\
	}																																								//	\
	for (var AxisID in window[PlotID].Chart_xaxesobj)																												//	\
	{	var axisnum=window[PlotID].Chart_xaxesobj[AxisID]['Axis_num'];																								//	\
		thischart.xAxis[axisnum]={};																																//	\
		thischart.xAxis[axisnum].id=AxisID;																															//	\
		thischart.xAxis[axisnum].title={};																															//	\
		if ((window[PlotID].Chart_type=="column")||(window[PlotID].Chart_type=="bar")||(window[PlotID].Chart_type=="heatmap")) { var temptext=window[PlotID].Chart_Labeltext.split(',');					//	\
		thischart.xAxis[axisnum].categories=temptext;	}																											//	\
		thischart.xAxis[axisnum].title.text=window[PlotID]['Chart_xaxesobj'][AxisID].Axis_label;																	//	\
		thischart.xAxis[axisnum].type=window[PlotID]['Chart_xaxesobj'][AxisID].Axis_type;																			//	\
		if (window[PlotID]['Chart_xaxesobj'][AxisID].Axis_opposite=="true"){ thischart.xAxis[axisnum].opposite=true;}else{thischart.xAxis[axisnum].opposite=false;}	//	\
		if (window[PlotID]['Chart_xaxesobj'][AxisID].Axis_reversed=="true"){ thischart.xAxis[axisnum].reversed=true;}else{thischart.xAxis[axisnum].reversed=false;}	//	\
		if (window[PlotID]['Chart_xaxesobj'][AxisID].Axis_min!="null") { thischart.xAxis[axisnum].min=window[PlotID]['Chart_xaxesobj'][AxisID].Axis_min;  }			//	\
		if (window[PlotID]['Chart_xaxesobj'][AxisID].Axis_max!="null") { thischart.xAxis[axisnum].max=window[PlotID]['Chart_xaxesobj'][AxisID].Axis_max;  }			//	\
		if (window[PlotID]['Chart_xaxesobj'][AxisID].Axis_gridlinesonoff=="true") 																					//	\
		{	thischart.xAxis[axisnum].gridLineWidth=parseInt(window[PlotID]['Chart_xaxesobj'][AxisID].Axis_gridlinewidth, 10);										//	\
			thischart.xAxis[axisnum].gridLineColor=window[PlotID]['Chart_xaxesobj'][AxisID].Axis_gridcolor;															//	\
			if ((window[PlotID]['Chart_xaxesobj'][AxisID].Axis_tickinterval!==0)&&(window[PlotID]['Chart_xaxesobj'][AxisID].Axis_tickinterval!="null"))				//	\
			{	thischart.xAxis[axisnum].tickInterval=window[PlotID]['Chart_xaxesobj'][AxisID].Axis_tickinterval; } 												//	\
		}																																							//	\
		if (window[PlotID]['Chart_xaxesobj'][AxisID].Axis_minorgridlinesonoff=="true") 																				//	\
		{	thischart.xAxis[axisnum].minorGridLineWidth=window[PlotID]['Chart_xaxesobj'][AxisID].Axis_minorgridlinewidth;											//	\
			thischart.xAxis[axisnum].minorGridLineColor=window[PlotID]['Chart_xaxesobj'][AxisID].Axis_minorgridcolor;												//	\
			if (window[PlotID]['Chart_xaxesobj'][AxisID].Axis_minortickinterval!==0) 																				//	\
			{	thischart.xAxis[axisnum].minorTickInterval=window[PlotID]['Chart_xaxesobj'][AxisID].Axis_minortickinterval; } 										//	\
		}																																							//	\
		thischart.xAxis[axisnum].plotBands=new Array();																												//	\
		for (var BandID in window[PlotID]['Chart_bandsobj'])																										//	\
		{	if (window[PlotID]['Chart_bandsobj'][BandID]['Axis_id']==AxisID)																						//	\
			{	var temp={};																																		//	\
				temp.color=window[PlotID]['Chart_bandsobj'][BandID]['color'];																						//	\
				temp.from=window[PlotID]['Chart_bandsobj'][BandID]['Band_start'];																					//	\
				temp.to=window[PlotID]['Chart_bandsobj'][BandID]['Band_end'];																						//	\
				thischart.xAxis[axisnum].plotBands.push(temp);																										//	\
			}																																						//	\
		}																																							//	\
		thischart.xAxis[axisnum].plotLines=new Array();																												//	\
		for (var LineID in window[PlotID]['Chart_linesobj'])																										//	\
		{	if (window[PlotID]['Chart_linesobj'][LineID]['Axis_id']==AxisID)																						//	\
			{	var temp={};																																		//	\
				temp.color=window[PlotID]['Chart_linesobj'][LineID]['color'];																						//	\
				temp.value=window[PlotID]['Chart_linesobj'][LineID]['Line_value'];																					//	\
				temp.width=window[PlotID]['Chart_linesobj'][LineID]['Line_width'];																					//	\
				thischart.xAxis[axisnum].plotLines.push(temp);																										//	\
			}																																						//	\
		}																																							//	\
	}																																								//	\
	for (var dataid in window[PlotID].Chart_dataobj)																												//	\
	{	if (window[PlotID].Chart_dataobj[dataid]['data_plottext']!==undefined)																						//	\
		{	if (window[PlotID].Chart_dataobj[dataid]['Format_type']=="pie")																							//	\
			{	datafinal=new Array();																																//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']]={};																				//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].type="pie";																		//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].startAngle=window[PlotID].Chart_dataobj[dataid]['Chart_startangle'];				//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].startAngle=window[PlotID].Chart_dataobj[dataid]['Chart_endangle'];					//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].center=window[PlotID].Chart_dataobj[dataid]['Chart_location'].split(',');			//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].size=parseInt(window[PlotID].Chart_dataobj[dataid]['Chart_size'], 10)+'%';			//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].innerSize=parseInt(window[PlotID].Chart_dataobj[dataid]['Chart_innersize'], 10)+'%';//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].fillcolor=window[PlotID].Chart_dataobj[dataid]['fillcolor'];						//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels={};																		//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].startAngle=window[PlotID].Chart_dataobj[dataid]['Chart_startangle'];				//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].endAngle=window[PlotID].Chart_dataobj[dataid]['Chart_stopangle'];					//	\
				dataobj=new Array();																																//	\
				for (var a=0; a<window[PlotID].Chart_dataobj[dataid]['piedata'].length; a++)																		//	\
				{	dataobj[a]={};																																	//	\
					if (window[PlotID].Chart_dataobj[dataid]['pielabels'][a]!==undefined){dataobj[a]['name']=window[PlotID].Chart_dataobj[dataid]['pielabels'][a]; }//	\
					dataobj[a]['y']=window[PlotID].Chart_dataobj[dataid]['piedata'][a];																				//	\
				}																																					//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data=dataobj;																		//	\
				thischart.plotOptions['pie']={};																													//	\
				if (window[PlotID].Chart_dataobj[dataid]['showInLegend']===true) { 																					//	\
						thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].showInLegend = true;														//	\
				}else {	thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].showInLegend = false;	}													//	\
				if ((window[PlotID].Chart_dataobj[dataid]['data_datalabels']=="true")||((window[PlotID].Chart_dataobj[dataid]['data_datalabels']===true)))			//	\
				{	thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels={};																	//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['connectorWidth']=window[PlotID].Chart_dataobj[dataid].Chart_connectorWidth;	//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['enabled']=true;													//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['softConnector']=false;												//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['distance']=window[PlotID].Chart_dataobj[dataid].data_labelDistance;//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['color']=window[PlotID].Chart_dataobj[dataid].data_labelColor;		//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['style']={ fontFamily: 'Arimo' };									//	\
					if (window[PlotID].Chart_dataobj[dataid].data_labelFormat=="Percentage")																		//	\
					{	thischart.series[window[PlotID].Chart_dataobj[dataid]['series']]['dataLabels']['formatter']=function() { return Math.round(this.percentage*100)/100 + ' %';}//	\
					}else if (window[PlotID].Chart_dataobj[dataid].data_labelFormat=="Value")																		//	\
					{	thischart.series[window[PlotID].Chart_dataobj[dataid]['series']]['dataLabels']['formatter']=function() { return this.y;} }					//	\	
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['borderWidth']=window[PlotID].Chart_dataobj[dataid]['data_labelBorderWidth'];	//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['borderColor']=window[PlotID].Chart_dataobj[dataid]['data_labelBorderColor'];	//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['borderRadius']=window[PlotID].Chart_dataobj[dataid]['data_labelBorderRadius'];	//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['padding']=window[PlotID].Chart_dataobj[dataid]['data_labelBorderPadding'];		//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['backgroundColor']=window[PlotID].Chart_dataobj[dataid]['data_labelBackgroundColor'];
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['rotation']=window[PlotID].Chart_dataobj[dataid]['data_labelRotation'];			//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['x']=window[PlotID].Chart_dataobj[dataid]['data_labelX'];			//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['y']=window[PlotID].Chart_dataobj[dataid]['data_labelY'];			//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['style']={ fontFamily: 'Arimo' };									//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['style']['fontSize']=window[PlotID].Chart_dataobj[dataid]['data_labelSize']; 	//	\
				}else {	thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels={};																//	\
						thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['enabled']=false;	}											//	\
				for (var point in window[PlotID].Chart_dataobj[dataid].PointData)																					//	\
				{	
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]={};																//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['y']=window[PlotID].Chart_dataobj[dataid].PointData[point]['y'];	//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['name']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['name']=window[PlotID].Chart_dataobj[dataid].PointData[point]['name']; }//\
					if ((window[PlotID].Chart_dataobj[dataid].PointData[point].color!==undefined)&&(window[PlotID].Chart_dataobj[dataid].PointData[point].color!==''))
					{	thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['color']=window[PlotID].Chart_dataobj[dataid].PointData[point].color;}//\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['sliced']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['sliced']=eval(window[PlotID].Chart_dataobj[dataid].PointData[point]['sliced']);	}//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels']={};													//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['labels']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].enabled=eval(window[PlotID].Chart_dataobj[dataid]['PointData'][point]['labels']); }		//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelColor']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].color=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelColor']; }				//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBorderRadius']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].borderRadius=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBorderRadius']; }//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBackgroundColor']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].backgroundColor=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBackgroundColor']; }
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBorderWidth']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].borderWidth=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBorderWidth']; }	//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBorderPadding']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].padding=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBorderPadding']; }	//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBorderColor']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].borderColor=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBorderColor']; }	//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels']['style']={ fontFamily: 'Arimo' }; 					//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelSize']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels']['style']['fontSize']=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelSize']; }//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelRotation']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].rotation=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelRotation']; }		//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelX']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].x=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelX']; }						//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelY']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].y=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelY']; }					//	\
				}																																					//	\
			}else																																					//	\
			{	thischart.series[window[PlotID].Chart_dataobj[dataid]['series']]={};																				//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].type=window[PlotID].Chart_dataobj[dataid]['Format_type'];							//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].turboThreshold=0;																	//	\
//				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data=JSON.parse("["+window[PlotID].Chart_dataobj[dataid]['data_plottext']+"]");	//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].name=window[PlotID].Chart_dataobj[dataid]['dataname'];								//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].yAxis=window[PlotID].Chart_dataobj[dataid]['yaxis'];								//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].xAxis=window[PlotID].Chart_dataobj[dataid]['xaxis'];								//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].color=window[PlotID].Chart_dataobj[dataid]['color'];								//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].fillcolor=window[PlotID].Chart_dataobj[dataid]['fillcolor'];						//	\
				if (window[PlotID].Chart_dataobj[dataid]['showInLegend']===true) { 																					//	\
						thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].showInLegend = true;														//	\
				}else {	thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].showInLegend = false;	}													//	\
				if (thischart.chart.type!="heatmap")																												//	\
				{	thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].lineWidth=parseInt(window[PlotID].Chart_dataobj[dataid]['lineWidth'], 10);	}	//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].marker={};																			//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].marker['enabled']=eval(window[PlotID].Chart_dataobj[dataid]['data_pointmarkers']);	//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].marker.lineWidth=window[PlotID].Chart_dataobj[dataid]['lineWidth'];				//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].marker.fillColor=window[PlotID].Chart_dataobj[dataid]['fillcolor'];				//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].marker.symbol=window[PlotID].Chart_dataobj[dataid]['symbol'];						//	\
				if (window[PlotID]['Chart_stack']=="none") { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].stacking=null;						//	\
				}else {		thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].stacking=window[PlotID]['Chart_stack'];	}							//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels={};																		//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels.enabled=eval(window[PlotID].Chart_dataobj[dataid]['data_datalabels']);	//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels.color=window[PlotID].Chart_dataobj[dataid]['data_labelColor'];			//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels.borderRadius=window[PlotID].Chart_dataobj[dataid].data_labelBorderRadius;//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels.backgroundColor=window[PlotID].Chart_dataobj[dataid].data_labelBackgroundColor;
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels.borderWidth=window[PlotID].Chart_dataobj[dataid].data_labelBorderWidth;	//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels.padding=window[PlotID].Chart_dataobj[dataid].data_labelBorderPadding;	//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['style']={ fontFamily: 'Arimo' };										//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels['style']['fontSize']=window[PlotID].Chart_dataobj[dataid]['data_labelSize'];//	\
				if (window[PlotID].Chart_dataobj[dataid].data_labelBorderColor==='')																					//	\
				{	thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels.borderColor=window[PlotID].Chart_dataobj[dataid]['color'];			//	\
				}else { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels.borderColor=window[PlotID].Chart_dataobj[dataid].data_labelBorderColor; }
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels.rotation=window[PlotID].Chart_dataobj[dataid].data_labelRotation;		//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels.x=window[PlotID].Chart_dataobj[dataid].data_labelX;						//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].dataLabels.y=window[PlotID].Chart_dataobj[dataid].data_labelY;						//	\
				thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data=new Array();																			//	\
				for (var point in window[PlotID].Chart_dataobj[dataid].PointData)																					//	\
				{	var temp=JSON.parse(JSON.stringify(window[PlotID].Chart_dataobj[dataid].PointData[point]['y']));												//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]={y: temp};															//	\
					if (window[PlotID].Chart_dataobj[dataid].PointData[point]['x']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['x']=window[PlotID].Chart_dataobj[dataid].PointData[point]['x']; }	//	\
					if (window[PlotID].Chart_dataobj[dataid].PointData[point]['z']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['z']=window[PlotID].Chart_dataobj[dataid].PointData[point]['z']; }	//	\
					if (window[PlotID].Chart_dataobj[dataid].PointData[point]['value']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['value']=window[PlotID].Chart_dataobj[dataid].PointData[point]['value']; }	//	\
					if (window[PlotID].Chart_dataobj[dataid].PointData[point].data_fillcolor!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['color']=window[PlotID].Chart_dataobj[dataid].PointData[point].data_fillcolor; }	//	\
					if (window[PlotID].Chart_dataobj[dataid].PointData[point].data_markersize!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['radius']=window[PlotID].Chart_dataobj[dataid].PointData[point].data_markersize; }	//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['marker']={};														//	\
					if (window[PlotID].Chart_dataobj[dataid].PointData[point]['data_pointmarkers']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['marker']['enabled']=window[PlotID].Chart_dataobj[dataid].PointData[point]['data_pointmarkers']; }	//	\
					if (window[PlotID].Chart_dataobj[dataid].PointData[point]['symbol']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['marker']['symbol']=window[PlotID].Chart_dataobj[dataid].PointData[point]['symbol']; }	//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels']={};													//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['labels']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].enabled=eval(window[PlotID].Chart_dataobj[dataid]['PointData'][point]['labels']); }		//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelColor']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].color=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelColor']; }
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBorderRadius']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].borderRadius=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBorderRadius']; }//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBackgroundColor']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].backgroundColor=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBackgroundColor']; }
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBorderWidth']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].borderWidth=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBorderWidth']; }	//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBorderPadding']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].padding=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBorderPadding']; }	//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBorderColor']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].borderColor=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelBorderColor']; }	//	\
					thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels']['style']={ fontFamily: 'Arimo' };										//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelSize']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels']['style']['fontSize']=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelSize']; }//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelRotation']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].rotation=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelRotation']; }		//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelX']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].x=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelX']; }						//	\
					if (window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelY']!==undefined) { thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data[point]['dataLabels'].y=window[PlotID].Chart_dataobj[dataid]['PointData'][point]['data_labelY']; }					//	\

					MyTest=thischart.series[window[PlotID].Chart_dataobj[dataid]['series']].data;
				}																																					//	\
				thischart.plotOptions.series={};		thischart.plotOptions.series.states={};		thischart.plotOptions.series.states.hover={};					//	\
				thischart.plotOptions.series.states.hover.enabled=false;																							//	\
			}																																						//	\
		}																																							//	\
	}																																								//	\
	window[window[PlotID].Chart_Name]=new Highcharts.Chart( thischart );																							//	\
	window[window[PlotID].Chart_Name].container.onclick = null;																										//	\
	window[window[PlotID].Chart_Name].credits.hide();																												//	\
    for (var textID in window[PlotID].Chart_textobj){ DrawPlotText(PlotID, textID); }                                                                               //  \
	if (typeof(callback)=="function") { callback();	} 																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------- PLOT THE DATA SERIES ----------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function Plot_PlotDataSeries(PlotID, DataID, callback)																												//	\
{	window[PlotID].Chart_dataobj[DataID].data_plottext='';																											//	\	
	var Data=window[PlotID].Chart_dataobj[DataID];																													//	\
	if ((Data.Format_type=="bar")||(Data.Format_type=="column"))																									//	\
	{	if (Data.ydata_plottext===undefined) { Data.data_plottext=0; 																								//	\
		}else	{	Data.data_plottext=Data.ydata_plottext; 	}																									//	\	
   		window[window[PlotID].Chart_Name].series[Data.series].setData(JSON.parse("["+Data.data_plottext+"]"));														//	\
		ChangeSeriesColor(PlotID, DataID);																															//	\
	}else if (Data.Format_type=="bubble")																															//	\
	{	var tempxdata=Data.xdata_plottext.split(',');																												//	\
		var tempydata=Data.ydata_plottext.split(',');																												//	\
		var tempzdata=Data.zdata_plottext.split(',');																												//	\
		if ((Data.xdata_plottext.length===0)&&(Data.ydata_plottext.length===0)) 																					//	\
		{	for (var a=0; a<tempzdata.length; a++) 																													//	\
			{ Data.data_plottext=Data.data_plottext+', ['+a+','+a+','+tempzdata[a]+']'; } 																			//	\
		}else if (Data.xdata_plottext.length===0) 																													//	\
		{	for (var a=0; a<tempzdata.length; a++) 																													//	\
			{ Data.data_plottext=Data.data_plottext+', ['+a+','+tempydata[a]+','+tempzdata[a]+']'; } 																//	\
		}else if (Data.ydata_plottext.length===0) 																													//	\
		{	for (var a=0; a<tempzdata.length; a++) 																													//	\
			{ Data.data_plottext=Data.data_plottext+', ['+tempxdata[a]+','+a+','+tempzdata[a]+']'; } 																//	\
		}else 																																						//	\
		{	for (var a=0; a<tempzdata.length; a++) 																													//	\
			{ Data.data_plottext=Data.data_plottext+', ['+tempxdata[a]+','+tempydata[a]+','+tempzdata[a]+']'; } 													//	\
		}																																							//	\
   		Data.data_plottext=Data.data_plottext.replace(/^\,/,'');																									//	\
   		window[window[PlotID].Chart_Name].series[Data.series].setData(JSON.parse("["+Data.data_plottext+"]"));														//	\
	}else if (Data.Format_type=="heatmap")																															//	\
	{	var temp='';																																				//	\
		for (var a in Data.dataobject) 																																//	\
		{	temp=a.split('-');																																		//	\
			Data.data_plottext=Data.data_plottext+', ['+temp[0]+','+temp[1]+','+Data.dataobject[a]+']'; } 															//	\
   		Data.data_plottext=Data.data_plottext.replace(/^\,/,'');																									//	\
   		window[window[PlotID].Chart_Name].series[Data.series].setData(JSON.parse("["+Data.data_plottext+"]"));														//	\
	}else																																							//	\
	{																																								//	\
		if (Data.xdata_plottext.length>0) 																															//	\
		{	var tempxdata=Data.xdata_plottext.split(',');																											//	\
			var tempydata=Data.ydata_plottext.split(',');																											//	\
			for (var a=0; a<tempxdata.length; a++)																													//	\
			{	if (tempydata[a]===undefined) { tempydata[a]=0; }	if (tempxdata[a]===undefined) { tempxdata[a]=0; }												//	\
				if (a===0) 	{	Data.data_plottext=Data.data_plottext+'['+tempxdata[a]+','+tempydata[a]+']'; 														//	\
				}else		{	Data.data_plottext=Data.data_plottext+', ['+tempxdata[a]+','+tempydata[a]+']'; } 													//	\
			}																																						//	\
		}else																																						//	\
		{	var tempydata=Data.ydata_plottext.split(',');																											//	\
			for (var a=0; a<tempydata.length; a++)																													//	\
			{	if (tempydata[a]===undefined) { tempydata[a]=0; }																									//	\
				if (a===0) 	{	Data.data_plottext=Data.data_plottext+'['+a+','+tempydata[a]+']'; 																	//	\
				}else		{	Data.data_plottext=Data.data_plottext+', ['+a+','+tempydata[a]+']'; } 																//	\
		}	}																																						//	\
		if (Data.ydata_plottext.length>0)																															//	\
		{	//window[window[PlotID].Chart_Name].series[Data.series].update({ name: Data.dataname});																	//	\
	   		window[window[PlotID].Chart_Name].series[Data.series].setData(JSON.parse("["+Data.data_plottext+"]"));													//	\
			ChangeSeriesColor(PlotID, DataID);																														//	\
		}																																							//	\
	}																																								//	\
	window[PlotID].Chart_dataobj[DataID]=Data;																														//	\
	if (typeof(callback)=="function") { callback();	} 																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------- SET THE DATA LABELS ----------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function Plot_DataLabels(PlotID, DataID)																															//	\
{	window[PlotID].Format_haschanged=1;	 																															//	\
	if ((window[PlotID].Chart_dataobj[DataID].data_datalabels=="true")||(window[PlotID].Chart_dataobj[DataID].data_datalabels===true)) 								//	\
	{	window[window[PlotID].Chart_Name].series[window[PlotID].Chart_dataobj[DataID].series].update({ dataLabels:	{ enabled: true } }); 							//	\
	}else {window[window[PlotID].Chart_Name].series[window[PlotID].Chart_dataobj[DataID].series].update({ dataLabels:	{ enabled: false } });} 					//	\
	CreatePlot(PlotID);																																				//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------- PIE LABEL POSITIONS ----------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function SetPieLabelLoc(PlotID, DataID, index)																														//	\--- Defunct
{	window[PlotID].Format_haschanged=1;	 																															//	\
	if (index===undefined)																																			//	\
	{	if (window[PlotID].Chart_dataobj[DataID]['data_plottext']!==undefined)																						//	\
		{	if (window[PlotID].Chart_dataobj[DataID]['Format_type']=="pie")																							//	\
			{	datafinal=new Array();																																//	\
				for (var datanum in window[PlotID].Chart_dataobj[DataID]['Chart_translations']) 																	//	\
				{	var x=window[PlotID].Chart_dataobj[DataID]['Chart_translations'][datanum]['x'];																	//	\
					var y=window[PlotID].Chart_dataobj[DataID]['Chart_translations'][datanum]['y'];																	//	\
					window[window[PlotID].Chart_Name].series[window[PlotID].Chart_dataobj[DataID]['series']].data[datanum].dataLabel.translate(x, y); }				//	\
			}																																						//	\
		}																																							//	\
	}else 																																							//	\
	{																																								//	\
		var x=window[PlotID].Chart_dataobj[DataID]['Chart_translations'][index]['x'];																				//	\
		var y=window[PlotID].Chart_dataobj[DataID]['Chart_translations'][index]['y'];																				//	\
		window[window[PlotID].Chart_Name].series[window[PlotID].Chart_dataobj[DataID]['series']].data[index].dataLabel.translate(x, y); 							//	\
	}																																								//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------- SET THE PLOT POINT MARKERS ---------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function Plot_PointMarkers(PlotID, DataID) 	{	window[PlotID].Format_haschanged=1;	 																				//	\
	if ((window[PlotID].Chart_dataobj[DataID].data_pointmarkers=="true")||(window[PlotID].Chart_dataobj[DataID].data_pointmarkers===true)) 							//	\
	{	window[window[PlotID].Chart_Name].series[window[PlotID].Chart_dataobj[DataID]['series']].update({marker:{enabled:true}}); 									//	\
	}else {window[window[PlotID].Chart_Name].series[window[PlotID].Chart_dataobj[DataID]['series']].update({marker:{enabled:false}});} 								//	\
	CreatePlot(PlotID); }																																			//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------- SET THE PLOT TITLE --------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function Plot_Title(PlotID) { 	window[PlotID].Format_haschanged=1;																									//	\
	if (window[PlotID].Title_onoff=="1") { var text=window[PlotID].Title_text; }else { var text=null; } 															//	\		
	window[window[PlotID].Chart_Name].setTitle({text: text }); }																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------- SET THE PLOT SUBTITLE ---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function Plot_Subtitle(PlotID) {window[PlotID].Format_haschanged=1;																									//	\
	if (window[PlotID].Subtitle_onoff=="1") 	{ var text=window[PlotID].Subtitle_text; }else { var text=null; } 													//	\
	window[window[PlotID].Chart_Name].setTitle(null, { text: text });  }																							//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------- SET THE OVERALL PLOT DIMENSIONS -------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function Plot_Dimensions(PlotID) { window[PlotID].Format_haschanged=1;																								//	\
	var width=parseInt(window[PlotID].Chart_width.replace("px",''), 10); var height=parseInt(window[PlotID].Chart_height.replace("px",''), 10); 					//	\
	window[window[PlotID].Chart_Name].setSize(chartWidth = width, chartHeight = height);  }																			//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- SET THE PLOT MARGINS --------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
/*
function Plot_Margins(PlotID) {																																		//	\
	window[PlotID].Format_haschanged=1;																																//	\
	window[window[PlotID].Chart_Name].optionsMarginBottom=window[PlotID].Chart_marginbottom;																		//	\
	window[window[PlotID].Chart_Name].optionsMarginTop=window[PlotID].Chart_margintop;																				//	\
	window[window[PlotID].Chart_Name].optionsMarginLeft=window[PlotID].Chart_marginleft;																			//	\
	window[window[PlotID].Chart_Name].optionsMarginRight=window[PlotID].Chart_marginright;																			//	\
	window[window[PlotID].Chart_Name].render();																														//	\
}																																									//	\
*/
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------- POPULATE PLOT OPTIONS WITH CURRENT DATASET SETTINGS ------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function PopulatePlotData (PlotID, DataID)																															//	\--- This function is called whenever a user first clicks on a 
{	$('.plot_seriesname, .plot_xdatainput, .plot_ydatainput').val('');																								//	\--- plot or when they click on a specific dataset. It populates 
	$("#plot_spec").attr('plotid', PlotID);																															//	\--- the chart items with the proper data.
	if (window[PlotID].Title_onoff=="1") { $('#titlecheck').attr("checked", "checked"); }																			//	\
	$('#plot_title').val(window[PlotID].Title_text);																												//	\
	if (window[PlotID].Subtitle_onoff=="1") { $('#subtitlecheck').attr("checked", "checked"); 																		//	\
	$('#plot_subtitle').val(window[PlotID].Subtitle_text);																											//	\
	}else { $('#subtitlecheck').attr("checked", false); $('#plot_subtitle').val(''); } 																				//	\
	$('#plot_width').val(window[PlotID].Chart_width);																												//	\
	$('#plot_height').val(window[PlotID].Chart_height);																												//	\
	$('#plot_marginleft').val(window[PlotID].Chart_marginleft);																										//	\
	$('#plot_marginright').val(window[PlotID].Chart_marginright);																									//	\
	$('#plot_margintop').val(window[PlotID].Chart_margintop);																										//	\
	$('#plot_marginbottom').val(window[PlotID].Chart_marginbottom);																									//	\
	$('#plot_yaxisnames').find('.plot_yaxisline').remove();																											//	\
	for (var AxisID in window[PlotID].Chart_yaxesobj)																												//	\
	{	var temp=$('#plot_yaxistemplate').clone();																													//	\
		temp.attr('id',AxisID);																																		//	\
		temp.addClass('plot_yaxisline');																															//	\
		temp.find('.plot_yaxisname').html(window[PlotID].Chart_yaxesobj[AxisID].Axis_name);																			//	\
		$('#plot_yaxisnames').append(temp);																															//	\
	}																																								//	\
	$('.plot_xaxisline:eq(0)').attr("id", Object.keys(window[PlotID].Chart_xaxesobj)[0]);																			//	\
	PopulateXAxisData (PlotID, Object.keys(window[PlotID].Chart_xaxesobj)[0]);																						//	\
	if (window[PlotID].Legend_onoff) { $('#plot_legendonoff').attr("checked", "checked"); }																			//	\
	$("#plot_legendlayout").empty();																																//	\
	if (window[PlotID].Legend_layout=="horizontal") 																												//	\
	{ 																																								//	\
		$('#plot_legendlayout').append($("<option></option>").attr("value","horizontal").text("Horizontal")); 														//	\
		$('#plot_legendlayout').append($("<option></option>").attr("value","vertical").text("Vertical")); 															//	\
	}else 																																							//	\
	{ 																																								//	\
		$('#plot_legendlayout').append($("<option></option>").attr("value","vertical").text("Vertical"));															//	\
		$('#plot_legendlayout').append($("<option></option>").attr("value","horizontal").text("Horizontal")); 														//	\
	}																																								//	\
	$("#plot_legendalignment").empty();																																//	\
	if (window[PlotID].Legend_align=="left") 																														//	\
	{ 																																								//	\
		$('#plot_legendalignment').append($("<option></option>").attr("value","left").text("Left")); 																//	\
		$('#plot_legendalignment').append($("<option></option>").attr("value","center").text("Center")); 															//	\
		$('#plot_legendalignment').append($("<option></option>").attr("value","right").text("Right")); 																//	\
	}else if (window[PlotID].Legend_align=="center") 																												//	\
	{ 																																								//	\
		$('#plot_legendalignment').append($("<option></option>").attr("value","center").text("Center")); 															//	\
		$('#plot_legendalignment').append($("<option></option>").attr("value","left").text("Left")); 																//	\
		$('#plot_legendalignment').append($("<option></option>").attr("value","right").text("Right")); 																//	\
	}else if (window[PlotID].Legend_align=="right") 																												//	\
	{ 																																								//	\
		$('#plot_legendalignment').append($("<option></option>").attr("value","right").text("Right")); 																//	\
		$('#plot_legendalignment').append($("<option></option>").attr("value","center").text("Center")); 															//	\
		$('#plot_legendalignment').append($("<option></option>").attr("value","left").text("Left")); 																//	\
	}																																								//	\
	$("#plot_legendverticalalignment").empty();																														//	\
	if (window[PlotID].Legend_verticalalign=="top") 																												//	\
	{ 																																								//	\
		$('#plot_legendverticalalignment').append($("<option></option>").attr("value","top").text("Top")); 															//	\
		$('#plot_legendverticalalignment').append($("<option></option>").attr("value","bottom").text("Bottom")); 													//	\
		$('#plot_legendverticalalignment').append($("<option></option>").attr("value","middle").text("Center")); 													//	\
	}else if (window[PlotID].Legend_verticalalign=="middle") 																										//	\
	{ 																																								//	\
		$('#plot_legendverticalalignment').append($("<option></option>").attr("value","middle").text("Center")); 													//	\
		$('#plot_legendverticalalignment').append($("<option></option>").attr("value","top").text("Top")); 															//	\
		$('#plot_legendverticalalignment').append($("<option></option>").attr("value","bottom").text("Bottom")); 													//	\
	}else if (window[PlotID].Legend_verticalalign=="bottom") 																										//	\
	{ 																																								//	\
		$('#plot_legendverticalalignment').append($("<option></option>").attr("value","bottom").text("Bottom")); 													//	\
		$('#plot_legendverticalalignment').append($("<option></option>").attr("value","middle").text("Center")); 													//	\
		$('#plot_legendverticalalignment').append($("<option></option>").attr("value","top").text("Top")); 															//	\
	}																																								//	\
	$('#plot_legendxoffset').val(window[PlotID].Legend_xoffset);																									//	\
	$('#plot_legendyoffset').val(window[PlotID].Legend_yoffset);																									//	\
	$('#plot_datasets').find('.plot_dataline').each(function( index ) {	if ($(this).attr('id')!="plot_dataseriestemplate") { $(this).remove(); } });				//	\
	Handle_Chart_ShowOptions(PlotID);																																//	\
	$('.plot_datanames').find('.plot_dataline').remove();																											//	\
	var index=0;																																					//	\
	for (var DataID in window[PlotID].Chart_dataobj)																												//	\
	{	if (DataID===0) { delete window[PlotID].Chart_dataobj[DataID];																								//	\
		}else 																																						//	\
		{	var temp=$('#plot_dataseriestemplate').clone();																											//	\
			temp.attr('id',DataID);																																	//	\
			temp.addClass('plot_dataline');																															//	\
			if (window[PlotID].Chart_dataobj[DataID].dataname!=='') { temp.find('.plot_dataname').html(window[PlotID].Chart_dataobj[DataID].dataname); 				//	\
			}else { temp.find('.plot_dataname').html('Series '+index); }																							//	\
			$('.plot_datanames').append(temp);																														//	\
			index=index+1;																																			//	\
		}																																							//	\
	}																																								//	\
	var index=0;																																					//	\
	for (var BandID in window[PlotID].Chart_bandsobj)																												//	\
	{	var temp=$('#plot_bandtemplate').clone();																													//	\
		temp.attr('id',BandID).find('.plot_bandname').html("Band "+index);																							//	\
		temp.appendTo($('#plot_bandnames'));																														//	\
		index=index+1;																																				//	\																																								//	\
	}																																								//	\
	for (var LineID in window[PlotID].Chart_linesobj)																												//	\
	{	var temp=$('#plot_linetemplate').clone();																													//	\
		temp.attr('id',BandID).find('.plot_linename').html("Line "+index);																							//	\
		temp.appendTo($('#plot_linenames'));																														//	\
		index=index+1;																																				//	\																																								//	\
	}																																								//	\
	for (var TextID in window[PlotID].Chart_textobj)																												//	\
	{	var temp=$('#plot_texttemplate').clone();																													//	\
		temp.attr('id',TextID).find('.plot_textname').html("Text "+index);																							//	\
		temp.appendTo($('#plot_textnames'));																														//	\
		index=index+1;																																				//	\																																								//	\
	}																																								//	\
	PopulateSeriesData (PlotID, window[PlotID].Chart_dataobj[0]);																									//	\
	$('#'+window[PlotID].Chart_dataobj[0]).addClass('plot_dataline_active');																						//	\
	PopulatePlotVariables();																																		//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function PopulateSeriesData (PlotID, DataID)																														//	\
{	if (window[PlotID].Chart_dataobj[DataID]!=undefined)																											//	\
	{	$('.plot_seriesname, #plot_xdata1, #plot_data1, #plot_xaxis1, #plot_yaxis1, .plot_xdatainput, .plot_ydatainput').prop('disabled', false);					//	\
		$('.plot_seriesname').val(window[PlotID].Chart_dataobj[DataID].dataname);																					//	\
		$('.plot_xdatainput').val(window[PlotID].Chart_dataobj[DataID].xdata_name);																					//	\
		$('.plot_ydatainput').val(window[PlotID].Chart_dataobj[DataID].ydata_name);																					//	\
		$('.plot_zdatainput').val(window[PlotID].Chart_dataobj[DataID].zdata_name);																					//	\
		$('.plot_labels').val(window[PlotID].Chart_Labeltext);																										//	\
		$('.plot_yaxisselect').empty();																																//	\
		for(var AxisID in window[PlotID].Chart_yaxesobj) 																											//	\
		{	if (window[PlotID].Chart_dataobj[DataID].yaxis==window[PlotID].Chart_yaxesobj[AxisID]['Axis_num']) 														//	\
			{ $('.plot_yaxisselect').append($("<option></option>").attr("value",window[PlotID].Chart_yaxesobj[AxisID]['Axis_num']).text(window[PlotID].Chart_yaxesobj[AxisID].Axis_name)); }
		}; 																																							//	\
		for(var AxisID in window[PlotID].Chart_yaxesobj) 																											//	\
		{	if (window[PlotID].Chart_dataobj[DataID].yaxis!=window[PlotID].Chart_yaxesobj[AxisID]['Axis_num']) 														//	\
			{ $('.plot_yaxisselect').append($("<option></option>").attr("value",window[PlotID].Chart_yaxesobj[AxisID]['Axis_num']).text(window[PlotID].Chart_yaxesobj[AxisID].Axis_name)); }
		}; 																																							//	\
		if (window[PlotID].Chart_dataobj[DataID]['data_datalabels']===true) 	{  $('.plot_optionlabelsonoff').attr("checked", true); 								//	\
		}else {$('.plot_optionlabelsonoff').attr("checked", false);}																								//	\
		if (window[PlotID].Chart_dataobj[DataID].data_pointmarkers===true)	{ $('.plot_optionmarkersonoff').attr("checked", true); 									//	\
		}else {$('.plot_optionmarkersonoff').attr("checked", false);}																								//	\
		$(".plot_colorpicker").spectrum("set", window[PlotID].Chart_dataobj[DataID].color);																			//	\
		$(".plot_fillcolorpicker").spectrum("set", window[PlotID].Chart_dataobj[DataID].color);																		//	\
		$('.plot_markersize').val(window[PlotID].Chart_dataobj[DataID].markersize);																					//	\
		$('.plot_plotlinewidth').val(window[PlotID].Chart_dataobj[DataID].lineWidth);																				//	\
		$('.plot_symbolselect').empty();																															//	\
		$('.plot_symbolselect').append($("<option></option>").attr("value",window[PlotID].Chart_dataobj[DataID].symbol).text(window[PlotID].Chart_dataobj[DataID].symbol));
		if (window[PlotID].Chart_dataobj[DataID].symbol!="circle") { $('.plot_symbolselect').append($("<option></option>").attr("value","circle").text("circle")); }//	\
		if (window[PlotID].Chart_dataobj[DataID].symbol!="square") { $('.plot_symbolselect').append($("<option></option>").attr("value","square").text("square")); }//	\
		if (window[PlotID].Chart_dataobj[DataID].symbol!="triangle") { $('.plot_symbolselect').append($("<option></option>").attr("value","triangle").text("triangle")); }
		if (window[PlotID].Chart_dataobj[DataID].symbol!="triangle-down") { $('.plot_symbolselect').append($("<option></option>").attr("value","triangle-down").text("triangle-down")); }	//	\
		if (window[PlotID].Chart_dataobj[DataID].symbol!="diamond") { $('.plot_symbolselect').append($("<option></option>").attr("value","diamond").text("diamond")); }	
		$('.plot_seriestype').empty();																																//	\
		$('.plot_seriestype').append($("<option></option>").attr("value",window[PlotID].Chart_dataobj[DataID].Format_type).text(window[PlotID].Chart_dataobj[DataID].Format_type));
		if (window[PlotID].Chart_dataobj[DataID].symbol!="line") { $('.plot_seriestype').append($("<option></option>").attr("value","line").text("line")); }		//	\
		if (window[PlotID].Chart_dataobj[DataID].symbol!="pie") { $('.plot_seriestype').append($("<option></option>").attr("value","pie").text("pie")); }			//	\
		if (window[PlotID].Chart_dataobj[DataID].symbol!="column") { $('.plot_seriestype').append($("<option></option>").attr("value","column").text("column")); }	//	\
		if (window[PlotID].Chart_dataobj[DataID].symbol!="area") { $('.plot_seriestype').append($("<option></option>").attr("value","area").text("area")); }		//	\
		if (window[PlotID].Chart_dataobj[DataID].symbol!="scatter") { $('.plot_seriestype').append($("<option></option>").attr("value","scatter").text("scatter"));}//	\	
		if (window[PlotID].Chart_dataobj[DataID].symbol!="spline") { $('.plot_seriestype').append($("<option></option>").attr("value","spline").text("spline")); }	//	\
		$('.plot_labelBorderWidth').val(window[PlotID].Chart_dataobj[DataID].data_labelBorderWidth);																//	\
		$('.plot_labelBorderColor').val(window[PlotID].Chart_dataobj[DataID].data_labelBorderColor);																//	\
		$('.plot_labelBGColor').val(window[PlotID].Chart_dataobj[DataID].data_labelBackgroundColor);																//	\
		$('.plot_labelBorderRadius').val(window[PlotID].Chart_dataobj[DataID].data_labelBorderRadius);																//	\
		$('.plot_labelBorderPadding').val(window[PlotID].Chart_dataobj[DataID].data_labelBorderPadding);															//	\
		$('.plot_labelRotation').val(window[PlotID].Chart_dataobj[DataID].data_labelRotation);																		//	\
		$('.plot_labelX').val(window[PlotID].Chart_dataobj[DataID].data_labelX);																					//	\
		$('.plot_labelY').val(window[PlotID].Chart_dataobj[DataID].data_labelX);																					//	\
	}else																																							//	\
	{																																								//	\
		$('.plot_yaxisselect, .plot_symbolselect').empty();																											//	\
		for(var DataID in window[PlotID].Chart_yaxesobj) 																											//	\
		{	$('.plot_yaxisselect').append($("<option></option>").attr("value",window[PlotID].Chart_yaxesobj[DataID]).text(window[PlotID].Chart_yaxesobj[DataID].Axis_name)); } 
		$('.plot_symbolselect').append($("<option></option>").attr("value","circle").text("circle"));																//	\
		$('.plot_symbolselect').append($("<option></option>").attr("value","square").text("square"));																//	\
		$('.plot_symbolselect').append($("<option></option>").attr("value","triangle").text("triangle"));															//	\
		$('.plot_symbolselect').append($("<option></option>").attr("value","triangle-down").text("triangle-down"));													//	\
		$('.plot_symbolselect').append($("<option></option>").attr("value","diamond").text("diamond")); 															//	\
		$('.plot_seriesname, #plot_xdata1, #plot_data1, #plot_xaxis1, #plot_yaxis1, .plot_xdatainput, .plot_ydatainput').prop('disabled', true);					//	\
	}																																								//	\
	if (window[PlotID].Chart_dataobj[DataID]!==undefined)																											//	\
	{	if (window[PlotID].Chart_dataobj[DataID].Format_type=="pie")																								//	\
		{	$('.plot_piedatainput').closest('.plot_pieappbox').remove();																							//	\
			var text='';																																			//	\
			for (var a in window[PlotID].Chart_dataobj[DataID].piedata) 																							//	\
			{	var text=text+'<div class="plot_pieappbox">';																										//	\
				text=text+'<input type="text" class="plot_pielabelinput inactive_pieinput" color="'+window[PlotID].Chart_dataobj[DataID].piedata[a]['color']+'" value="'+window[PlotID].Chart_dataobj[DataID].piedata[a]['label']+'">';	//	\
				text=text+'<input type="text" class="plot_piedatainput inactive_pieinput" color="'+window[PlotID].Chart_dataobj[DataID].piedata[a]['color']+'" value="'+window[PlotID].Chart_dataobj[DataID].piedata[a]['value']+'" text="'+window[PlotID].Chart_dataobj[DataID].piedata[a]['text']+'"></div>';		//	\
			}																																						//	\
			$('#plot_datablock2').find('.plot_piebox').append(text); 																								//	\
			if (window[PlotID].Chart_dataobj[DataID].data_datalabels) { $('.plot_optionlabelsonoff').attr('checked','checked');										//	\
			}else { $('.plot_optionlabelsonoff').attr('checked',false); }																							//	\
			$('.plot_labelcolor').val(window[PlotID].Chart_dataobj[DataID].data_labelColor);																		//	\
			$('.plot_labeldistance').val(window[PlotID].Chart_dataobj[DataID].data_labelDistance);																	//	\
			$('.plot_labelformat').empty();																															//	\
			if (window[PlotID].Chart_dataobj[DataID].data_labelFormat=="Percentage") 																				//	\
			{	$('.plot_labelformat').append($("<option></option>").attr("value","Percentage").text("Percentage"));												//	\
				$('.plot_labelformat').append($("<option></option>").attr("value","Normal").text("Normal"));														//	\
				$('.plot_labelformat').append($("<option></option>").attr("value","Value").text("Value"));															//	\
			}else if (window[PlotID].Chart_dataobj[DataID].data_labelFormat=="Normal")																				//	\
			{	$('.plot_labelformat').append($("<option></option>").attr("value","Normal").text("Normal"));														//	\
				$('.plot_labelformat').append($("<option></option>").attr("value","Percentage").text("Percentage"));												//	\
				$('.plot_labelformat').append($("<option></option>").attr("value","Value").text("Value"));															//	\
			}else if (window[PlotID].Chart_dataobj[DataID].data_labelFormat=="Value")																				//	\
			{	$('.plot_labelformat').append($("<option></option>").attr("value","Value").text("Value"));															//	\
				$('.plot_labelformat').append($("<option></option>").attr("value","Percentage").text("Percentage"));												//	\
				$('.plot_labelformat').append($("<option></option>").attr("value","Normal").text("Normal"));														//	\
			}																																						//	\	
			$('.plot_connectorWidth').val(window[PlotID].Chart_dataobj[DataID].Chart_connectorWidth);																//	\
			$('.plot_monoColor').val(window[PlotID].Chart_dataobj[DataID].Chart_monoColor);																			//	\
			$('.plot_startangle').val(window[PlotID].Chart_dataobj[DataID].Chart_startangle);																		//	\
			$('.plot_stopangle').val(window[PlotID].Chart_dataobj[DataID].Chart_stopangle);																			//	\
			$('.plot_location').val(window[PlotID].Chart_dataobj[DataID].Chart_location);																			//	\
			$('.plot_innersize').val(window[PlotID].Chart_dataobj[DataID].Chart_innersize);																			//	\
			$('.plot_size').val(window[PlotID].Chart_dataobj[DataID].Chart_size);																					//	\
			if (window[PlotID].Chart_dataobj[DataID].showInLegend) { $('.plot_serieslegendonoff').attr('checked','checked');										//	\
			}else { $('.plot_serieslegendonoff').attr('checked',false); }																							//	\
			$('.plot_labelBorderWidth').val(window[PlotID].Chart_dataobj[DataID].data_labelBorderWidth);															//	\
			$('.plot_labelBorderColor').val(window[PlotID].Chart_dataobj[DataID].data_labelBorderColor);															//	\
			$('.plot_labelBGColor').val(window[PlotID].Chart_dataobj[DataID].data_labelBackgroundColor);															//	\
			$('.plot_labelBorderRadius').val(window[PlotID].Chart_dataobj[DataID].data_labelBorderRadius);															//	\
			$('.plot_labelBorderPadding').val(window[PlotID].Chart_dataobj[DataID].data_labelBorderPadding);														//	\
			$('.plot_labelRotation').val(window[PlotID].Chart_dataobj[DataID].data_labelRotation);																	//	\
			$('.plot_labelX').val(window[PlotID].Chart_dataobj[DataID].data_labelX);																				//	\
			$('.plot_labelY').val(window[PlotID].Chart_dataobj[DataID].data_labelX);																				//	\
		}																																							//	\
	}																																								//	\
	if (window[PlotID].Chart_dataobj[DataID]!==undefined)																											//	\
	{	if (window[PlotID].Chart_dataobj[DataID].Format_type=="heatmap")																							//	\
		{	if (window[window[PlotID].Chart_Name].colorAxis['0']!==undefined) 																						//	\
			{	var min=$('.plot_lowlimit').val(window[window[PlotID].Chart_Name].colorAxis['0'].getExtremes().min);												//	\
				var max=$('.plot_highlimit').val(window[window[PlotID].Chart_Name].colorAxis['0'].getExtremes().max);		}										//	\
				$('.plot_labelBorderWidth').val(window[PlotID].Chart_dataobj[DataID].data_labelBorderWidth);														//	\
				$('.plot_labelBorderColor').val(window[PlotID].Chart_dataobj[DataID].data_labelBorderColor);														//	\
				$('.plot_labelBGColor').val(window[PlotID].Chart_dataobj[DataID].data_labelBackgroundColor);														//	\
				$('.plot_labelBorderRadius').val(window[PlotID].Chart_dataobj[DataID].data_labelBorderRadius);														//	\
				$('.plot_labelBorderPadding').val(window[PlotID].Chart_dataobj[DataID].data_labelBorderPadding);													//	\
				$('.plot_labelRotation').val(window[PlotID].Chart_dataobj[DataID].data_labelRotation);																//	\
				$('.plot_labelX').val(window[PlotID].Chart_dataobj[DataID].data_labelX);																			//	\
				$('.plot_labelY').val(window[PlotID].Chart_dataobj[DataID].data_labelX);																			//	\
		}																																							//	\
	}																																								//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//


// This function is called whenever the user selects a new Y axis from the left menu or upon the selected of a new plot. It places the properties of the axis in the selection boxes
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function PopulateYAxisData (PlotID, AxisID)																															//	\
{	var Axis=window[PlotID].Chart_yaxesobj[AxisID];																													//	\
	$(".plot_axistypeselect, #plot_yaxisreverse, #plot_yaxisopposite").empty();																						//	\
	$('#plot_yaxislabel').val(Axis.Axis_label);																														//	\
	if (Axis.Axis_min!="null") { $('#plot_yaxismin').val(Axis.Axis_min); } 																							//	\
	if (Axis.Axis_max!="null") {  $('#plot_yaxismax').val(Axis.Axis_max); } 																						//	\
	if (Axis.Axis_type=="linear"){ $('.plot_axistypeselect').append($("<option></option>").attr("value","linear").text("Linear")); $('.plot_axistypeselect').append($("<option></option>").attr("value","datetime").text("Date-Time")); $('.plot_axistypeselect').append($("<option></option>").attr("value","logarithmic").text("Logarithmic")); }
	if (Axis.Axis_type=="logarithmic"){ $('.plot_axistypeselect').append($("<option></option>").attr("value","logarithmic").text("Logarithmic")); $('.plot_axistypeselect').append($("<option></option>").attr("value","datetime").text("Date-Time")); $('.plot_axistypeselect').append($("<option></option>").attr("value","linear").text("Linear")); }
	if (Axis.Axis_type=="datetime"){ $('.plot_axistypeselect').append($("<option></option>").attr("value","datetime").text("Date-Time")); $('.plot_axistypeselect').append($("<option></option>").attr("value","linear").text("Linear")); $('.plot_axistypeselect').append($("<option></option>").attr("value","logarithmic").text("Logarithmic")); }
	if ((Axis.Axis_reversed===true)||(Axis.Axis_reversed=="true")){ $('#plot_yaxisreverse').append($("<option></option>").attr("value","true").text("True")); $('#plot_yaxisreverse').append($("<option></option>").attr("value","false").text("False")); }
	if ((Axis.Axis_reversed===false)||(Axis.Axis_reversed=="false")){ $('#plot_yaxisreverse').append($("<option></option>").attr("value","false").text("False")); $('#plot_yaxisreverse').append($("<option></option>").attr("value","true").text("True")); }
	if ((Axis.Axis_opposite===true)||(Axis.Axis_opposite=="true")){ $('#plot_yaxisopposite').append($("<option></option>").attr("value","true").text("True")); $('#plot_yaxisopposite').append($("<option></option>").attr("value","false").text("False")); }
	if ((Axis.Axis_opposite===false)||(Axis.Axis_opposite=="false")){ $('#plot_yaxisopposite').append($("<option></option>").attr("value","false").text("False")); $('#plot_yaxisopposite').append($("<option></option>").attr("value","true").text("True")); }
	$('#plot_axisoffset').val(Axis.Axis_offset);																													//	\
	$('#plot_yaxiswidth').val(Axis.Axis_lineWidth);																													//	\
	$("#plot_yaxiscolorpicker").spectrum("set", Axis.Axis_linecolor);																								//	\
	if (Axis.Axis_tickinterval!="null") { $("#plot_yaxistickinterval").val(Axis.Axis_tickinterval); }																//	\
	$("#plot_ymajortickpicker").spectrum("set", Axis.Axis_gridcolor);																								//	\
	$("#plot_yminortickpicker").spectrum("set", Axis.Axis_minorgridcolor);																							//	\
	if (Axis.Axis_minortickinterval!="null") { $("#plot_yaxisminortickinterval").val(Axis.Axis_minortickinterval); }												//	\
	if (Axis.Axis_gridlinesonoff=="true") { $('#plot_ygridsonoff').attr('checked','checked'); }else { $('#plot_ygridsonoff').attr('checked',false); }				//	\
	if (Axis.Axis_minorgridlinesonoff=="true") { $('#plot_yminorgridsonoff').attr('checked','checked'); }else { $('#plot_yminorgridsonoff').attr('checked',false); }//	\
	$("#plot_ygridlinewidth").val(Axis.Axis_gridlinewidth);																											//	\
	$("#plot_yminorgridlinewidth").val(Axis.Axis_minorgridlinewidth);																								//	\
//	window[PlotID].Chart_yaxesobj[AxisID]=Axis;																														//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

// This function is called whenever the user selects a new X axis from the left menu or upon the selected of a new plot. It places the properties of the axis in the selection boxes
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function PopulateXAxisData (PlotID, AxisID)																															//	\
{	var Axis=window[PlotID].Chart_xaxesobj[AxisID];																													//	\
	$(".plot_xaxistypeselect, .plot_xaxisreverse").empty();																											//	\
	$('#plot_xaxislabel').val(Axis.Axis_label);																														//	\
	if (Axis.Axis_min!="null") { $('#plot_xaxismin').val(Axis.Axis_min); } 																							//	\
	if (Axis.Axis_max!="null") { $('#plot_xaxismax').val(Axis.Axis_max); } 																							//	\
	if (Axis.Axis_type=="linear"){ $('.plot_xaxistypeselect').append($("<option></option>").attr("value","linear").text("Linear")); $('.plot_xaxistypeselect').append($("<option></option>").attr("value","datetime").text("Date-Time")); $('.plot_xaxistypeselect').append($("<option></option>").attr("value","logarithmic").text("Logarithmic")); }
	if (Axis.Axis_type=="logarithmic"){ $('.plot_xaxistypeselect').append($("<option></option>").attr("value","logarithmic").text("Logarithmic")); $('.plot_xaxistypeselect').append($("<option></option>").attr("value","datetime").text("Date-Time")); $('.plot_xaxistypeselect').append($("<option></option>").attr("value","linear").text("Linear")); }
	if (Axis.Axis_type=="datetime"){ $('.plot_xaxistypeselect').append($("<option></option>").attr("value","datetime").text("Date-Time")); $('.plot_xaxistypeselect').append($("<option></option>").attr("value","linear").text("Linear")); $('.plot_xaxistypeselect').append($("<option></option>").attr("value","logarithmic").text("Logarithmic")); }
	if ((Axis.Axis_reversed===true)||(Axis.Axis_reversed=="true")){ $('#plot_xaxisreverse').append($("<option></option>").attr("value","true").text("True")); $('#plot_xaxisreverse').append($("<option></option>").attr("value","false").text("False")); }
	if ((Axis.Axis_reversed===false)||(Axis.Axis_reversed=="false")){ $('#plot_xaxisreverse').append($("<option></option>").attr("value","false").text("False")); $('#plot_xaxisreverse').append($("<option></option>").attr("value","true").text("True")); }
	$('#plot_xaxiswidth').val(Axis.Axis_lineWidth);																													//	\
	$("#plot_xaxiscolorpicker").spectrum("set", Axis.Axis_linecolor);																								//	\
	if (Axis.Axis_tickinterval!="null") { $("#plot_xaxistickinterval").val(Axis.Axis_tickinterval);	}																//	\
	$("#plot_xmajortickpicker").spectrum("set", Axis.Axis_gridcolor);																								//	\
	$("#plot_xminortickpicker").spectrum("set", Axis.Axis_minorgridcolor);																							//	\
	if (Axis.Axis_minortickinterval!="null") { $("#plot_xaxisminortickinterval").val(Axis.Axis_minortickinterval); }												//	\
	if (Axis.Axis_gridlinesonoff=="true") { $('#plot_xgridsonoff').attr('checked',true); }else { $('#plot_xgridsonoff').attr('checked',false); }					//	\
	if (Axis.Axis_minorgridlinesonoff=="true") { $('#plot_xminorgridsonoff').attr('checked',true); }else { $('#plot_xminorgridsonoff').attr('checked',false); }		//	\
	$("#plot_xgridlinewidth").val(Axis.Axis_gridlinewidth);																											//	\
	$("#plot_xminorgridlinewidth").val(Axis.Axis_minorgridlinewidth);																								//	\
	Axis.Axis_offset=2;																																				//	\
//	window[PlotID].Chart_yaxesobj[AxisID]=Axis;																														//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------- POPULATE THE PLOT VARIABLES --------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function PopulatePlotVariables ()																																	//	\--- This function is called as part of the plot creation process. It looks at the 
{	var candidate_array=new Array();																																//	\--- variables and populates the choices for the user. 
	for (var i in DOM_Object) {  if ((i!="clean")&&(DOM_Object[i].name!="TempEq")) 																					//	\
	{ if (window[i]!=undefined) { if ((window[i].Format_size!="1x1")&&(window[i].Format_size!="1 x 1"))	{ candidate_array.push(i); } }  }	}						//	\
	$("#plot_primaryxaxis").empty();																																//	\
	$("#plot_secondaryxaxis").empty();																																//	\
	$('#plot_primaryxaxis').append($("<option></option>").attr("value","Automatic").text("Automatic")); 															//	\
	$('#plot_secondaryxaxis').append($("<option></option>").attr("value","Automatic").text("Automatic"));															//	\
	candidate_array.forEach(function(entry) 																														//	\
	{ 																																								//	\
		$('#plot_primaryxaxis').append($("<option></option>").attr("value",window[entry].Format_name+'-'+window[entry].Format_id).text(window[entry].Format_name));	//	\ 
		$('#plot_secondaryxaxis').append($("<option></option>").attr("value",window[entry].Format_name+'-'+window[entry].Format_id).text(window[entry].Format_name));//	\
	});																																								//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- FORMAT VARIABLE DATA FOR PLOTTING -------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
PlotData.prototype.FormatVarData= function(axis, id)																												//	\--- This function is called whenever a user selects a variable to be used in a dataset. 
{	var tempdata=''; var counter=0;		var keyarr={};																												//	\--- It goes through the variable and formats it to be read by the plotting software 
	if 			(axis=="x") { this.xdata_plottext=""; var tempid=this.xdata_id; 																					//	\  
	}else if 	(axis=="y") { this.ydata_plottext=""; var tempid=this.ydata_id; 																					//	\  
	}else if 	(axis=="z") { this.zdata_plottext=""; var tempid=this.zdata_id; this.dataobject=window[id].Solution_real; }											//	\ 
	var sizes=window[id].Format_size.split('x');																													//	\
	for (var a=0; a<sizes[1]; a++) 																																	//	\
	{	if ((window[id].Solution_real['0-'+a]==NaN)||(window[id].Solution_real['0-'+a]==Number.POSITIVE_INFINITY)||(window[id].Solution_real['0-'+a]==Number.NEGATIVE_INFINITY)) 
		{	tempdata=tempdata+',0';																																	//	\
		}	else{ tempdata=tempdata+','+window[id].Solution_real['0-'+a];  } 	}																					//	\
	tempdata=tempdata.replace(/^\,/,'');																															//	\
	if 			(axis=="x") { this.xdata_plottext=tempdata; 																										//	\
	}else if 	(axis=="y") { this.ydata_plottext=tempdata; 																										//	\
	}else if 	(axis=="z") { this.zdata_plottext=tempdata; 	}																									//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------- HANDLE LEGEND CHANGES -------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function HandleLegend (id, action)																																	//	\--- This function is called whenever a change is made to the legend layout. The legend is
{																																									//	\--- destroyed, the new parameters are set, and then the legend is recreated with the new
	for (var DataID in window[id].Chart_dataobj)	{																												//	\--- parameters in place.
		window[window[id].Chart_Name].series[window[id].Chart_dataobj[DataID].series].options.showInLegend = false;													//	\
    	window[window[id].Chart_Name].series[window[id].Chart_dataobj[DataID].series].legendItem = null;															//	\
    	window[window[id].Chart_Name].legend.destroyItem(window[window[id].Chart_Name].series[window[id].Chart_dataobj[DataID].series]);							//	\
	}																																								//	\
	window[window[id].Chart_Name].legend.render();																													//	\
	window[id].Legend_xoffset=window[id].Legend_xoffset+"";		window[id].Legend_yoffset=window[id].Legend_yoffset+"";												//	\
	if ((action=="xoffset")||(action=="create")) { window[window[id].Chart_Name].legend.options.x=parseInt(window[id].Legend_xoffset.replace("px",""), 10); }		//	\
	if ((action=="yoffset")||(action=="create")) { window[window[id].Chart_Name].legend.options.y=parseInt(window[id].Legend_yoffset.replace("px",""), 10); }		//	\
	if ((action=="align")||(action=="create")) { window[window[id].Chart_Name].legend.options.align=window[id].Legend_align; }										//	\
	if ((action=="valign")||(action=="create")) { window[window[id].Chart_Name].legend.options.verticalAlign=window[id].Legend_verticalalign; }						//	\
	if ((action=="layout")||(action=="create")) {	window[window[id].Chart_Name].legend.options.layout=window[id].Legend_layout; }									//	\
																																									//	\
	for (var DataID in window[id].Chart_dataobj)	{																												//	\
		window[window[id].Chart_Name].series[window[id].Chart_dataobj[DataID].series].options.showInLegend = true;													//	\
//    	window[window[id].Chart_Name].legend.renderItem(window[window[id].Chart_Name].series[window[id].Chart_dataobj[DataID].series]);								//	\
	}																																								//	\
	window[window[id].Chart_Name].legend.render();																													//	\
	window[id].Format_haschanged=1;																																	//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------ CREATE A NEW Y AXIS FOR A PLOT -------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function CreateNewYAxis (PlotID, AxisID, Default)																													//	\--- This function is called whenever a new axis is to be created. This is done whenever 
{																																									//	\--- a user creates a new plot, or creates a new axis for an existing plot in the left menu.
	window[PlotID].Chart_yaxesobj[AxisID]= new PlotAxis(AxisID, PlotID);																							//	\
	var thisaxis=Object.keys(window[PlotID].Chart_yaxesobj).length-1;																								//	\
	window[PlotID].Chart_yaxesobj[AxisID].Axis_num=thisaxis;																										//	\
	var temp=$('#plot_yaxistemplate').clone();																														//	\
	temp.attr('id',AxisID).addClass('plot_yaxisline');																												//	\
	var name="Y Axis "+thisaxis;																																	//	\
	temp.find('.plot_yaxisname').html(name);																														//	\
	$('#plot_yaxisnames').append(temp);																																//	\
																																									//	\
	window[PlotID].Chart_yaxesobj[AxisID].Axis_xory="Y";																											//	\
	window[PlotID].Chart_yaxesobj[AxisID].Axis_name=name;																											//	\
	window[PlotID].Chart_yaxesobj[AxisID].Axis_label=name;																											//	\
	window[PlotID].Chart_yaxesobj[AxisID].Axis_num=thisaxis;																										//	\
																																									//	\
	if (Default=="0"){ window[window[PlotID].Chart_Name].yAxis[0].update({id:AxisID}); }																			//	\--- If the default is not set to zero, add the axis to the chart itself. 
	if (Default!="0"){ window[window[PlotID].Chart_Name].addAxis({ id: AxisID, title: { text: window[PlotID].Chart_yaxesobj[AxisID].Axis_name },opposite: false });}//	\--- The zero index is passed upon chart creation and we don't add a new 
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- CREATE X AXES FOR PLOT ------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function CreateXAxes (PlotID, AxisID, Default)																														//	\--- This function creates the two X axes for a plot. New X axes cannot be
{																																									//	\--- added later to the plot. The bottom axis is called the primary axis and 
	window[PlotID].Chart_xaxesobj[AxisID]= new PlotAxis(AxisID, PlotID);																							//	\--- the second axis is the secondary axis.
	window[PlotID].Chart_xaxesobj[AxisID].Axis_num=0;																												//	\
																																									//	\
	window[PlotID].Chart_xaxesobj[AxisID].Axis_xory="X";																											//	\*******************************************************
	window[PlotID].Chart_xaxesobj[AxisID].Axis_name="Primary Axis";																									//	\This needs to be fixed to ensure that both axes are saved
	window[PlotID].Chart_xaxesobj[AxisID].Axis_label="Primary Axis";																								//	\*******************************************************
	window[PlotID].Chart_xaxesobj[AxisID].Axis_num=0;																												//	\
	window[PlotID].Chart_xaxesobj[AxisID].Axis_gridlinewidth=0;																										//	\
	window[PlotID].Chart_xaxesobj[AxisID].Axis_linecolor=window[window[PlotID].Chart_Name].xAxis[0].options.lineColor;												//	\
	window[PlotID].Chart_xaxesobj[AxisID].Axis_lineWidth=window[window[PlotID].Chart_Name].xAxis[0].options.lineWidth;												//	\
	window[window[PlotID].Chart_Name].xAxis[0].update({id:AxisID});																									//	\
	$('.plot_xaxisline:eq(0)').attr("id", AxisID);																													//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------- SET THE PLOT LABELS -----------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function SetCategories(PlotID, text)																																//	\--- This was originally set to solve the input
{	if (text!=='')																																					//	\--- just as with the y values. I am not sure why 
	{	window[PlotID].Chart_Labeltext=text;	var labels=new Array();		var count=0;																			//	\--- I had it set that way. It should just separate
		var fileid=$('#filenumber').attr('filenumber');																												//	\--- and display the text.
		var inputarray=InputArray(text);																															//	\
		window[window[PlotID].Chart_Name].xAxis[0].update({categories:inputarray});																					//	\
	}else if (parseInt(window[PlotID].Chart_Labels.length, 10)>0)	{	window[window[PlotID].Chart_Name].xAxis[0].update({categories:window[PlotID].Chart_Labels});}//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------- HANDLING THE DATA AFTER A PLOT TYPE HAS BEEN SELECTED ---------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function Handle_Chart_ShowData(PlotID)																																//	\
{	var PlotID=$("#plot_spec").attr('plotid');																														//	\
	$('.plot_ydatainput, .plot_xdatainput, .plot_seriesname').prop('disabled', true);																				//	\
	for (var DataID in window[PlotID].Chart_dataobj) { DeleteDataSet(PlotID, DataID); }																				//	\
	if (window[window[PlotID].Chart_Name].counters===undefined) { window[window[PlotID].Chart_Name].counters={}; }													//	\
	if ((window[PlotID].Chart_type!="heatmap")&&(window[PlotID].Chart_type!="combo")) 																				//	\
	{	window[window[PlotID].Chart_Name].counters.color=0;		window[window[PlotID].Chart_Name].counters.symbol=0;	}											//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------- HIDE AND SHOW THE PROPER OPTIONS FOR THE CHART TYPE SELECTED -----------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function Handle_Chart_ShowOptions(PlotID)																															//	\
{																																									//	\
	$('#plot_seriestypeselect').hide();																																//	\
	$('.activeplottype').removeClass('activeplottype');																												//	\
	var type=window[PlotID].Chart_type;																																//	\
	if (type=="bar") 		{ $('#select_barchart').addClass('activeplottype'); }																					//	\
	if (type=="line") 		{ $('#select_lineplot').addClass('activeplottype'); }																					//	\
	if (type=="column") 	{ $('#select_columnchart').addClass('activeplottype'); }																				//	\
	if (type=="scatter") 	{ $('#select_scatterchart').addClass('activeplottype'); }																				//	\
	if (type=="area") 		{ $('#select_areachart').addClass('activeplottype'); }																					//	\
	if (type=="spline") 	{ $('#select_splineplot').addClass('activeplottype'); }																					//	\
	if (type=="bubble") 	{ $('#select_bubblechart').addClass('activeplottype'); }																				//	\
	if (type=="combo") 		{ $('#select_combochart').addClass('activeplottype'); }																					//	\
	if (type=="heatmap") 	{ $('#select_heatmap').addClass('activeplottype'); }																					//	\
	if (type=="pie") 		{ $('#select_piechart').addClass('activeplottype'); }																					//	\
	if (type=="donut")	 	{ $('#select_donutchart').addClass('activeplottype'); }																					//	\
	if ((type=="combo")&&($('.plot_dataline_active').attr('id')!==undefined)) 																						//	\
	{	var DataID=$('.plot_dataline_active').attr('id');	$('#plot_seriestype').show();																			//	\
		type=window[PlotID].Chart_dataobj[DataID].Format_type; }else { $('#plot_seriestype').hide(); }																//	\	
																																									//	\	
	$('.simplewrap').hide();																																		//	\
	$('#plotselect, #dataselect, #titleselect, #formatselect, #legendselect').closest('.simplewrap').show('500');													//	\
	$('.plot_plotdatablock').hide();																																//	\
	if ((type=="line")||(type=="scatter")||(type=="spline"))																										//	\
	{	$('#xaxisselect, #yaxisselect, #bandselect, #lineselect').closest('.simplewrap').show('500');																//	\
		$('#plot_datablock1').show();																																//	\
	}																																								//	\
																																									//	\
	if ((type=="bar")||(type=="column"))																															//	\
	{	$('#xaxisselect, #yaxisselect, #bandselect, #lineselect').closest('.simplewrap').show('500');																//	\
		$('#plot_datablock6').show();																																//	\
	}																																								//	\
																																									//	\
	if ((type=="pie")||(type=="donut"))																																//	\
	{	$('#xaxisselect, #yaxisselect, #bandselect, #lineselect').closest('.simplewrap').hide('500');																//	\
		$('#plot_datablock2').show();																																//	\
		$('#plot_datablock2').find('.plot_dataseries').show().find('.plot_datasetappearancesection').hide();														//	\
	}																																								//	\
																																									//	\
	if (type=="combo")																																				//	\	
	{	$('#xaxisselect, #yaxisselect, #bandselect, #lineselect').closest('.simplewrap').show('500');																//	\
		$('#plot_datablock4, #plot_seriestype').show();																												//	\
	}																																								//	\
																																									//	\
	if (type=="heatmap")																																			//	\
	{	$('#xaxisselect, #yaxisselect').closest('.simplewrap').show('500');																							//	\
		$('#legendselect').closest('.simplewrap').hide('500');																										//	\
		$('#plot_datablock5').show();																																//	\
	}																																								//	\
																																									//	\
	if (type=="bubble")																																				//	\
	{	$('#xaxisselect, #yaxisselect, #bandselect, #lineselect').closest('.simplewrap').show('500');																//	\
		$('#plot_datablock8').show();																																//	\
	}																																								//	\
																																									//	\
	if (type=="area")																																				//	\
	{	$('#xaxisselect, #yaxisselect, #bandselect, #lineselect').closest('.simplewrap').show('500');																//	\
		$('#plot_datablock7').show();																																//	\
	}																																								//	\
	if (type=="surface") {	$('#plot_datablock9').show();  	CPLOT=PlotID; window[PlotID].Set_Scene_Props();	 }														//	\
	$('#plot_spec').show();																																			//	\
	$('#equation_spec, #image_spec, #loop_spec, #symeq_spec, #text_spec').hide();																					//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------- ROTATE PLOT -------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function RotatePlot(PlotID, DataID)																																	//	\
{	var Data=window[PlotID].Chart_dataobj[DataID];																													//	\
	window[window[PlotID].Chart_Name].series[Data.series].update({ startAngle: parseFloat(Data.Chart_startangle) }); 												//	\
	window[window[PlotID].Chart_Name].series[Data.series].update({ endAngle: parseFloat(Data.Chart_stopangle) }); }													//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------- CHANGE PLOT LOCATION ----------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function PlotLocation(PlotID, DataID)																																//	\
{	var locdata=window[PlotID].Chart_dataobj[DataID].Chart_location.split(',');																						//	\
	window[window[PlotID].Chart_Name].series[window[PlotID].Chart_dataobj[DataID].series].update({ center: locdata }); }											//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------- CHANGE PLOT SIZE ------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function PlotSize(PlotID, DataID)																																	//	\
{	window[window[PlotID].Chart_Name].series[window[PlotID].Chart_dataobj[DataID].series].update({ size: window[PlotID].Chart_dataobj[DataID].Chart_size+'%' }); }	//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------- CHANGE PLOT INNER SIZE --------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function PlotInnersize(PlotID, DataID)																																//	\
{	var Data=window[PlotID].Chart_dataobj[DataID];																													//	\
	window[window[PlotID].Chart_Name].series[Data.series].update({ innerSize: Data.Chart_innersize+'%' }); }														//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- STACK PLOT -------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function StackPlot(PlotID)																																			//	\
{	if (window[PlotID].Chart_stack=="normal") 																														//	\
	{	for (var a in window[PlotID].Chart_dataobj)																													//	\
		{	window[window[PlotID].Chart_Name].series[window[PlotID].Chart_dataobj[a].series].update({ stacking:true });	}											//	\	
	}else if (window[PlotID].Chart_stack=="percent") 																												//	\
	{	for (var a in window[PlotID].Chart_dataobj)																													//	\
		{	window[window[PlotID].Chart_Name].series[window[PlotID].Chart_dataobj[a].series].update({ stacking:'percent' });	}									//	\
	}else																																							//	\
	{	for (var a in window[PlotID].Chart_dataobj)																													//	\
		{	window[window[PlotID].Chart_Name].series[window[PlotID].Chart_dataobj[a].series].update({ stacking:false });	}										//	\
	}																																								//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------- CHANGE THE SERIES COLOR ---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function ChangeSeriesColor(PlotID, DataID)																															//	\
{	if (window[PlotID].Chart_type=="pie")																															//	\
	{	var series=window[PlotID].Chart_dataobj[DataID]['series'];																									//	\
		for (var IN in window[PlotID].Chart_dataobj[DataID]['piedata'])																								//	\
		{	var thiscolor=window[PlotID].Chart_dataobj[DataID]['piedata'][IN]['color'];																				//	\
			window[window[PlotID].Chart_Name].series[series].data[IN].update({color:thiscolor});	}																//	\
	}else 																																							//	\
	{	var Data=window[PlotID].Chart_dataobj[DataID];																												//	\
		window[window[PlotID].Chart_Name].series[Data.series].options.color = Data.color;																			//	\
		window[window[PlotID].Chart_Name].series[Data.series].update(window[window[PlotID].Chart_Name].series[Data.series].options);								//	\
		window[window[PlotID].Chart_Name].series[Data.series].update({marker:{symbol:Data.symbol,fillColor:Data.fillcolor,lineColor:Data.outlinecolor,radius:Data.markersize}});
	}																																								//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------- SET THE LINE WIDTH ------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function SetLineWidth(PlotID, DataID)  																																//	\
{	var Data=window[PlotID].Chart_dataobj[DataID];																													//	\
	window[window[PlotID].Chart_Name].series[Data.series].update({ lineWidth: Data.lineWidth}); CreatePlot(PlotID); 												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------- DELETE A DATA SET -----------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function DeleteDataSet(PlotID, DataID)																																//	\							
{	window[window[PlotID].Chart_Name].series[parseInt(window[PlotID].Chart_dataobj[DataID].series, 10)].remove(true);												//	\
	var dataindex = window[PlotID].Chart_dataobj[DataID].series;																									//	\ 
	delete window[PlotID].Chart_dataobj[DataID];																													//	\
	for (var thisData in window[PlotID].Chart_dataobj)																												//	\
	{	if (window[PlotID].Chart_dataobj[thisData]['series']>=parseInt(dataindex, 10))																			 	//	\
		{ 	window[PlotID].Chart_dataobj[thisData]['series']=parseInt(window[PlotID].Chart_dataobj[thisData]['series'], 10)-1;										//	\
	}	}																																							//	\
	$('#'+DataID).remove();																																			//	\
	delete DOM_Object[PlotID]['Dependents'][DataID];																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------ SET THE AXIS TYPE --------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function SetAxisType(PlotID, AxisID){																																//	\
	if (window[PlotID].Chart_yaxesobj[AxisID]!==undefined){	var Axis=window[PlotID].Chart_yaxesobj[AxisID]; }else { var Axis=window[PlotID].Chart_xaxesobj[AxisID];}//	\
	if (Axis.Axis_type=="logarithmic") 																																//	\
	{	Axis.Axis_min="null"; Axis.Axis_max="null"; Axis.Axis_tickinterval="null"; Axis.Axis_minortickinterval="null";												//	\
		SetAxisInterval(PlotID, AxisID);																															//	\
		SetAxisMinorInterval(PlotID, AxisID);																														//	\
		SetPlotExtremes(PlotID, AxisID);																															//	\
		if (Axis.Axis_xory=="X") { $('#plot_xaxismin, #plot_xaxismax, #plot_xaxistickinterval, #plot_xaxisminortickinterval').val(''); }							//	\
		if (Axis.Axis_xory=="Y") { $('#plot_yaxismin, #plot_yaxismax, #plot_yaxistickinterval, #plot_yaxisminortickinterval').val(''); }							//	\
		if (Axis.Axis_xory=="X") { $('#plot_xaxismin, #plot_xaxismax, #plot_xaxistickinterval, #plot_xaxisminortickinterval, #plot_xminorgridlinewidth').prop('disabled', true); }
		if (Axis.Axis_xory=="Y") { $('#plot_yaxismin, #plot_yaxismax, #plot_yaxistickinterval, #plot_yaxisminortickinterval, #plot_yminorgridlinewidth').prop('disabled', true); }
	}else																																							//	\
	{																																								//	\
		if (Axis.Axis_xory=="X") { $('#plot_xaxismin, #plot_xaxismax, #plot_xaxistickinterval, #plot_xaxisminortickinterval, #plot_xminorgridlinewidth').prop('disabled', false); }
		if (Axis.Axis_xory=="Y") { $('#plot_yaxismin, #plot_yaxismax, #plot_yaxistickinterval, #plot_yaxisminortickinterval, #plot_yminorgridlinewidth').prop('disabled', false); }
	}																																								//	\
	if (Axis.Axis_xory=="X") { window[window[PlotID].Chart_Name].xAxis[Axis.Axis_num].update({  type: Axis.Axis_type  }); }											//	\
	if (Axis.Axis_xory=="Y") { window[window[PlotID].Chart_Name].yAxis[Axis.Axis_num].update({  type: Axis.Axis_type  }); }											//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------ SET THE PLOT EXTREMES ----------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function SetPlotExtremes (PlotID, AxisID){ 																															//	\
	if (window[PlotID].Chart_yaxesobj[AxisID]!==undefined){	var Axis=window[PlotID].Chart_yaxesobj[AxisID]; }else { var Axis=window[PlotID].Chart_xaxesobj[AxisID];}//	\
	if ((Axis.Axis_min=="null")&&(Axis.Axis_max=="null")) 																											//	\
	{	if (Axis.Axis_xory=="X") { window[window[PlotID].Chart_Name].xAxis[Axis.Axis_num].setExtremes(null, null );  }												//	\
		if (Axis.Axis_xory=="Y") { window[window[PlotID].Chart_Name].yAxis[Axis.Axis_num].setExtremes(null, null );  }												//	\
	}else if ((Axis.Axis_min=="null")&&(Axis.Axis_max!="null")) 																									//	\
	{	if (Axis.Axis_xory=="X") { window[window[PlotID].Chart_Name].xAxis[Axis.Axis_num].setExtremes(null, parseFloat(Axis.Axis_max) );  }							//	\
		if (Axis.Axis_xory=="Y") { window[window[PlotID].Chart_Name].yAxis[Axis.Axis_num].setExtremes(null, parseFloat(Axis.Axis_max) );  }							//	\
	}else if ((Axis.Axis_min!="null")&&(Axis.Axis_max=="null")) 																									//	\
	{	if (Axis.Axis_xory=="X") { window[window[PlotID].Chart_Name].xAxis[Axis.Axis_num].setExtremes(parseFloat(Axis.Axis_min), null );  }							//	\
		if (Axis.Axis_xory=="Y") { window[window[PlotID].Chart_Name].yAxis[Axis.Axis_num].setExtremes(parseFloat(Axis.Axis_min), null );  }							//	\
	}else if ((Axis.Axis_min!="null")&&(Axis.Axis_max!="null")) 																									//	\
	{	if (Axis.Axis_xory=="X") { window[window[PlotID].Chart_Name].xAxis[parseFloat(Axis.Axis_num)].setExtremes(parseFloat(Axis.Axis_min), parseFloat(Axis.Axis_max));}
		if (Axis.Axis_xory=="Y") { window[window[PlotID].Chart_Name].yAxis[parseFloat(Axis.Axis_num)].setExtremes(parseFloat(Axis.Axis_min), parseFloat(Axis.Axis_max));}
	}																																								//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------- SET LOCATION OF THE AXIS -----------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function SetAxisLocation (PlotID, AxisID) 																															//	\
{	if (window[PlotID].Chart_yaxesobj[AxisID]!==undefined){	var Axis=window[PlotID].Chart_yaxesobj[AxisID]; }else { var Axis=window[PlotID].Chart_xaxesobj[AxisID];}//	\
	var series=Axis.Axis_num;																																		//	\
	if ((Axis.Axis_opposite=="true")||(Axis.Axis_opposite===true)) { window[window[PlotID].Chart_Name].yAxis[series].update({  opposite: true  }); 					//	\
	}else{	window[window[PlotID].Chart_Name].yAxis[series].update({  opposite: false  });	}																		//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------- SET THE AXIS INTERVAL ------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function SetAxisInterval(PlotID, AxisID) 																															//	\
{	if (window[PlotID].Chart_yaxesobj[AxisID]!==undefined){	var Axis=window[PlotID].Chart_yaxesobj[AxisID]; }else { var Axis=window[PlotID].Chart_xaxesobj[AxisID];}//	\
	if ((Axis.Axis_tickinterval=="null")||(Axis.Axis_tickinterval=="0")) 																							//	\
	{	if (Axis.Axis_xory=="Y") { window[window[PlotID].Chart_Name].yAxis[parseInt(Axis.Axis_num, 10)].options.tickInterval=null; } 								//	\
		if (Axis.Axis_xory=="X") { window[window[PlotID].Chart_Name].xAxis[parseInt(Axis.Axis_num, 10)].options.tickInterval=null; } 								//	\
	}else																																							//	\
	{	if ((Axis.Axis_xory=="Y")) { window[window[PlotID].Chart_Name].yAxis[parseInt(Axis.Axis_num, 10)].options.tickInterval=parseFloat(Axis.Axis_tickinterval);}	//	\
		if ((Axis.Axis_xory=="X")) { window[window[PlotID].Chart_Name].xAxis[parseInt(Axis.Axis_num, 10)].options.tickInterval=parseFloat(Axis.Axis_tickinterval);}	//	\
	}																																								//	\
	window[window[PlotID].Chart_Name].render();																														//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------- SET THE AXIS MINOR INTERVAL --------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function SetAxisMinorInterval(PlotID, AxisID) 																														//	\
{	if (window[PlotID].Chart_yaxesobj[AxisID]!==undefined){	var Axis=window[PlotID].Chart_yaxesobj[AxisID]; }else { var Axis=window[PlotID].Chart_xaxesobj[AxisID];}//	\
	if ((Axis.Axis_minortickinterval=="null")||(Axis.Axis_tickinterval=="0"))																						//	\
	{	if (Axis.Axis_xory=="Y") { window[window[PlotID].Chart_Name].yAxis[parseInt(Axis.Axis_num, 10)].options.minorTickInterval=null; } 							//	\
		if (Axis.Axis_xory=="X") { window[window[PlotID].Chart_Name].xAxis[parseInt(Axis.Axis_num, 10)].options.minorTickInterval=null; } 							//	\
	}else																																							//	\
	{	if (Axis.Axis_xory=="Y") { window[window[PlotID].Chart_Name].yAxis[parseInt(Axis.Axis_num, 10)].options.minorTickInterval=parseFloat(Axis.Axis_minortickinterval); } 
		if (Axis.Axis_xory=="X") { window[window[PlotID].Chart_Name].xAxis[parseInt(Axis.Axis_num, 10)].options.minorTickInterval=parseFloat(Axis.Axis_minortickinterval); } 		
	}																																								//	\
	window[window[PlotID].Chart_Name].render();																														//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------- SET THE AXIS FOR A DATASET -------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function SetDataAxis(PlotID, DataID) { 																																//	\
	var Data=window[PlotID].Chart_dataobj[DataID];																													//	\
	if (Data.Axis_xory=="X") { window[window[PlotID].Chart_Name].series[Data.series].update({ xAxis: Data.xaxis}); CreatePlot(PlotID, DataID); }					//	\
	if (Data.Axis_xory=="Y") { window[window[PlotID].Chart_Name].series[Data.series].update({ yAxis: Data.yaxis}); CreatePlot(PlotID, DataID); }					//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------ SET THE TITLE OF THE AXIS ------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function SetAxisTitle (PlotID, AxisID){ 																															//	\
	if (window[PlotID].Chart_yaxesobj[AxisID]!==undefined){	var Axis=window[PlotID].Chart_yaxesobj[AxisID]; }else { var Axis=window[PlotID].Chart_xaxesobj[AxisID];}//	\
	if (Axis.Axis_xory=="X") { window[window[PlotID].Chart_Name].xAxis[Axis.Axis_num].setTitle({ text: Axis.Axis_label }); }										//	\
	if (Axis.Axis_xory=="Y") { window[window[PlotID].Chart_Name].yAxis[Axis.Axis_num].setTitle({ text: Axis.Axis_label }); }										//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------- REVERSE OF UNREVERSE THE AXIS-----------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function SetAxisReverse (PlotID, AxisID){ 																															//	\
	if (window[PlotID].Chart_yaxesobj[AxisID]!==undefined){	var Axis=window[PlotID].Chart_yaxesobj[AxisID]; }else { var Axis=window[PlotID].Chart_xaxesobj[AxisID];}//	\
	if ((AxisID.Axis_xory=="X")&&(AxisID.Axis_reversed=="true")) { window[window[PlotID].Chart_Name].xAxis[AxisID.Axis_num].update({ reversed: true }); }			//	\
	if ((AxisID.Axis_xory=="X")&&(AxisID.Axis_reversed=="false")) { window[window[PlotID].Chart_Name].xAxis[AxisID.Axis_num].update({ reversed: false }); }			//	\
	if ((AxisID.Axis_xory=="Y")&&(AxisID.Axis_reversed=="true")) { window[window[PlotID].Chart_Name].yAxis[AxisID.Axis_num].update({ reversed: true }); }			//	\
	if ((AxisID.Axis_xory=="Y")&&(AxisID.Axis_reversed=="false")) { window[window[PlotID].Chart_Name].yAxis[AxisID.Axis_num].update({ reversed: false }); }			//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------ SET THE AXIS WIDTH -------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function SetAxisWidth (PlotID, AxisID){																																//	\
	if (window[PlotID].Chart_yaxesobj[AxisID]!==undefined){	var Axis=window[PlotID].Chart_yaxesobj[AxisID]; }else { var Axis=window[PlotID].Chart_xaxesobj[AxisID];}//	\
	if (Axis.Axis_xory=="X") { window[window[PlotID].Chart_Name].xAxis[Axis.Axis_num].update({  lineWidth: Axis.Axis_lineWidth }); }								//	\
	if (Axis.Axis_xory=="Y") { window[window[PlotID].Chart_Name].yAxis[Axis.Axis_num].update({  lineWidth: Axis.Axis_lineWidth }); }								//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------- SET AXIS COLOR ---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function SetAxisColor (PlotID, AxisID){ 																															//	\
	if (window[PlotID].Chart_yaxesobj[AxisID]!==undefined){	var Axis=window[PlotID].Chart_yaxesobj[AxisID]; }else { var Axis=window[PlotID].Chart_xaxesobj[AxisID];}//	\
	if (Axis.Axis_xory=="X") { window[window[PlotID].Chart_Name].xAxis[Axis.Axis_num].update({  lineColor: Axis.Axis_linecolor }); }								//	\
	if (Axis.Axis_xory=="Y") { window[window[PlotID].Chart_Name].yAxis[Axis.Axis_num].update({  lineColor: Axis.Axis_linecolor }); }								//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------- SET AXIS OFFSET --------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function SetAxisOffset (PlotID, AxisID){																															//	\
	if (window[PlotID].Chart_yaxesobj[AxisID]!==undefined){	var Axis=window[PlotID].Chart_yaxesobj[AxisID]; }else { var Axis=window[PlotID].Chart_xaxesobj[AxisID];}//	\
	window[window[PlotID].Chart_Name].yAxis[Axis.Axis_num].update({  offset: Axis.Axis_offset }); }																	//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------- CHANGE AXIS MAJOR COLOR ------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function ChangeAxisMajorColor(PlotID, AxisID)																														//	\
{	if (window[PlotID].Chart_yaxesobj[AxisID]!==undefined){	var Axis=window[PlotID].Chart_yaxesobj[AxisID]; }else { var Axis=window[PlotID].Chart_xaxesobj[AxisID];}//	\
	if (Axis.Axis_xory=="X") { window[window[PlotID].Chart_Name].xAxis[Axis.Axis_num].update({  gridLineColor: Axis.Axis_gridcolor, gridLineWidth:parseInt(Axis.Axis_gridlinewidth, 10) }); }
	if (Axis.Axis_xory=="Y") { window[window[PlotID].Chart_Name].yAxis[Axis.Axis_num].update({  gridLineColor: Axis.Axis_gridcolor, gridLineWidth:parseInt(Axis.Axis_gridlinewidth, 10) }); }	
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------- CHANGE AXIS MINOR COLOR -------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function ChangeAxisMinorColor(PlotID, AxisID)																														//	\
{	if (window[PlotID].Chart_yaxesobj[AxisID]!==undefined){	var Axis=window[PlotID].Chart_yaxesobj[AxisID]; }else { var Axis=window[PlotID].Chart_xaxesobj[AxisID];}//	\
	if (Axis.Axis_xory=="X") { window[window[PlotID].Chart_Name].xAxis[Axis.Axis_num].update({  minorGridLineColor: Axis.Axis_minorgridcolor }); }					//	\
	if (Axis.Axis_xory=="Y") { window[window[PlotID].Chart_Name].yAxis[Axis.Axis_num].update({  minorGridLineColor: Axis.Axis_minorgridcolor }); }					//	\
	SetAxisMinorInterval(PlotID, AxisID) 																															//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------- CHANGE COLORAXIS EXTREMES -----------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function ChangeCAxis(PlotID)																																		//	\
{	window[window[PlotID].Chart_Name].colorAxis['0'].setExtremes($('.plot_lowlimit').val(), $('.plot_highlimit').val());											//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------- TURN GRID LINES ON/OFF -------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function GridLines(PlotID, AxisID)																																	//	\
{	if (window[PlotID].Chart_yaxesobj[AxisID]!==undefined){	var Axis=window[PlotID].Chart_yaxesobj[AxisID]; }else { var Axis=window[PlotID].Chart_xaxesobj[AxisID];}//	\
	if ((Axis.Axis_xory=="X")&&(Axis.Axis_gridlinesonoff=="true")) { window[window[PlotID].Chart_Name].xAxis[Axis.Axis_num].update({  gridLineColor: Axis.Axis_gridcolor, gridLineWidth: parseInt(Axis.Axis_gridlinewidth, 10) });  }
	if ((Axis.Axis_xory=="Y")&&(Axis.Axis_gridlinesonoff=="true")) { window[window[PlotID].Chart_Name].yAxis[Axis.Axis_num].update({  gridLineColor: Axis.Axis_gridcolor, gridLineWidth: parseInt(Axis.Axis_gridlinewidth, 10) }); }
	if ((Axis.Axis_xory=="X")&&(Axis.Axis_gridlinesonoff=="false")) { window[window[PlotID].Chart_Name].xAxis[Axis.Axis_num].update({  gridLineColor: Axis.Axis_gridcolor, gridLineWidth: 0 });  }
	if ((Axis.Axis_xory=="Y")&&(Axis.Axis_gridlinesonoff=="false")) { window[window[PlotID].Chart_Name].yAxis[Axis.Axis_num].update({  gridLineColor: Axis.Axis_gridcolor, gridLineWidth: 0 }); }
	SetAxisInterval(PlotID, AxisID);																																//	\
	SetAxisMinorInterval(PlotID, AxisID);																															//	\
	window[window[PlotID].Chart_Name].render();																														//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------- TURN MINOR GRID LINES ON/OFF --------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function MinorGridLines(PlotID, AxisID)																																//	\
{	if (window[PlotID].Chart_yaxesobj[AxisID]!==undefined){	var Axis=window[PlotID].Chart_yaxesobj[AxisID]; }else { var Axis=window[PlotID].Chart_xaxesobj[AxisID];}//	\
	if ((Axis.Axis_xory=="X")&&(Axis.Axis_minorgridlinesonoff=="true")) { window[window[PlotID].Chart_Name].xAxis[Axis.Axis_num].update({  minorGridLineColor: Axis.Axis_minorgridcolor, minorGridLineWidth: parseInt(Axis.Axis_minorgridlinewidth, 10) });  }
	if ((Axis.Axis_xory=="Y")&&(Axis.Axis_minorgridlinesonoff=="true")) { window[window[PlotID].Chart_Name].yAxis[Axis.Axis_num].update({  minorGridLineColor: Axis.Axis_minorgridcolor, minorGridLineWidth: parseInt(Axis.Axis_minorgridlinewidth, 10) }); }
	if ((Axis.Axis_xory=="X")&&(Axis.Axis_minorgridlinesonoff=="false")) { window[window[PlotID].Chart_Name].xAxis[Axis.Axis_num].update({ minorGridLineColor: Axis.Axis_minorgridcolor, minorGridLineWidth: 0 });  }
	if ((Axis.Axis_xory=="Y")&&(Axis.Axis_minorgridlinesonoff=="false")) { window[window[PlotID].Chart_Name].yAxis[Axis.Axis_num].update({ minorGridLineColor: Axis.Axis_minorgridcolor, minorGridLineWidth: 0 }); }
	SetAxisInterval(PlotID, AxisID);																																//	\
	SetAxisMinorInterval(PlotID, AxisID);																															//	\
	window[window[PlotID].Chart_Name].render();																														//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------- SET GRID LINE WIDTH ---------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function GridLineWidth(PlotID, AxisID)																																//	\
{	if (window[PlotID].Chart_yaxesobj[AxisID]!==undefined){	var Axis=window[PlotID].Chart_yaxesobj[AxisID]; }else { var Axis=window[PlotID].Chart_xaxesobj[AxisID];}//	\
	if (Axis.Axis_xory=="X") { window[window[PlotID].Chart_Name].xAxis[Axis.Axis_num].update({  gridLineColor: Axis.Axis_gridcolor, gridLineWidth: Axis.Axis_gridlinewidth });  }
	if (Axis.Axis_xory=="Y") { window[window[PlotID].Chart_Name].yAxis[Axis.Axis_num].update({  gridLineColor: Axis.Axis_gridcolor, gridLineWidth: Axis.Axis_gridlinewidth }); }
	MinorGridLineWidth(PlotID, AxisID);																																//	\
	SetAxisInterval(PlotID, AxisID);																																//	\
	window[window[PlotID].Chart_Name].render();																														//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------ SET THE MINOR GRID LINE WIDTH --------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function MinorGridLineWidth(PlotID, AxisID)																															//	\
{	if (window[PlotID].Chart_yaxesobj[AxisID]!==undefined){	var Axis=window[PlotID].Chart_yaxesobj[AxisID]; }else { var Axis=window[PlotID].Chart_xaxesobj[AxisID];}//	\
	if (Axis.Axis_xory=="X") { window[window[PlotID].Chart_Name].xAxis[Axis.Axis_num].update({  gridLineColor: Axis.Axis_gridcolor, minorGridLineWidth: Axis.Axis_minorgridlinewidth });  }
	if (Axis.Axis_xory=="Y") { window[window[PlotID].Chart_Name].yAxis[Axis.Axis_num].update({  gridLineColor: Axis.Axis_gridcolor, minorGridLineWidth: Axis.Axis_minorgridlinewidth }); }
	MinorGridLines(PlotID, AxisID);																																	//	\
	SetAxisMinorInterval(PlotID, AxisID);																															//	\
	SetAxisInterval(PlotID, AxisID);																																//	\
	window[window[PlotID].Chart_Name].render();																														//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------- ADD A TEXT ITEM ---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function DrawPlotText(PlotID, TextID)																																//	|
{	if(window[PlotID].Chart_textobj[TextID]['textElement']!==undefined)                                                                                             //  |
    {   if (Object.keys((window[PlotID].Chart_textobj[TextID]['textElement'])).length>0){ window[PlotID].Chart_textobj[TextID]['textElement'].destroy(); }	  }    	//	|
	var thisText=window[PlotID].Chart_textobj[TextID]['textFormattedText'];                                                                                         //  |
    var X=window[PlotID].Chart_textobj[TextID]['textXLoc'];                                                                                                         //  |
    var Y=window[PlotID].Chart_textobj[TextID]['textYLoc'];                                                                                                         //  |
    var color=window[PlotID].Chart_textobj[TextID]['textColor'];                                                                                                    //  |
    var size=window[PlotID].Chart_textobj[TextID]['textSize'];                                                                                                      //  |
    var rot=window[PlotID].Chart_textobj[TextID]['textRotAng'];                                                                                                     //  |
    window[PlotID].Chart_textobj[TextID]['textElement']=window[window[PlotID]['Chart_Name']].renderer.text(thisText, X, Y).css({color: '#'+color, fontSize: size }).attr({rotation:rot, zIndex:9999}).add();
}																																									//	|
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------- POPULATE PLOT BAND DATA ----------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function PopulateBandData (PlotID, BandID)																															//	\
{	var Band=window[PlotID].Chart_bandsobj[BandID];																													//	\
	$('#plot_bandstart').val(Band.Band_start);																														//	\
	$('#plot_bandend').val(Band.Band_end);																															//	\
	$("#plot_bandcolor").spectrum("set", Band.color);																												//	\
	$('#plot_bandaxis').empty();																																	//	\
	if (window[PlotID].Chart_xaxesobj[Band.Axis_id]!==undefined)																									//	\
	{	$('.plot_bandaxis').append($("<option></option>").attr("value",Band.Axis_id).text(window[PlotID].Chart_xaxesobj[Band.Axis_id].Axis_name));	}				//	\
	if (window[PlotID].Chart_yaxesobj[Band.Axis_id]!==undefined)																									//	\
	{	$('.plot_bandaxis').append($("<option></option>").attr("value",Band.Axis_id).text(window[PlotID].Chart_yaxesobj[Band.Axis_id].Axis_name));	}				//	\
	for(var AxisID in window[PlotID].Chart_yaxesobj){ 																												//	\
		if (Band.Axis_id!=AxisID) 																																	//	\
		{ 	$('.plot_bandaxis').append($("<option></option>").attr("value",AxisID).text(window[PlotID].Chart_yaxesobj[AxisID].Axis_name)); }						//	\
	} 																																								//	\
	for(var AxisID in window[PlotID].Chart_xaxesobj){ 																												//	\
		if (Band.Axis_id!=AxisID) 																																	//	\
		{ $('.plot_bandaxis').append($("<option></option>").attr("value",AxisID).text(window[PlotID].Chart_xaxesobj[AxisID].Axis_name)); }							//	\
	} 																																								//	\
	window[PlotID].Chart_bandsobj[BandID]=Band;																														//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------- DELETE A PLOT BAND ---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function DeletePlotBand(PlotID, BandID)																																//	\
{	var Band=window[PlotID].Chart_bandsobj[BandID];																													//	\
	if (window[PlotID].Chart_xaxesobj[Band.Axis_id]!==undefined) 																									//	\
	{	window[window[PlotID].Chart_Name].xAxis[window[PlotID].Chart_xaxesobj[Band.Axis_id].Axis_num].removePlotBand(BandID); }										//	\
	if (window[PlotID].Chart_yaxesobj[Band.Axis_id]!==undefined) 																									//	\
	{	window[window[PlotID].Chart_Name].yAxis[window[PlotID].Chart_yaxesobj[Band.Axis_id].Axis_num].removePlotBand(BandID); }										//	\
	delete window[PlotID].Chart_bandsobj[BandID];																													//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------- CHANGE PLOT BAND DATA -------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function ChangeBandData(PlotID, BandID)																																//	\
{	var Band=window[PlotID].Chart_bandsobj[BandID];																													//	\
	var Axis1=window[PlotID].Chart_xaxesobj;																														//	\
	var Axis2=window[PlotID].Chart_yaxesobj;																														//	\
	if (Axis1[Band.Axis_id]!==undefined) { window[window[PlotID].Chart_Name].xAxis[Axis1[Band.Axis_id].Axis_num].removePlotBand(BandID); 	}						//	\
	if (Axis2[Band.Axis_id]!==undefined) { window[window[PlotID].Chart_Name].yAxis[Axis2[Band.Axis_id].Axis_num].removePlotBand(BandID); 	}						//	\
	if (Band.newAxis_id!==undefined) {	Band.Axis_id=Band.newAxis_id;	delete Band.newAxis_id; }																	//	\
	if (Axis1[Band.Axis_id]!==undefined) { 																															//	\
		if (Axis1[Band.Axis_id].Axis_xory=="X") {																													//	\
			window[window[PlotID].Chart_Name].xAxis[Axis1[Band.Axis_id].Axis_num].addPlotBand({from: Band.Band_start, to: Band.Band_end, color: Band.color, id: BandID });	
		}																																							//	\
	}																																								//	\
	if (Axis2[Band.Axis_id]!==undefined) { 																															//	\
		if (Axis2[Band.Axis_id].Axis_xory=="Y") {																													//	\
			window[window[PlotID].Chart_Name].yAxis[Axis2[Band.Axis_id].Axis_num].addPlotBand({from: Band.Band_start, to: Band.Band_end, color: Band.color, id: BandID });	
		}																																							//	\
	}																																								//	\
	window[PlotID].Chart_bandsobj[BandID]=Band;																														//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function PopulateLineData (PlotID, LineID)																															//	\
{	var Line=window[PlotID].Chart_linesobj[LineID];																													//	\
	$('#plot_linevalue').val(Line.Line_value);																														//	\
	$('#plot_linewidth').val(Line.Line_width);																														//	\
	$("#plot_linecolor").spectrum("set", Line.color);																												//	\
	$('#plot_lineaxis').empty();																																	//	\
	if (window[PlotID].Chart_xaxesobj[Line.Axis_id]!==undefined)																									//	\
	{	$('.plot_lineaxis').append($("<option></option>").attr("value",Line.Axis_id).text(window[PlotID].Chart_xaxesobj[Line.Axis_id].Axis_name));	}				//	\
	if (window[PlotID].Chart_yaxesobj[Line.Axis_id]!==undefined)																									//	\
	{	$('.plot_lineaxis').append($("<option></option>").attr("value",Line.Axis_id).text(window[PlotID].Chart_yaxesobj[Line.Axis_id].Axis_name));	}				//	\
	for(var AxisID in window[PlotID].Chart_yaxesobj){ 																												//	\
		if (Line.Axis_id!=AxisID) 																																	//	\
		{ 	$('.plot_lineaxis').append($("<option></option>").attr("value",AxisID).text(window[PlotID].Chart_yaxesobj[AxisID].Axis_name)); }						//	\
	} 																																								//	\
	for(var AxisID in window[PlotID].Chart_xaxesobj){ 																												//	\
		if (Line.Axis_id!=AxisID) 																																	//	\
		{ $('.plot_lineaxis').append($("<option></option>").attr("value",AxisID).text(window[PlotID].Chart_xaxesobj[AxisID].Axis_name)); }							//	\
	}																																								//	\
	window[PlotID].Chart_linesobj[LineID]=Line;																														//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function DeletePlotLine(PlotID, LineID)																																//	\
{	var Line=window[PlotID].Chart_linesobj[LineID];																													//	\
	if (window[PlotID].Chart_xaxesobj[Line.Axis_id]!==undefined) {window[window[PlotID].Chart_Name].xAxis[window[PlotID].Chart_xaxesobj[Line.Axis_id].Axis_num].removePlotLine(LineID); }	//	\
	if (window[PlotID].Chart_yaxesobj[Line.Axis_id]!==undefined) {window[window[PlotID].Chart_Name].yAxis[window[PlotID].Chart_yaxesobj[Line.Axis_id].Axis_num].removePlotLine(LineID); }	//	\
	delete window[PlotID].Chart_linesobj[LineID];																													//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function ChangeLineData(PlotID, LineID)																																//	\
{	var Line=window[PlotID].Chart_linesobj[LineID];																													//	\
	var Axis1=window[PlotID].Chart_xaxesobj;																														//	\
	var Axis2=window[PlotID].Chart_yaxesobj;																														//	\
	if (Axis1[Line.Axis_id]!==undefined) { window[window[PlotID].Chart_Name].xAxis[Axis1[Line.Axis_id].Axis_num].removePlotLine(LineID); 	}						//	\
	if (Axis2[Line.Axis_id]!==undefined) { window[window[PlotID].Chart_Name].yAxis[Axis2[Line.Axis_id].Axis_num].removePlotLine(LineID); 	}						//	\
	if (Line.newAxis_id!==undefined) {	Line.Axis_id=Line.newAxis_id;	delete Line.newAxis_id; }																	//	\
	if (Axis1[Line.Axis_id]!==undefined) { 																															//	\
		if (Axis1[Line.Axis_id].Axis_xory=="X") {																													//	\
			window[window[PlotID].Chart_Name].xAxis[Axis1[Line.Axis_id].Axis_num].addPlotLine({value: Line.Line_value, width: Line.Line_width, color: Line.color, id: LineID });	
		}																																							//	\
	}																																								//	\
	if (Axis2[Line.Axis_id]!==undefined) { 																															//	\
		if (Axis2[Line.Axis_id].Axis_xory=="Y") {																													//	\
			window[window[PlotID].Chart_Name].yAxis[Axis2[Line.Axis_id].Axis_num].addPlotLine({value: Line.Line_value, width: Line.Line_width, color: Line.color, id: LineID });	
		}																																							//	\
	}																																								//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------- MAKE A BIG NEW CHART -------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function MakeBigChart(callback)																																		//	\
{	var mylocation=$(location).attr('href').split('/');																												//	\
	if (mylocation[3]=="Charts")																																	//	\
	{	var PlotID=mylocation[4];																																	//	\
		var fileid=mylocation[4];																																	//	\
		var temp='<div class="plot_block" id="'+PlotID+'"><div class="plot_holder"></div></div>';																	//	\
		$('#chart_wrapper').append(temp);																															//	\
		$('#chart_wrapper').height($(window).height()).width($(window).width());																					//	\
		$('#chart_wrapper').find('.plot_block').height($(window).height()).width($(window).width());																//	\
		$('#chart_wrapper').find('.plot_holder').height($(window).height()).width($(window).width());																//	\
		$('#MainBody').css('margin-left','0px').css('margin-right','0px');																							//	\
		$('#main_contents').css('margin-left','0px').css('margin-right','0px');																						//	\
		$('#OpenLeft, #main_leftcolumn, #clicktotopenter').hide();																									//	\
		$('#'+PlotID).css('width','');																																//	\
		$('.titleblock, .subtitleblock, .icon_holder').hide();																										//	\
		CreatePlot(PlotID, function() { ResizeChart(PlotID)});																										//	\
		$('#MainBody').show();																																		//	\
		document.title=window[PlotID].Title_text;																													//	\
	}else { callback(); }																																			//	\
}																																									//	\
function ResizeChart(PlotID)																																		//	\
{	window[window[PlotID].Chart_Name].setSize(chartWidth = $(window).width(), chartHeight = $(window).height());													//	\
	$('#'+PlotID).closest('.main_item').css('width',$(window).width());																								//	\
	$('#'+PlotID).closest('.main_item').css('height',$(window).height());																							//	\
	$('#'+PlotID).closest('.plot_block').css('width',$(window).width());																							//	\
	$('#'+PlotID).closest('.plot_block').css('height',$(window).height());																							//	\
	$('#'+PlotID).css('width',$(window).width());																													//	\
	$('#'+PlotID).css('height',$(window).height());																													//	\	
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------- Event Handlers for the Plots ----------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------- SURFACE MAPS --------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------- CALL THE SOLVER FOR THE EQUATION ---------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the function that actually calls the web worker to solve the equation.																						\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function solveSurfaceData(PlotID, DataID, plotObject, axis)																											//	\
{	Create_EqObj(PlotID, function() { 																																//	\
	callSurfaceSolver(PlotID, DataID, plotObject, axis) });							 																				//	\
}																																									//	\
function callSurfaceSolver(PlotID, DataID, plotObject, axis)																										//	\
{	var surfaceWorker = new Worker("http://www.cadwolf.com/js/EquationSolver.js");																					//	\
	surfaceWorker.postMessage({																																		//	\
		"cadwolfType":"SolveSurfaceData", 																															//	\
		"dataObject":JSON.parse(JSON.stringify(window[PlotID]['Chart_dataobj'])),																					//	\
		"axis":axis,																																				//	\
		"PlotID":PlotID,																																			//	\
		"DataID":DataID,																																			//	\
		"Units_Object":Units_Object,																																//	\
		"ParseUnits":ParseUnits,																																	//	\
		"ImportedFunctions":ImportedFunctions,																														//	\
		"FileInputs":FileInputs,																																	//	\
		"type":"singleAxis",																																		//	\
		"FileID":$('#filenumber').attr('filenumber'),																												//	\
		"divideColorMap":window[PlotID]['divideColormap'],																											//	\
		"colorMap":window[PlotID].Props.Legend.colorMap,																											//	\
		"numberOfColors":window[PlotID].Props.Legend.numberOfColors,																								//	\
		"EqObj":window[PlotID]['EqObj']																																//	\
	});																																								//	\
	surfaceWorker.onmessage = function(e) {																															//	\
		returnObject=e.data;																																		//	\
		var PlotID=returnObject['PlotID'];																															//	\
		dataObj=returnObject['dataObject'];																															//	\
		for (var DataID in dataObj)																																	//	\
		{	window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['colorsNeedUpdate']=true;																	//	\
			window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['elementsNeedUpdate']=true;																	//	\
			window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['groupsNeedUpdate']=true;																	//	\
			window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['verticesNeedUpdate']=true;																	//	\
			surfObj=new THREE.Geometry();																															//	\
			for (var objProp in dataObj[DataID]) { if(objProp!="surfaceGeometry") { window[PlotID]['Chart_dataobj'][DataID][objProp]=dataObj[DataID][objProp]; } }	//	\
			surfObj['vertices']=[];																																	//	\
			surfObj['faces']=[];																																	//	\
			for (var index in dataObj[DataID]['surfaceGeometry']['vertices'])																						//	\
			{	var x=dataObj[DataID]['surfaceGeometry']['vertices'][index]['x'];																					//	\
				var y=dataObj[DataID]['surfaceGeometry']['vertices'][index]['y'];																					//	\
				var z=dataObj[DataID]['surfaceGeometry']['vertices'][index]['z'];																					//	\
				surfObj['vertices'][index]=new THREE.Vector3(x, y, z); 																								//	\
			}																																						//	\	
			for (var index in dataObj[DataID]['surfaceGeometry']['faces'])																							//	\
			{	var a=dataObj[DataID]['surfaceGeometry']['faces'][index]['a'];																						//	\
				var b=dataObj[DataID]['surfaceGeometry']['faces'][index]['b'];																						//	\
				var c=dataObj[DataID]['surfaceGeometry']['faces'][index]['c'];																						//	\
				surfObj['faces'][index]=new THREE.Face3(a, b, c); 																									//	\
				surfObj['faces'][index]['vertexColors']=dataObj[DataID]['surfaceGeometry']['faces'][index]['vertexColors']; 										//	\
			}																																						//	\	
			surfObj.computeBoundingBox();																															//	\
			for (var index in dataObj[DataID]['surfaceGeometry']['colors'])																							//	\
			{	var r=dataObj[DataID]['surfaceGeometry']['colors'][index]['r'];																						//	\
				var g=dataObj[DataID]['surfaceGeometry']['colors'][index]['g'];																						//	\
				var b=dataObj[DataID]['surfaceGeometry']['colors'][index]['b'];																						//	\
				surfObj['colors'][index]=new THREE.Color(r, g, b); 																									//	\
			}																																						//	\	
			window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']=surfObj;																						//	\
			for (var objProp in dataObj[DataID]['surfaceGeometry']) 																								//	\
			{ 	if ((objProp!="vertices")&&(objProp!="faces")&&(objProp!="colors")) 																				//	\
				{	window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry'][objProp]=dataObj[DataID]['surfaceGeometry'][objProp];  }  }							//	\
			wireMaterial = new THREE.MeshBasicMaterial( {vertexColors: THREE.VertexColors, side:THREE.DoubleSide } );												//	\
			graphMesh = new THREE.Mesh( window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry, wireMaterial );													//	\
			graphMesh.doubleSided = true;																															//	\
			graphMesh.id = DataID;																																	//	\
			graphMesh.name = DataID;																																//	\
			window[PlotID].Scene.add(graphMesh);																													//	\
		}																																							//	\	
		window[PlotID].Set_Scene_Props();																															//	\
		window[PlotID]['Props']['xMax']=returnObject['Props']['xMax'];																								//	\
		window[PlotID]['Props']['yMax']=returnObject['Props']['yMax'];																								//	\
		window[PlotID]['Props']['zMax']=returnObject['Props']['zMax'];																								//	\
		window[PlotID]['Props']['xMin']=returnObject['Props']['xMin'];																								//	\
		window[PlotID]['Props']['yMin']=returnObject['Props']['yMin'];																								//	\
		window[PlotID]['Props']['zMin']=returnObject['Props']['zMin'];																								//	\
		window[PlotID].Clear_Scene( PlotID, 																														//	\
		function(){window[PlotID].resetSurfaceColors(																												//	\
		function(){window[PlotID].Set_Meshes( PlotID,																												//	\
		function(){window[PlotID].Set_Legend( PlotID,																												//	\
		function(){window[PlotID].Set_Positions( PlotID,																											//	\
		function(){window[PlotID].Make_Planes( 																														//	\
		function(){window[PlotID].Render(PlotID); }); });  }); }) }); });																							//	\
		surfaceWorker.terminate();																																	//	\
		surfaceWorker=undefined;																																	//	\		
		CPLOT=PlotID;																																				//	\
		animate();																																					//	\
	}																																								//	\	
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------- THE SURFACE MAP OBJECT ----------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function Surface (id) 																																				//	\
{ 																																									//	\
	this.Format_id=id;																																				// 	\
	this.Format_haschanged=1;																																		//	\
	this.Page_position=0;																																			//	\
	this.Page_parentid="none";																																		//	\
	this.Page_topparentid="none";																																	//	\
	this.Props={};																																					//	\
	this.Props.screen_width='800';																																	//	\
	this.Props.screen_height='600';																																	//	\
	this.Props.view_angle=45;																																		//	\
	this.Props.aspect=this.Props.screen_width/this.Props.screen_height;																								//	\
	this.Props.near=0.1;																																			//	\
	this.Props.far=20000;																																			//	\
	this.Props.xLength=0;																																			//	\
	this.Props.yLength=0;																																			//	\
	this.Props.zLength=0;																																			//	\
	this.Props.xMax=0;																																				//	\
	this.Props.yMax=0;																																				//	\
	this.Props.zMax=0;																																				//	\
	this.Props.xRot=0;																																				//	\
	this.Props.yRot=0;																																				//	\
	this.Props.zRot=0;																																				//	\
	this.Props.xPos=0;																																				//	\
	this.Props.yPos=0;																																				//	\
	this.Props.zPos=0;																																				//	\
	this.Props.xCamPos=0;																																			//	\
	this.Props.yCamPos=0;																																			//	\
	this.Props.zCamPos=0;																																			//	\
	this.Props.divideColormap=0;																																	//	\
	this.Props.Legend={};																																			//	\
	this.Props.Legend.colorMap='rainbow';																															//	\
	this.Props.Legend.numberOfColors=32;																															//	\
	this.Props.Legend.onOff=1;																																		//	\
	this.Props.Legend.layout='horizontal';																															//	\
	this.Props.Legend.show=0;																																		//	\
	this.Chart_type="surface";																																		//	\
	this.Props.Legend.numTicks=5;																																	//	\	
	this.Planes={};																																					//	\
	this.Chart_type='surface';																																		//	\
	this.Chart_dataobj={};																																			//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------- THE SURFACE DATASET OBJECT ----------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function Surface_Data (DataID, PlotID)																																//	\
{ 																																									//	\
	this.Format_id=DataID;																																			// 	\
	this.Format_plotid=PlotID;																																		// 	\
	this.Format_name="";																																			// 	\
	this.xData_raw='';																																				//	\
	this.yData_raw='';																																				//	\
	this.zData_raw='';																																				//	\
	this.xData={};																																					//	\
	this.yData={};																																					//	\
	this.zData={};																																					//	\
	this.xMin=0;																																					//	\
	this.yMin=0;																																					//	\
	this.zMin=0;																																					//	\
	this.xMax=0;																																					//	\
	this.yMax=0;																																					//	\
	this.zMax=0;																																					//	\
	this.surfaceGeometry={};																																		//	\
	this.colorMap='rainbow';																																		//	\
	this.numberOfColors=32;																																			//	\
	this.legendLayout='horizontal';																																	//	\
	this.flat=0;																																					//	\
	this.offset=0;																																					//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- INITIALIZE THE SURFACE MAP PLOT --------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.Initialize = function(type)																														//	\
{	var PlotID=this.Format_id;																																		//	\
	this.Scene=new THREE.Scene();																																	//	\
	this.Camera = new THREE.PerspectiveCamera( this.Props.view_angle, this.Props.aspect, this.Props.near, this.Props.far);											//	\
	this.Camera.position.x=this.Props.xCamPos;		this.Camera.position.y=this.Props.yCamPos;		this.Camera.position.z=this.Props.zCamPos;						//	\
	this.Camera.up = new THREE.Vector3( 0, 0, 1 );																													//	\
	this.Camera.name = 'camera';																																	//	\
	this.Keyboard = new THREEx.KeyboardState();																														//	\
	this.Clock = new THREE.Clock();																																	//	\
	this.Scene.add(this.Camera);																																	//	\
	if ( Detector.webgl ) { this.Renderer = new THREE.WebGLRenderer( {antialias:true} ); } else { this.Renderer = new THREE.CanvasRenderer(); }						//	\
	this.Renderer.setSize(this.Props.screen_width, this.Props.screen_height);																						//	\
	var container = document.getElementById( this.Format_id );																										//	\
	container.appendChild( this.Renderer.domElement );																												//	\
	this.Controls = new THREE.TrackballControls( this.Camera, this.Renderer.domElement );																			//	\
	if (type=="2")																																					//	\
	{	for (var DataID in window[PlotID]['Chart_dataobj'])																											//	\
		{	var dataObj=new Surface_Data(DataID, PlotID);																											//	\
			for (var objProp in window[PlotID].Chart_dataobj[DataID]) { dataObj[objProp]=window[PlotID].Chart_dataobj[DataID][objProp]; }							//	\
			window[PlotID].Chart_dataobj[DataID]=dataObj;																											//	\
		}																																							//	\
	}																																								//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- REDRAW THE FUNCTION FROM SCRATCH ---------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.reDraw = function  (type, callback)																												//	\
{	console.log('In the redraw');
	cancel_animate();																																				//	\
	this.Props.Legend.colorMap=$('#surface_colormap').val();																										//	\
	var PlotID=this.Format_id;																																		//	\
	if (type=="1")																																					//	\
	{	window[PlotID].Clear_Scene( PlotID, 																														//	\
		function(){window[PlotID].resetSurfaceColors(																												//	\
		function(){window[PlotID].Set_Meshes( PlotID,																												//	\
		function(){window[PlotID].Set_Legend( PlotID,																												//	\
		function(){window[PlotID].Set_Positions( PlotID,																											//	\
		function(){window[PlotID].Make_Planes( 																														//	\
		function(){window[PlotID].Render(PlotID); }); }); }); }); }) });																							//	\
	}else if (type=="2")																																			//	\
	{	window[PlotID].Clear_Scene( PlotID, 																														//	\
		function(){window[PlotID].setSurfaceVertices(																												//	\
		function(){window[PlotID].resetSurfaceColors(																												//	\
		function(){window[PlotID].Set_Meshes( PlotID,																												//	\
		function(){window[PlotID].Set_Legend( PlotID,																												//	\
		function(){window[PlotID].Set_Positions( PlotID,																											//	\
		function(){window[PlotID].Make_Planes( 																														//	\
		function(){window[PlotID].Render(PlotID); }); }); }); }); }); }) });																						//	\
	}																																								//	\
	animate();																																						//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- INITIALIZE THE SURFACE MAP PLOT --------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.Make_Planes = function(callback)																													//	\
{	console.log('Make Planes');
	this.Scene.add( new THREE.AxisHelper() );																														//	\
	for (var PlaneID in this.Planes)																																//	\
	{	var height=this.Planes[PlaneID]['height'];																													//	\
		var width=this.Planes[PlaneID]['width'];																													//	\
		var hspacing=parseInt(Big(width).div(Big(this.Planes[PlaneID]['hspacing'])), 10);																			//	\
		var vspacing=parseInt(Big(height).div(Big(this.Planes[PlaneID]['vspacing'])), 10);																			//	\
		var xoff=this.Planes[PlaneID]['xoffset'];																													//	\
		var yoff=this.Planes[PlaneID]['yoffset'];																													//	\
		var zoff=this.Planes[PlaneID]['zoffset'];																													//	\
		var geometry = new THREE.PlaneGeometry( height, width, vspacing, hspacing );																				//	\
		var material = new THREE.MeshBasicMaterial( { wireframe: true, color:this.Planes[PlaneID]['color'] } );														//	\
		var thisplane = new THREE.Mesh( geometry, material );																										//	\
		if (this.Planes[PlaneID]['type']=='XY') { thisplane.position.set( Math.floor(height/2)+xoff, Math.floor(width/2)+yoff, zoff );}								//	\
		if (this.Planes[PlaneID]['type']=='YZ') { thisplane.position.set( xoff, Math.floor(height/2)+yoff, Math.floor(width/2)+zoff );}								//	\
		if (this.Planes[PlaneID]['type']=='XZ') { thisplane.position.set( Math.floor(height/2)+xoff, yoff, Math.floor(width/2)+zoff );}								//	\
		if (this.Planes[PlaneID]['type']=="YZ") { thisplane.rotation.x = Math.PI/2;	}																				//	\
		if (this.Planes[PlaneID]['type']=="XZ") { thisplane.rotation.z = Math.PI/2;	}																				//	\
		this.Scene.add(thisplane);																																	//	\
	}																																								//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- REDRAW THE FUNCTION FROM SCRATCH ---------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.Set_Meshes =function(PlotID, callback)																											//	\
{	console.log('Set Meshes');
	var graphMesh={};																																				//	\
	for (var DataID in window[PlotID]['Chart_dataobj'])																												//	\
	{	wireMaterial = new THREE.MeshBasicMaterial( {vertexColors: THREE.VertexColors, side:THREE.DoubleSide } );													//	\
		graphMesh = new THREE.Mesh( window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry, wireMaterial );														//	\
		graphMesh.doubleSided = true;																																//	\
		graphMesh.id = DataID;																																		//	\
		graphMesh.name = DataID;																																	//	\
		window[PlotID].Scene.add(graphMesh);																														//	\
	}																																								//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- SET THE COLORS IN THE SURFACE MAP ------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	The fifth code in the creation of a surface map, this code uses the lookup table routine to set the colors for the color map.										\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
Surface.prototype.resetSurfaceColors =function (callback)																											//	\
{	var color, point, face, numberOfSides, vertexIndex;																												//	\
	var PlotID=this.Format_id;																																		//	\
	window[PlotID].lut = new THREE.Lut( window[PlotID].Props.Legend.colorMap, window[PlotID].Props.Legend.numberOfColors );											//	\
	window[PlotID].lut.setMax( window[PlotID].Props.zMax );		window[PlotID].lut.setMin( window[PlotID].Props.zMin );												//	\
	for (var DataID in window[PlotID]['Chart_dataobj'])																												//	\
	{	window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['colorsNeedUpdate']=true;																		//	\
		window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['elementsNeedUpdate']=true;																		//	\
		window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['groupsNeedUpdate']=true;																		//	\
		window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['verticesNeedUpdate']=true;																		//	\
		window[PlotID]['Chart_dataobj'][DataID].lut=new THREE.Lut( window[PlotID]['Chart_dataobj'][DataID]['colorMap'], parseInt(window[PlotID]['Chart_dataobj'][DataID]['numberOfColors']) );	//	\
		if (window[PlotID].Props.divideColormap===0)																												//	\
		{	for ( var i = 0; i < window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.vertices.length; i++ ) 													//	\
			{	
//				temp = window[PlotID]['Chart_dataobj'][DataID].lut.getColor(parseFloat(Big(window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.vertices[i].z).minus(Big(window[PlotID]['Chart_dataobj'][DataID].offset))));//	\	
				var x=Math.floor(i/window[PlotID]['Chart_dataobj'][DataID].xLength);																				//	\
				var y=i%window[PlotID]['Chart_dataobj'][DataID].yLength;																							//	\
				var key=x+'-'+y;																																	//	\
				temp = window[PlotID].lut.getColor( window[PlotID]['Chart_dataobj'][DataID].zData[key]);															//	\
				color = new THREE.Color( temp.r, temp.g, temp.b );																									//	\
				color.setRGB(temp.r, temp.g, temp.b);																												//	\
				window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.colors[i]=color;																			//	\
			}																																						//	\
		}else																																						//	\
		{	for ( var i = 0; i < window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.vertices.length; i++ ) 													//	\
			{	var x=Math.floor(i/window[PlotID]['Chart_dataobj'][DataID].xLength);																				//	\
				var y=i%window[PlotID]['Chart_dataobj'][DataID].yLength;																							//	\
				var key=x+'-'+y;																																	//	\
				temp = window[PlotID]['Chart_dataobj'][DataID].lut.getColor( window[PlotID]['Chart_dataobj'][DataID].zData[key]);									//	\
				color = new THREE.Color( temp.r, temp.g, temp.b );																									//	\
				color.setRGB(temp.r, temp.g, temp.b);																												//	\
				window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.colors[i]=color;																			//	\
			}																																						//	\
		}																																							//	\
		var faceIndices = [ 'a', 'b', 'c', 'd' ];																													//	\
		for ( var i = 0; i < window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.faces.length; i++ ) 															//	\
		{	face = window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.faces[ i ];																				//	\
			numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;																								//	\
			for( var j = 0; j < numberOfSides; j++ ) 																												//	\
			{	vertexIndex = face[ faceIndices[ j ] ];																												//	\
				window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.faces[ i ]['vertexColors'][ j ] = window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.colors[ vertexIndex ];														//	\
			}																																						//	\
		}																																							//	\
	}																																								//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------- SET THE VERTICES FOR EVERY DATASET -------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the third step in setting surface map data. The code steps through each index in the data object and creates a new Vector3 to hold its locations. The 		\
	code then creates a new face for each trio of vertices. Finally, the bounding box is computed and the max and min for each index is set.							\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
Surface.prototype.setSurfaceVertices=function (callback)																											//	\
{	var key='', xkey='', ykey='', key1='', key2='', xVal=0, yVal=0, index=0, keyMap={};																				//	\
	var PlotID=this.Format_id;																																		//	\
	for (var DataID in window[PlotID]['Chart_dataobj'])																												//	\
	{	index=0;	var surfaceGeometry=new THREE.Geometry();																										//	\
		if (window[PlotID]['Chart_dataobj'][DataID].offset===undefined){ window[PlotID]['Chart_dataobj'][DataID].offset=0; }										//	\
		window[PlotID]['Chart_dataobj'][DataID]['maxZ']=-999999999;																									//	\
		window[PlotID]['Chart_dataobj'][DataID]['minZ']=99999999999;																								//	\
		for (var a=0; a<parseInt(window[PlotID]['Chart_dataobj'][DataID].xLength); a++)																				//	\
		{	xkey='0-'+a;																																			//	\
			for (var b=0; b<parseInt(window[PlotID]['Chart_dataobj'][DataID].yLength); b++)																			//	\
			{	ykey='0-'+b;																																		//	\
				key=a+'-'+b;																																		//	\
				keyMap[key]=index;																																	//	\
				if (window[PlotID]['Chart_dataobj'][DataID].xData[xkey]===undefined){ xVal=a; }else { xVal=window[PlotID]['Chart_dataobj'][DataID].xData[xkey]; }	//	\
				if (window[PlotID]['Chart_dataobj'][DataID].yData[ykey]===undefined){ yVal=b; }else { yVal=window[PlotID]['Chart_dataobj'][DataID].yData[ykey]; }	//	\
				if (window[PlotID]['Chart_dataobj'][DataID]['flat']==1)																								//	\
				{	var yoff=parseFloat(window[PlotID]['Chart_dataobj'][DataID].offset);																			//	\
				}else { var yoff=parseFloat(Big(window[PlotID]['Chart_dataobj'][DataID].zData[key]).plus(Big(window[PlotID]['Chart_dataobj'][DataID].offset)));	 }	//	\
				surfaceGeometry.vertices.push( new THREE.Vector3( xVal, yVal, yoff ) ); 																			//	\
				index++;																																			//	\
		}	}																																						//	\
		for (var a=0; a<window[PlotID]['Chart_dataobj'][DataID].xLength-1; a++)																						//	\
		{	for (var b=0; b<window[PlotID]['Chart_dataobj'][DataID].yLength-1; b++)																					//	\
			{	key=a+'-'+b;		var num1=a+1;	num2=b+1;																										//	\
				surfaceGeometry.faces.push( new THREE.Face3( keyMap[key], keyMap[a+'-'+num2], keyMap[num1+'-'+b] ) );												//	\
				surfaceGeometry.faces.push( new THREE.Face3( keyMap[a+'-'+num2], keyMap[num1+'-'+num2], keyMap[num1+'-'+b] ) );										//	\
		}	}																																						//	\
		window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']=surfaceGeometry;																					//	\
	}																																								//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- POPULATE THE SCENE WITH PROPERTIES -----------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.Set_Scene_Props = function()																														//	\
{	$('.surface_vxloc').val(this.Props.xPos);																														//	\
	$('.surface_vyloc').val(this.Props.yPos);																														//	\
	$('.surface_vzloc').val(this.Props.zPos);																														//	\
	$('.surface_cxpos').val(this.Props.xCamPos);																													//	\
	$('.surface_cypos').val(this.Props.yCamPos);																													//	\
	$('.surface_czpos').val(this.Props.zCamPos);																													//	\
	$('.surface_xrotate').val(this.Camera.rotation.x*180/Math.PI);																									//	\
	$('.surface_yrotate').val(this.Camera.rotation.y*180/Math.PI);																									//	\
	$('.surface_zrotate').val(this.Camera.rotation.z*180/Math.PI);																									//	\
   	$('.surface_planenames').html('<div id="surface_addplanewrapper"><div class="surface_addplane">Add Plane</div></div>');											//	\ 
	for (var PlaneID in this.Planes)		    																													//	\
	{	var temp='<div class="surface_planeline surface_planeline_active" count="'+PlaneID+'"><div class="surface_planename">Plane '+PlaneID+'</div>';				//	\
    	temp=temp+'<div class="surface_deleteplane"></div></div>';																									//	\
    	$('.surface_planenames').append(temp);																														//	\ 
	}																																								//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- POPULATE THE PLANES WITH PROPERTIES ----------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.Set_Plane_Props = function(PlaneIndex)																											//	\
{	$('.surface_xplaneoffset').val(this.Planes[PlaneIndex]['xoffset']);																								//	\
	$('.surface_yplaneoffset').val(this.Planes[PlaneIndex]['yoffset']);																								//	\
	$('.surface_zplaneoffset').val(this.Planes[PlaneIndex]['zoffset']);																								//	\
	$('.surface_planecolor').val(this.Planes[PlaneIndex]['color']);																									//	\
	$('.surface_planeheight').val(this.Planes[PlaneIndex]['height']);																								//	\
	$('.surface_planewidth').val(this.Planes[PlaneIndex]['width']);																									//	\
	$('.surface_hplanespacing').val(this.Planes[PlaneIndex]['hspacing']);																							//	\
	$('.surface_vplanespacing').val(this.Planes[PlaneIndex]['vspacing']);																							//	\
	$('.surface_planeselect').empty();																																//	\
	if (this.Planes[PlaneIndex]['type']=='XY')  																													//	\
	{	$('.surface_planeselect').append($("<option></option>").attr("value", 'XY').text('XY')); 																	//	\
		$('.surface_planeselect').append($("<option></option>").attr("value", 'YZ').text('YZ')); 																	//	\
		$('.surface_planeselect').append($("<option></option>").attr("value", 'XZ').text('XZ')); 		}															//	\
	if (this.Planes[PlaneIndex]['type']=='YZ')  																													//	\
	{	$('.surface_planeselect').append($("<option></option>").attr("value", 'YZ').text('YZ')); 																	//	\
		$('.surface_planeselect').append($("<option></option>").attr("value", 'XY').text('XY')); 																	//	\
		$('.surface_planeselect').append($("<option></option>").attr("value", 'XZ').text('XZ')); 		}															//	\
	if (this.Planes[PlaneIndex]['type']=='XZ')  																													//	\
	{	$('.surface_planeselect').append($("<option></option>").attr("value", 'XZ').text('XZ')); 																	//	\
		$('.surface_planeselect').append($("<option></option>").attr("value", 'XY').text('XY')); 																	//	\
		$('.surface_planeselect').append($("<option></option>").attr("value", 'YZ').text('YZ')); 		}															//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------- POPULATE THE DATASETS WITH PROPERTIES -----------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.Set_Data_Props = function()																														//	\
{	var DataID=$(".plot_dataline_active").attr('id');																												//	\
	var PlotID=$("#plot_spec").attr('plotid');																														//	\
	$('.plot_datasetcamerasection').hide();																															//	\
	$('.plot_datasetdatasection').show();																															//	\
	$('.plot_datasetdatatab').addClass('dataplot_subtab_active');																									//	\
	$('.plot_datasetcameratab').removeClass('dataplot_subtab_active');																								//	\
	$('.plot_seriesname').val(window[PlotID]['Chart_dataobj'][DataID].Format_name);																					//	\
	$('.surface_xdatainput').val(window[PlotID]['Chart_dataobj'][DataID].xData_raw);																				//	\
	$('.surface_ydatainput').val(window[PlotID]['Chart_dataobj'][DataID].yData_raw);																				//	\
	$('.surface_zdatainput').val(window[PlotID]['Chart_dataobj'][DataID].zData_raw);																				//	\
	$('.surface_offset').val(window[PlotID]['Chart_dataobj'][DataID].offset);																						//	\
	$('#surface_flat').empty();																																		//	\
	if (window[PlotID]['Chart_dataobj'][DataID]['flat']===0)																										//	\
	{ 	$('#surface_flat').append($("<option></option>").attr("value",0).text('Shaped Map'));																		//	\
	 	$('#surface_flat').append($("<option></option>").attr("value",1).text('Flat Map'));																			//	\
	}else																																							//	\
	{ 	$('#surface_flat').append($("<option></option>").attr("value",1).text('Flat Map'));																			//	\
	 	$('#surface_flat').append($("<option></option>").attr("value",0).text('Shaped Map'));																		//	\
	}																																								//	\
	$('#surface_mapsplit').empty();																																	//	\
	if (window[PlotID]['Props']['divideColormap']===0)																												//	\
	{ 	$('#surface_mapsplit').append($("<option></option>").attr("value",0).text('Single'));																		//	\
	 	$('#surface_mapsplit').append($("<option></option>").attr("value",1).text('Split'));																		//	\
	}else																																							//	\
	{ 	$('#surface_mapsplit').append($("<option></option>").attr("value",1).text('Split'));																		//	\
	 	$('#surface_mapsplit').append($("<option></option>").attr("value",0).text('Single'));																		//	\
	}																																								//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------- POPULATE THE OBJECTS FOR THE SURFACE ------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.Populate_Surface_Objects = function(PlotID)																										//	\
{	$('.plot_dataline').remove();																																	//	\
	for (var DataID in window[PlotID].Chart_dataobj)																												//	\
	{	var temp=$('#plot_dataseriestemplate').clone();																												//	\
	    temp.attr('id', DataID).addClass('plot_dataline').find('.plot_dataname').html('New Series');																//	\ 
	    temp.find('.plot_deletedata').addClass('surface_deletedata').removeClass('plot_deletedata');																//	\ 
	    $('#plot_datablock').find('.plot_datanames').append(temp);																									//	\ 
																																									//	\
		var sernum=$('#'+DataID).index('.plot_dataline');																											//	\
		$('#'+DataID).find('.plot_dataname').html('Series '+sernum);																								//	\
		$('.plot_seriesname').attr('placeholder', 'Series '+sernum);																								//	\
		window[PlotID].Chart_dataobj[DataID].series=sernum;																											//	\
		$(".surface_xdatainput, .surface_ydatainput, .surface_zdatainput").prop('disabled', false);																	//	\
		$('.plot_dataline').removeClass('plot_dataline_active');																									//	\
		$('#'+Object.keys(window[PlotID].Chart_dataobj)[0]).addClass('plot_dataline_active');																		//	\
		$('.surface_xdatainput').val(window[PlotID]['Chart_dataobj'][DataID].xData_raw);																			//	\
		$('.surface_ydatainput').val(window[PlotID]['Chart_dataobj'][DataID].yData_raw);																			//	\
		$('.surface_zdatainput').val(window[PlotID]['Chart_dataobj'][DataID].zData_raw);																			//	\
	}																																								//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------- RENDER THE SURFACE MAP -------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.Render = function (PlotID) 																														//	\
{	console.log('Render');
	cancel_animate();																																				//	\
	window[PlotID].Renderer.setClearColor( 0xFFFFFF, 1 );																											//	\
	window[PlotID].Scene.position.x=window[PlotID].Props.xPos;																										//	\
	window[PlotID].Scene.position.y=window[PlotID].Props.yPos;																										//	\
	window[PlotID].Scene.position.z=window[PlotID].Props.zPos;																										//	\
	window[PlotID].Camera.position.set( window[PlotID].Props.xCamPos, window[PlotID].Props.yCamPos, window[PlotID].Props.zCamPos );									//	\
	var vec=new THREE.Vector3(window[PlotID].Scene.position.x, window[PlotID].Scene.position.y, window[PlotID].Scene.position.z );									//	\
	window[PlotID].Camera.lookAt( vec );																															//	\
	window[PlotID].Camera.rotation.x=window[PlotID].Props.xRot;																										//	\
	window[PlotID].Camera.rotation.y=window[PlotID].Props.yRot;																										//	\
	window[PlotID].Camera.rotation.z=window[PlotID].Props.zRot;																										//	\
	window[PlotID].Camera.up = new THREE.Vector3( 0, 0, 1 );																										//	\
	Legend.Renderer.setClearColor( 0xFFFFFF, 1 );																													//	\
	Legend.Camera.up = new THREE.Vector3( 0, 0, 1 );																												//	\
//	window[CPLOT].Renderer.render( window[CPLOT].Scene, window[CPLOT].Camera ); window[CPLOT].Controls.update();													//	\
	window[PlotID].Renderer.render( window[PlotID].Scene, window[PlotID].Camera ); window[PlotID].Controls.update();												//	\
	Legend.Renderer.render( Legend.Scene, Legend.Camera ); Legend.Controls.update();																				//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------ FUNCTION TO CLEAN A SCENE ------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.Clear_Scene = function (PlotID, callback)																											//	\
{	console.log('Clear Scene');
	var elementsInTheScene = window[PlotID].Scene.children.length;																									//	\
	for ( var i = elementsInTheScene-1; i > 0; i-- ) 																												//	\
	{	if ( window[PlotID].Scene.children[ i ].name != 'camera') { window[PlotID].Scene.remove ( window[PlotID].Scene.children [ i ] ); } } 						//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- SET THE LEGEND IN THE SURFACE MAP ------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.Set_Legend = function(PlotID, callback)																											//	\
{	console.log('Set Legend');
	$('#Legend').empty();																																			//	\
	Legend={};																																						//	\
	Legend.Scene=new THREE.Scene();																																	//	\
	Legend.Camera = new THREE.PerspectiveCamera( 45, 8, 0.001, 10000);																								//	\
	Legend.Camera.position.x=0;	Legend.Camera.position.y=0;		Legend.Camera.position.z=2;																			//	\
	Legend.Camera.up = new THREE.Vector3( 0, 0, 1 );																												//	\
	Legend.Camera.name = 'legendcamera';																															//	\
	Legend.Keyboard = new THREEx.KeyboardState();																													//	\
	Legend.Clock = new THREE.Clock();																																//	\
	Legend.Scene.add(Legend.Camera);																																//	\
	if ( Detector.webgl ) { Legend.Renderer = new THREE.WebGLRenderer( {antialias:true} ); } else { Legend.Renderer = new THREE.CanvasRenderer(); }					//	\
	Legend.Renderer.setSize(800, 50);																																//	\
	var container = document.getElementById( 'Legend' );																											//	\
	container.appendChild( Legend.Renderer.domElement );																											//	\
	Legend.Controls = new THREE.TrackballControls( Legend.Camera, Legend.Renderer.domElement );																		//	\
	if (window[PlotID].Props.divideColormap===0)																													//	\
	{	window[PlotID].lut = new THREE.Lut( window[PlotID].Props.Legend.colorMap, window[PlotID].Props.Legend.numberOfColors );										//	\
		window[PlotID].lut.setMax( window[PlotID].Props.zMax );																										//	\
		window[PlotID].lut.setMin( window[PlotID].Props.zMin );																										//	\
	}else																																							//	\	
	{	for (var DataID in window[PlotID]['Chart_dataobj'])																											//	\
		{	var cm=window[PlotID]['Chart_dataobj'][DataID].colorMap;																								//	\
			window[PlotID]['Chart_dataobj'][DataID].lut = new THREE.Lut( cm, window[PlotID]['Chart_dataobj'][DataID].numberOfColors );								//	\
			window[PlotID]['Chart_dataobj'][DataID].lut.setMax( window[PlotID]['Chart_dataobj'][DataID].zMax );														//	\
			window[PlotID]['Chart_dataobj'][DataID].lut.setMin( window[PlotID]['Chart_dataobj'][DataID].zMin );														//	\
		}																																							//	\	
	}																																								//	\	
	legend = window[PlotID].lut.setLegendOn( { 'layout':'horizontal', 'position': { 'x': 0, 'y': 0, 'z': 0 } , 'dimensions': {'width':0.3, 'height':14} } );		//	\
	Legend.Scene.add ( legend );																																	//	\
	var labels = window[PlotID].lut.setLegendLabels( { 'ticks': window[PlotID].Props.Legend.numTicks } );															//	\
	Legend.Scene.add ( labels['title'] );																															//	\
	for ( var i = 0; i < Object.keys( labels[ 'ticks' ] ).length; i++ ) 																							//	\
	{	 Legend.Scene.add ( labels[ 'lines' ][ i ] );}																												//	\
	$('#Legend_Ticks').empty();																																		//	\
	var width=parseInt(800/window[PlotID].Props.Legend.numTicks, 10);																								//	\
	for ( var i = 0; i < window[PlotID].Props.Legend.numTicks; i++ ) 																								//	\
	{	if (window[PlotID].Props.divideColormap===0)																												//	\
		{	var number=window[PlotID].Props.zMin+i*(window[PlotID].Props.zMax-window[PlotID].Props.zMin)/(window[PlotID].Props.Legend.numTicks-1); 					//	\
		}else { var DataID=window[PlotID].Props.Legend.show;																										//	\
				var number=window[PlotID]['Chart_dataobj'][DataID].zMin+i*(window[PlotID]['Chart_dataobj'][DataID].zMax-window[PlotID]['Chart_dataobj'][DataID].zMin)/(window[PlotID].Props.Legend.numTicks-1); }
		$('#Legend_Ticks').append('<div class="Legend_Tick">'+Math.round(10000*number)/10000+'</div>');																//	\
	}																																								//	\
	$('.Legend_Tick').css('width',width);																															//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- SET THE POSITIONS IN THE SURFACE MAP ---------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.Set_Positions = function(PlotID, callback)																										//	\
{	
console.log('Set Positions');
	this.Props.xCamPos=this.Props.xMax*2;																															//	\
	this.Props.yCamPos=this.Props.yMax*2;																															//	\
	this.Props.zCamPos=2*this.Props.zMax;																															//	\
	if (this.Props.zCamPos<10) { this.Props.zCamPos=20; }																											//	\
	this.Camera.position.x=this.Props.xCamPos;		this.Camera.position.y=this.Props.yCamPos;	this.Camera.position.z=this.Props.zCamPos;							//	\
	this.Camera.position.set( this.Props.xCamPos, this.Props.yCamPos, this.Props.zCamPos );																			//	\
	window[PlotID].Controls.target.set( window[PlotID].Props.xPos, window[PlotID].Props.yPos, window[PlotID].Props.zPos );											//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function animate(){ APLOT=requestAnimationFrame( animate ); window[CPLOT].Renderer.render( window[CPLOT].Scene, window[CPLOT].Camera ); window[CPLOT].Controls.update(); }//	\
function cancel_animate(){ if (typeof(APLOT)!==undefined) { cancelAnimationFrame( APLOT ); } }																		//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- SHOW THE SURFACE MAP OPTIONS -----------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function Show_Surface_Options(PlotID) 																																//	\
{	$('.plot_plotdatablock, #plot_seriestypeselect').hide(); 																										//	\
	$('#plot_spec, #plot_datablock9').show(); 																														//	\
	$('#equation_spec, #image_spec, #loop_spec, #symeq_spec, #text_spec').hide();																					//	\
	$('#formatselect, #xaxisselect, #yaxisselect, #bandselect, #lineselect, #textselect').closest('.simplewrap').hide();	              	      					//	\
	$('#dataselect, #typeselect, #surface_legendselect, #surface_planeselect').closest('.simplewrap').show('500');													//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- FINISHED EDITING THE LOOKAT POSITION -----------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('keyup', ".surface_vxloc, .surface_vyloc, .surface_vzloc", function(e) 																				//	\ 
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))))															 										//	\
	{	var PlotID=$("#plot_spec").attr('plotid');																													//	\
		var eqobj={Page_position:parseInt(window[PlotID].Page_position, 10), Format_showtype:"InnerFunction", equation:"TempEq="+$(this).val()};					//	\
		var id=CreateEq(this.fileid, 1, eqobj);																														//	\
		if (e.target.className=="surface_vxloc") 																													//	\
		{	window[PlotID].Scene.position.x=window[id].Solution_real['0-0']; window[PlotID].Props.xPos=window[id].Solution_real['0-0'];		}						//	\
		if (e.target.className=="surface_vyloc") 																													//	\
		{	window[PlotID].Scene.position.y=window[id].Solution_real['0-0']; window[PlotID].Props.yPos=window[id].Solution_real['0-0'];		}						//	\
		if (e.target.className=="surface_vzloc") 																													//	\
		{	window[PlotID].Scene.position.z=window[id].Solution_real['0-0']; window[PlotID].Props.zPos=window[id].Solution_real['0-0'];		}						//	\
	}																																								//	\
});																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- FINISHED EDITING THE CAMERA POSITION -----------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('keyup', ".surface_cxpos, .surface_cypos, .surface_czpos", function(e) 																				//	\ 
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))))															 										//	\
	{	var PlotID=$("#plot_spec").attr('plotid');																													//	\
		var eqobj={Page_position:parseInt(window[PlotID].Page_position, 10), Format_showtype:"InnerFunction", equation:"TempEq="+$(this).val()};					//	\
		var id=CreateEq(this.fileid, 1, eqobj);																														//	\
		if (e.target.className=="surface_cxpos") 																													//	\
		{	window[PlotID].Camera.position.x=window[id].Solution_real['0-0'];			window[PlotID].Props.xCamPos=window[id].Solution_real['0-0'];		}		//	\
		if (e.target.className=="surface_cypos") 																													//	\
		{	window[PlotID].Camera.position.y=window[id].Solution_real['0-0'];			window[PlotID].Props.yCamPos=window[id].Solution_real['0-0'];		}		//	\
		if (e.target.className=="surface_czpos") 																													//	\
		{	window[PlotID].Camera.position.z=window[id].Solution_real['0-0'];			window[PlotID].Props.zCamPos=window[id].Solution_real['0-0'];		}		//	\
		window[PlotID].reDraw(1); 																																	//	\
	}																																								//	\
});																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- ROTATE THE SCENE IN THE X DIRECTION ------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('keyup', ".surface_xrotate", function(e) 																											//	\ 
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))))															 										//	\
	{	var PlotID=$("#plot_spec").attr('plotid');																													//	\
		var eqobj={Page_position:parseInt(window[PlotID].Page_position, 10), Format_showtype:"InnerFunction", equation:"TempEq="+$(this).val()};					//	\
		var id=CreateEq(this.fileid, 1, eqobj);																														//	\
		window[PlotID].Props.xRot=window[id].Solution_real['0-0']*Math.PI/180;																						//	\
		window[PlotID].Render(PlotID);																																//	\
	}																																								//	\
});																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- ROTATE THE SCENE IN THE Y DIRECTION ------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('keyup', ".surface_yrotate", function(e) 																											//	\ 
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))))															 										//	\
	{	var PlotID=$("#plot_spec").attr('plotid');																													//	\
		var eqobj={Page_position:parseInt(window[PlotID].Page_position, 10), Format_showtype:"InnerFunction", equation:"TempEq="+$(this).val()};					//	\
		var id=CreateEq(this.fileid, 1, eqobj);																														//	\
		window[PlotID].Props.yRot=window[id].Solution_real['0-0']*Math.PI/180;																						//	\
		window[PlotID].Render(PlotID);																																//	\
	}																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- ROTATE THE SCENE IN THE Z DIRECTION ------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('keyup', ".surface_zrotate", function(e) 																											//	\ 
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))))															 										//	\
	{	var PlotID=$("#plot_spec").attr('plotid');																													//	\
		var eqobj={Page_position:parseInt(window[PlotID].Page_position, 10), Format_showtype:"InnerFunction", equation:"TempEq="+$(this).val()};					//	\
		var id=CreateEq(this.fileid, 1, eqobj);																														//	\
		window[PlotID].Props.zRot=window[id].Solution_real['0-0']*Math.PI/180;																						//	\
		window[PlotID].Render(PlotID);																																//	\
	}																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- SET THE NEAR OR FAR OR VIEWING ANGLE -----------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('keyup', ".surface_near, .surface_far, .surface_viewangle", function(e) 																				//	\ 
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))))															 										//	\
	{	var PlotID=$("#plot_spec").attr('plotid');																													//	\
		var eqobj={Page_position:parseInt(window[PlotID].Page_position, 10), Format_showtype:"InnerFunction", equation:"TempEq="+$(this).val()};					//	\
		var id=CreateEq(this.fileid, 1, eqobj);																														//	\
		if (e.target.className=="surface_near")	{ 		window[PlotID].Props.near=window[id].Solution_real['0-0'];	}												//	\
		if (e.target.className=="surface_far")	{ 		window[PlotID].Props.far=window[id].Solution_real['0-0'];	}												//	\
		if (e.target.className=="surface_viewangle"){ 	window[PlotID].Props.view_angle=window[id].Solution_real['0-0'];	}										//	\
		window[PlotID].Camera = new THREE.PerspectiveCamera( window[PlotID].Props.view_angle, window[PlotID].Props.aspect, window[PlotID].Props.near, window[PlotID].Props.far);	//	\
		window[PlotID].Render(PlotID);																																//	\
	}																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------- HIGHLIGHT A PLANE  ---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('click', ".surface_planeline", function(e) 																											//	\ 
{	$('.surface_planeline').removeClass('surface_planeline_active');																								//	\
	$(this).addClass('surface_planeline_active');																													//	\
	var PlotID=$("#plot_spec").attr('plotid');																														//	\
	var count=$(this).attr('count');																																//	\
	window[PlotID].Set_Plane_Props(count);																															//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------- CHANGE A PLANE TYPE ---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('change', ".surface_planeselect", function(e) 																										//	\ 
{	var PlotID=$("#plot_spec").attr('plotid');																														//	\
	var PlaneID=parseInt($('.surface_planeline_active').attr('count'), 10);																							//	\
	window[PlotID].Planes[PlaneID]['type']=$(this).val();																											//	\
	window[PlotID].reDraw(1);																																		//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------- CHANGE A PLANE OFFSET --------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('keyup', ".surface_xplaneoffset", function(e) 																										//	\ 
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))))															 										//	\
	{	var PlotID=$("#plot_spec").attr('plotid');	var PlaneID=parseInt($('.surface_planeline_active').attr('count'), 10);											//	\
		window[PlotID].Planes[PlaneID]['xoffset']=parseInt($(this).val(), 10);	window[PlotID].reDraw(1);	}	});													//	\
$(document).on('keyup', ".surface_yplaneoffset", function(e) 																										//	\ 
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))))															 										//	\
	{	var PlotID=$("#plot_spec").attr('plotid');	var PlaneID=parseInt($('.surface_planeline_active').attr('count'), 10);											//	\
		window[PlotID].Planes[PlaneID]['yoffset']=parseInt($(this).val(), 10);	window[PlotID].reDraw(1);	}	});													//	\
$(document).on('keyup', ".surface_zplaneoffset", function(e) 																										//	\ 
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))))															 										//	\
	{	var PlotID=$("#plot_spec").attr('plotid');	var PlaneID=parseInt($('.surface_planeline_active').attr('count'), 10);											//	\
		window[PlotID].Planes[PlaneID]['zoffset']=parseInt($(this).val(), 10);	window[PlotID].reDraw(1);	}	});													//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------- CHANGE A PLANE COLOR ---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('keyup', ".surface_planecolor", function(e) 																											//	\ 
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))))															 										//	\
	{	var PlotID=$("#plot_spec").attr('plotid');																													//	\
		var PlaneID=parseInt($('.surface_planeline_active').attr('count'), 10);																						//	\
		window[PlotID].Planes[PlaneID]['color']=$(this).val();																										//	\
		window[PlotID].reDraw(1);																																	//	\
	}																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------- CHANGE A PLANE HEIGHT --------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('keyup', ".surface_planeheight", function(e) 																										//	\ 
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))))															 										//	\
	{	var PlotID=$("#plot_spec").attr('plotid');																													//	\
		var PlaneID=parseInt($('.surface_planeline_active').attr('count'), 10);																						//	\
		window[PlotID].Planes[PlaneID]['height']=parseInt($(this).val(), 10);																							//	\
		window[PlotID].reDraw(1);																																	//	\
	}																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------- CHANGE A PLANE WIDTH --------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('keyup', ".surface_planewidth", function(e) 																											//	\ 
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))))															 										//	\
	{	var PlotID=$("#plot_spec").attr('plotid');																													//	\
		var PlaneID=parseInt($('.surface_planeline_active').attr('count'), 10);																						//	\
		window[PlotID].Planes[PlaneID]['width']=parseInt($(this).val(), 10);																						//	\
		window[PlotID].reDraw(1);																																	//	\
	}																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------- CHANGE A PLANE SPACING -------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('keyup', ".surface_vplanespacing", function(e) 																										//	\ 
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))))															 										//	\
	{	var PlotID=$("#plot_spec").attr('plotid');																													//	\
		var PlaneID=parseInt($('.surface_planeline_active').attr('count'), 10);																						//	\
		window[PlotID].Planes[PlaneID]['vspacing']=parseInt($(this).val(), 10);																						//	\
		window[PlotID].reDraw(1);																																	//	\
	}																																								//	\
});																																									//	\
$(document).on('keyup', ".surface_hplanespacing", function(e) 																										//	\ 
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))))															 										//	\
	{	var PlotID=$("#plot_spec").attr('plotid');																													//	\
		var PlaneID=parseInt($('.surface_planeline_active').attr('count'), 10);																						//	\
		window[PlotID].Planes[PlaneID]['hspacing']=parseInt($(this).val(), 10);																						//	\
		window[PlotID].reDraw(1);																																	//	\
	}																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------- TURN THE SURFACE LEGEND ON/OFF ----------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$("#surface_legendonoff").change(function(event)																													//	\
{	var PlotID=$("#plot_spec").attr('plotid');																														//	\
	cleanScene(PlotID);																																				//	\
	if ($(this).is(':checked')) 																																	//	\
	{	for (var DataID in window[PlotID].Chart_dataobj)  {																											//	\
			window[window[PlotID].Chart_Name].series[window[PlotID].Chart_dataobj[DataID]['series']].options.showInLegend = true;									//	\
		}																																							//	\
		window[PlotID]['Legend_onoff']=true;																														//	\
	}else																																							//	\
	{	for (var DataID in window[PlotID].Chart_dataobj)  {																											//	\
			window[window[PlotID].Chart_Name].series[window[PlotID].Chart_dataobj[DataID]['series']].options.showInLegend = false;									//	\
	    	window[window[PlotID].Chart_Name].series[window[PlotID].Chart_dataobj[DataID]['series']].legendItem = null;												//	\
	    	window[window[PlotID].Chart_Name].legend.destroyItem(window[window[PlotID].Chart_Name].series[window[PlotID].Chart_dataobj[DataID]['series']]);			//	\
		}																																							//	\
		window[PlotID]['Legend_onoff']=false;																														//	\
	}																																								//	\
	CreatePlot(PlotID);																																				//	\
	window[PlotID].Format_haschanged=1;																																//	\
});																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------- EXPAND THE SURFACE TO NEW TAB ---------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('click', '.expandsurface', function(event) {																											//	\ 
	var plotid=$(this).closest('.icon_holder').siblings('.plot_block').attr('id');																					//	\
	window.open("http://www.cadwolf.com/Surfaces/"+plotid);																											//	\
});																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------ CHANGE THE COLOR MAP TYPE ------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('change', "#surface_colormap", function(e) 																											//	\ 
{	var PlotID=$("#plot_spec").attr('plotid');																														//	\
	var DataID=$(".plot_dataline_active").attr('id');																												//	\
	cancel_animate();																																				//	\
	window[PlotID].Props.Legend.colorMap=$('#surface_colormap').val();																								//	\
	window[PlotID]['Chart_dataobj'][DataID].colorMap=$('#surface_colormap').val();																					//	\
	window[PlotID].reDraw(1); 																																		//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------- CHANGE THE NUMBER OF COLORS -----------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('change', "#surface_numcolors", function(e) 																											//	\ 
{	var PlotID=$("#plot_spec").attr('plotid');																														//	\
	var DataID=$(".plot_dataline_active").attr('id');																												//	\
	cancel_animate();																																				//	\
	window[PlotID].Props.Legend.numberOfColors=$('#surface_numcolors').val();																						//	\
	window[PlotID]['Chart_dataobj'][DataID].numberOfColors=$('#surface_numcolors').val();																			//	\
	window[PlotID].reDraw(1); 																																		//	\
});																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------- CHANGE A SURFACE DATASET OFFSET -------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('keyup', ".surface_offset", function(e) 																												//	\ 
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))))															 										//	\
	{	var PlotID=$("#plot_spec").attr('plotid');																													//	\
		var DataID=$(".plot_dataline_active").attr('id');																											//	\
		window[PlotID]['Chart_dataobj'][DataID]['offset']=parseFloat($(this).val());																				//	\
		window[PlotID].reDraw(1);																																	//	\
	}																																								//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------- CHANGE THE REPRESENTATION FROM SURFACE TO FLAT ----------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('change', "#surface_flat", function(e) 																												//	\ 
{	var PlotID=$("#plot_spec").attr('plotid');																														//	\
	var DataID=$(".plot_dataline_active").attr('id');																												//	\
	window[PlotID]['Chart_dataobj'][DataID].flat=parseInt($(this).val(), 10);																						//	\
	window[PlotID].reDraw(2);																																		//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------- CHANGE THE NUMBER OF LEGEND TICK MARKS ----------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('change', "#surface_mapsplit", function(e) 																											//	\ 
{	var PlotID=$("#plot_spec").attr('plotid');																														//	\
	window[PlotID].Props.divideColormap=parseInt($(this).val(), 10);																								//	\
	window[PlotID].Props.Legend.show=Object.keys(window[PlotID].Chart_dataobj)[0];																					//	\
	window[PlotID].reDraw(1);																																		//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------- Tracking Current and active ------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------- SETTING THE CURRENT ITEM --------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function SetCurrentItem(type, id)																																	//	\--- This function is called whenever a user clicks on a new main item. It takes the id 
{	var oldid =$('#currentitem').attr('itemid');																													//	\--- of the old item and saves it if it was changed and then stores the value of the new 
	var oldtype=$('#currentitem').attr('type');																														//	\--- active item. If the old item was deleted, nothing is done.
	if ((oldid!=id)&&($('#'+oldid).length>0))																														//	\
	{	if ((oldtype=="text")||((oldtype=="image")))		{							 																			//	\
		}else if (window[oldid].Format_haschanged==1) 		{  }																									//	\
	}																																								//	\
	$('#currentitem').attr('itemid',id);																															//	\
	$('#currentitem').attr('type',type);																															//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------- WHEN A TOP ITEM IS CLICKED ON ---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).on('click', ".main_item", function(event) 																												//	\
{ 	event.stopPropagation();																																		//	\
	if ($('#currentitem').attr('type')=="table") { 	 }														//	\
	$('.main_item').removeClass('current').addClass('notcurrent');																									//	\
	$(this).removeClass('notcurrent').addClass('current');																											//	\
	$('#Format_Wrapper, .icon_holder, .sublineshow, .updateforloop, .updatewhileloop, .updateifelse, .ifelseaddif, .ifelseaddelse, .ifelsedelete, #Legend_Wrapper').hide();	//	\
//	$('#equation_spec, #image_spec, #loop_spec, #symeq_spec, #text_spec, #plot_spec, #table_spec').hide();															//	\
																																									//	\
	$(this).find('.icon_holder').show();																															//	\
	if ($(this).children().hasClass('text_block')) 																													//	\
	{ 	var id=$(this).children('.text_block').attr('id'); 		SetCurrentItem("text", id);  																		//	\
		$('#Format_Wrapper').show(); $('.cke_toolgroup, .cke_combo_button').css('background', '#FFFFFF'); 															//	\
		$('.cke_inner').css('background','transparent').css('padding','2px');																						//	\
		$(this).addClass('update');																																	//	\
	}																																								//	\
	if ($(this).children().hasClass('header_block')) 																												//	\
	{ 	var id=$(this).children('.header_block').attr('id'); 																										//	\
		SetCurrentItem("header", id); 		 }																														//	\
	if ($(this).children().hasClass('equationblock')) 																												//	\
	{ 	var id=$(this).children('.equationblock').attr('id'); 																										//	\
		SetCurrentItem("equation", id); 	UpdateEqSpec(id);	  }																									//	\
	if ($(this).children().hasClass('subequationblock')) 																											//	\
	{ 	var id=$(this).children('.subequationblock').attr('id');																									//	\
		SetCurrentItem("equation", id);  UpdateEqSpec(id); }																										//	\
	if ($(this).children().hasClass('symequationblock')) 																											//	\
	{ 	var id=$(this).children('.symequationblock').attr('id'); 																									//	\
		SetCurrentItem("symbolic", id); 	 }																														//	\
	if ($(this).children().hasClass('tableblock')) 																													//	\
	{ 	var id=$(this).children('.tableblock').attr('id'); 																											//	\
		$(this).addClass('update');																																	//	\
		SetCurrentItem("table", id); 		 }																														//	\
	if ($(this).closest('.main_item').children().hasClass('forloop'))																								//	\
	{ 	var id=$(this).closest('.main_item').children('.forloop').attr('id'); 																						//	\
		SetCurrentItem("forloop", id); 																																//	\
		$(this).closest('.main_item').find('.loopspecs, .sublineshow, .updateforloop').show();	}																	//	\
	if ($(this).closest('.main_item').children().hasClass('whileloop'))																								//	\
	{ 	var id=$(this).closest('.main_item').children('.whileloop').attr('id');																						//	\
		SetCurrentItem("whileloop", id); 																															//	\
		$(this).closest('.main_item').find('.loopspecs, .sublineshow, .updatewhileloop').show();	}																//	\
	if ($(this).closest('.main_item').children().hasClass('ifelse'))																								//	\
	{ 	var id=$(this).closest('.main_item').children('.ifelse').attr('id'); 																						//	\
		SetCurrentItem("ifelse", id); 																																//	\
		$(this).find('.ifelseaddif, .ifelseaddelse, .ifelsedelete').show();																							//	\
		$(this).closest('.main_item').find('.loopspecs, .sublineshow, .updateifelse').show(); }																		//	\
	if ($(this).children().hasClass('plot_block')) 																													//	\
	{ 	var id=$(this).children('.plot_block').attr('id'); 																											//	\
		SetCurrentItem("plot", id);  CPLOT=id;																														//	\
		if ( window[id].Chart_type=="surface") 																														//	\
		{	
			animate(); 	
			$('#plot_adddatawrapper').find('.plot_adddata').addClass('surface_adddata').removeClass('plot_adddata');	$('#Legend_Wrapper').show();	//	\
		}else { cancelAnimationFrame( APLOT ); 	$('#plot_adddatawrapper').find('.surface_adddata').addClass('plot_adddata').removeClass('surface_adddata');	}		//	\
		$('#plot_spec').show();																																		//	\
	}else { if (APLOT!==undefined) { cancelAnimationFrame( APLOT );} }																								//	\
	if ($(this).children().hasClass('image')) 																														//	\
	{ 	var id=$(this).children('.image').attr('id'); 																												//	\
		SetCurrentItem("image", id); 		  }																														//	\
	if ($(this).attr('id')=="clicktotopenter") 																														//	\
	{ 	var id="top"; 	SetCurrentItem("top", id);  			}																									//	\
	if ($(this).children().hasClass('image')) 																														//	\
	{ 	var id=$(this).children('.image').attr('id'); 	SetCurrentItem("image", id); 		  }																		//	\
	if ($(this).children().hasClass('linebreak_block')) 																											//	\
	{ 	var id=$(this).children('.linebreak_block').attr('id'); 	SetCurrentItem("linebreak", id); 		  }														//	\
	$('.deleteblock').hide();																																		//	\
	$(this).find('.deleteblock').show();																															//	\
	if (DOM_Object[id]['location']===undefined) { $('#thislocation').val('0'); }else { $('#thislocation').val(DOM_Object[id]['location']); }						//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------ Tracking -----------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------- Left Column Display / Hide Event Handlers ---------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// This section handles what is displayed in the left column when the user clicks on one of the main items. It first hides and shows the appropriate major divisions
// such as the chart options if a chart is shown and equation items if an equation is shown. Second, it populates a number of items that are relevant.
//-------------------------------------------------------------------------------------------------------------------------------------------------------------// 
//-------------------------------------------------------------------------------------------------------------------------------------------------------------// 
//-------------------------------------------------------------------------------------------------------------------------------------------------------------// 
$(document).on('click', ".text_block, .forloop, .whileloop, .ifelse, .equationblock, .subequationblock, .tableblock, .plot_block, .surface_block, .symequationblock, .image, #clicktotopenter", function(event) 																												//	\
{	   var type=$(this).parent().attr("type");																												//	\
       var id=$(this).attr("id");																															//	\
console.log('The type is '+type+', and the id is '+id);
		if (id=="clicktotopenter")	{$('#tableinfo, #plot_spec, #Format_Wrapper').hide();	 }																//	\
    	if (type=="1") 	{	$('#tableinfo, #plot_spec').hide(); }																							//	\
    	if (type=="2") 	{	$('#tableinfo, #plot_spec').hide(); }																							//	\
		if (type=="3")  {	$('#tableinfo, #plot_spec').hide(); 	$('#viewsection').show(); }																//	\
		if (type=="4")  { 	$('#ifelseinfo, #tableinfo, #equationinfo, #plot_spec').hide(); $('#viewsection').show(); } 									//	\
		if (type=="5")  {	$('#ifelseinfo, #equationinfo, #plot_spec').hide(); $('#tableinfo, #viewsection').show(); }										//	\
		if (type=="6")  {	$('#tableinfo, #plot_spec').hide(); 	$('#viewsection').show(); }																//	\
		if (type=="7")  {	$('#tableinfo, #plot_spec').hide();	$('#viewsection').show(); }																	//	\
		if (type=="8")  {	$('#tableinfo, #plot_spec').hide();	$('#viewsection').show(); SetActive(id); }													//	\
    	if (type=="10")	{	$('#tableinfo, #plot_spec').hide(); }																							//	\
		if (type=="9")   																																	//	\
		{																																					//	\
       		$('#tableinfo').hide();																															//	\
       		$('#chartdatasection').show();																													//	\
       		$('#chartoptionssection, #chartxaxessection, #chartyaxessection').hide();																		//	\
       		$(this).siblings('.left_suboptions').slideDown("slow");																							//	\
      		var id=$(this).attr('id');																														//	\
       		Handle_Chart_ShowOptions(id);																													//	\
       		PopulatePlotData(id);																															//	\
       		$('#plot_spec').fadeIn(500);																													//	\
       		$('#plot_datatab').addClass('plot_tab_active');																									//	\
       		$('#plot_optionstab, #plot_xaxestab, #plot_yaxestab').removeClass('plot_tab_active').addClass('plot_tab');										//	\
       		$('.plot_dataline:first').addClass('plot_dataline_active');																						//	\
       		$('#plot_xaxesblock').attr('axisid', Object.keys(window[id].Chart_xaxesobj)[0]);																//	\
       		$('.plot_yaxisline:first').addClass('plot_yaxisline_active');																					//	\
			PopulatePlotVariables();																														//	\
			PopulateSeriesData (id, $('.plot_dataline:first').attr('id'));																					//	\
			$('.plot_dataseries').show();																													//	\
       }																																					//	\
		if (type=="11")   																																	//	\
		{																																					//	\
      		var id=$(this).attr('id');																														//	\
       		Show_Surface_Options(id);																														//	\
			$("#plot_spec").attr('plotid', id);																												//	\
			window[id].Populate_Surface_Objects(id);																										//	\
       }																																					//	\
  		$('#width').val(parseInt($(this).css("width"), 10));																								//	\
		$('#topmargin').val(parseInt($(this).closest('.main_item').css("margin-top"), 10));																	//	\
		$('#bottommargin').val(parseInt($(this).closest('.main_item').css("margin-bottom"), 10));															//	\
   		$('#leftmargin').val(parseInt($(this).closest('.main_item').css("margin-left"), 10));																//	\
		$('#rightmargin').val(parseInt($(this).closest('.main_item').css("margin-right"), 10));																//	\
  		$('#width, #topmargin, #bottommargin, #leftmargin, #rightmargin').attr('thisitem',id);																//	\
  		$('#docwidth_show').html(parseInt($('#MainBody').css("width"), 10));																				//	\
  		$('#width_show').html(parseInt($(this).css("width"), 10));																							//	\
		$('#topmargin_show').html(parseInt($(this).closest('.main_item').css("margin-top"), 10));															//	\
		$('#bottommargin_show').html(parseInt($(this).closest('.main_item').css("margin-bottom"), 10));														//	\
   		$('#leftmargin_show').html(parseInt($(this).closest('.main_item').css("margin-left"), 10));															//	\
		$('#rightmargin_show').html(parseInt($(this).closest('.main_item').css("margin-right"), 10));														//	\
  		$('#width, #topmargin, #bottommargin, #leftmargin, #rightmargin').attr('thisitem',id);																//	\
    });        																																				//	\
																																							//	\
	$(document).on('click', '#plot_datatab', function(e) 																									//	\
	{	$('#chartoptionssection, #chartxaxessection, #chartyaxessection').hide(); $('#chartdatasection').show();											//	\ 
   		$('.plot_tab').removeClass('plot_tab_active'); $("#plot_datatab").addClass('plot_tab_active'); });													//	\
	$(document).on('click', '#plot_xaxestab', function(e) 																									//	\
	{	$('#chartoptionssection, #chartdatasection, #chartyaxessection').hide(); $('#chartxaxessection').show(); 											//	\
   		$('.plot_tab').removeClass('plot_tab_active'); $("#plot_xaxestab").addClass('plot_tab_active'); });													//	\
	$(document).on('click', '#plot_yaxestab', function(e) 																									//	\
	{	$('#chartoptionssection, #chartdatasection, #chartxaxessection').hide(); $('#chartyaxessection').show(); 											//	\
   		$('.plot_tab').removeClass('plot_tab_active'); $("#plot_yaxestab").addClass('plot_tab_active'); });													//	\
	$(document).on('click', '#plot_optionstab', function(e) 																								//	\
	{  	$('#chartaxessection, #chartdatasection, #chartxaxessection, #chartyaxessection').hide(); 															//	\
   		$('#chartoptionssection').show(); $('.plot_tab').removeClass('plot_tab_active'); $("#plot_optionstab").addClass('plot_tab_active'); });				//	\
	$('#CloseLeft').on("click", function(event) {																											//	\
		$('#main_leftcolumn').hide();																														//	\
		$('#main_contents').css("margin-left","0px");																										//	\
		$('#OpenLeft').show();																																//	\
	});																																						//	\
	$('#OpenLeft').on("click", function(event) {																											//	\
		$('#main_leftcolumn').show();																														//	\
		$('#main_contents').css("margin-left","250px");																										//	\
		$('#OpenLeft').hide();																																//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------// 


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------- End of Left Column Display / Hide -------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------ Top Navigation Event Handlers --------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('click', '#show_worksheet, #show_worksheetText',function(){	$('.bodymain').hide();	$('#MainBody').show();	ShowMenu(1); });					//	\
	$(document).on('click', '#show_toc, #show_tocText', function()		{		$('.bodymain').hide();	DisplayTOC();  ShowMenu(0);	});								//	\
	$(document).on('click', '#show_file, #show_fileText', function()	{		$('.bodymain').hide();	$('#PropertyBody').show(); ShowMenu(0); });					//	\
	$(document).on('click', '#show_inputs, #show_inputsText',function(){		$('.bodymain').hide();	$('#InputBody').show();		DisplayInputs(); ShowMenu(0);});//	\
	$(document).on('click', '#show_faf, #show_fafText',function(){				$('.bodymain').hide();	$('#FunctionBody').show();		ShowMenu(0);});				//	\
	$(document).on('click', '#show_functions, #show_functionsText',function(){	$('.bodymain').hide();	$('#FunctionList').show();	ShowMenu(0);});					//	\
	$(document).on('click', '#show_ifuns, #show_ifunsText',function(){			$('.bodymain').hide();	$('#FunctionsImported').show();	 ShowMenu(0);});			//	\
	$(document).on('click', '#show_refs, #show_refsText',function(){			$('.bodymain').hide();	Bibliography(); $('#RefBody').show();		ShowMenu(0); });//	\
	$(document).on('click', '#show_numbers, #show_numbersText', function()	{	$('.bodymain').hide();	$('#UnitBody').show();		 ShowMenu(0); });				//	\
	$(document).on('click', '#show_constants, #show_constantsText', function(){	$('.bodymain').hide();	$('#ConstantBody, #constants').show();	 ShowMenu(0); });	//	\
	$(document).on('click', '#show_bugs, #show_bugsText', function(){			$('.bodymain').hide();	$('#BugBody').show();  ShowBugInfo(); ShowMenu(0); });		//	\
	$(document).on('click', '#show_datasets, #show_datasetsText', function(){	$('.bodymain').hide();	$('#DatasetBody').show();  ShowMenu(0); });					//	\
																																									//	\
	$(document).on('click', '#show_worksheet, #show_toc, #show_file, #show_inputs, #show_faf, #show_functions, #show_ifuns, #show_refs, #show_numbers, '			//	\
		+'#show_constants, #show_bugs, #show_datasets', function(event){																							//	\
		$("#show_toc_current").attr('id','show_toc'); 	$("#show_file_current").attr('id','show_file');			$("#show_inputs_current").attr('id','show_inputs');	//	\
		$("#show_faf_current").attr('id','show_faf'); 	$("#show_functions_current").attr('id','show_functions');$("#show_ifuns_current").attr('id','show_ifuns'); 	//	\
		$("#show_refs_current").attr('id','show_refs');	$("#show_numbers_current").attr('id','show_numbers');	$("#show_bugs_current").attr('id','show_bugs');		//	\
		$("#show_worksheet_current").attr('id','show_worksheet');	$("#show_constants_current").attr('id','show_constants');										//	\
		$("#show_datasets_current").attr('id','show_datasets');																										//	\
		$(".leftNavTextCurrent").addClass('leftNavText').removeClass('leftNavTextCurrent');																			//	\
		var myDiv=$(this).attr('id');																																//	\
		$("#"+myDiv+"Text").addClass('leftNavTextCurrent').removeClass('leftNavText');																				//	\
		$('#'+event.target.id).attr('id',event.target.id+'_current');																								//	\		
	});																																								//	\		
	$(document).on('click', '#show_worksheetText, #show_tocText, #show_fileText, #show_inputsText, #show_fafText, #show_functionsText, #show_constantsText, '		//	\
		+'#show_ifunsText, #show_refsText, #show_numbersText, #show_bugsText, #show_datasetsText', function(event){													//	\
		$("#show_toc_current").attr('id','show_toc'); 	$("#show_file_current").attr('id','show_file');			$("#show_inputs_current").attr('id','show_inputs');	//	\
		$("#show_faf_current").attr('id','show_faf'); 	$("#show_functions_current").attr('id','show_functions');$("#show_ifuns_current").attr('id','show_ifuns'); 	//	\
		$("#show_refs_current").attr('id','show_refs');	$("#show_numbers_current").attr('id','show_numbers');	$("#show_bugs_current").attr('id','show_bugs');		//	\
		$("#show_worksheet_current").attr('id','show_worksheet');	$("#show_constants_current").attr('id','show_constants');										//	\
		$("#show_datasets_current").attr('id','show_datasets');																										//	\
		$(".leftNavTextCurrent").addClass('leftNavText').removeClass('leftNavTextCurrent');																			//	\
		var myDiv=$(this).attr('id');																																//	\
		$("#"+myDiv).addClass('leftNavTextCurrent').removeClass('leftNavText');																						//	\
		$("#"+myDiv.replace(/Text$/,'')).attr('id', myDiv.replace(/Text$/,'')+'_current');																			//	\
	});																																								//	\		
																																									//	\
	$(document).on('click', "#show_toc, #show_worksheet, #show_file, #show_inputs, #show_faf, #show_functions, #show_ifuns, #show_refs, #show_numbers, "			//	\
	+"#show_constants", function(){	$('#Format_Wrapper').hide();	});																								//	\
																																									//	\
function ShowMenu(type)																																				//	\			
{	if (type===0)																																					//	\
	{	$('#Insert_Block, #Move_Block, #Format_Block').hide();																										//	\
	}else																																							//	\
	{	$('#Insert_Block, #Move_Block, #Format_Block').show();		}																								//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------- Bug reporting system ----------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function ShowBugInfo()																																				//	\			
{	$('#bugid').empty();																																			//	\
	$('#bugid').append($("<option></option>").attr("value",'').text(''));																							//	\
	for (var i in DOM_Object)																																		//	\
	{	if (DOM_Object[i]['type']=="equation")																														//	\
		{	$('#bugid').append($("<option></option>").attr("value",i).text(window[i].Format_name));	}																//	\
	}																																								//	\
}																																									//	\
$(document).on('click', '#bugdone', function(e) 																													//	\
{	var fileid=$('#filenumber').attr('filenumber');																													//	\
	var bugtext=$('#bugdesc').val();																																//	\
	$.ajax ({type:"POST", url:"/Documents/SaveBug",																													//	\
		data: { fileid:$('#filenumber').attr('filenumber'), text:bugtext },error: function () { alert('Error Reporting Bug');} });									//	\
	$('#bugdesc').val('');																																			//	\
	$('#bugreturn').html('Your bug was reported, thank you for your time.');																						//	\
}); 																																								//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------ Sub Navigation Event Handlers --------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   $("#subnav_file_properties").on("click", function(){$('#InputBody, #FunctionBody').hide();	$('#FileBody').show();	 	}); 									//	\
   $("#subnav_file_inputs").on("click", function(){$('#FileBody, #FunctionBody').hide();		$('#InputBody').show(); 	}); 									//	\
   $("#subnav_file_function").on("click", function(){$('#FileBody, #InputBody').hide();		$('#FunctionBody').show();	}); 										//	\
																																									//	\
	$("#subnav_file_properties, #subnav_file_inputs, #subnav_file_function").on("click", function(){																//	\
		$("#subnav_file_properties, #subnav_file_inputs, #subnav_file_function").removeClass('subnav_current');														//	\
		$(this).addClass('subnav_current');																															//	\
	});																																								//	\
																																									//	\
   $("#subnav_faf_list").on("click", function(){$('#FunctionsImported').hide();	$('#FunctionList').show();	 	}); 												//	\
   $("#subnav_faf_imported").on("click", function(){$('#FunctionList').hide();		$('#FunctionsImported').show(); 	}); 										//	\
																																									//	\
	$("#subnav_faf_list, #subnav_faf_imported").on("click", function(){																								//	\
		$("#subnav_faf_list, #subnav_faf_imported").removeClass('subnav_current');																					//	\
		$(this).addClass('subnav_current');																															//	\
	});																																								//	\
																																									//	\
   $("#subnav_numbers_units").on("click", function(){$('#ConstantBody').hide();	$('#UnitBody').show();	 	}); 													//	\
   $("#subnav_numbers_constants").on("click", function(){$('#UnitBody').hide();		$('#ConstantBody, #constants').show(); 	}); 									//	\
																																									//	\
	$("#subnav_numbers_units, #subnav_numbers_constants").on("click", function(){																					//	\
		$("#subnav_numbers_units, #subnav_numbers_constants").removeClass('subnav_current');																		//	\
		$(this).addClass('subnav_current');																															//	\
	});																																								//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------- Event Handlers for Formatting width and margin ----------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function Bibliography()																																				//	\
{	var text='';																																					//	\
	$('#References').empty(text);																																	//	\
	for (var i in DOM_Object)																																		//	\
	{	if (DOM_Object[i]['References']!==undefined) 																												//	\
		{	for (var j in DOM_Object[i]['References'])																												//	\
			{																																						//	\
				if (DOM_Object[i]['References'][j]['type']=="web") 																									//	\
				{	text=text+'<div class="bib_line">';																												//	\
						text=text+'<div class="bib_num">'+DOM_Object[i]['References'][j]['refnum']+'</div>';														//	\
						if (DOM_Object[i]['References'][j]['author'].length>0) { text=text+DOM_Object[i]['References'][j]['author']+'. ';	}						//	\
						if (DOM_Object[i]['References'][j]['webtitle'].length>0) { text=text+'\"<a href="'+DOM_Object[i]['References'][j]['address']+'">'+DOM_Object[i]['References'][j]['webtitle']+'</a>\". ';}
						if (DOM_Object[i]['References'][j]['sitetitle'].length>0) { text=text+'<u>'+DOM_Object[i]['References'][j]['sitetitle']+'</u>. ';	}		//	\
						if (DOM_Object[i]['References'][j]['dateaccessed'].length>0) { text=text+' Date Accessed: '+DOM_Object[i]['References'][j]['dateaccessed']+'. ';}
					text=text+'</div>';																																//	\
				}else if (DOM_Object[i]['References'][j]['type']=="book")																							//	\ 
				{	text=text+'<div class="bib_line">';																												//	\
						text=text+'<div class="bib_num">'+DOM_Object[i]['References'][j]['refnum']+'</div>';														//	\
						if (DOM_Object[i]['References'][j]['author'].length>0) { text=text+DOM_Object[i]['References'][j]['author']+'. ';	}						//	\
						if (DOM_Object[i]['References'][j]['booktitle'].length>0) { text=text+'<u>'+DOM_Object[i]['References'][j]['booktitle']+'</u>. ';	}		//	\
						if (DOM_Object[i]['References'][j]['publisher'].length>0) { text=text+''+DOM_Object[i]['References'][j]['publisher']+'. ';	}				//	\
						if (DOM_Object[i]['References'][j]['datepublished'].length>0) { text=text+''+DOM_Object[i]['References'][j]['datepublished']+'. ';	}		//	\
						if (DOM_Object[i]['References'][j]['edition'].length>0) { text=text+' Edition - '+DOM_Object[i]['References'][j]['edition']+'. ';	}		//	\
						if (DOM_Object[i]['References'][j]['page'].length>0) { text=text+' Page - '+DOM_Object[i]['References'][j]['page']+'. ';	}				//	\
					text=text+'</div>';																																//	\
				}else if (DOM_Object[i]['References'][j]['type']=="mag") 																							//	\
				{	text=text+'<div class="bib_line">';																												//	\
						text=text+'<div class="bib_num">'+DOM_Object[i]['References'][j]['refnum']+'</div>';														//	\
						if (DOM_Object[i]['References'][j]['author'].length>0) { text=text+DOM_Object[i]['References'][j]['author']+'. ';	}						//	\
						if (DOM_Object[i]['References'][j]['pagetitle'].length>0) { text=text+'<u>'+DOM_Object[i]['References'][j]['pagetitle']+'</u>. ';	}		//	\
						if (DOM_Object[i]['References'][j]['magpapername'].length>0) { text=text+''+DOM_Object[i]['References'][j]['magpapername']+'. ';	}		//	\
						if (DOM_Object[i]['References'][j]['datepublished'].length>0) { text=text+''+DOM_Object[i]['References'][j]['datepublished']+'. ';	}		//	\
						if (DOM_Object[i]['References'][j]['page'].length>0) { text=text+' Page - '+DOM_Object[i]['References'][j]['page']+'. ';	}				//	\
					text=text+'</div>';																																//	\
				}else if (DOM_Object[i]['References'][j]['type']=="enc") 																							//	\
				{	text=text+'<div class="bib_line">';																												//	\
						text=text+'<div class="bib_num">'+DOM_Object[i]['References'][j]['refnum']+'</div>';														//	\
						if (DOM_Object[i]['References'][j]['author'].length>0) { text=text+DOM_Object[i]['References'][j]['author']+'. ';	}						//	\
						if (DOM_Object[i]['References'][j]['entryname'].length>0) { text=text+'<u>'+DOM_Object[i]['References'][j]['entryname']+'</u>. ';	}		//	\
						if (DOM_Object[i]['References'][j]['encname'].length>0) { text=text+''+DOM_Object[i]['References'][j]['encname']+'. ';	}					//	\
						if (DOM_Object[i]['References'][j]['edition'].length>0) { text=text+'Edition - '+DOM_Object[i]['References'][j]['edition']+'. ';	}		//	\
						if (DOM_Object[i]['References'][j]['page'].length>0) { text=text+' Page - '+DOM_Object[i]['References'][j]['page']+'. ';	}				//	\
					text=text+'</div>';																																//	\
	}	}	}	}																																					//	\
	$('#References').append(text);																																	//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------- Event Handlers for Formatting width and margin ----------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$("#Format_Bar").on("blur", ".widthitem", function(event) {																										//	\
		var id=$('#currentitem').attr('itemid');																													//	\
		var width=$(this).attr('value');																															//	\
		$('#'+id).width(width);																																		//	\
		$('#'+id).find('table.contenttable').width(width);																											//	\
		$('#'+id).find('table.contenttable tbody').width(width);																									//	\
		var numCols = $('#'+id).find('tr')[0].cells.length;																											//	\
		var tdwidth=width/numCols-numCols;																															//	\
		tdwidth=Math.floor(tdwidth);																																//	\
		$('#'+id).find('table.contenttable td').width(tdwidth);																										//	\
		$('#'+id).find('#tableinput').width(tdwidth);																												//	\
		$('#'+id).find('.tableheader').width(tdwidth);																												//	\
	}); 																																							//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------- The Inputs Page and Associated Items -----------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------- HIDE / DISPLAY THE INPUTS DIALOG ----------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------*/
	$('#Inputs_showinputfile').toggle(																							//	\--- These two events simply hide and show the area that 
	 function(){  																												//	\--- holds the lists of files and folders and the possible 
	     $('#Inputs_files').show();   																							//	\--- inputs from them.
	     $('#Inputs_showinputfile').html('Done Editing Inputs');																//	\
	     DisplayInputs();  																										//	\
	},function(){   																											//	\
		$('#Inputs_files').hide();																								//	\
	     $('#Inputs_showinputfile').html('Add / Remove inputs');																//	\
	});																															//	\
/*---------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------*/
	function DisplayInputs()																									//	\--- This function is called whenever the InputBody is displayed 	
	{																															//	\--- from the left menu. It simply displays the inputs or a 
		$("#inputstable").find('tr').slice(1).remove();																			//	\--- message, and then gets the current directory and calls another 
		if (jQuery.isEmptyObject(FileInputs)) 																					//	\--- function to display the appropriate files and folders.
		{	$('#inputstable').hide(); 	$('#noinputsmessage').show();															//	\
		}else																													//	\
		{	$('#inputstable').show();	$('#noinputsmessage').hide();															//	\
			for (var i in FileInputs)																							//	\
			{	if (FileInputs[i]['size']=="1x1") { var value=FileInputs[i]['Solution_real']['0-0']; 							//	\
				}else { var value="Matrix - "+FileInputs[i]['size']; }															//	\
				var temp='<tr id="'+FileInputs[i]['filenumber']+''+FileInputs[i]['id']+'" ';									//	\
				temp=temp+' real="'+FileInputs[i]['Solution_real']+'" imag="'+FileInputs[i]['Solution_imag']+'" ';				//	\
				temp=temp+' filenumber="'+FileInputs[i]['filenumber']+'" name="'+FileInputs[i]['name']+'" ';					//	\
				temp=temp+'itemid="'+FileInputs[i]['id']+'">';																	//	\
				temp=temp+'<td>'+FileInputs[i]['name']+'</td>';																	//	\
				temp=temp+'<td><div class="Inputs_altnameshow">'+FileInputs[i]['altname']+'</div>';								//	\
				temp=temp+'<input type="text" class="Inputs_altname" placeholder="'+FileInputs[i]['altname']+'"></td>';			//	\
				temp=temp+'<td>'+value+'</td>';																					//	\
				temp=temp+'<td>'+FileInputs[i]['Units_units']+'</td>';															//	\
				temp=temp+'<td>File</td>';																						//	\
				temp=temp+'<td>'+FileInputs[i]['source']+'</td></tr>';															//	\
				$('#inputstable tr:last').after(temp);																			//	\
			}																													//	\
		}																														//	\
		var username=$('#filenumber').attr('username');																			//	\
		if ($('#Inputs_currentlocation').val()==="")																			//	\
		{	$('#Inputs_currentlocation').val('http://www.cadwolf.com/Workspaces/'+username.replace(/[ ]+/g,'_')+'/');			//	\
		}else																													//	\
		{	var thisdirectory=$('#Inputs_currentlocation').val().replace(" ","_");												//	\
			thisdirectory=thisdirectory.replace("http://www.cadwolf.com/Workspaces/","");										//	\
			thisdirectory=thisdirectory.replace("www.cadwolf.com/Workspaces/","");												//	\
			thisdirectory=thisdirectory.replace("cadwolf.com/Workspaces/","");													//	\
			thisdirectory=thisdirectory.replace("Workspaces/","");																//	\
		}																														//	\
		GetDisplayFiles(thisdirectory, username);																				//	\
	}																															//	\
/*---------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------- GET FOLDER OR DIRECTORY CONTENTS TO DISPLAY -------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------*/
	function GetDisplayFiles(Directory, username)																				//	\--- This function is called whenever a new directory is set. It 
	{	$.ajax ({async: false, type:"POST",	url:"/Documents/GetFileFolderContent",												//	\--- takes in this new directory and calls an AJAX function to 
			data: { type:"files", directory:Directory },																		//	\--- grab the contents of that directory. It is returned in the
			success: function(data) {	$('#Inputs_folderwindow').html(data); }													//	\--- proper format and simply placed into the appropriate directory.
		});																														//	\
	}																															//	\
/*---------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------- Units tables and items -----------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(".units_showhide").on("click", function(e) 
	{	var tablename=$(this).attr('label');
		$('table.units').hide();
		$('#'+tablename).show();
	});
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------- The File as a function Items ------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------- CHANGING THE NAME THE FILE IS CALLED BY AS A FUNCTION ----------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$("#file_functionname").on("focusout keyup", function(e) 																								//	\
	{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))||(e.type=="focusout")) 																//	\
		{																																					//	\ 
			$.ajax ({ type:"POST", url:"/Documents/FunctionName", data: { fileid:$('#filenumber').attr('filenumber'), name:$('#file_functionname').val() },	//	\
		        error: function () { alert('There was an error updating the inputs');},																		//	\
				success: function(data) {																													//	\
		             if (data=="0") { $('#filename_error').html('You do not have permission to edit this file\'s function name.'); }						//	\
		             if (data=="1") { $('#filename_error').html('The file is now called by the name "'+$('#file_functionname').val()+'".'); }				//	\
		        },																																			//	\
			});																																				//	\
		}																																					//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------- FINISHED EDITING FAF LINE --------------------------------------------------------------------------------*/					
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This code acts whenever the user enters a new address for a file as a function. It is composed of three ajax calls that accomplish the following actions.						\
	1. The first call verifies that the address entered is a legitimate file, that the user in question has the right to access it, and that it is set up properly. 				\
	2. The second step and retrieves the file data. This file data includes	the function name, the URL, and the ID.																	\
	3. It then creates an entry in the ImportedFunctions object 																													\
	holding the basic information for the function. Once this is done, the function calls another ajax function 																	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('keyup', '.FAF_input', function(e) 	 																														//	\
	{	if ((e.keyCode == 13)||(e.which == 13))																																	//	\
		{	var text=$(this).val();																																				//	\
//			var thisline=$(this).closest('.Profile_FAF_line');																													//	\
			var thisline=$(this);																																				//	\
			var inserttext='<div class="Profile_FAF_address">'+text+'</div>';																									//	\
			$(this).closest('.Profile_FAF_line').removeClass('error');																											//	\
			$.ajax 																																								//	\
			({	type:"POST", 																																					//	\
				url:"/Documents/VerifyAddress",																																	//	\
				data:{ path:text },																																				//	\
				success: function(data) 																																		//	\
				{	objectdata=JSON.parse(data); 																																//	\
					if (objectdata==0) 		 																																	//	\
					{	$('#message').show().html('You do not have permission to use that file.');																				//	\
					}else if (objectdata['ID']=="false")  																														//	\
					{	$('#message').show().html('The path entered was not a valid file address.');																			//	\
						thisline.closest('.Profile_FAF_line').addClass('error');																								//	\
						thisline.closest('.Profile_FAF_addressholder').html('<div class="Profile_FAF_address">'+text+'</div>');													//	\
						thisline.closest('.Profile_FAF_addressholder').siblings('.Profile_FAF_nameholder').html('<div class="Profile_FAF_name">NA</div>');						//	\
					}else if (objectdata['FunctionName']==="") 																													//	\
					{	$('#message').show().html('The file entered did not have a function name.');																			//	\
						thisline.closest('.Profile_FAF_line').addClass('error');																								//	\
						thisline.closest('.Profile_FAF_addressholder').html('<div class="Profile_FAF_address">'+text+'</div>');													//	\
						thisline.closest('.Profile_FAF_addressholder').siblings('.Profile_FAF_nameholder').html('<div class="Profile_FAF_name">NA</div>');						//	\
					}else 																																						//	\
					{	NameCheck=VerifyName(objectdata['FunctionName']);																										//	\
						if (NameCheck) 																																			//	\
						{ 	$('#message').show().html('The file chosen uses a function name -'+objectdata['FunctionName']+'- that already has a file assigned to it.');			//	\
							thisline.closest('.Profile_FAF_line').addClass('error');																							//	\
						}		 																																				//	\
						thisline.closest('.Profile_FAF_line').attr('fileid',objectdata['ID']);																					//	\
						thisline.closest('.Profile_FAF_addressholder').siblings('.Profile_FAF_nameholder').html('<div class="Profile_FAF_name">'+objectdata['FunctionName']+'</div>');	//	\
						thisline.closest('.Profile_FAF_addressholder').html('<div class="Profile_FAF_address">'+objectdata['address']+'</div>');								//	\
						if (!ImportedFunctions[objectdata['FunctionName']]) 																									//	\
						{	ImportedFunctions[objectdata['FunctionName']]={};																									//	\
							ImportedFunctions[objectdata['FunctionName']]['fileid']=objectdata['ID'];																			//	\
							ImportedFunctions[objectdata['FunctionName']]['filepath']=objectdata['address'];																	//	\
							ImportedFunctions[objectdata['FunctionName']]['inputs']={};																							//	\
							ImportedFunctions[objectdata['FunctionName']]['outputs']={};																						//	\
							$.ajax 																																				//	\
							({	type:"POST", 																																	//	\
								url:"/Documents/FileFunctionInOut", 																											//	\
								data: { fileid:objectdata['ID'] },																												//	\
						        error: function () { alert('There was an error retrieving this item');},																		//	\
					    	    success: function (data) 																														//	\
								{	var temp=JSON.parse(data);																													//	\
									ImportedFunctions[objectdata['FunctionName']]['inputs']=JSON.parse(temp['info']['inputs']);													//	\
									ImportedFunctions[objectdata['FunctionName']]['outputs']=JSON.parse(temp['info']['outputs']);												//	\
									ImportedFunctions[objectdata['FunctionName']]['lastcheck']=new Date();																		//	\
									ImportedFunctions[objectdata['FunctionName']]['items']={};																					//	\
									for (var a in temp['fdata'])																												//	\
									{	var loc=parseInt(temp['fdata'][a]['Document']['location']);																				//	\
										ImportedFunctions[objectdata['FunctionName']]['items'][loc]={};																			//	\
										ImportedFunctions[objectdata['FunctionName']]['items'][loc]['id']=temp['fdata'][a]['Document']['id'];									//	\
										if (temp['fdata'][a]['Document']['vartype']=="3")																						//	\
										{	ImportedFunctions[objectdata['FunctionName']]['items'][loc]['type']="equation"; 													//	\
											var eqData=JSON.parse(temp['fdata'][a]['Document']['data']);																		//	\
											ImportedFunctions[objectdata['FunctionName']]['items'][loc]['equation']=eqData['Format_equation'];									//	\
											ImportedFunctions[objectdata['FunctionName']]['items'][loc]['parent']=eqData['Page_parentid'];										//	\
											ImportedFunctions[objectdata['FunctionName']]['items'][loc]['topparent']=eqData['Page_topparentid'];								//	\
											ImportedFunctions[objectdata['FunctionName']]['items'][loc]['name']=eqData['Format_name'];											//	\
										}else if (temp['fdata'][a]['Document']['vartype']=="6")																					//	\
										{	ImportedFunctions[objectdata['FunctionName']]['items'][loc]['type']="forloop";														//	\
											var eqData=JSON.parse(temp['fdata'][a]['Document']['data']);																		//	\
											for (var objProp in eqData) 																										//	\
											{ ImportedFunctions[objectdata['FunctionName']]['items'][loc][objProp]=eqData[objProp]; }											//	\
										}else if (temp['fdata'][a]['Document']['vartype']=="7")																					//	\
										{	ImportedFunctions[objectdata['FunctionName']]['items'][loc]['type']="whileloop";													//	\
											var eqData=JSON.parse(temp['fdata'][a]['Document']['data']);																		//	\
											for (var objProp in eqData) 																										//	\
											{ ImportedFunctions[objectdata['FunctionName']]['items'][loc][objProp]=eqData[objProp]; }											//	\
										}else if (temp['fdata'][a]['Document']['vartype']=="8")																					//	\
										{	ImportedFunctions[objectdata['FunctionName']]['items'][loc]['type']="ifelse";														//	\
											var eqData=JSON.parse(temp['fdata'][a]['Document']['data']);																		//	\
											for (var objProp in eqData) 																										//	\
											{ ImportedFunctions[objectdata['FunctionName']]['items'][loc][objProp]=eqData[objProp]; }											//	\
										}																																		//	\
									}																																			//	\
									$.ajax ({ type:"POST", url:"/Documents/UpdateFunctionInputs", 																				//	\
										data: { fileid:$('#filenumber').attr('filenumber'), thisdata: JSON.stringify(ImportedFunctions), type:'Functions' },					//	\
								        error: function () { alert('There was an error saving the imported functions data.');},													//	\
									});																																			//	\	
								}																																				//	\
							});																																					//	\
						}		 																																				//	\
					}		 																																					//	\
				} 																																								//	\
			});																																									//	\
		}		 																																								//	\
	});					 																																						//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

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
//--------------------------------------------------------- DELETE A FAF LINE ON THE DOCUMENTS PAGE -----------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', '.File_FAF_delete', function(e) 	 																							//	\
	{	$(this).closest('.Profile_FAF_line').remove();																										//	\
		var name=$(this).closest('.Profile_FAF_line').find('.Profile_FAF_name').html();																		//	\
		delete ImportedFunctions[name];																														//	\
		UpdateFileFAFs();																																	//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------- CREATE THE FAF LIST FROM THE TABLE ON THE DOCUMENTS PAGE -----------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
function UpdateFileFAFs()																																	//	\
{	$('#message').hide();  CADWolf_FAFList={};																												//	\
	var fileid=$('#filenumber').attr('filenumber');																											//	\
	$('.Profile_FAF_line').each(function( index ) {																											//	\
		if (index>0)																																		//	\
		{	CADWolf_FAFList[index-1]={};																													//	\
			CADWolf_FAFList[index-1]['address']=$(this).find('.Profile_FAF_address').html();																//	\
			CADWolf_FAFList[index-1]['name']=$(this).find('.Profile_FAF_name').html();																		//	\
			CADWolf_FAFList[index-1]['fileid']=$(this).attr('fileid');																						//	\
		}																																					//	\
	});																																						//	\
	$.ajax (																																				//	\
	{	type:"POST", url:"/Documents/UpdateFileFAFList", 																									//	\
		data: { FAFList:JSON.stringify(CADWolf_FAFList), fileid:fileid }																					//	\
	});																																						//	\
}																																							//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- THE TABLE OF CONTENTS AND FILE PAGE INPUTS --------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- Creating the table of contents ---------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	function DisplayTOC()																																	//	\
	{	var text=''; var h1tag='A'; var h2tag='1'; var h3tag='a'; var h4tag='1';	var loc=0;		var thisid='';											//	\
		$('#TOC_holder').html('');																															//	\
		$('h1, h2, h3, h4').each(function( index ) {																										//	\
  			text='';																																		//	\
  			thisid=$(this).closest('.main_item').find('.header_block').attr('id');																			//	\
  			loc=DOM_Object[thisid]['location'];																												//	\
  			if ( $( this ).is ('h1'))																														//	\
  			{	text='<div class="TOC_1 TOC_line" location="'+loc+'">';																						//	\
  				text=text+'<div class="TOC_num">'+h1tag+'</div><div class="TOC_title">'+$( this ).html()+'</div></div>';									//	\
  				h1tag=String.fromCharCode(h1tag.charCodeAt(0) + 1);																							//	\
  				h2tag=1; h3tag='a'; h4tag=1;																												//	\
  			}else if ( $( this ).is ('h2'))																													//	\
  			{	text='<div class="TOC_2 TOC_line" location="'+loc+'">';																						//	\
  				text=text+'<div class="TOC_num">'+h2tag+'</div><div class="TOC_title">'+$( this ).html()+'</div></div>';									//	\
  				h2tag=parseInt(parseInt(h2tag)+ 1);																											//	\
  				h3tag='a'; h4tag=1;																															//	\
  			}else if ( $( this ).is ('h3'))																													//	\
  			{	text='<div class="TOC_3 TOC_line" location="'+loc+'">';																						//	\
  				text=text+'<div class="TOC_num">'+h3tag+'</div><div class="TOC_title">'+$( this ).html()+'</div></div>';									//	\
  				h3tag=String.fromCharCode(h3tag.charCodeAt(0) + 1);																							//	\
  				h4tag=1;																																	//	\
  			}else if ( $( this ).is ('h4'))																													//	\
  			{	text='<div class="TOC_4 TOC_line" location="'+loc+'">';																						//	\
  				text=text+'<div class="TOC_num">'+h4tag+'</div><div class="TOC_title">'+$( this ).html()+'</div></div>';									//	\
  				h4tag=parseInt(parseInt(h2tag)+ 1);																											//	\
  			}																																				//	\
  			$('#TOC_holder').append(text);																													//	\
		});																																					//	\
		$('#TOCBody').show();																																//	\
	}																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------- CHANGING THE STATUS OF THE TOC ------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('change', '#TOC_status', function(event) 																								//	\
	{	var fileid=$('#filenumber').attr('filenumber');																										//	\
		$.ajax ({	type:"POST", url:"/Documents/TOC_Status", data: { status:$(this).val(), fileid:fileid	}	});											//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------- SELECTING A PARTICULAR TOC ELEMENT TO VIEW ---------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', '.TOC_line', function(event) 																									//	\--- This is the code that is the main worker for the table of
	{	var fileid=$('#filenumber').attr('filenumber');																										//	\--- contents. When a user clicks on a section, it fetches the 
		if ($(this).hasClass('TOC_1')) { var thisheader=1; }																								//	\--- data for text, plots, and images. The reason for this is  
		if ($(this).hasClass('TOC_2')) { var thisheader=2; }																								//	\--- that the text, plots, and images use a lot of memory and
		if ($(this).hasClass('TOC_3')) { var thisheader=3; }																								//	\--- i don't like to download and hold them. The result is that
		if ($(this).hasClass('TOC_4')) { var thisheader=4; }																								//	\--- I delete their contents whenever the user looks at a different 
		var toploc=$(this).attr('location');																												//	\--- part of the document and redownload it whenever the relative
		var bottomloc="end";																																//	\--- piece is looked at. I am going to be doing some experimentation
		var text=$(this).nextAll('.TOC_line');																												//	\--- to determine which components are best to store in memory and 
		var flag=0;																																			//	\
		text.each(function( index ) 																														//	\--- which are best to delete and redownload.
		{	var temp=$(this); 																																//	\
			if (temp.hasClass('TOC_1')) { var testheader=1; }																								//	\
			if (temp.hasClass('TOC_2')) { var testheader=2; }																								//	\
			if (temp.hasClass('TOC_3')) { var testheader=3; }																								//	\
			if (temp.hasClass('TOC_4')) { var testheader=4; }																								//	\
			if ((testheader<=thisheader)&&(flag===0)) { bottomloc=temp.attr('location'); flag=1; }															//	\  
		});																																					//	\   
		$('#TOCBody').hide();	$('#MainBody').show();																										//	\
		$("#show_worksheet").attr('id','show_worksheet_current');	$("#show_toc_current").attr('id','show_toc');											//	\
		Handle_TOCClick(toploc, bottomloc);																													//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------- SHOWING AND HIDING THE VARIOUS LEVELS OF THE TOC ---------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', '#viewtocsections', function(event) {	$('#tocsections').toggle();	});															//	\
	$(document).on('click', '.viewtocs', function(event) {																									//	\
		if ($(this).attr('id')=="viewtocH1") 	{	$('.TOC_1').show();		$('.TOC_2, .TOC_3, .TOC_4, .TOC_5').hide();	}									//	\
		if ($(this).attr('id')=="viewtocH2") 	{	$('.TOC_1, .TOC_2').show();		$('.TOC_3, .TOC_4, .TOC_5').hide();	}									//	\
		if ($(this).attr('id')=="viewtocH3") 	{	$('.TOC_1, .TOC_2, .TOC_3').show();		$('.TOC_4, .TOC_5').hide();	}									//	\
		if ($(this).attr('id')=="viewtocH4") 	{	$('.TOC_1, .TOC_2, .TOC_3, .TOC_4').show();		$('.TOC_5').hide();	}									//	\
		if ($(this).attr('id')=="viewtocH5") 	{	$('.TOC_1, .TOC_2, .TOC_3, .TOC_4, .TOC_5').show();		}												//	\
	});																																						//	\
	$(document).on('click', '#viewalldoc', function(event) {	Handle_TOCClick(0, "end");	});																//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------- FUNCTION TO HIDE / SHOW, AND GRAB TOC DATA ------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	function Handle_TOCClick( toploc, bottomloc)																											//	\***************************************************************
	{	var fileid=$('#filenumber').attr('filenumber');																										//	\
		for (var ItemID in DOM_Object)							 																							//	\    This still needs to be updated so that it removes plots
		{	if ((parseInt(DOM_Object[ItemID]['location'])<toploc)||(parseInt(DOM_Object[ItemID]['location'])>=bottomloc))									//	\    and images from the DOM
			{	$('#'+ItemID).closest('.main_item').hide();																									//	\***************************************************************
				if (DOM_Object[ItemID]['type']=="text")		{	CKEDITOR.instances[ItemID].setData(''); }													//	\
				if (DOM_Object[ItemID]['type']=="equation")	{	$('#'+ItemID).find('.eqshow').html('');	 }													//	\
				if (DOM_Object[ItemID]['type']=="plot")																										//	\
				{	if (window[ItemID]!==undefined) { delete window[window[ItemID].Chart_Name];	$('#'+ItemID).html(''); } }									//	\
			}else																																			//	\
			{	$('#'+ItemID).closest('.main_item').show();																									//	\
				if ((DOM_Object[ItemID]['type']=="equation")&&($('#'+ItemID).find('.eqshow').html()===''))													//	\
				{	if (window[ItemID].Errors_flag=='1') { $('#'+ItemID).find('.eqshow').html('$$'+window[ItemID].Errors_errors[0]+'$$');					//	\
				}else { $('#'+ItemID).find('.eqshow').html('$$'+window[ItemID].Format_left+"="+window[ItemID].Format_showequation+"="+window[ItemID].Format_showsolution+'$$'); } }											//	\
				if (DOM_Object[ItemID]['type']=="plot") { if (window[ItemID]!==undefined) { CreatePlot(ItemID, 0); } }										//	\
			}																																				//	\
		}																																					//	\
		$.ajax ({																																			//	\
			type:"POST", url:"/Documents/TOC_Update", data: { fileid:fileid, toploc:toploc, botloc:bottomloc	},											//	\
			success: function (data) {																														//	\
				if (data.length)																															//	\
				{	filedata=JSON.parse(data); 																												//	\
					for (var index in filedata)																												//	\
					{	if (filedata[index]['DocumentTemp']['vartype']=='1')																				//	\
						{	CKEDITOR.instances[filedata[index]['DocumentTemp']['id']].setData(filedata[index]['DocumentTemp']['data']);	}					//	\
					}																																		//	\
				}																																			//	\
			}																																				//	\
		});																																					//	\
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);																											//	\
	}																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------- SELECTING TO EDIT THE TITLE OF SUBTITLE ---------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', '#titleoption, #subtitleoption', function(event) 																				//	\
	{	var title=$(this).html();																															//	\
		var text='<input type="text" id="titleedit" value="'+title+'">';																					//	\
		if ($(this).is("#titleoption")) 	{ $(this).attr('type','titleoption'); }																			//	\
		if ($(this).is("#subtitleoption")) 	{ $(this).attr('type','subtitleoption'); }																		//	\
		$(this).html(text);																																	//	\
		$(this).attr('id', '');																																//	\
	});																																						//	\
	$(document).on('keyup', '#titleedit', function(e)		 																								//	\
	{	if ((e.keyCode == 13)||(e.which == 13))												 																//	\
		{	var text=$(this).val();																															//	\
			var fileid=$('#filenumber').attr('filenumber');																									//	\
			var type=$(this).closest('.file_inforight').attr('type');																						//	\
			$.ajax ({	type:"POST", url:"/Documents/ChangeTitle", data: { fileid:fileid, type:type, text:text	} });										//	\
			$(this).closest('.file_inforight').attr('id', type);																							//	\
			$(this).closest('.file_inforight').attr('type', '');																							//	\
			$(this).closest('#titleoption, #subtitleoption').html(text);																					//	\
			if (type=="titleoption") { $('.titleblock').html(text); }																						//	\
			if (type=="subtitleoption") { $('.subtitleblock').html(text); }																					//	\
		}																																					//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------ SELECTING TO EDIT THE FILE DESCRIPTION ---------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', '#file_description', function(event) 																							//	\
	{	if ($('#file_description').find('input').val()===undefined)																							//	\
		{	var text=$('#file_description').html();																											//	\
//			$('#file_description').html('<input type="text" value="'+text+'" />');																			//	\	
			if ($('#file_description').find('textarea').length===0) { $('#file_description').html('<textarea rows="25" cols="50">'+text+'</textarea>');	}	//	\	
		}																																					//	\
	});																																						//	\
	$(document).on('keyup', '#file_description', function(e)		 																						//	\
	{	if ((e.keyCode == 13)||(e.which == 13))												 																//	\
		{	var text=$('#file_description').find('textarea').val();																							//	\
			var fileid=$('#filenumber').attr('filenumber');																									//	\
			$.ajax ({	type:"POST", url:"/Documents/ChangeDescription", data: { fileid:fileid, text:text	} });											//	\
			$('#file_description').html(text);																												//	\
		}																																					//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------- THE IMAGE ITEM ------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- FUNCTION TO GRAB IMAGE DATA ------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	function Handle_Image(folder)																															//	\
	{	$('.imagepropsline').remove();																														//	\
		$.ajax ({ type:"POST", url:"/Documents/GetFolderImages", async: false,																				//	\
			data: { folder:folder },																														//	\
		    error: function () { alert('There was an error getting the folder contents');},																	//	\
	    	success: function (data) 																														//	\
	    	{	imagedata=JSON.parse(data); 																												//	\
	    		$('#imgselect').val(imagedata['folder']);																									//	\
				for (var i in imagedata)																													//	\
				{	if (typeof(imagedata[i])=="object")																										//	\
					{	if (imagedata[i]['Workspace']['File_or_Folder']=='0') 																				//	\
						{ 	temp='<div class="imagepropsline" itemname="'+imagedata[i]['Workspace']['name']+'" itemid="'+imagedata[i]['Workspace']['id']+'"';//	\
							temp=temp+'type="'+imagedata[i]['Workspace']['type']+'" upload="'+imagedata[i]['Workspace']['modified']+'">';					//	\	
							temp=temp+'<div class="imageprops_folder">&nbsp</div>';																			//	\	
							temp=temp+'<div class="imageprops_name">'+imagedata[i]['Workspace']['name']+'</div></div>';										//	\
						}else																																//	\
						{ 	var date=imagedata[i]['Workspace']['modified'];																					//	\
							date=new Date(date.replace(/-/g,"/"));																							//	\
							temp='<div class="imagepropsline" itemname="'+imagedata[i]['Workspace']['name']+'" itemid="'+imagedata[i]['Workspace']['id']+'"';//	\
							temp=temp+'type="'+imagedata[i]['Workspace']['type']+'" upload="'+date+'">';													//	\	
							temp=temp+'<div class="imageprops_image">&nbsp</div>';																			//	\	
							temp=temp+'<div class="imageprops_name">'+imagedata[i]['Workspace']['name']+'</div></div>';		}								//	\
						$('#imageselect_images').append(temp);																								//	\
			}	}	}																																		//	\
		}); 																																				//	\
	}																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------- SHOW AND HIDE THE IMAGE SPECIFICS -------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', '#close_imagespec', function(event) {	$('#image_spec').hide(); });															//	\
	$(document).on('click', '#imagespecs_showselect', function(event) {	$('#imagespecs_select').toggle(); $('#imagespecs_props, #imagespecs_ref').hide();});//	\
	$(document).on('click', '#imagespecs_showprops', function(event) {	$('#imagespecs_props').toggle(); $('#imagespecs_select, #imagespecs_ref').hide();});//	\
	$(document).on('click', '#imagespecs_showrefs', function(event) {	$('#imagespecs_ref').toggle(); $('#imagespecs_select, #imagespecs_props').hide();});//	\
	$(document).on('click', '.imagespecs', function(event) 																									//	\
	{	var id=$(this).closest('.icon_holder').siblings('.image').attr('id');																				//	\
		Handle_Image(); 																																	//	\
		PopulateReferences(id);																																//	\
		$('#equation_spec, #loop_spec, #table_spec, #symeq_spec, #text_spec, #plot_spec').hide();															//	\
		$('#image_spec').attr('imageid',$(this).closest('.icon_holder').siblings('.image').attr('id')); 	 												//	\
		$('#image_spec').show(); 																															//	\
		$('#imgheight').val($('#'+id).find('img').height());																								//	\
		$('#imgwidth').val($('#'+id).find('img').width());																									//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------ CHOOSING THE FOLDER TO GRAB IMAGES -------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('keyup', '#imgselect', function(e)		 																								//	\
	{	if ((e.keyCode == 13)||(e.which == 13))												 																//	\
		{	Handle_Image($('#imgselect').val());	}																										//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------- ADDING AN IMAGE ITEM ------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', '#addimage', function(event) 																									//	\
	{	var id=Get_ID("Image");																																//	\
		var temp=$('#tocloneimage').clone(); 																												//	\
		temp.attr('id','');																																	//	\
		temp.children('.image').attr("id",id).attr('type','10');																							//	\
		$('#image_spec').attr('imageid',id).show();																											//	\
		AddNewItem(id, temp, "image", '10');																												//	\
		Handle_Image();																																		//	\
		$('#equation_spec, #loop_spec, #table_spec, #symeq_spec, #text_spec, #plot_spec').hide();															//	\
		$('#image_spec').attr('imageid',$(this).closest('.icon_holder').siblings('.image').attr('id')).show();  											//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------- SELECTING AN IMAGE --------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', '.imageprops_image', function(event) 																							//	\
	{	if ($(this).closest('.imagepropsline').attr('type')=="image/jpg") { var type="jpg";																	//	\
		}else if ($(this).closest('.imagepropsline').attr('type')=="image/jpeg") { var type="jpeg";															//	\
		}else if ($(this).closest('.imagepropsline').attr('type')=="image/gif") { var type="gif";															//	\
		}else if ($(this).closest('.imagepropsline').attr('type')=="image/png") { var type="png";															//	\
		}else if ($(this).closest('.imagepropsline').attr('type')=="image/bmp") { var type="bmp";	}														//	\
		var thisid=$('#image_spec').attr('imageid');																										//	\
		var imageid=$(this).closest('.imagepropsline').attr('itemid');																						//	\
		$('#'+thisid).html('<img src="/UserImages/'+imageid+'.'+type+'" />');																				//	\
		$('#'+thisid).attr('src', imageid);																													//	\
		$('#'+thisid).attr('type', $(this).closest('.imagepropsline').attr('type'));																		//	\
		$('#imgheight').val($('#'+thisid).find('img').height());																							//	\
		$('#imgwidth').val($('#'+thisid).find('img').width());																								//	\
		$(this).closest('.main_item').addClass('update');																									//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------- SELECTING A FOLDER --------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', '.imageprops_folder', function(event) 																							//	\
	{	var current_folder=$('#imgselect').val();																											//	\
		var new_folder=$(this).siblings('.imageprops_name').html();																							//	\
		var dest_folder=current_folder+'/'+new_folder;																										//	\
		$('#imgselect').val(dest_folder);																													//	\
		Handle_Image(dest_folder);																															//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- UPDATE THE HEIGHT AND WIDTH ----------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('keyup', '#imgheight', function(e){		 																								//	\
		if ((e.keyCode == 13)||(e.which == 13))												 																//	\
		{	var id=$('#image_spec').attr('imageid');																										//	\
			$('#'+id).find('img').height($(this).val());	}																								//	\
			$(this).closest('.main_item').addClass('update');																								//	\
	});																																						//	\
	$(document).on('keyup', '#imgwidth', function(e){		 																								//	\
		if ((e.keyCode == 13)||(e.which == 13))												 																//	\
		{	var id=$('#image_spec').attr('imageid');																										//	\
			$('#'+id).find('img').width($(this).val());		}																								//	\
			$(this).closest('.main_item').addClass('update');																								//	\
	});																																						//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- CONTROLLING THE LOGIN BOX STUFF ------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on("click", '#login_drop', function(event){	$("#dropbox").toggle();  }); 																	//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//


} );