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
$(document).ready(function(){ 																													//	\
	CADWOLF = new Surface('PlotID');																											//	\
	var temp=JSON.parse($('#SurfaceInfo').html());																								//	\
	for (var prop in temp) {CADWOLF[prop]=temp[prop]; }																							//	\
//	$('body').append('<div id="Legend_Wrapper"><div id="Legend"></div><div id="Legend_Ticks"></div></div>');									//	\
	CADWOLF.Props.screen_width=window.innerWidth;																								//	\
	CADWOLF.Props.screen_height=window.innerHeight;																								//	\
	CADWOLF.Initialize(2);																														//	\
	CADWOLF.Camera.position.x=CADWOLF.Props['xCamPos'];																							//	\
	CADWOLF.Camera.position.y=CADWOLF.Props['yCamPos'];																							//	\
	CADWOLF.Camera.position.z=CADWOLF.Props['zCamPos'];																							//	\
	CADWOLF.Camera.rotation.x=CADWOLF.Props['xRot'];																							//	\
	CADWOLF.Camera.rotation.y=CADWOLF.Props['yRot'];																							//	\
	CADWOLF.Camera.rotation.z=CADWOLF.Props['zRot'];																							//	\
	CADWOLF.Camera.position.set( CADWOLF.Props.xCamPos, CADWOLF.Props.yCamPos, CADWOLF.Props.zCamPos );											//	\
	CADWOLF.Camera.up = new THREE.Vector3( 0, 0, 1 );																							//	\
	CADWOLF.Camera.lookAt(CADWOLF.Scene.position);																								//	\
	PlotID='';		var counter=0;																												//	\
	for (var DataID in CADWOLF['Chart_dataobj'])																								//	\
	{	if (CADWOLF['Chart_dataobj'][DataID]['Format_name']=='')																				//	\
		{	$('#surface_dataselect').append($("<option></option>").attr("value",DataID).text('Data Set '+counter));								//	\
		}else{$('#surface_dataselect').append($("<option></option>").attr("value",DataID).text(CADWOLF['Chart_dataobj'][DataID]['Format_name']));//	\
		}																																		//	\
		counter=parseInt(counter)+1;																											//	\
		if ((CADWOLF['Chart_dataobj'][DataID]['type']=="Surface")||(CADWOLF['Chart_dataobj'][DataID]['type']=="PointCloud"))					//	\
		{	CADWOLF.setSurfaceVertices(DataID, 																									//	\
				function(){CADWOLF.setSurfaceColors(DataID, 																					//	\
				function(){CADWOLF.setMeshes(DataID,																							//	\
				function(){CADWOLF.setPositions() })} )} );																						//	\
		}else if (CADWOLF['Chart_dataobj'][DataID]['type']=="Line") 																			//	\
		{	CADWOLF.removeItem(DataID, 																											//	\
				function(){CADWOLF.setLineColors( DataID, 																						//	\
				function(){CADWOLF.setMeshes( DataID )} )} );																					//	\
		}else if (CADWOLF['Chart_dataobj'][DataID]['type']=="Grid") 																			//	\
		{	CADWOLF.makeGrids(DataID);																											//	\
		}else if (CADWOLF['Chart_dataobj'][DataID]['type']=="Axis") 																			//	\
		{	CADWOLF.makeAxes(DataID);																											//	\
		}else  																																	//	\
		{	CADWOLF.createShape(CADWOLF['Chart_dataobj'][DataID]['type'], DataID, 0);															//	\
		}																																		//	\
	}																																			//	\
	CADWOLF.setLegend( function(){CADWOLF.Render(PlotID)} );																					//	\
	CADWOLF.setSceneProps();																													//	\
	animate();																																	//	\
});																																				//	\
//-------------------------------------------------------------------------------------------------------------------------------------------------//

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------- SURFACE MAPS --------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
	var container = document.getElementById( 'main_contents' );																										//	\
	container.appendChild( this.Renderer.domElement );																												//	\
	this.Controls = new THREE.TrackballControls( this.Camera, this.Renderer.domElement );																			//	\
	if (type=="2")																																					//	\
	{	for (var DataID in CADWOLF['Chart_dataobj'])																												//	\
		{	var dataObj=new Surface_Data(DataID, PlotID);																											//	\
			for (var objProp in CADWOLF.Chart_dataobj[DataID]) { dataObj[objProp]=CADWOLF.Chart_dataobj[DataID][objProp]; }											//	\
			CADWOLF.Chart_dataobj[DataID]=dataObj;																													//	\
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
	var elementsInTheScene = CADWOLF.Scene.children.length;																									//	\
	for ( var i = elementsInTheScene-1; i > 0; i-- ) 																												//	\
	{	if ( CADWOLF.Scene.children[ i ]['name'] == DataID) { CADWOLF.Scene.remove ( CADWOLF.Scene.children [ i ] ); } } 						//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- REDRAW THE FUNCTION FROM SCRATCH ---------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.reDraw = function  (DataID)																														//	\
{	cancel_animate();																																				//	\
		if ((CADWOLF['Chart_dataobj'][DataID]['type']=="Surface")||(CADWOLF['Chart_dataobj'][DataID]['type']=="PointCloud"))										//	\
		{	CADWOLF.removeItem(DataID, 																																//	\
				function(){CADWOLF.setSurfaceVertices(DataID, 																										//	\
				function(){CADWOLF.setSurfaceColors(DataID, 																										//	\
				function(){CADWOLF.setMeshes(DataID,																												//	\
				function(){CADWOLF.setPlotExtremes(																													//	\
				function(){CADWOLF.setPositions(																													//	\
				function(){CADWOLF.setLegend(																														//	\
				function(){CADWOLF.Render() })} )} )} )} )} )} );																									//	\
		}else if (CADWOLF['Chart_dataobj'][DataID]['type']=="Line") 																								//	\
		{	CADWOLF.removeItem(DataID, 																																//	\
				function(){CADWOLF.setLineColors( DataID, 																											//	\
				function(){CADWOLF.setPlotExtremes(																													//	\
				function(){CADWOLF.setLegend(																														//	\
				function(){CADWOLF.setMeshes( DataID )} )} )} )} );																									//	\
		}else if (CADWOLF['Chart_dataobj'][DataID]['type']=="Grid") 																								//	\
		{	CADWOLF.makeGrids(DataID);																																//	\
		}else if (CADWOLF['Chart_dataobj'][DataID]['type']=="Axis") 																								//	\
		{	CADWOLF.makeAxes(DataID);																																//	\
		}else  																																						//	\
		{	CADWOLF.createShape(CADWOLF['Chart_dataobj'][DataID]['type'], DataID, 0);																				//	\
		}																																							//	\
	animate();																																						//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//


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
	xoff=CADWOLF['Chart_dataobj'][DataID].xoffset;																													//	\
	yoff=CADWOLF['Chart_dataobj'][DataID].yoffset;																													//	\
	zoff=CADWOLF['Chart_dataobj'][DataID].zoffset;																													//	\
	$('.plot_errorblock').html('');																																	//	\
	if ((parseInt(CADWOLF['Chart_dataobj'][DataID].xLength)==1)||(parseInt(CADWOLF['Chart_dataobj'][DataID].yLength)==1))											//	\
	{	$('.plot_errorblock').html('Surfaces and Points Clouds must have multiple rows and columns. The data sent had '+CADWOLF['Chart_dataobj'][DataID].xLength+' row and '+CADWOLF['Chart_dataobj'][DataID].yLength+' column');
	}																																								//	\
	for (var a=0; a<parseInt(CADWOLF['Chart_dataobj'][DataID].xLength); a++)																						//	\
	{	xkey='0-'+a;																																				//	\
		for (var b=0; b<parseInt(CADWOLF['Chart_dataobj'][DataID].yLength); b++)																					//	\
		{	ykey='0-'+b;																																			//	\
			key=a+'-'+b;																																			//	\
			keyMap[key]=index;																																		//	\
			if (CADWOLF['Chart_dataobj'][DataID].xData[xkey]===undefined){ xVal=a+xoff; }else{xVal=CADWOLF['Chart_dataobj'][DataID].xData[xkey]+xoff;}				//	\
			if (CADWOLF['Chart_dataobj'][DataID].yData[ykey]===undefined){ yVal=b+yoff; }else{yVal=CADWOLF['Chart_dataobj'][DataID].yData[ykey]+yoff;}				//	\
			if (CADWOLF['Chart_dataobj'][DataID]['flat']==1)																										//	\
			{	zVal=zoff;	}else { zVal=parseFloat(Big(CADWOLF['Chart_dataobj'][DataID].zData[key]).plus(zoff));	 }												//	\
			surfaceGeometry.vertices.push( new THREE.Vector3( xVal, yVal, zVal ) ); 																				//	\
			if (CADWOLF['Chart_dataobj'][DataID].zData[key]>zMax) { zMax=CADWOLF['Chart_dataobj'][DataID].zData[key]; }												//	\
			if (CADWOLF['Chart_dataobj'][DataID].zData[key]<zMin) { zMin=CADWOLF['Chart_dataobj'][DataID].zData[key]; }												//	\
			index++;																																				//	\
	}	}																																							//	\
	for (var a=0; a<parseInt(CADWOLF['Chart_dataobj'][DataID].xLength)-1; a++)																						//	\
	{	for (var b=0; b<parseInt(CADWOLF['Chart_dataobj'][DataID].yLength)-1; b++)																					//	\
		{	key=a+'-'+b;		var num1=a+1;	num2=b+1;																											//	\
			surfaceGeometry.faces.push( new THREE.Face3( keyMap[key], keyMap[a+'-'+num2], keyMap[num1+'-'+b] ) );													//	\
			surfaceGeometry.faces.push( new THREE.Face3( keyMap[a+'-'+num2], keyMap[num1+'-'+num2], keyMap[num1+'-'+b] ) );											//	\
	}	}																																							//	\
	surfaceGeometry.computeBoundingBox();																															//	\
	CADWOLF['Chart_dataobj'][DataID]['surfaceGeometry']=surfaceGeometry;																							//	\
	CADWOLF['Chart_dataobj'][DataID].xMin=parseFloat(Big(surfaceGeometry.boundingBox.min.x).minus(Big(CADWOLF['Chart_dataobj'][DataID]['xoffset'])));				//	\
	CADWOLF['Chart_dataobj'][DataID].xMax=parseFloat(Big(surfaceGeometry.boundingBox.max.x).minus(Big(CADWOLF['Chart_dataobj'][DataID]['xoffset'])));				//	\
	CADWOLF['Chart_dataobj'][DataID].yMin=parseFloat(Big(surfaceGeometry.boundingBox.min.y).minus(Big(CADWOLF['Chart_dataobj'][DataID]['yoffset'])));				//	\
	CADWOLF['Chart_dataobj'][DataID].yMax=parseFloat(Big(surfaceGeometry.boundingBox.max.y).minus(Big(CADWOLF['Chart_dataobj'][DataID]['yoffset'])));				//	\
	CADWOLF['Chart_dataobj'][DataID].zMin=zMin;																														//	\
	CADWOLF['Chart_dataobj'][DataID].zMax=zMax;																														//	\
	CADWOLF['Chart_dataobj'][DataID]['surfaceGeometry']['colorsNeedUpdate']=true;																					//	\
	CADWOLF['Chart_dataobj'][DataID]['surfaceGeometry']['elementsNeedUpdate']=true;																					//	\
	CADWOLF['Chart_dataobj'][DataID]['surfaceGeometry']['groupsNeedUpdate']=true;																					//	\
	CADWOLF['Chart_dataobj'][DataID]['surfaceGeometry']['verticesNeedUpdate']=true;																					//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------- SET THE EXTREME DATA FOR THE PLOT --------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
Surface.prototype.setPlotExtremes=function (callback)																												//	\
{	console.log('Setting Extremes for '+this.Format_id);
	var PlotID=this.Format_id;																																		//	\
	CADWOLF['Props']['xMax']=-999999999;		CADWOLF['Props']['xMin']=999999999;																					//	\
	CADWOLF['Props']['yMax']=-999999999;		CADWOLF['Props']['yMin']=999999999;																					//	\
	CADWOLF['Props']['zMax']=-999999999;		CADWOLF['Props']['zMin']=999999999;																					//	\
	for (var DataID in CADWOLF['Chart_dataobj'])																													//	\
	{	console.log('The min and max for '+DataID+' are '+CADWOLF['Chart_dataobj'][DataID].zMin+' and '+CADWOLF['Chart_dataobj'][DataID].zMax);						//	\
		if ((CADWOLF['Chart_dataobj'][DataID]['type']=="Line")||(CADWOLF['Chart_dataobj'][DataID]['type']=="Surface")||(CADWOLF['Chart_dataobj'][DataID]['type']=="PointCloud"))
		{	if (CADWOLF['Chart_dataobj'][DataID].xMin<CADWOLF['Props']['xMin']){ CADWOLF['Props']['xMin']=CADWOLF['Chart_dataobj'][DataID].xMin;}					//	\
			if (CADWOLF['Chart_dataobj'][DataID].xMax>CADWOLF['Props']['xMax']){ CADWOLF['Props']['xMax']=CADWOLF['Chart_dataobj'][DataID].xMax;}					//	\
			if (CADWOLF['Chart_dataobj'][DataID].yMin<CADWOLF['Props']['yMin']){ CADWOLF['Props']['yMin']=CADWOLF['Chart_dataobj'][DataID].yMin;}					//	\
			if (CADWOLF['Chart_dataobj'][DataID].yMax>CADWOLF['Props']['yMax']){ CADWOLF['Props']['yMax']=CADWOLF['Chart_dataobj'][DataID].yMax;}					//	\
			if (CADWOLF['Chart_dataobj'][DataID]['useColorData']==1)																								//	\
			{	if (CADWOLF['Chart_dataobj'][DataID].cMin<CADWOLF['Props']['zMin']){ CADWOLF['Props']['zMin']=CADWOLF['Chart_dataobj'][DataID].cMin;}				//	\
				if (CADWOLF['Chart_dataobj'][DataID].cMax>CADWOLF['Props']['zMax']){ CADWOLF['Props']['zMax']=CADWOLF['Chart_dataobj'][DataID].cMax;}				//	\
			}else																																					//	\
			{	if (CADWOLF['Chart_dataobj'][DataID].zMin<CADWOLF['Props']['zMin']){ CADWOLF['Props']['zMin']=CADWOLF['Chart_dataobj'][DataID].zMin;}				//	\
				if (CADWOLF['Chart_dataobj'][DataID].zMax>CADWOLF['Props']['zMax']){ CADWOLF['Props']['zMax']=CADWOLF['Chart_dataobj'][DataID].zMax;}				//	\
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
	CADWOLF.lut = new THREE.Lut( CADWOLF.Props.Legend.colorMap, CADWOLF.Props.Legend.numberOfColors );																//	\
	CADWOLF.lut.setMax( CADWOLF.Props.zMax );		CADWOLF.lut.setMin( CADWOLF.Props.zMin );																		//	\
	CADWOLF['Chart_dataobj'][DataID].lut=new THREE.Lut( CADWOLF['Chart_dataobj'][DataID]['colorMap'], parseInt(CADWOLF['Chart_dataobj'][DataID]['numberOfColors']) );//	\
	if (CADWOLF['Chart_dataobj'][DataID]['useColorData']==1)																										//	\
	{	CADWOLF['Chart_dataobj'][DataID].lut.setMax( CADWOLF['Chart_dataobj'][DataID].cMax );																		//	\
		CADWOLF['Chart_dataobj'][DataID].lut.setMin( CADWOLF['Chart_dataobj'][DataID].cMin );																		//	\
		colorData=CADWOLF['Chart_dataobj'][DataID].cData;																											//	\
	}else																																							//	\
	{	CADWOLF['Chart_dataobj'][DataID].lut.setMax( CADWOLF['Chart_dataobj'][DataID].zMax );																		//	\
		CADWOLF['Chart_dataobj'][DataID].lut.setMin( CADWOLF['Chart_dataobj'][DataID].zMin );																		//	\
		colorData=CADWOLF['Chart_dataobj'][DataID].zData;																											//	\
	}																																								//	\
	if (CADWOLF.Props.divideColormap===0)																															//	\
	{	console.log('Setting the colormap of '+CADWOLF.Props.Legend.colorMap+' for '+CADWOLF['Chart_dataobj'][DataID].surfaceGeometry.vertices.length+' vertices');	//	\
		for ( var i = 0; i < CADWOLF['Chart_dataobj'][DataID].surfaceGeometry.vertices.length; i++ ) 																//	\
		{	var x=Math.floor(i/CADWOLF['Chart_dataobj'][DataID].xLength);																							//	\
			var y=i%CADWOLF['Chart_dataobj'][DataID].yLength;																										//	\
			var key=x+'-'+y;																																		//	\
			if (colorData[key]===undefined) { dataPoint=0; }else{ dataPoint=colorData[key]; }																		//	\
			temp = CADWOLF.lut.getColor( dataPoint);																												//	\
			color = new THREE.Color( temp.r, temp.g, temp.b );																										//	\
			color.setRGB(temp.r, temp.g, temp.b);																													//	\
			CADWOLF['Chart_dataobj'][DataID].surfaceGeometry.colors[i]=color;																						//	\
		}																																							//	\
	}else																																							//	\
	{	for ( var i = 0; i < CADWOLF['Chart_dataobj'][DataID].surfaceGeometry.vertices.length; i++ ) 																//	\
		{	var x=Math.floor(i/CADWOLF['Chart_dataobj'][DataID].xLength);																							//	\
			var y=i%CADWOLF['Chart_dataobj'][DataID].yLength;																										//	\
			var key=x+'-'+y;																																		//	\
			if (colorData[key]===undefined) { dataPoint=0; }else{ dataPoint=colorData[key]; }																		//	\
			temp = CADWOLF['Chart_dataobj'][DataID].lut.getColor( dataPoint);																						//	\
			color = new THREE.Color( temp.r, temp.g, temp.b );																										//	\
			color.setRGB(temp.r, temp.g, temp.b);																													//	\
			CADWOLF['Chart_dataobj'][DataID].surfaceGeometry.colors[i]=color;																						//	\
		}																																							//	\
	}																																								//	\
	var faceIndices = [ 'a', 'b', 'c', 'd' ];																														//	\
	for ( var i = 0; i < CADWOLF['Chart_dataobj'][DataID].surfaceGeometry.faces.length; i++ ) 																		//	\
	{	face = CADWOLF['Chart_dataobj'][DataID].surfaceGeometry.faces[ i ];																							//	\
		numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;																									//	\
		for( var j = 0; j < numberOfSides; j++ ) 																													//	\
		{	vertexIndex = face[ faceIndices[ j ] ];																													//	\
			CADWOLF['Chart_dataobj'][DataID].surfaceGeometry.faces[ i ]['vertexColors'][ j ]=CADWOLF['Chart_dataobj'][DataID].surfaceGeometry.colors[vertexIndex];	//	\
		}																																							//	\
	}																																								//	\
	if (CADWOLF['Chart_dataobj'][DataID]['showLines']==1) { assignUVs(CADWOLF['Chart_dataobj'][DataID].surfaceGeometry); }											//	\
	CADWOLF['Chart_dataobj'][DataID]['surfaceGeometry']['colorsNeedUpdate']=true;																					//	\
	CADWOLF['Chart_dataobj'][DataID]['surfaceGeometry']['elementsNeedUpdate']=true;																					//	\
	CADWOLF['Chart_dataobj'][DataID]['surfaceGeometry']['groupsNeedUpdate']=true;																					//	\
	CADWOLF['Chart_dataobj'][DataID]['surfaceGeometry']['verticesNeedUpdate']=true;																					//	\
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
	if (CADWOLF['Chart_dataobj'][DataID]['type']=="Surface")																										//	\
	{	if (CADWOLF['Chart_dataobj'][DataID]['sWireFrame']=="Solid")																								//	\
		{	if (CADWOLF['Chart_dataobj'][DataID]['showLines']==1)																									//	\
			{	var wireTexture = new THREE.ImageUtils.loadTexture( 'http://www.cadwolf.com/Images/square.png' );													//	\
				wireTexture.wrapS = wireTexture.wrapT = THREE.RepeatWrapping; 																						//	\
				wireTexture.repeat.set( parseInt(CADWOLF['Chart_dataobj'][DataID].xLength), parseInt(CADWOLF['Chart_dataobj'][DataID].yLength) );					//	\
				wireMaterial = new THREE.MeshBasicMaterial( { map: wireTexture, vertexColors: THREE.VertexColors, side:THREE.DoubleSide } );						//	\
			}else {	wireMaterial = new THREE.MeshBasicMaterial( {vertexColors: THREE.VertexColors, side:THREE.DoubleSide} );  	}									//	\
		}else{	wireMaterial = new THREE.MeshBasicMaterial( {wireframe:true, vertexColors: THREE.VertexColors, side:THREE.DoubleSide } );	}						//	\
		graphMesh = new THREE.Mesh( CADWOLF['Chart_dataobj'][DataID].surfaceGeometry, wireMaterial );																//	\
		graphMesh.doubleSided = true;																																//	\
	}else if (CADWOLF['Chart_dataobj'][DataID]['type']=="PointCloud")																								//	\
	{	wireMaterial = new THREE.MeshBasicMaterial( {vertexColors: THREE.VertexColors, side:THREE.DoubleSide } );													//	\
		graphMesh = new THREE.PointCloud( CADWOLF['Chart_dataobj'][DataID].surfaceGeometry, wireMaterial );															//	\
	}																																								//	\
	graphMesh.id = DataID;																																			//	\
	graphMesh.name = DataID;																																		//	\
	CADWOLF.Scene.add(graphMesh);																																	//	\
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
	var elementsInTheScene = CADWOLF.Scene.children.length;																											//	\
	for ( var i = elementsInTheScene-1; i > 0; i-- ) 																												//	\
	{	if ( CADWOLF.Scene.children[ i ]['name'].match(/^Grid/)) { CADWOLF.Scene.remove ( CADWOLF.Scene.children [ i ] ); } } 										//	\	
	var thiscolor='0x'+CADWOLF['Chart_dataobj'][DataID]['color'];																									//	\
	var material = new THREE.LineBasicMaterial({	color: thiscolor   	});																							//	\
	var geometry = new THREE.Geometry();																															//	\
	if (CADWOLF['Chart_dataobj'][DataID]['gridtype']=="XY")																											//	\
	{	start1=CADWOLF['Chart_dataobj'][DataID]['xstart'];																											//	\
		stop1=CADWOLF['Chart_dataobj'][DataID]['xstop'];																											//	\
		step1=CADWOLF['Chart_dataobj'][DataID]['xspacing'];																											//	\
		start2=CADWOLF['Chart_dataobj'][DataID]['ystart'];																											//	\
		stop2=CADWOLF['Chart_dataobj'][DataID]['ystop'];																											//	\
		step2=CADWOLF['Chart_dataobj'][DataID]['yspacing'];																											//	\
		num=CADWOLF['Chart_dataobj'][DataID]['zoffset'];																											//	\
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
	if (CADWOLF['Chart_dataobj'][DataID]['gridtype']=="YZ")																											//	\
	{	start1=CADWOLF['Chart_dataobj'][DataID]['ystart'];																											//	\
		stop1=CADWOLF['Chart_dataobj'][DataID]['ystop'];																											//	\
		step1=CADWOLF['Chart_dataobj'][DataID]['yspacing'];																											//	\
		start2=CADWOLF['Chart_dataobj'][DataID]['zstart'];																											//	\
		stop2=CADWOLF['Chart_dataobj'][DataID]['zstop'];																											//	\
		step2=CADWOLF['Chart_dataobj'][DataID]['zspacing'];																											//	\
		num=CADWOLF['Chart_dataobj'][DataID]['xoffset'];																											//	\
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
	if (CADWOLF['Chart_dataobj'][DataID]['gridtype']=="XZ")																											//	\
	{	start1=CADWOLF['Chart_dataobj'][DataID]['xstart'];																											//	\
		stop1=CADWOLF['Chart_dataobj'][DataID]['xstop'];																											//	\
		step1=CADWOLF['Chart_dataobj'][DataID]['xspacing'];																											//	\
		start2=CADWOLF['Chart_dataobj'][DataID]['zstart'];																											//	\
		stop2=CADWOLF['Chart_dataobj'][DataID]['zstop'];																											//	\
		step2=CADWOLF['Chart_dataobj'][DataID]['zspacing'];																											//	\
		num=CADWOLF['Chart_dataobj'][DataID]['yoffset'];																											//	\
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
	line.position.set(CADWOLF['Chart_dataobj'][DataID].xPosition, CADWOLF['Chart_dataobj'][DataID].yPosition, CADWOLF['Chart_dataobj'][DataID].zPosition);			//	\
	line.rotation.set(0.0174532925*CADWOLF['Chart_dataobj'][DataID].xRotation, 0.0174532925*CADWOLF['Chart_dataobj'][DataID].yRotation, 0.0174532925*CADWOLF['Chart_dataobj'][DataID].zRotation);	
	line.name = "Grid"+DataID;																																		//	\
	line.id = "Grid"+DataID;																																		//	\
	this.Scene.add(line);																																			//	\																																							//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
		
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- INITIALIZE THE SURFACE MAP PLOT --------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.makeAxes = function(DataID, callback)																												//	\
{	console.log('Making Axes');
	var start=0, stop=0, interval=0, xoffset=0, yoffset=0, zoffset=0, tickLength=0;																					//	\
	var PlotID = this.Format_id;																																	//	\
	var xoff=0, yoff=0, thiscolor='#'+CADWOLF['Chart_dataobj'][DataID]['axiscolor'];																				//	\
	CADWOLF.removeItem(DataID);																																		//	\
	var material = new THREE.LineBasicMaterial({	color: thiscolor    	});																						//	\
	var geometry = new THREE.Geometry();																															//	\
	start=CADWOLF['Chart_dataobj'][DataID]['axisstart'];																											//	\
	stop=CADWOLF['Chart_dataobj'][DataID]['axisstop'];																												//	\
	interval=CADWOLF['Chart_dataobj'][DataID]['axisinterval'];																										//	\
	xoffset=parseFloat(CADWOLF['Chart_dataobj'][DataID]['xPosition']);																								//	\
	yoffset=parseFloat(CADWOLF['Chart_dataobj'][DataID]['yPosition']);																								//	\
	zoffset=parseFloat(CADWOLF['Chart_dataobj'][DataID]['zPosition']);																								//	\
	tickLength=parseFloat(CADWOLF['Chart_dataobj'][DataID]['tickLength']);																							//	\
	var xtextoffset=parseFloat(CADWOLF['Chart_dataobj'][DataID]['xTextOffset']);																					//	\
	var ytextoffset=parseFloat(CADWOLF['Chart_dataobj'][DataID]['yTextOffset']);																					//	\
	var ztextoffset=parseFloat(CADWOLF['Chart_dataobj'][DataID]['zTextOffset']);																					//	\
	if (CADWOLF['Chart_dataobj'][DataID]['axistype']=="X")																											//	\
	{	for (var xloc=start; xloc<=stop; xloc=xloc+interval)																										//	\
		{	geometry.vertices.push(new THREE.Vector3(xloc+xoffset, yoffset, zoffset));																				//	\
			geometry.vertices.push(new THREE.Vector3(xloc+xoffset, yoffset+tickLength, zoffset));																	//	\
			geometry.vertices.push(new THREE.Vector3(xloc+xoffset, yoffset, zoffset));																				//	\
			spritey = makeTextSprite( " " +xloc+ " ", { fontsize: CADWOLF['Chart_dataobj'][DataID]['axisfontsize'] });												//	\
			spritey.position.x = xloc+xoffset+xtextoffset;																											//	\
			spritey.position.y = yoffset+ytextoffset;																												//	\
			spritey.position.z = zoffset-3+ztextoffset;																												//	\
			spritey.name = DataID;																																	//	\
			this.Scene.add( spritey );																																//	\
		}																																							//	\
	}																																								//	\
	if (CADWOLF['Chart_dataobj'][DataID]['axistype']=="Y")																											//	\
	{	for (var xloc=start; xloc<=stop; xloc=xloc+interval)																										//	\
		{	geometry.vertices.push(new THREE.Vector3(xoffset, xloc+yoffset, zoffset));																				//	\
			geometry.vertices.push(new THREE.Vector3(xoffset+tickLength, xloc+yoffset, zoffset));																	//	\
			geometry.vertices.push(new THREE.Vector3(xoffset, xloc+yoffset, zoffset));																				//	\
			spritey = makeTextSprite( " " +xloc+ " ", { fontsize: CADWOLF['Chart_dataobj'][DataID]['axisfontsize']});												//	\
			spritey.position.x = xoffset+xtextoffset;																												//	\
			spritey.position.y = xloc+yoffset+ytextoffset;																											//	\
			spritey.position.z = zoffset-3+ztextoffset;																												//	\
			spritey.name = DataID;																																	//	\
			this.Scene.add( spritey );																																//	\
		}																																							//	\
	}																																								//	\
	if (CADWOLF['Chart_dataobj'][DataID]['axistype']=="Z")																											//	\
	{	for (var xloc=start; xloc<=stop; xloc=xloc+interval)																										//	\
		{	geometry.vertices.push(new THREE.Vector3(xoffset, yoffset, xloc+zoffset));																				//	\
			geometry.vertices.push(new THREE.Vector3(xoffset, yoffset+tickLength, xloc+zoffset));																	//	\
			geometry.vertices.push(new THREE.Vector3(xoffset, yoffset, xloc+zoffset));																				//	\
			geometry.vertices.push(new THREE.Vector3(xoffset+tickLength, yoffset, xloc+zoffset));																	//	\
			geometry.vertices.push(new THREE.Vector3(xoffset, yoffset, xloc+zoffset));																				//	\
			spritey = makeTextSprite( " " +xloc+ " ",{ fontsize: CADWOLF['Chart_dataobj'][DataID]['axisfontsize']});												//	\
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
	if ((parseInt(CADWOLF['Chart_dataobj'][DataID].xLength)!=1))																									//	\
	{	$('.plot_errorblock').html('Lines must have one row. The data sent had '+CADWOLF['Chart_dataobj'][DataID].xLength+' rows and '+CADWOLF['Chart_dataobj'][DataID].yLength+' columns');
	}																																								//	\
	CADWOLF['Props']['xMax']=-999999999;		CADWOLF['Props']['xMin']=999999999;																					//	\
	CADWOLF['Props']['yMax']=-999999999;		CADWOLF['Props']['yMin']=999999999;																					//	\
	CADWOLF['Props']['zMax']=-999999999;		CADWOLF['Props']['zMin']=999999999;																					//	\
	for (var thisDataID in CADWOLF['Chart_dataobj'])																												//	\
	{	if ((CADWOLF['Chart_dataobj'][thisDataID]['type']=="Line")||(CADWOLF['Chart_dataobj'][thisDataID]['type']=="Surface")||(CADWOLF['Chart_dataobj'][thisDataID]['type']=="PointCloud"))						//	\
		{	if (CADWOLF['Chart_dataobj'][thisDataID].xMin<CADWOLF['Props']['xMin']){ CADWOLF['Props']['xMin']=CADWOLF['Chart_dataobj'][thisDataID].xMin;}			//	\
			if (CADWOLF['Chart_dataobj'][thisDataID].xMax>CADWOLF['Props']['xMax']){ CADWOLF['Props']['xMax']=CADWOLF['Chart_dataobj'][thisDataID].xMax;}			//	\
			if (CADWOLF['Chart_dataobj'][thisDataID].yMin<CADWOLF['Props']['yMin']){ CADWOLF['Props']['yMin']=CADWOLF['Chart_dataobj'][thisDataID].yMin;}			//	\
			if (CADWOLF['Chart_dataobj'][thisDataID].yMax>CADWOLF['Props']['yMax']){ CADWOLF['Props']['yMax']=CADWOLF['Chart_dataobj'][thisDataID].yMax;}			//	\
			if (CADWOLF['Chart_dataobj'][thisDataID]['useColorData']==1)																							//	\
			{	if (CADWOLF['Chart_dataobj'][thisDataID].cMin<CADWOLF['Props']['zMin']){ CADWOLF['Props']['zMin']=CADWOLF['Chart_dataobj'][thisDataID].cMin;}		//	\
				if (CADWOLF['Chart_dataobj'][thisDataID].cMax>CADWOLF['Props']['zMax']){ CADWOLF['Props']['zMax']=CADWOLF['Chart_dataobj'][thisDataID].cMax;}		//	\
			}else																																					//	\
			{	if (CADWOLF['Chart_dataobj'][thisDataID].zMin<CADWOLF['Props']['zMin']){ CADWOLF['Props']['zMin']=CADWOLF['Chart_dataobj'][thisDataID].zMin;}		//	\
				if (CADWOLF['Chart_dataobj'][thisDataID].zMax>CADWOLF['Props']['zMax']){ CADWOLF['Props']['zMax']=CADWOLF['Chart_dataobj'][thisDataID].zMax;}		//	\
			}																																						//	\
	}	}																																							//	\
	CADWOLF['Chart_dataobj'][DataID].lineData=[];																													//	\
	xoff=CADWOLF['Chart_dataobj'][DataID].xoffset;																													//	\
	yoff=CADWOLF['Chart_dataobj'][DataID].yoffset;																													//	\
	zoff=CADWOLF['Chart_dataobj'][DataID].zoffset;																													//	\
	for (var a=0; a<CADWOLF['Chart_dataobj'][DataID]['lineGeometry']['points'].length; a++)																			//	\
	{	if (CADWOLF['Chart_dataobj'][DataID]['lineGeometry']['points'][a]['x']===undefined){ xVal=a+parseFloat(CADWOLF['Chart_dataobj'][DataID]['xoffset']); 		//	\
		}else { xVal=parseFloat(CADWOLF['Chart_dataobj'][DataID]['lineGeometry']['points'][a]['x'])+parseFloat(CADWOLF['Chart_dataobj'][DataID]['xoffset']); }		//	\
		if (CADWOLF['Chart_dataobj'][DataID]['lineGeometry']['points'][a]['y']===undefined){ yVal=a+parseFloat(CADWOLF['Chart_dataobj'][DataID]['yoffset']); 		//	\
		}else { yVal=parseFloat(CADWOLF['Chart_dataobj'][DataID]['lineGeometry']['points'][a]['y'])+parseFloat(CADWOLF['Chart_dataobj'][DataID]['yoffset']); }		//	\
		if (CADWOLF['Chart_dataobj'][DataID]['flat']==1)																											//	\
		{		zVal=parseFloat(CADWOLF['Chart_dataobj'][DataID]['zoffset']); 																						//	\
		}else {	zVal=parseFloat(CADWOLF['Chart_dataobj'][DataID]['lineGeometry']['points'][a]['z'])+parseFloat(CADWOLF['Chart_dataobj'][DataID]['zoffset']); 	}	//	\
		CADWOLF['Chart_dataobj'][DataID].lineData.push(new THREE.Vector3(xVal, yVal, zVal));																		//	\
	}																																								//	\
	if (CADWOLF['Chart_dataobj'][DataID]['type']=="Line")																											//	\
	{	segments=CADWOLF['Chart_dataobj'][DataID]['lineGeometry']['points'].length-1;																				//	\
		tubeRadius=parseInt(CADWOLF['Chart_dataobj'][DataID].lineRadius);																							//	\
		radiusSegments=parseInt(CADWOLF['Chart_dataobj'][DataID].lineRadSegs);																						//	\
		CADWOLF['Chart_dataobj'][DataID].linePoints=new THREE.SplineCurve3(CADWOLF['Chart_dataobj'][DataID].lineData);												//	\
		CADWOLF['Chart_dataobj'][DataID]['surfaceGeometry'] = new THREE.TubeGeometry(CADWOLF['Chart_dataobj'][DataID].linePoints, segments, tubeRadius, radiusSegments, false, false);	
		CADWOLF['Chart_dataobj'][DataID].lut=new THREE.Lut( CADWOLF['Chart_dataobj'][DataID]['colorMap'], parseInt(CADWOLF['Chart_dataobj'][DataID]['numberOfColors']) );		
		if (CADWOLF.Props.divideColormap===0)																														//	\
		{	CADWOLF.lut = new THREE.Lut( CADWOLF.Props.Legend.colorMap, CADWOLF.Props.Legend.numberOfColors );														//	\
			CADWOLF.lut.setMax( CADWOLF.Props.zMax );		CADWOLF.lut.setMin( CADWOLF.Props.zMin );																//	\
			if (CADWOLF['Chart_dataobj'][DataID]['useColorData']==1)																								//	\
			{		colorData=CADWOLF['Chart_dataobj'][DataID].cData;																								//	\
			}else{	colorData=CADWOLF['Chart_dataobj'][DataID]['lineGeometry']['points']; }																			//	\
			for ( var seg = 0; seg < CADWOLF['Chart_dataobj'][DataID]['lineGeometry']['points'].length; seg=seg+1 ) 												//	\
			{	for ( var rad = 0; rad < CADWOLF['Chart_dataobj'][DataID].lineRadSegs; rad=rad+1 ) 																	//	\
				{	vertexIndex = rad + seg * radiusSegments;																										//	\
//					temp = CADWOLF.lut.getColor( CADWOLF['Chart_dataobj'][DataID]['lineGeometry']['points'][seg]['z']);												//	\
					if (CADWOLF['Chart_dataobj'][DataID]['useColorData']==0){temp=CADWOLF.lut.getColor( colorData[seg]['z']);										//	\
					}else {											key='0-'+seg;	temp=CADWOLF.lut.getColor( colorData[key]); 	}								//	\
					color = new THREE.Color( temp.r, temp.g, temp.b );																								//	\
					color.setRGB(temp.r, temp.g, temp.b);																											//	\
					CADWOLF['Chart_dataobj'][DataID].surfaceGeometry.colors[vertexIndex] = color; 																	//	\
			}	}																																					//	\
		}else																																						//	\
		{	CADWOLF['Chart_dataobj'][DataID].lut = new THREE.Lut( CADWOLF.Props.Legend.colorMap, CADWOLF.Props.Legend.numberOfColors );								//	\
			if (CADWOLF['Chart_dataobj'][DataID]['useColorData']==1)																								//	\
			{	CADWOLF['Chart_dataobj'][DataID].lut.setMax( CADWOLF['Chart_dataobj'][DataID].cMax );																//	\
				CADWOLF['Chart_dataobj'][DataID].lut.setMin( CADWOLF['Chart_dataobj'][DataID].cMin );																//	\
				colorData=CADWOLF['Chart_dataobj'][DataID].cData;																									//	\
			}else																																					//	\
			{	CADWOLF['Chart_dataobj'][DataID].lut.setMax( CADWOLF['Chart_dataobj'][DataID].zMax );																//	\
				CADWOLF['Chart_dataobj'][DataID].lut.setMin( CADWOLF['Chart_dataobj'][DataID].zMin );																//	\
				colorData=CADWOLF['Chart_dataobj'][DataID]['lineGeometry']['points'];																				//	\
			}																																						//	\
			for ( var seg = 0; seg < CADWOLF['Chart_dataobj'][DataID]['lineGeometry']['points'].length; seg=seg+1 ) 												//	\
			{	for ( var rad = 0; rad < CADWOLF['Chart_dataobj'][DataID].lineRadSegs; rad=rad+1 ) 																	//	\
				{	vertexIndex = rad + seg * radiusSegments;																										//	\
					if (CADWOLF['Chart_dataobj'][DataID]['useColorData']==0){temp=CADWOLF['Chart_dataobj'][DataID].lut.getColor( colorData[seg]['z']);				//	\
					}else {														temp=CADWOLF['Chart_dataobj'][DataID].lut.getColor( colorData['0-'+seg]);}			//	\
					color = new THREE.Color( temp.r, temp.g, temp.b );																								//	\
					color.setRGB(temp.r, temp.g, temp.b);																											//	\
					CADWOLF['Chart_dataobj'][DataID].surfaceGeometry.colors[vertexIndex] = color; 																	//	\
		}	}	}																																					//	\
		for ( var i = 0; i < CADWOLF['Chart_dataobj'][DataID].surfaceGeometry.faces.length; i=i+1 ) 																//	\
		{	face = CADWOLF['Chart_dataobj'][DataID].surfaceGeometry.faces[ i ];																						//	\
			numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;																								//	\
			for( var j = 0; j < numberOfSides; j=j+1 ) 																												//	\
			{	vertexIndex = face[ faceIndices[ j ] ];																												//	\
				face.vertexColors[ j ] = CADWOLF['Chart_dataobj'][DataID].surfaceGeometry.colors[ vertexIndex ];													//	\
				CADWOLF['Chart_dataobj'][DataID].surfaceGeometry.faces[ i ]['vertexColors'][ j ] = CADWOLF['Chart_dataobj'][DataID].surfaceGeometry.colors[ vertexIndex ];	
			}																																						//	\
		}																																							//	\
		CADWOLF['Chart_dataobj'][DataID]['surfaceGeometry']['colorsNeedUpdate']=true;																				//	\
		CADWOLF['Chart_dataobj'][DataID]['surfaceGeometry']['elementsNeedUpdate']=true;																				//	\
		CADWOLF['Chart_dataobj'][DataID]['surfaceGeometry']['groupsNeedUpdate']=true;																				//	\
		CADWOLF['Chart_dataobj'][DataID]['surfaceGeometry']['verticesNeedUpdate']=true;																				//	\
		wireMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide } );													//	\
		graphMesh = new THREE.Mesh( CADWOLF['Chart_dataobj'][DataID].surfaceGeometry, wireMaterial );																//	\
		graphMesh.name = DataID;																																	//	\
		graphMesh.id = DataID;																																		//	\
		CADWOLF.Scene.add(graphMesh);																																//	\
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
	CADWOLF['Chart_dataobj'][DataID]['curve']=[];																													//	\
	var xsize = Object.keys(CADWOLF['Chart_dataobj'][DataID]['xData']).length;																						//	\
	var ysize = Object.keys(CADWOLF['Chart_dataobj'][DataID]['yData']).length;																						//	\
	if (xsize>ysize) { var size=xsize; }else { var size=ysize; }																									//	\
	for ( var i=0; i<size; i++ ) 																																	//	\
	{	key='0-'+i; 																																				//	\
		if (CADWOLF['Chart_dataobj'][DataID]['xData'][key]===undefined){ xVal=i; }else{ xVal=CADWOLF['Chart_dataobj'][DataID]['xData'][key]; }				 		//	\
		if (CADWOLF['Chart_dataobj'][DataID]['yData'][key]===undefined){ yVal=0; }else{ yVal=CADWOLF['Chart_dataobj'][DataID]['yData'][key]; } 						//	\
		CADWOLF['Chart_dataobj'][DataID]['curve'].push(new THREE.Vector3(xVal, 0, yVal));																			//	\
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
	var thisData=CADWOLF['Chart_dataobj'][DataID];																													//	\
	CADWOLF.removeItem(DataID);																																		//	\
	var thiscolor='#'+thisData['color'].replace(/^\#/,'');																											//	\
	var thiswirecolor='#'+thisData['wirecolor'].replace(/^\#/,'');																									//	\
	var darkMaterial = new THREE.MeshBasicMaterial( { color: thiscolor } );																							//	\
	if (CADWOLF['Chart_dataobj'][DataID]['wireFrame']=="Wireframe")																									//	\
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
	CADWOLF.Scene.add(shape);																																		//	\
	if (toRender==1) { CADWOLF.Render(PlotID); }																													//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- POPULATE THE SCENE WITH PROPERTIES -----------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.setSceneProps = function()																														//	\
{	var PlotID=this.Format_id;																																		//	\
	$('.surface_vxloc').val(this.Props.xPos);																														//	\
	$('.surface_vyloc').val(this.Props.yPos);																														//	\
	$('.surface_vzloc').val(this.Props.zPos);																														//	\
	$('.surface_cxpos').val(this.Props.xCamPos);																													//	\
	$('.surface_cypos').val(this.Props.yCamPos);																													//	\
	$('.surface_czpos').val(this.Props.zCamPos);																													//	\
	$('.surface_xrotate').val(this.Camera.rotation.x*180/Math.PI);																									//	\
	$('.surface_yrotate').val(this.Camera.rotation.y*180/Math.PI);																									//	\
	$('.surface_zrotate').val(this.Camera.rotation.z*180/Math.PI);																									//	\
	CADWOLF.setDataProps();																																			//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------- POPULATE THE DATASETS WITH PROPERTIES -----------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.setDataProps = function()																															//	\
{	var DataID=$('#surface_dataselect').val();																														//	\
	if (DataID!==undefined)																																			//	\
	{	$('.surface_xoffset').val(CADWOLF['Chart_dataobj'][DataID].xPosition);																						//	\	
		$('.surface_yoffset').val(CADWOLF['Chart_dataobj'][DataID].yPosition);																						//	\	
		$('.surface_zoffset').val(CADWOLF['Chart_dataobj'][DataID].zPosition);																						//	\	
		$('#surface_flat').empty();																																	//	\
		if (CADWOLF['Chart_dataobj'][DataID]['flat']===0)																											//	\
		{ 	$('#surface_flat').append($("<option></option>").attr("value",0).text('Shaped Map'));																	//	\
		 	$('#surface_flat').append($("<option></option>").attr("value",1).text('Flat Map'));																		//	\
		}else																																						//	\
		{ 	$('#surface_flat').append($("<option></option>").attr("value",1).text('Flat Map'));																		//	\
		 	$('#surface_flat').append($("<option></option>").attr("value",0).text('Shaped Map'));																	//	\
		}																																							//	\
		$('#surface_mapsplit').empty();																																//	\
		if (CADWOLF['Props']['divideColormap']===0)																													//	\
		{ 	$('#surface_mapsplit').append($("<option></option>").attr("value",0).text('Single'));																	//	\
		 	$('#surface_mapsplit').append($("<option></option>").attr("value",1).text('Split'));																	//	\
		}else																																						//	\
		{ 	$('#surface_mapsplit').append($("<option></option>").attr("value",1).text('Split'));																	//	\
		 	$('#surface_mapsplit').append($("<option></option>").attr("value",0).text('Single'));																	//	\
		}																																							//	\
		$('.surface_frameselect').empty();																															//	\
		if (CADWOLF['Chart_dataobj'][DataID]['wireFrame']=="Wireframe")																								//	\
		{ 	$('.surface_frameselect').append($("<option></option>").attr("value","Wireframe").text('Wireframe'));													//	\
		 	$('.surface_frameselect').append($("<option></option>").attr("value","Solid").text('Solid'));															//	\
		}else																																						//	\
		{ 	$('#surface_frameselect').append($("<option></option>").attr("value","Solid").text('Solid'));															//	\
		 	$('#surface_frameselect').append($("<option></option>").attr("value","Wireframe").text('Wireframe'));													//	\
		}																																							//	\
		$('.surface_wireselect').empty();																															//	\
		if (CADWOLF['Chart_dataobj'][DataID]['sWireFrame']=="Wireframe")																							//	\
		{ 	$('.surface_wireselect').append($("<option></option>").attr("value","Wireframe").text('Wireframe'));													//	\
		 	$('.surface_wireselect').append($("<option></option>").attr("value","Solid").text('Solid'));															//	\
		}else																																						//	\
		{ 	$('#surface_wireselect').append($("<option></option>").attr("value","Solid").text('Solid'));															//	\
		 	$('#surface_wireselect').append($("<option></option>").attr("value","Wireframe").text('Wireframe'));													//	\
		}																																							//	\
	}																																								//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------- RENDER THE SURFACE MAP -------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.Render = function () 																																//	\
{	cancel_animate();																																				//	\
	var PlotID=this.Format_id;	CPLOT=PlotID;																														//	\
	console.log('Rendering '+PlotID);
	CADWOLF.Renderer.setClearColor( 0xFFFFFF, 1 );																													//	\
	CADWOLF.Scene.position.x=CADWOLF.Props.xPos;																													//	\
	CADWOLF.Scene.position.y=CADWOLF.Props.yPos;																													//	\
	CADWOLF.Scene.position.z=CADWOLF.Props.zPos;																													//	\
	CADWOLF.Camera.position.set( CADWOLF.Props.xCamPos, CADWOLF.Props.yCamPos, CADWOLF.Props.zCamPos );																//	\
	var vec=new THREE.Vector3(CADWOLF.Props.xPos, CADWOLF.Props.yPos, CADWOLF.Props.zPos );																			//	\
	CADWOLF.Camera.lookAt( vec );																																	//	\
	CADWOLF.Camera.rotation.x=CADWOLF.Props.xRot;																													//	\
	CADWOLF.Camera.rotation.y=CADWOLF.Props.yRot;																													//	\
	CADWOLF.Camera.rotation.z=CADWOLF.Props.zRot;																													//	\
	CADWOLF.Camera.up = new THREE.Vector3( 0, 0, 1 );																												//	\
	Legend.Renderer.setClearColor( 0xFFFFFF, 1 );																													//	\
	Legend.Camera.up = new THREE.Vector3( 0, 0, 1 );																												//	\
	CADWOLF.Renderer.render( CADWOLF.Scene, CADWOLF.Camera ); CADWOLF.Controls.update();																			//	\
	Legend.Renderer.render( Legend.Scene, Legend.Camera ); Legend.Controls.update();																				//	\
	animate();																																						//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- SET THE LEGEND IN THE SURFACE MAP ------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.setLegend = function(callback)																													//	\
{	console.log('Set Legend');
	var PlotID=this.Format_id;																																		//	\
	$('#Legend_Wrapper').remove();																																	//	\
	$('body').append('<div id="Legend_Wrapper"><div id="Legend"></div><div id="Legend_Ticks"></div></div>');														//	\
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
	var container = document.getElementById( 'Legend' );																											//	\
	container.appendChild( Legend.Renderer.domElement );																											//	\
	Legend.Controls = new THREE.TrackballControls( Legend.Camera, Legend.Renderer.domElement );																		//	\
	if (CADWOLF.Props.divideColormap===0)																															//	\
	{	console.log('The colormap and number of colors was '+CADWOLF.Props.Legend.colorMap+' - '+parseInt(CADWOLF.Props.Legend.numberOfColors)+' :: '+CADWOLF.Props.zMin+'-'+CADWOLF.Props.zMax);
		CADWOLF.lut = new THREE.Lut( CADWOLF.Props.Legend.colorMap, parseInt(CADWOLF.Props.Legend.numberOfColors) );												//	\
		CADWOLF.lut.setMax( parseFloat(CADWOLF.Props.zMax) );																										//	\
		CADWOLF.lut.setMin( parseFloat(CADWOLF.Props.zMin) );																										//	\
		legendbar = CADWOLF.lut.setLegendOn( { 'layout':'horizontal', 'position': { 'x': 0, 'y': 0, 'z': 0 } , 'dimensions': {'width':0.3, 'height':14} } );		//	\
		Legend.Scene.add ( legendbar );																																//	\
		var labels = CADWOLF.lut.setLegendLabels( { 'ticks': CADWOLF.Props.Legend.numTicks } );																		//	\
		Legend.Scene.add ( labels['title'] );																														//	\
		for ( var i = 0; i < Object.keys( labels[ 'ticks' ] ).length; i++ ) 																						//	\
		{	 Legend.Scene.add ( labels[ 'lines' ][ i ] );}																											//	\
		$('#Legend_Ticks').empty();																																	//	\
		var width=parseInt(800/CADWOLF.Props.Legend.numTicks, 10);																									//	\
		for ( var i = 0; i < CADWOLF.Props.Legend.numTicks; i++ ) 																									//	\
		{	if (CADWOLF.Props.divideColormap===0)																													//	\
			{	var number=CADWOLF.Props.zMin+i*(CADWOLF.Props.zMax-CADWOLF.Props.zMin)/(CADWOLF.Props.Legend.numTicks-1); 											//	\
			}else { var DataID=CADWOLF.Props.Legend.show;																											//	\
					var number=CADWOLF['Chart_dataobj'][DataID].zMin+i*(CADWOLF['Chart_dataobj'][DataID].zMax-CADWOLF['Chart_dataobj'][DataID].zMin)/(CADWOLF.Props.Legend.numTicks-1); }
			$('#Legend_Ticks').append('<div class="Legend_Tick">'+Math.round(10000*number)/10000+'</div>');															//	\
		}																																							//	\
		$('.Legend_Tick').css('width',width);																														//	\
	}else																																							//	\	
	{	for (var DataID in CADWOLF['Chart_dataobj'])																												//	\
		{	var cm=CADWOLF['Chart_dataobj'][DataID].colorMap;																										//	\
			CADWOLF['Chart_dataobj'][DataID].lut = new THREE.Lut( cm, CADWOLF['Chart_dataobj'][DataID].numberOfColors );											//	\
			CADWOLF['Chart_dataobj'][DataID].lut.setMax( CADWOLF['Chart_dataobj'][DataID].zMax );																	//	\
			CADWOLF['Chart_dataobj'][DataID].lut.setMin( CADWOLF['Chart_dataobj'][DataID].zMin );																	//	\
		}																																							//	\	
	}																																								//	\	
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function animate(){ APLOT=requestAnimationFrame( animate ); CADWOLF.Renderer.render( CADWOLF.Scene, CADWOLF.Camera ); CADWOLF.Controls.update(); }					//	\
function cancel_animate() { if ((typeof(CADWOLF)!==undefined)&&(CADWOLF!==undefined)) {	 cancelAnimationFrame( CADWOLF ); } }										//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- SET THE POSITIONS IN THE SURFACE MAP ---------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
Surface.prototype.setPositions = function(callback)																													//	\
{	console.log('Set Positions');
	var PlotID=this.Format_id;																																		//	\
	if (CADWOLF.Props.xCamPos==0){ CADWOLF.Props.xCamPos=this.Props.xMax*2;	}																						//	\
	if (CADWOLF.Props.yCamPos==0){ CADWOLF.Props.yCamPos=this.Props.yMax*2;	}																						//	\
	if (CADWOLF.Props.zCamPos==0){ CADWOLF.Props.zCamPos=this.Props.zMax*2;	}																						//	\
	this.Camera.position.x=this.Props.xCamPos;		this.Camera.position.y=this.Props.yCamPos;	this.Camera.position.z=this.Props.zCamPos;							//	\
	this.Scene.up={};	this.Scene.up.x=0;	this.Scene.up.y=0;	this.Scene.up.z=1;																					//	\
	this.Camera.position.set( this.Props.xCamPos, this.Props.yCamPos, this.Props.zCamPos );																			//	\
	CADWOLF.Controls.target.set( CADWOLF.Props.xPos, CADWOLF.Props.yPos, CADWOLF.Props.zPos );																		//	\
	if (typeof(callback)=="function") { callback();	}																												//	\
}																																									//	\
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------- RESPOND TO A CAMERA OPTION BEING ALTERED --------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('focus', ".surface_camoption, .surface_datainput, .surface_leginput", function(e){ CADWOLF.setSceneProps(); }); 										//	\ 
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------- RESPOND TO A CAMERA OPTION BEING ALTERED --------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('keyup', ".surface_camoption", function(e) 																											//	\ 
{	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))))															 										//	\
	{	var DataID=$('#surface_dataselect').val();																													//	\
		if (e.target.className=="surface_vxloc surface_camoption") 	{ CADWOLF.Props.xPos=parseInt($(this).val()); }													//	\
		if (e.target.className=="surface_vyloc surface_camoption") 	{ CADWOLF.Props.yPos=parseInt($(this).val()); }													//	\
		if (e.target.className=="surface_vzloc surface_camoption") 	{ CADWOLF.Props.zPos=parseInt($(this).val()); }													//	\
		if (e.target.className=="surface_cxpos surface_camoption") 	{ CADWOLF.Props.xCamPos=parseInt($(this).val()); }												//	\
		if (e.target.className=="surface_cypos surface_camoption") 	{ CADWOLF.Props.yCamPos=parseInt($(this).val()); }												//	\
		if (e.target.className=="surface_czpos surface_camoption") 	{ CADWOLF.Props.zCamPos=parseInt($(this).val()); }												//	\
		if (e.target.className=="surface_xrotate surface_camoption") 	{ CADWOLF.Props.xRot=parseInt($(this).val()); }												//	\
		if (e.target.className=="surface_yrotate surface_camoption") 	{ CADWOLF.Props.yRot=parseInt($(this).val()); }												//	\
		if (e.target.className=="surface_zrotate surface_camoption") 	{ CADWOLF.Props.zRot=parseInt($(this).val()); }												//	\
		CADWOLF.setPositions( function(){CADWOLF.Render(PlotID) });																									//	\
		CADWOLF.reDraw(DataID);																																		//	\
	}																																								//	\	
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- RESPOND TO LEGEND TYPE BEING ALTERED -------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('change', ".surface_leginput", function(e) 																											//	\ 
{	var DataID=$('#surface_dataselect').val();																														//	\
	if (e.target.id=="surface_mapsplit"){CADWOLF.Props.divideColormap=parseInt($(this).val());	CADWOLF.Props.Legend.show=Object.keys(CADWOLF.Chart_dataobj)[0]; }	//	\
	if (e.target.id=="surface_numticks"){CADWOLF.Props.Legend.numTicks=parseInt($(this).val()); }																	//	\
	CADWOLF.reDraw(DataID);																																			//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------- RESPOND TO DATA TYPE BEING ALTERED -------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('change', ".surface_dataoption", function(e) 																										//	\ 
{	var DataID=$('#surface_dataselect').val();																														//	\
	
	if (e.target.id=="surface_colormap")																															//	\
	{ 	CADWOLF.Props.Legend.colorMap=$('#surface_colormap').val();																									//	\
		CADWOLF['Chart_dataobj'][DataID]['colorMap']=$('#surface_colormap').val();	}																				//	\
	if (e.target.id=="surface_numcolors"){ 	CADWOLF.Props.Legend.numberOfColors=$('#surface_numcolors').val();		}												//	\
	if (e.target.className=="surface_xoffset surface_datainput"){ 	CADWOLF['Chart_dataobj'][DataID]['xPosition']=parseFloat($(this).val());	}					//	\
	if (e.target.className=="surface_yoffset surface_datainput"){ 	CADWOLF['Chart_dataobj'][DataID]['yPosition']=parseFloat($(this).val());	}					//	\
	if (e.target.className=="surface_zoffset surface_datainput"){ 	CADWOLF['Chart_dataobj'][DataID]['zPosition']=parseFloat($(this).val());	}					//	\
	if (e.target.id=="surface_flat"){ 	CADWOLF['Chart_dataobj'][DataID].flat=parseInt($(this).val());		}														//	\
	CADWOLF.reDraw(DataID);																																			//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------- RESPOND TO DATA TPE BEING ALTERED ---------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('keyup', ".surface_datainput", function(e) 																											//	\ 
{	var DataID=$('#surface_dataselect').val();																														//	\
	if (((e.type=="keyup")&&((e.keyCode == 13)||(e.which == 13))))															 										//	\
	{	if (e.target.className=="surface_xoffset surface_datainput"){ 	CADWOLF['Chart_dataobj'][DataID]['xoffset']=parseFloat($(this).val());	}					//	\
		if (e.target.className=="surface_yoffset surface_datainput"){ 	CADWOLF['Chart_dataobj'][DataID]['yoffset']=parseFloat($(this).val());	}					//	\
		if (e.target.className=="surface_zoffset surface_datainput"){ 	CADWOLF['Chart_dataobj'][DataID]['zoffset']=parseFloat($(this).val());	}					//	\
		CADWOLF.reDraw(DataID);																																		//	\
	}																																								//	\	
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------- SELECT A DATA SET TO ADDRESS ----------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('change', "#surface_dataselect", function(e) 																										//	\ 
{	CADWOLF.Set_Data_Props($('#surface_dataselect').val());																											//	\
});																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------- SHOW / HIDE THE LEFT BAR --------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
$(document).on('click', "#Option_Bar_Show", function(e) {	$('#Option_Bar').toggle();	});																			//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

});