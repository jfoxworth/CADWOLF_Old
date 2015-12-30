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
	var fileid=$('#filenumber').attr('filenumber');			APLOT='';																			//	\--- variables, and initializes the text objects. 
	PlaceInMemory('MainBody', function() { PlaceItems('MainBody', function () { FormatWhileLoops(function () { 									//	\
		FormatIfElseStatements(function () { HandleTOC( function() { BuildScaleUnits(function() { 												//	\
		BuildParseUnits(function(){ GetDependents(fileid, function(){ PlaceRefs (function(){ FormatItems(function(){ MakeBigChart( function(){ 	//	\
		}); }); }); }); }); }); }); }); }); }); });	Big.DP=16;																					//	\
});																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//

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
//------------------------------------------------------------------------- CLONE -------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function clone(obj){																																				//	\
    if(obj === null || typeof(obj) != 'object'){ return obj; }																										//	\
    var temp = {};																																					//	\
    for(var key in obj){ if(obj.hasOwnProperty(key)){ temp[key] = clone(obj[key]);  } }																				//	\
    return temp;																																					//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

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

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------ EQUATIONS ----------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------- Functions to Parse Equations ------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//-------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------- THE EQUATION OBJECT --------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------//
function Equation(id, name) 																										//	\
{ 																																	//	\
	this.Format_id=id;																												// 	\--- The unique ID of the equation "var xxx"
	this.Original_id=id;																											// 	\--- This allows the originating equation id to be passed so that tagged variables can be associated 
	if (name) { this.Format_name=name;	}else { this.Format_name="TempEq"; }														// 	\--- The name of the variable as entered by the user on the left side of equal sign
	this.Format_equation='';																										// 	\--- The equation as entered by the user
	this.Format_showequation='';																									// 	\--- The equation formatted to be shown on screen
	this.Format_showsolution='';																									// 	\--- The solution formatted to be shown on screen
	this.Format_equationinuse='';																									// 	\--- The altered version of the equation used in solving it
	this.Format_right='';																											// 	\--- The right side of the equation
	this.Format_left='';																											//	\
	this.Format_size='1x1';																											// 	\--- The size of the matrix or integer (1x1) that is the answer
	this.Format_numinds='';																											// 	\--- The number of indices or dimensions in an array
	this.Format_type=1;																												// 	\--- 1 for standard equation, 2 for matrix inputs
	this.Format_haschanged=1;																										// 	\--- 0 if the item has not changed and 1 if it has.
	this.Format_showtype="top";																										// 	\--- This allows the code to properly format the data to be shown. It isn't changed by the user, and is simply part of the code
	this.Format_showvalue="default";																								// 	\--- Can be default, value, size, or component. For a number, it defaults to value and cannot be changed. For a matrix, it defaults to size 
	this.Format_showcomponent='';																									// 	\--- If the user selects "component" then he is allowed to enter the components of the matrix to show.
	this.Format_editinuse=1;																										// 	\--- Whether or not the equation can be edited in use mode
	this.Solving=1;																													//	\--- 1 while the equation is being solved, 0 afterwards. Used in the show solution function
	this.Solution_convsol='';																										// 	\--- The solution of the equation used in calculations
	this.Solution_real={};																											// 	\--- The real component of the solution
	this.Solution_imag={};																											// 	\--- The imaginary component of the solution
	this.Solution_input_array=new Array();																							// 	\--- An array holding the inputs to the equation
	this.Solution_inputs=new Array();																								// 	\--- The inputs in the equation
	this.Solution_variable_array=new Array();																						// 	\--- An array containing the variables in an equation	
	this.Solution_key_array=new Array();																							// 	\--- The array holding the ones or zeros for whether or not the item is a unit
	this.Solution_unit_array=new Array();																							// 	\--- An array containing the units of each variable in equation
	this.Solution_object_array=new Array();																							// 	\--- DEPRECATED - An array containing the values of those variables
	this.Solution_temps=new Array();																								// 	\--- An array of the temporary equations used in solving the equation
	this.Solution_PostFix=new Array();																								// 	\--- The array holding the postfix form of the equation	
	this.Solution_Post_Units=new Array();																							// 	\--- The array holding the units of the postfix form
	this.Solution_realdefault=0;																									//	\--- The default number for the undefined entry in a matrix
	this.Solution_imagdefault=0;																									//	\--- The default number for the undefined entry in a matrix
	this.Page_parentid='none';																										// 	\--- The id of the creator of the equation - a for loop, a while loop, etc
	this.Page_topparentid='none';																									// 	\--- The top parent holding the equation
	this.Page_position=0;																											// 	\--- The numerical position of the equation within the document with 1 at the top
	this.Units_units='';																											// 	\--- The units as entered by the user
	this.Units_showunits='';																										// 	\--- The units that are shown and are selected by the user
	this.Units_conv_units='';																										// 	\--- The units that the equation is changed to
	this.Units_unit_array=new Array();																								// 	\--- The array of units and multiplication and division parsed 
	this.Units_conv_array=new Array();																								// 	\--- The array of scaled and converted units with multiplication and division parsed 
	this.Units_scaled_array=new Array();																							// 	\--- The unit array with the units replaced with their scaled numbers in metric units
	this.Units_base_array={};																										// 	\--- The array of base units and the numerical power of those units
	this.Units_base_string='00000000';																								// 	\--- The string holding the 0's and 1's for the base array
	this.Units_multiplier=1;																										// 	\--- The final multiplier used to adjust to proper units
	this.Units_quantity='';																											// 	\--- Length, Mass, Acceleration, etc
	this.Models_numerical='';																										// 	\--- An equation with numbers only
	this.Models_units='';																											// 	\--- A units only version of the equation
	this.Models_dimensions='';																										// 	\--- The equation with values and units
	this.Models_quantities='';																										// 	\--- The equation with quantities
	this.Errors_flag=0;																												// 	\--- 1 if there is a terminable error
	this.Errors_errors=new Array();																									// 	\--- An array of errors for this equation
	this.EqObj={};																													//	\--- The object that houses the objects that are sent to the solver for this equation
	this.inputFile='';																												// 	\--- If this equation is an input from another file, this is the ID of that file
	this.inputID='';																												// 	\--- If this equation is an input from another file, this is the ID of that equation
	this.inputType='';																												// 	\--- "File" or "Dataset"
	this.inputName='';																												// 	\--- The name of the file or dataset
	this.active=1;																													//	\
	this.FaF={};	this.fileid=$('#filenumber').attr('filenumber');	this.connected_ids={};										//	\
	for (var unitindex = 0; unitindex < UnitList.length; ++unitindex) {		this.Units_base_array[UnitList[unitindex]]=0;	}		//	\
}																																	//	\
//-------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------- MAIN SOLVE EQUATION FUNCTION ----------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------//
/*	This is the primary function that solves an equation when the user hits "Enter" when they finished entering the equation. The		\
	function does four primary things:																									\
		1. First, the function sets up a few items needed before the equation is solved. This includes resetting the real and imag		\
			numbers to null, resetting the dependents, and a few other things before the solution process begins.						\
		2. As part of the solution process, the algorithm parses out the items in the equation, it checks to see if there are any		\
			files as functions used, it also checks for subequations, and solves for both prior to the solution of the overall 			\
			equation																													\
		3. The function then sends the equation to the web worker to be solved.															\
		4. The solution is returned and the dependents are updated.																		\
//-------------------------------------------------------------------------------------------------------------------------------------*/
Equation.prototype.Solve_Equation = function(equation)																				//	\
{	DOM_Object[this.Format_id]['fileid']=$('#filenumber').attr('filenumber');														//	\
	var thisfile=this.Format_id.replace(/^File/,'').match(/^[0-9]+/);																//	\
	if (thisfile[0]!=$('#filenumber').attr('filenumber')) 	{ DOM_Object[this.Format_id]['fileid']=thisfile[0]; }					//	\
	DOM_Object[this.Format_id]['Dependents']={};																					//	\
	DOM_Object[this.Format_id]['status']=2;																							//	\
	this.EqObj={};																													//	\
	if (this.Page_parentid=='none') { this.Solution_real={}; this.Solution_imag={}; }												//	\
																																	//	\
	$('#'+this.Format_id).addClass('solving');																						//	\
	var id=this.Format_id;																											//	\
	this.Clean_Workspace(function() { 																								//	\
	Create_EqObj(id, function() { 																									//	\
	Call_Solver(id, equation, thisfile) }); }); 																					//	\
};																																	//	\
//-------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------- CLEAN THE WORKSPACE ------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------//
/*	This function goes through the DOM_Object and deletes any equations that are temporary or were created as part of an algorithm. 	\
	These may be left behind if there is an error that does not default gracefully.														\
//-------------------------------------------------------------------------------------------------------------------------------------*/
Equation.prototype.Clean_Workspace = function(callback)																				//	\
{	if ((this.Format_showtype=="top")&&(this.Page_parentid=='none'))																//	\
	{	for (var i in DOM_Object)																									//	\
		{	if (DOM_Object[i]['name']!==undefined) { if (DOM_Object[i]['name']=="TempEq") { delete DOM_Object[i]; delete window[i]; }//	\
			} else if (DOM_Object[i]['deleteme']!==undefined) 																		//	\
			{ if (DOM_Object[i]['deleteme']==1) { delete DOM_Object[i]; delete window[i];  } } }									//	\
	}																																//	\
	if (typeof(callback)=="function") { callback();	}																				//	\
};																																	//	\
//-------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------- CREATE THE EQUATION OBJECT --------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------//
/*	When the equation solver is called to solve an equation, a list of all previous equations and tables are sent. For now, the code	\
	sends all variables and tables that exist on the document prior to the equation in question. In the future, this will be changed	\
	so that only the needed equations are sent. The likely solution will be to send only the names and ids of the variables and tables	\
	and then the worker will query for the values of those equations.																	\
	This function creates the object that contains the properties of each equation and table along with the size and data.				\
//-------------------------------------------------------------------------------------------------------------------------------------*/
function Create_EqObj(id, callback)																									//	\
{	var row=0, col=0, flag=0, numberObj={};																							//	\
	window[id].EqObj={};																											//	\
	for (var ItemID in DOM_Object)																									//	\
	{	if ((DOM_Object[ItemID]['type']=="equation")&&(DOM_Object[ItemID]['location']<=DOM_Object[window[id].Format_id]['location']))//	\
		{	if (window[id].EqObj[ItemID]===undefined){ flag=1; 																		//	\
			}else if (DOM_Object[ItemID]['location']>window[id].EqObj[ItemID]['location']){ flag=1; }								//	\
			if ((flag==1)&&(DOM_Object[ItemID]['active']))																			//	\
			{	window[id].EqObj[ItemID]={};																						//	\
				window[id].EqObj[ItemID]['name']=DOM_Object[ItemID]['name'];														//	\
				window[id].EqObj[ItemID]['type']="equation";																		//	\
				window[id].EqObj[ItemID]['size']=window[ItemID]['Format_size'];														//	\
				window[id].EqObj[ItemID]['real']=window[ItemID]['Solution_real'];													//	\
				window[id].EqObj[ItemID]['imag']=window[ItemID]['Solution_imag'];													//	\
				window[id].EqObj[ItemID]['units']=window[ItemID]['Units_units'];													//	\
				window[id].EqObj[ItemID]['basearray']=window[ItemID]['Units_base_array'];											//	\
				window[id].EqObj[ItemID]['location']=DOM_Object[ItemID]['location'];												//	\
				window[id].EqObj[ItemID]['equation']=window[ItemID]['Format_equation'];												//	\
				window[id].EqObj[ItemID]['active']=DOM_Object[ItemID]['active'];													//	\
				window[id].EqObj[ItemID]['parent']=DOM_Object[ItemID]['parent'];													//	\
				window[id].EqObj[ItemID]['topparent']=DOM_Object[ItemID]['topparent'];												//	\
				window[id].EqObj[ItemID]['ID']=window[ItemID]['Format_id'];															//	\
			}																														//	\
		}																															//	\
		if ((DOM_Object[ItemID]['type']=="plot")&&(DOM_Object[ItemID]['location']==DOM_Object[window[id].Format_id]['location']))	//	\
		{	window[id].EqObj[ItemID]={};																							//	\
			window[id].EqObj[ItemID]['name']=DOM_Object[ItemID]['name'];															//	\
			window[id].EqObj[ItemID]['type']="plot";																				//	\
			window[id].EqObj[ItemID]['location']=DOM_Object[ItemID]['location'];													//	\
			window[id].EqObj[ItemID]['active']=1;																					//	\
			window[id].EqObj[ItemID]['parent']="none";																				//	\
			window[id].EqObj[ItemID]['topparent']="none";																			//	\
			window[id].EqObj[ItemID]['Dependents']={};																				//	\
			window[id].EqObj[ItemID]['ID']=ItemID;																					//	\
		}																															//	\
		if ((DOM_Object[ItemID]['type']=="table")&&(DOM_Object[ItemID]['location']<=DOM_Object[window[id].Format_id]['location']))	//	\
		{	window[id].EqObj[ItemID]={};																							//	\
			window[id].EqObj[ItemID]['name']=DOM_Object[ItemID]['name'];															//	\
			window[id].EqObj[ItemID]['type']="table";																				//	\
			window[id].EqObj[ItemID]['location']=DOM_Object[ItemID]['location'];													//	\
			numberObj={};																											//	\
			$('#'+DOM_Object[ItemID]['name']+' tr').each(function(rowindex){														//	\
			    $(this).find('td').each(function(columnindex){																		//	\
			        if ((columnindex>2)&&(rowindex>2)) 																				//	\
			        {	row=rowindex-3; col=columnindex-3;																			//	\
			            numberObj[row+'-'+col]=parseFloat($(this).attr('number'));													//	\
				    }																												//	\
			    });																													//	\
			});																														//	\
			window[id].EqObj[ItemID]['real']=numberObj;																				//	\
		}																															//	\
	}																																//	\
	if (typeof(callback)=="function") { callback();	}																				//	\
};																																	//	\
//-------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------- CALL THE SOLVER FOR THE EQUATION -----------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------//
/*	This is the function that actually calls the web worker to solve the equation.														\
//-------------------------------------------------------------------------------------------------------------------------------------*/
function Call_Solver (id, equation, fileid)																							//	\
{	var objProp='', eqobj={}, tempid='', eqID='', eq='', tempid='', flag='', thisid='', tempname=[];								//	\
	var equationWorker = new Worker("http://www.cadwolf.com/js/EquationSolver.js?");												//	\
	equationWorker.postMessage({																									//	\
		"cadwolfType":"SolveEquation", 																								//	\
		"Equation":equation,																										//	\
		"EqID":id,																													//	\
		"Units_Object":Units_Object,																								//	\
		"ParseUnits":ParseUnits,																									//	\
		"ImportedFunctions":ImportedFunctions,																						//	\
		"FileID":fileid,																											//	\
		"Location":DOM_Object[id]['location'],																						//	\
		"EqObj":window[id].EqObj																									//	\
	});																																//	\
	equationWorker.onmessage = function(e) {																						//	\
		returnObject=e.data;																										//	\
		DeleteConnectedEqs(returnObject.id);																						//	\
		if (returnObject.messageType=="EquationResult") 																			//	\
		{	for (eqID in window[returnObject.id].connected_ids)																		//	\
			{	for (eq in returnObject.connected)																					//	\
				{	if(window[eqID]!==undefined)																					//	\
					{	console.log('Comparing '+window[eqID]['Format_name']+' to '+returnObject.connected[eq]['Format_name']+' for connected equations.');
						if (window[eqID]['Format_name']==returnObject.connected[eq]['Format_name']) { ReplaceConnected(eqID, eq); }	//	\
			}	}	}																												//	\
			DeleteConnectedEqs(returnObject.id);																					//	\
			for (eq in returnObject.connected)																						//	\
			{	window[returnObject.id].connected_ids[eq]=1;																		//	\
				eqobj={Page_position:DOM_Object[id]['location']};																	//	\
				tempid=CreateEq(window[id].fileid, 0, eqobj, eq);																	//	\
				console.log('Setting '+eq);
				for (objProp in returnObject.connected[eq]) { window[eq][objProp]=returnObject.connected[eq][objProp]; }			//	\
				DOM_Object[eq]['name']=returnObject.connected[eq]['Format_name'];													//	\
				window[eq]['Format_showtype']="connected";																			//	\
			}																														//	\
			for (objProp in returnObject.equation) { window[returnObject.id][objProp]=returnObject.equation[objProp]; }				//	\
			if (Array.isArray(window[returnObject.id]['fileid'])){window[returnObject.id]['fileid']=window[returnObject.id]['fileid'][0]; }
			DOM_Object[returnObject.id]['name']=window[returnObject.id]['Format_name'];												//	\
			DOM_Object[returnObject.id]['Dependents']=returnObject.Deps;															//	\
			AddConnectedEqs(returnObject.id);																						//	\
			window[returnObject.id].Equation_Display(); 																			//	\
			DOM_Object[id]['status']=0;																								//	\
			window[returnObject.id].UpdateDependents(); 																			//	\
		}																															//	\
		if (returnObject.messageType=="LoopParametersResult") 		{	UpdateLoopParams(returnObject);	}							//	\
		if (returnObject.messageType=="WhileLoopParametersResult") 	{	UpdateWhileLoopParams(returnObject);	}					//	\
		if (returnObject.messageType=="IfElseParametersResult") 	{	UpdateIfElseParams(returnObject);	}						//	\
		if (returnObject.messageType=="StructureResult") 			{	UpdateStructure(returnObject);	}							//	\
		equationWorker.terminate();																									//	\
		equationWorker=undefined;																									//	\
	}																																//	\	
	if (typeof(callback)=="function") { callback();	}																				//	\
};																																	//	\
//-------------------------------------------------------------------------------------------------------------------------------------//
	
//-----------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------- IS NUMBER -----------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------//
function isNumber (o) {  return ! isNaN (o-0); }																			//	\
//-----------------------------------------------------------------------------------------------------------------------------//

/*-----------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------- ADD A CONNECTED EQUATION TO THE DATABASES -----------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------*/
/*	This function is used to add equations to the database that are created as the result of a function that has multiple		\
	outputs. The equations are added to the database so that they can be reloaded, but they do not cause an increase in 		\
	the locations of the other equations.																						\
/*-----------------------------------------------------------------------------------------------------------------------------*/
function AddConnectedEqs(id)																								//	\
{	for (var thisid in window[id].connected_ids) 																			//	\
	{	var textstring=thisid+'::'+DOM_Object[id]['location']+'::'+3;														//	\
		textstring=textstring+'::'+window[id].Page_parentid+'::'+window[id].Page_topparentid;								//	\
		$.ajax ({	type:"POST",url:"/Documents/UpdateLocations",															//	\
			async:false,
			data: { fileid:$('#filenumber').attr('filenumber'),	text:textstring,	insert:0},								//	\
	 	    error: function () { alert('There was an error updating the page order.');}										//	\
		});																													//	\
	}																														//	\
}																															//	\
/*-----------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------- DELETE A CONNECTED EQUATION TO THE DATABASES --------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------*/
function DeleteConnectedEqs(id)																								//	\--- This function is used to delete equations that were created
{	var fileid=window[id].fileid, conns=JSON.parse(JSON.stringify(window[id].connected_ids));									//	\--- in a function with multiple outputs. The equations are deleted
	for (var thisid in conns) 																								//	\--- but there is no effect on the locations of the remaining 
	{	console.log('Deleting '+thisid);
		var textstring=thisid+'::'+DOM_Object[id]['location']+'::'+3;														//	\--- equations.
		textstring=textstring+'::'+window[id].Page_parentid+'::'+window[id].Page_topparentid;								//	\
		if (DOM_Object[thisid]!==undefined)																					//	\
		{	$.ajax ({ type:"POST", url:"/Documents/DeleteItem",																//	\
			data: { fileid:fileid, type:"equation", id:thisid, thisloc:DOM_Object[thisid]['location'], insert:0 },			//	\ 
			error: function () { alert('There was an error deleting this item');},											//	\ 
			}); 																											//	\
		}																													//	\
		delete window[thisid];																								//	\
		if (DOM_Object[thisid]!==undefined) { delete DOM_Object[thisid];	} 												//	\
	}																														//	\
	window[id].connected_ids={};																							//	\
}																															//	\
/*-----------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------ REPLACE ONE CONNECTED ID WITH ANOTHER --------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------*/
/*	This function is used to replace one connected equation id with another. 													\
/*-----------------------------------------------------------------------------------------------------------------------------*/
function ReplaceConnected(id1, id2)																							//	\
{	var flag=0;																												//	\
	for (var thisid in DOM_Object) 																							//	\
	{	flag=0;																												//	\
		for (var depid in DOM_Object[thisid]['Dependents'])																	//	\
		{	if (id1==depid)																									//	\
			{	delete DOM_Object[thisid]['Dependents'][depid]; 															//	\
				DOM_Object[thisid]['Dependents'][id2]=1; 																	//	\
				flag=1;																										//	\
			}																												//	\
		}																													//	\
		if (flag==1) { DeleteItem('equation', id1);	flag=0; }																//	\		
	}																														//	\
}																															//	\
/*-----------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------- UPDATE DEPENDENTS ---------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is called after an equation is updated. It calls two children functions. The first of those functions looks at the 		\
	dependents of each equation and if it finds an equation that depends on the one that was just edited, it sets the status item in 		\
	the DOM Object for that item to 1. The second function goes through all the items in the DOM in order until it finds one with the 		\
	status set to 1. It then solves that equation and the process is restarted at the end of that equation. If the algorithm encounters		\
	a 2, it also stops. The 2 means that the equation is in the process of being solved and the process will restart through that equation	\
	when it finishes. This is to prevent the scenario where the user has edited one equation and then edits another while the previous		\
	equation is still being solved and there are two or more solvers running at the same time.												\
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
Equation.prototype.UpdateDependents = function(callback)																				//	\
{	var id=this.Format_id;																												//	\
	if (this.Page_parentid=="none") { Find_Deps(id, function () { UpdateDep()} ); 	}													//	\ 
	if (typeof(callback)=="function") { callback();	}																					//	\
};																																		//	\
/*-----------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------- FIND AND ORDER THE ITEMS THAT DEPEND ON THIS EQUATION -----------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the function that finds all the dependents for an equation and flags them to be updated. It does this is three steps:			\
	1.	Create a blank CADWOLF_Deps object with an entry for each item in the DOM and the flag set to 1 only for this equation.				\
	2.	Loop through this new CADWOLF_Deps object starting at the current location and working backward. If the name of a previous item		\
		matches the name of this item, flag it as being updated this will cause all later items to be recalculated. It protects against		\
		the case where the user has a defined equation and then enters a new equation with the same name.									\
	3.	Loop through the CADWOLF_Deps object starting at the current item and moving down the DOM. Loop through each object of dependent 	\
		items and if one of those has been flagged as being updated then flag this one as well. This ensures that any item dependent on		\
		an updated item is set to be updated. Since we started at the current position, we ensure that we don't update items between the 	\
		current on and a previous item with the same name.																					\  
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
function Find_Deps(itemid, callback)																									//	\
{	delete DOM_Object[''];																												//	\
	var fileid=$('#filenumber').attr('filenumber');																						//	\
	var flag=0, domLoc={}; CADWOLF_Deps={};																								//	\
	for (var i in DOM_Object) 																											//	\ 
	{ 	if (DOM_Object[i]['status']===undefined){ DOM_Object[i]['status']=0;  } 														//	\
		CADWOLF_Deps[DOM_Object[i]['location']]={};																						//	\
		CADWOLF_Deps[DOM_Object[i]['location']]['equation']=i;																			//	\
		CADWOLF_Deps[DOM_Object[i]['location']]['update']=0;																			//	\
	}																																	//	\
	CADWOLF_Deps[DOM_Object[itemid]['location']]['update']=1;																			//	\
	var thisloc=DOM_Object[itemid]['location'];																							//	\
	for (var a=thisloc-1; a>=0; a--)																									//	\
	{	if ((CADWOLF_Deps[a]!==undefined)&&(flag==0))																					//	\
		{	if (DOM_Object[CADWOLF_Deps[a]['equation']]['type']=="equation")															//	\
			{	if (DOM_Object[CADWOLF_Deps[a]['equation']]['name']==DOM_Object[itemid]['name'])										//	\
				{	CADWOLF_Deps[DOM_Object[CADWOLF_Deps[a]['equation']]['location']]['update']=1;										//	\
					DOM_Object[CADWOLF_Deps[a]['equation']]['status']=1;																//	\
					for (var b in DOM_Object[CADWOLF_Deps[a]['equation']]['Dependents']) 												//	\
					{	if (b.match(/^Table/)) { b="File"+fileid+""+b; }																//	\
						if (DOM_Object[b]!==undefined) 																					//	\
						{	if (CADWOLF_Deps[DOM_Object[b]['location']]!==undefined) 													//	\
							{	CADWOLF_Deps[DOM_Object[CADWOLF_Deps[a]['equation']]['location']]['update']=1;							//	\
								DOM_Object[CADWOLF_Deps[a]['equation']]['status']=1;													//	\
	}	}	}flag=1;}	}	}	}																										//	\
	for (var a=thisloc; a<Object.keys(CADWOLF_Deps).length; a++)																		//	\
	{	if (CADWOLF_Deps[a]!==undefined)																								//	\
		{	if (DOM_Object[CADWOLF_Deps[a]['equation']]['type']=="equation")															//	\
			{	for (var b in DOM_Object[CADWOLF_Deps[a]['equation']]['Dependents']) 													//	\
				{	if (b.match(/^Table/)) { b="File"+fileid+""+b; }																	//	\
					if (DOM_Object[b]!==undefined) 																						//	\
					{	if (CADWOLF_Deps[DOM_Object[b]['location']]!==undefined) 														//	\
						{	if (CADWOLF_Deps[DOM_Object[b]['location']]['update']==1) 													//	\
							{	CADWOLF_Deps[DOM_Object[CADWOLF_Deps[a]['equation']]['location']]['update']=1;							//	\
								DOM_Object[CADWOLF_Deps[a]['equation']]['status']=1;													//	\
				}	}	}	}																											//	\
			}else if (DOM_Object[CADWOLF_Deps[a]['equation']]['type']=="plot")															//	\
			{	CADWOLF_Deps[DOM_Object[CADWOLF_Deps[a]['equation']]['location']]['Dataset']={};										//	\
				for (var b in DOM_Object[CADWOLF_Deps[a]['equation']]['Dependents']) 													//	\
				{	for (var c in DOM_Object[CADWOLF_Deps[a]['equation']]['Dependents'][b]) 											//	\
					{	if (c.match(/^Table/)){ c="File"+fileid+''+c; }																	//	\
						if (CADWOLF_Deps[DOM_Object[c]['location']]['update']==1) 														//	\
						{	CADWOLF_Deps[DOM_Object[CADWOLF_Deps[a]['equation']]['location']]['update']=1;								//	\
							CADWOLF_Deps[DOM_Object[CADWOLF_Deps[a]['equation']]['location']]['Dataset'][b]=1;							//	\
							DOM_Object[CADWOLF_Deps[a]['equation']]['status']=1;														//	\
		}	}	}	}	}																												//	\
	}																																	//	\
	if (typeof(callback)=="function") { callback();	}																					//	\
}																																		//	\
//-----------------------------------------------------------------------------------------------------------------------------------------//

/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------ ACTUALLY UPDATE THE DEPENDENTS ---------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
function UpdateDep(callback)																											//	\
{	var DOM_Loc={}, itemID='';																											//	\
	for (var i in DOM_Object) 																											//	\ 
	{ 	if (DOM_Object[i]['status']===undefined){ DOM_Object[i]['status']=0;  } 														//	\
		DOM_Loc[DOM_Object[i]['location']]={};																							//	\
		DOM_Loc[DOM_Object[i]['location']]['equation']=i;																				//	\
	}																																	//	\
	for (var a=0; a<Object.keys(DOM_Object).length; a++)																				//	\
	{	if (DOM_Loc[a]!==undefined) 																									//	\
		{	itemID=DOM_Loc[a]['equation'];																								//	\
			if (DOM_Object[itemID]['status']==2) { break }																				//	\ 
			if ((DOM_Object[itemID]['status']==1)&&(DOM_Object[itemID]['type']=="equation"))											//	\ 
			{	console.log('Updating '+itemID+' as a dependent'); window[itemID].Solve_Equation(window[itemID]['Format_equation']); break }//	\
			if ((DOM_Object[itemID]['status']==1)&&(DOM_Object[itemID]['type']=="plot"))												//	\ 
			{	console.log('Updating '+itemID+' as a dependent'); 					 													//	\
				if (window[itemID]['Chart_type']!="surface")																			//	\
				{	for (var DataID in CADWOLF_Deps[a]['Dataset'])																		//	\
					{	solvePlotData(itemID, DataID, window[itemID], 'all');	}														//	\
				}else																													//	\
				{	for (var DataID in window[itemID]['Chart_dataobj'])																	//	\
					{	if (window[itemID]['Chart_dataobj'][DataID]['xData_raw']!='') 													//	\
						{	solveSurfaceData(itemID, DataID, window[itemID], 'x', window[itemID]['Chart_dataobj'][DataID]['type']);	}	//	\
						if (window[itemID]['Chart_dataobj'][DataID]['yData_raw']!='') 													//	\
						{	solveSurfaceData(itemID, DataID, window[itemID], 'y', window[itemID]['Chart_dataobj'][DataID]['type']);	}	//	\
						if (window[itemID]['Chart_dataobj'][DataID]['zData_raw']!='') 													//	\
						{	solveSurfaceData(itemID, DataID, window[itemID], 'z', window[itemID]['Chart_dataobj'][DataID]['type']);	}	//	\
						if (window[itemID]['Chart_dataobj'][DataID]['cData_raw']!='') 													//	\
						{	solveSurfaceData(itemID, DataID, window[itemID], 'c', window[itemID]['Chart_dataobj'][DataID]['type']);	}	//	\
				}	}																													//	\
			}																															//	\
		}																																//	\
	}																																	//	\
	if (typeof(callback)=="function") { callback();	}																					//	\
}																																		//	\
//-----------------------------------------------------------------------------------------------------------------------------------------//

//-----------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------- EQUATION COMPLETE ------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//
/*	This function is called whenever the solver is finished with an equation and returns the message and equation content to the main		\
	program. This program then displays the equation in the proper format or it displays the error message properly.						\
//-----------------------------------------------------------------------------------------------------------------------------------------*/
Equation.prototype.Equation_Display = function()																						//	\
{	if (this.Errors_flag) 																												//	\
	{	$('#'+this.Format_id).find('.eqshow').html('$$\\text{'+this.Errors_errors[0]+'}$$');											//	\
		$('#'+this.Format_id).find('.eqshow').css("color","red");																		//	\
	}else {																																//	\
		$('#'+this.Format_id).find('.eqshow').html("$${"+this.Format_left+"="+this.Format_showequation+"="+this.Format_showsolution+"}$$");	
		$('#'+this.Format_id).find('.eqshow').css("color","black");																		//	\
	}																																	//	\
	$('#'+this.Format_id).parents().find('.eqparam_cont').hide();																		// 	\
	$('#'+this.Format_id).parents().find('.eqshow').show();																				// 	\
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,this.Format_id]);																			// 	\
	$('#'+this.Format_id).removeClass('solving');																						//	\
	$('#'+this.Format_id).closest('.equationblock').siblings('.icon_holder').height(10);												//	\
};																																		//	\
//-----------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------- Event Handlers for Equations ----------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------- Start editing an equation ------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function handles the situation in which an equation is clicked on. It hides the formatted variable and displays the entry item. 	\
	The message bar is also populated with the additional parameters for this equation.														\
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('dblclick', ".eqshow", function(event) 	 																			//	\
	{	var id=$(this).closest('.equationblock').attr('id');																			//	\
		if (window[id]['Format_editinuse']=='1')																						//	\
		{	$(this).hide();																												//	\ 
			$(this).parent().find('.eqparam_cont, .eqparam').show();																	//	\
			$(this).parent().find('.eqparam').focus();																					//	\
			window[id].Format_haschanged=1;																								//	\
			$(this).closest('.main_item').addClass('update');																			//	\
			$(this).closest('.equationblock').siblings('.icon_holder').height(0);														//	\
		} 																																//	\
	}); 																																//	\
/*-----------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------- Finished editing an equation -------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is called when the user edits the equation and then leaves the input box. The functions above are called to obtain the 	\
	variables, numbers, and formats through the UpdateEquation function. It then reshows the new equation and updates any other equations 	\
	that were dependent on this equation.																									\
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
	$(document).on('keyup', ".equationblock input", function(e) { 																		//	\
		if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))||(e.type=="focusout")) 											//	\
		{																																//	\
			var id=$(this).closest('.equationblock').attr("id");																		//	\
			var equation=$('#'+id+'').find('.eqparam').attr("value");																	//	\
			$(this).attr('value',equation);																								//	\
			if ((window[id].Format_equation!=equation)&&(equation!==''))																//	\
			{	window[id].Format_equation=equation;																					//	\
				window[id].Solve_Equation(equation);																					//	\
			}else																														//	\
			{	$('#'+id).find('.eqshow').html("$${"+window[id].Format_left+"="+window[id].Format_showequation+"="+window[id].Format_showsolution+"}$$");	
				$('#'+id).find('.eqparam_cont, .eqparam').hide();																		//	\
				$('#'+id).find('.eqshow').show();																						//	\
				MathJax.Hub.Queue(["Typeset",MathJax.Hub,id]);																			//	\
			}																															//	\
		}																																//	\
	}); 																																//	\
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
	
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------- Changing Solution Type ----------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*	This item allows the user to select how the results of an equation will be represented. The two choices are to show the size of the 	\
	matrix, or the solution itself.	Once the choice is made, the code stores the choice and then calls the function to solve it.			\
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
	$("#equationshowtype").change(function(e) {																							//	\
		var id=$('#currentitem').attr("itemid");																						//	\
		window[id].Format_showvalue=$(this).val();																						//	\
		window[id].Format_haschanged=1;																									//	\
		callFormatSolver(id);																											//	\
	}); 																																//	\
/*-----------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------ Changing Solution Units ----------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is what happens when the user opts to show the solution to an equation in units other than the finalized metric standard. This 	\
	is where the user selects from a predefined standard like ft instead of m																\
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
	$('#showunits').change(function(e) {																								//	\
		var id=$('#currentitem').attr('itemid');																						//	\
		window[id].Units_showunits=$('#showunits').val();																				//	\
		$("#equationvalue").html(ToNum(window[id].Solution_real/Units_Object[window[id].Units_showunits]['conv_factor']));				//	\
		$('#equationunits').html(window[id].Units_showunits);																			//	\
		callFormatSolver(id);																											//	\
	});																																	//	\
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
	
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------ Changing Specific Solution Units -------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
	$('.unitselect').change(function(e) {																								//	\
		var id=$('#currentitem').attr('itemid');																						//	\  
		var num=1;		var units='';																									//	\
		$('.unitselect').each(function (index) {																						//	\
			var base=$(this).attr('baseunit');																							//	\
			if (window[id].Units_base_array[base]!==0)																					//	\
			{	var unit=$(this).val();																									//	\ 
				var cf=Math.pow(Units_Object[unit]['conv_factor'],window[id].Units_base_array[base]);									//	\
				num=num*cf;																												//	\
				var basenum=window[id].Units_base_array[base];																			//	\
				if (basenum==1) { units=units+unit; }																					//	\
				if (basenum==-1) { units=units+'/'+unit; }																				//	\
				if (basenum<-1) { units=units+'/'+unit+'^'+basenum; }																	//	\
				if (basenum>1) { units=units+''+unit+'^'+basenum; }																		//	\
		}	});																															//	\
		window[id].Solution_convsol=num;																								//	\
		window[id].Units_showunits=units;																								//	\
		callFormatSolver(id);																											//	\
	});																																	//	\
/*-----------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- THE FUNCTION TO REFORMATE THE SOLUTIONS ------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the function that sends the equation object to a worker. That worker then formats the solution according to the properties in the equation.					\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function callFormatSolver(eqID)																																		//	\
{	var solutionWorker = new Worker("http://www.cadwolf.com/js/EquationSolver.js");																					//	\
	solutionWorker.postMessage({																																	//	\
		"cadwolfType":"FormatSolution", 																															//	\
		"Units_Object":Units_Object,																																//	\
		"ParseUnits":ParseUnits,																																	//	\
		"eqID":eqID,																																				//	\
		"eqObject":window[eqID]																																		//	\
	});																																								//	\
	solutionWorker.onmessage = function(e) {																														//	\
		returnObject=e.data;																																		//	\
		var id=returnObject.eqID;																																	//	\
		if (returnObject.messageType=="SolutionResults") 																											//	\
		{	for (var objProp in returnObject.eqObj) { window[id][objProp]=returnObject.eqObj[objProp]; }															//	\
			$('#'+id).find('.eqshow').html("$${"+window[id].Format_left+"="+window[id].Format_showequation+"="+window[id].Format_showsolution+"}$$");				//	\
			MathJax.Hub.Queue(["Typeset",MathJax.Hub,id]);																											//	\
		}																																							//	\
		solutionWorker.terminate();																																	//	\
		solutionWorker=undefined;																																	//	\
	}																																								//	\	
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------ CREATE AND POSSIBLY SOLVE NEW EQUATION OBJECT ------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is called to create and possibly solve new equation objects. The need for the function arose out of 						\
	repeated need to create temporary equations and the absurd use of space that this created.												\
	The function takes in the file id, a 1 or 0 on whether or not to solve the equation, and an object holding the 							\
	properties of the equation. The properties are set and if the solve is set to 1, the equation is solved.								\
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
function CreateEq(fileid, solve, eqobj, id)																								//	\
{	if (id===undefined) { var id=Get_ID("Equation", fileid);	}																		//	\ 
	self[id]=new Equation(id);																											//	\
	DOM_Object[id]={};	DOM_Object[id]['Dependents']={};	DOM_Object[id]['children']={};												//	\
	DOM_Object[id]['active']=1;				DOM_Object[id]['Descendents']={};			DOM_Object[id]['name']="TempEq";				//	\
	DOM_Object[id]['parent']="none";		DOM_Object[id]['topparent']="none";			DOM_Object[id]['type']="equation";				//	\
	var filename=fileid+'';																												//	\
	DOM_Object[id]['fileid']=filename.replace(/^File/,'').match(/^[0-9]+/);																//	\
	if (Array.isArray(DOM_Object[id]['fileid'])) 	{ DOM_Object[id]['fileid']=DOM_Object[id]['fileid'][0]; }							//	\
	if (eqobj['Page_position']!==undefined) {	DOM_Object[id]['location']=eqobj['Page_position'];			}							//	\
	if (eqobj['Page_position']!==undefined) {	self[id].Page_position=eqobj['Page_position'];			}								//	\
	if (eqobj['Page_parentid']!==undefined) {	DOM_Object[id]['parent']=eqobj['Page_parentid'];			}							//	\
	if (eqobj['Page_topparentid']!==undefined) {DOM_Object[id]['topparent']=eqobj['Page_topparentid'];	}								//	\
	if (eqobj['Format_name']!==undefined) 	{	DOM_Object[id]['name']=eqobj['Format_name'];	}										//	\
	for (var prop in eqobj)	{	self[id][prop]=eqobj[prop];	}																			//	\ 
	if (solve) { window[id].Solve_Equation(eqobj['equation']);	}																		//	\
	return id;																															//	\
}																																		//	\
/*-----------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------- End of Equations --------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------- End of Specific Equations -----------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


//-------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------- Populating the symbolic specifics -------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------//
function PopulateReferences(id)																										//	\
{	var refnum=1;																													//	\
	$('.refs_left').empty();																										//	\
	for (var i in DOM_Object[id]['References'])																						//	\
	{	$('.refs_left').append('<div class="reference_number" refid="'+i+'">'+DOM_Object[id]['References'][i]['refnum']+'</div>');	//	\
		refnum++;																													//	\
	}																																//	\
	$('.ref_web, .ref_book, .ref_enc, .ref_mag').hide();																			//	\
}																																	//	\
//-------------------------------------------------------------------------------------------------------------------------------------//

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

//-------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------- HIDING AND SHOWING THE SYMBOLIC SPECIFIC STUFF -----------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', "#close_symeqspec", function(event) { $("#symeq_spec").hide(); });										//	\
	$(document).on('click', "#symeqspecs_showrefs", function(event) { $("#symeqspecs_ref").toggle(); });							//	\
	$(document).on('click', ".ref_showweb", function(event) { 	ShowReference('web');		});										//	\
	$(document).on('click', ".ref_showbook", function(event) { 	ShowReference('book');		});										//	\
	$(document).on('click', ".ref_showmag", function(event) { 	ShowReference('mag');		});										//	\
	$(document).on('click', ".ref_showenc", function(event) { 	ShowReference('enc');		});										//	\
																																	//	\
	function ShowReference(type)																									//	\
	{	if (type=="web") {	$(".ref_book, .ref_mag, .ref_enc").hide(); $(".ref_web").show(); 										//	\
							$(".ref_type_active").addClass('ref_type').removeClass('ref_type_active');								//	\
							$('.ref_showweb').addClass('ref_type_active').removeClass('ref_type');									//	\
							$('#symeq_spec').attr('reftype','web');																	//	\
		}																															//	\
		if (type=="book") {	$(".ref_web, .ref_mag, .ref_enc").hide(); $(".ref_book").show(); 										//	\
							$(".ref_type_active").addClass('ref_type').removeClass('ref_type_active');								//	\
							$('.ref_showbook').addClass('ref_type_active').removeClass('ref_type');									//	\
							$('#symeq_spec').attr('reftype','book');																//	\
		}																															//	\
		if (type=="mag") {	$(".ref_web, .ref_book, .ref_enc").hide(); $(".ref_mag").show(); 										//	\
							$(".ref_type_active").addClass('ref_type').removeClass('ref_type_active');								//	\
							$('.ref_showmag').addClass('ref_type_active').removeClass('ref_type');									//	\
							$('#symeq_spec').attr('reftype','mag');																	//	\
		}																															//	\
		if (type=="enc") {	$(".ref_web, .ref_book, .ref_mag").hide(); $(".ref_enc").show(); 										//	\
							$(".ref_type_active").addClass('ref_type').removeClass('ref_type_active');								//	\
							$('.ref_showenc').addClass('ref_type_active').removeClass('ref_type');									//	\
							$('#symeq_spec').attr('reftype','encyclopedia');														//	\
		}																															//	\
	}																																//	\
//-------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------- FINISHED EDITING AN ITEM ---------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------//
 	$(document).on('keyup', ".ref_input", function(event) 																			//	\
	{	if (((event.type=="keyup")&&((event.keyCode == 13)||(event.which == 13))))											 		//	\
		{	var type=$(this).closest('#symeq_spec, #table_spec, #image_spec, #equation_spec, #text_spec').attr('id');				//	\
			if (type=="symeq_spec") { var id=$("#symeq_spec").attr('symeqid');	}													//	\ 
			if (type=="image_spec") { var id=$("#image_spec").attr('imageid');	}													//	\ 
			if (type=="equation_spec") { id=$("#equation_spec").attr('equationid');	}												//	\ 
			if (type=="table_spec") { id=$("#table_spec").attr('tableid');	}														//	\ 
			if (type=="text_spec") { id=$("#text_spec").attr('textid');	}															//	\ 
			var refid=$('.ref_active').attr('refid');																				//	\
			if ($(this).hasClass('ref_author')) { DOM_Object[id]['References'][refid]['author']=$(this).val(); }					//	\ 
			if ($(this).hasClass('ref_reftext')) { DOM_Object[id]['References'][refid]['reftext']=$(this).val(); }					//	\ 
			if ($(this).hasClass('ref_address')) { DOM_Object[id]['References'][refid]['address']=$(this).val(); }					//	\ 
			if ($(this).hasClass('ref_pagetitle')) { DOM_Object[id]['References'][refid]['pagetitle']=$(this).val(); }				//	\ 
			if ($(this).hasClass('ref_sitetitle')) { DOM_Object[id]['References'][refid]['sitetitle']=$(this).val(); }				//	\ 
			if ($(this).hasClass('ref_date')) { DOM_Object[id]['References'][refid]['dateaccessed']=$(this).val(); }				//	\ 
			if ($(this).hasClass('ref_booktitle')) { DOM_Object[id]['References'][refid]['booktitle']=$(this).val(); }				//	\ 
			if ($(this).hasClass('ref_publisher')) { DOM_Object[id]['References'][refid]['publisher']=$(this).val(); }				//	\ 
			if ($(this).hasClass('ref_publishdate')) { DOM_Object[id]['References'][refid]['datepublished']=$(this).val(); }		//	\ 
			if ($(this).hasClass('ref_magtitle')) { DOM_Object[id]['References'][refid]['pagetitle']=$(this).val(); }				//	\ 
			if ($(this).hasClass('ref_name')) { DOM_Object[id]['References'][refid]['magpapername']=$(this).val(); }				//	\ 
			if ($(this).hasClass('ref_page')) { DOM_Object[id]['References'][refid]['page']=$(this).val(); }						//	\ 
			if ($(this).hasClass('ref_entryname')) { DOM_Object[id]['References'][refid]['entryname']=$(this).val(); }				//	\ 
			if ($(this).hasClass('ref_encname')) { DOM_Object[id]['References'][refid]['encname']=$(this).val(); }					//	\ 
			if ($(this).hasClass('ref_edition')) { DOM_Object[id]['References'][refid]['edition']=$(this).val(); }					//	\ 
			if ($(this).hasClass('ref_year')) { DOM_Object[id]['References'][refid]['year']=$(this).val(); }						//	\ 
			$(this).removeClass('ref_inputactive'); 																				//	\
			if ($(this).closest('.ref_web, .ref_book, .ref_mag, .ref_enc').hasClass('ref_web')) {DOM_Object[id]['References'][refid]['type']="web"; }
			if ($(this).closest('.ref_web, .ref_book, .ref_mag, .ref_enc').hasClass('ref_book')) {DOM_Object[id]['References'][refid]['type']="book"; }
			if ($(this).closest('.ref_web, .ref_book, .ref_mag, .ref_enc').hasClass('ref_mag')) {DOM_Object[id]['References'][refid]['type']="mag"; }
			if ($(this).closest('.ref_web, .ref_book, .ref_mag, .ref_enc').hasClass('ref_enc')) {DOM_Object[id]['References'][refid]['type']="enc"; }
		}else																														//	\
		{ $(this).addClass('ref_inputactive'); }																					//	\
	});																																//	\
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
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------- SYMBOLIC EQUATIONS --------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------- Event Handlers for Symbolic Equations -------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//-------------------------------------------------------------------------------------------------//
//------------------------------------ THE SYMBOLIC OBJECT ----------------------------------------//
//-------------------------------------------------------------------------------------------------//
function SymEquation(id) 																		//	\
{	this.Format_id=id;																			//	\
	this.Format_haschanged=1;																	//	\
	this.text='';																				//	\
}																								//	\
//-------------------------------------------------------------------------------------------------//


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------- TABLES --------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------- Functions for Tables --------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
function Table(id) 																												//	\
{	this.Format_id=id;																											//	\
	this.Format_haschanged=1;																									//	\
}																																//	\
//---------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
function RenumberTable (id)																										//	\
{	var text='';																												//	\
	$("#"+id+" > table > tbody > tr:eq(0) > td").each(function(index) 															//	\
	{	if (index<2) { text=''; 																								//	\
		}else if (index==2) { text=''; 																							//	\
		}else { text='<div class="tcdelete">&nbsp</div><div class="tcadd"></div>';	}											//	\
		$("#"+id+" > table >  tbody > tr:eq(0) > td:eq("+index+")").html(text);													//	\
		$("#"+id+" > table >  tbody > tr:eq(0) > td:eq("+index+")").removeClass("toedit");										//	\
		$("#"+id+" > table >  tbody > tr:eq(0) > td:eq("+index+")").addClass("empty");											//	\
	});																															//	\
	$("#"+id+" > table > tbody > tr:eq(1) > td").each(function(index) 															//	\
	{	if (index<3) 																											//	\
		{	text=''; 																											//	\
			$("#"+id+" > table >  tbody > tr:eq(1) > td:eq("+index+")").html(text);												//	\
			$("#"+id+" > table >  tbody > tr:eq(1) > td:eq("+index+")").removeClass("toedit");									//	\
			$("#"+id+" > table >  tbody > tr:eq(1) > td:eq("+index+")").addClass("empty");										//	\
		}else 																													//	\
		{	text=String.fromCharCode('A'.charCodeAt() + (index-3));																//	\
			$("#"+id+" > table >  tbody > tr:eq(1) > td:eq("+index+")").html(text);												//	\
			$("#"+id+" > table >  tbody > tr:eq(1) > td:eq("+index+")").removeClass("toedit");									//	\
			$("#"+id+" > table >  tbody > tr:eq(1) > td:eq("+index+")").addClass("label");										//	\	
		}																														//	\
	});																															//	\
	$("#"+id+" > table >  tbody > tr:eq(2) > td:eq(0)").html(text);																//	\
	$("#"+id+" > table >  tbody > tr:eq(2) > td:eq(0)").removeClass("toedit");													//	\
	$("#"+id+" > table >  tbody > tr:eq(2) > td:eq(0)").addClass("empty");														//	\
	$("#"+id+" > table >  tbody > tr:eq(2) > td:eq(1)").html(text);																//	\
	$("#"+id+" > table >  tbody > tr:eq(2) > td:eq(1)").removeClass("toedit");													//	\
	$("#"+id+" > table >  tbody > tr:eq(2) > td:eq(1)").addClass("empty");														//	\
	$("#"+id+" > table >  tbody > tr:eq(2) > td:eq(2)").html(text);																//	\
	$("#"+id+" > table >  tbody > tr:eq(2) > td:eq(2)").removeClass("toedit");													//	\
	$("#"+id+" > table >  tbody > tr:eq(2) > td:eq(2)").addClass("empty");														//	\
	$("#"+id+" > table >  tbody > tr").each(function(index) 																	//	\
	{																															//	\
		$("#"+id+" > table >  tbody > tr:eq("+index+") > td:eq(0)").addClass('empty'); 											//	\
		$("#"+id+" > table >  tbody > tr:eq("+index+") > td:eq(1)").addClass('empty'); 											//	\
		if (index>2) { $("#"+id+" > table >  tbody > tr:eq("+index+") > td:eq(2)").html(index-2); }								//	\
	});																															//	\
}																																//	\
//---------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
function TableWidth(id) {																										//	\
	var blockwidth=$("#"+id).closest('.main_item').css('width');																//	\
	$("#"+id).find('table').css('width',blockwidth-1);																			//	\
	$("#"+id).find('table').css('table-layout','auto');																			//	\
}																																//	\
//---------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
function PopulateTable (id) {																									//	\
	var fileid=$('#filenumber').attr('filenumber');																				//	\
	var tableid=$('#table_spec').attr('tableid');																				//	\
	var replaceme="File"+fileid;																								//	\
	var tableonly=tableid.replace(replaceme,'');																				//	\
	$('#tableid').html(tableonly);																								//	\
	$('#tablerows').html($("#"+id+" > table > tbody > tr").length-3);															//	\
	$('#tablecolumns').html($("#"+id+" > table > tbody > tr:eq(3) > td").length-3);												//	\
	if ($('#'+id).find('caption').css('display')=="none") { $('#tablecaptiononoff').removeAttr('checked'); 						//	\
													}else {$('#tablecaptiononoff').attr('checked', 'true'); }					//	\
	$('#tablecaption').val($('#'+id).find('caption').text());																	//	\
	if ($('#'+tableid).find('tr:eq(1)').css('display')=="none") { $('#tablecolumlabels').removeAttr('checked'); 				//	\
													}else { $('#tablecolumnlabels').attr('checked', 'true'); }					//	\
	if ($('#'+tableid).find('tr:eq(2)').css('display')=="none") { $('#tableheaders').removeAttr('checked'); 					//	\
													}else { $('#tableheaders').attr('checked', 'true'); }						//	\
	if ($('#'+tableid).find('tr:eq(3)').find('td:eq(3)').css('display')=="none") { $('#tablerowlabels').removeAttr('checked');	//	\
													}else { $('#tablerowlabels').attr('checked', 'true'); }						//	\
	$('#tableborders').val($('#'+tableid).find('tr:eq(3)').find('td:eq(3)').css('borderWidth'));								//	\
	$('#tablealign').empty();																									//	\
	if ($('#'+tableid).find('.normalrow td').css('text-align')=="left") {														//	\
		$('#tablealign').append($("<option></option>").attr("value","left").text("left")); 										//	\
		$('#tablealign').append($("<option></option>").attr("value","right").text("right")); 									//	\
		$('#tablealign').append($("<option></option>").attr("value","center").text("center")); 									//	\
		$('#tablealign').append($("<option></option>").attr("value","justify").text("justify"));	}							//	\
	if ($('#'+tableid).find('.normalrow td').css('text-align')=="right") {														//	\
		$('#tablealign').append($("<option></option>").attr("value","right").text("right")); 									//	\
		$('#tablealign').append($("<option></option>").attr("value","left").text("left")); 										//	\
		$('#tablealign').append($("<option></option>").attr("value","center").text("center")); 									//	\
		$('#tablealign').append($("<option></option>").attr("value","justify").text("justify"));	}							//	\
	if ($('#'+tableid).find('.normalrow td').css('text-align')=="center") {														//	\
		$('#tablealign').append($("<option></option>").attr("value","center").text("center")); 									//	\
		$('#tablealign').append($("<option></option>").attr("value","justify").text("justify"));								//	\
		$('#tablealign').append($("<option></option>").attr("value","left").text("left")); 										//	\
		$('#tablealign').append($("<option></option>").attr("value","right").text("right")); 		}							//	\
	if ($('#'+tableid).find('.normalrow td').css('text-align')=="justify") {													//	\
		$('#tablealign').append($("<option></option>").attr("value","justify").text("justify"));								//	\
		$('#tablealign').append($("<option></option>").attr("value","center").text("center")); 									//	\
		$('#tablealign').append($("<option></option>").attr("value","left").text("left")); 										//	\
		$('#tablealign').append($("<option></option>").attr("value","right").text("right")); 		}							//	\
	$('#tablerowheight').val($('.tdcurrent').closest('tr').css('height'));														//	\
	$('#tabletopborder').val($('.tdcurrent').closest('tr').find('td:eq(3)').css('border-top-width'));							//	\
	$('#tablebottomborder').val($('.tdcurrent').closest('tr').find('td:eq(3)').css('border-bottom-width'));						//	\
	$('#tablecolumnwidth').val($('.tdcurrent').css('width'));																	//	\
	$('#tableleftborder').val($('.tdcurrent').closest('tr').find('td:eq(3)').css('border-left-width'));							//	\
	$('#tablerightborder').val($('.tdcurrent').closest('tr').find('td:eq(3)').css('border-right-width'));						//	\
	var column=$('.tdcurrent').closest('tr').children('td').index($('.tdcurrent'));												//	\
	if ($('#'+tableid).find('tr:eq(1)').find('td:eq('+column+')').css('display')=="none") 										//	\
	{														$('#tablecolumnheader').removeAttr('checked'); 						//	\
													}else {	$('#tablecolumnheader').attr('checked', 'true'); }					//	\
	var row=$('.tdcurrent').closest('tbody').children('tr').index($('.tdcurrent').closest('tr'));								//	\
	$('#tabletopcborder').val($('.tdcurrent').closest('tr').find('td:eq('+column+')').css('border-top-width'));					//	\
	$('#tablebottomcborder').val($('.tdcurrent').closest('tr').find('td:eq('+column+')').css('border-bottom-width'));			//	\
	$('#tableleftcborder').val($('.tdcurrent').closest('tr').find('td:eq('+column+')').css('border-left-width'));				//	\
	$('#tablerightcborder').val($('.tdcurrent').closest('tr').find('td:eq('+column+')').css('border-right-width'));				//	\
}																																//	\
//---------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------- Solving Table Data -----------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
function HandleTableData()																										//	\
{	var thisvalue=$('#tableinput').val();																						//	\
	var tableid=$('#table_spec').attr("tableid");																				//	\
	if (thisvalue==='') 																										//	\
	{ $('#tableinput').parent("td, th").html('<div class="toedit"></div>');														//	\
	}else if (thisvalue.match(/^=/)) 																							//	\
	{	var toreplace="#"+tableid+".";																							//	\
		var position=$('#tableinput').closest('.tableblock').attr('position');													//	\
		var thisequation=thisvalue.replace(/\#\./g, toreplace);																	//	\
		var fileid=$('#filenumber').attr('filenumber');																			//	\
		var eqobj={Page_position:DOM_Object[tableid]['location'], equation:"Temp"+thisequation, Format_showtype:"InnerFunction"};//	\
		var tempid=CreateEq(fileid, 1, eqobj);																					//	\
		var solution1='<div class="toedit">'+window[tempid].Solution_real['0-0']+' '+window[tempid].Units_units+"</div>"; 		//	\
		var solution2='<div class="toedit">'+window[tempid].Solution_real['0-0']+' '+window[tempid].Units_units+'</div>'; 		//	\
		$('#tableinput').parent("td").attr('number', window[tempid].Solution_real['0-0']);										//	\
		$('#tableinput').parent("td").attr('unit', window[tempid].Units_units);													//	\
		delete DOM_Object[tempid]; delete window[tempid];																		//	\
	}else if (isNumber(thisvalue))																								//	\
	{	$('#tableinput').parent("td").attr('number', parseFloat(thisvalue));													//	\
		var solution1='<div class="toedit">'+thisvalue+"</div>"; 																//	\
		var solution2='<div class="toedit">'+thisvalue+"</div>"; 																//	\
	}else if (Date.parse(thisvalue)!==NaN)																						//	\
	{	$('#tableinput').parent("td").attr('number', Date.parse(thisvalue));													//	\
		var solution1='<div class="toedit">'+thisvalue+"</div>"; 																//	\
		var solution2='<div class="toedit">'+thisvalue+"</div>"; 																//	\
	}else																														//	\
	{																															//	\
		if (thisvalue.length>0) { var solution1=thisvalue; var solution2='<div class="toedit">'+solution1+'</div>'; }			//	\
		$('#tableinput').parent("td").attr('number', thisvalue);																//	\
	}																															//	\
	$('#tableinput').parent("td").attr('equation', thisvalue).html(solution2); 													//	\
	$('#tableinput').parent("td, th").html(solution1); 																			//	\
}																																//	\
//---------------------------------------------------------------------------------------------------------------------------------//

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------- Event Handlers for Tables ---------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// These event handlers deal with the addition of tables, editing them, and then the actions performed on them. The first few sets deal with adding the table, what happens
// when the table is focused on, and what happens when the focus is shifted off of a table cell. The second set handles the events for the block of options under the table
// subsection. This includes changing the number of rows or columns or adding/deleting specific rows or columns. 

//---------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- SELECTING A TABLE BLOCK -----------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
 	$(document).on('click', ".tableblock", function(event) 																		//	\
	{	var id=$(this).attr('id');																								//	\
		$('#table_spec').attr('tableid',id);																					//	\
		PopulateTable(id);																										//	\
		window[id].Format_haschanged=1;																							//	\
	}); 																														//	\
//---------------------------------------------------------------------------------------------------------------------------------//
		
//---------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- EDITING A TABLE ELEMENT -----------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
 	$(document).on('click', ".toedit", function(event) 																			//	\--- These items handle when a user clicks or double clicks on a table data cell. A click
	{	$('td').removeClass('tdcurrent');																						//	\--- makes the cell current, and a double click makes the input come up
		var tableid=$('#table_spec').attr('tableid');																			//	\
		if ($('#tableinput').length) { HandleTableData(); }																		//	\
		var thisvalue=$(this).parent('td').attr('equation');																	//	\
		if (thisvalue===undefined) { thisvalue=''; }																			//	\
 		var temp='<input id="tableinput" value="'+thisvalue+'">';																//	\
		$(this).closest('td').html(temp).addClass('tdcurrent');																	//	\
		$(this).closest('td').find('#tableinput').focus();																		//	\
	}); 																														//	\
//---------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
 	$(document).on('keyup', "#tableinput", function(e) 																			//	\
	{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))) 															//	\
		{	var Tableid=$('#table_spec').attr('tableid');																		//	\
			HandleTableData();																									//	\
			Find_Deps(Tableid, function() { UpdateDep(DOM_Object[Tableid]['location']) });		}								//	\
	}); 																														//	\
//---------------------------------------------------------------------------------------------------------------------------------//
	
//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('click', "#close_tablespec", function(event) 																//	\
	{	$('#table_spec').hide();		}); 																					//	\
//---------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('change', "#tablecaptiononoff", function(event) 																//	\
	{	var tableid=$('#table_spec').attr('tableid');																			//	\
		if ($("#tablecaptiononoff").attr('checked')) 																			//	\
		{	$('#'+tableid).find('caption').css('display','');																	//	\
		}else																													//	\
		{	$('#'+tableid).find('caption').css('display','none'); }																//	\
	});																															//	\
	$(document).on('keyup', "#tablecaption", function(e) 																		//	\
	{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))) 															//	\
		{	var tableid=$('#table_spec').attr('tableid');																		//	\
			var text=$('#tablecaption').val();																					//	\
			$('#'+tableid).find('caption').html(text);																			//	\
		}																														//	\
	});																															//	\
//---------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------- TURN THE LABELS OF A,B,C and 1, 2, 3 ON/OFF ----------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('change', "#tablecolumnlabels", function(event) 																//	\
	{	var tableid=$('#table_spec').attr('tableid');																			//	\
		$('#'+tableid+' tr').eq(1).toggle();																					//	\
	});																															//	\
	$(document).on('change', "#tablerowlabels", function(event) 																//	\
	{	var tableid=$('#table_spec').attr('tableid');																			//	\
		$('#'+tableid+' th:nth-child(3), #'+tableid+' td:nth-child(3)').toggle();												//	\
	});																															//	\
	$(document).on('change', "#tableheaders", function(event) 																	//	\
	{	var tableid=$('#table_spec').attr('tableid');																			//	\
		$('#'+tableid+' tr').eq(2).toggle();																					//	\
	});																															//	\
//---------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------- CHANGE THE BORDER WIDTH OF THE TABLE CELLS ----------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('keyup', "#tableborders", function(e) 																		//	\
	{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))) 															//	\
		{	var tableid=$('#table_spec').attr('tableid');																		//	\
			var border=$('#tableborders').val().replace(/^\s+|\s+$/g, '').replace(/px$/g, '');									//	\
			$('#'+tableid).find('.normalrow td, .headerrow td, .headerrow th').css({'borderWidth':border+'px'});				//	\
			$('#'+tableid).find('td.empty').css({'borderWidth':'0px'});															//	\
			$('#'+tableid).find('tr:eq(2)').find('th:eq(2)').css({'border-right':border+'px'});									//	\
		}																														//	\
	});																															//	\
//---------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------- CHANGE THE ALIGNMENT OF THE TABLE CELLS -----------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('change', "#tablealign", function(e) 																		//	\
	{	var tableid=$('#table_spec').attr('tableid');																			//	\
		var align=$('#tablealign').val();																						//	\
		$('#'+tableid).find('.normalrow td').css({'text-align':align});															//	\
	});																															//	\
	$(document).on('change', "#columnalign", function(e) 																		//	\
	{	var tableid=$('#table_spec').attr('tableid');																			//	\
		var align=$('#columnalign').val();																						//	\
		var column=$('.tdcurrent').closest('tr').children('td').index($('.tdcurrent'));											//	\
		$('#'+tableid).find('.normalrow').find('td:eq('+column+')').css({'text-align':align});									//	\
	});																															//	\
	$(document).on('change', "#rowalign", function(e) 																			//	\
	{	var tableid=$('#table_spec').attr('tableid');																			//	\
		var align=$('#rowalign').val();																							//	\
		var row=$('.tdcurrent').closest('tbody').children('tr').index($('.tdcurrent').closest('tr'));							//	\
		$('#'+tableid).find('tr:eq('+row+')').find('td').css({'text-align':align});												//	\
		$('#'+tableid).find('tr:eq('+row+')').find('td:eq(2)').css({'text-align':'center'});									//	\
	});																															//	\
	$(document).on('change', "#cellalign", function(e) 																			//	\
	{	var tableid=$('#table_spec').attr('tableid');																			//	\
		var align=$('#cellalign').val();																						//	\
		var column=$('.tdcurrent').closest('tr').children('td').index($('.tdcurrent'));											//	\
		var row=$('.tdcurrent').closest('tbody').children('tr').index($('.tdcurrent').closest('tr'));							//	\
		$('#'+tableid).find('tr:eq('+row+')').find('td:eq('+column+')').css({'text-align':align});								//	\
	});																															//	\
//---------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------- CHANGE THE HEIGHT OF A ROW AND ITS BORDERS ------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('keyup', "#tablerowheight", function(e) 																		//	\
	{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))) 															//	\
		{	var tableid=$('#table_spec').attr('tableid');																		//	\
			var height=$('#tablerowheight').val();																				//	\
			$('.tdcurrent').closest('tr').css({'height':height});																//	\
	}	});																														//	\
	$(document).on('keyup', "#tabletopborder", function(e) 																		//	\
	{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))) 															//	\
		{	var tableid=$('#table_spec').attr('tableid');																		//	\
			var border=$('#tabletopborder').val().replace(/^\s+|\s+$/g, '').replace(/px$/g, '');								//	\
			$('.tdcurrent').closest('tr').find('td').css({'border-top-width':border+'px'});										//	\
			$('.tdcurrent').closest('tr').css({'border-top-width':border+'px'});												//	\
			$('.tdcurrent').closest('tr').find('td:eq(0)').css({'border-top-width':'0px'});										//	\
			$('.tdcurrent').closest('tr').find('td:eq(1)').css({'border-top-width':'0px'});										//	\
	}	});																														//	\
	$(document).on('keyup', "#tablebottomborder", function(e) 																	//	\
	{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))) 															//	\
		{	var tableid=$('#table_spec').attr('tableid');																		//	\
			var border=$('#tablebottomborder').val().replace(/^\s+|\s+$/g, '').replace(/px$/g, '');								//	\
			$('.tdcurrent').closest('tr').find('td').css({'border-bottom-width':border+'px'});									//	\
			$('.tdcurrent').closest('tr').css({'border-bottom-width':border+'px'});												//	\
			$('.tdcurrent').closest('tr').find('td:eq(0)').css({'border-bottom-width':'0px'});									//	\
			$('.tdcurrent').closest('tr').find('td:eq(1)').css({'border-bottom-width':'0px'});									//	\
	}	});																														//	\
//---------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------- CHANGE THE WIDTH OF A COLUMN AND ITS BORDERS ------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('keyup', "#tablecolumnwidth", function(e) 																	//	\
	{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))) 															//	\
		{	var tableid=$('#table_spec').attr('tableid');																		//	\
			var width=$('#tablecolumnwidth').val();																				//	\
			var column=$('.tdcurrent').closest('tr').children('td').index($('.tdcurrent'));										//	\
			$('#'+tableid).find('tr').find('td:eq('+column+')').css({'width':width});											//	\
			$('#'+tableid).find('tr').find('th:eq('+column+')').css({'width':width});											//	\
	}	});																														//	\
	$(document).on('keyup', "#tableleftborder", function(e) 																	//	\
	{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))) 															//	\
		{	var tableid=$('#table_spec').attr('tableid');																		//	\
			var border=$('#tableleftborder').val().replace(/^\s+|\s+$/g, '').replace(/px$/g, '');								//	\
			var column=$('.tdcurrent').closest('tr').children('td').index($('.tdcurrent'));										//	\
			$('#'+tableid).find('tr').find('td:eq('+column+')').css({'border-left-width':border+'px'});							//	\
			$('#'+tableid).find('tr').find('th:eq('+column+')').css({'border-left-width':border+'px'});							//	\
			$('#'+tableid).find('tr:eq(0)').find('td:eq('+column+')').css({'border-left-width':'0px'});							//	\
	}	});																														//	\
	$(document).on('keyup', "#tablerightborder", function(e) 																	//	\
	{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))) 															//	\
		{	var tableid=$('#table_spec').attr('tableid');																		//	\
			var border=$('#tablerightborder').val().replace(/^\s+|\s+$/g, '').replace(/px$/g, '');								//	\
			var column=$('.tdcurrent').closest('tr').children('td').index($('.tdcurrent'));										//	\
			$('#'+tableid).find('tr').find('td:eq('+column+')').css({'border-right-width':border+'px'});						//	\
			$('#'+tableid).find('tr').find('th:eq('+column+')').css({'border-right-width':border+'px'});						//	\
			$('#'+tableid).find('tr:eq(0)').find('td:eq('+column+')').css({'border-right-width':'0px'});						//	\
	}	});																														//	\
//---------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------- CHANGE THE BORDERS AROUND A CELL ------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('keyup', "#tabletopcborder", function(e) 																	//	\
	{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))) 															//	\
		{	var tableid=$('#table_spec').attr('tableid');																		//	\
			var row=$('.tdcurrent').closest('tbody').children('tr').index($('.tdcurrent').closest('tr'));						//	\
			var column=$('.tdcurrent').closest('tr').children('td').index($('.tdcurrent'));										//	\
			var border=$('#tabletopcborder').val().replace(/^\s+|\s+$/g, '').replace(/px$/g, '');								//	\
			$('#'+tableid).find('tr:eq('+row+')').find('td:eq('+column+')').css({'border-top-width':border+'px'});				//	\
	}	});																														//	\
	$(document).on('keyup', "#tableleftcborder", function(e) 																	//	\
	{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))) 															//	\
		{	var tableid=$('#table_spec').attr('tableid');																		//	\
			var row=$('.tdcurrent').closest('tbody').children('tr').index($('.tdcurrent').closest('tr'));						//	\
			var column=$('.tdcurrent').closest('tr').children('td').index($('.tdcurrent'));										//	\
			var border=$('#tableleftcborder').val().replace(/^\s+|\s+$/g, '').replace(/px$/g, '');								//	\
			$('#'+tableid).find('tr:eq('+row+')').find('td:eq('+column+')').css({'border-left-width':border+'px'});				//	\
	}	});																														//	\
	$(document).on('keyup', "#tablerightcborder", function(e) 																	//	\
	{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))) 															//	\
		{	var tableid=$('#table_spec').attr('tableid');																		//	\
			var row=$('.tdcurrent').closest('tbody').children('tr').index($('.tdcurrent').closest('tr'));						//	\
			var column=$('.tdcurrent').closest('tr').children('td').index($('.tdcurrent'));										//	\
			var border=$('#tablerightcborder').val().replace(/^\s+|\s+$/g, '').replace(/px$/g, '');								//	\
			$('#'+tableid).find('tr:eq('+row+')').find('td:eq('+column+')').css({'border-right-width':border+'px'});			//	\
	}	});																														//	\
	$(document).on('keyup', "#tablebottomcborder", function(e) 																	//	\
	{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13)))) 															//	\
		{	var tableid=$('#table_spec').attr('tableid');																		//	\
			var row=$('.tdcurrent').closest('tbody').children('tr').index($('.tdcurrent').closest('tr'));						//	\
			var column=$('.tdcurrent').closest('tr').children('td').index($('.tdcurrent'));										//	\
			var border=$('#tablebottomcborder').val().replace(/^\s+|\s+$/g, '').replace(/px$/g, '');							//	\
			$('#'+tableid).find('tr:eq('+row+')').find('td:eq('+column+')').css({'border-bottom-width':border+'px'});			//	\
	}	});																														//	\
//---------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('mouseenter', ".normalrow", function(e) {	$(this).find('.trdelete, .tradd').show(); });					//	\ 
	$(document).on('mouseleave', ".normalrow", function(e) {	$(this).find('.trdelete, .tradd').hide(); });					//	\ 
//---------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
    $(document).on('mouseenter', "td", function(e) 																				//	\
    {	var tableid=$(this).closest(".tableblock").attr("id");																	//	\
        var col = $(this).parent().children().index($(this));																	//	\
		$('#'+tableid+' > table > tbody > tr:eq(0) > td:eq('+col+')').find('.tcdelete, .tcadd').show();							//	\--- These two items handle the showing and hiding of the buttons to
	});																															//	\--- add and delete rows and columns whenever a user hovers over a td
    $(document).on('mouseleave', "td", function(e) 																				//	\
    {  	var tableid=$(this).closest(".tableblock").attr("id");																	//	\
       	var col = $(this).parent().children().index($(this));																	//	\
		$('#'+tableid+' > table > tbody > tr:eq(0) > td:eq('+col+')').find('.tcdelete, .tcadd').hide();							//	\
    });																															//	\
//---------------------------------------------------------------------------------------------------------------------------------//


//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------ FILLING A TABLE UP AND DOWN ------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('dblclick', ".filler_down, .filler_up", function(event) 																			//	\
	{	var thisvalue=''; var test=''; var testarray=''; var solution=''; var replacement=''; var newindex=''; var neweq='';						//	\
		var rowIndex 	= $('.tdcurrent').closest('tr').prevAll('tr').length;																		//	\
		var columnIndex = $('.tdcurrent').closest('td').prevAll('td').length;																		//	\
		var tableid=$(this).closest('.filler_holder').siblings(".tableblock").attr("id");															//	\
		var thisvalue=$('.tdcurrent').attr('equation');																								//	\
		var toreplace="#"+tableid+".";																												//	\
		thisvalue=thisvalue.replace(/\#\./g, toreplace);																							//	\
		$("#"+tableid+" > table > tbody > tr").each(function(index) 																				//	\
		{	if (((index>=rowIndex)&&(event.currentTarget.className=="filler_down"))||((index<=rowIndex)&&(event.currentTarget.className=="filler_up")&&(index>2)))//	\
			{	if (thisvalue.match(/^=/)) 																											//	\
				{	test=thisvalue.match(/#Table[0-9]+\.[A-Z]\.[0-9]+/g);																			//	\
					var neweq=thisvalue;																											//	\
					if (test)																														//	\
					{																																//	\--- This is the case where the user has double clicked on one of the
						for (var tempindex = 0; tempindex < test.length; ++tempindex) 																//	\--- squares to autofill the table up or down. The user is offered a
						{																															//	\--- cross like item above the table where they can click on the left,
							testarray=test[tempindex].split(".");																					//	\--- right, top, or bottom of the cross. When the user clicks on the top
							if (testarray[2].match(/^$/)) { }else { newindex=parseInt(testarray[2], 10)+parseInt(index, 10)-parseInt(rowIndex, 10);}//	\--- or bottom section, this chunck of code fills in the cells above and below
							replacement=testarray[0]+"."+testarray[1]+"."+newindex;																	//	\
							neweq=neweq.replace(test[tempindex], replacement)																		//	\
						}																															//	\
					}																																//	\
					var toreplace="#"+tableid+".";																									//	\
					var thisequation=neweq.replace(/\#\./g, toreplace);																				//	\
					var eqobj={Page_position:DOM_Object[tableid]['location'], Format_showtype:"InnerFunction", equation:"TempEq"+thisequation};		//	\
					var id=CreateEq(this.fileid, 1, eqobj);																							//	\
					if (thisvalue.length>0) { solution='<div class="toedit">'+window[id].Solution_real['0-0']+' '+window[id].Units_units+'</div>'; }//	\
		 			$('#'+tableid+' > table > tbody > tr:eq('+index+') > td:eq('+columnIndex+')').attr('equation', neweq);							//	\
		 			$('#'+tableid+' > table > tbody > tr:eq('+index+') > td:eq('+columnIndex+')').attr('number', window[id].Solution_real['0-0']);	//	\
		 			$('#'+tableid+' > table > tbody > tr:eq('+index+') > td:eq('+columnIndex+')').attr('unit', window[id].Units_units);				//	\
		 			$('#'+tableid+' > table > tbody > tr:eq('+index+') > td:eq('+columnIndex+')').html(solution);									//	\
					 delete window[id]; delete DOM_Object[id];																						//	\
				}else																																//	\
				{																																	//	\
					if (thisvalue.length>0) { var showvalue=thisvalue+''; }																			//	\
		 			$('#'+tableid+' > table > tbody > tr:eq('+index+') > td:eq('+columnIndex+')').attr('equation', neweq);							//	\
		 			$('#'+tableid+' > table > tbody > tr:eq('+index+') > td:eq('+columnIndex+')').attr('number', window[id].Solution_real['0-0']);	//	\
		 			$('#'+tableid+' > table > tbody > tr:eq('+index+') > td:eq('+columnIndex+')').attr('unit', window[id].Units_units);				//	\
		 			$('#'+tableid+' > table > tbody > tr:eq('+index+') > td:eq('+columnIndex+')').html(showvalue);									//	\
				}																																	//	\
			}																																		//	\
		});																																			//	\
	}); 																																			//	\
//-----------------------------------------------------------------------------------------------------------------------------------------------------//

	
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------ FILLING A TABLE LEFT AND RIGHT ---------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on('dblclick', ".filler_left, .filler_right", function(event) 																		//	\
	{	var thisvalue=''; var test=''; var testarray=''; var solution=''; var replacement=''; var newindex=''; var neweq='';						//	\
		var rowIndex 	= $('.tdcurrent').closest('tr').prevAll('tr').length;																		//	\
		var columnIndex = $('.tdcurrent').closest('td').prevAll('td').length;																		//	\
		var tableid=$(this).closest('.filler_holder').siblings(".tableblock").attr("id");															//	\
		var thisvalue=$('.tdcurrent').attr('equation');																								//	\
		var toreplace="#"+tableid+".";																												//	\
		thisvalue=thisvalue.replace(/\#\./g, toreplace);																							//	\
		var numcolumns=$("#"+tableid+" >table> tbody > tr:first > td").length																		//	\
		for (var index=0; index<=numcolumns; index++)																								//	\
		{																																			//	\
			if (((index>=columnIndex)&&(event.currentTarget.className=="filler_right"))||((index<=columnIndex)&&(event.currentTarget.className=="filler_left")&&(index>2)))//	\
			{																																		//	\
				if (thisvalue.match(/^=/)) 																											//	\
				{																																	//	\
					test=thisvalue.match(/#Table[0-9]+\.[A-Z]\.[0-9]+/g);																			//	\
					var neweq=thisvalue;																											//	\
					if (test)																														//	\
					{																																//	\--- This is the case where the user has double clicked on one of the
						for (var tempindex = 0; tempindex < test.length; ++tempindex) 																//	\--- squares to autofill the table up or down. The user is offered a
						{																															//	\--- cross like item above the table where they can click on the left,
							testarray=test[tempindex].split(".");																					//	\--- right, top, or bottom of the cross. When the user clicks on the top
							newindex=String.fromCharCode(testarray[1].charCodeAt()+parseInt(index, 10)-parseInt(columnIndex, 10));					//	\--- or bottom section, this chunck of code fills in the cells above and below
							replacement=testarray[0]+"."+newindex+"."+testarray[2];																	//	\
							neweq=neweq.replace(test[tempindex], replacement)																		//	\
						}																															//	\
					}																																//	\
					var toreplace="#"+tableid+".";																									//	\
					var thisequation=neweq.replace(/\#\./g, toreplace);																				//	\
					var eqobj={Page_position:DOM_Object[tableid]['location'], Format_showtype:"InnerFunction", equation:"TempEq"+thisequation};		//	\
					var id=CreateEq(this.fileid, 1, eqobj);																							//	\
					if (thisvalue.length>0) { solution='<div class="toedit">'+window[id].Solution_real['0-0']+' '+window[id].Units_units+'</div>'; }//	\
		 			$('#'+tableid+' > table > tbody > tr:eq('+rowIndex+') > td:eq('+index+')').attr('equation', neweq);								//	\
		 			$('#'+tableid+' > table > tbody > tr:eq('+rowIndex+') > td:eq('+index+')').attr('number', window[id].Solution_real['0-0']);		//	\
		 			$('#'+tableid+' > table > tbody > tr:eq('+rowIndex+') > td:eq('+index+')').attr('unit', window[id].Units_units);				//	\
		 			$('#'+tableid+' > table > tbody > tr:eq('+rowIndex+') > td:eq('+index+')').html(solution);										//	\
					 delete window[id]; delete DOM_Object[id];																						//	\
				}else																																//	\
				{																																	//	\
					if (thisvalue.length>0) { var showvalue=thisvalue+''; }																			//	\
		 			$('#'+tableid+' > table > tbody > tr:eq('+rowIndex+') > td:eq('+index+')').attr('equation', neweq);								//	\
		 			$('#'+tableid+' > table > tbody > tr:eq('+rowIndex+') > td:eq('+index+')').attr('number', window[id].Solution_real['0-0']);		//	\
		 			$('#'+tableid+' > table > tbody > tr:eq('+rowIndex+') > td:eq('+index+')').attr('unit', window[id].Units_units);				//	\
		 			$('#'+tableid+' > table > tbody > tr:eq('+rowIndex+') > td:eq('+index+')').html(showvalue);										//	\
				}																																	//	\
			}																																		//	\
		}																																			//	\
		for (var i in DOM_Object) 	{ if (i!="clean") {	 if (window[i].Format_name=="NA"){ delete window[i]; delete DOM_Object[i]; }	} }			//	\
	}); 																																			//	\
//-----------------------------------------------------------------------------------------------------------------------------------------------------//

/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
    $(document).on('click', ".tablespecs", function(e) 																								//	\
    {	$('#table_spec').toggle();																													//	\
        var tableid=$(this).closest('.icon_holder').siblings(".tableblock").attr("id");																//	\
		$('#table_spec').attr('tableid',tableid);																									//	\
		$('#equation_spec, #image_spec, #loop_spec, #symeq_spec, #text_spec, #plot_spec').hide();													//	\
	});																																				//	\
    $(document).on('click', "#tablespecs_showtable", function(e) 																					//	\
	{	$('#tablespecs_table').toggle();	$('#tablespecs_row, #tablespecs_column, #tablespecs_cell, #tablespecs_ref').hide();});					//	\
    $(document).on('click', "#tablespecs_showrow", function(e) 																						//	\
	{	$('#tablespecs_row').toggle();	$('#tablespecs_table, #tablespecs_column, #tablespecs_cell, #tablespecs_ref').hide();});					//	\
    $(document).on('click', "#tablespecs_showcolumn", function(e) 																					//	\
	{	$('#tablespecs_column').toggle();	$('#tablespecs_table, #tablespecs_row, #tablespecs_cell, #tablespecs_ref').hide();});					//	\
    $(document).on('click', "#tablespecs_showcell", function(e) 																					//	\
	{	$('#tablespecs_cell').toggle();	$('#tablespecs_table, #tablespecs_row, #tablespecs_column, #tablespecs_ref').hide(); });					//	\
	$(document).on('click', "#tablespecs_showrefs", function(e) 																					//	\
	{	$('#tablespecs_ref').toggle();	$('#tablespecs_table, #tablespecs_row, #tablespecs_column, #tablespecs_cell').hide(); });					//	\
/*-----------------------------------------------------------------------------------------------------------------------------------------------------*/
    
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------ End of Tables ------------------------------------------------------------------------------*/
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
	thischart.tooltip.formatter= "";																																//	\
	if(window[PlotID].Chart_type=="heatmap") {		thischart.tooltip.pointFormat='{series.name}: X is {point.x} : Y is {point.y} : the value is {point.value}<br/>';//	\
//	}else if(window[PlotID].Chart_type=="bubble") {	thischart.tooltip.pointFormat='{series.name}: X is {point.x} : Y is {point.y} : the value is {point.value}<br/>';//	\
	}else if(window[PlotID].Chart_type=="pie") {	thischart.tooltip.pointFormat='{point.name} - {point.y}<br/>';													//	\
	}else if(window[PlotID].Chart_type!="bubble"){	thischart.tooltip.pointFormat='{series.name}: X is {point.x} : Y is {point.y}<br/>';	}						//	\
	thischart.tooltip.headerFormat='';																																//	\
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
	if (typeof(callback)=="function") { callback();	} 																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------- EXPAND THE PLOT TO NEW TAB ---------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('click', '.expandbutton', function(event) {																											//	\ 
	var plotid=$(this).closest('.icon_holder').siblings('.plot_block').attr('id');																					//	\
	window.open("http://www.cadwolf.com/Charts/"+plotid);																											//	\
});																																									//	\
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
		CreatePlot(PlotID, function() { ResizeChart(PlotID)});																										//	\
		$('#MainBody').show();																																		//	\
		$('.icon_holder').hide();																																	//	\
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
/*-------------------------------------------------------- THE FUNCTION TO SOLVE THE PLOT INPUTS ----------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function solvePlotData(PlotID, DataID, plotObject, className)																										//	\
{	Create_EqObj(PlotID, function() { 																																//	\
	callPlotSolver(PlotID, DataID, plotObject, className) });						 																				//	\
}																																									//	\
function callPlotSolver(PlotID, DataID, plotObject, className)																										//	\
{	$('#'+PlotID).addClass('active_plot');																															//	\
	var plotWorker = new Worker("http://www.cadwolf.com/js/EquationSolver.js");																						//	\
	plotWorker.postMessage({																																		//	\
		"cadwolfType":"SolvePlotData", 																																//	\
		"plotObject":plotObject,																																	//	\
		"className":className,																																		//	\
		"PlotID":PlotID,																																			//	\
		"DataID":DataID,																																			//	\
		"Units_Object":Units_Object,																																//	\
		"ParseUnits":ParseUnits,																																	//	\
		"ImportedFunctions":ImportedFunctions,																														//	\
		"FileID":$('#filenumber').attr('filenumber'),																												//	\
		"EqObj":window[PlotID].EqObj																																//	\
	});																																								//	\
	plotWorker.onmessage = function(e) {																															//	\
		returnObject=e.data;																																		//	\
		if (returnObject.messageType=="PlotDataResults") 																											//	\
		{	if (returnObject.className=="all")																														//	\
			{	for (var objProp in returnObject.plotObj) { window[returnObject.PlotID][objProp]=returnObject.plotObj[objProp]; }									//	\
				CreatePlot(PlotID);																																	//	\
			}else																																					//	\	
			{	for (var objProp in returnObject.plotObj) { window[returnObject.PlotID][objProp]=returnObject.plotObj[objProp]; }									//	\
				for (var DepDataID in returnObject.Dependents)																										//	\
				{	if (DOM_Object[PlotID]['Dependents'][DepDataID]===undefined) { DOM_Object[PlotID]['Dependents'][DepDataID]={}; }								//	\
					for (var DataID in DOM_Object[PlotID]['Dependents'])																							//	\
					{	if (DepDataID==DataID) 																														//	\
						{	for (var eqID in returnObject.Dependents[DepDataID]){ var axis=returnObject.Dependents[DepDataID][eqID]['axis']; }						//	\
							for (var eqID in DOM_Object[PlotID]['Dependents'][DataID])																				//	\
							{	if(axis==DOM_Object[PlotID]['Dependents'][DataID][eqID]['axis']) { delete DOM_Object[PlotID]['Dependents'][DataID][eqID]; } }		//	\
							for (var eqID in returnObject.Dependents[DepDataID])																					//	\
							{	DOM_Object[PlotID]['Dependents'][DataID][eqID]={}; 																					//	\
								DOM_Object[PlotID]['Dependents'][DataID][eqID]['active']=1; 																		//	\
								DOM_Object[PlotID]['Dependents'][DataID][eqID]['axis']=returnObject.Dependents[DepDataID][eqID]['axis']; 							//	\
				}	}	}	}																																		//	\
				CreatePlot(PlotID);																																	//	\
			}																																						//	\
		}																																							//	\
		$('#'+PlotID).removeClass('active_plot');																													//	\
		plotWorker.terminate();																																		//	\
		plotWorker=undefined;																																		//	\
	}																																								//	\	
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------- SURFACE MAPS --------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*
	The user can add a surface, a line, and in the future there will be point clouds and others. Some of the work is offloaded to the worker and some must be done		\
	in the main code. The reason for this is that object prototypes are lost in the transfer between the worker and the main code. This necesitates relooping through	\
	most vertices, faces, and colors to reset those objects. For this reason, inputs from the user are sent to the worker to be solved numerically, those values are 	\
	sent back to this code and the proper colors are calculated and set. When the page is loaded, that same data is read in the same way and the chart is created 		\
	just as it is when the new dataset is created.																														\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------- CALL THE SOLVER FOR THE EQUATION ---------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the function that actually calls the web worker to solve the equation.																						\
	PlotID 		- The ID of the plot in question																														\
	DataID 		- The ID of the data object																																\
	plotObject	- The object that holds the structure of the chart and all the data																						\
	axis		- An "x", "y", or "z" depending on which axis is being analyzed																							\
	type		- This is the phrase "Line" or "Surface" depending on the type of structure the data being analyzed represents											\
																																										\
	Initialize			-	Sets up all the items needed for the scene like the camera and the view and the scene itself												\
	removeItem			-	Clear defined object from a scene																											\
	setSurfaceVertices	-	Looks at a specified data set for a surface and sets the vertices object for each piece of data												\
	setSurfaceColors	-	Looks at a specified data set for a surface and sets the colors for those vertices based on the colormap and z position						\
	setLineColors		-	Looks at a specified data set for a line and sets the vertices and colors for those vertices based on the colormap and z position			\
	setMeshes			-	Takes the surface object for a given surface and creates the material and the mesh and then adds it to the scene							\
	setLegend			-	Sets the legend is a surface map																											\
	setPositions		-	Sets the position of the camera for the scene																								\
	makeGrids			-	Creates and adds to the scene any planes that the user has added to the chart																\
	setAxes				-	Creates and adds to the scene the Axes for the chart																						\
																																										\
	setSceneProps			-	Sets the inputs boxes for the camera position and rotation of the scene and then populates the planes									\
	setPlaneProps			-	Sets the inputs boxes for a plane once that plane has been selected																		\
	setDataProps			-	Sets the items on the data tab for any given dataset																					\
	populateSurfaceObjects	-	Populates all the overall items for a surface																							\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function solveSurfaceData(PlotID, DataID, plotObject, axis, type)																									//	\
{	Create_EqObj(PlotID, function() { 																																//	\
	callSurfaceSolver(PlotID, DataID, plotObject, axis, type) });					 																				//	\
}																																									//	\
function callSurfaceSolver(PlotID, DataID, plotObject, axis, type)																									//	\
{	$('#'+PlotID).addClass('active_plot');																															//	\
	var thisWorker="worker"+DataID;																																	//	\
	window[thisWorker] = new Worker("http://www.cadwolf.com/js/EquationSolver.js");																					//	\
	window[thisWorker].postMessage({																																//	\
		"cadwolfType":"SolveSurfaceData", 																															//	\
		"dataObject":JSON.parse(JSON.stringify(window[PlotID]['Chart_dataobj'])),																					//	\
		"Props":window[PlotID]['Props'],																															//	\
		"axis":axis,																																				//	\
		"PlotID":PlotID,																																			//	\
		"DataID":DataID,																																			//	\
		"Units_Object":Units_Object,																																//	\
		"ParseUnits":ParseUnits,																																	//	\
		"ImportedFunctions":ImportedFunctions,																														//	\
		"type":"singleAxis",																																		//	\
		"FileID":$('#filenumber').attr('filenumber'),																												//	\
		"divideColorMap":window[PlotID]['Props']['divideColormap'],																									//	\
		"colorMap":window[PlotID].Props.Legend.colorMap,																											//	\
		"numberOfColors":window[PlotID].Props.Legend.numberOfColors,																								//	\
		"EqObj":window[PlotID]['EqObj'],																															//	\
		"type":type																																					//	\
	});																																								//	\
	window[thisWorker].onmessage = function(e) 																														//	\
	{	returnObject=e.data;																																		//	\
		var xMax=-99999999, xMin=999999999, yMax=-99999999, yMin=999999999, zMax=-99999999, zMin=999999999, cMax=-99999999, cMin=999999999;							//	\
		var PlotID=returnObject['PlotID'];																															//	\
		var DataID=returnObject['DataID'];																															//	\
		window[PlotID]['Props']=returnObject['Props'];																												//	\
		dataObj=returnObject['dataObject'];																															//	\
		window[PlotID]['Chart_dataobj'][DataID]['xMax']=returnObject['dataObject'][DataID]['xMax'];																	//	\
		window[PlotID]['Chart_dataobj'][DataID]['xMin']=returnObject['dataObject'][DataID]['xMin'];																	//	\
		window[PlotID]['Chart_dataobj'][DataID]['yMax']=returnObject['dataObject'][DataID]['yMax'];																	//	\
		window[PlotID]['Chart_dataobj'][DataID]['yMin']=returnObject['dataObject'][DataID]['yMin'];																	//	\
		window[PlotID]['Chart_dataobj'][DataID]['zMax']=returnObject['dataObject'][DataID]['zMax'];																	//	\
		window[PlotID]['Chart_dataobj'][DataID]['zMin']=returnObject['dataObject'][DataID]['zMin'];																	//	\
		window[PlotID]['Chart_dataobj'][DataID]['cMax']=returnObject['dataObject'][DataID]['cMax'];																	//	\
		window[PlotID]['Chart_dataobj'][DataID]['cMin']=returnObject['dataObject'][DataID]['cMin'];																	//	\
		window[PlotID]['Chart_dataobj'][DataID].xData=returnObject['dataObject'][DataID]['xData'];																	//	\
		window[PlotID]['Chart_dataobj'][DataID].yData=returnObject['dataObject'][DataID]['yData'];																	//	\
		window[PlotID]['Chart_dataobj'][DataID].zData=returnObject['dataObject'][DataID]['zData'];																	//	\
		window[PlotID]['Chart_dataobj'][DataID].cData=returnObject['dataObject'][DataID]['cData'];																	//	\
		if ((returnObject['type']=="Surface")||(returnObject['type']=="PointCloud"))																				//	\
		{	DOM_Object[PlotID]['Dependents'][returnObject['Axis']]={};																								//	\
			for (var dep in returnObject['Deps'][returnObject['Axis']]){ DOM_Object[PlotID]['Dependents'][returnObject['Axis']][dep]=1;	}							//	\
			window[PlotID]['Chart_dataobj'][DataID].xLength=returnObject['dataObject'][DataID]['xLength'];															//	\
			window[PlotID]['Chart_dataobj'][DataID].yLength=returnObject['dataObject'][DataID]['yLength'];															//	\
			CPLOT=PlotID;																																			//	\
			window[PlotID].removeItem(DataID, 																														//	\
				function(){window[PlotID].setSurfaceVertices( DataID, 																								//	\
				function() {window[PlotID].setPlotExtremes( DataID,																									//	\
				function(){window[PlotID].setSurfaceColors( DataID, 																								//	\
				function(){window[PlotID].setMeshes( DataID, 																										//	\
				function(){window[PlotID].setLegend( 																												//	\
				function(){window[PlotID].setPositions( 	 																										//	\
				function(){window[PlotID].Render( PlotID)} )} )} )} )} )} )} );																						//	\
		}else if (returnObject['type']=="Line")																														//	\
		{	DOM_Object[PlotID]['Dependents'][returnObject['Axis']]={};																								//	\
			for (var dep in returnObject['Deps'][returnObject['Axis']]){ DOM_Object[PlotID]['Dependents'][returnObject['Axis']][dep]=1;	}							//	\
			window[PlotID]['Chart_dataobj'][DataID]['lineGeometry']=returnObject['dataObject'][DataID]['lineGeometry'];												//	\
			for (thisDataID in window[PlotID]['Chart_dataobj'])																										//	\
			{	if ((window[PlotID]['Chart_dataobj'][thisDataID]['type']=="Surface")||(window[PlotID]['Chart_dataobj'][thisDataID]['type']=="Line")||(window[PlotID]['Chart_dataobj'][thisDataID]['type']=="PointCloud"))	
				{	if (window[PlotID]['Chart_dataobj'][thisDataID]['xMax']>xMax) { xMax=window[PlotID]['Chart_dataobj'][thisDataID]['xMax'];  }					//	\
					if (window[PlotID]['Chart_dataobj'][thisDataID]['xMin']<xMin) { xMin=window[PlotID]['Chart_dataobj'][thisDataID]['xMin'];  }					//	\
					if (window[PlotID]['Chart_dataobj'][thisDataID]['yMax']>yMax) { yMax=window[PlotID]['Chart_dataobj'][thisDataID]['yMax'];  }					//	\
					if (window[PlotID]['Chart_dataobj'][thisDataID]['yMin']<yMin) { yMin=window[PlotID]['Chart_dataobj'][thisDataID]['yMin'];  }					//	\
					if (window[PlotID]['Chart_dataobj'][thisDataID]['zMax']>zMax) { zMax=window[PlotID]['Chart_dataobj'][thisDataID]['zMax'];  }					//	\
					if (window[PlotID]['Chart_dataobj'][thisDataID]['zMin']<zMin) { zMin=window[PlotID]['Chart_dataobj'][thisDataID]['zMin'];  }					//	\
					if (window[PlotID]['Chart_dataobj'][thisDataID]['cMax']>cMax) { cMax=window[PlotID]['Chart_dataobj'][thisDataID]['cMax'];  }					//	\
					if (window[PlotID]['Chart_dataobj'][thisDataID]['cMin']<cMin) { cMin=window[PlotID]['Chart_dataobj'][thisDataID]['cMin'];  }					//	\
			}	}																																					//	\
			window[PlotID]['Props']['xMax']=xMax;	window[PlotID]['Props']['xMin']=xMin;																			//	\
			window[PlotID]['Props']['yMax']=yMax;	window[PlotID]['Props']['yMin']=yMin;																			//	\
			window[PlotID]['Props']['zMax']=zMax;	window[PlotID]['Props']['zMin']=zMin;																			//	\
			window[PlotID]['Props']['cMax']=cMax;	window[PlotID]['Props']['cMin']=cMin;																			//	\
			window[PlotID].removeItem(DataID, 																														//	\
				function(){window[PlotID].setLineColors( DataID, 																									//	\
				function(){window[PlotID].setMeshes( DataID,																										//	\
				function(){window[PlotID].setLegend( 																												//	\
				function(){window[PlotID].setPositions( 	 																										//	\
				function(){window[PlotID].Render( PlotID)} )} )} )} )} );																							//	\
		}else if (returnObject['type']=="Lathe")																													//	\
		{	DOM_Object[PlotID]['Dependents'][returnObject['Axis']]={};																								//	\
			for (var dep in returnObject['Deps'][returnObject['Axis']]){ DOM_Object[PlotID]['Dependents'][returnObject['Axis']][dep]=1;	}							//	\
			window[PlotID]['Chart_dataobj'][DataID].xData=returnObject['dataObject'][DataID]['xData'];																//	\
			window[PlotID]['Chart_dataobj'][DataID].yData=returnObject['dataObject'][DataID]['yData'];																//	\
			window[PlotID]['Chart_dataobj'][DataID].zData=returnObject['dataObject'][DataID]['zData'];																//	\
			window[PlotID]['Chart_dataobj'][DataID].cData=returnObject['dataObject'][DataID]['cData'];																//	\
			if (returnObject['Axis']=="x") { window[PlotID]['Chart_dataobj'][DataID]['xData']=returnObject['dataObject'][DataID]['xData']; }						//	\
			if (returnObject['Axis']=="y") { window[PlotID]['Chart_dataobj'][DataID]['yData']=returnObject['dataObject'][DataID]['yData']; }						//	\
			window[PlotID].formatLatheData(DataID, function(){window[PlotID].createShape("Lathe",  DataID, 1) });													//	\
		}																																							//	\
		if ((returnObject['type']=="Surface")||(returnObject['type']=="Line")||(returnObject['type']=="PointCloud"))												//	\
		{	for (thisDataID in window[PlotID]['Chart_dataobj'])																										//	\
			{	if (((window[PlotID]['Chart_dataobj'][thisDataID]['type']=="Surface")&&(thisDataID!=returnObject['thisDataID']))||((window[PlotID]['Chart_dataobj'][thisDataID]['type']=="PointCloud")&&(thisDataID!=returnObject['thisDataID'])))
				{	window[PlotID].removeItem(thisDataID, 																											//	\
						function(){window[PlotID].setSurfaceVertices( thisDataID, 																					//	\
						function() {window[PlotID].setPlotExtremes( DataID,																							//	\
						function(){window[PlotID].setSurfaceColors( thisDataID, 																					//	\
						function(){window[PlotID].setMeshes( thisDataID, 																							//	\
						function(){window[PlotID].setLegend( 																										//	\
						function(){window[PlotID].setPositions( 	 																								//	\
						function(){window[PlotID].Render( PlotID)} )} )} )} )} )} )} );																				//	\
				}else if ((window[PlotID]['Chart_dataobj'][thisDataID]['type']=="Line")&&(thisDataID!=returnObject['thisDataID']))									//	\
				{	window[PlotID].removeItem(thisDataID, 																											//	\
						function(){window[PlotID].setLineColors( thisDataID, 																						//	\
						function(){window[PlotID].setMeshes( thisDataID,																							//	\
						function(){window[PlotID].setLegend( 																										//	\
						function(){window[PlotID].setPositions( 	 																								//	\
						function(){window[PlotID].Render( PlotID)} )} )} )} )} );																					//	\
				}																																					//	\
			}																																						//	\
			CPLOT=PlotID; animate();																																//	\
		}																																							//	\
		$('#'+PlotID).removeClass('active_plot');																													//	\
		var thisWorker="worker"+DataID;																																//	\
		window[thisWorker].terminate();																																//	\
		window[thisWorker]=undefined;																																//	\
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
	this.xLength=0;																																					// 	\
	this.yLength=0;																																					// 	\
	this.zLength=0;																																					// 	\
	this.axisHelper=0;																																				// 	\
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
	this.Props.xMax=-99999999999;																																	//	\
	this.Props.yMax=-99999999999;																																	//	\
	this.Props.zMax=-99999999999;																																	//	\
	this.Props.cMax=-99999999999;																																	//	\
	this.Props.xMin=99999999999;																																	//	\
	this.Props.yMin=99999999999;																																	//	\
	this.Props.zMin=99999999999;																																	//	\
	this.Props.cMin=99999999999;																																	//	\
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
	this.Props.Legend.showhide="show";																																//	\
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
{ 	this.type="Surface"																																				//	\
	this.Format_id=DataID;																																			// 	\
	this.Format_plotid=PlotID;																																		// 	\
	this.Format_name="";																																			// 	\
	this.xData_raw='';																																				//	\
	this.yData_raw='';																																				//	\
	this.zData_raw='';																																				//	\
	this.cData_raw='';																																				//	\
	this.xData={};																																					//	\
	this.yData={};																																					//	\
	this.zData={};																																					//	\
	this.cData={};																																					//	\
	this.xMin=0;																																					//	\
	this.xMax=0;																																					//	\
	this.yMin=0;																																					//	\
	this.yMax=0;																																					//	\
	this.zMin=0;																																					//	\
	this.zMax=0;																																					//	\
	this.cMin=0;																																					//	\
	this.cMax=0;																																					//	\
	this.useColorData=0;																																			//	\
	this.showLines=1;																																				//	\
	this.surfaceGeometry={};																																		//	\
	this.colorMap='rainbow';																																		//	\
	this.numberOfColors=32;																																			//	\
	this.legendLayout='horizontal';																																	//	\
	this.flat=0;																																					//	\
	this.xoffset=0;																																					//	\
	this.yoffset=0;																																					//	\
	this.zoffset=0;																																					//	\
	this.color="ffffcc";																																			//	\
	this.wirecolor='000000';																																		//	\
	this.lineRadius=2;																																				//	\
	this.lineRadSegs=3;																																				//	\
	this.lineClosed=false;																																			//	\
	this.wireFrame="Wireframe";																																		//	\
	this.sWireFrame="Solid";																																		//	\
	this.width=10;																																					//	\
	this.height=10;																																					//	\
	this.depth=10;																																					//	\
	this.widthsegs=10;																																				//	\
	this.heightsegs=10;																																				//	\
	this.depthsegs=10;																																				//	\
	this.radius=10;																																					//	\
	this.detail=1;																																					//	\
	this.phistart=0;																																				//	\
	this.philength=360;																																				//	\
	this.thetastart=0;																																				//	\
	this.thetalength=360;																																			//	\
	this.topradius=10;																																				//	\
	this.botradius=10;																																				//	\
	this.radsegs=5;																																					//	\
	this.openended=false;																																			//	\
	this.tubediameter=10;																																			//	\
	this.tubesegs=10;																																				//	\
	this.arc=360;																																					//	\
	this.curve=[];																																					//	\
	this.curvetext='';																																				//	\
	this.numsegs=1;																																					//	\
	this.xstart=0;																																					//	\
	this.xstop=10;																																					//	\
	this.ystart=0;																																					//	\
	this.ystop=10;																																					//	\
	this.zstart=0;																																					//	\
	this.zstop=10;																																					//	\
	this.xspacing=1;																																				//	\
	this.yspacing=1;																																				//	\
	this.zspacing=1;																																				//	\
	this.gridtype="XY";																																				//	\
	this.axistype="X";																																				//	\
	this.axisstart=0;																																				//	\
	this.axisstop=10;																																				//	\
	this.axisinterval=1;																																			//	\
	this.axisfontsize=32;																																			//	\
	this.tickLength=3;																																				//	\
	this.axiscolor='000000';																																		//	\
	this.fontsize=1;																																				//	\
	this.xDir=1;																																					//	\
	this.yDir=1;																																					//	\
	this.zDir=1;																																					//	\
	this.length=1;																																					//	\
	this.aHeight=1;																																					//	\
	this.aWidth=1;																																					//	\
	this.xPosition=0;																																				//	\
	this.yPosition=0;																																				//	\
	this.zPosition=0;																																				//	\
	this.xRotation=0;																																				//	\
	this.yRotation=0;																																				//	\
	this.zRotation=0;																																				//	\
	this.xTextOffset=0;																																				//	\
	this.yTextOffset=0;																																				//	\
	this.zTextOffset=0;																																				//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- INITIALIZE THE SURFACE MAP PLOT --------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.Initialize = function(type)																														//	\
{	var PlotID=this.Format_id;																																		//	\
	this.Scene=new THREE.Scene();																																	//	\
	this.Camera = new THREE.PerspectiveCamera( this.Props.view_angle, this.Props.aspect, this.Props.near, this.Props.far);											//	\
	this.Camera.up = new THREE.Vector3( 0, 0, 1 );																													//	\
	this.Camera.name = 'camera';																																	//	\
	this.Keyboard = new THREEx.KeyboardState();																														//	\
	this.Clock = new THREE.Clock();																																	//	\
	this.Scene.add(this.Camera);																																	//	\
	if ( Detector.webgl ) { this.Renderer = new THREE.WebGLRenderer( {antialias:true} ); } else { this.Renderer = new THREE.CanvasRenderer(); }						//	\
	this.Renderer.setSize(this.Props.screen_width, this.Props.screen_height);																						//	\
	this.Renderer.setClearColor( 0xffffff, 1);																														//	\
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

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------ FUNCTION TO CLEAN A SCENE ------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
Surface.prototype.removeItem = function (DataID, callback)																											//	\
{	console.log('Removing '+DataID);
	var PlotID=this.Format_id;																																		//	\
	var elementsInTheScene = window[PlotID].Scene.children.length;																									//	\
	for ( var i = elementsInTheScene-1; i > 0; i-- ) 																												//	\
	{	if ( window[PlotID].Scene.children[ i ]['name'] == DataID) { window[PlotID].Scene.remove ( window[PlotID].Scene.children [ i ] ); } } 						//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------- SET THE VERTICES FOR EVERY DATASET -------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	Given a dataset ID, this code looks at the available data and creates vectors necessary. This function is necessary because the worker cannot return object  		\
	prototypes to the main code so we lose that when the data is returned.																								\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
Surface.prototype.setSurfaceVertices=function (DataID, callback)																									//	\
{	console.log('Setting vertices for '+DataID);
	var key='', xkey='', ykey='', key1='', key2='', xVal=0, yVal=0, zVal=0,index=0, keyMap={}, xoff=0, yoff=0, zoff=0;												//	\
	var xMax=-99999999, xMin=9999999, yMax=-99999999, yMin=9999999, zMax=-99999999, zMin=9999999;																	//	\
	var PlotID=this.Format_id;																																		//	\
	var surfaceGeometry=new THREE.Geometry();																														//	\
	xoff=window[PlotID]['Chart_dataobj'][DataID].xoffset;																											//	\
	yoff=window[PlotID]['Chart_dataobj'][DataID].yoffset;																											//	\
	zoff=window[PlotID]['Chart_dataobj'][DataID].zoffset;																											//	\
	$('.plot_errorblock').html('');																																	//	\
	if ((parseInt(window[PlotID]['Chart_dataobj'][DataID].xLength)==1)||(parseInt(window[PlotID]['Chart_dataobj'][DataID].yLength)==1))								//	\
	{	$('.plot_errorblock').html('Surfaces and Points Clouds must have multiple rows and columns. The data sent had '+window[PlotID]['Chart_dataobj'][DataID].xLength+' row and '+window[PlotID]['Chart_dataobj'][DataID].yLength+' column');
	}																																								//	\
	for (var a=0; a<parseInt(window[PlotID]['Chart_dataobj'][DataID].xLength); a++)																					//	\
	{	xkey='0-'+a;																																				//	\
		for (var b=0; b<parseInt(window[PlotID]['Chart_dataobj'][DataID].yLength); b++)																				//	\
		{	ykey='0-'+b;																																			//	\
			key=a+'-'+b;																																			//	\
			keyMap[key]=index;																																		//	\
			if (window[PlotID]['Chart_dataobj'][DataID].xData[xkey]===undefined){ xVal=a+xoff; }else{xVal=window[PlotID]['Chart_dataobj'][DataID].xData[xkey]+xoff;}//	\
			if (window[PlotID]['Chart_dataobj'][DataID].yData[ykey]===undefined){ yVal=b+yoff; }else{yVal=window[PlotID]['Chart_dataobj'][DataID].yData[ykey]+yoff;}//	\
			if (window[PlotID]['Chart_dataobj'][DataID]['flat']==1)																									//	\
			{	zVal=zoff;	}else { zVal=parseFloat(Big(window[PlotID]['Chart_dataobj'][DataID].zData[key]).plus(zoff));	 }										//	\
			surfaceGeometry.vertices.push( new THREE.Vector3( xVal, yVal, zVal ) ); 																				//	\
			if (window[PlotID]['Chart_dataobj'][DataID].zData[key]>zMax) { zMax=window[PlotID]['Chart_dataobj'][DataID].zData[key]; }								//	\
			if (window[PlotID]['Chart_dataobj'][DataID].zData[key]<zMin) { zMin=window[PlotID]['Chart_dataobj'][DataID].zData[key]; }								//	\
			index++;																																				//	\
	}	}																																							//	\
	for (var a=0; a<parseInt(window[PlotID]['Chart_dataobj'][DataID].xLength)-1; a++)																				//	\
	{	for (var b=0; b<parseInt(window[PlotID]['Chart_dataobj'][DataID].yLength)-1; b++)																			//	\
		{	key=a+'-'+b;		var num1=a+1;	num2=b+1;																											//	\
			surfaceGeometry.faces.push( new THREE.Face3( keyMap[key], keyMap[a+'-'+num2], keyMap[num1+'-'+b] ) );													//	\
			surfaceGeometry.faces.push( new THREE.Face3( keyMap[a+'-'+num2], keyMap[num1+'-'+num2], keyMap[num1+'-'+b] ) );											//	\
	}	}																																							//	\
	surfaceGeometry.computeBoundingBox();																															//	\
	window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']=surfaceGeometry;																						//	\
	window[PlotID]['Chart_dataobj'][DataID].xMin=parseFloat(Big(surfaceGeometry.boundingBox.min.x).minus(Big(window[PlotID]['Chart_dataobj'][DataID]['xoffset'])));	//	\
	window[PlotID]['Chart_dataobj'][DataID].xMax=parseFloat(Big(surfaceGeometry.boundingBox.max.x).minus(Big(window[PlotID]['Chart_dataobj'][DataID]['xoffset'])));	//	\
	window[PlotID]['Chart_dataobj'][DataID].yMin=parseFloat(Big(surfaceGeometry.boundingBox.min.y).minus(Big(window[PlotID]['Chart_dataobj'][DataID]['yoffset'])));	//	\
	window[PlotID]['Chart_dataobj'][DataID].yMax=parseFloat(Big(surfaceGeometry.boundingBox.max.y).minus(Big(window[PlotID]['Chart_dataobj'][DataID]['yoffset'])));	//	\
	window[PlotID]['Chart_dataobj'][DataID].zMin=zMin;																												//	\
	window[PlotID]['Chart_dataobj'][DataID].zMax=zMax;																												//	\
	window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['colorsNeedUpdate']=true;																			//	\
	window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['elementsNeedUpdate']=true;																			//	\
	window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['groupsNeedUpdate']=true;																			//	\
	window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['verticesNeedUpdate']=true;																			//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------- SET THE EXTREME DATA FOR THE PLOT --------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
Surface.prototype.setPlotExtremes=function (DataID, callback)																										//	\
{	console.log('Setting Extremes for '+this.Format_id);
	var PlotID=this.Format_id;																																		//	\
	window[PlotID]['Props']['xMax']=-999999999;		window[PlotID]['Props']['xMin']=999999999;																		//	\
	window[PlotID]['Props']['yMax']=-999999999;		window[PlotID]['Props']['yMin']=999999999;																		//	\
	window[PlotID]['Props']['zMax']=-999999999;		window[PlotID]['Props']['zMin']=999999999;																		//	\
	for (var DataID in window[PlotID]['Chart_dataobj'])																												//	\
	{	console.log('The min and max for '+DataID+' are '+window[PlotID]['Chart_dataobj'][DataID].zMin+' and '+window[PlotID]['Chart_dataobj'][DataID].zMax);
		if ((window[PlotID]['Chart_dataobj'][DataID]['type']=="Line")||(window[PlotID]['Chart_dataobj'][DataID]['type']=="Surface")||(window[PlotID]['Chart_dataobj'][DataID]['type']=="PointCloud"))
		{	if (window[PlotID]['Chart_dataobj'][DataID].xMin<window[PlotID]['Props']['xMin']){ window[PlotID]['Props']['xMin']=window[PlotID]['Chart_dataobj'][DataID].xMin;}	
			if (window[PlotID]['Chart_dataobj'][DataID].xMax>window[PlotID]['Props']['xMax']){ window[PlotID]['Props']['xMax']=window[PlotID]['Chart_dataobj'][DataID].xMax;}	
			if (window[PlotID]['Chart_dataobj'][DataID].yMin<window[PlotID]['Props']['yMin']){ window[PlotID]['Props']['yMin']=window[PlotID]['Chart_dataobj'][DataID].yMin;}	
			if (window[PlotID]['Chart_dataobj'][DataID].yMax>window[PlotID]['Props']['yMax']){ window[PlotID]['Props']['yMax']=window[PlotID]['Chart_dataobj'][DataID].yMax;}	
			if (window[PlotID]['Chart_dataobj'][DataID]['useColorData']==1)																							//	\
			{	if (window[PlotID]['Chart_dataobj'][DataID].cMin<window[PlotID]['Props']['zMin']){ window[PlotID]['Props']['zMin']=window[PlotID]['Chart_dataobj'][DataID].cMin;}	
				if (window[PlotID]['Chart_dataobj'][DataID].cMax>window[PlotID]['Props']['zMax']){ window[PlotID]['Props']['zMax']=window[PlotID]['Chart_dataobj'][DataID].cMax;}	
			}else																																					//	\
			{	if (window[PlotID]['Chart_dataobj'][DataID].zMin<window[PlotID]['Props']['zMin']){ window[PlotID]['Props']['zMin']=window[PlotID]['Chart_dataobj'][DataID].zMin;}	
				if (window[PlotID]['Chart_dataobj'][DataID].zMax>window[PlotID]['Props']['zMax']){ window[PlotID]['Props']['zMax']=window[PlotID]['Chart_dataobj'][DataID].zMax;}	
			}																																						//	\
	}	}																																							//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}  																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- SET THE COLORS IN THE SURFACE MAP ------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	Given a dataset ID, this code looks at the available data and recreates the necessary colors. This function is necessary because the worker cannot return object  	\
	prototypes to the main code so we lose that when the data is returned.																								\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
Surface.prototype.setSurfaceColors =function (DataID, callback)																										//	\
{	console.log('Setting Colors');
	var color, point, face, numberOfSides, vertexIndex, colorData={}, dataPoint=0;																					//	\
	var PlotID=this.Format_id;																																		//	\
	window[PlotID].lut = new THREE.Lut( window[PlotID].Props.Legend.colorMap, window[PlotID].Props.Legend.numberOfColors );											//	\
	window[PlotID].lut.setMax( window[PlotID].Props.zMax );		window[PlotID].lut.setMin( window[PlotID].Props.zMin );												//	\
	window[PlotID]['Chart_dataobj'][DataID].lut=new THREE.Lut( window[PlotID]['Chart_dataobj'][DataID]['colorMap'], parseInt(window[PlotID]['Chart_dataobj'][DataID]['numberOfColors']) );	//	\
	if (window[PlotID]['Chart_dataobj'][DataID]['useColorData']==1)																									//	\
	{	window[PlotID]['Chart_dataobj'][DataID].lut.setMax( window[PlotID]['Chart_dataobj'][DataID].cMax );															//	\
		window[PlotID]['Chart_dataobj'][DataID].lut.setMin( window[PlotID]['Chart_dataobj'][DataID].cMin );															//	\
		colorData=window[PlotID]['Chart_dataobj'][DataID].cData;																									//	\
	}else																																							//	\
	{	window[PlotID]['Chart_dataobj'][DataID].lut.setMax( window[PlotID]['Chart_dataobj'][DataID].zMax );															//	\
		window[PlotID]['Chart_dataobj'][DataID].lut.setMin( window[PlotID]['Chart_dataobj'][DataID].zMin );															//	\
		colorData=window[PlotID]['Chart_dataobj'][DataID].zData;																									//	\
	}																																								//	\
	if (window[PlotID].Props.divideColormap===0)																													//	\
	{	console.log('Setting the colormap of '+window[PlotID].Props.Legend.colorMap+' for '+window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.vertices.length+' vertices');
		for ( var i = 0; i < window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.vertices.length; i++ ) 														//	\
		{	var x=Math.floor(i/window[PlotID]['Chart_dataobj'][DataID].xLength);																					//	\
			var y=i%window[PlotID]['Chart_dataobj'][DataID].yLength;																								//	\
			var key=x+'-'+y;																																		//	\
			if (colorData[key]===undefined) { dataPoint=0; }else{ dataPoint=colorData[key]; }																		//	\
			temp = window[PlotID].lut.getColor( dataPoint);																											//	\
			color = new THREE.Color( temp.r, temp.g, temp.b );																										//	\
			color.setRGB(temp.r, temp.g, temp.b);																													//	\
			window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.colors[i]=color;																				//	\
		}																																							//	\
	}else																																							//	\
	{	for ( var i = 0; i < window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.vertices.length; i++ ) 														//	\
		{	var x=Math.floor(i/window[PlotID]['Chart_dataobj'][DataID].xLength);																					//	\
			var y=i%window[PlotID]['Chart_dataobj'][DataID].yLength;																								//	\
			var key=x+'-'+y;																																		//	\
			if (colorData[key]===undefined) { dataPoint=0; }else{ dataPoint=colorData[key]; }																		//	\
			temp = window[PlotID]['Chart_dataobj'][DataID].lut.getColor( dataPoint);																				//	\
			color = new THREE.Color( temp.r, temp.g, temp.b );																										//	\
			color.setRGB(temp.r, temp.g, temp.b);																													//	\
			window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.colors[i]=color;																				//	\
		}																																							//	\
	}																																								//	\
	var faceIndices = [ 'a', 'b', 'c', 'd' ];																														//	\
	for ( var i = 0; i < window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.faces.length; i++ ) 																//	\
	{	face = window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.faces[ i ];																					//	\
		numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;																									//	\
		window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.faceVertexUvs[i]=new Array(); 																		//	\
		for( var j = 0; j < numberOfSides; j++ ) 																													//	\
		{	vertexIndex = face[ faceIndices[ j ] ];																													//	\
        window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.faces[ i ]['vertexColors'][ j ]=window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.colors[vertexIndex];		
		}																																							//	\
	}																																								//	\
	if (window[PlotID]['Chart_dataobj'][DataID]['showLines']==1) { assignUVs(window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry); }							//	\
	window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['colorsNeedUpdate']=true;																			//	\
	window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['elementsNeedUpdate']=true;																			//	\
	window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['groupsNeedUpdate']=true;																			//	\
	window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['verticesNeedUpdate']=true;																			//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
assignUVs = function( geometry )																																	//	\
{	geometry.computeBoundingBox();																																	//	\
    var max     = geometry.boundingBox.max;																															//	\
    var min     = geometry.boundingBox.min;																															//	\
    var offset  = new THREE.Vector2(0 - min.x, 0 - min.y);																											//	\
    var range   = new THREE.Vector2(max.x - min.x, max.y - min.y);																									//	\
    geometry.faceVertexUvs[0] = [];																																	//	\
    var faces = geometry.faces;																																		//	\
    for (i = 0; i < geometry.faces.length ; i++) 																													//	\
	{	var v1 = geometry.vertices[faces[i].a];																														//	\
		var v2 = geometry.vertices[faces[i].b];																														//	\
		var v3 = geometry.vertices[faces[i].c];																														//	\
      geometry.faceVertexUvs[0].push([																																//	\
        new THREE.Vector2( ( v1.x + offset.x ) / range.x , ( v1.y + offset.y ) / range.y ),																			//	\
        new THREE.Vector2( ( v2.x + offset.x ) / range.x , ( v2.y + offset.y ) / range.y ),																			//	\
        new THREE.Vector2( ( v3.x + offset.x ) / range.x , ( v3.y + offset.y ) / range.y )																			//	\
      ]);																																							//	\
    }																																								//	\
    geometry.uvsNeedUpdate = true;																																	//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- TAKE THE DATA, MAKE A MESH, ADD IT TO THE SCENE -----------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.setMeshes =function(DataID, callback)																												//	\
{	console.log('Set Meshes');
	var graphMesh={};																																				//	\
	var PlotID=this.Format_id;																																		//	\
	if (window[PlotID]['Chart_dataobj'][DataID]['type']=="Surface")																									//	\
	{	if (window[PlotID]['Chart_dataobj'][DataID]['sWireFrame']=="Solid")																							//	\
		{	if (window[PlotID]['Chart_dataobj'][DataID]['showLines']==1)																							//	\
			{	var wireTexture = new THREE.ImageUtils.loadTexture( 'http://www.cadwolf.com/Images/square.png' );													//	\
				wireTexture.wrapS = wireTexture.wrapT = THREE.RepeatWrapping; 																						//	\
				wireTexture.repeat.set( parseInt(window[PlotID]['Chart_dataobj'][DataID].xLength), parseInt(window[PlotID]['Chart_dataobj'][DataID].yLength) );		//	\
				wireMaterial = new THREE.MeshBasicMaterial( { map: wireTexture, vertexColors: THREE.VertexColors, side:THREE.DoubleSide } );						//	\
			}else {	wireMaterial = new THREE.MeshBasicMaterial( {vertexColors: THREE.VertexColors, side:THREE.DoubleSide} );  	}									//	\
		}else{	wireMaterial = new THREE.MeshBasicMaterial( {wireframe:true, vertexColors: THREE.VertexColors, side:THREE.DoubleSide } );	}						//	\
		graphMesh = new THREE.Mesh( window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry, wireMaterial );														//	\
		graphMesh.doubleSided = true;																																//	\
	}else if (window[PlotID]['Chart_dataobj'][DataID]['type']=="PointCloud")																						//	\
	{	wireMaterial = new THREE.MeshBasicMaterial( {vertexColors: THREE.VertexColors, side:THREE.DoubleSide } );													//	\
		graphMesh = new THREE.PointCloud( window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry, wireMaterial );													//	\
	}																																								//	\
	graphMesh.id = DataID;																																			//	\
	graphMesh.name = DataID;																																		//	\
	window[PlotID].Scene.add(graphMesh);																															//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- DRAW GRID LINES ON THE CHART -----------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*\
	This function first deletes and then redraws all the planes that the user has added to the chart. Instead of using the built in function for planes, we use			\
	lines and set each vertex independently. I had to do this because the built in planes had cross hatches.															\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
Surface.prototype.makeGrids = function(DataID, callback)																											//	\
{	console.log('Make Grids');
	var PlotID=this.Format_id, material='', geometry='', thiscolor='', i='', start1=0, stop1=10, step1=1, start2=0, stop2=10, step2=1, num=0;						//	\
	var elementsInTheScene = window[PlotID].Scene.children.length;																									//	\
	for ( var i = elementsInTheScene-1; i > 0; i-- ) 																												//	\
	{	if ( window[PlotID].Scene.children[ i ]['name'].match(/^Grid/)) { window[PlotID].Scene.remove ( window[PlotID].Scene.children [ i ] ); } } 					//	\	
	var thiscolor='0x'+window[PlotID]['Chart_dataobj'][DataID]['color'];																							//	\
	var material = new THREE.LineBasicMaterial({	color: thiscolor   	});																							//	\
	var geometry = new THREE.Geometry();																															//	\
	if (window[PlotID]['Chart_dataobj'][DataID]['gridtype']=="XY")																									//	\
	{	start1=window[PlotID]['Chart_dataobj'][DataID]['xstart'];																									//	\
		stop1=window[PlotID]['Chart_dataobj'][DataID]['xstop'];																										//	\
		step1=window[PlotID]['Chart_dataobj'][DataID]['xspacing'];																									//	\
		start2=window[PlotID]['Chart_dataobj'][DataID]['ystart'];																									//	\
		stop2=window[PlotID]['Chart_dataobj'][DataID]['ystop'];																										//	\
		step2=window[PlotID]['Chart_dataobj'][DataID]['yspacing'];																									//	\
		num=window[PlotID]['Chart_dataobj'][DataID]['zoffset'];																										//	\
		for (a=start1; a<=stop1; a=a+parseFloat(step1))																												//	\
		{	geometry.vertices.push(new THREE.Vector3(a, start2, num));																								//	\
			geometry.vertices.push(new THREE.Vector3(a, stop2, num));																								//	\
			geometry.vertices.push(new THREE.Vector3(a, start2, num));																								//	\
		}																																							//	\
		geometry.vertices.push(new THREE.Vector3(start1, start2, num));																								//	\
		for (a=start2; a<=stop2; a=a+parseFloat(step2))																												//	\
		{	geometry.vertices.push(new THREE.Vector3(start1, a, num));																								//	\
			geometry.vertices.push(new THREE.Vector3(stop1, a, num));																								//	\
			geometry.vertices.push(new THREE.Vector3(start1, a, num));																								//	\
		}																																							//	\
	}																																								//	\
	if (window[PlotID]['Chart_dataobj'][DataID]['gridtype']=="YZ")																									//	\
	{	start1=window[PlotID]['Chart_dataobj'][DataID]['ystart'];																									//	\
		stop1=window[PlotID]['Chart_dataobj'][DataID]['ystop'];																										//	\
		step1=window[PlotID]['Chart_dataobj'][DataID]['yspacing'];																									//	\
		start2=window[PlotID]['Chart_dataobj'][DataID]['zstart'];																									//	\
		stop2=window[PlotID]['Chart_dataobj'][DataID]['zstop'];																										//	\
		step2=window[PlotID]['Chart_dataobj'][DataID]['zspacing'];																									//	\
		num=window[PlotID]['Chart_dataobj'][DataID]['xoffset'];																										//	\
		for (a=start1; a<=stop1; a=a+parseFloat(step1))																												//	\
		{	geometry.vertices.push(new THREE.Vector3(num, a, start2));																								//	\
			geometry.vertices.push(new THREE.Vector3(num, a, stop2));																								//	\
			geometry.vertices.push(new THREE.Vector3(num, a, start2));																								//	\
		}																																							//	\
		geometry.vertices.push(new THREE.Vector3(num, start1, start2));																								//	\
		for (a=start2; a<=stop2; a=a+parseFloat(step2))																												//	\
		{	geometry.vertices.push(new THREE.Vector3(num, start1, a));																								//	\
			geometry.vertices.push(new THREE.Vector3(num, stop1, a));																								//	\
			geometry.vertices.push(new THREE.Vector3(num, start1, a));																								//	\
		}																																							//	\
	}																																								//	\
	if (window[PlotID]['Chart_dataobj'][DataID]['gridtype']=="XZ")																									//	\
	{	start1=window[PlotID]['Chart_dataobj'][DataID]['xstart'];																									//	\
		stop1=window[PlotID]['Chart_dataobj'][DataID]['xstop'];																										//	\
		step1=window[PlotID]['Chart_dataobj'][DataID]['xspacing'];																									//	\
		start2=window[PlotID]['Chart_dataobj'][DataID]['zstart'];																									//	\
		stop2=window[PlotID]['Chart_dataobj'][DataID]['zstop'];																										//	\
		step2=window[PlotID]['Chart_dataobj'][DataID]['zspacing'];																									//	\
		num=window[PlotID]['Chart_dataobj'][DataID]['yoffset'];																										//	\
		for (a=start1; a<=stop1; a=a+parseFloat(step1))																												//	\
		{	geometry.vertices.push(new THREE.Vector3(a, num, start2));																								//	\
			geometry.vertices.push(new THREE.Vector3(a, num, stop2));																								//	\
			geometry.vertices.push(new THREE.Vector3(a, num, start2));																								//	\
		}																																							//	\
		geometry.vertices.push(new THREE.Vector3(start1, num, start2));																								//	\
		for (a=start2; a<=stop2; a=a+parseFloat(step2))																												//	\
		{	geometry.vertices.push(new THREE.Vector3(start1, num, a));																								//	\
			geometry.vertices.push(new THREE.Vector3(stop1, num, a));																								//	\
			geometry.vertices.push(new THREE.Vector3(start1, num, a));																								//	\
		}																																							//	\
	}																																								//	\
	var line = new THREE.Line(geometry, material);																													//	\
	line.position.set(window[PlotID]['Chart_dataobj'][DataID].xPosition, window[PlotID]['Chart_dataobj'][DataID].yPosition, window[PlotID]['Chart_dataobj'][DataID].zPosition);	
	line.rotation.set(0.0174532925*window[PlotID]['Chart_dataobj'][DataID].xRotation, 0.0174532925*window[PlotID]['Chart_dataobj'][DataID].yRotation, 0.0174532925*window[PlotID]['Chart_dataobj'][DataID].zRotation);	
	line.name = "Grid"+DataID;																																		//	\
	line.id = "Grid"+DataID;																																		//	\
	this.Scene.add(line);																																			//	\																																							//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
		
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------ DRAW ANY AXES FOR THE PLOT -----------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.makeAxes = function(DataID, callback)																												//	\
{	console.log('Making Axes');
	var start=0, stop=0, interval=0, xoffset=0, yoffset=0, zoffset=0, tickLength=0;																					//	\
	var PlotID = this.Format_id;																																	//	\
	var xoff=0, yoff=0, thiscolor='#'+window[PlotID]['Chart_dataobj'][DataID]['axiscolor'];																			//	\
	window[PlotID].removeItem(DataID);																																//	\
	var material = new THREE.LineBasicMaterial({	color: thiscolor    	});																						//	\
	var geometry = new THREE.Geometry();																															//	\
	start=window[PlotID]['Chart_dataobj'][DataID]['axisstart'];																										//	\
	stop=window[PlotID]['Chart_dataobj'][DataID]['axisstop'];																										//	\
	interval=window[PlotID]['Chart_dataobj'][DataID]['axisinterval'];																								//	\
	xoffset=parseFloat(window[PlotID]['Chart_dataobj'][DataID]['xPosition']);																						//	\
	yoffset=parseFloat(window[PlotID]['Chart_dataobj'][DataID]['yPosition']);																						//	\
	zoffset=parseFloat(window[PlotID]['Chart_dataobj'][DataID]['zPosition']);																						//	\
	tickLength=parseFloat(window[PlotID]['Chart_dataobj'][DataID]['tickLength']);																					//	\
	var xtextoffset=parseFloat(window[PlotID]['Chart_dataobj'][DataID]['xTextOffset']);																				//	\
	var ytextoffset=parseFloat(window[PlotID]['Chart_dataobj'][DataID]['yTextOffset']);																				//	\
	var ztextoffset=parseFloat(window[PlotID]['Chart_dataobj'][DataID]['zTextOffset']);																				//	\
	if (window[PlotID]['Chart_dataobj'][DataID]['axistype']=="X")																									//	\
	{	for (var xloc=start; xloc<=stop; xloc=xloc+interval)																										//	\
		{	geometry.vertices.push(new THREE.Vector3(xloc+xoffset, yoffset, zoffset));																				//	\
			geometry.vertices.push(new THREE.Vector3(xloc+xoffset, yoffset+tickLength, zoffset));																	//	\
			geometry.vertices.push(new THREE.Vector3(xloc+xoffset, yoffset, zoffset));																				//	\
			spritey = makeTextSprite( " " +xloc+ " ", { fontsize: window[PlotID]['Chart_dataobj'][DataID]['axisfontsize'] });										//	\
			spritey.position.x = xloc+xoffset+xtextoffset;																											//	\
			spritey.position.y = yoffset+ytextoffset;																												//	\
			spritey.position.z = zoffset-3+ztextoffset;																												//	\
			spritey.name = DataID;																																	//	\
			this.Scene.add( spritey );																																//	\
		}																																							//	\
	}																																								//	\
	if (window[PlotID]['Chart_dataobj'][DataID]['axistype']=="Y")																									//	\
	{	for (var xloc=start; xloc<=stop; xloc=xloc+interval)																										//	\
		{	geometry.vertices.push(new THREE.Vector3(xoffset, xloc+yoffset, zoffset));																				//	\
			geometry.vertices.push(new THREE.Vector3(xoffset+tickLength, xloc+yoffset, zoffset));																	//	\
			geometry.vertices.push(new THREE.Vector3(xoffset, xloc+yoffset, zoffset));																				//	\
			spritey = makeTextSprite( " " +xloc+ " ", { fontsize: window[PlotID]['Chart_dataobj'][DataID]['axisfontsize']});										//	\
			spritey.position.x = xoffset+xtextoffset;																												//	\
			spritey.position.y = xloc+yoffset+ytextoffset;																											//	\
			spritey.position.z = zoffset-3+ztextoffset;																												//	\
			spritey.name = DataID;																																	//	\
			this.Scene.add( spritey );																																//	\
		}																																							//	\
	}																																								//	\
	if (window[PlotID]['Chart_dataobj'][DataID]['axistype']=="Z")																									//	\
	{	for (var xloc=start; xloc<=stop; xloc=xloc+interval)																										//	\
		{	geometry.vertices.push(new THREE.Vector3(xoffset, yoffset, xloc+zoffset));																				//	\
			geometry.vertices.push(new THREE.Vector3(xoffset, yoffset+tickLength, xloc+zoffset));																	//	\
			geometry.vertices.push(new THREE.Vector3(xoffset, yoffset, xloc+zoffset));																				//	\
			geometry.vertices.push(new THREE.Vector3(xoffset+tickLength, yoffset, xloc+zoffset));																	//	\
			geometry.vertices.push(new THREE.Vector3(xoffset, yoffset, xloc+zoffset));																				//	\
			spritey = makeTextSprite( " " +xloc+ " ",{ fontsize: window[PlotID]['Chart_dataobj'][DataID]['axisfontsize']});											//	\
			spritey.position.x = xoffset+xtextoffset;																												//	\
			spritey.position.y = yoffset+ytextoffset;																												//	\
			spritey.position.z = xloc+zoffset-3+ztextoffset;																										//	\
			spritey.name = DataID;																																	//	\
			this.Scene.add( spritey );																																//	\
		}																																							//	\
	}																																								//	\
	var line = new THREE.Line(geometry, material);																													//	\
	line.name = DataID;																																				//	\
	line.id = DataID;																																				//	\
	this.Scene.add(line);																																			//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------- FUNCTION FOR MAKING TEXT SPRITES ------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function makeTextSprite( message, parameters )																														//	\
{																																									//	\
    if ( parameters === undefined ) parameters = {};																												//	\
    var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";																		//	\
    var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;																				//	\
    var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 0;															//	\
    var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:255, g:255, b:255, a:1.0 };											//	\
    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };								//	\
    var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };														//	\
																																									//	\
    var canvas = document.createElement('canvas');																													//	\
    var context = canvas.getContext('2d');																															//	\
    context.font = "Bold " + fontsize + "px " + fontface;																											//	\
    var metrics = context.measureText( message );																													//	\
    var textWidth = metrics.width;																																	//	\
																																									//	\
    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";							//	\
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";											//	\
																																									//	\
    context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";																				//	\
    context.fillText( message, borderThickness, fontsize + borderThickness);																						//	\
																																									//	\
    var texture = new THREE.Texture(canvas) 																														//	\
    texture.needsUpdate = true;																																		//	\
																																									//	\
    var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );																	//	\
    var sprite = new THREE.Sprite( spriteMaterial );																												//	\
    sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);																								//	\
    return sprite;  																																				//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------- FUNCTION FOR DRAWING ROUNDED RECTANGLES -----------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function roundRect(ctx, x, y, w, h, r) 																																//	\
{	ctx.beginPath();																																				//	\
	ctx.moveTo(x+r, y);																																				//	\
	ctx.lineTo(x+w-r, y);																																			//	\
	ctx.quadraticCurveTo(x+w, y, x+w, y+r);																															//	\
	ctx.lineTo(x+w, y+h-r);																																			//	\
	ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);																														//	\
	ctx.lineTo(x+r, y+h);																																			//	\
	ctx.quadraticCurveTo(x, y+h, x, y+h-r);																															//	\
	ctx.lineTo(x, y+r);																																				//	\
	ctx.quadraticCurveTo(x, y, x+r, y);																																//	\
	ctx.closePath();																																				//	\
	ctx.fill();																																						//	\
	ctx.stroke();   																																				//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------- SET THE COLORS IN THE TUBE ----------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This code sets the colors for a tube's vertices and faces. It does this by looking at the points already calculated by the worker algorithm.						\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
Surface.prototype.setLineColors =function (DataID, callback)																										//	\
{	console.log('Setting Line '+DataID);
	var color, point, face, numberOfSides, vertexIndex=[]; lineData=[];																								//	\
	var faceIndices = [ 'a', 'b', 'c', 'd' ];																														//	\
	var PlotID=this.Format_id;																																		//	\
	$('.plot_errorblock').html('');																																	//	\
	if ((parseInt(window[PlotID]['Chart_dataobj'][DataID].xLength)!=1))																								//	\
	{	$('.plot_errorblock').html('Lines must have one row. The data sent had '+window[PlotID]['Chart_dataobj'][DataID].xLength+' rows and '+window[PlotID]['Chart_dataobj'][DataID].yLength+' columns');
	}																																								//	\
	window[PlotID]['Props']['xMax']=-999999999;		window[PlotID]['Props']['xMin']=999999999;																		//	\
	window[PlotID]['Props']['yMax']=-999999999;		window[PlotID]['Props']['yMin']=999999999;																		//	\
	window[PlotID]['Props']['zMax']=-999999999;		window[PlotID]['Props']['zMin']=999999999;																		//	\
	for (var thisDataID in window[PlotID]['Chart_dataobj'])																											//	\
	{	if ((window[PlotID]['Chart_dataobj'][thisDataID]['type']=="Line")||(window[PlotID]['Chart_dataobj'][thisDataID]['type']=="Surface")||(window[PlotID]['Chart_dataobj'][thisDataID]['type']=="PointCloud"))						//	\
		{	if (window[PlotID]['Chart_dataobj'][thisDataID].xMin<window[PlotID]['Props']['xMin']){ window[PlotID]['Props']['xMin']=window[PlotID]['Chart_dataobj'][thisDataID].xMin;}	
			if (window[PlotID]['Chart_dataobj'][thisDataID].xMax>window[PlotID]['Props']['xMax']){ window[PlotID]['Props']['xMax']=window[PlotID]['Chart_dataobj'][thisDataID].xMax;}	
			if (window[PlotID]['Chart_dataobj'][thisDataID].yMin<window[PlotID]['Props']['yMin']){ window[PlotID]['Props']['yMin']=window[PlotID]['Chart_dataobj'][thisDataID].yMin;}	
			if (window[PlotID]['Chart_dataobj'][thisDataID].yMax>window[PlotID]['Props']['yMax']){ window[PlotID]['Props']['yMax']=window[PlotID]['Chart_dataobj'][thisDataID].yMax;}	
			if (window[PlotID]['Chart_dataobj'][thisDataID]['useColorData']==1)																						//	\
			{	if (window[PlotID]['Chart_dataobj'][thisDataID].cMin<window[PlotID]['Props']['zMin']){ window[PlotID]['Props']['zMin']=window[PlotID]['Chart_dataobj'][thisDataID].cMin;}	
				if (window[PlotID]['Chart_dataobj'][thisDataID].cMax>window[PlotID]['Props']['zMax']){ window[PlotID]['Props']['zMax']=window[PlotID]['Chart_dataobj'][thisDataID].cMax;}	
			}else																																					//	\
			{	if (window[PlotID]['Chart_dataobj'][thisDataID].zMin<window[PlotID]['Props']['zMin']){ window[PlotID]['Props']['zMin']=window[PlotID]['Chart_dataobj'][thisDataID].zMin;}	
				if (window[PlotID]['Chart_dataobj'][thisDataID].zMax>window[PlotID]['Props']['zMax']){ window[PlotID]['Props']['zMax']=window[PlotID]['Chart_dataobj'][thisDataID].zMax;}	
			}																																						//	\
	}	}																																							//	\
	window[PlotID]['Chart_dataobj'][DataID].lineData=[];																											//	\
	xoff=window[PlotID]['Chart_dataobj'][DataID].xoffset;																											//	\
	yoff=window[PlotID]['Chart_dataobj'][DataID].yoffset;																											//	\
	zoff=window[PlotID]['Chart_dataobj'][DataID].zoffset;																											//	\
	for (var a=0; a<window[PlotID]['Chart_dataobj'][DataID]['lineGeometry']['points'].length; a++)																	//	\
	{	if (window[PlotID]['Chart_dataobj'][DataID]['lineGeometry']['points'][a]['x']===undefined){ xVal=a+parseFloat(window[PlotID]['Chart_dataobj'][DataID]['xoffset']); 		//	\
		}else { xVal=parseFloat(window[PlotID]['Chart_dataobj'][DataID]['lineGeometry']['points'][a]['x'])+parseFloat(window[PlotID]['Chart_dataobj'][DataID]['xoffset']); }	//	\
		if (window[PlotID]['Chart_dataobj'][DataID]['lineGeometry']['points'][a]['y']===undefined){ yVal=a+parseFloat(window[PlotID]['Chart_dataobj'][DataID]['yoffset']); 		//	\
		}else { yVal=parseFloat(window[PlotID]['Chart_dataobj'][DataID]['lineGeometry']['points'][a]['y'])+parseFloat(window[PlotID]['Chart_dataobj'][DataID]['yoffset']); }	//	\
		if (window[PlotID]['Chart_dataobj'][DataID]['flat']==1)																										//	\
		{		zVal=parseFloat(window[PlotID]['Chart_dataobj'][DataID]['zoffset']); 																				//	\
		}else {	zVal=parseFloat(window[PlotID]['Chart_dataobj'][DataID]['lineGeometry']['points'][a]['z'])+parseFloat(window[PlotID]['Chart_dataobj'][DataID]['zoffset']); 	}	//	\
		window[PlotID]['Chart_dataobj'][DataID].lineData.push(new THREE.Vector3(xVal, yVal, zVal));																	//	\
	}																																								//	\
	if (window[PlotID]['Chart_dataobj'][DataID]['type']=="Line")																									//	\
	{	segments=window[PlotID]['Chart_dataobj'][DataID]['lineGeometry']['points'].length-1;																		//	\
		tubeRadius=parseInt(window[PlotID]['Chart_dataobj'][DataID].lineRadius);																					//	\
		radiusSegments=parseInt(window[PlotID]['Chart_dataobj'][DataID].lineRadSegs);																				//	\
		window[PlotID]['Chart_dataobj'][DataID].linePoints=new THREE.SplineCurve3(window[PlotID]['Chart_dataobj'][DataID].lineData);								//	\
		window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry'] = new THREE.TubeGeometry(window[PlotID]['Chart_dataobj'][DataID].linePoints, segments, tubeRadius, radiusSegments, false, false);	
		window[PlotID]['Chart_dataobj'][DataID].lut=new THREE.Lut( window[PlotID]['Chart_dataobj'][DataID]['colorMap'], parseInt(window[PlotID]['Chart_dataobj'][DataID]['numberOfColors']) );		
		if (window[PlotID].Props.divideColormap===0)																												//	\
		{	window[PlotID].lut = new THREE.Lut( window[PlotID].Props.Legend.colorMap, window[PlotID].Props.Legend.numberOfColors );									//	\
			window[PlotID].lut.setMax( window[PlotID].Props.zMax );		window[PlotID].lut.setMin( window[PlotID].Props.zMin );										//	\
			if (window[PlotID]['Chart_dataobj'][DataID]['useColorData']==1)																							//	\
			{		colorData=window[PlotID]['Chart_dataobj'][DataID].cData;																						//	\
			}else{	colorData=window[PlotID]['Chart_dataobj'][DataID]['lineGeometry']['points']; }																	//	\
			for ( var seg = 0; seg < window[PlotID]['Chart_dataobj'][DataID]['lineGeometry']['points'].length; seg=seg+1 ) 											//	\
			{	for ( var rad = 0; rad < window[PlotID]['Chart_dataobj'][DataID].lineRadSegs; rad=rad+1 ) 															//	\
				{	vertexIndex = rad + seg * radiusSegments;																										//	\
//					temp = window[PlotID].lut.getColor( window[PlotID]['Chart_dataobj'][DataID]['lineGeometry']['points'][seg]['z']);								//	\
					if (window[PlotID]['Chart_dataobj'][DataID]['useColorData']==0){temp=window[PlotID].lut.getColor( colorData[seg]['z']);							//	\
					}else {											key='0-'+seg;	temp=window[PlotID].lut.getColor( colorData[key]); 	}							//	\
					color = new THREE.Color( temp.r, temp.g, temp.b );																								//	\
					color.setRGB(temp.r, temp.g, temp.b);																											//	\
					window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.colors[vertexIndex] = color; 															//	\
			}	}																																					//	\
		}else																																						//	\
		{	window[PlotID]['Chart_dataobj'][DataID].lut = new THREE.Lut( window[PlotID].Props.Legend.colorMap, window[PlotID].Props.Legend.numberOfColors );		//	\
			if (window[PlotID]['Chart_dataobj'][DataID]['useColorData']==1)																							//	\
			{	window[PlotID]['Chart_dataobj'][DataID].lut.setMax( window[PlotID]['Chart_dataobj'][DataID].cMax );													//	\
				window[PlotID]['Chart_dataobj'][DataID].lut.setMin( window[PlotID]['Chart_dataobj'][DataID].cMin );													//	\
				colorData=window[PlotID]['Chart_dataobj'][DataID].cData;																							//	\
			}else																																					//	\
			{	window[PlotID]['Chart_dataobj'][DataID].lut.setMax( window[PlotID]['Chart_dataobj'][DataID].zMax );													//	\
				window[PlotID]['Chart_dataobj'][DataID].lut.setMin( window[PlotID]['Chart_dataobj'][DataID].zMin );													//	\
				colorData=window[PlotID]['Chart_dataobj'][DataID]['lineGeometry']['points'];																		//	\
			}																																						//	\
			for ( var seg = 0; seg < window[PlotID]['Chart_dataobj'][DataID]['lineGeometry']['points'].length; seg=seg+1 ) 											//	\
			{	for ( var rad = 0; rad < window[PlotID]['Chart_dataobj'][DataID].lineRadSegs; rad=rad+1 ) 															//	\
				{	vertexIndex = rad + seg * radiusSegments;																										//	\
					if (window[PlotID]['Chart_dataobj'][DataID]['useColorData']==0){temp=window[PlotID]['Chart_dataobj'][DataID].lut.getColor( colorData[seg]['z']);//	\
					}else {														temp=window[PlotID]['Chart_dataobj'][DataID].lut.getColor( colorData['0-'+seg]);}	//	\
					color = new THREE.Color( temp.r, temp.g, temp.b );																								//	\
					color.setRGB(temp.r, temp.g, temp.b);																											//	\
					window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.colors[vertexIndex] = color; 															//	\
		}	}	}																																					//	\
		for ( var i = 0; i < window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.faces.length; i=i+1 ) 															//	\
		{	face = window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.faces[ i ];																				//	\
			numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;																								//	\
			for( var j = 0; j < numberOfSides; j=j+1 ) 																												//	\
			{	vertexIndex = face[ faceIndices[ j ] ];																												//	\
				face.vertexColors[ j ] = window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.colors[ vertexIndex ];												//	\
				window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.faces[ i ]['vertexColors'][ j ] = window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry.colors[ vertexIndex ];	
			}																																						//	\
		}																																							//	\
		window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['colorsNeedUpdate']=true;																		//	\
		window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['elementsNeedUpdate']=true;																		//	\
		window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['groupsNeedUpdate']=true;																		//	\
		window[PlotID]['Chart_dataobj'][DataID]['surfaceGeometry']['verticesNeedUpdate']=true;																		//	\
		wireMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide } );													//	\
		graphMesh = new THREE.Mesh( window[PlotID]['Chart_dataobj'][DataID].surfaceGeometry, wireMaterial );														//	\
		graphMesh.name = DataID;																																	//	\
		graphMesh.id = DataID;																																		//	\
		window[PlotID].Scene.add(graphMesh);																														//	\
	}																																								//	\	
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------ FORMAT DATA FOR LATHE FUNCTION -------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
Surface.prototype.formatLatheData = function (DataID, callback)																										//	\
{	console.log('Formatting Lathe Data for '+DataID);
	var key='';																																						//	\
	var PlotID=this.Format_id;																																		//	\
	window[PlotID]['Chart_dataobj'][DataID]['curve']=[];																											//	\
	var xsize = Object.keys(window[PlotID]['Chart_dataobj'][DataID]['xData']).length;																				//	\
	var ysize = Object.keys(window[PlotID]['Chart_dataobj'][DataID]['yData']).length;																				//	\
	if (xsize>ysize) { var size=xsize; }else { var size=ysize; }																									//	\
	for ( var i=0; i<size; i++ ) 																																	//	\
	{	key='0-'+i; 																																				//	\
		if (window[PlotID]['Chart_dataobj'][DataID]['xData'][key]===undefined){ xVal=i; }else{ xVal=window[PlotID]['Chart_dataobj'][DataID]['xData'][key]; } 		//	\
		if (window[PlotID]['Chart_dataobj'][DataID]['yData'][key]===undefined){ yVal=0; }else{ yVal=window[PlotID]['Chart_dataobj'][DataID]['yData'][key]; } 		//	\
		window[PlotID]['Chart_dataobj'][DataID]['curve'].push(new THREE.Vector3(xVal, 0, yVal));																	//	\
	}																																								//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- DELETE AND THEN CREATE A CUBE BASED ON INPUTS --------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.createShape = function(thisShape, DataID, toRender, callback)																						//	\
{	console.log('Creating a '+thisShape);
	var PlotID=this.Format_id, ps=0, pl=0, ts=0, pl=0;																												//	\
	var thisData=window[PlotID]['Chart_dataobj'][DataID];																											//	\
	window[PlotID].removeItem(DataID);																																//	\
	var thiscolor='#'+thisData['color'].replace(/^\#/,'');																											//	\
	var thiswirecolor='#'+thisData['wirecolor'].replace(/^\#/,'');																									//	\
	var darkMaterial = new THREE.MeshBasicMaterial( { color: thiscolor } );																							//	\
	if (window[PlotID]['Chart_dataobj'][DataID]['wireFrame']=="Wireframe")																							//	\
	{	var wireframeMaterial = new THREE.MeshBasicMaterial( { color: thiswirecolor, wireframe: true, transparent: true } ); 										//	\
	}else																																							//	\
	{	var wireframeMaterial = new THREE.MeshBasicMaterial( { color: thiscolor, wireframe: false, transparent: true } ); 	}										//	\
	var multiMaterial = [ darkMaterial, wireframeMaterial ]; 																										//	\
	ps=parseFloat(Big(0.0174532925).times(Big(thisData.phistart)));																									//	\
	pl=parseFloat(Big(0.0174532925).times(Big(thisData.philength)));																								//	\
	ts=parseFloat(Big(0.0174532925).times(Big(thisData.thetastart)));																								//	\
	tl=parseFloat(Big(0.0174532925).times(Big(thisData.thetalength)));																								//	\
	arc=parseFloat(Big(0.0174532925).times(Big(thisData.arc)));																										//	\
	if (thisShape=="Cube")																																			//	\
	{	var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.BoxGeometry(thisData.width, thisData.height, thisData.depth, thisData.widthsegs, thisData.heightsegs, thisData.depthsegs), multiMaterial );}	
	if (thisShape=="Sphere")																																		//	\
	{	var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.SphereGeometry(thisData.radius, thisData.widthsegs, thisData.heightsegs, ps, pl, ts, tl), multiMaterial );}	
	if (thisShape=="Cylinder")																																		//	\
	{	var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.CylinderGeometry(thisData.topradius, thisData.botradius, thisData.height, thisData.radsegs, thisData.heightsegs, thisData.openended, ts, tl), multiMaterial );}	
	if (thisShape=="Dodecahedron")																																	//	\
	{	var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.DodecahedronGeometry(thisData.radius, thisData.detail), multiMaterial );}					//	\
	if (thisShape=="Tetrahedron")																																	//	\
	{	var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.TetrahedronGeometry(thisData.radius, thisData.detail), multiMaterial );}					//	\
	if (thisShape=="Octahedron")																																	//	\
	{	var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.OctahedronGeometry(thisData.radius, thisData.detail), multiMaterial );}					//	\
	if (thisShape=="Icosahedron")																																	//	\
	{	var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.IcosahedronGeometry(thisData.radius, thisData.detail), multiMaterial );}					//	\
	if (thisShape=="Torus")																																			//	\
	{	var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.TorusGeometry(thisData.radius, thisData.tubediameter, thisData.radsegs, thisData.tubesegs, arc), multiMaterial );}					//	\
	if (thisShape=="Plane")																																			//	\
	{	var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.PlaneGeometry(thisData.width, thisData.height, thisData.widthsegs, thisData.heightsegs), multiMaterial );}					//	\
	if (thisShape=="Lathe")																																			//	\
	{	var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.LatheGeometry(thisData.curve, thisData.radsegs, ps, pl), multiMaterial );}				//	\
	if (thisShape=="Arrow")																																			//	\
	{	var direct = new THREE.Vector3( parseFloat(thisData.xDir), parseFloat(thisData.yDir), parseFloat(thisData.zDir) );											//	\
		var orig = new THREE.Vector3( parseFloat(thisData.xPosition), parseFloat(thisData.yPosition), parseFloat(thisData.zPosition) );								//	\
		var shape = new THREE.ArrowHelper(direct, orig, thisData.length, '#'+thisData.color, thisData.aHeight, thisData.aWidth );  }								//	\
	shape.name=DataID;																																				//	\
	shape.position.set(thisData.xPosition, thisData.yPosition, thisData.zPosition);																					//	\
	shape.rotation.set(0.0174532925*thisData.xRotation, 0.0174532925*thisData.yRotation, 0.0174532925*thisData.zRotation);											//	\
	window[PlotID].Scene.add(shape);																																//	\
	if (toRender==1) { window[PlotID].Render(PlotID); }																												//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------- RENDER THE SURFACE MAP -------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.Render = function () 																																//	\
{	cancel_animate();																																				//	\
	var PlotID=this.Format_id;	CPLOT=PlotID;																														//	\
	console.log('Rendering '+PlotID);
	window[PlotID].Renderer.setClearColor( 0xFFFFFF, 1 );																											//	\
	var vec=new THREE.Vector3(window[PlotID].Scene.position.x, window[PlotID].Scene.position.y, window[PlotID].Scene.position.z );									//	\
	window[PlotID].Camera.lookAt( vec );																															//	\
	window[PlotID].Camera.rotation.x=window[PlotID].Props.xRot;																										//	\
	window[PlotID].Camera.rotation.y=window[PlotID].Props.yRot;																										//	\
	window[PlotID].Camera.rotation.z=window[PlotID].Props.zRot;																										//	\
	window[PlotID].Camera.up = new THREE.Vector3( 0, 0, 1 );																										//	\
	Legend.Renderer.setClearColor( 0xFFFFFF, 1 );																													//	\
	Legend.Camera.up = new THREE.Vector3( 0, 0, 1 );																												//	\
	window[PlotID].Renderer.render( window[PlotID].Scene, window[PlotID].Camera ); window[PlotID].Controls.update();												//	\
	Legend.Renderer.render( Legend.Scene, Legend.Camera ); Legend.Controls.update();																				//	\
	animate();																																						//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------- REDRAW AN IMAGE OR A DATASET ----------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.reDraw = function (callback) 																														//	\
{	cancel_animate();																																				//	\
	if (window[PlotID].Props.divideColormap==0)																														//	\
	{	for (var DataID in window[PlotID]['Chart_dataobj'])																											//	\
		{	if ((window[PlotID]['Chart_dataobj'][DataID]['type']=="Surface")||(window[PlotID]['Chart_dataobj'][DataID]['type']=="PointCloud"))						//	\
			{	window[PlotID].removeItem(DataID, 																													//	\
					function() { window[PlotID].setPlotExtremes(DataID, 																							//	\
					function() {window[PlotID].setSurfaceColors( DataID,																							//	\
					function(){window[PlotID].setMeshes( DataID, 																									//	\
					function(){window[PlotID].setPositions(  																										//	\
					function(){window[PlotID].setLegend(		 																									//	\
					function(){window[PlotID].Render( PlotID )} )} )} )} )} )} );																					//	\
			}else if (window[PlotID]['Chart_dataobj'][DataID]['type']=="Line")																						//	\
			{	window[PlotID].removeItem(DataID, 																													//	\
					function() {window[PlotID].setLineColors( DataID,																								//	\
					function(){window[PlotID].setMeshes( DataID, 																									//	\
					function(){window[PlotID].setPositions(  																										//	\
					function(){window[PlotID].setLegend(		 																									//	\
					function(){window[PlotID].Render( PlotID )} )} )} )} )} );	}																					//	\
		}																																							//	\
	}else																																							//	\
	{	if ((window[PlotID]['Chart_dataobj'][DataID]['type']=="Surface")||(window[PlotID]['Chart_dataobj'][DataID]['type']=="PointCloud"))							//	\
		{	window[PlotID].removeItem(DataID, 																														//	\
				function() {window[PlotID].setSurfaceColors( DataID,																								//	\
				function(){window[PlotID].setMeshes( DataID, 																										//	\
				function(){window[PlotID].setPositions(  																											//	\
				function(){window[PlotID].setLegend( 																												//	\
				function(){window[PlotID].Render( PlotID )} )} )} )} )} );																							//	\
		}else if (window[PlotID]['Chart_dataobj'][DataID]['type']=="Line")																							//	\
		{	window[PlotID].removeItem(DataID, 																														//	\
				function() {window[PlotID].setLineColors( DataID,																									//	\
				function(){window[PlotID].setMeshes( DataID, 																										//	\
				function(){window[PlotID].setPositions(  																											//	\
				function(){window[PlotID].setLegend( 																												//	\
				function(){window[PlotID].Render( PlotID )} )} )} )} )} ); }																						//	\			
	}																																								//	\
};																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- SET THE LEGEND IN THE SURFACE MAP ------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.setLegend = function(callback)																													//	\
{	console.log('Set Legend');
	var PlotID=this.Format_id, legendID='Legend'+this.Format_id;																									//	\
	if(this.Props.Legend.showhide=="show"){ $('#'+PlotID).find('.Legend_Wrapper').show(); }																			//	\
	$('#'+PlotID).find('.Legend_Wrapper').remove();																													//	\
	$('#'+PlotID).append('<div class="Legend_Wrapper"><div class="Legend" id="'+legendID+'"></div><div class="Legend_Ticks"></div></div>');							//	\
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
	Legend.Renderer.setClearColor( 0xFFFFFF, 1 );																													//	\
	var container = document.getElementById( legendID );																											//	\
	container.appendChild( Legend.Renderer.domElement );																											//	\
	Legend.Controls = new THREE.TrackballControls( Legend.Camera, Legend.Renderer.domElement );																		//	\
	if (window[PlotID].Props.divideColormap===0)																													//	\
	{	window[PlotID].lut = new THREE.Lut( window[PlotID].Props.Legend.colorMap, window[PlotID].Props.Legend.numberOfColors );										//	\
		window[PlotID].lut.setMax( window[PlotID].Props.zMax );																										//	\
		window[PlotID].lut.setMin( window[PlotID].Props.zMin );																										//	\
		legend = window[PlotID].lut.setLegendOn( { 'layout':'horizontal', 'position': { 'x': 0, 'y': 0, 'z': 0 } , 'dimensions': {'width':0.3, 'height':14} } );	//	\
		Legend.Scene.add ( legend );																																//	\
		var labels = window[PlotID].lut.setLegendLabels( { 'ticks': window[PlotID].Props.Legend.numTicks } );														//	\
		Legend.Scene.add ( labels['title'] );																														//	\
		for ( var i = 0; i < Object.keys( labels[ 'ticks' ] ).length; i++ ) 																						//	\
		{	 Legend.Scene.add ( labels[ 'lines' ][ i ] );}																											//	\
		$('#'+PlotID).find('.Legend_Ticks').empty();																												//	\
		var width=parseInt(800/window[PlotID].Props.Legend.numTicks, 10);																							//	\
		for ( var i = 0; i < window[PlotID].Props.Legend.numTicks; i++ ) 																							//	\
		{	if (window[PlotID].Props.divideColormap===0)																											//	\
			{	var number=window[PlotID].Props.zMin+i*(window[PlotID].Props.zMax-window[PlotID].Props.zMin)/(window[PlotID].Props.Legend.numTicks-1); 				//	\
			}else { var DataID=window[PlotID].Props.Legend.show;																									//	\
					var number=window[PlotID]['Chart_dataobj'][DataID].zMin+i*(window[PlotID]['Chart_dataobj'][DataID].zMax-window[PlotID]['Chart_dataobj'][DataID].zMin)/(window[PlotID].Props.Legend.numTicks-1); }
			$('#'+PlotID).find('.Legend_Ticks').append('<div class="Legend_Tick">'+Math.round(10000*number)/10000+'</div>');										//	\
		}																																							//	\
		$('#'+PlotID).find('.Legend_Tick').css('width',width);																										//	\
	}else																																							//	\	
	{	for (var DataID in window[PlotID]['Chart_dataobj'])																											//	\
		{	var cm=window[PlotID]['Chart_dataobj'][DataID].colorMap;																								//	\
			window[PlotID]['Chart_dataobj'][DataID].lut = new THREE.Lut( cm, window[PlotID]['Chart_dataobj'][DataID].numberOfColors );								//	\
			window[PlotID]['Chart_dataobj'][DataID].lut.setMax( window[PlotID]['Chart_dataobj'][DataID].zMax );														//	\
			window[PlotID]['Chart_dataobj'][DataID].lut.setMin( window[PlotID]['Chart_dataobj'][DataID].zMin );														//	\
		}																																							//	\	
	}																																								//	\	
	if(this.Props.Legend.showhide=="hide"){ $('#'+PlotID).find('.Legend_Wrapper').hide(); }																			//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- SET THE POSITIONS IN THE SURFACE MAP ---------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.setPositions = function(callback)																													//	\
{	console.log('Set Positions');
	var PlotID=this.Format_id;																																		//	\
	if ((this.Props.xCamPos==0)||(this.Props.xCamPos==-199999999998)){ this.Props.xCamPos=this.Props.xMax*2;	}													//	\
	if ((this.Props.yCamPos==0)||(this.Props.yCamPos==-199999999998)){ this.Props.yCamPos=this.Props.yMax*2;	}													//	\
	if ((this.Props.zCamPos==0)||(this.Props.zCamPos==-199999999998)){ this.Props.zCamPos=this.Props.zMax*2;	}													//	\
	this.Camera.position.x=this.Props.xCamPos;		this.Camera.position.y=this.Props.yCamPos;	this.Camera.position.z=this.Props.zCamPos;							//	\
	this.Scene.up={};	this.Scene.up.x=0;	this.Scene.up.y=0;	this.Scene.up.z=1;																					//	\
	this.Camera.position.set( this.Props.xCamPos, this.Props.yCamPos, this.Props.zCamPos );																			//	\
	window[PlotID].Controls.target.set( window[PlotID].Props.xPos, window[PlotID].Props.yPos, window[PlotID].Props.zPos );											//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function animate(){ APLOT=requestAnimationFrame( animate ); window[CPLOT].Renderer.render( window[CPLOT].Scene, window[CPLOT].Camera ); window[CPLOT].Controls.update(); }//	\
function cancel_animate() { if ((typeof(APLOT)!==undefined)&&(window[CPLOT]!==undefined)) {	 cancelAnimationFrame( APLOT ); } }										//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------- EXPAND THE SURFACE TO NEW TAB ---------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('click', '.expandsurface', function(event) {																											//	\ 
	var plotid=$(this).closest('.icon_holder').siblings('.plot_block').attr('id');																					//	\
	window.open("http://www.cadwolf.com/Surfaces/"+plotid);																											//	\
});																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//




/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------- END OF 3D ITEMS ------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
		SetCurrentItem("equation", id); 		  }																													//	\
	if ($(this).children().hasClass('subequationblock')) 																											//	\
	{ 	var id=$(this).children('.subequationblock').attr('id');																									//	\
		SetCurrentItem("equation", id);   }																															//	\
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
			$("#plot_spec").attr('plotid', id);																												//	\
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
	$(document).on('click', '#show_file, #show_fileText', function()	{		$('.bodymain').hide();	$('#PropertyBody').show(); ShowMenu(0); 	});				//	\
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
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------- END OF IMAGES -----------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------- VIDEOS --------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------- THE VIDEO OBJECT ----------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
function Video (id) 																																		//	\
{ 																																							//	\
	this.Format_id=id;																																		// 	\
	this.videoID='';																																		// 	\
	this.videoStart='';																																		// 	\
	this.videoStop='';																																		// 	\
	this.videoHeight=400;																																	// 	\
	this.videoWidth=500;																																	// 	\
	this.videoSource='Youtube';																																// 	\
	this.autohide=2;																																		// 	\
	this.autoplay=0;																																		// 	\
	this.loop=0;																																			// 	\
	this.related=0;																																			// 	\
	this.showinfo=1;																																		// 	\
	this.disablekb=0;																																		// 	\
	this.controls=1;																																		// 	\
	this.color="red";																																		// 	\
	this.modestbranding=0;																																	// 	\
	this.theme="dark";																																		// 	\
}																																							//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- FUNCTION TO SHOW VIDEO DATA ------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
function PopulateVideoProps(id)																																//	\
{	$('#video_id').val(window[id]['videoID']);																												//	\
	$('#video_start').val(window[id]['videoStart']);																										//	\
	$('#video_stop').val(window[id]['videoStop']);																											//	\
	$('#video_height').val(window[id]['videoHeight']);																										//	\
	$('#video_width').val(window[id]['videoWidth']);																										//	\
}																																							//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------- UPDATE A VIDEO AFTER EDIT -------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
/*	Whenever a property for a video is updated, the thumbnail of the video is replaced with an image. It has an event associated with it that replaces it with//
	a video when clicked.																																	  // 
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function updateVideo(videoID)																																//	\
{	var p = document.createElement("div");																													//	\
	p.innerHTML = '<img class="youtube-thumb" src="//i.ytimg.com/vi/' + window[videoID]['videoID'] + '/hqdefault.jpg" height="'+window[videoID]['videoHeight']+'px" width="'+window[videoID]['videoWidth']+'px">';		//	\
	$('#'+videoID).html(p);																																	//	\
	UpdateItem("video", videoID);																															//	\
}																																							//	\
$(document).on("click", ".youtube-thumb", function(event) 																									//	\
{	var videoID=$(this).closest('.video_block').attr('id');																									//	\
	console.log('Here with '+videoID);
	var iframe = document.createElement("iframe");																											//	\
    iframe.setAttribute("src", "//www.youtube.com/embed/"+window[videoID]['videoID']+"?autoplay=1&autohide=2&border=0&wmode=opaque&height="+window[videoID]['videoHeight']+"&width="+window[videoID]['videoWidth']);
    iframe.setAttribute("frameborder", "0");																												//	\
    iframe.setAttribute("id", "youtube-iframe");																											//	\
	$('#'+videoID).html(iframe);																															//	\
	$('#'+videoID).css("height",window[videoID]['videoHeight']).css("width",window[videoID]['videoWidth']);													//	\
//    this.parentNode.replaceChild(iframe, this);																											//	\
});																																							//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------ END OF VIDEOS ----------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- CONTROLLING THE LOGIN BOX STUFF ------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
	$(document).on("click", '#login_drop', function(event){	$("#dropbox").toggle();  }); 																	//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------------------//


} );