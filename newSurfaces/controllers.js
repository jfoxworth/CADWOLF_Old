// CONTROLLERS
/*
This is the main controller file for the surface page in CADWOLF. It uses the same functions as the document app, but they are duplicated here.

This page lets the user view a 3D chart in a separate window. The right side provides a separate view 

*/
surfaceApp.controller('surfaceController', ['$scope', '$http', '$sce',
    function($scope, $http, $sce)
    {  
        // This function lets the user 
        angular.element(document).ready(function(){ $scope.getInitialData(); });
            
        $scope.getInitialData=function ()
        {   wireTexture = new THREE.ImageUtils.loadTexture( 'http://www.cadwolf.com/Images/square.png' );    
            $http.post('http://www.cadwolf.com/Surfaces/getDataAngular', {myURL:window.location.pathname}, {}).
            then(function(response)
            {   myResponse=JSON.parse(response['data'][0]['Document']['data']); 
                $scope.initializeItems();
                $scope.initializeSurface(JSON.parse(response['data'][0]['Document']['data']));
            } ) 
        };

         
        // Function to initialize a surface map
        $scope.initializeItems = function()	
        {	$scope.showEdit=false;
        };
        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                                    SURFACE MAPS

            Like plots, surface maps take up a lot of code on CADWOLF. A surface map object can contain data items that represent surfaces, point
            clouds, lines, or predefined shapes. CADWOLF also has the option to add planes, axes, and other items. The code to handle all of these
            things is broken up into several sections. 
            
            Section 1 - Prototypes.             The first block of code shown here holds the prototype object for a surface object and the 
                                                prototype for a dataset in a 3D object.
                                                
                                                Function names - surface, surfaceData
                                    
            Section 2 - Calculate surface data. The second section holds all of the functions that format the data and create the items for
                                                a surface object.
                                                
                                                Function names - setSurfaceVertices, setPlotExtremes, setSurfaceColors, setMeshes, makeGrids,
                                                makeAxes, makeTextSprite
                                                
            Section 3 - Surface Interaction.    The functions in this section handle all of the interaction with the actual surface object. This
                                                includes all of the items to add and remove data, the initialization of the scene, and the 
                                                properties related to the viewer position as well as the camera position and angle
            
                                                Function names - initialize, removeItem, reDraw, setLegend, setPositions, render, animate, 
                                                cancelAnimate 
                                                
            Section 4 - Calculate Line Data     This is one function that calculates the colors for the line. It needs to be minimized and looked
                                                over to be speeded up and reduced
                                                
                                                Function names - setLineColors
                                                
            Section 5 - Built in Objects        This section holds functions that deal with the creation of predefined objects related to the surface.
                                                These items include things like spheres, squares, torus's and similar things
                                                
                                                Function names - createShate, formatLatheData
                                                
            Section 6 - Call Solver             In the final section there is a function that calls the web worker to solve for any data used in the 
                                                surface map. That same function deals with that data once it is returned.

        ------------------------------------------------------------------------------------------------------------------------------------------*/

        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                         SURFACE MAP SECTION 1 - PROTOTYPES

            This block contains the two prototypes involved with the surface maps. These prototypes include the "surface" that is the top level 
            for a surface map. The second is the "surfaceData" object. One of these is created for each dataset in the surface object.

            surface             :   Prompts     :   Called when the user sets a plot type to a surface
                                    Inputs      :   id  - the id of the surface
                                                    plotObj - an object that contains parameters that this plot is to be set to
                                    Description :   This function is simply the prototype for a surface plot                                                 

            surfaceData          :  Prompts     :   Called from view when user adds a new set of data to the chart
                                    Inputs      :   dataID - the ID for the dataset to be created
                                                    plotID - the ID for the plot that the dataset is being created for
                                                    plotObj - an object that contains parameters that this dataset is to be set to
                                    Description :   This function is simply the prototype for a surface map dataset.

        ------------------------------------------------------------------------------------------------------------------------------------------*/

        // The prototype for the surface map
        $scope.surface=function (plotID, plotObj) 	
        { 	this.Format_plotid=plotID;				
            this.Format_haschanged=1;	
            this.Chart_width="825px";												
            this.Chart_height="500px";												
            this.Page_position=0;		
            this.Page_parentid="none";	
            this.Page_topparentid="none";
            this.xLength=0;					
            this.yLength=0;					
            this.zLength=0;					
            this.axisHelper=0;				
            this.Props={};				
            this.Props.screen_width='800';
            this.Props.screen_height='600';
            this.Props.view_angle=45;	
            this.Props.aspect=this.Props.screen_width/this.Props.screen_height;	
            this.Props.near=0.1;		
            this.Props.far=20000;		
            this.Props.xLength=0;		        this.Props.yLength=0;		        this.Props.zLength=0;		
            this.Props.cMin=99999999999;        this.Props.cMax=-99999999999;
            this.Props.xMax=-99999999999;       this.Props.yMax=-99999999999;       this.Props.zMax=-99999999999;
            this.Props.xMin=99999999999;        this.Props.yMin=99999999999;        this.Props.zMin=99999999999;
            this.Props.xRot=0;	                this.Props.yRot=0;			        this.Props.zRot=0;
            this.Props.xPos=0;                  this.Props.yPos=0;			        this.Props.zPos=0;
            this.Props.xCamPos=0;	            this.Props.yCamPos=0;               this.Props.zCamPos=0;
            this.Props.divideColormap=0;
            this.Props.Legend={};		
            this.Props.Legend.colorMap='rainbow';		
            this.Props.Legend.numberOfColors=32;		
            this.Props.Legend.onOff=0;	
            this.Props.Legend.layout='horizontal';		
            this.Props.Legend.show=0;	
            this.Props.Legend.showHide="show";			
            this.Props.Legend.numTicks=5;	
            this.Planes=[];	
            this.Errors=[];	
            this.Chart_dataobj=[];		
            this.Chart_type='Surface';	
            if (plotObj!==undefined){ for (var prop in plotObj){ this[prop]=plotObj[prop]; } }
        }								

        // The prototype for the surface map dataset
        $scope.surfaceData=function (dataID, plotID, plotObj)
        { 	this.type="Surface"			
            this.Format_id=dataID;			
            this.Format_plotid=plotID;		
            this.series=0;
            this.dataname="New Dataset";			
            this.xDataRaw='';	this.yDataRaw='';		this.zDataRaw='';			this.cDataRaw='';			
            this.xData={};      this.yData={};		    this.zData={};				this.cData={};				
            this.xMin=0;        this.xMax=0;			this.yMin=0;		this.yMax=0;       this.zMin=0;	       this.zMax=0;
            this.cMin=0;	    this.cMax=0;			this.useColorData=0;		
            this.showLines=1;			
            this.surfaceGeometry={};	
            this.colorMap='rainbow';	
            this.numberOfColors=32;		
            this.legendOnOff=1;
            this.legendNumTicks=5;
            this.legendLayout='horizontal';
            this.flat=0;				
            this.xOffset=0;     this.yOffset=0;			this.zOffset=0;	
            this.color="ffffcc";		
            this.wireColor='000000';	
            this.lineRadius=2;			
            this.lineRadSegs=10;			
            this.lineClosed=false;		
            this.wireFrame="Wireframe";	
            this.sWireFrame="Solid";	
            this.width=10;				
            this.height=10;				
            this.depth=10;				
            this.widthSegs=10;			
            this.heightSegs=10;			
            this.depthSegs=10;			
            this.radius=10;				
            this.detail=1;				
            this.phiStart=0;			
            this.phiLength=360;			
            this.thetaStart=0;			
            this.thetaLength=360;		
            this.topRadius=10;			
            this.botRadius=10;			
            this.radSegs=10;				
            this.openEnded=false;		
            this.tubeDiameter=10;		
            this.tubeSegs=10;			
            this.arc=360;				
            this.curve=[];				
            this.curveText='';			
            this.numSegs=1;				
            this.xStart=0;          this.xStop=10;          this.yStart=0;          this.yStop=10;          this.zStart=0;	        this.zStop=10;				
            this.xSpacing=1;        this.ySpacing=1;        this.zSpacing=1;			
            this.gridType="XY";			
            this.axisType="X";			
            this.axisStart=0;			
            this.axisStop=10;			
            this.axisInterval=1;		
            this.axisFontSize=32;		
            this.tickLength=3;			
            this.axisColor='000000';	
            this.fontsize=1;			
            this.xDir=1;            this.yDir=1;		    this.zDir=1;
            this.length=1;				
            this.arrowHeight=1;				
            this.arrowWidth=1;				
            this.xPosition=0;       this.yPosition=0;		this.zPosition=0;			
            this.xRotation=0;	    this.yRotation=0;		this.zRotation=0;			
            this.xTextOffset=0;	    this.yTextOffset=0;		this.zTextOffset=0;		
            if (plotObj!==undefined){ for (var prop in plotObj){ this[prop]=plotObj[prop]; } }
        }								


        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                   SURFACE MAP SECTION 2 - CALCULATE SURFACE DATA
                                                   
            The functions in this section deal with the formatting of points for a surface map. This includes setting the vertices, the extremes, 
            and the colors. Also included in this section are the functions that create the meshes, grids, text sprites, and axes for a plot.

            setSurfaceVertices   :  Prompts     :   When the data solver returns with new data, this function is called to set the vertices
                                    Inputs      :   dataID - the ID for the dataset to be worked on 
                                    Description :   When the parameters for a dataset are solved, the data passed back is stripped of prototypes and
                                                    returned as a naked object. This causes errors in the three.js functionality as the classes are
                                                    needed. This function simply loops through the returned data and reapplys the  prototypes for
                                                    vertices and faces. It then creates a bounding box and sets the max and min for the plot based on
                                                    the max and min among all datasets.					

            setPlotExtremes      :  Prompts     :   Called from the surface redraw function and when the solver returns with new data
                                    Inputs      :   dataID - the ID for the dataset to be worked on 
                                    Description :   When the parameters for a dataset are solved, the data passed back is stripped of prototypes and
                                                    returned as a naked object. This causes errors in the three.js functionality as the classes are
                                                    needed. This function simply loops through the returned data and reapplys the  prototypes for
                                                    vertices and faces. It then creates a bounding box and sets the max and min for the plot based on
                                                    the max and min among all datasets.					

            setSurfaceColors     :  Prompts     :   Called from the surface redraw function and when the solver returns with new data
                                    Inputs      :   dataID - the ID for the dataset to be worked on 
                                    Description :   When the parameters for a dataset are solved, the data passed back is stripped of prototypes and
                                                    returned as a naked object. This causes errors in the three.js functionality as the classes are
                                                    needed. This function simply loops through the returned data and reapplys the  prototypes for
                                                    the colors and for the faces. It also takes into account whether or not there is one colormap for
                                                    all datasets or each dataset has an individual colormap.					

            setMeshes            :  Prompts     :   Called from the surface redraw function and when the solver returns with new data
                                    Inputs      :   dataID - the ID for the dataset to be worked on 
                                    Description :   This function creates the meshes for the surface represented by the dataset					

            makeGrids            :  Prompts     :   Called from the surface redraw function and when the solver returns with new data
                                    Inputs      :   dataID - the ID for the dataset to be worked on 
                                    Description :   This function creates the grids for the chart					

            makeAxes             :  Prompts     :   Called from the renderer function ************* Needs update
                                    Inputs      :   dataID - the dataset being worked on
                                    Description :   This function .

            makeTextSprite       :  Prompts     :   Called from the make axes function
                                    Inputs      :   message - 
                                                    parameters - 
                                    Description :   This function .

        ------------------------------------------------------------------------------------------------------------------------------------------*/

        // Set the vertices for a dataset in a surface
        $scope.surface.prototype.setSurfaceVertices=function (dataID, callback)		
        {	console.log('Setting vertices for '+dataID);
            var dataIndex=0;
            this['Chart_dataobj'].forEach(function(thisItem, thisIndex){   if (thisItem['Format_id']==dataID){ dataIndex=thisIndex; } });
            var key='', xkey='', ykey='', key1='', key2='', xVal=0, yVal=0, zVal=0,index=0, keyMap={}, xoff=0, yoff=0, zoff=0;	
            var xMax=-99999999, xMin=9999999, yMax=-99999999, yMin=9999999, zMax=-99999999, zMin=9999999;	
            var surfaceGeometry=new THREE.Geometry();	
            xoff=this['Chart_dataobj'][dataIndex].xOffset;	
            yoff=this['Chart_dataobj'][dataIndex].yOffset;	
            zoff=this['Chart_dataobj'][dataIndex].zOffset;	
            if (xoff===undefined){ xoff=0; }
            if (yoff===undefined){ yoff=0; }
            if (zoff===undefined){ zoff=0; }
            if (this['Chart_dataobj'][dataIndex]['xOffset']===undefined){ this['Chart_dataobj'][dataIndex]['xOffset']=0; }
            if (this['Chart_dataobj'][dataIndex]['yOffset']===undefined){ this['Chart_dataobj'][dataIndex]['yOffset']=0; }
            if (this['Chart_dataobj'][dataIndex]['zOffset']===undefined){ this['Chart_dataobj'][dataIndex]['zOffset']=0; }
            if ((parseInt(this['Chart_dataobj'][dataIndex].xLength)==1)||(parseInt(this['Chart_dataobj'][dataIndex].yLength)==1))	
            {	this.Errors.push('Surfaces and Points Clouds must have multiple rows and columns. The data sent had '+this['Chart_dataobj'][dataIndex].xLength+' row and '+this['Chart_dataobj'][dataIndex].yLength+' column'); }							
            for (var a=0; a<parseInt(this['Chart_dataobj'][dataIndex].xLength); a++)	
            {	xkey='0-'+a;			
                for (var b=0; b<parseInt(this['Chart_dataobj'][dataIndex].yLength); b++)
                {	ykey='0-'+b;		
                    key=a+'-'+b;		
                    keyMap[key]=index;	
                    if (this['Chart_dataobj'][dataIndex].xData[xkey]===undefined){ xVal=a+xoff; }else{xVal=this['Chart_dataobj'][dataIndex].xData[xkey]+xoff;}
                    if (this['Chart_dataobj'][dataIndex].yData[ykey]===undefined){ yVal=b+yoff; }else{yVal=this['Chart_dataobj'][dataIndex].yData[ykey]+yoff;}
                    if (this['Chart_dataobj'][dataIndex]['flat']==1)		
                    {	zVal=zoff;	}else { zVal=parseFloat(Big(this['Chart_dataobj'][dataIndex].zData[key]).plus(zoff));	 }
                    surfaceGeometry.vertices.push( new THREE.Vector3( xVal, yVal, zVal ) ); 
                    if (this['Chart_dataobj'][dataIndex].zData[key]>zMax) { zMax=this['Chart_dataobj'][dataIndex].zData[key]; }
                    if (this['Chart_dataobj'][dataIndex].zData[key]<zMin) { zMin=this['Chart_dataobj'][dataIndex].zData[key]; }
                    index++;			
            }	}						
            for (var a=0; a<parseInt(this['Chart_dataobj'][dataIndex].xLength)-1; a++)
            {	for (var b=0; b<parseInt(this['Chart_dataobj'][dataIndex].yLength)-1; b++)	
                {	key=a+'-'+b;		var num1=a+1;	num2=b+1;				
                    surfaceGeometry.faces.push( new THREE.Face3( keyMap[key], keyMap[a+'-'+num2], keyMap[num1+'-'+b] ) );
                    surfaceGeometry.faces.push( new THREE.Face3( keyMap[a+'-'+num2], keyMap[num1+'-'+num2], keyMap[num1+'-'+b] ) );
            }	}						
            surfaceGeometry.computeBoundingBox();		
            this['Chart_dataobj'][dataIndex]['surfaceGeometry']=surfaceGeometry;		
            this['Chart_dataobj'][dataIndex].xMin=parseFloat(Big(surfaceGeometry.boundingBox.min.x).minus(Big(this['Chart_dataobj'][dataIndex]['xOffset'])));
            this['Chart_dataobj'][dataIndex].xMax=parseFloat(Big(surfaceGeometry.boundingBox.max.x).minus(Big(this['Chart_dataobj'][dataIndex]['xOffset'])));
            this['Chart_dataobj'][dataIndex].yMin=parseFloat(Big(surfaceGeometry.boundingBox.min.y).minus(Big(this['Chart_dataobj'][dataIndex]['yOffset'])));
            this['Chart_dataobj'][dataIndex].yMax=parseFloat(Big(surfaceGeometry.boundingBox.max.y).minus(Big(this['Chart_dataobj'][dataIndex]['yOffset'])));
            this['Chart_dataobj'][dataIndex].zMin=zMin;					
            this['Chart_dataobj'][dataIndex].zMax=zMax;					
            this['Chart_dataobj'][dataIndex]['surfaceGeometry']['colorsNeedUpdate']=true;	
            this['Chart_dataobj'][dataIndex]['surfaceGeometry']['elementsNeedUpdate']=true;	
            this['Chart_dataobj'][dataIndex]['surfaceGeometry']['groupsNeedUpdate']=true;	
            this['Chart_dataobj'][dataIndex]['surfaceGeometry']['verticesNeedUpdate']=true;	
            if (typeof(callback)=="function") { callback();	}					
        }	
        
        // Set the max and min extremes for the plot
        $scope.surface.prototype.setPlotExtremes=function (callback)			
        {	console.log('Setting Extremes');
            this['Props']['xMax']=-999999999;		this['Props']['xMin']=999999999;
            this['Props']['yMax']=-999999999;		this['Props']['yMin']=999999999;
            this['Props']['zMax']=-999999999;		this['Props']['zMin']=999999999;
            for (var dataIndex in this['Chart_dataobj'])					
            {	if ((this['Chart_dataobj'][dataIndex]['type']=="Line")||(this['Chart_dataobj'][dataIndex]['type']=="Surface")||(this['Chart_dataobj'][dataIndex]['type']=="PointCloud"))
                {	if (this['Chart_dataobj'][dataIndex].xMin<this['Props']['xMin']){ this['Props']['xMin']=this['Chart_dataobj'][dataIndex].xMin;}	
                    if (this['Chart_dataobj'][dataIndex].xMax>this['Props']['xMax']){ this['Props']['xMax']=this['Chart_dataobj'][dataIndex].xMax;}	
                    if (this['Chart_dataobj'][dataIndex].yMin<this['Props']['yMin']){ this['Props']['yMin']=this['Chart_dataobj'][dataIndex].yMin;}	
                    if (this['Chart_dataobj'][dataIndex].yMax>this['Props']['yMax']){ this['Props']['yMax']=this['Chart_dataobj'][dataIndex].yMax;}	
                    if (this['Chart_dataobj'][dataIndex]['useColorData']==1)
                    {	if (this['Chart_dataobj'][dataIndex].cMin<this['Props']['zMin']){ this['Props']['zMin']=this['Chart_dataobj'][dataIndex].cMin;}	
                        if (this['Chart_dataobj'][dataIndex].cMax>this['Props']['zMax']){ this['Props']['zMax']=this['Chart_dataobj'][dataIndex].cMax;}	
                    }else				
                    {	if (this['Chart_dataobj'][dataIndex].zMin<this['Props']['zMin']){ console.log('Setting the zMin to '+this['Chart_dataobj'][dataIndex].zMin); this['Props']['zMin']=this['Chart_dataobj'][dataIndex].zMin;}	
                        if (this['Chart_dataobj'][dataIndex].zMax>this['Props']['zMax']){ console.log('Setting the zMax to '+this['Chart_dataobj'][dataIndex].zMax); this['Props']['zMax']=this['Chart_dataobj'][dataIndex].zMax;}	
                    }					
            }   }   		
            if (typeof(callback)=="function") { callback();	}					
        } 

        // Set the colors for a surface
        $scope.surface.prototype.setSurfaceColors =function (dataID, callback)			
        {	console.log('Setting Colors');
            this['Chart_dataobj'].forEach(function(thisItem, thisIndex){   if (thisItem['Format_id']==dataID){ dataIndex=thisIndex; } });
            var color, point, face, numberOfSides, vertexIndex, colorData={}, dataPoint=0;	
            this.lut = new THREE.Lut( this.Props.Legend.colorMap, this.Props.Legend.numberOfColors );	
            this.lut.setMax( this.Props.zMax );		this.lut.setMin( this.Props.zMin );	
            this['Chart_dataobj'][dataIndex].lut=new THREE.Lut( this['Chart_dataobj'][dataIndex]['colorMap'], parseInt(this['Chart_dataobj'][dataIndex]['numberOfColors']) );
            if (this['Chart_dataobj'][dataIndex]['useColorData']==1)		
            {	this['Chart_dataobj'][dataIndex].lut.setMax( this['Chart_dataobj'][dataIndex].cMax );		
                this['Chart_dataobj'][dataIndex].lut.setMin( this['Chart_dataobj'][dataIndex].cMin );		
                colorData=this['Chart_dataobj'][dataIndex].cData;		
            }else						
            {	this['Chart_dataobj'][dataIndex].lut.setMax( this['Chart_dataobj'][dataIndex].zMax );		
                this['Chart_dataobj'][dataIndex].lut.setMin( this['Chart_dataobj'][dataIndex].zMin );		
                colorData=this['Chart_dataobj'][dataIndex].zData;		
            }							
            if (this.Props.divideColormap=='0')
            {	console.log('Setting the colormap of '+this.Props.Legend.colorMap+' for '+this['Chart_dataobj'][dataIndex].surfaceGeometry.vertices.length+' vertices');
                for ( var i = 0; i < this['Chart_dataobj'][dataIndex].surfaceGeometry.vertices.length; i++ ) 	
                {	var x=Math.floor(i/this['Chart_dataobj'][dataIndex].xLength);	
                    var y=i%this['Chart_dataobj'][dataIndex].yLength;	
                    var key=x+'-'+y;	
                    if (colorData[key]===undefined) { dataPoint=0; }else{ dataPoint=colorData[key]; }
                    temp = this.lut.getColor( dataPoint);				
                    color = new THREE.Color( temp.r, temp.g, temp.b );			
                    color.setRGB(temp.r, temp.g, temp.b);
                    this['Chart_dataobj'][dataIndex].surfaceGeometry.colors[i]=color;
                }						
            }else						
            {	for ( var i = 0; i < this['Chart_dataobj'][dataIndex].surfaceGeometry.vertices.length; i++ ) 	
                {	var x=Math.floor(i/this['Chart_dataobj'][dataIndex].xLength);	
                    var y=i%this['Chart_dataobj'][dataIndex].yLength;	
                    var key=x+'-'+y;	
                    if (colorData[key]===undefined) { dataPoint=0; }else{ dataPoint=colorData[key]; }
                    temp = this['Chart_dataobj'][dataIndex].lut.getColor( dataPoint);
                    color = new THREE.Color( temp.r, temp.g, temp.b );			
                    color.setRGB(temp.r, temp.g, temp.b);
                    this['Chart_dataobj'][dataIndex].surfaceGeometry.colors[i]=color;
                }						
            }							
            var faceIndices = [ 'a', 'b', 'c', 'd' ];	
            for ( var i = 0; i < this['Chart_dataobj'][dataIndex].surfaceGeometry.faces.length; i++ ) 			
            {	face = this['Chart_dataobj'][dataIndex].surfaceGeometry.faces[ i ];	
                numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;		
                this['Chart_dataobj'][dataIndex].surfaceGeometry.faceVertexUvs[i]=new Array(); 
                for( var j = 0; j < numberOfSides; j++ ) 
                {	vertexIndex = face[ faceIndices[ j ] ];
                this['Chart_dataobj'][dataIndex].surfaceGeometry.faces[ i ]['vertexColors'][ j ]=this['Chart_dataobj'][dataIndex].surfaceGeometry.colors[vertexIndex];		
                }						
            }							
            if (this['Chart_dataobj'][dataIndex]['showLines']==1) { $scope.assignUVs(this['Chart_dataobj'][dataIndex].surfaceGeometry); }
            this['Chart_dataobj'][dataIndex]['surfaceGeometry']['colorsNeedUpdate']=true;	
            this['Chart_dataobj'][dataIndex]['surfaceGeometry']['elementsNeedUpdate']=true;	
            this['Chart_dataobj'][dataIndex]['surfaceGeometry']['groupsNeedUpdate']=true;	
            this['Chart_dataobj'][dataIndex]['surfaceGeometry']['verticesNeedUpdate']=true;	
            if (typeof(callback)=="function") { callback();	}					
        }								
        
        // Sets the U and V indices for the geometry
        $scope.assignUVs = function( geometry )
        {	geometry.computeBoundingBox();
            var max     = geometry.boundingBox.max;		
            var min     = geometry.boundingBox.min;		
            var offset  = new THREE.Vector2(0 - min.x, 0 - min.y);				
            var range   = new THREE.Vector2(max.x - min.x, max.y - min.y);		
            var faces = geometry.faces;	
            geometry.faceVertexUvs[0] = [];
            for (i = 0; i < geometry.faces.length ; i++) 
            {	var v1 = geometry.vertices[faces[i].a];	
                var v2 = geometry.vertices[faces[i].b];	
                var v3 = geometry.vertices[faces[i].c];	
              geometry.faceVertexUvs[0].push([			
                new THREE.Vector2( ( v1.x + offset.x ) / range.x , ( v1.y + offset.y ) / range.y ),	
                new THREE.Vector2( ( v2.x + offset.x ) / range.x , ( v2.y + offset.y ) / range.y ),	
                new THREE.Vector2( ( v3.x + offset.x ) / range.x , ( v3.y + offset.y ) / range.y )	
              ]);						
            }							
            geometry.uvsNeedUpdate = true;
        }	

        // Create a mesh for a dataset for the surface or point cloud
        $scope.surface.prototype.setMeshes =function(dataID, callback)					
        {	console.log('Set Meshes');
            this['Chart_dataobj'].forEach(function(thisItem, thisIndex){   if (thisItem['Format_id']==dataID){ dataIndex=thisIndex; } });
            var graphMesh={};			
            if (this['Chart_dataobj'][dataIndex]['type']=="Surface")		
            {	if (this['Chart_dataobj'][dataIndex]['sWireFrame']=="Solid")
                {	if (this['Chart_dataobj'][dataIndex]['showLines']==1)
                    {	//var wireTexture = new THREE.ImageUtils.loadTexture( 'http://www.cadwolf.com/Images/square.png' );
                        wireTexture.wrapS = wireTexture.wrapT = THREE.RepeatWrapping; 		
                        wireTexture.repeat.set( parseInt(this['Chart_dataobj'][dataIndex].xLength), parseInt(this['Chart_dataobj'][dataIndex].yLength) );
                        wireMaterial = new THREE.MeshBasicMaterial( { map: wireTexture, vertexColors: THREE.VertexColors, side:THREE.DoubleSide } );
                    }else {	wireMaterial = new THREE.MeshBasicMaterial( {vertexColors: THREE.VertexColors, side:THREE.DoubleSide} );  	}
                }else{	wireMaterial = new THREE.MeshBasicMaterial( {wireframe:true, vertexColors: THREE.VertexColors, side:THREE.DoubleSide } );	}
                graphMesh = new THREE.Mesh( this['Chart_dataobj'][dataIndex].surfaceGeometry, wireMaterial );	
                graphMesh.doubleSided = true;			
                graphMesh.id = dataID;	
                graphMesh.name = dataID;
                this.Scene.add(graphMesh);	
            }else if (this['Chart_dataobj'][dataIndex]['type']=="PointCloud")		
            {	wireMaterial = new THREE.MeshBasicMaterial( {vertexColors: THREE.VertexColors, side:THREE.DoubleSide } );
                graphMesh = new THREE.PointCloud( this['Chart_dataobj'][dataIndex].surfaceGeometry, wireMaterial );
                graphMesh.id = dataIndex;	
                graphMesh.name = dataIndex;
                this.Scene.add(graphMesh);	
            }							
            if (typeof(callback)=="function") { callback();	}					
        }
        

        // Create the grid lines for the object
        $scope.surface.prototype.makeGrids = function(dataID, toRender, callback)				
        {	console.log('Make Grids');
            this.removeItem(dataID);
            this['Chart_dataobj'].forEach(function(thisItem, thisIndex){   if (thisItem['Format_id']==dataID){ dataIndex=thisIndex; } });
            var material='', geometry='', thiscolor='', i='', start1=0, stop1=10, step1=1, start2=0, stop2=10, step2=1, num=0;
            var elementsInTheScene = this.Scene.children.length;		
            for ( var i = elementsInTheScene-1; i > 0; i-- ) 					
            {	if ( this.Scene.children[ i ]['name'].match(/^Grid/)) { this.Scene.remove ( this.Scene.children [ i ] ); } } 	
            var thiscolor='0x'+this['Chart_dataobj'][dataIndex]['color'];
            var material = new THREE.LineBasicMaterial({	color: thiscolor   	});
            var geometry = new THREE.Geometry();		
            if (this['Chart_dataobj'][dataIndex]['gridType']=="XY")		
            {	start1=this['Chart_dataobj'][dataIndex]['xStart'];		
                stop1=this['Chart_dataobj'][dataIndex]['xStop'];			
                step1=this['Chart_dataobj'][dataIndex]['xSpacing'];		
                start2=this['Chart_dataobj'][dataIndex]['yStart'];		
                stop2=this['Chart_dataobj'][dataIndex]['yStop'];			
                step2=this['Chart_dataobj'][dataIndex]['ySpacing'];		
                num=this['Chart_dataobj'][dataIndex]['zOffset'];			
                for (a=start1; a<=stop1; a=a+parseFloat(step1))					
                {	geometry.vertices.push(new THREE.Vector3(a, start2, num));	
                    geometry.vertices.push(new THREE.Vector3(a, stop2, num));	
                    geometry.vertices.push(new THREE.Vector3(a, start2, num));	
                }						
                geometry.vertices.push(new THREE.Vector3(start1, start2, num));	
                for (a=start2; a<=stop2; a=a+parseFloat(step2))					
                {	geometry.vertices.push(new THREE.Vector3(start1, a, num));	
                    geometry.vertices.push(new THREE.Vector3(stop1, a, num));	
                    geometry.vertices.push(new THREE.Vector3(start1, a, num));	
                }						
            }							
            if (this['Chart_dataobj'][dataIndex]['gridType']=="YZ")		
            {	start1=this['Chart_dataobj'][dataIndex]['yStart'];		
                stop1=this['Chart_dataobj'][dataIndex]['yStop'];			
                step1=this['Chart_dataobj'][dataIndex]['ySpacing'];		
                start2=this['Chart_dataobj'][dataIndex]['zStart'];		
                stop2=this['Chart_dataobj'][dataIndex]['zStop'];			
                step2=this['Chart_dataobj'][dataIndex]['zSpacing'];		
                num=this['Chart_dataobj'][dataIndex]['xOffset'];			
                for (a=start1; a<=stop1; a=a+parseFloat(step1))					
                {	geometry.vertices.push(new THREE.Vector3(num, a, start2));	
                    geometry.vertices.push(new THREE.Vector3(num, a, stop2));	
                    geometry.vertices.push(new THREE.Vector3(num, a, start2));	
                }						
                geometry.vertices.push(new THREE.Vector3(num, start1, start2));	
                for (a=start2; a<=stop2; a=a+parseFloat(step2))					
                {	geometry.vertices.push(new THREE.Vector3(num, start1, a));	
                    geometry.vertices.push(new THREE.Vector3(num, stop1, a));	
                    geometry.vertices.push(new THREE.Vector3(num, start1, a));	
                }						
            }							
            if (this['Chart_dataobj'][dataIndex]['gridType']=="XZ")		
            {	start1=this['Chart_dataobj'][dataIndex]['xStart'];		
                stop1=this['Chart_dataobj'][dataIndex]['xStop'];			
                step1=this['Chart_dataobj'][dataIndex]['xSpacing'];		
                start2=this['Chart_dataobj'][dataIndex]['zStart'];		
                stop2=this['Chart_dataobj'][dataIndex]['zStop'];			
                step2=this['Chart_dataobj'][dataIndex]['zSpacing'];		
                num=this['Chart_dataobj'][dataIndex]['yOffset'];			
                for (a=start1; a<=stop1; a=a+parseFloat(step1))					
                {	geometry.vertices.push(new THREE.Vector3(a, num, start2));	
                    geometry.vertices.push(new THREE.Vector3(a, num, stop2));	
                    geometry.vertices.push(new THREE.Vector3(a, num, start2));	
                }						
                geometry.vertices.push(new THREE.Vector3(start1, num, start2));	
                for (a=start2; a<=stop2; a=a+parseFloat(step2))					
                {	geometry.vertices.push(new THREE.Vector3(start1, num, a));	
                    geometry.vertices.push(new THREE.Vector3(stop1, num, a));	
                    geometry.vertices.push(new THREE.Vector3(start1, num, a));	
                }						
            }							
            var line = new THREE.Line(geometry, material);
            line.position.set(this['Chart_dataobj'][dataIndex].xPosition, this['Chart_dataobj'][dataIndex].yPosition, this['Chart_dataobj'][dataIndex].zPosition);	
            line.rotation.set(0.0174532925*this['Chart_dataobj'][dataIndex].xRotation, 0.0174532925*this['Chart_dataobj'][dataIndex].yRotation, 0.0174532925*this['Chart_dataobj'][dataIndex].zRotation);	
            line.name = "Grid"+dataID;	
            line.id = "Grid"+dataID;	
            this.Scene.add(line);								
            if (toRender==1){ this.Render(this.Format_plotid); }
            if (typeof(callback)=="function") { callback();	}					
        }								

        // Draw an axes for a plot
        $scope.surface.prototype.makeAxes = function(dataID, toRender, callback)
        {	console.log('Making Axes');
            this['Chart_dataobj'].forEach(function(thisItem, thisIndex){   if (thisItem['Format_id']==dataID){ dataIndex=thisIndex; } });
            var start=0, stop=0, interval=0, xOffset=0, yOffset=0, zOffset=0, tickLength=0;	
            var xOff=0, yOff=0, thisColor='#'+this['Chart_dataobj'][dataIndex]['axiscolor'];	
            this.removeItem(dataID);			
            var material = new THREE.LineBasicMaterial({	color: thisColor    	});		
            var geometry = new THREE.Geometry();		
            start=this['Chart_dataobj'][dataIndex]['axisStart'];			
            stop=this['Chart_dataobj'][dataIndex]['axisStop'];			
            interval=this['Chart_dataobj'][dataIndex]['axisInterval'];	
            xOffset=parseFloat(this['Chart_dataobj'][dataIndex]['xPosition']);		
            yOffset=parseFloat(this['Chart_dataobj'][dataIndex]['yPosition']);		
            zOffset=parseFloat(this['Chart_dataobj'][dataIndex]['zPosition']);		
            tickLength=parseFloat(this['Chart_dataobj'][dataIndex]['tickLength']);	
            var xTextOffset=parseFloat(this['Chart_dataobj'][dataIndex]['xTextOffset']);
            var yTextOffset=parseFloat(this['Chart_dataobj'][dataIndex]['yTextOffset']);
            var zTextOffset=parseFloat(this['Chart_dataobj'][dataIndex]['zTextOffset']);
            if (this['Chart_dataobj'][dataIndex]['axisType']=="X")		
            {	for (var xLoc=start; xLoc<=stop; xLoc=parseFloat(xLoc)+parseFloat(interval))			
                {	geometry.vertices.push(new THREE.Vector3(xLoc+xOffset, yOffset, zOffset));
                    geometry.vertices.push(new THREE.Vector3(xLoc+xOffset, yOffset+tickLength, zOffset));				
                    geometry.vertices.push(new THREE.Vector3(xLoc+xOffset, yOffset, zOffset));
                    spritey = $scope.makeTextSprite( " " +xLoc+ " ", { fontsize: this['Chart_dataobj'][dataIndex]['axisFontSize'] });
                    spritey.position.x = xLoc+xOffset+xTextOffset;				
                    spritey.position.y = yOffset+yTextOffset;					
                    spritey.position.z = zOffset-3+zTextOffset;					
                    spritey.name = dataID;
                    this.Scene.add( spritey );			
                }						
            }							
            if (this['Chart_dataobj'][dataIndex]['axisType']=="Y")		
            {	for (var xLoc=start; xLoc<=stop; xLoc=parseFloat(xLoc)+parseFloat(interval))			
                {	geometry.vertices.push(new THREE.Vector3(xOffset, xLoc+yOffset, zOffset));
                    geometry.vertices.push(new THREE.Vector3(xOffset+tickLength, xLoc+yOffset, zOffset));				
                    geometry.vertices.push(new THREE.Vector3(xOffset, xLoc+yOffset, zOffset));
                    spritey = $scope.makeTextSprite( " " +xLoc+ " ", { fontsize: this['Chart_dataobj'][dataIndex]['axisFontSize']});
                    spritey.position.x = xOffset+xTextOffset;					
                    spritey.position.y = xLoc+yOffset+yTextOffset;				
                    spritey.position.z = zOffset-3+zTextOffset;					
                    spritey.name = dataID;
                    this.Scene.add( spritey );			
                }						
            }							
            if (this['Chart_dataobj'][dataIndex]['axisType']=="Z")		
            {	for (var xLoc=start; xLoc<=stop; xLoc=parseFloat(xLoc)+parseFloat(interval))			
                {	geometry.vertices.push(new THREE.Vector3(xOffset, yOffset, xLoc+zOffset));
                    geometry.vertices.push(new THREE.Vector3(xOffset, yOffset+tickLength, xLoc+zOffset));				
                    geometry.vertices.push(new THREE.Vector3(xOffset, yOffset, xLoc+zOffset));
                    geometry.vertices.push(new THREE.Vector3(xOffset+tickLength, yOffset, xLoc+zOffset));				
                    geometry.vertices.push(new THREE.Vector3(xOffset, yOffset, xLoc+zOffset));
                    spritey = $scope.makeTextSprite( " " +xLoc+ " ",{ fontsize: this['Chart_dataobj'][dataIndex]['axisFontSize']});	
                    spritey.position.x = xOffset+xTextOffset;					
                    spritey.position.y = yOffset+yTextOffset;					
                    spritey.position.z = xLoc+zOffset-3+zTextOffset;			
                    spritey.name = dataID;
                    this.Scene.add( spritey );			
                }						
            }							
            var line = new THREE.Line(geometry, material);
            line.name = dataID;			
            line.id = dataID;			
            this.Scene.add(line);		
            if (toRender==1){ this.Render(this.Format_plotid); }
            if (typeof(callback)=="function") { callback();	}					
        }	

        // Make all of the text sprites for the chart
        $scope.makeTextSprite = function( message, parameters )	
        {	console.log('Making all the text sprites');							
            if ( parameters === undefined ) parameters = {};					
            var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
            var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
            var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 0;		
            var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:255, g:255, b:255, a:1.0 };
            var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
            var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };	
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');		
            context.font = "Bold " + fontsize + "px " + fontface;				
            var metrics = context.measureText( message );
            var textWidth = metrics.width;
            context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
            context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
            context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
            context.fillText( message, borderThickness, fontsize + borderThickness);		
            var texture = new THREE.Texture(canvas) 	
            texture.needsUpdate = true;	
            var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );				
            var sprite = new THREE.Sprite( spriteMaterial );					
            sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);	
            return sprite;  			
        }
        
 
        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                   SURFACE MAP SECTION 3 - SURFACE INTERACTION

            The functions in this section deal with placing and removing items on the surface. This includes everything from the initialization 
            of the surface to the render, the reDraw, and the animation items. Included in this bank of functions are the functions to set the 
            positions of the camera and the viewer as well as the function that places the legend on the surface.
            
            initializeSurface    :  Prompts     :   When the page is loaded for a surface object
                                                    When the chart is changed from a 2D one to a surface map
                                    Inputs      :   plotID - the id of the plot in question
                                                    reset  - a 1 or a 0 depending on whether the surface is being initialized upon reload or upon
                                                             being changed from a 2D plot. If it is being changed, then the data is reset.
                                    Description :   This function initializes a surface map object. This includes creating a scene, camera, keyboard,
                                                    clock, and renderer.

            render               :  Prompts     :   
                                    Inputs      :   none
                                    Description :   

            animate              :  Prompts     :   
                                    Inputs      :   none
                                    Description :   

            cancel_animate       :  Prompts     :   
                                    Inputs      :   none
                                    Description :   

            reDraw               :  Prompts     :   
                                    Inputs      :   none
                                    Description :   

            removeItem           :  Prompts     :   Called any time a change is made to a dataset or to an item
                                    Inputs      :   dataID - the ID for the dataset to be deleted 
                                    Description :   This function removes an item from the scene by finding the name that matches the ID and using
                                                    the three.js function to remove it.

            setLegend            :  Prompts     :   
                                    Inputs      :   none
                                    Description :   

            setPositions         :  Prompts     :   
                                    Inputs      :   none
                                    Description :   

        ------------------------------------------------------------------------------------------------------------------------------------------*/

        // Function to initialize a surface map
        $scope.initializeSurface = function(plotObj)	
        {	$scope.cadwolf={};
            console.log('Initializing the surface');
            $scope.cadwolf.Surface=new $scope.surface(plotObj['Format_id'], {Props:plotObj['Props'], Chart_dataobj:plotObj['Chart_dataobj']});
            $scope.cadwolf.Surface.Scene=new THREE.Scene();
            $scope.cadwolf.Surface.Camera = new THREE.PerspectiveCamera( $scope.cadwolf.Surface.Props.view_angle, $scope.cadwolf.Surface.Props.aspect, $scope.cadwolf.Surface.Props.near, $scope.cadwolf.Surface.Props.far);	
            $scope.cadwolf.Surface.Camera.up = new THREE.Vector3( 0, 0, 1 );
            $scope.cadwolf.Surface.Camera.name = 'camera';
            $scope.cadwolf.Surface.Keyboard = new THREEx.KeyboardState();	
            $scope.cadwolf.Surface.Clock = new THREE.Clock();
            $scope.cadwolf.Surface.Scene.add($scope.cadwolf.Surface.Camera);
            if ( Detector.webgl ) { $scope.cadwolf.Surface.Renderer = new THREE.WebGLRenderer( {antialias:true} ); } else { $scope.cadwolf.Surface.Renderer = new THREE.CanvasRenderer(); }	
            $scope.cadwolf.Surface.Props.screen_width=window.innerWidth;
            $scope.cadwolf.Surface.Props.screen_height=window.innerHeight;
            $scope.cadwolf.Surface.Renderer.setSize($scope.cadwolf.Surface.Props.screen_width, $scope.cadwolf.Surface.Props.screen_height);	
            $scope.cadwolf.Surface.Renderer.setClearColor( 0xffffff, 1);	
            var container = document.getElementById( 'cadwolfSurface' );			
            container.appendChild( $scope.cadwolf.Surface.Renderer.domElement );					
            $scope.cadwolf.Surface.Controls = new THREE.TrackballControls( $scope.cadwolf.Surface.Camera, $scope.cadwolf.Surface.Renderer.domElement );	
            $scope.cadwolf.Surface.Chart_dataobj=$.map($scope.cadwolf.Surface.Chart_dataobj, function(value, index) { return [value]; });
            for (var dataIndex=0; dataIndex<$scope.cadwolf.Surface.Chart_dataobj.length; dataIndex++)				
            {   var dataObj=new $scope.surfaceData(plotObj['Chart_dataobj'][dataIndex], $scope.cadwolf.Surface.Chart_dataobj[dataIndex]['Format_id'], $scope.cadwolf.Surface.Chart_dataobj[dataIndex]);				
                if ((dataObj['dataname']===undefined)||(dataObj['dataname']=='')){ dataObj['dataname']='dataset '+dataIndex; }
                $scope.cadwolf.Surface.Chart_dataobj[dataIndex]=dataObj;
                console.log('At index '+dataIndex+', the id is '+$scope.cadwolf.Surface.Chart_dataobj[dataIndex]['Format_id']);
                if (dataIndex==0){ $scope.datasetID=$scope.cadwolf.Surface.Chart_dataobj[dataIndex]['Format_id']; $scope.currentDataset=$scope.cadwolf.Surface.Chart_dataobj[dataIndex]; }
            }						
            myScope=$scope;
            $scope.cadwolf.Surface.reDrawItem($scope.cadwolf, 'all', 1); 	
        };

        // Set the current dataset based upon the ID sent
        $scope.setDataset = function () 			
        {	console.log('Current dataset is now '+$scope.datasetID);
            for (var a=0; a<$scope.cadwolf.Surface.Chart_dataobj; a++){ if ($scope.cadwolf.Surface.Chart_dataobj[a]['Format_id']==$scope.datasetID){ $scope.currentDataset=cadwolf.Surface.Chart_dataobj[a]; } }
        };								

        // Render a surface object
        $scope.surface.prototype.Render = function (plotID) 			
        {	CPLOT=plotID;	
            console.log('Rendering '+plotID);
            this.axisHelper=1;
            this.Renderer.setClearColor( 0xFFFFFF, 1 );				
            this.Controls.update();
            this.Renderer.render( this.Scene, this.Camera ); 
            var container = document.getElementById( 'cadwolfSurface' );			
            container.appendChild( this.Renderer.domElement );					
            this.setLegend();        
        };								

        // Start and stop the request animation frame from the GPU
        $scope.animate = function (){ cancelAnimationFrame( $scope.APLOT ); $scope.APLOT=requestAnimationFrame( $scope.animate ); $scope.cadwolf.Surface.Renderer.render( $scope.cadwolf.Surface.Scene, $scope.cadwolf.Surface.Camera ); $scope.cadwolf.Surface.Controls.update(); }
        $scope.cancel_animate = function () { console.log('Canceling animation frame'); cancelAnimationFrame( $scope.APLOT ); } 	

        // Redraw a surface
        $scope.surface.prototype.reDrawItem = function (plotObj, dataID, toRender, callback) 	
        {	if (dataID=='all')
            {   for (var dataIndex=0; dataIndex<plotObj['Surface']['Chart_dataobj'].length; dataIndex++)				
                {	if (dataIndex==plotObj['Surface']['Chart_dataobj'].length-1){ toRender=1; }else{ toRender=0; }
                    var thisID=plotObj['Surface']['Chart_dataobj'][dataIndex]['Format_id'];
                    if ((plotObj['Surface']['Chart_dataobj'][dataIndex]['type']=="Surface")||(plotObj['Surface']['Chart_dataobj'][dataIndex]['type']=="PointCloud"))
                    {	if (toRender=="1") { plotObj['Surface'].removeItem(thisID, function() { plotObj['Surface'].setSurfaceVertices(thisID, function() { plotObj['Surface'].setPlotExtremes(function() {plotObj['Surface'].setSurfaceColors( thisID, function(){plotObj['Surface'].setMeshes( thisID, function(){plotObj['Surface'].setPositions(  function(){ plotObj['Surface'].Render( 'cadwolfSurface' )} )} )} )} )} )} ); 
                        }else              { plotObj['Surface'].removeItem(thisID, function() { plotObj['Surface'].setSurfaceVertices(thisID, function() { plotObj['Surface'].setPlotExtremes(function() {plotObj['Surface'].setSurfaceColors( thisID, function(){plotObj['Surface'].setMeshes( thisID, function(){plotObj['Surface'].setPositions( )} )} )} )} )} );  }
                    }else if (plotObj['Surface']['Chart_dataobj'][dataIndex]['type']=="Line")		
                    {	if (toRender=="1") { plotObj['Surface'].removeItem(DataID,  function() {plotObj['Surface'].setLineColors( DataID, function(){plotObj['Surface'].setMeshes( DataID,  function(){plotObj['Surface'].setPositions( function(){plotObj['Surface'].Render( plotObj['Surface'].Format_plotid )} )} )} )} ); 
                        }else              { plotObj['Surface'].removeItem(DataID,  function() {plotObj['Surface'].setLineColors( DataID, function(){plotObj['Surface'].setMeshes( DataID,  function(){plotObj['Surface'].setPositions( )} )} )} );  }
                    }
                }
            }else
            {   for (var dataIndex=0; dataIndex<plotObj['Surface']['Chart_dataobj'].length; dataIndex++)				
                {	if (plotObj['Surface']['Chart_dataobj'][dataIndex]['Format_id']==dataID)
                    {   if ((plotObj['Surface']['Chart_dataobj'][dataIndex]['type']=="Surface")||(plotObj['Surface']['Chart_dataobj'][dataIndex]['type']=="PointCloud"))
                        {	if (toRender=="1") { plotObj['Surface'].removeItem(dataID, function() { plotObj['Surface'].setSurfaceVertices(dataID, function() { plotObj['Surface'].setPlotExtremes(function() {plotObj['Surface'].setSurfaceColors( dataID, function(){plotObj['Surface'].setMeshes( dataID, function(){plotObj['Surface'].setPositions(  function(){ plotObj['Surface'].Render( plotObj['Surface'].Format_plotid )} )} )} )} )} )} ); 
                            }else              { plotObj['Surface'].removeItem(dataID, function() { plotObj['Surface'].setSurfaceVertices(dataID, function() { plotObj['Surface'].setPlotExtremes(function() {plotObj['Surface'].setSurfaceColors( dataID, function(){plotObj['Surface'].setMeshes( dataID, function(){plotObj['Surface'].setPositions( )} )} )} )} )} );  }
                        }else if (plotObj['Surface']['Chart_dataobj'][dataIndex]['type']=="Line")		
                        {	if (toRender=="1") { plotObj['Surface'].removeItem(DataID,  function() {plotObj['Surface'].setLineColors( DataID, function(){plotObj['Surface'].setMeshes( DataID,  function(){plotObj['Surface'].setPositions( function(){plotObj['Surface'].Render( plotObj['Surface'].Format_plotid )} )} )} )} ); 
                            }else              { plotObj['Surface'].removeItem(DataID,  function() {plotObj['Surface'].setLineColors( DataID, function(){plotObj['Surface'].setMeshes( DataID,  function(){plotObj['Surface'].setPositions( )} )} )} );  }
                        }
                    }
                }
            }
        };	
        
        // Remove a dataset from the scene
        $scope.surface.prototype.removeItem = function (dataID, callback)				
        {	console.log('Removing '+dataID);
            var elementsInTheScene = this.Scene.children.length;		
            for ( var i = elementsInTheScene-1; i > 0; i-- ) 					
            {	if ( this.Scene.children[ i ]['name'] == dataID) { this.Scene.remove ( this.Scene.children [ i ] ); } } 
            if (typeof(callback)=="function") { callback();	}
        }								

        // Set the Legend
        $scope.surface.prototype.setLegend = function(callback)
        {	console.log('Set Legend for '+this.Format_plotid);
            if (this.Props.Legend.onOff=='1') 
            {   var plotID=this.Format_plotid, legendID=this.Format_plotid+"Legend";		
                if (this.Props.divideColormap=='0')
                {   $('#cadwolfLegend').empty();
                    Legend={};					
                    Legend.Scene=new THREE.Scene();
                    Legend.Camera = new THREE.PerspectiveCamera( 45, 8, 0.001, 10000);	
                    Legend.Camera.position.x=0;	Legend.Camera.position.y=0;		Legend.Camera.position.z=2;	
                    Legend.Camera.up = new THREE.Vector3( 0, 0, 1 );					
                    Legend.Camera.name = 'legendcamera';		
                    Legend.Keyboard = new THREEx.KeyboardState();
                    Legend.Clock = new THREE.Clock();			
                    Legend.Scene.add(Legend.Camera);			
                    if ( Detector.webgl ) { Legend.Renderer = new THREE.WebGLRenderer( {antialias:true} ); } else { Legend.Renderer = new THREE.CanvasRenderer(); }
                    Legend.Renderer.setSize(800, 50);			
                    Legend.Renderer.setClearColor( 0xFFFFFF, 1 );
                    container = document.getElementById('cadwolfLegend');				
                    container.appendChild( Legend.Renderer.domElement );				
                    Legend.Controls = new THREE.TrackballControls( Legend.Camera, Legend.Renderer.domElement );
                	this.lut = new THREE.Lut( this.Props.Legend.colorMap, this.Props.Legend.numberOfColors );
                    this.lut.setMax( this.Props.zMax );			
                    this.lut.setMin( this.Props.zMin );			
                    legend = this.lut.setLegendOn( { 'layout':'horizontal', 'position': { 'x': 0, 'y': 0, 'z': 0 } , 'dimensions': {'width':0.3, 'height':14} } );
                    Legend.Scene.add ( legend );			
                    var labels = this.lut.setLegendLabels( { 'ticks': this.Props.Legend.numTicks } );	
                    Legend.Scene.add ( labels['title'] );	
                    for ( var i = 0; i < Object.keys( labels[ 'ticks' ] ).length; i++ ) 		
                    {	 Legend.Scene.add ( labels[ 'lines' ][ i ] );}				
                    $('#cadwolfLegendTicks').empty();					
                    var width=parseInt(800/this.Props.Legend.numTicks, 10);
                    for ( var i = 0; i < this.Props.Legend.numTicks; i++ ) 
                    {	var number=this.Props.zMin+i*(this.Props.zMax-this.Props.zMin)/(this.Props.Legend.numTicks-1); 
                        $('#cadwolfLegendTicks').append('<div class="Legend_Tick">'+Math.round(10000*number)/10000+'</div>');
                    }						
                    $('#cadwolfLegendTicks').find('.Legend_Tick').css('width',width);			
                    Legend.Renderer.setClearColor( 0xFFFFFF, 1 );
                    Legend.Renderer.render( Legend.Scene, Legend.Camera ); Legend.Controls.update();
                }else							
                {	for (var dataIndex in this['Chart_dataobj'])				
                    {	this['Chart_dataobj'][dataIndex].Legend={};					
                        this['Chart_dataobj'][dataIndex].Legend.Scene=new THREE.Scene();
                        this['Chart_dataobj'][dataIndex].Legend.Camera = new THREE.PerspectiveCamera( 45, 8, 0.001, 10000);	
                        this['Chart_dataobj'][dataIndex].Legend.Camera.position.x=0;	this['Chart_dataobj'][dataIndex].Legend.Camera.position.y=0;		this['Chart_dataobj'][dataIndex].Legend.Camera.position.z=2;	
                        this['Chart_dataobj'][dataIndex].Legend.Camera.up = new THREE.Vector3( 0, 0, 1 );					
                        this['Chart_dataobj'][dataIndex].Legend.Camera.name = this['Chart_dataobj'][dataIndex]['Format_id']+'legendcamera';		
                        this['Chart_dataobj'][dataIndex].Legend.Keyboard = new THREEx.KeyboardState();
                        this['Chart_dataobj'][dataIndex].Legend.Clock = new THREE.Clock();			
                        this['Chart_dataobj'][dataIndex].Legend.Scene.add(this['Chart_dataobj'][dataIndex].Legend.Camera);			
                        if ( Detector.webgl ) { this['Chart_dataobj'][dataIndex].Legend.Renderer = new THREE.WebGLRenderer( {antialias:true} ); } else { this['Chart_dataobj'][dataIndex].Legend.Renderer = new THREE.CanvasRenderer(); }
                        this['Chart_dataobj'][dataIndex].Legend.Renderer.setSize(800, 50);			
                        this['Chart_dataobj'][dataIndex].Legend.Renderer.setClearColor( 0xFFFFFF, 1 );
                        legendID=this['Chart_dataobj'][dataIndex]['Format_id'];
                        $('#cadwolfLegend').empty();					
                        $('#cadwolfLegendTicks').empty();					
                        container = document.getElementById('cadwolfLegend');				
                        console.log('Trying to append the legend to '+legendID+'Legend');
                        container.appendChild( this['Chart_dataobj'][dataIndex].Legend.Renderer.domElement );				
                        this['Chart_dataobj'][dataIndex].Legend.Controls = new THREE.TrackballControls( this['Chart_dataobj'][dataIndex].Legend.Camera, this['Chart_dataobj'][dataIndex].Legend.Renderer.domElement );
                        var cm=this['Chart_dataobj'][dataIndex].colorMap;	
                        this['Chart_dataobj'][dataIndex].lut = new THREE.Lut( cm, this['Chart_dataobj'][dataIndex].numberOfColors );
                        this['Chart_dataobj'][dataIndex].lut.setMax( this['Chart_dataobj'][dataIndex].zMax );	
                        this['Chart_dataobj'][dataIndex].lut.setMin( this['Chart_dataobj'][dataIndex].zMin );	
                        legend = this['Chart_dataobj'][dataIndex].lut.setLegendOn( { 'layout':'horizontal', 'position': { 'x': 0, 'y': 0, 'z': 0 } , 'dimensions': {'width':0.3, 'height':14} } );
                        this['Chart_dataobj'][dataIndex].Legend.Scene.add ( legend );			
                        var labels = this['Chart_dataobj'][dataIndex].lut.setLegendLabels( { 'ticks': this['Chart_dataobj'][dataIndex].legendNumTicks } );	
                        this['Chart_dataobj'][dataIndex].Legend.Scene.add ( labels['title'] );	
                        for ( var i = 0; i < Object.keys( labels[ 'ticks' ] ).length; i++ ) {	 Legend.Scene.add ( labels[ 'lines' ][ i ] );}				
                        $('#cadwolfLegendTicks').empty();					
                        var width=parseInt(800/this['Chart_dataobj'][dataIndex]['legendNumTicks'], 10);
                        for ( var i = 0; i < this['Chart_dataobj'][dataIndex].legendNumTicks; i++ ) 
                        {	var number=this['Chart_dataobj'][dataIndex].zMin+i*(this['Chart_dataobj'][dataIndex].zMax-this['Chart_dataobj'][dataIndex].zMin)/(this['Chart_dataobj'][dataIndex].legendNumTicks-1); 
                            $('#cadwolfLegendTicks').append('<div class="Legend_Tick">'+Math.round(10000*number)/10000+'</div>');		}
                        $('#cadwolfLegendTicks').find('.Legend_Tick').css('width',width);			
                        this['Chart_dataobj'][dataIndex].Legend.Renderer.setClearColor( 0xFFFFFF, 1 );
                        this['Chart_dataobj'][dataIndex].Legend.Renderer.render( this['Chart_dataobj'][dataIndex].Legend.Scene, this['Chart_dataobj'][dataIndex].Legend.Camera ); this['Chart_dataobj'][dataIndex].Legend.Controls.update();
                    }							
                }								
            }
            myScope=$scope;
            if (typeof(callback)=="function") { callback();	}					
        };

        // Set camera and target positions
        $scope.surface.prototype.setPositions = function(callback)
        {	console.log('Set Positions');
            var PlotID=this.Format_id;	
            if ((this.Props.xCamPos==0)||(this.Props.xCamPos==-199999999998)){ this.Props.xCamPos=this.Props.xMax*2;	}
            if ((this.Props.yCamPos==0)||(this.Props.yCamPos==-199999999998)){ this.Props.yCamPos=this.Props.yMax*2;	}
            if ((this.Props.zCamPos==0)||(this.Props.zCamPos==-199999999998)){ this.Props.zCamPos=this.Props.zMax*2;	}
            this.Camera.position.x=this.Props.xCamPos;		this.Camera.position.y=this.Props.yCamPos;	this.Camera.position.z=this.Props.zCamPos;
            this.Scene.up={};	this.Scene.up.x=0;	this.Scene.up.y=0;	this.Scene.up.z=1;	
            this.Camera.position.set( parseFloat(this.Props.xCamPos), parseFloat(this.Props.yCamPos), parseFloat(this.Props.zCamPos) );	
            this.Controls.target.set( parseFloat(this.Props.xPos), parseFloat(this.Props.yPos), parseFloat(this.Props.zPos) );
            this.Camera.rotation.x=this.Props.xRot;			
            this.Camera.rotation.y=this.Props.yRot;			
            this.Camera.rotation.z=this.Props.zRot;			
            var vec=new THREE.Vector3(this.Scene.position.x, this.Scene.position.y, this.Scene.position.z );
            this.Camera.lookAt( vec );		
            this.Camera.up = new THREE.Vector3( 0, 0, 1 );			
            if (typeof(callback)=="function") { callback();	}					
        }
        
        $scope.addSurfaceDataset=function (plotObj)		        								
        {	var tempDataset=new $scope.surfaceData($scope.getID('DataSeries', 'thisFile'), plotObj['itemid'], {});
            tempDataset['series']=plotObj['Surface']['Chart_dataobj'].length;
            $scope.currentPlot['Surface']['Chart_dataobj'].push(tempDataset);
            myScope=$scope;  
        };

        $scope.deleteSurfaceDataset=function (plotObj)		        								
        {	var seriesNum="NA";
            for (var a=0; a<plotObj['Surface']['Chart_dataobj'].length; a++)
            {   if (plotObj['Surface']['Chart_dataobj'][a]['Format_id']==$scope.currentDataset['Format_id'])
                {   seriesNum=$scope.cadwolf_worksheet[index]['Plot']['Chart_dataobj']['series'];
                    $scope.cadwolf_worksheet[index]['Plot']['Chart_dataobj'].splice(a, 1);
                }
            }
            for (var a=0; a<$scope.cadwolf_worksheet[index]['Plot']['Chart_dataobj'].length; a++)
            {   if (($scope.cadwolf_worksheet[index]['Plot']['Chart_dataobj'][a]['series']>=seriesNum)&&(seriesNum!="NA"))
                {   $scope.cadwolf_worksheet[index]['Plot']['Chart_dataobj'][a]['series']=$scope.cadwolf_worksheet[index]['Plot']['Chart_dataobj'][a]['series']-1;  }   }
            myScope=$scope;  
        }

        
        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                   SURFACE MAP SECTION 4 - LINE OBJECT 

            The functions in this section deal with placing and removing items on the surface. This includes everything from the initialization 
            of the surface to the render, the reDraw, and the animation items. Included in this bank of functions are the functions to set the 
            positions of the camera and the viewer as well as the function that places the legend on the surface.
            
            setLineColors        :  Prompts     :   
                                    Inputs      :   dataID - the id of the dataset in question 
                                    Description :  
                                    
        ------------------------------------------------------------------------------------------------------------------------------------------*/


        // Set the colors for a line object
        $scope.surface.prototype.setLineColors =function (dataID, callback)			
        {	console.log('Setting Line '+dataID);
            var xOff=0, yOff=0, zOff=0, color='', point='', face='', numberOfSides=3, vertexIndex=[]; lineData=[], dataIndex=0;
            this['Chart_dataobj'].forEach(function(thisItem, thisIndex){   if (thisItem['Format_id']==dataID){ dataIndex=thisIndex; } });
            var faceIndices = [ 'a', 'b', 'c', 'd' ];	
            if ((parseInt(this['Chart_dataobj'][dataIndex].xLength)!=1)&&(this['Chart_dataobj'][dataIndex].xLength!==undefined))
            {	$('.plot_errorblock').html('Lines must have one row. The data sent had '+this['Chart_dataobj'][dataIndex].xLength+' rows and '+this['Chart_dataobj'][dataIndex].yLength+' columns'); }							
            this['Chart_dataobj'][dataIndex].lineData=[];				
            xOff=this['Chart_dataobj'][dataIndex].xOffset;				
            yOff=this['Chart_dataobj'][dataIndex].yOffset;				
            zOff=this['Chart_dataobj'][dataIndex].zOffset;				
            for (var a=0; a<this['Chart_dataobj'][dataIndex]['lineGeometry']['points'].length; a++)				
            {	if (this['Chart_dataobj'][dataIndex]['lineGeometry']['points'][a]['x']===undefined)
                {       xVal=a+parseFloat(this['Chart_dataobj'][dataIndex]['xOffset']); 
                }else { xVal=parseFloat(this['Chart_dataobj'][dataIndex]['lineGeometry']['points'][a]['x'])+parseFloat(this['Chart_dataobj'][dataIndex]['xOffset']); }
                if (this['Chart_dataobj'][dataIndex]['lineGeometry']['points'][a]['y']===undefined)
                {       yVal=a+parseFloat(this['Chart_dataobj'][dataIndex]['yOffset']); 
                }else { yVal=parseFloat(this['Chart_dataobj'][dataIndex]['lineGeometry']['points'][a]['y'])+parseFloat(this['Chart_dataobj'][dataIndex]['yOffset']); }
                if (this['Chart_dataobj'][dataIndex]['flat']==1)			
                {		zVal=a+parseFloat(this['Chart_dataobj'][dataIndex]['zOffset']); 
                }else {	zVal=parseFloat(this['Chart_dataobj'][dataIndex]['lineGeometry']['points'][a]['z'])+parseFloat(this['Chart_dataobj'][dataIndex]['zOffset']); 	}
                console.log('The x, y, and z values are '+xVal+' '+yVal+' '+zVal);
                this['Chart_dataobj'][dataIndex].lineData.push(new THREE.Vector3(xVal, yVal, zVal));				
            }
            if (this['Chart_dataobj'][dataIndex]['type']=="Line")		
            {	segments=this['Chart_dataobj'][dataIndex]['lineGeometry']['points'].length-1;
                tubeRadius=parseInt(this['Chart_dataobj'][dataIndex].lineRadius);	
                radiusSegments=parseInt(this['Chart_dataobj'][dataIndex].lineRadSegs);
                this['Chart_dataobj'][dataIndex].linePoints=new THREE.SplineCurve3(this['Chart_dataobj'][dataIndex].lineData);
                this['Chart_dataobj'][dataIndex]['surfaceGeometry'] = new THREE.TubeGeometry(this['Chart_dataobj'][dataIndex].linePoints, segments, tubeRadius, radiusSegments, false, false);	
                this['Chart_dataobj'][dataIndex].lut=new THREE.Lut( this['Chart_dataobj'][dataIndex]['colorMap'], parseInt(this['Chart_dataobj'][dataIndex]['numberOfColors']) );		
                if (this.Props.divideColormap=='0')					
                {	this.lut = new THREE.Lut( this.Props.Legend.colorMap, this.Props.Legend.numberOfColors );	
                    this.lut.setMax( this.Props.zMax );		this.lut.setMin( this.Props.zMin );	
                    if (this['Chart_dataobj'][dataIndex]['useColorData']==1)
                    {		colorData=this['Chart_dataobj'][dataIndex].cData;		
                    }else{	colorData=this['Chart_dataobj'][dataIndex]['lineGeometry']['points']; }				
                    for ( var seg = 0; seg < this['Chart_dataobj'][dataIndex]['lineGeometry']['points'].length; seg=seg+1 ) 
                    {	for ( var rad = 0; rad < this['Chart_dataobj'][dataIndex].lineRadSegs; rad=rad+1 ) 		
                        {	vertexIndex = rad + seg * radiusSegments;			
        //					temp = this.lut.getColor( this['Chart_dataobj'][dataIndex]['lineGeometry']['points'][seg]['z']);
                            if (this['Chart_dataobj'][dataIndex]['useColorData']==0){temp=this.lut.getColor( colorData[seg]['z']);	
                            }else {											key='0-'+seg;	temp=this.lut.getColor( colorData[key]); 	}
                            color = new THREE.Color( temp.r, temp.g, temp.b );	
                            color.setRGB(temp.r, temp.g, temp.b);				
                            this['Chart_dataobj'][dataIndex].surfaceGeometry.colors[vertexIndex] = color; 		
                    }	}				
                }else					
                {	this['Chart_dataobj'][dataIndex].lut = new THREE.Lut( this.Props.Legend.colorMap, this.Props.Legend.numberOfColors );	
                    if (this['Chart_dataobj'][dataIndex]['useColorData']==1)
                    {	this['Chart_dataobj'][dataIndex].lut.setMax( this['Chart_dataobj'][dataIndex].cMax );
                        this['Chart_dataobj'][dataIndex].lut.setMin( this['Chart_dataobj'][dataIndex].cMin );
                        colorData=this['Chart_dataobj'][dataIndex].cData;
                    }else				
                    {	this['Chart_dataobj'][dataIndex].lut.setMax( this['Chart_dataobj'][dataIndex].zMax );
                        this['Chart_dataobj'][dataIndex].lut.setMin( this['Chart_dataobj'][dataIndex].zMin );
                        colorData=this['Chart_dataobj'][dataIndex]['lineGeometry']['points'];
                    }					
                    for ( var seg = 0; seg < this['Chart_dataobj'][dataIndex]['lineGeometry']['points'].length; seg=seg+1 ) 
                    {	for ( var rad = 0; rad < this['Chart_dataobj'][dataIndex].lineRadSegs; rad=rad+1 ) 		
                        {	vertexIndex = rad + seg * radiusSegments;			
                            if (this['Chart_dataobj'][dataIndex]['useColorData']==0){   temp=this['Chart_dataobj'][dataIndex].lut.getColor( colorData[seg]['z']);
                            }else {														temp=this['Chart_dataobj'][dataIndex].lut.getColor( colorData['0-'+seg]);}
                            if (temp===undefined){ temp={b:0.1, g:0.1, r:0.1}; }
                            color = new THREE.Color( temp.r, temp.g, temp.b );	
                            color.setRGB(temp.r, temp.g, temp.b);				
                            this['Chart_dataobj'][dataIndex].surfaceGeometry.colors[vertexIndex] = color; 		
                }	}	}				
                for ( var i = 0; i < this['Chart_dataobj'][dataIndex].surfaceGeometry.faces.length; i=i+1 ) 		
                {	face = this['Chart_dataobj'][dataIndex].surfaceGeometry.faces[ i ];
                    numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;	
                    for( var j = 0; j < numberOfSides; j=j+1 ) 					
                    {	vertexIndex = face[ faceIndices[ j ] ];					
                        face.vertexColors[ j ] = this['Chart_dataobj'][dataIndex].surfaceGeometry.colors[ vertexIndex ];
                        this['Chart_dataobj'][dataIndex].surfaceGeometry.faces[ i ]['vertexColors'][ j ] = this['Chart_dataobj'][dataIndex].surfaceGeometry.colors[ vertexIndex ];	
                    }					
                }						
                this['Chart_dataobj'][dataIndex]['surfaceGeometry']['colorsNeedUpdate']=true;
                this['Chart_dataobj'][dataIndex]['surfaceGeometry']['elementsNeedUpdate']=true;
                this['Chart_dataobj'][dataIndex]['surfaceGeometry']['groupsNeedUpdate']=true;
                this['Chart_dataobj'][dataIndex]['surfaceGeometry']['verticesNeedUpdate']=true;
                wireMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide } );
                graphMesh = new THREE.Mesh( this['Chart_dataobj'][dataIndex].surfaceGeometry, wireMaterial );	
                graphMesh.name = dataID;
                graphMesh.id = dataID;	
                this.Scene.add(graphMesh);	
            }								
            if (typeof(callback)=="function") { callback();	}					
        };								

        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                   SURFACE MAP SECTION 5 - PREDEFINED SHAPES 

            The functions in this section deal with the predefined shapes that users can place into CADWOLF surface maps. These are really just 
            two functions that format the data and then create the shape

            formatLatheShape     :  Prompts     :   
                                    Inputs      :   dataID - the id of the dataset in question 
                                    Description :  

            createShape          :  Prompts     :   
                                    Inputs      :   thisShape - text representing the shape being created. This is "Cube", "Sphere", etc
                                                    dataID - the id of the dataset in question 
                                                    toRender - a "1" or a "0" defining whether or not the surface is ready to be rendered
                                    Description :  

        ------------------------------------------------------------------------------------------------------------------------------------------*/

        // Format Lathe Data
        $scope.surface.prototype.formatLatheData = function (plotID, dataID, callback)			
        {	console.log('Formatting Lathe Data for '+dataID+'-'+plotID);
            var dataIndex=0, key='';
            this['Chart_dataobj'].forEach(function(thisItem, thisIndex){   if (thisItem['Format_id']==dataID){ dataIndex=thisIndex; } });
            this['Chart_dataobj'][dataIndex]['curve']=[];				
            var xsize = Object.keys(this['Chart_dataobj'][dataIndex]['xData']).length;
            var ysize = Object.keys(this['Chart_dataobj'][dataIndex]['yData']).length;
            if (xsize>ysize) { var size=xsize; }else { var size=ysize; }		
            for ( var i=0; i<size; i++ ) 
            {	key='0-'+i; 			
                if (this['Chart_dataobj'][dataIndex]['xData'][key]===undefined){ xVal=i; }else{ xVal=this['Chart_dataobj'][dataIndex]['xData'][key]; }
                if (this['Chart_dataobj'][dataIndex]['yData'][key]===undefined){ yVal=0; }else{ yVal=this['Chart_dataobj'][dataIndex]['yData'][key]; }
                this['Chart_dataobj'][dataIndex]['curve'].push(new THREE.Vector3(xVal, 0, yVal));				
            }							
            if (typeof(callback)=="function") { callback();	}else{ this.createShape("Lathe", plotID, dataID, 1); }					
        };

        // Create a predefined shape
        $scope.surface.prototype.createShape = function(thisShape, plotID, dataID, toRender, callback)		
        {	console.log('Creating a '+thisShape+' for dataset '+dataID);
            var dataIndex=0, thisData={}, ps=0, pl=0, ts=0, pl=0, arc=0;					
            this['Chart_dataobj'].forEach(function(thisItem, thisIndex){   if (thisItem['Format_id']==dataID){ dataIndex=thisIndex; thisData=thisItem; } });
            this.removeItem(dataID);	
            var thisColor='#'+thisData['color'].replace(/^\#/,'');				
            var thisWireColor='#'+thisData['wireColor'].replace(/^\#/,'');		
            var darkMaterial = new THREE.MeshBasicMaterial( { color: thisColor } );
            if (this['Chart_dataobj'][dataIndex]['wireFrame']=="Wireframe"){var wireframeMaterial = new THREE.MeshBasicMaterial( { color: thisWireColor, wireframe: true, transparent: true } ); 
            }else{	                                                        var wireframeMaterial = new THREE.MeshBasicMaterial( { color: thisColor, wireframe: false, transparent: true } ); 	}
            var multiMaterial = [ darkMaterial, wireframeMaterial ]; 			
            ps=parseFloat(Big(0.0174532925).times(Big(thisData.phiStart)));		
            pl=parseFloat(Big(0.0174532925).times(Big(thisData.phiLength)));	
            ts=parseFloat(Big(0.0174532925).times(Big(thisData.thetaStart)));	
            tl=parseFloat(Big(0.0174532925).times(Big(thisData.thetaLength)));	
            arc=parseFloat(Big(0.0174532925).times(Big(thisData.arc)));			
            if (thisShape=="Cube"){	        var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.BoxGeometry(thisData.width, thisData.height, thisData.depth, thisData.widthSegs, thisData.heightSegs, thisData.depthSegs), multiMaterial );}	
            if (thisShape=="Sphere"){       var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.SphereGeometry(thisData.radius, thisData.widthSegs, thisData.heightSegs, ps, pl, ts, tl), multiMaterial );}	
            if (thisShape=="Cylinder"){	    var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.CylinderGeometry(thisData.topRadius, thisData.botRadius, thisData.height, thisData.radSegs, thisData.heightSegs, thisData.openEnded, ts, tl), multiMaterial );}	
            if (thisShape=="Dodecahedron"){	var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.DodecahedronGeometry(thisData.radius, thisData.detail), multiMaterial );}	
            if (thisShape=="Tetrahedron"){	var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.TetrahedronGeometry(thisData.radius, thisData.detail), multiMaterial );}	
            if (thisShape=="Octahedron"){	var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.OctahedronGeometry(thisData.radius, thisData.detail), multiMaterial );}
            if (thisShape=="Icosahedron"){	var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.IcosahedronGeometry(thisData.radius, thisData.detail), multiMaterial );}
            if (thisShape=="Torus"){        var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.TorusGeometry(thisData.radius, thisData.tubeDiameter, thisData.radSegs, thisData.tubeSegs, arc), multiMaterial );}
            if (thisShape=="Plane"){        var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.PlaneGeometry(thisData.width, thisData.height, thisData.widthSegs, thisData.heightSegs), multiMaterial );}
            if (thisShape=="Lathe"){        var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.LatheGeometry(thisData.curve, thisData.radSegs, ps, pl), multiMaterial );}
            if (thisShape=="Arrow")		
            {	var direct = new THREE.Vector3( parseFloat(thisData.xDir), parseFloat(thisData.yDir), parseFloat(thisData.zDir) );	
                var orig = new THREE.Vector3( parseFloat(thisData.xPosition), parseFloat(thisData.yPosition), parseFloat(thisData.zPosition) );	
                var shape = new THREE.ArrowHelper(direct, orig, thisData.length, '#'+thisData.color, thisData.aHeight, thisData.aWidth );  }
            shape.name=dataID;			
            shape.position.set(thisData.xPosition, thisData.yPosition, thisData.zPosition);	
            shape.rotation.set(0.0174532925*thisData.xRotation, 0.0174532925*thisData.yRotation, 0.0174532925*thisData.zRotation);
            this.Scene.add(shape);			
            if (toRender==1) { this.Render(plotID); }					
            if (typeof(callback)=="function") { callback();	}					
        }	


       
        // Function to set and adjust to camera data changes
        $scope.handleCameraChange = function (plotObject)
        {	plotObject['Surface']['Props']['xPos']=plotObject['Surface']['Scene']['position']['x'];
            plotObject['Surface']['Props']['yPos']=plotObject['Surface']['Scene']['position']['y'];
            plotObject['Surface']['Props']['zPos']=plotObject['Surface']['Scene']['position']['z'];
            plotObject['Surface']['Props']['xCamPos']=plotObject['Surface']['Camera']['position']['x'];
            plotObject['Surface']['Props']['yCamPos']=plotObject['Surface']['Camera']['position']['y'];
            plotObject['Surface']['Props']['zCamPos']=plotObject['Surface']['Camera']['position']['z'];
            plotObject['Surface']['Props']['xRot']=plotObject['Surface']['Camera']['rotation']['x'];
            plotObject['Surface']['Props']['yRot']=plotObject['Surface']['Camera']['rotation']['y'];
            plotObject['Surface']['Props']['zRot']=plotObject['Surface']['Camera']['rotation']['z'];
            plotObject['Surface'].setPositions(function(){ plotObject['Surface'].Render(plotObject['itemid']); });
            console.log('Resetting the camera positions to '+plotObject['Surface']['Props']['xPos']+', '+plotObject['Surface']['Props']['yPos']+', '+plotObject['Surface']['Props']['zPos']+', '+plotObject['Surface']['Props']['xCamPos']+', '+plotObject['Surface']['Props']['yCamPos']+', '+plotObject['Surface']['Props']['zCamPos']+', '+plotObject['Surface']['Props']['xRot']+', '+plotObject['Surface']['Props']['yRot']+', '+plotObject['Surface']['Props']['zRot']);
        };

        // Function to set and adjust to camera data changes
        $scope.handleSurfaceChange = function (plotObject, datasetObject)
        {	console.log('Handling the surface change for '+datasetObject['type']);
            plotObject.Surface.removeItem(datasetObject['Format_id']);			
            if ((datasetObject['type']=="Cube")||
                (datasetObject['type']=="Icosahedron")||
                (datasetObject['type']=="Tetrahedron")||
                (datasetObject['type']=="Octahedron")||
                (datasetObject['type']=="Sphere")||
                (datasetObject['type']=="Cylinder")||
                (datasetObject['type']=="Torus")||
                (datasetObject['type']=="Plane")||
                (datasetObject['type']=="Arrow"))
            {  plotObject.Surface.createShape(datasetObject['type'], plotObject['itemid'], datasetObject['Format_id'], 1);   
            }else if(datasetObject['type']=="Grid")
            {  plotObject.Surface.makeGrids(datasetObject['Format_id'], 1); 
            }else if(datasetObject['type']=="Axis")
            {  plotObject.Surface.makeAxes(datasetObject['Format_id'], 1); }
        };



    }
]);


