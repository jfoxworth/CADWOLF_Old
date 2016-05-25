// CONTROLLERS
/*
This is the main controller file for the dataset module of CADWOLF. There are two controllers that handle everything. The first one 
is the main controller and it controls two things. The first is the showing and hiding of the main options to the user when a left 
bar option is selected. The second is the importation of the data for the dataset when the page is loaded. An ajax call is made to
the server to get the data.

The second controller deals just with the data. It controls the display of which option the user is viewing to upload data. The 
options are to paste text, open a text file, grab a URL, or open an excel file. This controller also parses the text into data
and displays the text. The functions included are:


mainController

showMain            - handles the display of the main components

getInitialData      - makes the initial call to the server to grab the data

showInitialData     - places the data into the scope

showInitialError    - shows the error if the data failed to be read correctly

saveDataset         - sends the data to the server to be saved in the databases

showSaveMessage     - shows the message that the data was correctly saved

showSaveError       - shows an error message if the data was not properly saved



dataController

showData            - Simply handles the showing and hiding of the input options

checkParsers        - called whenever a parser item is checked and makes sure that two don't match

readFile            - This function simply reads in a text file that the user selects from their computer

weedTextOptions     - For text files, throws out the obviously bad stuff and creates an array of possible items

handleText          - When the user clicks on a text option offered, this function turns it "on" or "off"

hideAvailable       - When the user cancels out of the text selection, it hides those options

compileText         - When the user clicks to be finished selecting text options, this compiles the text selected as true

readExcel           - reads in an excel file, changes the parsers to meet those set

placeText           - overwrites the current dataset string or adds the current data to the string

parseText           - The function that actually looks at the input string and parses it into the matrix and data object

showText            - Handles the display of the results, letting the user see a 2D matrix by selecting the indexes desired

*/

cadwolfApp.controller('datasetController', ['$scope', '$http', '$sce', 'ngDialog',
    function($scope, $http, $sce, ngDialog)
    {   $scope.displaySettings=false;
        $scope.displayInfo=true;
        $scope.displayPaste=false;
        $scope.displayResults=false;
        $scope.infoDisplay="view_info_current";
        $scope.infoClass="leftNavTextCurrent";
        $scope.settingsDisplay="view_settings";
        $scope.settingsClass="leftNavText";
        $scope.dataDisplay="view_paste";
        $scope.dataClass="leftNavText";
        $scope.resultsDisplay="view_results";
        $scope.resultsClass="leftNavText";
        $scope.saveMessage=false;
        $scope.saveError=false;
        $scope.checkBox1=true;
        $scope.checkBox2=true;
        $scope.checkBox3=true;
        $scope.checkBox4=true;
        $scope.checkBox5=true;
        $scope.dimension1=[];
        $scope.dimension2=[];
        $scope.dimension3=[];
        $scope.dimension4=[];
        $scope.dimension5=[];
        $scope.selectBox=[];
        $scope.selectBox[1]="";
        $scope.selectBox[2]="";
        $scope.selectBox[3]="";
        $scope.selectBox[4]="";
        $scope.selectBox[5]="";
        $scope.select1="NA";
        $scope.select2="NA";
        $scope.select3=0;
        $scope.select4=0;
        $scope.select5=0;
        $scope.availableText={};
        $scope.Data={};
        $scope.dataAction="radio_overwrite";
        angular.element(document).ready(function(){ $scope.getInitialData(); });
            

        
        $scope.showMain = function(num) {
            // Shows/hides the main content
            if (num==1)
            {   $scope.displayInfo=true;            $scope.infoDisplay = "view_info_current";           $scope.infoClass = "leftNavTextCurrent";
                $scope.displaySettings=false;       $scope.settingsDisplay = "view_settings";           $scope.settingsClass = "leftNavText";
                $scope.displayPaste=false;          $scope.dataDisplay = "view_paste";                  $scope.dataClass = "leftNavText";
                $scope.displayResults=false;        $scope.resultsDisplay = "view_results";             $scope.resultsClass = "leftNavText";
                
            }
            if (num==2)
            {   $scope.displayInfo=false;           $scope.infoDisplay = "view_info";                   $scope.infoClass = "leftNavText";
                $scope.displaySettings=true;        $scope.settingsDisplay = "view_settings_current";   $scope.settingsClass = "leftNavTextCurrent";
                $scope.displayPaste=false;          $scope.dataDisplay = "view_paste";                  $scope.dataClass = "leftNavText";
                $scope.displayResults=false;        $scope.resultsDisplay = "view_results";             $scope.resultsClass = "leftNavText";
            }
            if (num==3)
            {   $scope.displayInfo=false;           $scope.infoDisplay = "view_info";                   $scope.infoClass = "leftNavText";
                $scope.displaySettings=false;       $scope.settingsDisplay = "view_settings";           $scope.settingsClass = "leftNavText";
                $scope.displayPaste=true;           $scope.dataDisplay = "view_paste_current";          $scope.dataClass = "leftNavTextCurrent";
                $scope.displayResults=false;        $scope.resultsDisplay = "view_results";             $scope.resultsClass = "leftNavText";
            }
            if (num==4)
            {   $scope.displayInfo=false;           $scope.infoDisplay = "view_info";                   $scope.infoClass = "leftNavText";
                $scope.displaySettings=false;       $scope.settingsDisplay = "view_settings";           $scope.settingsClass = "leftNavText";
                $scope.displayPaste=false;          $scope.dataDisplay = "view_paste";                  $scope.dataClass = "leftNavText";
                $scope.displayResults=true;         $scope.resultsDisplay = "view_results_current";     $scope.resultsClass = "leftNavTextCurrent";
                if ($scope.formattedData==''){   $scope.showText();   }
            }
        };

        $scope.getInitialData=function (){ $http.post('http://www.cadwolf.com/Datasets/getData', {myURL:window.location.pathname}, {}).
            then(function(response){$scope.showInitialData(response)}, function(){$scope.showInitialError()}); };

        $scope.showInitialData=function(response)
        {   if ((response.data.Dataset.dataobj!==undefined)&&(response.data.Dataset.dataobj.length!=0))
            {   var temp=JSON.parse(response.data.Dataset.dataobj);
                $scope.Data=temp.Data;
                $scope.Parsers=$scope.Data.Parsers;
                $scope.Data.showDateCreated=new Date(response.data.Dataset.created);
                $scope.Data.showDateModified=new Date(response.data.Dataset.modified);
                $scope.description=$sce.trustAsHtml(response.data.Dataset.description);
                $scope.Data.description=response.data.Dataset.description;
                $scope.formattedData=$sce.trustAsHtml($scope.Data.formattedData);
                var sizes=$scope.Data.size.split('x');
                if (sizes.length==2) {   $scope.checkBox1=false;     $scope.checkBox2=false;     $scope.checkBox3=false;      $scope.checkBox4=false;       $scope.checkBox5=false;  }
                if (sizes.length==3) {   $scope.checkBox1=true;      $scope.checkBox2=true;      $scope.checkBox3=true;       $scope.checkBox4=false;       $scope.checkBox5=false;  }
                if (sizes.length==4) {   $scope.checkBox1=true;      $scope.checkBox2=true;      $scope.checkBox3=true;       $scope.checkBox4=true;        $scope.checkBox5=false;  }
                if (sizes.length==5) {   $scope.checkBox1=true;      $scope.checkBox2=true;      $scope.checkBox3=true;       $scope.checkBox4=true;        $scope.checkBox5=true;   }
                if (sizes.length>=3) {   for (var a=0; a<sizes[0]; a++){ $scope.dimension1.push(a); }
                                        for (var a=0; a<sizes[1]; a++){ $scope.dimension2.push(a); }   
                                        for (var a=0; a<sizes[2]; a++){ $scope.dimension3.push(a); }   }
                if (sizes.length>=4) {  for (var a=0; a<sizes[3]; a++){ $scope.dimension4.push(a); }   }
                if (sizes.length>=5) {  for (var a=0; a<sizes[4]; a++){ $scope.dimension5.push(a); }   }
            }else
            {   $scope.Data={};
                $scope.Data.real={};
                $scope.Data.imag={};
                $scope.Data.string="1,2,3,4,5;6,7,8,9,10";
                $scope.Data.size="2x5";
                $scope.Data.real={};
                $scope.Data.real['0-0']=1;  $scope.Data.real['0-1']=2;  $scope.Data.real['0-2']=3;  $scope.Data.real['0-3']=4;  $scope.Data.real['0-4']=5;
                $scope.Data.real['1-0']=6;  $scope.Data.real['1-1']=7;  $scope.Data.real['1-2']=8;  $scope.Data.real['1-3']=9;  $scope.Data.real['1-4']=10;
                $scope.Parsers={};
                $scope.Parsers[0]=',';
                $scope.Parsers[1]=';';
                $scope.Parsers[2]='*';
                $scope.Parsers[3]='&';
                $scope.Parsers[4]='#';
                $scope.Data.showDateCreated=new Date(response.data.Dataset.created);
                $scope.Data.showDateModified=new Date(response.data.Dataset.modified);
                $scope.description=$sce.trustAsHtml('<p>Enter a description here</p>');
                $scope.Data.description='<p>Enter a description here</p>';
                $scope.formattedData='';     
            }
            if (response.data.Dataset.Permissions['edit']==1)
            {   var config =																																		
                {   skin: 'kama',	uiColor:'#ECECEC',	extraPlugins : 'autogrow', extraPlugins : 'sharedspace', removePlugins : 'elementspath',					
                    toolbarCanCollapse : false, width:'750', resize_enabled: false, sharedSpaces :  {  top : 'cktoolbar' },											
                    toolbar :  [ [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'Link', 'Unlink', 'Table', 'HorizontalRule', 'ShowBlocks', 'TextColor', 'BGColor', 'FontSize' ] ] 
                };
                CKEDITOR.replace( 'dataset_description', config );
                CKEDITOR.instances.dataset_description.setData($scope.Data.description);
            }else{  $scope.description=$sce.trustAsHtml(response.data.Dataset.description); 
                    document.getElementById("dataset_description").innerHTML=$scope.Data.description; }
        };

    
        $scope.showInitialError=function(setTo){
            if (setTo===undefined){ setTo=true; }
            $scope.saveError=setTo;
            if (setTo){ window.setTimeout(function(){ $scope.showSaveMessage(false)}, 3000); }            
        };
     
        $scope.saveDataset = function() 
        {   var saveVar={};
            saveVar['Data']={};
            saveVar['Data']['string']=$scope.Data.string;
            saveVar['Data']['real']=$scope.Data.real;
            saveVar['Data']['imag']=$scope.Data.imag;
            saveVar['Data']['size']=$scope.Data.size;
            saveVar['Data']['Parsers']={};
            saveVar['Data']['Parsers'][0]=$scope.Parsers[0];
            saveVar['Data']['Parsers'][1]=$scope.Parsers[1];
            saveVar['Data']['Parsers'][2]=$scope.Parsers[2];
            saveVar['Data']['Parsers'][3]=$scope.Parsers[3];
            saveVar['Data']['Parsers'][4]=$scope.Parsers[4];
            saveVar['Data']['formattedData']=document.getElementById('displayHolder').innerHTML;
            saveVar['Data']['description']=CKEDITOR.instances.dataset_description.getData();
            var stringData=JSON.stringify(saveVar);
            $http.post('http://www.cadwolf.com/Datasets/saveDataset', { myURL:window.location.pathname, myData:stringData }).then(function(){ $scope.showSaveMessage(true)}, function(){ $scope.showSaveError(true)});
        }; 

        $scope.showSaveMessage = function(setTo) {
            if (setTo===undefined){ setTo=true; }
            $scope.saveMessage=setTo;
            $scope.$apply();
            if (setTo){ window.setTimeout(function(){ $scope.showSaveMessage(false)}, 3000); }
        };

        $scope.showSaveError = function(setTo) {
            if (setTo===undefined){ setTo=true; }
            $scope.saveError=setTo;
            $scope.$apply();
            if (setTo){ window.setTimeout(function(){ $scope.showSaveError(false)}, 3000); }
        };

    
    
        $scope.showText=function()
        {   var sizes=$scope.Data.size.split('x');
            if (sizes.length==2)
            {   $scope.checkBox1=false;      $scope.checkBox2=false;      $scope.checkBox3=false;       $scope.checkBox4=false;        $scope.checkBox5=false;
                tempData='<table class="displayTable">';
                tempData=tempData+'<tr class="headerRow">';
                tempData=tempData+'<th class="headerData">&nbsp</th>';
                for (var a=0; a<sizes[1]; a++){ tempData=tempData+'<th class="headerData">'+a+'</th>'; }
                tempData=tempData+'</tr">';
                for (var a=0; a<sizes[0]; a++)
                {   tempData=tempData+'<tr class="displayRow">';
                    tempData=tempData+'<td class="headerData">'+a+'</td>';
                    for (var b=0; b<sizes[1]; b++)
                    {   key=a+'-'+b; 
                        tempData=tempData+'<td class="displayData">'+$scope.Data.real[key]+'</td>';
                    }
                    tempData=tempData+'</tr>';
                }
                tempData=tempData+'</table>';
                $scope.formattedData=$sce.trustAsHtml(tempData);
            }
            if (sizes.length==3)
            {   var size1=0, size2=0;
                $scope.checkBox1=true;      $scope.checkBox2=true;      $scope.checkBox3=true;       $scope.checkBox4=false;        $scope.checkBox5=false;
                $scope.dimension1=[];       $scope.dimension2=[];       $scope.dimension3=[];        $scope.dimension4=[];          $scope.dimension5=[];
                $scope.dimension1.push("NA");       $scope.dimension2.push("NA");       $scope.dimension3.push("NA");
                for (var a=0; a<sizes[0]; a++){ $scope.dimension1.push(a); }
                for (var a=0; a<sizes[1]; a++){ $scope.dimension2.push(a); }
                for (var a=0; a<sizes[2]; a++){ $scope.dimension3.push(a); }
                if (($scope.select1=="NA")&&($scope.select2=="NA")&&($scope.select3=="NA"))
                {   $scope.formattedData="Only two boxes can be checked as a time to show a two dimensional matrix";
                }else if ((($scope.select1!="NA")&&($scope.select2!="NA"))||(($scope.select1!="NA")&&($scope.select3!="NA"))||(($scope.select2!="NA")&&($scope.select3!="NA")))
                {   $scope.formattedData='Two boxes should be checked as "NA" to display a matrix';
                }else
                {   tempData='<table class="displayTable">';
                    if ($scope.select1=="NA"){ size1=sizes[0];}
                    if (($scope.select1=="NA")&&($scope.select2=="NA")){ size2=sizes[1];}
                    if (($scope.select1!="NA")&&($scope.select2=="NA")){ size1=sizes[1];}
                    if ($scope.select3=="NA"){ size2=sizes[2];}
                    tempData=tempData+'<tr class="headerRow">';
                    tempData=tempData+'<th class="headerData">&nbsp</th>';
                    for (var a=0; a<size2; a++){ tempData=tempData+'<th class="headerData">'+a+'</th>'; }
                    tempData=tempData+'</tr">';
                    for (var a=0; a<size1; a++)
                    {   tempData=tempData+'<tr class="displayRow">';
                        tempData=tempData+'<td class="headerData">'+a+'</td>';
                        for (var b=0; b<size2; b++)
                        {   if (($scope.select1=="NA")&&($scope.select2=="NA")){ key=a+'-'+b+'-'+$scope.select3; }
                            if (($scope.select2=="NA")&&($scope.select3=="NA")){ key=$scope.select1+'-'+a+'-'+b; }
                            if (($scope.select1=="NA")&&($scope.select3=="NA")){ key=a+'-'+$scope.select2+'-'+b; }
                            tempData=tempData+'<td class="displayData">'+$scope.Data.real[key]+'</td>';
                        }
                        tempData=tempData+'</tr>';
                    }
                    tempData=tempData+'</table>';
                    $scope.formattedData=$sce.trustAsHtml(tempData);
                }
            }
            if (sizes.length==4)
            {   var size1=0, size2=0;
                $scope.checkBox1=true;      $scope.checkBox2=true;      $scope.checkBox3=true;       $scope.checkBox4=true;        $scope.checkBox5=false;
                $scope.dimension1=[];       $scope.dimension2=[];       $scope.dimension3=[];        $scope.dimension4=[];          $scope.dimension5=[];
                $scope.dimension1.push("NA");       $scope.dimension2.push("NA");       $scope.dimension3.push("NA");   $scope.dimension4.push("NA");
                for (var a=0; a<sizes[0]; a++){ $scope.dimension1.push(a); }
                for (var a=0; a<sizes[1]; a++){ $scope.dimension2.push(a); }
                for (var a=0; a<sizes[2]; a++){ $scope.dimension3.push(a); }
                for (var a=0; a<sizes[3]; a++){ $scope.dimension4.push(a); }
                var sum=0;
                if ($scope.select1=="NA"){sum=sum+1;}
                if ($scope.select2=="NA"){sum=sum+1;}
                if ($scope.select3=="NA"){sum=sum+1;}
                if ($scope.select4=="NA"){sum=sum+1;}
                if (sum>2){   $scope.formattedData="Only two boxes can be checked as a time to show a two dimensional matrix";  }
                if (sum<2){   $scope.formattedData='Two boxes should be checked as "NA" to display a matrix';   }
                if (sum==2)
                {   var flag=0;
                    tempData='<table class="displayTable">';
                    if ($scope.select1=="NA"){ size1=sizes[0];  flag=1;}
                    if (($scope.select2=="NA")&&(flag==1)){ size2=sizes[1]; }
                    if (($scope.select2=="NA")&&(flag==0)){ size1=sizes[1]; flag=1; }
                    if (($scope.select3=="NA")&&(flag==1)){ size2=sizes[2]; }
                    if (($scope.select3=="NA")&&(flag==0)){ size1=sizes[2]; flag=1; }
                    if ($scope.select4=="NA"){ size2=sizes[3];}
                    for (var a=0; a<size1; a++)
                    {   tempData=tempData+'<tr class="displayRow">';
                        for (var b=0; b<size2; b++)
                        {   if (($scope.select1=="NA")&&($scope.select2=="NA")){ key=a+'-'+b+'-'+$scope.select3+'-'+$scope.select4; }
                            if (($scope.select1=="NA")&&($scope.select3=="NA")){ key=a+'-'+$scope.select2+'-'+b+'-'+$scope.select4; }
                            if (($scope.select1=="NA")&&($scope.select4=="NA")){ key=a+'-'+$scope.select2+'-'+$scope.select3+'-'+b; }
                            if (($scope.select2=="NA")&&($scope.select3=="NA")){ key=$scope.select1+'-'+a+'-'+b+'-'+$scope.select4; }
                            if (($scope.select2=="NA")&&($scope.select4=="NA")){ key=$scope.select1+'-'+a+'-'+$scope.select3+'-'+b; }
                            if (($scope.select3=="NA")&&($scope.select4=="NA")){ key=$scope.select1+'-'+$scope.select2+'-'+a+'-'+b; }
                            tempData=tempData+'<td class="displayData">'+$scope.Data.real[key]+'</td>';
                        }
                        tempData=tempData+'</tr>';
                    }
                    tempData=tempData+'</table>';
                    $scope.formattedData=$sce.trustAsHtml(tempData);
                }
            }

         
            if (sizes.length==5)
            {   var size1=0, size2=0;
                $scope.checkBox1=true;      $scope.checkBox2=true;      $scope.checkBox3=true;       $scope.checkBox4=true;        $scope.checkBox5=true;
                $scope.dimension1=[];       $scope.dimension2=[];       $scope.dimension3=[];        $scope.dimension4=[];          $scope.dimension5=[];
                $scope.dimension1.push("NA");       $scope.dimension2.push("NA");       $scope.dimension3.push("NA");   $scope.dimension4.push("NA");   $scope.dimension5.push("NA");
                for (var a=0; a<sizes[0]; a++){ $scope.dimension1.push(a); }
                for (var a=0; a<sizes[1]; a++){ $scope.dimension2.push(a); }
                for (var a=0; a<sizes[2]; a++){ $scope.dimension3.push(a); }
                for (var a=0; a<sizes[3]; a++){ $scope.dimension4.push(a); }
                for (var a=0; a<sizes[4]; a++){ $scope.dimension5.push(a); }
                var sum=0;
                if ($scope.select1=="NA"){sum=sum+1;}
                if ($scope.select2=="NA"){sum=sum+1;}
                if ($scope.select3=="NA"){sum=sum+1;}
                if ($scope.select4=="NA"){sum=sum+1;}
                if ($scope.select5=="NA"){sum=sum+1;}
                if (sum>2){   $scope.formattedData="Only two boxes can be checked as a time to show a two dimensional matrix";  }
                if (sum<2){   $scope.formattedData='Two boxes should be checked as "NA" to display a matrix';   }
                if (sum==2)
                {   var flag=0;
                    tempData='<table class="displayTable">';
                    if ($scope.select1=="NA"){ size1=sizes[0];  flag=1;}
                    if (($scope.select2=="NA")&&(flag==1)){ size2=sizes[1]; }
                    if (($scope.select2=="NA")&&(flag==0)){ size1=sizes[1]; flag=1; }
                    if (($scope.select3=="NA")&&(flag==1)){ size2=sizes[2]; }
                    if (($scope.select3=="NA")&&(flag==0)){ size1=sizes[2]; flag=1; }
                    if (($scope.select4=="NA")&&(flag==1)){ size2=sizes[3]; }
                    if (($scope.select4=="NA")&&(flag==0)){ size1=sizes[3]; flag=1; }
                    if ($scope.select5=="NA"){ size2=sizes[4];}
                    for (var a=0; a<size1; a++)
                    {   tempData=tempData+'<tr class="displayRow">';
                        for (var b=0; b<size2; b++)
                        {   if (($scope.select1=="NA")&&($scope.select2=="NA")){ key=a+'-'+b+'-'+$scope.select3+'-'+$scope.select4+'-'+$scope.select5; }
                            if (($scope.select1=="NA")&&($scope.select3=="NA")){ key=a+'-'+$scope.select2+'-'+b+'-'+$scope.select4+'-'+$scope.select5; }
                            if (($scope.select1=="NA")&&($scope.select4=="NA")){ key=a+'-'+$scope.select2+'-'+$scope.select3+'-'+b+'-'+$scope.select5; }
                            if (($scope.select1=="NA")&&($scope.select5=="NA")){ key=a+'-'+$scope.select2+'-'+$scope.select3+'-'+$scope.select4+'-'+b; }
                            if (($scope.select2=="NA")&&($scope.select3=="NA")){ key=$scope.select1+'-'+a+'-'+b+'-'+$scope.select4+'-'+$scope.select5; }
                            if (($scope.select2=="NA")&&($scope.select4=="NA")){ key=$scope.select1+'-'+a+'-'+$scope.select3+'-'+b+'-'+$scope.select5; }
                            if (($scope.select2=="NA")&&($scope.select5=="NA")){ key=$scope.select1+'-'+a+'-'+$scope.select3+'-'+$scope.select4+'-'+b; }
                            if (($scope.select3=="NA")&&($scope.select4=="NA")){ key=$scope.select1+'-'+$scope.select2+'-'+a+'-'+b+'-'+$scope.select5; }
                            if (($scope.select3=="NA")&&($scope.select5=="NA")){ key=$scope.select1+'-'+$scope.select2+'-'+a+'-'+$scope.select4+'-'+b; }
                            if (($scope.select4=="NA")&&($scope.select5=="NA")){ key=$scope.select1+'-'+$scope.select2+'-'+$scope.select3+'-'+a+'-'+b; }
                            tempData=tempData+'<td class="displayData">'+$scope.Data.real[key]+'</td>';
                        }
                        tempData=tempData+'</tr>';
                    }
                    tempData=tempData+'</table>';
                    $scope.formattedData=$sce.trustAsHtml(tempData);
                }
            }
            $scope.showMain(4);
        };

    
    
    
    }
]);

cadwolfApp.controller('dataController', ['$scope', '$http', '$sce', 'ngDialog',
    function($scope, $http, $sce, ngDialog)
    {   $scope.pasteClass="dataOptionCurrent";
        $scope.fileClass="dataOption";
        $scope.htmlClass="dataOption";
        $scope.excelClass="dataOption";
        $scope.dataPaste=true;
        $scope.dataFile=false;
        $scope.dataHTML=false;
        $scope.dataExcel=false;
        $scope.dataOA=false;
        $scope.dataAvailable=false;
                
        $scope.showData = function(num) {
            // Shows/hides the main content
            if (num==1)
            {   $scope.pasteClass="dataOptionCurrent";  $scope.fileClass="dataOption";          $scope.htmlClass = "dataOption";            $scope.excelClass = "dataOption";
                $scope.dataPaste=true;                  $scope.dataFile=false;                  $scope.dataHTML=false;                      $scope.dataExcel=false;                
                $scope.dataOA=false;
            }
            if (num==2)
            {   $scope.pasteClass="dataOption";         $scope.fileClass="dataOptionCurrent";   $scope.htmlClass = "dataOption";            $scope.excelClass = "dataOption";
                $scope.dataPaste=false;                 $scope.dataFile=true;                   $scope.dataHTML=false;                      $scope.dataExcel=false;                
                $scope.dataOA=true;
            }
            if (num==3)
            {   $scope.pasteClass="dataOption";         $scope.fileClass="dataOption";          $scope.htmlClass = "dataOptionCurrent";     $scope.excelClass = "dataOption";
                $scope.dataPaste=false;                 $scope.dataFile=false;                  $scope.dataHTML=true;                       $scope.dataExcel=false;                
                $scope.dataOA=true;
            }
            if (num==4)
            {   $scope.pasteClass="dataOption";         $scope.fileClass="dataOption";          $scope.htmlClass = "dataOption";            $scope.excelClass = "dataOptionCurrent";
                $scope.dataPaste=false;                 $scope.dataFile=false;                  $scope.dataHTML=false;                      $scope.dataExcel=true;                
                $scope.dataOA=true;
            }
        };
    
        $scope.checkParsers = function()
        {   for (var a in $scope.Parsers){ $scope.selectBox[a]=''; }
            for (var a in $scope.Parsers)
            {   for (b in $scope.Parsers)
                {   if (($scope.Parsers[a]==$scope.Parsers[b])&&(a!=b)){ $scope.selectBox[parseInt(a)+1]="badSelect"; $scope.selectBox[parseInt(b)+1]="badSelect"; }  }
            }
        }
                 
        $scope.readFile = function(event)
        {   myData=event;
            reader = new FileReader();
            if(event.target.files && event.target.files[0]) {           
                reader.onload = function (e) {
                    $scope.Data.newString = e.target.result;
                    $scope.weedTextOptions();
                };//end onload()
                reader.readAsText(event.target.files[0]);
            }//end if html5 filelist support
             else if(ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
                try {
                    reader = new ActiveXObject("Scripting.FileSystemObject");
                    var file = reader.OpenTextFile(event.target, 1); //ActiveX File Object
                    $scope.Data.newString = file.ReadAll(); //text contents of file
                    file.Close(); //close file "input stream"
                    $scope.weedTextOptions();
                } catch (e) {
                    if (e.number == -2146827859) {
                        alert('Unable to access local files due to browser security settings. ' + 
                         'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' + 
                         'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"'); 
                    }
                }       
            }
        };   
     
        $scope.weedTextOptions=function()
        {   var reText='';
            for (var a=0; a<5; a++){ reText=reText+"\\"+$scope.Parsers[a]; }   
            var re=new RegExp('['+reText+'0-9\.]+','g');
            $scope.availableText={};
            var textIndex=0;
            var splitText=$scope.Data.newString.match(re);
            for (var a=0; a<splitText.length; a++)
            {   if((splitText[a].match(/[0-9\.]+/)!=splitText[a])&&(splitText[a].match(/[0-9\.]+/)!=null))
                {   $scope.availableText[textIndex]={};
                    $scope.availableText[textIndex]['text']=splitText[a];
                    $scope.availableText[textIndex]['id']=textIndex;
                    $scope.availableText[textIndex]['status']=true;
                    $scope.availableText[textIndex]['parser']=$scope.Parsers[0];
                    $scope.availableText[textIndex]['textClass']="validTextBlock";
                    textIndex=textIndex+1;
                }  
            }  
            $scope.dataAvailable=true;
            $scope.$apply();
        };
                 
        $scope.handleText=function(idNumber)
        {   for (var thisNum in $scope.availableText)
            {   if (idNumber==$scope.availableText[thisNum].id) 
                {   $scope.availableText[thisNum]['status']=!$scope.availableText[thisNum]['status']; 
                    if ($scope.availableText[thisNum]['textClass']=="validTextBlock"){    $scope.availableText[thisNum]['textClass']="invalidTextBlock"; 
                                                                                }else{    $scope.availableText[thisNum]['textClass']="validTextBlock";   }
            }   }
        };

        $scope.hideAvailable=function(){   $scope.dataAvailable=false;   };

        $scope.compileText=function()
        {   $scope.dataAvailable=false;
            $scope.Data.newString='';
            for (var a=0; a<Object.keys($scope.availableText).length; a++)
            {   if($scope.availableText[a]['status']){ $scope.Data.newString=$scope.Data.newString+''+$scope.availableText[a]['text']+''+$scope.availableText[a]['parser']; }  }
            var reText='';
            for (var a=0; a<5; a++){ reText=reText+"\\"+$scope.Parsers[a]; }   
            var re=new RegExp('['+reText+']$');
            $scope.Data.newString=$scope.Data.newString.replace(re,'');
            $scope.placeText();
        };

     
        $scope.readExcel=function(e) 
        {   $scope.Data.newString='';
            var files = e.target.files;
            var i,f;
            for (i = 0, f = files[i]; i != files.length; ++i) 
            {   var reader = new FileReader();
                var name = f.name;
                reader.onload = function(e) 
                {   var data = e.target.result;
                    var workbook = XLSX.read(data, {type: 'binary'});
                    /* DO SOMETHING WITH workbook HERE */
                    var index=0;
                    for (var thisBook in workbook.Sheets)
                    {   var thisText=XLSX.utils.sheet_to_csv(workbook['Sheets'][thisBook]);
                        thisText=thisText.replace(/\,\,/g,'').replace(/[\r\n\r\n]/g,'').replace(/^\,|\,$/,'').replace(/\,/,$scope.Parsers[0]).replace(/[\r\n]/,$scope.Parsers[1]);
                        if (index==0) { $scope.Data.newString=thisText; }else { $scope.Data.newString+''+$scope.Parsers[2]+''+thisText; }
                        index++;
                    }
                    $scope.placeText(1);
                };
                reader.readAsBinaryString(f);
            }
        };

        $scope.placeText=function(doApply)
        {   if ($scope.dataAction=="radio_overwrite")   {   $scope.Data.string=$scope.Data.newString;  }
            if ($scope.dataAction=="radio_adddata")     {   $scope.Data.string=$scope.Data.string+''+$scope.Data.newString;    }
            $scope.dataAvailable=false;
            if (doApply==1){ $scope.$apply(); }
        };     
     
        $scope.parseText=function()
        {   var re4=new RegExp('['+$scope.Parsers[4]+']');
            var re3=new RegExp('['+$scope.Parsers[3]+']');
            var re2=new RegExp('['+$scope.Parsers[2]+']');
            var re1=new RegExp('['+$scope.Parsers[1]+']');
            var re0=new RegExp('['+$scope.Parsers[0]+']');
            var textArray=$scope.Data.string.split(re4);
            for (var a=0; a<textArray.length; a++)
            {   textArray[a]=textArray[a].split(re3); }
            for (var a=0; a<textArray.length; a++)
            {   for (var b=0; b<textArray[a].length; b++)
                {   textArray[a][b]=textArray[a][b].split(re2);   }
            }
            for (var a=0; a<textArray.length; a++)
            {   for (var b=0; b<textArray[a].length; b++)
                {   for (var c=0; c<textArray[a][b].length; c++)
                    {   textArray[a][b][c]=textArray[a][b][c].split(re1);     }
                } 
            }
            for (var a=0; a<textArray.length; a++)
            {   for (var b=0; b<textArray[a].length; b++)
                {   for (var c=0; c<textArray[a][b].length; c++)
                    {   for (var d=0; d<textArray[a][b][c].length; d++)
                        {   textArray[a][b][c][d]=textArray[a][b][c][d].split(re0);   }
                    } 
                } 
            }
            $scope.textArray=textArray;
            $scope.Data.real={};   
            $scope.Data.size='';   
            $scope.Data.myLength=[];
            $scope.Data.myLength[0]=0;
            $scope.Data.myLength[1]=0;
            $scope.Data.myLength[2]=0;
            $scope.Data.myLength[3]=0;
            $scope.Data.myLength[4]=0;
            for (a=0; a<5; a++){ if (textArray.length==1){ textArray=[].concat.apply([], textArray); }else { break } }
            textArray.map(function(num1, index1)
            {   if ((Array.isArray(num1))&&(num1.length>0))
                {   if (index1>$scope.Data.myLength[0]){ $scope.Data.myLength[0]=index1;   }
                    num1.map(
                        function(num2, index2)
                        {   if ((Array.isArray(num2))&&(num2.length>0))
                            {   if (index2>$scope.Data.myLength[1]){ $scope.Data.myLength[1]=index2;  }
                                num2.map(
                                    function(num3, index3)
                                    {   if ((Array.isArray(num3))&&(num3.length>0))
                                        {   if (index3>$scope.Data.myLength[2]){ $scope.Data.myLength[2]=index3;  }
                                            num3.map(
                                                function(num4, index4)
                                                {   if ((Array.isArray(num4))&&(num4.length>0))
                                                    {   if (index4>$scope.Data.myLength[3]){ $scope.Data.myLength[3]=index4;  }
                                                        num4.map(
                                                            function(num5, index5)
                                                            {   if ((Array.isArray(num5))&&(num5.length>0))
                                                                {                                                                    
                                                                }else{ $scope.Data.real[index4+'-'+index5+'-'+index1+'-'+index2+'-'+index3]=num5;  $scope.Data.imag[index4+'-'+index5+'-'+index1+'-'+index2+'-'+index3]=0; if (index5>$scope.Data.myLength[4]){ $scope.Data.myLength[4]=index5;   }}
                                                            })
                                                    }else{ $scope.Data.real[index3+'-'+index4+'-'+index1+'-'+index2]=num4; $scope.Data.imag[index3+'-'+index4+'-'+index1+'-'+index1]=0;    if (index4>$scope.Data.myLength[3]){ $scope.Data.myLength[3]=index4;   }}
                                                })
                                        }else{ $scope.Data.real[index2+'-'+index3+'-'+index1]=num3; $scope.Data.imag[index2+'-'+index3+'-'+index1]=0;  if (index3>$scope.Data.myLength[2]){ $scope.Data.myLength[2]=index3;   } }
                                    })
                            }else { $scope.Data.real[index1+'-'+index2]=num2;  $scope.Data.imag[index1+'-'+index2]=0;  if (index2>$scope.Data.myLength[1]){ $scope.Data.myLength[1]=index2;   } }
                        });
                }else{ $scope.Data.real['0-'+index1]=textArray[index1]; $scope.Data.imag['0-'+index1]=0;  if (index1>$scope.Data.myLength[0]){ $scope.Data.myLength[0]=index1;  } }
            });
            if ($scope.Data.myLength[1]>0)
            {       $scope.Data.size=(parseInt($scope.Data.myLength[0])+1)+'x'+(parseInt($scope.Data.myLength[1])+1);
            }else{  $scope.Data.size=(parseInt($scope.Data.myLength[1])+1)+'x'+(parseInt($scope.Data.myLength[0])+1);  }
            if ($scope.Data.myLength[2]>0){ $scope.Data.size=(parseInt($scope.Data.myLength[1])+1)+'x'+(parseInt($scope.Data.myLength[2])+1)+'x'+(parseInt($scope.Data.myLength[0])+1); }
            if ($scope.Data.myLength[3]>0){ $scope.Data.size=(parseInt($scope.Data.myLength[2])+1)+'x'+(parseInt($scope.Data.myLength[3])+1)+'x'+(parseInt($scope.Data.myLength[0])+1)+'x'+(parseInt($scope.Data.myLength[1])+1); }
            if ($scope.Data.myLength[4]>0){ $scope.Data.size=(parseInt($scope.Data.myLength[3])+1)+'x'+(parseInt($scope.Data.myLength[4])+1)+'x'+(parseInt($scope.Data.myLength[0])+1)+'x'+(parseInt($scope.Data.myLength[1])+1)+'x'+(parseInt($scope.Data.myLength[2])+1); }
            $scope.showText();
        };
        
          universal=$scope;
    }
]);


