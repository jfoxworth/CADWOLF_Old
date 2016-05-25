// CONTROLLERS

cadwolfApp.controller('documentController', ['$scope', '$http', '$sce', 'ngDialog',
    function($scope, $http, $sce, ngDialog)
    {  
        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                                    LEFT COLUMN ITEMS

            These items are functions related to the icons on the left most bar of the page. These items consist of buttons to change the view and
            a save file button if the user has permission. These functions include:

            showMain        :   Prompts     :   Called whenever one of the main item types is clicked on - text, equation, plot, etc
                                Inputs      :   num     :   a number representing the icon clicked on
                                Description :   This function simply takes in a number and then sets the display values to true / false accordingly.
                                                It also sets the text and icon parameters to represent the current items
                                
            saveFile        :   Prompts     :   Called when the user clicks on the icon to save the file
                                Inputs      :   Uses the $scope.cadwolf_fileInfo.id to get the ID for the file
                                Description :   Sends a message to the server to save the file. When this happens, the items are moved from the
                                                temporary database to the permanent one.
                                                
        ------------------------------------------------------------------------------------------------------------------------------------------*/

        // Shows and hides the main column elements
        $scope.showMain = function(num) 
        {   $scope.worksheetShow=false;         $scope.worksheetIcon="show_worksheet";          $scope.worksheetText="leftNavText";
            $scope.tocShow=false;               $scope.tocIcon="show_toc";                      $scope.tocText="leftNavText";
            $scope.propShow=false;              $scope.propIcon="show_file";                    $scope.propText="leftNavText";
            $scope.bibShow=false;               $scope.bibIcon="show_refs";                     $scope.bibText="leftNavText";
            $scope.inputsShow=false;            $scope.inputsIcon="show_inputs";                $scope.inputsText="leftNavText";
            $scope.datasetsShow=false;          $scope.datasetsIcon="show_datasets";            $scope.datasetsText="leftNavText";
            $scope.numbersShow=false;           $scope.numbersIcon="show_numbers";              $scope.numbersText="leftNavText";
            $scope.constantsShow=false;         $scope.constantsIcon="show_constants";          $scope.constantsText="leftNavText";
            $scope.fafShow=false;               $scope.fafIcon="show_faf";                      $scope.fafText="leftNavText";
            $scope.functionsShow=false;         $scope.functionsIcon="show_functions";          $scope.functionsText="leftNavText";
            $scope.importedShow=false;          $scope.importedIcon="show_ifuns";               $scope.importedText="leftNavText";
            $scope.bugShow=false;               $scope.bugIcon="show_bugs";                     $scope.bugText="leftNavText";

            if (num==1)  {   $scope.worksheetShow=true;     $scope.worksheetIcon="show_worksheet_current";  $scope.worksheetText="leftNavTextCurrent";  }
            if (num==2)  {   $scope.tocShow=true;           $scope.tocIcon="show_toc_current";              $scope.tocText="leftNavTextCurrent";        }
            if (num==3)  {   $scope.propShow=true;          $scope.propIcon="show_file_current";            $scope.propText="leftNavTextCurrent";       }
            if (num==4)  {   $scope.bibShow=true;           $scope.bibIcon="show_refs_current";             $scope.bibText="leftNavTextCurrent";        }
            if (num==5)  {   $scope.inputsShow=true;        $scope.inputsIcon="show_inputs_current";        $scope.inputsText="leftNavTextCurrent";     }
            if (num==6)  {   $scope.datasetsShow=true;      $scope.datasetsIcon="show_datasets_current";    $scope.datasetsText="leftNavTextCurrent";   }
            if (num==7)  {   $scope.numbersShow=true;       $scope.numbersIcon="show_numbers_current";      $scope.numbersText="leftNavTextCurrent";    }
            if (num==8)  {   $scope.constantsShow=true;     $scope.constantsIcon="show_constants_current";  $scope.constantsText="leftNavTextCurrent";  }
            if (num==9)  {   $scope.fafShow=true;           $scope.fafIcon="show_faf_current";              $scope.fafText="leftNavTextCurrent";        }
            if (num==10) {   $scope.functionsShow=true;     $scope.functionsIcon="show_functions_current";  $scope.functionsText="leftNavTextCurrent";  }
            if (num==11) {   $scope.importedShow=true;      $scope.importedIcon="show_ifuns_current";       $scope.importedText="leftNavTextCurrent";   }
            if (num==12) {   $scope.bugShow=true;           $scope.bugIcon="show_bugs_current";             $scope.bugText="leftNavTextCurrent";        }
        };
 

        
        // Shows and hides the specific window and set the current item
        $scope.saveFile = function() 
        {   $scope.updateItem($scope.currentItem);
            $http.post('http://www.cadwolf.com/Documents/saveFileAngular', {fileID:$scope.cadwolf_fileInfo.id, checkin:'0' }, {}).
            then(function(response)
             {  myResponse=response;
                myScope=$scope;
                $scope.showMessage({type:"good", messageText:"File successfully saved"}, true);
             }, function(){ $scope.showMessage({type:"bad", messageText:"There was an error saving the file. Please make sure your login didn't expire"}, true); }); 
        };
        
        
        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                                    CENTER WORKSHEET ITEMS
            These items are functions related to actions that can be taken on the main column of the worksheet view. These are functions related
            to setting a text area to be editable to deleting an item and showing messages. These functions include:

            setCurrent      :   Prompts     :   Called whenever one of the main item types is clicked on - text, equation, plot, etc
                                Inputs      :   $scope.currentItem
                                Description :   This is the main function to track changes to the document and save them. Whenever a user clicks
                                                on a main item, this function is called. The currentItem is then sent to the server to be saved.
                                                The item that was clicked on then becomes the current item.
                                                This needs to be revisited so that more criteria is set to see if item has changed and not just 
                                                clicked. There is already some logic for text items.

            showSpecs       :   Prompts     :   Called when a user clicks on one of the sprockets in the upper right of an item
                                Inputs      :   thisID :    The id of the item clicked on. Used to 
                                                type   :    string containing the type of item being clicked on - text, equation, plot, etc
                                Description :   By setting a series of variables to true/false and by setting the current* items to be the
                                                item clicked on, this function essentually populates and displays the right side bar

            showMessage     :   Prompts     :   Called from several places where an ajax function has returned an error or failed to connect, or
                                                where a file was successfully saved
                                Inputs      :   message :   an object that holds two items - messageText and messageType. The type is text which 
                                                            is either "good" or "bad" denoting the type of message to be displayed. The text is
                                                            just the text that will be displayed
                                                setTo   :   true or false for whether the item is to be shown or hidden. Initially, this should 
                                                            be set to true to display the item.
                                Description :   This function will display a box at the top of the page that is either red or green for bad or 
                                                good. It then waits 3 seconds and recalls itself with the setTo set to false to hide the message
                                                
            setCKEditor     :   Prompts     :   Whenever a user clicks on a text item - vartype=1
                                Inputs      :   itemID - the unique id for the text that was clicked on. Sent via the ng-repeat
                                                cadwolf_worksheet - main variable used to find the data 
                                Description :   Text items are placed on the DOM as simple text. Whenever the user clicks on a text item - possibly
                                                to edit it - the code checks to see of the user has edit permission and whether or not a ckeditor
                                                instance has already been created for this item. If no instance has been created and the user has
                                                permissions, then a new ckeditor instance is indeed created.
                                                
            deleteItem      :   Prompts     :   The x button on the upper right of each item
                                                The delete function whenever a user deletes an input from another file or dataset (TBD)
                                Inputs      :   $scope.cadwolf_fileInfo.id - the file id
                                                $scope.cadwolf_worksheet - to delete the affected item
                                                $scope.currentItem - the id of the item and its location
                                Description :   This function calls the server to delete an item from the document. It also removes the item from 
                                                the worksheet variable thus deleting it from the DOM and adjusts the locations of the remaining 
                                                items.
                                                --- Need to add in logic to check for affected equations
        ------------------------------------------------------------------------------------------------------------------------------------------*/
        
     
        // Set the current item, update the previous, show/hide format bar
        // The 3D charts need to have a filter to prevent circular JSON wrapper. See the "censor" item in the old code
        $scope.setCurrent = function(thisObj) 
        {   if (($scope.editPerm)||($scope.usePerm))
            {   console.log('The item id is '+thisObj['itemid']+' and the type is '+parseInt(thisObj['vartype']));
                if (document.getElementById($scope.currentItem['itemid'])!==null)
                {   $('#'+$scope.currentItem['itemid']).closest('.main_item').removeClass('current');
                    $('#'+thisObj['itemid']).closest('.main_item').addClass('current');
                    $scope.updateItem($scope.currentItem);
                    if (parseInt(thisObj['vartype'])!=1){ $scope.textShow=false;        }else{ $scope.currentText=thisObj; }
                    if (parseInt(thisObj['vartype'])!=3){ $scope.equationShow=false;    }else{ $scope.currentEquation=thisObj; }
                    if (parseInt(thisObj['vartype'])!=4){ $scope.symbolicShow=false;    }else{ $scope.currentSymbolic=thisObj; }
                    if (parseInt(thisObj['vartype'])!=5){ $scope.tableShow=false;       }else{ $scope.currentTable=thisObj; }
                    if (parseInt(thisObj['vartype'])!=6){ $scope.loopShow=false; }
                    if (parseInt(thisObj['vartype'])!=8){ $scope.statementShow=false; }
                    if (parseInt(thisObj['vartype'])!=9){ $scope.plotShow=false;        }else{ $scope.currentPlot=thisObj; }
                    if (parseInt(thisObj['vartype'])!=10){ $scope.imageShow=false;      }else{ $scope.currentImage=thisObj; }
                    if (parseInt(thisObj['vartype'])!=12){ $scope.videoShow=false;      }else{ $scope.currentTable=thisObj; }
                    if (parseInt(thisObj['vartype'])!=13){ $scope.surfaceShow=false;    }else{ $scope.currentPlot=thisObj; }
                    if (parseInt(thisObj['vartype'])==1){ $scope.formatDisplay=true;    }else{ $scope.formatDisplay=false; } 
                    if (parseInt(thisObj['vartype'])!=13){ $scope.cancel_animate(); }
                }
            }
            $scope.currentItem=thisObj;
            myScope=$scope;
        };
        
        // This function calls the AJAX to update an item
        $scope.updateItem = function(thisObj) 
        {   var hasChanged=true;
            if ($scope.editPerm)
            {   var dataObject={}, hasChanged=true, values={}, name='', values={};
                if (thisObj['vartype']==1){ if (thisObj['data']==CKEDITOR.instances[thisObj['itemid']].getData()){ hasChanged=false; console.log('Text has not changed'); } }
                if (thisObj['vartype']==1){            thisObj['data']=CKEDITOR.instances[thisObj['itemid']].getData();}
                if (thisObj['vartype']==3){            dataObject=JSON.stringify(thisObj['Equation']); 
                }else if (thisObj['vartype']==5){      dataObject=JSON.stringify(thisObj['props']);
                }else if (thisObj['vartype']==9){      dataObject=JSON.stringify(thisObj['Plot']);
                }else if (thisObj['vartype']==13){     dataObject=JSON.stringify(thisObj['Surface']);
                }else if (thisObj['vartype']==1){      dataObject=thisObj['data'];
                }else {                                dataObject=JSON.stringify(thisObj['data']); }
                if (thisObj['vartype']=='3')
                {   values['size']=thisObj['Equation']['Format_size'];
                    values['real']=thisObj['Equation']['Solution_real'];
                    values['imag']=thisObj['Equation']['Solution_imag'];
                    values['units']=thisObj['Equation']['Units_units'];
                    values['quantity']=thisObj['Equation']['Units_quantity'];
                    name=thisObj['Equation']['Format_name'];
                }
                if (hasChanged)
                {   $http.post('http://www.cadwolf.com/Documents/saveTempDataAngular', 
                    {   fileID:$scope.cadwolf_fileInfo.id, 
                        itemID:thisObj['itemid'], 
                        vartype:thisObj['vartype'], 
                        dataObject:dataObject,
                        width:thisObj['width'],
                        marginTop:thisObj['margintop'],
                        marginBottom:thisObj['marginbottom'],
                        marginLeft:thisObj['marginleft'],
                        marginRight:thisObj['marginright'],
                        values:JSON.stringify(values),
                        name:name,
                        inputID:thisObj['inputID'],
                        inputFile:thisObj['inputFile']
                    }, {}).then(function(response)
                    {  }, function(){ $scope.showMessage({type:"bad", messageText:"There was an error updating that item"}, true); }); 
                }
            }
        };


        // Shows and hides the specific window and set the current item
        $scope.showSpecs = function(thisID, type) 
        {   console.log('In the show specs, the type is '+type+' with ID '+thisID);
            if (type=="text"){          $scope.textShow=!$scope.textShow;           $scope.cadwolf_worksheet.forEach(function(item, index){   if (item.itemid==thisID){ $scope.currentText=$scope.cadwolf_worksheet[index]; }    });  }
            if (type=="equation"){      $scope.equationShow=!$scope.equationShow;   $scope.cadwolf_worksheet.forEach(function(item, index){   if (item.itemid==thisID){ $scope.currentEquation=$scope.cadwolf_worksheet[index]; }    });  }
            if (type=="symbolic"){      $scope.symbolicShow=!$scope.symbolicShow;   $scope.cadwolf_worksheet.forEach(function(item, index){   if (item.itemid==thisID){ $scope.currentSymbolic=$scope.cadwolf_worksheet[index]; }    });  }
            if (type=="table"){         $scope.tableShow=!$scope.tableShow;         $scope.cadwolf_worksheet.forEach(function(item, index){   if (item.itemid==thisID){ $scope.currentTable=$scope.cadwolf_worksheet[index]; }    });  }
            if (type=="image"){         $scope.imageShow=!$scope.imageShow;         $scope.cadwolf_worksheet.forEach(function(item, index){   if (item.itemid==thisID){ $scope.currentImage=$scope.cadwolf_worksheet[index]; }    });  }
            if (type=="plot"){          $scope.plotShow=!$scope.plotShow;           $scope.cadwolf_worksheet.forEach(function(item, index){   if (item.itemid==thisID){ $scope.currentPlot=$scope.cadwolf_worksheet[index]; }    });  }
            if (type=="video"){         $scope.videoShow=!$scope.videoShow;         $scope.cadwolf_worksheet.forEach(function(item, index){   if (item.itemid==thisID){ $scope.currentVideo=$scope.cadwolf_worksheet[index]; }    });  }
            if (type=="surface"){       $scope.surfaceShow=!$scope.surfaceShow;     $scope.cadwolf_worksheet.forEach(function(item, index){   if (item.itemid==thisID){ $scope.currentPlot=$scope.cadwolf_worksheet[index]; }    });  }
            if (type=="text"){          $scope.equationShow=false;  $scope.symbolicShow=false;    $scope.tableShow=false;     $scope.imageShow=false;     $scope.plotShow=false;      $scope.videoShow=false;     $scope.surfaceShow=false; }
            if (type=="equation"){      $scope.textShow=false;      $scope.symbolicShow=false;    $scope.tableShow=false;     $scope.imageShow=false;     $scope.plotShow=false;      $scope.videoShow=false;     $scope.surfaceShow=false; }
            if (type=="symbolic"){      $scope.textShow=false;      $scope.equationShow=false;    $scope.tableShow=false;     $scope.imageShow=false;     $scope.plotShow=false;      $scope.videoShow=false;     $scope.surfaceShow=false; }
            if (type=="table"){         $scope.textShow=false;      $scope.equationShow=false;    $scope.symbolicShow=false;  $scope.imageShow=false;     $scope.plotShow=false;      $scope.videoShow=false;     $scope.surfaceShow=false; }
            if (type=="image"){         $scope.textShow=false;      $scope.equationShow=false;    $scope.symbolicShow=false;  $scope.tableShow=false;     $scope.plotShow=false;      $scope.videoShow=false;     $scope.surfaceShow=false; }
            if (type=="plot"){          $scope.textShow=false;      $scope.equationShow=false;    $scope.symbolicShow=false;  $scope.tableShow=false;     $scope.imageShow=false;     $scope.videoShow=false;     $scope.surfaceShow=false; }
            if (type=="video"){         $scope.textShow=false;      $scope.equationShow=false;    $scope.symbolicShow=false;  $scope.tableShow=false;     $scope.imageShow=false;     $scope.plotShow=false;      $scope.surfaceShow=false; }
            if (type=="surface"){       $scope.textShow=false;      $scope.equationShow=false;    $scope.symbolicShow=false;  $scope.tableShow=false;     $scope.plotShow=false;      $scope.imageShow=false;     $scope.videoShow=false;   }
            myScope=$scope;
        };
    
        // Show and hide a message
        $scope.showMessage = function(message, setTo) 
        {   console.log('I should be showing a '+message.type+' message with '+message.messageText);
            if (setTo===undefined){ setTo=true; }
            if (message.type=="good")
            {   $scope.goodMessageText=message.messageText;  
                $scope.displayGoodMessage=setTo;
                $scope.displayBadMessage=false;
            }else if (message.type=="bad")
            {   $scope.badMessageText=message.messageText;  
                $scope.displayBadMessage=setTo;
                $scope.displayGoodMessage=false;
            }
            if (setTo){ window.setTimeout(function(){ $scope.showMessage(message, false)}, 3000); }
        };

        // Set a text space as a ckeditor
        $scope.setCKEditor=function(itemID)
        {   $scope.cadwolf_worksheet.forEach(function(item)
            {   if (itemID==item['id'])
                {   if ((CKEDITOR.instances[itemID]===undefined)&&($scope.editPerm))
                    {   var height=parseInt(document.getElementById(itemID).clientHeight);
                        var width=parseInt(document.getElementById(itemID).clientWidth);
                        var config =
                        {   skin: 'kama',	uiColor:'#ECECEC',	extraPlugins : 'autogrow', extraPlugins : 'sharedspace', removePlugins : 'elementspath', 
                            toolbarCanCollapse : false, width:width,  resize_enabled: false, sharedSpaces :  {  top : 'cktoolbar' },	
                            toolbar :  [ [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'Link', 'Unlink', 'Table', 'HorizontalRule', 'ShowBlocks', 'TextColor', 'BGColor', 'FontSize' ] ] 
                        }; 			
                        $('#'+itemID).attr('contenteditable','true');
                        $('#'+itemID).ckeditor(config);
                        CKEDITOR.instances[itemID].setData(item['data']);
                    }
                }
            });
        };        

        // Delete an item
        $scope.deleteItem = function(obj, connFlag) 
        {   console.log('Deleting '+obj['itemid']);
            $http.post('http://www.cadwolf.com/Documents/deleteItemAngular', 
            {   fileID:$scope.cadwolf_fileInfo.id, 
                itemID:obj['itemid'], 
                location:obj['location'] 
            }, {}).then(function(response)
             {  }, function(){ $scope.showMessage({type:"bad", messageText:"There was an error deleting that item"}, true); }); 
            if (connFlag!=1)
            {   for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
                {   if ($scope.cadwolf_worksheet[a]['location']>obj['location'])
                    {   $scope.cadwolf_worksheet[a]['location']=$scope.cadwolf_worksheet[a]['location']-1; }
                }
            }
            if (obj.parentid!="none") { $scope.getLastPositions();  }
            if (obj['vartype']=='3'){ $scope.findDependents(obj['itemID'], function(){ if (connFlag!=1) { $scope.runEquationDigest(); } } );	 }
            $scope.cadwolf_worksheet.forEach(function(item1, index1)
            {   if (item1['itemid']==obj['itemid'])
                {   if (obj['vartype']=='3')
                    {   for (var delID in item1['Equation']['connected_ids'])
                        {   $scope.cadwolf_worksheet.forEach(function(item2, index2){ if (item2['itemid']==delID){ $scope.deleteItem(item2, 1);  } }); }
                    }
                    $scope.cadwolf_worksheet.splice(index1,1); 
                }
            });
            myScope=$scope;            
        };
        
        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                                    FILE INFO ITEMS
            These items are functions related to views other than the main worksheet view. These functions include:
            saveFileInfo        :   Prompts     :   A user hitting "Enter" when editing the title, subtitle, description, input/output name, or
                                                    changing the preferences for the TOC.
                                    Inputs      :   cadwolf_fileInfo.input - array(s) that the data is taken from
                                    Description :   Sends the data to the server to be saved. This includes the description, tite, subtitle, TOC 
                                                    preference, file name when used as a function, inputs and outputs for FAF.
            
            addInOut            :   Prompts     :   A user hitting the button to add a new input or output on the "File as a function" view
                                    Inputs      :   cadwolf_fileInfo.input - array(s) that the data is added to
                                    Description :   The function adds a new entry to the array that holds the input or output data and then calls 
                                                    the function to save them - saveFileInfo

            deleteInputOutput   :   Prompts     :   The user hitting the delete icon on the input or output they want to delete
                                    Inputs      :   type - the text input or output for which is to be deleted
                                                    index - the number in the fileInfo.input/output array that is to be deleted
                                                    cadwolf_fileInfo.input - array(s) that the data is deleted from
                                    Description :   This function removes the item from the appropriate array, adjusts the remaining data, and
                                                    then calls the function to save that data.

            getFileFolderData   :   Prompts     :   The user hitting enter when navigating to a folder in the inputs window
                                                    The user double clicking on a folder to see the equations
                                    Inputs      :   $scope.inputLocation - a variable linked to the location URL
                                                    $scope.inputData - a variable linked to the files and folders on the left input/output window
                                                    $scope.inputEquations - variable linked to the equations on the right input/output window
                                    Description :   This function sends a URL to the server and if that URL is a folder then the response is
                                                    all of the files and folders in that workspace. If the URL is a file, all of the equations
                                                    are returned. The code stores the returned data in the appropriate variable which is linked 
                                                    to the view.
        ------------------------------------------------------------------------------------------------------------------------------------------*/
        
        // Sends data for the file to the server to be saved whenever something is changed
        $scope.saveFileInfo = function() 
        {   
            $http.post('http://www.cadwolf.com/Documents/saveFileInfo', 
            {   fileID:$scope.cadwolf_fileInfo.id,
                title:$scope.cadwolf_fileInfo.title,
                subtitle:$scope.cadwolf_fileInfo.subtitle,
                TOC:$scope.cadwolf_fileInfo.TOC,
                description:$scope.cadwolf_fileInfo.description,
                Data:JSON.stringify({References:$scope.cadwolf_references, fileFunData:$scope.cadwolf_fileFunData })
            }, {}).
            then(function(response){    $scope.showMessage({type:"good", messageText:"File Information saved"}, true);
                    }, function(){      $scope.showMessage({type:"bad", messageText:"There was an error retrieving the data from the server"}, true); }); 
        };

        // Add an input or output to the file information 
        $scope.addInOut = function(type) 
        {   var thisLoc=0;
            if (type=="input"){   var temp={}; temp['name']='Double Click to enter name'; temp['showEdit']=false; temp['number']=$scope.cadwolf_fileFunData.fileFunInputs.length; $scope.cadwolf_fileFunData.fileFunInputs.push(temp); }
            if (type=="output"){   var temp={}; temp['name']='Double Click to enter name'; temp['showEdit']=false; temp['number']=$scope.cadwolf_fileFunData.fileFunOutputs.length; $scope.cadwolf_fileFunData.fileFunOutputs.push(temp); }
        }

        // Delete an item in the file information
        $scope.deleteInputOutput = function(type, index) 
        {   if (type=="input")
            {   for (var a=0; a<$scope.cadwolf_fileInfo.inputs.length; a++)
                {   if ($scope.cadwolf_fileFunData.fileFunInputs[a]['number']==index){ $scope.cadwolf_fileFunData.fileFunInputs.splice(a,1); }
                    if ($scope.cadwolf_fileFunData.fileFunInputs[a]['number']>index){ $scope.cadwolf_fileFunData.fileFunInputs[a]['number']=$scope.cadwolf_fileFunData.fileFunInputs[a]['number']-1; }
            }   }            
            if (type=="output")
            {   for (var a=0; a<$scope.cadwolf_fileFunData.fileFunOutputs.length; a++)
                {   if ($scope.cadwolf_fileFunData.fileFunOutputs[a]['number']==index){ $scope.cadwolf_fileFunData.fileFunOutputs.splice(a,1); }
                    if ($scope.cadwolf_fileFunData.fileFunOutputs[a]['number']>index){ $scope.cadwolf_fileFunData.fileFunOutputs[a]['number']=$scope.cadwolf_fileFunData.fileFunOutputs[a]['number']-1; }
            }   }            
            $scope.saveFileInfo();
        };

        // Grab a folder information or the equations in a file for the inputs page 
        $scope.getFileFolderData = function() 
        {   $http.post('http://www.cadwolf.com/Documents/getFileFolderData', { fileURL: $scope.inputLocation.replace(/ /g,'_')}, {}).
            then(function(response)
            {   if (response.data.type=="Folder")
                {   $scope.inputData=response.data.data; 
                    $scope.inputEquations=[];
                }else {     $scope.inputEquations=response.data.data 
                            for (var a=0; a<$scope.inputEquations.length; a++)
                            {   $scope.inputEquations[a]['currentInput']=false;
                                $scope.cadwolf_worksheet.forEach(function(item, index)
                                {   if (item['vartype']=='3')
                                    {   if (item['Equation']['inputID']==$scope.inputEquations[a]['itemid']){   $scope.inputEquations[a]['currentInput']=true;  }
                                    }
                                });
                            }
                      }
            }, function(){ $scope.showMessage({type:"bad", messageText:"There was an error retrieving the data from the server"}, true); }); 
            myScope=$scope;
        };

        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                                FILE AS A FUNCTION ITEMS

            These items are functions related to to the file as a function. These functions include:
            
            FAFItem             :   Prompts     :   Called when a user clicks on the icon to add a new file as a function
                                    Inputs      :    
                                    Description :   This function creates a new file as a function item. Note that the status property reflects 
                                                    the fact that the item does not yet have a valid name and/or address
                                                    
        ------------------------------------------------------------------------------------------------------------------------------------------*/

        // The function to create a new FAF entry
        $scope.FAFItem=function (itemObj) 	
        { 	this.fileAddress="www.cadwolf.com/Documents/...";	
            this.fileID="";
            this.functionName="functionName";
            this.fileItems={};
            this.fafShowEdit=true;
            this.fafStatus=false;
            for (var item in itemObj){ this[item]=itemObj[item]; }
        }

        // The function adds a new File as a Function Item
        $scope.addFAF=function () 	{ 	$scope.cadwolf_fileFunData.impFunctions.push(new $scope.FAFItem({}));    }

        // The function to delete a defined file as a function
        $scope.deleteFAF=function (fafObject) 	
        { 	for (var a=0; a<$scope.cadwolf_fileFunData.impFunctions.length; a++)
            {   if ($scope.cadwolf_fileFunData.impFunctions[a]['fileAddress']==fafObject['fileAddress']){   $scope.cadwolf_fileFunData.impFunctions.splice(a,1); }  }
        }
        
        // Get/test the data for a submitted FAF URL
        $scope.getFafData=function (fafObject) 	
        { 	fafObject['fileAddress']=fafObject['fileAddress'].replace(/^http:\/\/www.cadwolf.com\/Documents\//,'');
            fafObject['fileAddress']=fafObject['fileAddress'].replace(/^www.cadwolf.com\/Documents\//,'');
            fafObject['fileAddress']=fafObject['fileAddress'].replace(/^cadwolf.com\/Documents\//,'');
            fafObject['fileAddress']=fafObject['fileAddress'].replace(/^\/Documents\//,'');
            fafObject['fileAddress']=fafObject['fileAddress'].replace(/^Documents\//,'');
            $http.post('http://www.cadwolf.com/Documents/getFAFData', { fafUrl: "http://www.cadwolf.com/Documents/"+fafObject['fileAddress']}, {}).
                then(function(response)
                {   var workspaceData={}, itemData={}, eqData={}, nameFlag=0;;
                    myResponse=response;
                    if (response.data=="NoPerm")
                    {   $scope.showMessage({type:"bad", messageText:"You do not have permission to use that file"}, true);                        
                    }else 
                    {   fafObject['fileID']=response.data.fileID;
                        workspaceData=JSON.parse(response.data.Workspace.fileData);
                        if(workspaceData.fileFunData.fileFunName=="")
                        {   fafObject['fafStatus']=false;    $scope.showMessage({type:"bad", messageText:"The requested file does not have a function name set"}, true);
                        }else if(workspaceData.fileFunData.fileFunInputs.length==0)
                        {   fafObject['fafStatus']=false;    $scope.showMessage({type:"bad", messageText:"The requested file does not have any inputs set"}, true);
                        }else if(workspaceData.fileFunData.fileFunOutputs.length==0)
                        {   fafObject['fafStatus']=false;    $scope.showMessage({type:"bad", messageText:"The requested file does not have any outputs set"}, true);
                        }else
                        {   for (var a=0; a<$scope.cadwolf_fileFunData.impFunctions.length; a++)
                            {   if (workspaceData.fileFunData.fileFunName==$scope.cadwolf_fileFunData.impFunctions[a]['functionName']){ nameFlag=1; } }
                            for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
                            {   if (workspaceData.fileFunData.fileFunName==$scope.cadwolf_worksheet[a]['Name']){ nameFlag=1; } }
                            if (nameFlag==1)
                            {   fafObject['fafStatus']=false;    $scope.showMessage({type:"bad", messageText:"The name for the file as a function is already taken"}, true);
                            }else
                            {   fafObject['functionName']=workspaceData.fileFunData.fileFunName;
                                fafObject['functionInputs']=workspaceData.fileFunData.fileFunInputs;
                                fafObject['functionOutputs']=workspaceData.fileFunData.fileFunOutputs;
                                fafObject['fileItems']=[];
                                for (var itemIndex=0; itemIndex<response.data.Document.length; itemIndex++)
                                {   itemData={};
                                    itemData['itemid']=JSON.parse(JSON.stringify(response.data.Document[itemIndex]['Document']['itemid']));
                                    itemData['location']=JSON.parse(JSON.stringify(response.data.Document[itemIndex]['Document']['location']));
                                    itemData['vartype']=JSON.parse(JSON.stringify(response.data.Document[itemIndex]['Document']['vartype']));
                                    itemData['fileid']=JSON.parse(JSON.stringify(response.data.Document[itemIndex]['Document']['fileid']));
                                    eqData=JSON.parse(JSON.stringify(JSON.parse(response.data.Document[itemIndex]['Document']['data'])));
                                    console.log('For Index '+itemIndex+', the name is '+eqData['Format_name']+' and the equation is '+eqData['Format_equation']);
                                    if (itemData['vartype']=='3')   
                                    {   eqData['Solution_real']={};
                                        eqData['Solution_imag']={};
                                        itemData['name']=JSON.parse(JSON.stringify(eqData['Format_name']));
                                    }
                                    itemData['Data']=JSON.parse(JSON.stringify(eqData));
                                    fafObject['fileItems'].push(itemData);
                                    fafObject['fafShowEdit']=false;
                                    fafObject['fafStatus']=true;
                                }
                                $scope.saveFileInfo();
                            }
                        }
                    }
                }, function(){ $scope.showMessage({type:"bad", messageText:"There was an error retrieving the FAF data"}, true); }); 
            myScope=$scope;
        };
        
        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                                    TOC AND BUG ITEMS
                                                                    
            These items are functions related to the table of contents window and the report a bug window. These functions include:

            getEndLoc        :      Prompts     :   When the user selects a section to be displayed on the TOC view
                                    Inputs      :   startPos - the location of the item clicked - the first to be displayed
                                                    headerLevel - text indicating the level of the header clicked - "header1", "header2", etc
                                    Description :   When the user clicks on a header item in the TOC view, this code is called to set the last
                                                    position to be displayed on the page. This is determined by finding the next header with the 
                                                    same or higher header level.

            submitBug        :      Prompts     :   A user hitting the button to submit a bug
                                    Inputs      :   The text of the bug reporting area is captured
                                    Description :   When the user clicks the button to submit a bug, this function simply sends that text to the 
                                                    server to be saved and then displays the message that the bug was saved to the user's screen.
            
        ------------------------------------------------------------------------------------------------------------------------------------------*/
        
        // Gets the location where a section ends according to headers
        $scope.getEndLoc = function(startPos, headerLevel) 
        {   var startLevel=parseInt(headerLevel.replace(/^header/,''));
            $scope.showStartLoc=startPos;
            $scope.cadwolf_worksheet=$scope.cadwolf_worksheet.sort($scope.dynamicSort("location"));
            for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if (($scope.cadwolf_worksheet[a]['location']>startPos)&&($scope.cadwolf_worksheet[a]['vartype']=='2'))
                {   if (parseInt($scope.cadwolf_worksheet[a]['data']['hClass'].replace(/^header/,''))>=startLevel) { $scope.showEndLoc=$scope.cadwolf_worksheet[a]['location']; break } } }
            myScope=$scope;
        };

        // Sends data for the file to the server to be saved whenever something is changed
        $scope.submitBug = function() 
        {   $http.post('http://www.cadwolf.com/Documents/saveBugAngular', 
            {   fileID:$scope.cadwolf_fileInfo.id,
                bugText:document.getElementById('bugdesc').value
            }, {}).
            then(function(response){    $scope.showMessage({type:"good", messageText:"Your bug was successfully saved"}, true);
            }, function(){              $scope.showMessage({type:"bad", messageText:"There was an error setting the bug"}, true); }); 
        };

        // Grabs a dataset's info
        $scope.getDataset = function(datasetURL, eqID) 
        {   
            $http.post('http://www.cadwolf.com/Documents/findDatasetAngular', 
            {   seturl:datasetURL, fileID:$scope.cadwolf_fileInfo.id
            }, {}).
            then(function(response)
            {   myResponse=response;
                $scope.showMessage({type:"good", messageText:"Dataset was found"}, true);
                var thisData=JSON.parse(response.data.datasetData);
                $scope.cadwolf_worksheet.forEach(function(item, index)
                {   if (item['itemid']==eqID)
                    {   item['Equation']['Solution_real']=thisData['Data']['real'];
                        item['Equation']['Solution_imag']=thisData['Data']['imag'];
                        item['Equation']['Format_size']=thisData['Data']['size'];
                        item['Equation']['inputID']=response.data.datasetID;
                        $scope.updateItem(item); 
                    }  
                });
            }, function(){              $scope.showMessage({type:"bad", messageText:"No dataset was found at that URL"}, true); }); 
            myScope=$scope;
        };

        // Deletes an equation that is an input
        $scope.deleteByID = function(itemID) 
        {   $scope.cadwolf_worksheet.forEach(function(item, index)
            {   if (item['vartype']=='3')
                {   console.log('Comparing '+itemID+' to '+item['Equation']['inputID']); if (itemID==item['Equation']['inputID']){  $scope.deleteItem(item);  }  }   });  };
        
        
        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                                    EDIT MENU ITEMS
            These items are functions related to the left menu that is present whenever a user has edit permissions. There are three sections to 
            this menu which include adding new items to the DOM, movign those items, and changing their width/margins. These functions include:
            
            changeLocation      :   Prompts     :   The user hits enter upon entering a location into the provided input
                                                    The user clicks on the up one or down one button
                                    Inputs      :   type - up, down, or move depending on which prompt was used
                                    Description :   This function gets the new and the old location of an item and then changes the location in 
                                                    the cadwolf_worksheet object. It also adjusts the positions of any affected items and calls
                                                    the server with a function to do these things as well
                                                    
            updateFormats       :   Prompts     :   The user hitting enter on the width or any of the margin buttons
                                    Inputs      :   none
                                    Description :   This function grabs all of the format items - the width and the margins in each direction - and
                                                    sends that information to the server to be saved. The models are already linked to the inputs
                                                    through the currentItem so those are changed already
                                                    
            addItem             :   Prompts     :   When the user clicks on any of the lines to add an item in the left meny
                                                    When an equation is returned with multiple outputs - they are stored as connected. This algorithm is
                                                    then called to add the new equations to the worksheet
                                    Inputs      :   type - a string containing the type to be entered - text, equation, etc
                                                    objProps - an object that holds the properties to be assigned to the newly created object. Can be null
                                                    connFlag - 1 if the equation is from a connected item. 0 or null if not
                                                    sentLocation - for connected equations, the location of the equation. 
                                    Description :   This function grabs the current position and then moves all later objects down one. After that,
                                                    it creates a temp object that is formatted like the type selected and enters it into the 
                                                    cadwolf_worksheet object. The server is then called to store the new item and change the locations
                                                    on the server
                                    
            getID               :   Prompts     :   called from the addItem function
                                    Inputs      :   type - a string containing the type to be entered - text, equation, etc
                                                    file - a string holding the file number
                                    Description :   This function creates a new unique id for a new item consisting of the word "File" plus the 
                                                    file number followed by the text representing the type and a unique number. This ID is then
                                                    compared against all existing ones to ensure it is unique before it is returned
        ------------------------------------------------------------------------------------------------------------------------------------------*/

        // Change the location of an item
        $scope.changeLocation = function(type) 
        {   myScope=$scope;
            var newLoc=0;
            var oldLoc=parseInt($scope.currentItem['location']);
            if (type=='up'){    newLoc=oldLoc-1; }
            if (type=='down'){  newLoc=oldLoc+1; }
            if (type=="move"){  newLoc=parseInt(document.getElementById('thislocation').value); }    
            console.log('Changing '+oldLoc+' to '+newLoc);
            if (newLoc>oldLoc)
            {   for (var a=0; a<$scope.cadwolf_worksheet.length; a++){   if (($scope.cadwolf_worksheet[a]['location']>oldLoc)&&($scope.cadwolf_worksheet[a]['location']<=newLoc))
                {   $scope.cadwolf_worksheet[a]['location']=$scope.cadwolf_worksheet[a]['location']-1; } }
                for (var a=0; a<$scope.cadwolf_worksheet.length; a++){ if ($scope.currentItem['itemid']==$scope.cadwolf_worksheet[a]['itemid']){ $scope.cadwolf_worksheet[a]['location']=newLoc; } }
            }else if (oldLoc>newLoc)
            {   for (var a=0; a<$scope.cadwolf_worksheet.length; a++){   if (($scope.cadwolf_worksheet[a]['location']>=newLoc)&&($scope.cadwolf_worksheet[a]['location']<oldLoc))
                {   $scope.cadwolf_worksheet[a]['location']=parseInt($scope.cadwolf_worksheet[a]['location'])+1; } }
                for (var a=0; a<$scope.cadwolf_worksheet.length; a++){ if ($scope.currentItem['itemid']==$scope.cadwolf_worksheet[a]['itemid']){ $scope.cadwolf_worksheet[a]['location']=newLoc; } }
            }
            $http.post('http://www.cadwolf.com/Documents/moveItemAngular', 
            {   fileID:$scope.cadwolf_fileInfo.id, itemID:$scope.currentItem['itemid'], oldLoc:oldLoc, newLoc:newLoc
            }, {}).then(function(response)
             {  }, function(){ $scope.showMessage({type:"bad", messageText:"There was an error resetting the formats"}, true); }); 
       };

        // Update the width and margins
        $scope.updateFormats = function() 
        {   $http.post('http://www.cadwolf.com/Documents/updateFormatsAngular', 
            {   fileID:$scope.cadwolf_fileInfo.id, 
                itemID:$scope.currentItem['itemid'], 
                width:$scope.currentItem['width'], 
                marginTop:$scope.currentItem['margintop'], 
                marginBottom:$scope.currentItem['marginbottom'], 
                marginLeft:$scope.currentItem['marginleft'], 
                marginRight:$scope.currentItem['marginright']
            }, {}).then(function(response)
             {  }, function(){ $scope.showMessage({type:"bad", messageText:"There was an error resetting the formats"}, true); }); 
        };
        
        $scope.retrieveLastPosition=function(itemID)
        {   for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['itemid']==itemID)
                {   if ($scope.cadwolf_worksheet[a]['parentid']=="none"){ return $scope.cadwolf_worksheet[a]['Page_lastposition']; 
                    }else { $scope.retrieveLastPosition($scope.cadwolf_worksheet[a]['parentid']) }
                }
            }
        };

        // Add an item. This is also used to add subitems. In that case, the parent and topparent are sent in the objProps object. 
        $scope.addItem = function(type, objProps, connFlag, sentLocation) 
        {   if (connFlag===undefined){connFlag=0; sentLocation=0;}
            if (objProps['parentid']===undefined){  objProps['parentid']="none";   }
            if (objProps['topparentid']===undefined){  objProps['topparentid']="none";   }
            var thisLoc=0, templateObj={}, itemData={};
            if ((connFlag==0)||(connFlag===undefined))
            {   if ($scope.currentItem=="top"){ thisLoc=0;
                }else
                {   for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
                    {   if ($scope.cadwolf_worksheet[a]['itemid']==$scope.currentItem['itemid'])
                        {   if ((($scope.currentItem['vartype']==6)||($scope.currentItem['vartype']==7)||($scope.currentItem['vartype']==8))&&(objProps['parentid']=="none"))
                            {                                           thisLoc=parseInt($scope.cadwolf_worksheet[a]['Page_lastposition']); 
                            }else if (objProps['parentid']!="none"){    thisLoc=$scope.retrieveLastPosition($scope.cadwolf_worksheet[a]['itemid']); 
                            }else  {                                    thisLoc=parseInt($scope.cadwolf_worksheet[a]['location']); }
                }   }   }
                for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
                {   if (($scope.cadwolf_worksheet[a]['Page_lastposition']=='')||($scope.cadwolf_worksheet[a]['Page_lastposition']===undefined)){ $scope.cadwolf_worksheet[a]['Page_lastposition']=parseInt($scope.cadwolf_worksheet[a]['location']); }
                    if ($scope.cadwolf_worksheet[a]['location']>thisLoc)
                    {   $scope.cadwolf_worksheet[a]['location']=parseInt($scope.cadwolf_worksheet[a]['location'])+1; 
                        $scope.cadwolf_worksheet[a]['Page_lastposition']=parseInt($scope.cadwolf_worksheet[a]['Page_lastposition'])+1; 
                }   }
                thisLoc=parseInt(parseInt(thisLoc)+parseInt(1));
            }else{  thisLoc=sentLocation; }
            var newID=$scope.getID(type, 'thisFile');
            console.log('Add a '+type+' at '+parseInt(thisLoc));
            templateObj['Name']='';
            templateObj['created']='';
            templateObj['modified']='';
            templateObj['fileid']=$scope.cadwolf_fileInfo.id;
            templateObj['inputFile']='0';
            templateObj['inputID']='';
            templateObj['itemid']=newID;
            templateObj['id']=newID;
            templateObj['location']=thisLoc;
            templateObj['Page_lastposition']=thisLoc;
            templateObj['mainwidth']='825';
            templateObj['marginbottom']='0';
            templateObj['marginleft']='0';
            templateObj['marginright']='0';
            templateObj['margintop']='0';
            templateObj['parentid']=objProps['parentid'];
            templateObj['topparentid']=objProps['topparentid'];
            templateObj['vartype']=0;
            templateObj['width']='825';
            templateObj['Values']={};
            templateObj['active']=1;
            if (objProps['fileid']===undefined){    templateObj['fileid']=$scope['cadwolf_fileInfo']['id'];   
            }else{                                  templateObj['fileid']=objProps['fileid'];  }
            for (var prop in objProps){ if (templateObj[prop]!==undefined) { templateObj[prop]=objProps[prop]; } }
            if (type=="Text")
            {   templateObj['data']='<p>Enter text here.</p>';
                templateObj['vartype']=1;
                itemData=templateObj['data'];
            }
            if (type=="Header")
            {   templateObj['data']={};
                templateObj['data']['hClass']='header1';
                templateObj['data']['text']='New Header';
                templateObj['vartype']=2;
                itemData=templateObj['data'];
            }
            if (type=="Equation")
            {   objProps['Format_id']=newID;
                templateObj['Equation']=new $scope.Equation(objProps);        
                templateObj['vartype']=3;
                for (var prop in objProps){ if (templateObj['Equation'][prop]!==undefined) { templateObj['Equation'][prop]=objProps[prop]; } }
                itemData=templateObj['Equation'];
            }
            if (type=="Symbolic")
            {   templateObj['data']={};
                templateObj['data']['text']='New Symbolic';
                templateObj['vartype']=4;
                itemData=templateObj['data'];
            }
            if (type=="Table")
            {   templateObj['props']={};
                templateObj['props']['data']=[[{'real':1, 'imag':'', 'equation':'=1', 'units':'', 'Deps':{}, 'needsUpdateFlag':0, 'showEquation':false },
                                            {'real':2, 'imag':'', 'equation':'=2', 'units':'', 'Deps':{}, 'needsUpdateFlag':0, 'showEquation':false },
                                            {'real':3, 'imag':'', 'equation':'=3', 'units':'', 'Deps':{}, 'needsUpdateFlag':0, 'showEquation':false }],
                                            [{'real':4, 'imag':'', 'equation':'=4', 'units':'', 'Deps':{}, 'needsUpdateFlag':0, 'showEquation':false }, 
                                            {'real':5, 'imag':'', 'equation':'=5', 'units':'', 'Deps':{}, 'needsUpdateFlag':0, 'showEquation':false }, 
                                            {'real':6, 'imag':'', 'equation':'=6', 'units':'', 'Deps':{}, 'needsUpdateFlag':0, 'showEquation':false }],
                                            [{'real':7, 'imag':'', 'equation':'=7', 'units':'', 'Deps':{}, 'needsUpdateFlag':0, 'showEquation':false }, 
                                            {'real':8, 'imag':'', 'equation':'=8', 'units':'', 'Deps':{}, 'needsUpdateFlag':0, 'showEquation':false }, 
                                            {'real':9, 'imag':'', 'equation':'=9', 'units':'', 'Deps':{}, 'needsUpdateFlag':0, 'showEquation':false }]];
                templateObj['props']['caption']="Table Caption";
                templateObj['props']['captionEdit']=false;
                templateObj['props']['captionOn']=true;
                templateObj['props']['rowLabels']=true;
                templateObj['props']['colLabels']=true;
                templateObj['props']['tableHeaders']=true;
                templateObj['props']['borderWidth']=1;
                templateObj['props']['tableAlign']="center";
                templateObj['vartype']=5;
                itemData=templateObj['props'];
            }         
         
            if (type=="ForLoop")
            {   templateObj['forloop']=new $scope.ForLoop({'Format_id':newID, 'fileid':$scope.cadwolf_fileInfo.id});  
                templateObj['vartype']=6;
                templateObj['type']='forloop';
                templateObj['updateClass']='itemneedsupdate';
                itemData=templateObj['forloop'];
                for (var prop in objProps){ if (templateObj['forloop'][prop]!==undefined) { templateObj['forloop'][prop]=objProps[prop]; } }
            }
            if (type=="WhileLoop")
            {   templateObj['whileloop']=new $scope.WhileLoop({'Format_id':newID, 'fileid':$scope.cadwolf_fileInfo.id});
                templateObj['vartype']=7;
                templateObj['type']='whileloop';
                templateObj['updateClass']='itemneedsupdate';
                itemData=templateObj['whileloop'];
                for (var prop in objProps){ if (templateObj['whileloop'][prop]!==undefined) { templateObj['whileloop'][prop]=objProps[prop]; } }
            }
            if ((type=="IfElse")||(type=="ElseIf")||(type=="Else"))
            {   templateObj['ifelse']=new $scope.IfElse({'Format_id':newID, 'fileid':$scope.cadwolf_fileInfo.id});  
                templateObj['vartype']=8;
                templateObj['type']='ifelse';
                if (type=="ElseIf"){    templateObj['ifelse']['Statement_Type']="elseif";     }
                if (type=="Else"){      templateObj['ifelse']['Statement_Type']="else";     }
                templateObj['updateClass']='itemneedsupdate';
                itemData=templateObj['ifelse'];
                for (var prop in objProps){ if (templateObj['ifelse'][prop]!==undefined) { templateObj['ifelse'][prop]=objProps[prop]; console.log('---- Setting '+prop+' to '+objProps[prop]); } }
            }
            if (type=="Plot")
            {   templateObj['Plot']=new $scope.Plot(newID); 
                templateObj['vartype']=9;
                itemData=templateObj['Plot'];
            }
            if (type=="Image")
            {   templateObj['data']={};
                templateObj['data']['height']=250;
                templateObj['data']['src']='sample';
                templateObj['data']['thisType']='jpg';
                templateObj['data']['type']='image/jpg';
                templateObj['data']['width']=250;
                templateObj['vartype']=10;
                itemData=templateObj['data'];
            }
            if (type=="LineBreak")
            {   templateObj['data']={};
                templateObj['vartype']=11;
                itemData=templateObj['data'];
            }
            if (type=="Video")
            {   templateObj['data']={};
                templateObj['data']['autohide']=2;
                templateObj['data']['autoplay']=0;
                templateObj['data']['color']='red';
                templateObj['data']['controls']=1;
                templateObj['data']['disablekb']=0;
                templateObj['data']['loop']=0;
                templateObj['data']['modestbranding']=0;
                templateObj['data']['related']=0;
                templateObj['data']['showinfo']=1;
                templateObj['data']['theme']='dark';
                templateObj['data']['videoHeight']='500';
                templateObj['data']['videoID']='';
                templateObj['data']['videoSource']='YouTube';
                templateObj['data']['videoStart']='';
                templateObj['data']['videoStop']='';
                templateObj['data']['videoWidth']=800;
                templateObj['vartype']=12;
                itemData=templateObj['data'];
            }
            console.log(newID+' was added to the document at location '+thisLoc);
            $scope.cadwolf_worksheet.push(templateObj);
         
            $scope.getLastPositions();

            $http.post('http://www.cadwolf.com/Documents/addItemAngular', 
            {   fileID:$scope.cadwolf_fileInfo.id, itemID:newID, location:thisLoc, varType:templateObj['vartype'], parentID:objProps['parentid'], topParentID:objProps['topparentid'], inputFile:"0", inputID:"", itemData:JSON.stringify(itemData) }, {}).
            then(function(response)
             {  }, function(){ $scope.showMessage({type:"bad", messageText:"There was an error retrieving the data from the server"}, true); }); 

            $scope.cadwolf_worksheet=$scope.cadwolf_worksheet.sort($scope.dynamicSort("location"));
            $scope.showEndLoc=$scope.cadwolf_worksheet.length;
            
            myScope=$scope;
         
            return newID
        };
        
        // Get an id for the item to be added
        $scope.getID=function(type, file) 
        {	var flag=0, topFlag=0, id='', testFlag=0, preFix='';	
            if (file!=="thisFile") { file="File"+file; }else{ file='File'+$scope.cadwolf_fileInfo['id']; }	
            if (type=="Equation") 				{ preFix='var';           topFlag=1;    
            }else if (type=="ForLoop") 			{ preFix='forLoop';       topFlag=1;    
            }else if (type=="WhileLoop") 		{ preFix='whileLoop';     topFlag=1;    
            }else if (type=="IfElse")	        { preFix='ifElse';        topFlag=1;    
            }else if (type=="ElseIf")	        { preFix='ifElse';        topFlag=1;    
            }else if (type=="Else")	            { preFix='ifElse';        topFlag=1;    
            }else if (type=="Plot")				{ preFix='plot';          topFlag=1;    
            }else if (type=="Text") 			{ preFix='text';          topFlag=1;    
            }else if (type=="Image") 			{ preFix='image';         topFlag=1;   
            }else if (type=="Video") 			{ preFix='video';         topFlag=1;    
            }else if (type=="Header") 			{ preFix='header';        topFlag=1;    
            }else if (type=="Table") 			{ preFix='Table';         topFlag=1;    
            }else if (type=="LineBreak") 		{ preFix='lineBreak';     topFlag=1;     
            }else if (type=="Symbolic")			{ preFix='sym';           topFlag=1;    
            }else if (type=="DataSeries") 		{ preFix='dataset';       topFlag=0;    
            }else if (type=="Axis") 		    { preFix='axis';          topFlag=0;    
            }else if (type=="Band") 		    { preFix='Band';          topFlag=0;    
            }else if (type=="Line") 		    { preFix='Line';          topFlag=0;    
            }else if (type=="Plottext") 		{ preFix='plotText';      topFlag=0;    
            }else if (type=="Ref") 		        { preFix='reference';     topFlag=0;    }
            if (topFlag==1)
            {   while (flag===0)	
                {   id=file+''+preFix+''+Math.floor((Math.random()*1000000)+1);
                    testFlag=0;
                    for (var a=0; a<$scope.cadwolf_worksheet.length; a++){ if ($scope.cadwolf_worksheet[a]['itemid']==id){ testFlag=1; } }
                    if (testFlag==1){ flag=0; }else{ flag=1; }
                }
            }else
            {   flag=0;
                while (flag==0)
                {   id=file+''+preFix+''+Math.floor((Math.random()*1000000)+1);
                    flag=1;
                    for (var a=0; a<$scope.cadwolf_worksheet; a++)
                    {   if ($scope.cadwolf_worksheet[a]['vartype']=='9')
                        {   for (dataInd in $scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj']) 
                            {   if ($scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'][dataInd]['Format_id']==id) { flag=0; }  } 
                            for (axisInd in $scope.cadwolf_worksheet[a]['Plot']['Chart_xaxesobj']) 
                            {   if ($scope.cadwolf_worksheet[a]['Plot']['Chart_xaxesobj'][axisInd]['Format_id']==id) { flag=0; }  } 
                            for (axisInd in $scope.cadwolf_worksheet[a]['Plot']['Chart_yaxesobj']) 
                            {   if ($scope.cadwolf_worksheet[a]['Plot']['Chart_yaxesobj'][axisInd]['Format_id']==id) { flag=0; }  } 
                            for (bandInd in $scope.cadwolf_worksheet[a]['Plot']['Chart_bandsobj']) 
                            {   if ($scope.cadwolf_worksheet[a]['Plot']['Chart_bandsobj'][bandInd]['Format_id']==id) { flag=0; }  } 
                            for (lineInd in $scope.cadwolf_worksheet[a]['Plot']['Chart_linesobj']) 
                            {   if ($scope.cadwolf_worksheet[a]['Plot']['Chart_linesobj'][lineInd]['Format_id']==id) { flag=0; }  } 
                            for (textInd in $scope.cadwolf_worksheet[a]['Plot']['Chart_textobj']) 
                            {   if ($scope.cadwolf_worksheet[a]['Plot']['Chart_textobj'][textInd]['Format_id']==id) { flag=0; }  } 
                            for (refInd in $scope.cadwolf_worksheet[a]['Plot']['references']) 
                            {   if ($scope.cadwolf_worksheet[a]['Plot']['references'][refInd]['Format_id']==id) { flag=0; }  }                         
                        }
                    }
                }
            }
            return id;	
        }	

        // Gets the last positions for structures and links up if/else statements
        $scope.getLastPositions=function() 
        {   for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if (($scope.cadwolf_worksheet[a]['vartype']==6)||($scope.cadwolf_worksheet[a]['vartype']==7)||($scope.cadwolf_worksheet[a]['vartype']==8))
                {   $scope.cadwolf_worksheet[a]['Page_lastposition']=parseInt($scope.cadwolf_worksheet[a]['location']); }
            }
            for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['parentid']!="none")
                {   $scope.setLastPosition($scope.cadwolf_worksheet[a]['parentid'], $scope.cadwolf_worksheet[a]['location']); }
            }
            for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['vartype']==8)
                {   if ($scope.cadwolf_worksheet[a]['parentStatement']!="none")
                    $scope.setLastPosition($scope.cadwolf_worksheet[a]['parentStatement'], $scope.cadwolf_worksheet[a]['Page_lastposition']); }
            }
        };

        // Sets the last positions for structures and links up if/else statements
        $scope.setLastPosition=function(setID, location) 
        {   for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['itemid']==setID)
                {   if (location>$scope.cadwolf_worksheet[a]['Page_lastposition']){   $scope.cadwolf_worksheet[a]['Page_lastposition']=parseInt(location); }
                    if ($scope.cadwolf_worksheet[a]['parentid']!="none") {   $scope.setLastPosition($scope.cadwolf_worksheet[a]['parentid'], parseInt(location)); }
            }   }
        };
        
        
        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                                    EQUATION ITEMS

            These items are functions related to the equation object. These functions include:
            
            Equation            :   Prompts     :   Called when a new equation item is created
                                                    called on load to create an equation object from the data
                                    Inputs      :   eqObj - An object containing all of the parameters that the new equation should contain. For 
                                                    new items, its just the ID. 
                                    Description :   This function creates a prototype for the equation.
                                                    
            solveEquation       :   Prompts     :   The cadwolf "digest" loop calls this function on the appropriate equation
                                    Inputs      :   eqID - the unique ID of the equation 
                                                    eqType - the type of solving to take place - simpel equation, table cell, loop parameter, etc
                                    Description :   This function is very short. It simply calls the next two functions
                                                    
            createEqObj         :   Prompts     :   Called from the solveEquation routine
                                    Inputs      :   eqID - the unique ID of the equation to be solved
                                    Description :   This function steps through the cadwolf_workspace variable and copies all equations and other
                                                    items that took place prior to the current equation on which this one might depend. This new
                                                    object is sent to the solver so that every equation isn't necessary
                                    
            callSolver          :   Prompts     :   called from the solveEquation routine
                                    Inputs      :   eqID - the unique ID of the equation 
                                                    eqType - the type of solving to take place - simpel equation, table cell, loop parameter, etc
                                    Description :   This function calls the web worker that actually solves the equation in question
        ------------------------------------------------------------------------------------------------------------------------------------------*/
        // The function to create a new equation
        $scope.Equation=function (eqObj) 	
        { 	this.Format_id=eqObj.Format_id;
            this.Original_id=eqObj.Format_id;
            if (eqObj.Format_name) { this.Format_name=eqObj.Format_name; }else { this.Format_name="TempEq"; }
            this.Format_equation='newEquation=1';
            this.Format_showequation='1';
            this.Format_showsolution='1';
            this.Format_equationinuse='';
            this.Format_right='1';
            this.Format_left='newEquation';
            this.Format_size='1x1';	
            this.Format_numinds='';	
            this.Format_type=1;		
            this.Format_haschanged=1;	
            this.Format_showtype="top";	
            this.Format_showvalue="default";
            this.Format_showcomponent='';
            this.Format_editinuse=1;
            this.Solving=1;
            this.Solution_convsol='';
            this.Solution_real={};	
            this.Solution_imag={};
            this.Solution_input_array=new Array();
            this.Solution_inputs=new Array();
            this.Solution_variable_array=new Array();
            this.Solution_key_array=new Array();
            this.Solution_unit_array=new Array();
            this.Solution_object_array=new Array();
            this.Solution_temps=new Array();
            this.Solution_PostFix=new Array();
            this.Solution_Post_Units=new Array();
            this.Solution_realdefault=0;
            this.Solution_imagdefault=0;
            this.Page_parentid='none';
            this.Page_topparentid='none';
            this.Page_position=0;
            this.Units_units='';
            this.Units_showunits='';
            this.Units_conv_units='';
            this.Units_unit_array=new Array();
            this.Units_conv_array=new Array();	
            this.Units_scaled_array=new Array();
            this.Units_base_array=[];	
            this.Units_base_string='00000000';	
            this.Units_multiplier=1;
            this.Units_quantity='';	
            this.Models_numerical='';
            this.Models_units='';	
            this.Models_dimensions='';	
            this.Models_quantities='';	
            this.Errors_flag=0;	
            this.Errors_errors=new Array();	
            this.EqObj={};		
            this.inputFile='';
            this.inputID='';
            this.inputURL='';
            this.inputType='';
            this.inputShow=true;
            this.inputName='';	
            this.active=1;	
            this.fileid=$scope.cadwolf_fileInfo.id;
            this.datasetURL='Enter URL Here';
            this.isConnectedID=0;
            this.FaF={};	this.connected_ids={};	
            for (var unitindex = 0; unitindex < $scope.unitList.length; ++unitindex) {		this.Units_base_array[$scope.unitList[unitindex]]=0;	}	
            for (var item in eqObj){ this[item]=JSON.parse(JSON.stringify(eqObj[item])); }
            this.newEquation=this.Format_equation;
        }

        $scope.isNumber=function (o) {  return ! isNaN (o-0); }
        
        // Function to solve an equation where the worker is called
        $scope.solveEquation = function(eqID, eqType)	{   $scope.createEqObj(eqID, function() { $scope.callSolver(eqID, eqType); });};

        // Create the object that is to be sent to the solver
        $scope.createEqObj=function(eqID, callback)	
        {	var sendObj={}, thisEq={}; 
	        $scope.cadwolf_worksheet.forEach(function(thisItem, index){ if (eqID==thisItem['itemid']){ thisEq=thisItem; }   });
            $scope.cadwolf_worksheet.forEach(function(item, index)
            {   if (thisEq['Page_lastposition']===undefined){ thisEq['Page_lastposition']=thisEq['location']; }
                if ($scope.cadwolf_worksheet[index]['type']!==undefined)
                {   type=$scope.cadwolf_worksheet[index]['type'];
                    if (item['Page_lastposition']===undefined){  item['Page_lastposition']=item['location'];  }
                    if (item['Page_lastposition']<item['location']){  item['Page_lastposition']=item['location'];  }
                }
                if ((item['vartype']=="3")&&(item['location']<=parseInt(thisEq['Page_lastposition'])))	
                {   sendObj[item['itemid']]={};
                    sendObj[item['itemid']]['name']=item['Equation']['Format_name'];
                    sendObj[item['itemid']]['type']="equation";
                    sendObj[item['itemid']]['size']=item['Equation']['Format_size'];
                    sendObj[item['itemid']]['real']=item['Equation']['Solution_real'];
                    sendObj[item['itemid']]['imag']=item['Equation']['Solution_imag'];
                    sendObj[item['itemid']]['realdefault']=item['Equation']['Solution_realdefault'];
                    sendObj[item['itemid']]['imagdefault']=item['Equation']['Solution_imagdefault'];
                    sendObj[item['itemid']]['units']=item['Equation']['Units_units'];
                    sendObj[item['itemid']]['numinds']=item['Equation']['Format_numinds'];
                    sendObj[item['itemid']]['basearray']=item['Equation']['Units_base_array'];
                    sendObj[item['itemid']]['location']=item['location'];
                    sendObj[item['itemid']]['equation']=item['Equation']['Format_equation'];
                    sendObj[item['itemid']]['active']=item['Equation']['active'];
                    sendObj[item['itemid']]['parentid']=item['parentid'];
                    sendObj[item['itemid']]['topparentid']=item['topparentid'];
                    sendObj[item['itemid']]['ID']=item['Equation']['Format_id'];
                    sendObj[item['itemid']]['fileid']=item['fileid'];
                }   
                if ((item['vartype']=="5")&&(item['location']<=parseInt(thisEq['Page_lastposition'])))	
                {   sendObj[item['itemid']]={}; 
                    sendObj[item['itemid']]['type']="table";
                    sendObj[item['itemid']]['location']=item['location'];	
                    sendObj[item['itemid']]['data']=item['props']['data'];
                }   
                if (((item['vartype']=="6")||(item['vartype']=="7")||(item['vartype']=="8"))&&(item['location']<=parseInt(thisEq['Page_lastposition'])))	
                {   sendObj[item['itemid']]={}; 
                    sendObj[item['itemid']]['location']=item['location'];	
                    sendObj[item['itemid']]['vartype']=item['vartype'];
                    sendObj[item['itemid']]['type']=item['type'];
                    sendObj[item['itemid']]['ID']=item['itemid'];
                    sendObj[item['itemid']]['fileid']=item['fileid'];
                    sendObj[item['itemid']]['topparentid']=item['topparentid']===undefined ? "none" :  item['topparentid'];
                    sendObj[item['itemid']]['parentid']=item['parentid']===undefined ? "none" :  item['parentid'];
                    if (item['vartype']=="6")	{   sendObj[item['itemid']]['forloop']=item['forloop']; }   
                    if (item['vartype']=="7")	{   sendObj[item['itemid']]['whileloop']=item['whileloop'];    }   
                    if (item['vartype']=="8")	{   sendObj[item['itemid']]['ifelse']=item['ifelse'];   }   
                }
                if (item['vartype']=="8")
                {   if (item['ifelse']['parentStatement']==item['itemid'])	
                    {   sendObj[item['itemid']]={}; 
                        sendObj[item['itemid']]['location']=item['location'];	
                        sendObj[item['itemid']]['vartype']=item['vartype'];
                        sendObj[item['itemid']]['type']=item['type'];
                        sendObj[item['itemid']]['ID']=item['itemid'];
                        sendObj[item['itemid']]['fileid']=item['fileid'];
                        sendObj[item['itemid']]['topparentid']=item['topparentid']===undefined ? "none" :  item['topparentid'];
                        sendObj[item['itemid']]['parentid']=item['parentid']===undefined ? "none" :  item['parentid'];
                        if (item['vartype']=="8")	{   sendObj[item['itemid']]['ifelse']=item['ifelse'];   }   
                    }
                }
                if (((item['vartype']=="9")||(item['vartype']=="13"))&&(item['location']==parseInt(thisEq['location'])))
                {	sendObj[item['itemid']]={};	
                    sendObj[item['itemid']]['name']=item['Format_id'];
                    sendObj[item['itemid']]['type']="plot";		
                    sendObj[item['itemid']]['location']=item['location'];	
                    sendObj[item['itemid']]['active']=1;	
                    sendObj[item['itemid']]['topparentid']=item['topparentid']===undefined ? "none" :  item['topparentid'];
                    sendObj[item['itemid']]['parentid']=item['parentid']===undefined ? "none" :  item['parentid'];
                    sendObj[item['itemid']]['Dependents']={};	
                    sendObj[item['itemid']]['ID']=item['Format_id'];	
                }		
            });
	        $scope.cadwolf_worksheet.forEach(function(item, index)
            {   if ((eqID==item['itemid'])&&(item['vartype']=='3')){  $scope.cadwolf_worksheet[index]['sendObj']=sendObj; }   
                if ((eqID==item['itemid'])&&(item['vartype']=='5')){  $scope.cadwolf_worksheet[index]['sendObj']=sendObj; }   
                if ((eqID==item['itemid'])&&(item['vartype']=='6')){  $scope.cadwolf_worksheet[index]['sendObj']=sendObj; }   
                if ((eqID==item['itemid'])&&(item['vartype']=='7')){  $scope.cadwolf_worksheet[index]['sendObj']=sendObj; }   
                if ((eqID==item['itemid'])&&(item['vartype']=='8')){  $scope.cadwolf_worksheet[index]['sendObj']=sendObj; }   
                if ((eqID==item['itemid'])&&(item['vartype']=='9')){  $scope.cadwolf_worksheet[index]['sendObj']=sendObj; }   
                if ((eqID==item['itemid'])&&(item['vartype']=='13')){  $scope.cadwolf_worksheet[index]['sendObj']=sendObj; }   
            });
            if (typeof(callback)=="function") { callback();	}	
        };


        // Populate the equations properties with the dependent values shown in the specs view
        $scope.populateDeps=function (eqID)	
        {   $scope.cadwolf_worksheet.forEach(function(item, index)
            {   if ((eqID==item['itemid'])&&(item['vartype']!=5))
                {   $scope.cadwolf_worksheet[index]['Equation']['DepItem1']=[];
                    $scope.cadwolf_worksheet[index]['Equation']['DepItem2']=[];
                    for (var depID in item['Equation']['Dependents']) 
                    {   $scope.cadwolf_worksheet.forEach(function(thisItem, thisIndex)
                        {   if (depID==$scope.cadwolf_worksheet[thisIndex]['itemid'])
                            {    $scope.cadwolf_worksheet[index]['Equation']['DepItem1'].push({name:$scope.cadwolf_worksheet[thisIndex]['Equation']['Format_name'], id:depID});   }
                        });
                    }
                    $scope.cadwolf_worksheet.forEach(function(thisItem, thisIndex)
                    {   if (thisItem['vartype']=='3')
                        {   for (var depID in thisItem['Equation']['Dependents']) 
                            {   if (depID==$scope.cadwolf_worksheet[index]['itemid'])
                                {    $scope.cadwolf_worksheet[index]['Equation']['DepItem2'].push({name:$scope.cadwolf_worksheet[thisIndex]['Equation']['Format_name'], id:depID});   }
                            }
                        }
                    });
                }   
            });
            myScope=$scope;
        };
        
        
        // Call the equation solver routine
        $scope.callSolver=function (eqID, eqType)	
        {	var thisEq="", thisIndex=0, thisItem={}, sendObj={}, solveObj={};
            $scope.cadwolf_worksheet.forEach(function(item, index) {   if (eqID==item['id']){ thisIndex=index; thisItem=item; } });                   
            solveObj={
                "cadwolfType":eqType, 	
                "EqID":eqID,	
                "unitList":$scope.unitList,
                "Units_Object":$scope.cadwolf_scaleUnits,
                "ParseUnits":$scope.cadwolf_parseUnits,
                "ImportedFunctions":$scope.cadwolf_fileFunData.impFunctions,
                "FileID":thisItem['fileid'],
                "Location":thisItem['location'],
                "Constants":$scope.cadwolf_constants,
                "EqObj":thisItem['sendObj']
            }    
            if (eqType=="SolveEquation")
            {   solveObj["showValue"]=thisItem['Equation']['Format_showvalue'] 
                solveObj['Equation']=thisItem['Equation']['newEquation'];
             
            }else if (eqType=="SolveTableCell")
            {   solveObj['Equation']=thisItem['props']['data'][thisItem['solveRow']][thisItem['solveCol']]['equation'].replace(/\#\./g,'#'+thisItem['itemid']);
                solveObj['tableID']=thisItem['itemid'];
                solveObj['tableRow']=thisItem['solveRow'];
                solveObj['tableCol']=thisItem['solveCol'];
                console.log('Calling the equation solver for '+eqType+' for row and column '+thisItem['solveRow']+'-'+thisItem['solveCol']);

            }else if (eqType=="SolveTableFill")
            {   solveObj['tableID']=thisItem['itemid'];
                solveObj['tableRow']=thisItem['props']['currentRow'];
                solveObj['tableCol']=thisItem['props']['currentCol'];
                solveObj['fillType']=thisItem['props']['direction'];
                solveObj['numRows']=thisItem['props']['data'].length;
                solveObj['numCols']=thisItem['props']['data'][0].length;
                console.log('Calling the equation solver for '+eqType+' starting with row and column '+thisItem['props']['currentRow']+'-'+thisItem['props']['currentCol']+' and going '+thisItem['props']['direction']+' for a total of '+thisItem['props']['data'].length+' rows and '+thisItem['props']['data'][0].length+' columns');

            }else if (eqType=="SolveLoopParameters")
            {   solveObj['LoopID']=thisItem['itemid'];
                solveObj['parentid']=thisItem['Page_parentid'];
                solveObj['topparentid']=thisItem['Page_topparentid'];	
                solveObj['loopObject']=thisItem['forloop'];	
                console.log('Calling the equation solver for '+eqType+' for the loop '+thisItem['itemid']);            

            }else if (eqType=="SolveIfElseParameters")
            {   solveObj['ID']=thisItem['itemid'];
                solveObj['firstrun']='1';
                solveObj['loopObject']=thisItem;	
                console.log('Calling the equation solver for '+eqType+' for the statement '+thisItem['itemid']);   

            }else if (eqType=="SolveWhileLoopParameters")
            {   solveObj['ID']=thisItem['itemid'];
                solveObj['firstrun']=1;
                solveObj['loopObject']=thisItem;	
                console.log('Calling the equation solver for '+eqType+' for the loop '+thisItem['itemid']);   

            }else if (eqType=="SolveStructure")
            {   solveObj['ID']=thisItem['itemid'];
                solveObj['firstrun']=1;
                console.log('Calling the equation solver for '+eqType+' for the structure '+thisItem['itemid']);   
            }         
             
            myScope=$scope;
            equationWorker.postMessage( solveObj );	

         
            equationWorker.onmessage = function(e) {	
                returnObject=e.data;	
                if (returnObject.messageType=="EquationResult")	
                {	$scope.cadwolf_worksheet.forEach(function(item, index)
                    {   if (returnObject.id==item['id'])
                        {   if (Object.keys(returnObject.connected).length>0)
                            {   for (var connID in item['Equation']['connected_ids']){ $scope.cadwolf_worksheet.forEach(function(tempItem, tempIndex){ if (tempItem['itemid']==connID) { $scope.deleteItem(tempItem, 1); } }); }
                                item['Equation']['connected_ids']={};
                                for (var connItem in returnObject.connected)
                                {   delete returnObject.connected[connItem]['Format_id'];
                                    returnObject.connected[connItem]['Original_id']=returnObject.id;
                                    returnObject.connected[connItem]['isConnectedID']=1;
                        tempItem=returnObject.connected[connItem];
                                    var connectedID=$scope.addItem('Equation', returnObject.connected[connItem], 1, item['location']);
                                    item['Equation']['connected_ids'][connectedID]=1;
                                }   
                            }
                            for (objProp in returnObject.equation) { $scope.cadwolf_worksheet[index]['Equation'][objProp]=returnObject.equation[objProp]; }
                            $scope.cadwolf_worksheet[index]['needsUpdateFlag']=0;
                            console.log('Turning off the flag for '+$scope.cadwolf_worksheet[index]['itemid']);
                            $scope.cadwolf_worksheet[index]['Name']=returnObject.equation['Format_name'];
                            $scope.cadwolf_worksheet[index]['Values']={};
                            $scope.cadwolf_worksheet[index]['Values']['real']=returnObject.equation['Solution_real'];
                            $scope.cadwolf_worksheet[index]['Values']['imag']=returnObject.equation['Solution_imag'];
                            $scope.cadwolf_worksheet[index]['Values']['size']=returnObject.equation['Format_size'];
                            $scope.cadwolf_worksheet[index]['Values']['units']=returnObject.equation['Units_units'];
                            $scope.cadwolf_worksheet[index]['Values']['quantity']=returnObject.equation['Units_quantity'];
                            $scope.cadwolf_worksheet[index]['Equation']['Dependents']=returnObject.Deps;
                            $scope.digestStatus=1;
                            $scope.populateDeps(item['id']);
                            $scope.updateItem(item);
                            $scope.findDependents(returnObject.id, function(){ $scope.runEquationDigest(); });
                        }
                    });
                }	
                if (returnObject.messageType=="TableCellResult") 		
                {	$scope.cadwolf_worksheet.forEach(function(item, index)
                    {   if (returnObject['Equation']['tableID']==item['itemid'])
                        {   item['props']['data'][returnObject['Equation']['tableRow']][returnObject['Equation']['tableCol']]['needsUpdateFlag']=0;
                            console.log('Turning off the flag for '+item['itemid']+' row '+returnObject['Equation']['tableRow']+' and column '+returnObject['Equation']['tableCol']);
                            item['props']['data'][returnObject['Equation']['tableRow']][returnObject['Equation']['tableCol']]['real']=returnObject['Equation']['Solution_real']['0-0'];
                            if (returnObject['Equation']['Solution_imag']['0-0']===undefined)
                            {       item['props']['data'][returnObject['Equation']['tableRow']][returnObject['Equation']['tableCol']]['imag']=0;
                            }else{  item['props']['data'][returnObject['Equation']['tableRow']][returnObject['Equation']['tableCol']]['imag']=returnObject['Equation']['Solution_imag']['0-0']; }
                            item['props']['data'][returnObject['Equation']['tableRow']][returnObject['Equation']['tableCol']]['units']=returnObject['Equation']['Units_units'];
                            item['props']['data'][returnObject['Equation']['tableRow']][returnObject['Equation']['tableCol']]['Deps']=returnObject['Deps'];
                            $scope.digestStatus=1;
                            var returnID=returnObject['Equation']['tableID']+'.'+String.fromCharCode(65+returnObject['Equation']['tableCol'])+'.'+returnObject['Equation']['tableRow'];
                            if (returnObject['Equation']['Errors_flag']==1)
                            {   item['props']['data'][returnObject['Equation']['tableRow']][returnObject['Equation']['tableCol']]['real']=returnObject['Equation']['Format_showequation']; }
                            $scope.findDependents(returnID, function(){ $scope.runEquationDigest(); });
                        }
                    });
                }
                if (returnObject.messageType=="FullTable") 		
                {	for (var a=0; a<returnObject.tableData.length; a++)
                    {   for (var b=0; b<returnObject.tableData[0].length; b++)
                        {   if (returnObject.tableData[a][b]['imag']==''){ returnObject.tableData[a][b]['imag']=0; } 
                            if (typeof(returnObject.tableData[a][b]['units'])==object){ returnObject.tableData[a][b]['units']=''; } 
                            if (returnObject.tableData[a][b]['needsUpdateFlag']==1)
                            {   returnObject.tableData[a][b]['needsUpdateFlag']=0; 
                                $scope.setDependentsOn(returnObject.tableID+'.'+String.fromCharCode(65+b)+'.'+a, 0);
                            }
                        }
                    }
                    $scope.cadwolf_worksheet.forEach(function(item, index)
                    {   if (returnObject['tableID']==item['itemid']){   item['props']['data']=returnObject['tableData'];    }
                        $scope.runEquationDigest();
                    });
                }
                if (returnObject.messageType=="LoopParametersResult") 		
                {	$scope.cadwolf_worksheet.forEach(function(item, index)
                    {   if (returnObject.ID==item['itemid'])
                        {   $scope.cadwolf_worksheet[index]['needsBlockUpdate']=0;
                            $scope.cadwolf_worksheet[index]['forloop']['Dependents']=returnObject['loopObject']['Dependents'];
                            $scope.cadwolf_worksheet[index]['forloop']['start']=returnObject['loopObject']['start'];
                            $scope.cadwolf_worksheet[index]['forloop']['stop']=returnObject['loopObject']['stop'];
                            $scope.cadwolf_worksheet[index]['forloop']['increment']=returnObject['loopObject']['increment'];
                            $scope.cadwolf_worksheet[index]['forloop']['numsteps']=returnObject['loopObject']['numsteps'];
                            $scope.digestStatus=1;
                            $scope.runEquationDigest();
                        }
                    });
                }
                if (returnObject.messageType=="WhileLoopParametersResult") 	
                {	$scope.cadwolf_worksheet.forEach(function(item, index)
                    {   if (returnObject.ID==item['itemid'])
                        {   $scope.cadwolf_worksheet[index]['needsBlockUpdate']=0;
                            $scope.cadwolf_worksheet[index]['whileloop']['Dependents']=returnObject['loopObject']['whileloop']['Dependents'];
                            $scope.cadwolf_worksheet[index]['whileloop']['Loop_Values']=returnObject['loopObject']['whileloop']['Loop_Values'];
                            $scope.cadwolf_worksheet[index]['whileloop']['Loop_String']=returnObject['loopObject']['whileloop']['Loop_String'];
                            $scope.cadwolf_worksheet[index]['whileloop']['Loop_TFString']=returnObject['loopObject']['whileloop']['Loop_TFString'];
                            $scope.cadwolf_worksheet[index]['whileloop']['ValueString']=returnObject['loopObject']['whileloop']['Loop_ValueString'];
                            $scope.cadwolf_worksheet[index]['whileloop']['Loop_truefalse']=returnObject['loopObject']['whileloop']['Loop_truefalse'];   
                            for (var a=0; a<$scope.cadwolf_worksheet[index]['whileloop']['statementBlock'].length; a++)
                            {   for (var b=0; b<$scope.cadwolf_worksheet[index]['whileloop']['statementBlock'][0].length; b++)
                                {   $scope.cadwolf_worksheet[index]['whileloop']['statementBlock'][a][b]['truefalse']=returnObject['loopObject']['whileloop']['statementBlock'][a][b]['truefalse'];
                                    if ($scope.cadwolf_worksheet[index]['whileloop']['statementBlock'][a][b]['truefalse']==true)
                                    {   $scope.cadwolf_worksheet[index]['whileloop']['statementBlock'][a][b]['showClass']="truestatements";
                                    }else
                                    {   $scope.cadwolf_worksheet[index]['whileloop']['statementBlock'][a][b]['showClass']="falsestatements"; }
                                }
                            }
                            $scope.digestStatus=1;
                            $scope.runEquationDigest();                            
                        }
                    });
                }
                if (returnObject.messageType=="IfElseParametersResult") 	
                {	$scope.cadwolf_worksheet.forEach(function(item, index)
                    {   if (returnObject.ID==item['itemid'])
                        {   $scope.cadwolf_worksheet[index]['needsBlockUpdate']=0;
                            $scope.cadwolf_worksheet[index]['ifelse']['Dependents']=returnObject['loopObject']['ifelse']['Dependents'];
                            $scope.cadwolf_worksheet[index]['ifelse']['Statement_Values']=returnObject['loopObject']['ifelse']['Statement_Values'];
                            $scope.cadwolf_worksheet[index]['ifelse']['Statement_String']=returnObject['loopObject']['ifelse']['Statement_String'];
                            $scope.cadwolf_worksheet[index]['ifelse']['Statement_TFString']=returnObject['loopObject']['ifelse']['Statement_TFString'];
                            $scope.cadwolf_worksheet[index]['ifelse']['ValueString']=returnObject['loopObject']['ifelse']['Statement_ValueString'];
                            $scope.cadwolf_worksheet[index]['ifelse']['Statement_truefalse']=returnObject['loopObject']['ifelse']['Statement_truefalse'];   
                            for (var a=0; a<$scope.cadwolf_worksheet[index]['ifelse']['statementBlock'].length; a++)
                            {   for (var b=0; b<$scope.cadwolf_worksheet[index]['ifelse']['statementBlock'][0].length; b++)
                                {   $scope.cadwolf_worksheet[index]['ifelse']['statementBlock'][a][b]['truefalse']=returnObject['loopObject']['ifelse']['statementBlock'][a][b]['truefalse'];
                                    if ($scope.cadwolf_worksheet[index]['ifelse']['statementBlock'][a][b]['truefalse']==true)
                                    {   $scope.cadwolf_worksheet[index]['ifelse']['statementBlock'][a][b]['showClass']="truestatements";
                                    }else
                                    {   $scope.cadwolf_worksheet[index]['ifelse']['statementBlock'][a][b]['showClass']="falsestatements"; }
                                }
                            }
                            for (var a=0; a<returnObject['loopObject']['ifelse']['Statement_Order'].length; a++)
                            {   var thisID=returnObject['loopObject']['ifelse']['Statement_Order'][a]['ID'];
                                $scope.cadwolf_worksheet.forEach(function(thisItem, thisIndex)
                                {   if ($scope.cadwolf_worksheet[thisIndex]['itemid']==thisID)
                                    {   $scope.cadwolf_worksheet[thisIndex]['ifelse']['Statement_Execute']=returnObject['loopObject']['ifelse']['Statement_Order'][a]['Execute']; }
                                });
                            }
                            $scope.digestStatus=1;
                            $scope.runEquationDigest();                            
                        }
                    });
                }
                if (returnObject.messageType=="StructureResult") 		
                {	$scope.cadwolf_worksheet.forEach(function(item, index)
                    {   if (returnObject.ID==item['itemid'])
                        {   $scope.cadwolf_worksheet[index]['needsBlockUpdate']=0;
                            $scope.cadwolf_worksheet[index]['needsUpdateFlag']=0; 
                            $scope.cadwolf_worksheet[index]['updateClass']='itemcurrent';   }
                    });
                    for (var returnItem in returnObject.structure)
                    {   $scope.cadwolf_worksheet.forEach(function(item, index)
                        {   if (returnItem==item['itemid'])
                            {   if (parseInt(item['vartype'])==3)
                                {   for (objProp in returnObject['structure'][returnItem]['equationObj']) 
                                    {   item['Equation'][objProp]=returnObject['structure'][returnItem]['equationObj'][objProp]; } 
                                    item['showEdit']=false;
                                    $scope.cadwolf_worksheet[index]['Equation']['Dependents']=returnObject['structure'][returnItem]['equationObj']['Deps'];
                                    $scope.findDependents(item['itemid']);
                                }
                            }
                        });
                    }
                    $scope.digestStatus=1;
                    $scope.runEquationDigest();
                }
                myScope=$scope;         
            }	
            if (typeof(callback)=="function") { callback();	}
        };	

        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                                    EQUATION UPDATE ITEMS

            These items are functions related to updating all related equations and plots once one equation has been solved. There are three 
            functions all together. The first is called when the solver returns and it does two things. First, it calls the algorithm to set
            the flag that all items that depend on this equation need to be resolved. Before that however, it step backward and if it finds 
            an equation whose name is equal to this, it also sets the flag to update those dependents that reside after the current equation.
            These functions include:
            
            findDependents      :   Prompts     :   called from the return of the equation solver
                                    Inputs      :   itemID - the id of the equation whose dependents are to be resolved
                                    Description :   The first function called in the process of updating dependents, this function first sorts the 
                                                    worksheet variable to be in order of location. It then gets the name and location of the item
                                                    being updated and calls the function to set the needsUpdateFlag flag to 1. Before this, it 
                                                    steps back over the array can calls the function to set the dependents of any previous variable
                                                    with the same name whose dependants are after the current item. If the name has not changed,
                                                    this is redundant. However, if the user changed the equation so as to match a previous equation
                                                    this will flag those now out of date items to reupdate
                                                    
            setDependentsOn     :   Prompts     :   called from the findDependents routine
                                    Inputs      :   itemID - the id of the item whos dependents are to be turned on
                                                    startLoc - the location at which any dependent updates should start. This is needed because if
                                                    we are dealing with an update due to a name change then the start should be there and not the 
                                                    location of the item whos dependents are being reset
                                    Description :   This function simply goes through and sets the needsUpdateFlag for any dependents

            runEquationDigest   :   Prompts     :   called when the user hits enter to finish entering an equation
                                                    called when the equation solver returns
                                                    called when an equation is deleted
                                    Inputs      :   uses the cadwolf_worksheet item
                                    Description :   Whenever an equation is updated, a flag is set on that object called the "needsUpdateFlag". 
                                                    When the equation solver returns, that same flag is set on the dependents of that equation.
                                                    This function simply goes through the main cadwolf_worksheet object in order and checks to
                                                    see if that flag is set. If it is, then the solver routing is called. Note that there is 
                                                    another flag that sets to show that the solver is occupied. When the solver returns the digest
                                                    is again called to solve the next equation in order.
                                                    When the next item is set to be solved, the code to set it as the "current item" is also 
                                                    called. This not only moves the color scheme so that the user can see what the current item
                                                    is, it also sends the previous item to be updated on the server.

        ------------------------------------------------------------------------------------------------------------------------------------------*/


        // Find start the process to update dependents
        $scope.findDependents = function (itemID, callback, tableFlag)	
        {	thisLoc=0, thisName='';
            $scope.cadwolf_worksheet=$scope.cadwolf_worksheet.sort($scope.dynamicSort("location"));
            for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if (itemID==$scope.cadwolf_worksheet[a]['itemid'])
                {   thisLoc=$scope.cadwolf_worksheet[a]['location'];
                    thisName=$scope.cadwolf_worksheet[a]['Equation']['Format_name'];
                }
            }
            $scope.setDependentsOn(itemID, thisLoc);
            for (var a=thisLoc; a>=0; a--)
            {   if ($scope.cadwolf_worksheet[a]['vartype']=='3')
                {   if (thisName==$scope.cadwolf_worksheet[a]['Equation']['Format_name'])
                    {   $scope.setDependentsOn($scope.cadwolf_worksheet[a]['itemid'], thisLoc); 
            }   }   }
            if (typeof(callback)=="function") { callback();	}
        };

        // Set the dependents of an equation to on
        $scope.setDependentsOn = function (itemID, startLoc)	
        {	//console.log('Turning on the dependents of '+itemID);
            for (var a=parseInt(startLoc)+1; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['vartype']=='3')
                {   for (var depID in $scope.cadwolf_worksheet[a]['Equation']['Dependents'])
                    {   if (depID==itemID) {  $scope.cadwolf_worksheet[a]['needsUpdateFlag']=1;  }
                    }
                }
                if ($scope.cadwolf_worksheet[a]['vartype']=='5')
                {   for (b=0; b<$scope.cadwolf_worksheet[a]['props']['data'].length; b++)
                    {   for (c=0; c<$scope.cadwolf_worksheet[a]['props']['data'][0].length; c++)
                        {   for (var depID in $scope.cadwolf_worksheet[a]['props']['data'][b][c]['Deps'])
                            {   if (depID==itemID) {  $scope.cadwolf_worksheet[a]['props']['data'][b][c]['needsUpdateFlag']=1;   }
                            }
                        } 
                    }
                }
                if ($scope.cadwolf_worksheet[a]['vartype']=='9')
                {   for (var thisDataset in $scope.cadwolf_worksheet[a]['Plot']['Dependents'])
                    {   for (var thisDep in $scope.cadwolf_worksheet[a]['Plot']['Dependents'][thisDataset])
                        {   console.log('Comparing '+thisDep+' to '+itemID);
                            if (thisDep==itemID) 
                            {   for (var b=0; b<$scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'].length; b++)
                                {   console.log('Match - now comparing '+$scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'][b]['Format_id']+' to '+thisDataset);
                                    if ($scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'][b]['Format_id']==thisDataset)
                                    { $scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'][b]['needsUpdateFlag']=1; } 
                                }
                            }
                        } 
                    }
                }
                if ($scope.cadwolf_worksheet[a]['vartype']=='13')
                {   for (var thisDataset in $scope.cadwolf_worksheet[a]['Surface']['Dependents'])
                    {   for (var thisDep in $scope.cadwolf_worksheet[a]['Surface']['Dependents'][thisDataset])
                        {   console.log('Comparing '+thisDep+' to '+itemID);
                            if (thisDep==itemID) 
                            {   for (var b=0; b<$scope.cadwolf_worksheet[a]['Surface']['Chart_dataobj'].length; b++)
                                {   if ($scope.cadwolf_worksheet[a]['Surface']['Chart_dataobj'][b]['Format_id']==thisDataset['Format_id'])
                                    { $scope.cadwolf_worksheet[a]['Surface']['Chart_dataobj'][b]['needsUpdateFlag']=1; } 
                                }
                            }
                        } 
                    }
                }
            }
            myScope=$scope;
        };
        
        // Run the loop to solve the next equation, update the table, or update the plot
        $scope.runEquationDigest = function ()	
        {	myScope=$scope;
            console.log('In the equation digest loop with a status of '+$scope.digestStatus);
            if ($scope.digestStatus==1)
            {   $scope.cadwolf_worksheet=$scope.cadwolf_worksheet.sort($scope.dynamicSort("location"));
                for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
                {   if (($scope.cadwolf_worksheet[a]['needsUpdateFlag']==1)&&($scope.cadwolf_worksheet[a]['vartype']==3)){   if ($scope.cadwolf_worksheet[a]['Equation']['isConnectedID']==1){ $scope.cadwolf_worksheet[a]['needsUpdateFlag']=0; } }
                    if (($scope.cadwolf_worksheet[a]['needsUpdateFlag']==1)&&($scope.cadwolf_worksheet[a]['vartype']==3))
                    {   console.log('Calling the solver for '+$scope.cadwolf_worksheet[a]['itemid']);
                        $scope.digestStatus=0;
                        $scope.solveEquation($scope.cadwolf_worksheet[a]['itemid'], 'SolveEquation');   
                        break
                    }
                    if ($scope.cadwolf_worksheet[a]['vartype']==5)
                    {   var flag=0;
                        for (b=0; b<$scope.cadwolf_worksheet[a]['props']['data'].length; b++)
                        {   for (c=0; c<$scope.cadwolf_worksheet[a]['props']['data'][0].length; c++)
                            {   console.log();
                                if ($scope.cadwolf_worksheet[a]['props']['data'][b][c]['needsUpdateFlag']==1)
                                {   $scope.cadwolf_worksheet[a]['solveRow']=b
                                    $scope.cadwolf_worksheet[a]['solveCol']=c
                                    if ($scope.cadwolf_worksheet[a]['props']['data'][b][c]['equation'].match(/^=/)==null)
                                    {   console.log('Setting index '+b+'-'+c+' to '+$scope.cadwolf_worksheet[a]['props']['data'][b][c]['equation']);
                                        $scope.cadwolf_worksheet[a]['props']['data'][b][c]['real']=$scope.cadwolf_worksheet[a]['props']['data'][b][c]['equation'];
                                        $scope.digestStatus=1;
                                    }else
                                    {   if ($scope.isNumber($scope.cadwolf_worksheet[a]['props']['data'][b][c]['equation'].replace(/^=/,'')))
                                        {   $scope.cadwolf_worksheet[a]['props']['data'][b][c]['real']=parseFloat($scope.cadwolf_worksheet[a]['props']['data'][b][c]['equation'].replace(/^=/,''));
                                            $scope.cadwolf_worksheet[a]['props']['data'][b][c]['needsUpdateFlag']=0;
                                            console.log('I am updating the dependents on '+String.fromCharCode(65+c)+' - '+b);
                                            $scope.findDependents($scope.cadwolf_worksheet[a]['itemid']+'.'+String.fromCharCode(65+c)+'.'+b, function(){ $scope.runEquationDigest(); });
                                            flag=1;
                                            break
                                        }else
                                        {   console.log('Solving for index '+b+'-'+c+' with an equation of '+$scope.cadwolf_worksheet[a]['props']['data'][b][c]['equation']);
                                            $scope.digestStatus=0;
                                            $scope.solveEquation($scope.cadwolf_worksheet[a]['itemid'], 'SolveTableCell'); 
                                            flag=1;
                                            break
                                        }
                                    }
                                }
                            } 
                            if (flag==1) { break }
                        }
                        if (flag==1) { break }
                    }
                    if (($scope.cadwolf_worksheet[a]['vartype']==6)&&($scope.cadwolf_worksheet[a]['needsBlockUpdate']==1)&&($scope.digestStatus==1))
                    {   $scope.digestStatus=0;
                        $scope.cadwolf_worksheet[a]['forloop']['firstRun']=1;
                        $scope.setCurrent($scope.cadwolf_worksheet[a]);
                        $scope.solveEquation($scope.cadwolf_worksheet[a]['itemid'], 'SolveLoopParameters');   
                        break
                    }
                    if (($scope.cadwolf_worksheet[a]['vartype']==7)&&($scope.cadwolf_worksheet[a]['needsBlockUpdate']==1)&&($scope.digestStatus==1))
                    {   $scope.digestStatus=0;
                        $scope.cadwolf_worksheet[a]['whileloop']['firstRun']=1;
                        $scope.setCurrent($scope.cadwolf_worksheet[a]);
                        $scope.createEqObj($scope.cadwolf_worksheet[a]['itemid'], function() 
                        {   $scope.solveEquation($scope.cadwolf_worksheet[a]['itemid'], 'SolveWhileLoopParameters');   });   
                        break
                    }
                    if (($scope.cadwolf_worksheet[a]['vartype']==8)&&($scope.cadwolf_worksheet[a]['needsBlockUpdate']==1)&&($scope.digestStatus==1))
                    {   $scope.digestStatus=0;
                        $scope.setCurrent($scope.cadwolf_worksheet[a]);
                        $scope.createEqObj($scope.cadwolf_worksheet[a]['itemid'], function() 
                        {   $scope.solveEquation($scope.cadwolf_worksheet[a]['itemid'], 'SolveIfElseParameters');   });   
                        break
                    }
                    if ((($scope.cadwolf_worksheet[a]['vartype']==6)||($scope.cadwolf_worksheet[a]['vartype']==7)||($scope.cadwolf_worksheet[a]['vartype']==8))&&($scope.cadwolf_worksheet[a]['needsUpdateFlag']==1)&&($scope.digestStatus==1))
                    {   $scope.digestStatus=0;
                        if ($scope.cadwolf_worksheet[a]['vartype']==6) { $scope.cadwolf_worksheet[a]['forloop']['firstRun']=1; }
                        if ($scope.cadwolf_worksheet[a]['vartype']==7) { $scope.cadwolf_worksheet[a]['whileloop']['firstRun']=1; }
                        $scope.setCurrent($scope.cadwolf_worksheet[a]);
                        $scope.cadwolf_worksheet[a]['whileloop']['firstRun']=1;
                        $scope.solveEquation($scope.cadwolf_worksheet[a]['itemid'], 'SolveStructure');   
                        break
                    }
                    if (($scope.cadwolf_worksheet[a]['vartype']==9)&&($scope.digestStatus==1))
                    {   var flag=0;
                        for (var thisDataset in $scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'])
                        {   if ($scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'][thisDataset]['needsUpdateFlag']==1)
                            {   console.log('I am updating dataset '+thisDataset+'-'+$scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'][thisDataset]['Format_id']+' on plot '+$scope.cadwolf_worksheet[a]['itemid']);
                                $scope.digestStatus=0;
                                $scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'][thisDataset]['needsUpdateFlag']=0; 
                                $scope.solvePlotData($scope.cadwolf_worksheet[a]['itemid'], $scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'][thisDataset]['Format_id'], $scope.cadwolf_worksheet[a]['Plot'], 'all');
                                flag=1;
                                break
                            }
                        } 
                        if (flag==1){ break }
                    }
                    if ($scope.cadwolf_worksheet[a]['vartype']==13)
                    {   for (var dataIndex in $scope.cadwolf_worksheet[a]['Surface']['Chart_dataobj'])
                        {   if ($scope.cadwolf_worksheet[a]['Surface']['Chart_dataobj'][dataIndex]['needsUpdateFlag']==1)
                            {   $scope.digestStatus=0;
                                $scope.cadwolf_worksheet[a]['Surface']['Chart_dataobj'][dataIndex]['needsUpdateFlag']=0; 
                                var thisID=$scope.cadwolf_worksheet[a]['itemid'];
                                var dataID=$scope.cadwolf_worksheet[a]['Surface']['Chart_dataobj'][dataIndex]['Format_id'];
                                var thisAxis=$scope.cadwolf_worksheet[a]['Surface']['Chart_dataobj'][dataIndex]['axisType'];
                                var thisType=$scope.cadwolf_worksheet[a]['Surface']['Chart_dataobj'][dataIndex]['type'];
                                $scope.solveSurfaceData(thisID, dataID, $scope.cadwolf_worksheet[a]['Surface'], thisAxis, thisType);
                                break
                            }
                        }  
                    }
                }
                myScope=$scope;
                console.log('The digest loop is clean');
            }
        }
        
        
        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                                    PLOT TEMPLATES

            These items are functions that provice the prototypes for all of the plot item. These functions include:
            
            Plot                :   Prompts     :   A plot item is found in the data on load
                                                    A new plot item is created
                                    Inputs      :   id - the unique number for the plot
                                                    plotObj - the object containing all of the properties of the plot
                                    Description :   This is the prototype for the plot object. If the plotObj is populated, it sets all exisitng
                                                    properties to those in the object
                                                    
            PlotData            :   Prompts     :   A plot item is found in the data on load
                                                    A new data object is created
                                    Inputs      :   id - the unique number for the data
                                                    plotID - the id of the plot containing the data
                                                    dataObj - the object containing all of the properties of the data
                                    Description :   This is the prototype for the plot data object. If the dataObj is populated, it sets all exisitng
                                                    properties to those in the object

            PlotAxis            :   Prompts     :   A plot item is found in the data on load
                                                    A new axis object is created
                                    Inputs      :   id - the unique number for the axis
                                                    plotID - the id of the plot containing the axis
                                                    axisObj - the object containing all of the properties of the data
                                    Description :   This is the prototype for the plot axis object. If the axisObj is populated, it sets all exisitng
                                                    properties to those in the object

            PlotBand            :   Prompts     :   A plot item is found in the data on load
                                                    A new band object is created
                                    Inputs      :   id - the unique number for the band
                                                    plotID - the id of the plot containing the band
                                                    axisObj - the object containing all of the properties of the axis
                                                    input - ????
                                    Description :   This is the prototype for the plot band object. If the bandObj is populated, it sets all exisitng
                                                    properties to those in the object

            PlotLine            :   Prompts     :   A plot item is found in the data on load
                                                    A new line object is created
                                    Inputs      :   id - the unique number for the line
                                                    plotID - the id of the plot containing the line
                                                    lineObj - the object containing all of the properties of the data
                                    Description :   This is the prototype for the plot line object. If the lineObj is populated, it sets all exisitng
                                                    properties to those in the object

            PlotText            :   Prompts     :   A plot item is found in the data on load
                                                    A new text object is created
                                    Inputs      :   id - the unique number for the text
                                                    plotID - the id of the plot containing the text
                                                    textObj - the object containing all of the properties of the data
                                    Description :   This is the prototype for the plot text object. If the textObj is populated, it sets all exisitng
                                                    properties to those in the object
        ------------------------------------------------------------------------------------------------------------------------------------------*/
    
        
        $scope.Plot=function (id, plotObj) 															
        { 	this.Format_id=id;														
            this.needsUpdateFlag=1;												
            this.Page_parentid="none";												
            this.Page_topparentid="none";											

            this.Chart_type="bar";													
            this.Chart_width="825px";												
            this.Chart_height="500px";												
            this.Chart_marginright=10;												
            this.Chart_marginleft=75;												
            this.Chart_marginbottom=65;												
            this.Chart_margintop=60;												
            this.Chart_Name='Chart_'+id;											
            this.Chart_Labels=new Array();											
            this.Chart_stack="none";

            this.Title_onoff="1";													
            this.Title_text='Chart Title';											
            this.Title_xoffset=0;													
            this.Title_yoffset=20;													

            this.Subtitle_onoff="0";												
            this.Subtitle_text='Chart Subtitle';									
            this.Subtitle_xoffset=0;												
            this.Subtitle_yoffset=30;												

            this.Legend_onoff=true;													
            this.Legend_layout="horizontal";										
            this.Legend_floating=1;													
            this.Legend_xoffset=0;													
            this.Legend_yoffset=0;													
            this.Legend_width=0;													
            this.Legend_align="center";												
            this.Legend_verticalalign="bottom";										 
            this.Legend_rtl="false";												
            this.Legend_marginRight=0;												
            this.Legend_marginLeft=0;												
            this.Legend_marginBottom=0;												
            this.Legend_marginTop=0;												

            this.Chart_dataobj=[];													
            this.Chart_yaxesobj=[];													
            this.Chart_xaxesobj=[];													
            this.Chart_bandsobj={};													
            this.Chart_linesobj={};													
            this.Chart_textobj={};
            this.Chart_xaxesobj.push(new $scope.PlotAxis($scope.getID('Axis', 'thisFile'), id, {}, 'Primary X Axis'));
            this.Chart_yaxesobj.push(new $scope.PlotAxis($scope.getID('Axis', 'thisFile'), id, {}, 'Primary Y Axis'));
         
        
            for (var item in plotObj){ this[item]=JSON.parse(JSON.stringify(plotObj[item])); }
        }																			

        $scope.PlotData=function (id, plotid, dataObj)												
        {	this.Format_id=id;														
            this.Format_plotid=plotid;												
            this.Format_type="line";												
            this.outlinecolor='';													
            this.xaxis=0;															
            this.series=0;															
            this.yaxis=0;															
            this.xdata_plottext='';													
            this.xdata_name='';														
            this.xdata_id='';														
            this.xdata_rawtable='';													
            this.ydata_plottext='';													
            this.ydata_name='';														
            this.ydata_id='';														
            this.ydata_rawtable='';													
            this.zdata_name='';														
            this.zdata_id='';														
            this.zdata_rawtable='';													
            this.cdata_plottext='';													
            this.cdata_name='';														
            this.cdata_id='';														
            this.cdata_rawtable='';													
            this.dataname='New Dataset';														
            this.data_type=1;														
            this.pielabels=new Array();												
            this.piedata=new Array();												
            this.data_plottext='';													
            this.data_error=0;														
            this.data_datalabels=false;												
            this.data_labelSize=12;													
            this.data_labelColor='#000000';											
            this.data_labelBorderWidth=0;											
            this.data_labelBorderColor="";											
            this.data_labelBorderRadius=0;											
            this.data_labelBorderPadding=0;											
            this.data_labelBackgroundColor='';										
            this.data_labelRotation=0;												
            this.data_labelX=0;														
            this.data_labelY=0;														
            this.data_labelDistance=30;												
            this.data_labelFormat='Normal';											
            this.data_pointmarkers=true;											
            this.data_markersize='3';													
            this.showInLegend=true;													
            this.lineWidth='1';														
            this.Chart_Labeltext='';												
            this.Chart_startangle='0';												
            this.Chart_stopangle='360';												
            this.Chart_innersize='0';												
            this.Chart_size='100';													
            this.Chart_location='50%, 50%';											
            this.Chart_translations={};												
            this.Chart_connectorWidth=1;											
            this.Chart_monoColor='';												
            this.PointData={};		
            this.needsUpdateFlag=0;		
            for (var item in dataObj){ this[item]=JSON.parse(JSON.stringify(dataObj[item])); }
        }																			

        $scope.PlotAxis=function (id, plotid, axisObj, axisName)												
        {																			
            this.Format_id=id;							
            this.Format_plotid=plotid;					
            if (axisName!==undefined) { this.Axis_name=axisName; }else{ this.Axis_name="New Axis"; }			
            this.Axis_num=0;							
            this.Axis_label="";							
            this.Axis_lineWidth=0;						
            this.Axis_linecolor="";						
            this.Axis_opposite="false";					
            this.Axis_type="linear";					
            this.Axis_offset=0;							
            this.Axis_min="null";						
            this.Axis_max="null";						
            this.Axis_tickinterval=0;					
            this.Axis_gridlinesonoff="true";			
            this.Axis_gridcolor="#C0C0C0";											
            this.Axis_minortickinterval=0;				
            this.Axis_minorgridlinesonoff="false";		
            this.Axis_minorgridcolor='#C0C0C0';			
            this.Axis_gridlinewidth=1;					
            this.Axis_minorgridlinewidth=0;				
            this.Axis_reversed="false";	
            this.Chart_Labeltext='';
            for (var item in axisObj){ this[item]=JSON.parse(JSON.stringify(axisObj[item])); }
        }																			

        $scope.PlotBand=function (id, plotid, bandObj)										
        {	this.Format_id=id;							
            this.Format_plotid=plotid;					
            this.Axis_id="";
            this.Band_start=0;														
            this.Band_end=1;														
            this.color="#FCFFC5";						
            for (var item in bandObj){ this[item]=JSON.parse(JSON.stringify(bandObj[item])); }
        }												

        $scope.PlotLine=function (id, plotid, lineObj)			
        {	this.Format_id=id;							
            this.Format_plotid=plotid;					
            this.Axis_id="";	
            this.Line_value=1;														
            this.Line_width=1;							
            this.color="#FCFFC5";						
            for (var item in lineObj){ this[item]=JSON.parse(JSON.stringify(lineObj[item])); }
        }																			

        $scope.PlotText=function (id, plotid, textObj)		        								
        {	this.Format_id=id;							
            this.Format_plotid=plotid;					
            this.textRawText='';													
            this.textFormattedText='';												
            this.textXLoc=10;														
            this.textYLoc=10;														
            this.textRotAng=0;														
            this.textSize='14px';													
            this.textColor="000000";					
            this.textElement={};	
            for (var item in textObj){ this[item]=JSON.parse(JSON.stringify(textObj[item])); }
        }												

        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                        CREATION AND DESTRUCTION OF PLOT ITEMS

            These items are functions that add and delete items in the plots. This includes adding and deleting text items, plot bands, plot lines,
            and plot datasets. These functions include:
            
            addDataset          :   Prompts     :   Called from the plot specs when a user adds a new dataset 
                                    Inputs      :   plotObj     -  the object holding the data for the plot
                                    Description :   This function takes in a plot object and adds a dataset to it. To do this, a new dataset is
                                                    created from the prototype and added in the plots data object.

            deleteDataset       :   Prompts     :   Called from the plot specs when a user deletes a new dataset 
                                    Inputs      :   plotObj     -  the object holding the data for the plot
                                    Description :   This function takes in a plot object and deletes the current dataset. .

            addPlotItem         :   Prompts     :   Called from the plot specs when a user adds a new text item, line, or band 
                                    Inputs      :   plotID      -  the id for the plot
                                                    itemType    -  the type of item to be added - string
                                    Description :   This function adds a new item to the plot. These items include text, lines, and bands

            deletePlotItem      :   Prompts     :   Called from the plot specs when a user deletes a text item, line, or band item
                                    Inputs      :   plotID      -  the id for the plot
                                                    itemID      -  the id of the item to be deleted
                                                    itemType    -  the type of item to be added - string
                                    Description :   This function adds a new item to the plot. These items include text, lines, and bands

        ------------------------------------------------------------------------------------------------------------------------------------------*/


        $scope.addDataset=function (plotObj)		        								
        {	var tempDataset=new $scope.PlotData($scope.getID('DataSeries', 'thisFile'), plotObj['Plot']['Format_id'], {Format_type:plotObj['Plot']['Chart_type']});
            tempDataset['series']=plotObj['Plot']['Chart_dataobj'].length;
            $scope.currentPlot['Plot']['Chart_dataobj'].push(tempDataset);
            var thisIndex=parseInt(plotObj['Plot']['Chart_dataobj'].length);
            var colorArray=['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'];
            var thisColor=colorArray[thisIndex%10-1];
            $scope.currentPlot['Plot']['Chart_dataobj'][thisIndex-1]['color']=thisColor;
            $scope.currentPlot['Plot']['Chart_dataobj'][thisIndex-1]['symbol']="circle";
            $scope.currentPlot['Plot']['Chart_dataobj'][thisIndex-1]['fillcolor']=thisColor;
            plotObj['Plot']['needsUpdateFlag']=1;
            myScope=$scope;  
        };

        $scope.deleteDataset=function (plotObj)		        								
        {	var seriesNum="NA";
            $scope.cadwolf_worksheet.forEach(function(item, index)
            {   if (plotObj['Plot']['Format_id']==item['itemid'])
                {   for (var a=0; a<$scope.cadwolf_worksheet[index]['Plot']['Chart_dataobj'].length; a++)
                    {   if ($scope.cadwolf_worksheet[index]['Plot']['Chart_dataobj'][a]['Format_id']==$scope.currentDataset['Format_id'])
                        {   seriesNum=$scope.cadwolf_worksheet[index]['Plot']['Chart_dataobj']['series'];
                            $scope.cadwolf_worksheet[index]['Plot']['Chart_dataobj'].splice(a, 1);
                        }
                    }
                    for (var a=0; a<$scope.cadwolf_worksheet[index]['Plot']['Chart_dataobj'].length; a++)
                    {   if (($scope.cadwolf_worksheet[index]['Plot']['Chart_dataobj'][a]['series']>=seriesNum)&&(seriesNum!="NA"))
                        {   $scope.cadwolf_worksheet[index]['Plot']['Chart_dataobj'][a]['series']=$scope.cadwolf_worksheet[index]['Plot']['Chart_dataobj'][a]['series']-1;  }   }
                }   
            });
            plotObj['Plot']['needsUpdateFlag']=1;
            myScope=$scope;  
        }
        
        $scope.addPlotItem=function (plotID, itemType)		        								
        {	var axisNum=0, axisID='';
            $scope.cadwolf_worksheet.forEach(function(item, index){   if (plotID==item['itemid']){   axisID=item['Plot']['Chart_xaxesobj'][0]['Format_id']; thisItem=item;  }    });
            if (itemType=="yaxis") { $scope.cadwolf_worksheet.forEach(function(item, index){   if (plotID==item['itemid']){   axisNum=item['Plot']['Chart_yaxesobj'].length;  } }); }
            if (itemType=="xaxis") { $scope.cadwolf_worksheet.forEach(function(item, index){   if (plotID==item['itemid']){   axisNum=item['Plot']['Chart_xaxesobj'].length;  } }); }
            if (itemType=="text")
            {   thisTemplate=new $scope.PlotText($scope.getID('Plottext', 'thisFile'), plotID, { Format_plotid:plotID });    
                $scope.currentPlot['Plot']['Chart_textobj'].push(thisTemplate);      }
            if (itemType=="band")
            {   thisTemplate=new $scope.PlotBand($scope.getID('Band', 'thisFile'), plotID, { Format_plotid:plotID, Axis_id:axisID });    
                $scope.currentPlot['Plot']['Chart_bandsobj'].push(thisTemplate);    }
            if (itemType=="line")
            {   thisTemplate=new $scope.PlotLine($scope.getID('Line', 'thisFile'), plotID, { Format_plotid:plotID, Axis_id:axisID });   
                $scope.currentPlot['Plot']['Chart_linesobj'].push(thisTemplate);    }
            if (itemType=="yaxis")
            {   thisTemplate=new $scope.PlotAxis($scope.getID('Axis', 'thisFile'), plotID, { Format_plotid:plotID, Axis_num:axisNum });   
                $scope.currentPlot['Plot']['Chart_yaxesobj'].push(thisTemplate);  
                $scope.cadwolf_worksheet.forEach(function(item, index)
                {   if (plotID==item['itemid']) {   for (var a=0; a<item['Plot']['Chart_yaxesobj'].length; a++) {   item['Plot']['Chart_yaxesobj'][a]['Axis_name']="Axis "+a;  item['Plot']['Chart_yaxesobj'][a]['Axis_label']="Axis "+a;  } }  });
            }
            if (itemType=="xaxis")
            {   thisTemplate=new $scope.PlotAxis($scope.getID('Axis', 'thisFile'), plotID, { Format_plotid:plotID, Axis_num:axisNum });   
                $scope.currentPlot['Plot']['Chart_xaxesobj'].push(thisTemplate);  
                $scope.cadwolf_worksheet.forEach(function(item, index)
                {   if (plotID==item['itemid']) {   for (var a=0; a<item['Plot']['Chart_xaxesobj'].length; a++) {   item['Plot']['Chart_xaxesobj'][a]['Axis_name']="Axis "+a;  item['Plot']['Chart_xaxesobj'][a]['Axis_label']="Axis "+a; }  }    });
            }
            myScope=$scope;  
            thisItem['Plot']['needsUpdateFlag']=1;
        }

        $scope.deletePlotItem=function (plotID, itemID, itemType)		        								
        {	var axisNum=0;
            if (itemType=="text"){ var thisObj="Chart_textobj"; }
            if (itemType=="line"){ var thisObj="Chart_linesobj"; }
            if (itemType=="band"){ var thisObj="Chart_bandsobj"; }
            if (itemType=="yaxis"){ var thisObj="Chart_yaxesobj"; }
            $scope.cadwolf_worksheet.forEach(function(item, index)
            {   if (plotID==item['itemid'])
                {   for (var thisData=0; thisData<$scope.cadwolf_worksheet[index]['Plot'][thisObj].length; thisData++)
                    {   if ($scope.cadwolf_worksheet[index]['Plot'][thisObj][thisData]['Format_id']==itemID)
                        {   $scope.cadwolf_worksheet[index]['Plot'][thisObj].splice(thisData, 1);  axisNum=thisData; thisItem=item; }
                    }
                }   
            });
            if (itemType=="yaxis")
            {   $scope.cadwolf_worksheet.forEach(function(item, index)
                {   if (plotID==item['itemid']) 
                    {   thisItem=item
                        for (var a=0; a<item['Plot']['Chart_dataobj'].length; a++) {   if (item['Plot']['Chart_dataobj'][a]['yaxis']>axisNum) { item['Plot']['Chart_dataobj'][a]['yaxis']=item['Plot']['Chart_dataobj'][a]['yaxis']-1; }  } 
                        for (var a=0; a<item['Plot']['Chart_yaxesobj'].length; a++) {   item['Plot']['Chart_yaxesobj'][a]['Axis_name']="Axis "+a;  }  }    });    
            }
            if (itemType=="xaxis")
            {   $scope.cadwolf_worksheet.forEach(function(item, index)
                {   if (plotID==item['itemid']) 
                    {   thisItem=item;
                        for (var a=0; a<item['Plot']['Chart_dataobj'].length; a++) {   if (item['Plot']['Chart_dataobj'][a]['xaxis']>axisNum) { item['Plot']['Chart_dataobj'][a]['xaxis']=item['Plot']['Chart_dataobj'][a]['xaxis']-1; }  } 
                        for (var a=0; a<item['Plot']['Chart_xaxesobj'].length; a++) {   item['Plot']['Chart_xaxesobj'][a]['Axis_name']="Axis "+a;  }  }    });    
            }
            thisItem['Plot']['needsUpdateFlag']=1;
            myScope=$scope;  
        };

        // Create the mono color
        $scope.setMonoColor = function ()
        {   var flag=0;		var base='';
            if (($scope.currentPlot['Plot'].Chart_monoColor=="Blue")||($scope.currentPlot['Plot'].Chart_monoColor=="blue")) { base = "#7cb5ec"; }	
            if (($scope.currentPlot['Plot'].Chart_monoColor=="Green")||($scope.currentPlot['Plot'].Chart_monoColor=="green")) { base = "#AADDAA"; }
            if (($scope.currentPlot['Plot'].Chart_monoColor=="Red")||($scope.currentPlot['Plot'].Chart_monoColor=="red")) { base = "#FF0000"; }
            if (($scope.currentPlot['Plot'].Chart_monoColor=="Yellow")||($scope.currentPlot['Plot'].Chart_monoColor=="yellow")) { base = "#e4d354"; }	
            if ($scope.currentPlot['Plot'].Chart_monoColor=="") { flag=1; }	
            if ($scope.currentDataset['Format_type']=="pie")
            {	if (flag===0){	for (var i in $scope.currentPlot['Plot']['Chart_dataobj'][dataIndex]['PointData']){   $scope.currentPlot['Plot']['Chart_dataobj'][dataIndex]['PointData'][i]['color']=Highcharts.Color(base).brighten((i - 3) / 7).get(); }
                }else	     {	for (var i in $scope.currentPlot['Plot']['Chart_dataobj'][dataIndex]['PointData']){   $scope.currentPlot['Plot']['Chart_dataobj'][dataIndex]['PointData'][i]['color']=Highcharts.getOptions().colors[i]; }	}
                currentDataset.Chart_monoColor=monoColor; 
            }else 
            {	if (flag==0)
                {	var i=0;
                    for (var dataIndex=0; dataIndex<$scope.currentPlot['Plot']['Chart_dataobj'].length; dataIndex++) 
                    {   $scope.currentPlot['Plot']['Chart_dataobj'][dataIndex]['color']=Highcharts.Color(base).brighten((i - 3) / 7).get(); 
                        $scope.currentPlot['Plot']['Chart_dataobj'][dataIndex]['fillFolor']=Highcharts.Color(base).brighten((i - 3) / 7).get();
                        i++;
                    }
                }else	
                {	var i=0;
                    for (var dataIndex=0; dataIndex<$scope.currentPlot['Plot']['Chart_dataobj'].length; dataIndex++) 
                    {   console.log('Setting color for index '+dataIndex+' to '+Highcharts.getOptions().colors[i]);
                        $scope.currentPlot['Plot']['Chart_dataobj'][dataIndex]['color']=Highcharts.getOptions().colors[i];
                        $scope.currentPlot['Plot']['Chart_dataobj'][dataIndex]['fillColor']=Highcharts.getOptions().colors[i]; 
                        i++;
                    }
                }
            }
            myScope=$scope;
            currentPlot['Plot']['needsUpdateFlag']=1;
        };	

        $scope.formatPlotText = function(plotID, textID, callback) 
        {	var formatted={}, thisLoc=0, thisName='', indexes=[]; 
            $scope.cadwolf_worksheet.forEach(function(item, index)
            {   if (plotID==item['itemid'])
                {   for (var a=0; a<item['Plot']['Chart_textobj'].length; a++)
                    {   if (item['Plot']['Chart_textobj'][a]['Format_id']==textID)
                        {   var thisText=item['Plot']['Chart_textobj'][a]['textRawText'];
                            var splitText=thisText.match(/#[\[\]0-9a-zA-Z_]+/g);
                            if (splitText===null)  
                            {   item['Plot']['Chart_textobj'][a]['textFormattedText']=thisText;
                            }else 
                            {   for (var b=0; b<splitText.length; b++)
                                {   indexes=splitText[b].match(/\[[0-9]+\]/g); 
                                    if (indexes===null)
                                    {   thisLoc=0; 
                                        thisName=splitText[b].replace(/^\#/,'');
                                        $scope.cadwolf_worksheet.forEach(function(eqItem, eqIndex) 
                                        {   if (parseInt(eqItem['vartype'])==3)  
                                            {   if ((eqItem['location']>thisLoc)&&(eqItem['location']<item['location'])&&(eqItem['Equation']['Format_name']==thisName))
                                                { formatted[splitText[b]]=eqItem['Equation']['Solution_real']['0-0'];   thisLoc=eqItem['location'];  } 
                                            }  
                                        }); 
                                    }else  
                                    {   thisKey='';  
                                        for (var c=0; c<indexes.length; c++) {   thisKey=thisKey+'-'+indexes[c].replace(/[\[\]]+/g,'');    } 
                                        thisKey=thisKey.replace(/^\-/,''); 
                                        console.log('The key is '+thisKey);
                                        thisLoc=0;  
                                        thisName=splitText[b].replace(/^\#/,'').replace(/\[[0-9]+\]/g,''); 
                                        $scope.cadwolf_worksheet.forEach(function(eqItem, eqIndex) 
                                        {   if (parseInt(eqItem['vartype'])==3) 
                                            {   if ((eqItem['location']>thisLoc)&&(eqItem['location']<item['location'])&&(eqItem['Equation']['Format_name']==thisName))
                                                { formatted[splitText[b]]=eqItem['Equation']['Solution_real'][thisKey];   thisLoc=eqItem['location'];  } 
                                            }
                                        }); 
                                    } 
                                }
                                for (var itemID in formatted)  
                                {   thisText=thisText.replace(itemID, formatted[itemID]); }
                                item['Plot']['Chart_textobj'][a]['textFormattedText']=thisText;
                            } 
                        }
                    }
                }
            });
            myScope=$scope;  
        };

        
        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                            PLOT DATA AND CREATION ITEMS

            These items are functions that provice the prototypes for all of the plot item. These functions include:
            
            setPointData        :   Prompts     :   Called from the plot specs when a user enters a new point property 
                                    Inputs      :   pointIndex  -  the index of the point to be altered
                                                    prop        - the property to be set
                                                    propData    - the data that is to be placed in the point property
                                    Description :   This function takes in a property name and data and then sets the point data for a plot dataseries to
                                                    that particular data. The dataset changed is the "currentDataset" on the scope. The exception to this
                                                    is when the labels or data are being changed. In those cases, the algorithm takes in an array and sets
                                                    the point data to the value at each index

            solvePlotData       :   Prompts     :   Needs to be updated
                                                    A new chart is created
                                                    Any number of changes are made to the data or properties that require the chart to be remade
                                    Inputs      :   plotID      - the id of the plot containing the text
                                                    newType     - 1 of the chart should not look at existing data
                                    Description :   This function finds the object in the cadwolf_worksheet variable that is sent via the plotID input
                                                    and then creates a new chart based upon the properties in that object.
        ------------------------------------------------------------------------------------------------------------------------------------------*/
        $scope.toNum=function(num){	return parseFloat(parseFloat(num).toFixed(12));	}		
                    
        
        $scope.setPointData=function (pointIndex, prop, propData)   								
        {	if ((prop=="name")||(prop=="y"))
            {   for (var a=0; a<propData.length; a++){   $scope.currentDataset['PointData'][a][prop]=propData[a]; }
            }else{   $scope.currentDataset['PointData'][pointIndex][prop]=propData;   }  
            myScope=$scope;
        };

                     
        $scope.solvePlotData = function(PlotID, DataID, plotObject, className)
        {	$scope.createEqObj(PlotID, function() { $scope.callPlotSolver(PlotID, DataID, plotObject, className) });	}

        
        $scope.callPlotSolver = function(PlotID, DataID, plotObject, className)
        {	$scope.datasetID=$scope.currentDataset['Format_id'];
            $scope.plotID=$scope.currentPlot['itemid'];
            sendObj={};
            for (var a=0; a<$scope.cadwolf_worksheet.length; a++){ if ($scope.cadwolf_worksheet[a]['itemid']==PlotID){ sendObj=$scope.cadwolf_worksheet[a]['sendObj']; } }
            equationWorker.postMessage({								
                "cadwolfType":"SolvePlotData", 						
                "plotObject":plotObject,							
                "className":className,								
                "PlotID":PlotID,									
                "DataID":DataID,									
                "unitList":$scope.unitList,
                "Units_Object":$scope.cadwolf_scaleUnits,						
                "ParseUnits":$scope.cadwolf_parseUnits,							
                "ImportedFunctions":$scope.cadwolf_fileFunData.impFunctions,				
                "FileID":$scope.cadwolf_fileInfo.id,
                "Constants":$scope.cadwolf_constants,
                "EqObj":sendObj						
            });														
            equationWorker.onmessage = function(e) {					
                returnObject=e.data;								
                if (returnObject.messageType=="PlotDataResults") 	
                {	console.log('Resetting the digest status');
                    $scope.digestStatus=1;
                    if (returnObject.className=="all")				
                    {	for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
                        {   if ($scope.cadwolf_worksheet[a]['itemid']==returnObject.PlotID)
                            {   for (var objProp in returnObject.plotObj) { $scope.cadwolf_worksheet[a]['Plot'][objProp]=returnObject.plotObj[objProp]; }	
                                $scope.cadwolf_worksheet[a]['Plot']['Dependents']=returnObject.Dependents;
                                $scope.cadwolf_worksheet[a]['Plot']['needsUpdateFlag']=1;
                                for (var datasetIndex in $scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'])
                                {   if ($scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'][datasetIndex]['Format_id']==$scope.datasetID)
                                    {   $scope.currentDataset=$scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'][datasetIndex]; } }
                                $scope.updateItem($scope.cadwolf_worksheet[a]);
                            }
                        }
                    }else												
                    {	for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
                        {   if ($scope.cadwolf_worksheet[a]['itemid']==returnObject.PlotID)
                            {   for (var objProp in returnObject.plotObj) { $scope.cadwolf_worksheet[a]['Plot'][objProp]=returnObject.plotObj[objProp]; }
                                if ($scope.cadwolf_worksheet[a]['Plot']['Dependents']===undefined){ $scope.cadwolf_worksheet[a]['Plot']['Dependents']={}; }
                                for (var DepDataID in returnObject.Dependents)
                                {	if ($scope.cadwolf_worksheet[a]['Plot']['Dependents'][DepDataID]===undefined) { $scope.cadwolf_worksheet[a]['Plot']['Dependents'][DepDataID]={}; }
                                    for (var DataID in $scope.cadwolf_worksheet[a]['Plot']['Dependents'])			
                                    {	if (DepDataID==DataID) 				
                                        {	for (var eqID in returnObject.Dependents[DepDataID]){ var axis=returnObject.Dependents[DepDataID][eqID]['axis']; }	
                                            for (var eqID in $scope.cadwolf_worksheet[a]['Plot']['Dependents'][DataID])
                                            {	if(axis==$scope.cadwolf_worksheet[a]['Plot']['Dependents'][DataID][eqID]['axis']) { delete $scope.cadwolf_worksheet[a]['Plot']['Dependents'][DataID][eqID]; } }
                                            for (var eqID in returnObject.Dependents[DepDataID])	
                                            {	$scope.cadwolf_worksheet[a]['Plot']['Dependents'][DataID][eqID]={}; 	
                                                $scope.cadwolf_worksheet[a]['Plot']['Dependents'][DataID][eqID]['active']=1; 			
                                                $scope.cadwolf_worksheet[a]['Plot']['Dependents'][DataID][eqID]['axis']=returnObject.Dependents[DepDataID][eqID]['axis']; 
                                }	}	}	}								
                                $scope.cadwolf_worksheet[a]['Plot']['needsUpdateFlag']=1
                                for (var datasetIndex in $scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'])
                                {   if ($scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'][datasetIndex]['Format_id']==$scope.datasetID)
                                    {   $scope.currentDataset=$scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'][datasetIndex]; } }
                                $scope.updateItem($scope.cadwolf_worksheet[a]);
                            }
                        }
                    }												
                    $scope.runEquationDigest();                
                }													
            }															
            myScope=$scope;
            if (typeof(callback)=="function") { callback();	}		
        }															

 
        
        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                            ITEMS RELATED TO IMAGES

            These items are functions handle everything needed for the images. Basically, that just means grabbing the folders and images from the
            server when requested. These functions include:
            
            getFolderImages     :   Prompts     :   When the user hits enter when editing the URL to pull images from
                                                    When the user clicks on a folder in the image menu
                                    Inputs      :   None - it uses the model linked variable
                                    Description :   This function calls the server and asks for all images and folders in the given directory

            setFolderImages     :   Prompts     :   When the user clicks on an image in the image menu
                                    Inputs      :   None - it uses the model linked variable
                                    Description :   This function calls the server and asks for all images and folders in the given directory
                                                    
                                    
        ------------------------------------------------------------------------------------------------------------------------------------------*/
        
        // Function called upon load images and folders
        $scope.getFolderImages = function() 
        {   $scope.imagePath=$scope.imagePath.replace(/\/$/,'');
            $http.post('http://www.cadwolf.com/Documents/getFolderImagesAngular', { folder:$scope.imagePath }, {}).
            then(function(response)
             {  myResponse=response;
                $scope.imageObj=[];
                var thisObj={};
                for (var a=0; a<response.data.length; a++)
                {   thisObj={};
                    thisObj['id']=response.data[a]['Workspace']['id'];
                    thisObj['fileType']=response.data[a]['Workspace']['File_or_Folder'];
                    thisObj['type']=response.data[a]['Workspace']['type'];
                    thisObj['thisType']=response.data[a]['Workspace']['type'].replace(/image\//,'');
                    thisObj['name']=response.data[a]['Workspace']['name'];
                    var thisDate=$scope.cadwolf_fileInfo.modified.split(' ');
                    thisObj['mdate']=new Date(thisDate[0]+'T'+thisDate[1]);
                    $scope.imageObj.push(thisObj);
                }
                myScope=$scope;
             }, function(){ $scope.showMessage({type:"bad", messageText:"There was an error retrieving the data from the server"}, true); }); 
        };

        // Set the image properties
        $scope.setImage = function(selectedObj) 
        {   $scope.currentImage.data.src=selectedObj.id;
            $scope.currentImage.data.thisType=selectedObj.thisType;
            $scope.currentImage.data.type=selectedObj.type;
            $scope.currentImage.data.name=selectedObj.name;
            $scope.currentImage.data.mdate=selectedObj.mdate;
            myScope=$scope;
        };

        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                            ITEMS DONE ON PAGE LOAD

            These items are functions related to the items that are called on page load. These functions do a number of things. There is one that 
            is invoked when loaded and calls the server for data. Another then sets the starting parameters. These functions include:
            
            getInitialData      :   Prompts     :   An immediately invoked function expression
                                    Inputs      :   gets the path of the window URL and sends that
                                    Description :   This function prompts the server to return all of the data relevant to this file. It then
                                                    places that data into the 8 or so main variables like the cadwolf_fileInfo and the 
                                                    cadwolf_worksheet objects
                                                    
            setInitialParameters:   Prompts     :   Called from the getInitial data function
                                    Inputs      :   none 
                                    Description :   This function sets some of the very basic defaults for the page. These include the true and 
                                                    false for the show/hide items as well as the current items
                                                    
            setDataParameters   :   Prompts     :   Called from the get initial data
                                    Inputs      :   none
                                    Description :   This function simply takes some of the data that was returned from the getInitialData call and
                                                    creates some needed items for the page to work.
                                    
        ------------------------------------------------------------------------------------------------------------------------------------------*/
        
        // Function called upon load to set the initial parameters
        $scope.setInitialParameters = function() 
        {   $scope.showMain(1); 
            $scope.editTitle=false;
            $scope.editSubTitle=false;
            $scope.textShow=false;
            $scope.equationShow=false;
            $scope.symbolicShow=false;
            $scope.imageShow=false;
            $scope.tableShow=false;
            $scope.plotShow=false;
            $scope.videoShow=false;
            $scope.editInputs=false;
            $scope.imagePath='/Workspaces/';
            $scope.currentEquation='';
            $scope.currentTable='';
            $scope.currentImage='';
            $scope.currentPlot='';
            $scope.currentSurface='';
            $scope.currentDataset='';
            $scope.currentPoint='';
            $scope.currentPointIndex=0;
            $scope.currentVideo='';
            $scope.currentItem='';
            $scope.chartType='Chart Type';
            $scope.datasetInputs=[];
            $scope.fileInputs=[];
            $scope.showTocLevel=1;
            $scope.formatDisplay=false;
            $scope.inputLocation='www.cadwolf.com/Workspaces/Documentation';
            $scope.topItem={};  $scope.topItem['location']=0;   $scope.topItem['itemid']="topItem";
            $scope.digestStatus=1;
            equationWorker = new Worker("http://www.cadwolf.com/js/EquationSolverAngular.js");	
            wireTexture = new THREE.ImageUtils.loadTexture( 'http://www.cadwolf.com/Images/square.png' );    
        };

        $scope.setDataParameters = function()
        {   $scope.unitList=new Array('A', 'K', 's', 'm', 'kg', 'cd', 'mol', 'rad');	
            var thisDate=$scope.cadwolf_fileInfo.created.split(' ');
            $scope.cadwolf_fileInfo.cdate=new Date(thisDate[0]+'T'+thisDate[1]);
            var thisDate=$scope.cadwolf_fileInfo.modified.split(' ');
            $scope.cadwolf_fileInfo.mdate=new Date(thisDate[0]+'T'+thisDate[1]);
            if (($scope.cadwolf_fileInfo.CheckedOut==$scope.userName)&&($scope.cadwolf_fileInfo.checkoutID==$scope.userID))
            {   $scope.cadwolf_fileInfo.checkoutText="You have this document checked out";    
            }else if ($scope.cadwolf_fileInfo.CheckedOut!=null){   $scope.cadwolf_fileInfo.checkoutText="This document is checked out by "+$scope.cadwolf_fileInfo.CheckedOut;    
            }else if ($scope.editPerm==true){   $scope.cadwolf_fileInfo.checkoutText='<div id="checkoutButton">Check Out Document</div>';    }
            if ($scope.cadwolf_fileInfo.TOC){ $scope.cadwolf_fileInfo.tocText="This item defaults to display the table of contents";
            }else{ $scope.cadwolf_fileInfo.tocText="This item defaults to display the full document"; }
            if ($scope.cadwolf_permissions['edit']=="1"){ $scope.cadwolf_fileInfo.editText="You have permission to edit this document"; }else{ $scope.cadwolf_fileInfo.editText="You do not have permission to edit this document"; }
            if ($scope.cadwolf_permissions['use']=="1"){ $scope.cadwolf_fileInfo.useText="You have permission to use this document"; }else{ $scope.cadwolf_fileInfo.useText="You do not have permission to use this document"; }
            if ($scope.cadwolf_permissions['view']=="1"){ $scope.cadwolf_fileInfo.viewText="You have permission to view this document"; }else{ $scope.cadwolf_fileInfo.viewText="You do not have permission to view this document"; }
            if (($scope.editPerm==true)&&($scope.cadwolf_fileInfo.description=="")){ $scope.cadwolf_fileInfo.description="Add description"; }
            if (($scope.editPerm==false)&&($scope.cadwolf_fileInfo.description=="")){ $scope.cadwolf_fileInfo.description="No description provided yet"; }
            if ($scope.cadwolf_fileInfo.title==""){ $scope.cadwolf_fileInfo.title=$scope.cadwolf_fileInfo.name; }   
            if ($scope.cadwolf_fileInfo.subtitle==""){ $scope.cadwolf_fileInfo.subtitle="Enter subtitle"; }   
            if ($scope.cadwolf_fileInfo.description==""){ $scope.cadwolf_fileInfo.description="Enter description"; }   
//    <!-- Will be deleted -->        
            var temp=[];
            for (var a=0; a<Object.keys($scope.cadwolf_fileInfo['inputs']).length; a++){ temp[a]={};    temp[a]['name']=$scope.cadwolf_fileInfo.inputs[a]; temp[a]['showEdit']=false; temp[a]['number']=a; }
            $scope.cadwolf_fileInfo.inputs=temp;
            var temp=[];
            for (var a=0; a<Object.keys($scope.cadwolf_fileInfo['outputs']).length; a++){ temp[a]={};    temp[a]['name']=$scope.cadwolf_fileInfo.outputs[a]; temp[a]['showEdit']=false; temp[a]['number']=a; }
            $scope.cadwolf_fileInfo.outputs=temp;
//    <!-- End of delete -->
            $scope.showStartLoc=0;
            $scope.showEndLoc=$scope.cadwolf_worksheet.length;
myScope=$scope; 
            $scope.cadwolf_worksheet.forEach(function(item, index)
            {   $scope.cadwolf_worksheet[index]['Values']=$scope.cadwolf_worksheet[index]['Values'];
                if (($scope.cadwolf_worksheet[index]['Values']=='')||($scope.cadwolf_worksheet[index]['Values']===undefined)){   $scope.cadwolf_worksheet[index]['Values']={};   }
                if (($scope.cadwolf_worksheet[index]['Values']['References']=='')||($scope.cadwolf_worksheet[index]['Values']['References']===undefined)){   $scope.cadwolf_worksheet[index]['Values']['References']=[];   }
                $scope.cadwolf_worksheet[index]['Values']['References']=[];
                $scope.cadwolf_worksheet[index]['vartype']=parseInt($scope.cadwolf_worksheet[index]['vartype']);
                $scope.cadwolf_worksheet[index]['location']=parseInt($scope.cadwolf_worksheet[index]['location']);
                $scope.cadwolf_worksheet[index]['Page_lastposition']=parseInt($scope.cadwolf_worksheet[index]['Page_lastposition']);
                if (($scope.cadwolf_worksheet[index]['Page_lastposition']=='')||($scope.cadwolf_worksheet[index]['Page_lastposition']===undefined)||(isNaN($scope.cadwolf_worksheet[index]['Page_lastposition']))){ $scope.cadwolf_worksheet[index]['Page_lastposition']=$scope.cadwolf_worksheet[index]['location']; }
                if (item.vartype=="2")
                {   if ($scope.cadwolf_worksheet[index]['data'].match(/^{/)!=null)
                    {   $scope.cadwolf_worksheet[index]['data']=JSON.parse($scope.cadwolf_worksheet[index]['data']);
                    }else
                    {   if (item.data.match(/<h1>/)!=null){ var hClass="header1"; }
                        if (item.data.match(/<h2>/)!=null){ var hClass="header2"; }
                        if (item.data.match(/<h3>/)!=null){ var hClass="header3"; }
                        if (item.data.match(/<h4>/)!=null){ var hClass="header4"; }
                        if (item.data.match(/<h5>/)!=null){ var hClass="header5"; }
                        var thisText=item['data'].replace(/<h1>|<\/h1>|<h2>|<\/h2>|<h3>|<\/h3>|<h4>|<\/h4>|<h5>|<\/h5>/g,'')
                        $scope.cadwolf_worksheet[index]['data']={};
                        $scope.cadwolf_worksheet[index]['data']['text']=thisText;
                        $scope.cadwolf_worksheet[index]['data']['hClass']=hClass;
                    }
                }
                if (item.vartype=="3")
                {   $scope.cadwolf_worksheet[index]['data']=JSON.parse($scope.cadwolf_worksheet[index]['data']); 
                    $scope.cadwolf_worksheet[index]['Equation']=new $scope.Equation($scope.cadwolf_worksheet[index]['data']);
                    if ($scope.cadwolf_worksheet[index]['Equation']['inputFile']==''){ $scope.cadwolf_worksheet[index]['Equation']['inputFile']=0; }
                    $scope.cadwolf_worksheet[index]['Equation']['newEquation']=$scope.cadwolf_worksheet[index]['Equation']['Format_left']+'='+$scope.cadwolf_worksheet[index]['Equation']['Format_right'];
                    delete $scope.cadwolf_worksheet[index]['data'];
                    
                }
                if ((item.vartype=="4")||(item.vartype=="9")||(item.vartype=="10")||(item.vartype=="12"))
                {   $scope.cadwolf_worksheet[index]['data']=JSON.parse($scope.cadwolf_worksheet[index]['data']);      }
                if (item.vartype=="5")
                {   $scope.cadwolf_worksheet[index]['props']=JSON.parse($scope.cadwolf_worksheet[index]['data']);      }
                if (item.vartype=="9")
                {   if(item['data']['Chart_textobj']===undefined){ item['data']['Chart_textobj']={}; }
                    if(item['data']['Chart_bandsobj']===undefined){ item['data']['Chart_bandsobj']={}; }
                    if(item['data']['Chart_linesobj']===undefined){ item['data']['Chart_linesobj']={}; }
                    if(item['data']['Chart_xaxesobj']===undefined){ item['data']['Chart_xaxesobj']={}; }
                    if(item['data']['Chart_yaxesobj']===undefined){ item['data']['Chart_yaxesobj']={}; }
                    $scope.cadwolf_worksheet[index]['Plot']=new $scope.Plot($scope.cadwolf_worksheet[index]['itemid'], $scope.cadwolf_worksheet[index]['data']);
                    $scope.cadwolf_worksheet[index]['Plot']['Chart_dataobj']=$.map(item['data']['Chart_dataobj'], function(value, index) { return [value]; })
                    $scope.cadwolf_worksheet[index]['Plot']['Chart_bandsobj']=$.map(item['data']['Chart_bandsobj'], function(value, index) { return [value]; })
                    $scope.cadwolf_worksheet[index]['Plot']['Chart_linesobj']=$.map(item['data']['Chart_linesobj'], function(value, index) { return [value]; })
                    $scope.cadwolf_worksheet[index]['Plot']['Chart_textobj']=$.map(item['data']['Chart_textobj'], function(value, index) { return [value]; })
                    $scope.cadwolf_worksheet[index]['Plot']['Chart_xaxesobj']=$.map(item['data']['Chart_xaxesobj'], function(value, index) { return [value]; })
                    $scope.cadwolf_worksheet[index]['Plot']['Chart_yaxesobj']=$.map(item['data']['Chart_yaxesobj'], function(value, index) { return [value]; })
                    delete $scope.cadwolf_worksheet[index]['data'];
                    $scope.cadwolf_worksheet[index]['Plot']['needsUpdateFlag']=1;
                }
                if (item.vartype=="10")
                {   if ($scope.cadwolf_worksheet[index]['data']['type']=="image/jpg")  { $scope.cadwolf_worksheet[index]['data']['thisType']="jpg"; }
				    if ($scope.cadwolf_worksheet[index]['data']['type']=="image/jpeg") { $scope.cadwolf_worksheet[index]['data']['thisType']="jpeg"; }
				    if ($scope.cadwolf_worksheet[index]['data']['type']=="image/bmp")  { $scope.cadwolf_worksheet[index]['data']['thisType']="bmp"; }
				    if ($scope.cadwolf_worksheet[index]['data']['type']=="image/png")  { $scope.cadwolf_worksheet[index]['data']['thisType']="png"; }
				    if ($scope.cadwolf_worksheet[index]['data']['type']=="image/gif")  { $scope.cadwolf_worksheet[index]['data']['thisType']="gif"; } 
                }
                if (item.vartype=="13")
                {   $scope.cadwolf_worksheet[index]['data']=JSON.parse($scope.cadwolf_worksheet[index]['data']); 
                    $scope.cadwolf_worksheet[index]['Surface']=new $scope.surface($scope.cadwolf_worksheet[index]['itemid'], $scope.cadwolf_worksheet[index]['data']);
                    $scope.cadwolf_worksheet[index]['Surface']['Chart_dataobj']=$.map(item['data']['Chart_dataobj'], function(value, index) { return [value]; })
                    delete $scope.cadwolf_worksheet[index]['data'];
                    var loader = new THREE.JSONLoader();
                    angular.element(document).ready(function() {
                        $scope.initializeSurface($scope.cadwolf_worksheet[index]['itemid'], 1);
                        $scope.cadwolf_worksheet[index]['Surface'].reDrawItem($scope.cadwolf_worksheet[index], 'all', 1) 	
                    });                    
                }
            });
        
        };

        // Immediately invoked function that sets the initial parameters and calls the function to get the data
        $scope.getInitialData=function ()
        {   $scope.setInitialParameters();
            $http.post('http://www.cadwolf.com/Documents/getInitialData', {fileURL:window.location.pathname}, {}).
            then(function(response)
             {  myResponse=response;
                $scope.cadwolf_permissions=JSON.parse(JSON.stringify(response.data.Permissions));
                $scope.cadwolf_fileInfo=JSON.parse(JSON.stringify(response.data.fileInfo.Workspace));
                $scope.cadwolf_worksheet=response.data.fileInfo.Document;
                if ((response.data.fileInfo.Workspace.fileData===undefined)||(response.data.fileInfo.Workspace.fileData=='')){   response.data.fileInfo.Workspace.fileData='{}'; }
                var fileInfo=JSON.parse(response.data.fileInfo.Workspace.fileData);
                if (fileInfo.References===undefined){ fileInfo.References=[]; }        
                if (fileInfo.fileFunData===undefined)
                {       $scope.cadwolf_fileFunData={};  $scope.cadwolf_fileFunData.fileFunName='';  $scope.cadwolf_fileFunData.fileFunInputs=[];  
                        $scope.cadwolf_fileFunData.fileFunOutputs=[];   $scope.cadwolf_fileFunData.impFunctions=[];
                }else{  $scope.cadwolf_fileFunData=fileInfo.fileFunData; }        
                if ($scope.cadwolf_fileFunData.impFunctions===undefined){   $scope.cadwolf_fileFunData.impFunctions=[]; }
                $scope.cadwolf_references=fileInfo.References;
                $scope.cadwolf_constants=response.data.constants;
                $scope.cadwolf_parseUnits=response.data.parseUnits;
                $scope.cadwolf_scaleUnits=response.data.scaleUnits;
                $scope.cadwolf_userName=response.data.userName;
                $scope.cadwolf_userID=response.data.userID;
                if (($scope.cadwolf_permissions['edit']=='1')&&($scope.cadwolf_fileInfo.checkoutID==$scope.cadwolf_userID)){ $scope.editPerm=true; }else{ $scope.editPerm=false; }              
                if ($scope.cadwolf_permissions['use']=='1'){ $scope.usePerm=true; }
                $scope.setDataParameters();
                if (parseInt($scope.cadwolf_fileInfo.angUpdate)==0) { $scope.solveFullDocument(); }
                myScope=$scope
             }, function(){ $scope.showMessage({type:"bad", messageText:"There was an error retrieving the data from the server"}, true); }); 
        }();


        // Function to resolve entire document upon page load
        $scope.solveFullDocument = function() 
        {   for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['vartype']==3)
                {   $scope.cadwolf_worksheet[a]['needsUpdateFlag']=1; 
                    for (var connID in $scope.cadwolf_worksheet[a]['Equation']['connected_ids'])
                    {   for (var b=0; b<$scope.cadwolf_worksheet.length; b++)
                        {   if ($scope.cadwolf_worksheet[b]['vartype']==3) { if ($scope.cadwolf_worksheet[b]['Equation']['Format_id']==connID){ $scope.cadwolf_worksheet[b]['Equation']['isConnectedID']=1; } } }  
                    }
                }
                if ($scope.cadwolf_worksheet[a]['vartype']==9)
                {   for (var dataIndex=0; dataIndex<$scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'].length; dataIndex++) 
                    {   $scope.cadwolf_worksheet[a]['Plot']['Chart_dataobj'][dataIndex]['needsUpdateFlag']=1; } 
                }
            }
            $scope.runEquationDigest();
        };
        
        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                                    TABLE ITEMS

            These items are functions related to tables. These functions include:
            
            addTableColumn      :   Prompts     :   Called when a plus at the top of the column are clicked
                                    Inputs      :   tableID - the ID for the table the column is to be added to. 
                                                    colNum - the column number of the plus
                                    Description :   This function adds a column to the table after the column clicked on.
                                                    
            deleteTableColumn   :   Prompts     :   Called when an x above a column is clicked
                                    Inputs      :   tableID - the ID for the table the column is to be added to. 
                                                    colNum - the column number of the plus
                                    Description :   This function deletes the column clicked on
                                                    
            addTableRow         :   Prompts     :   Called when a plus at the side of a row are clicked
                                    Inputs      :   tableID - the ID for the table the column is to be added to. 
                                                    rowNum - the row number of the plus
                                    Description :   This function adds a row to the table after the row clicked on.
                                    
            deleteTableRow      :   Prompts     :   Called when an x at the side of a row are clicked
                                    Inputs      :   tableID - the ID for the table the column is to be added to. 
                                                    rowNum - the row number of the plus
                                    Description :   This function deletes a row from the table.

        ------------------------------------------------------------------------------------------------------------------------------------------*/
        // The function to add a new column to the table
        $scope.addTableColumn = function (tableID, colNum) 	
        { 	for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['itemid']==tableID)
                {   var tempObj={'real':0, 'imag':'', 'equation':'=0', 'units':'', 'showEquation':false};
                    for(var i = 0 ; i < $scope.cadwolf_worksheet[a]['props']['data'].length ; i++){ $scope.cadwolf_worksheet[a]['props']['data'][i].splice(parseInt(colNum)+1, 0, JSON.parse(JSON.stringify(tempObj))); }
                }
            }
        };
        
        // The function to delete a column from the table
        $scope.deleteTableColumn = function (tableID, colNum) 	
        { 	for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['itemid']==tableID)
                {   for(var i = 0 ; i < $scope.cadwolf_worksheet[a]['props']['data'].length ; i++){ $scope.cadwolf_worksheet[a]['props']['data'][i].splice(colNum,1); } }
            }
        };

        // The function to add a new row to the table
        $scope.addTableRow = function (tableID, rowNum) 	
        { 	for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['itemid']==tableID)
                {   var tempObj={'real':0, 'imag':'', 'equation':'=0', 'units':'', 'showEquation':false};
                    var tempArray=Array();
                    for(var i = 0 ; i < $scope.cadwolf_worksheet[a]['props']['data'][0].length ; i++){ tempArray.push(JSON.parse(JSON.stringify(tempObj))); }
                    $scope.cadwolf_worksheet[a]['props']['data'].splice(rowNum, 0, tempArray); 
                }
            }
        };
        
        // The function to delete a row from the table
        $scope.deleteTableRow = function (tableID, rowNum) 	
        { 	for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['itemid']==tableID)  {   $scope.cadwolf_worksheet[a]['props']['data'].splice(rowNum,1); } }
        };        

        // The function to fill a table
        $scope.fillTable = function (tableObj, direction) 	
        { 	myObj=tableObj;
            console.log('The tableid is '+tableObj['itemid']+' and the direction is '+direction);
            for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['itemid']==tableObj['itemid'])
                {   console.log('The equation for the table data is '+tableObj['props']['data'][parseInt(tableObj.props.currentRow)][parseInt(tableObj.props.currentCol)]['equation']);
                    console.log('The active row and column are '+tableObj.props.currentRow+'-'+tableObj.props.currentCol); 
                    if (tableObj['props']['data'][parseInt(tableObj.props.currentRow)][parseInt(tableObj.props.currentCol)]['equation'].match(/^=/)==null)
                    {   var thisEquation=tableObj['props']['data'][parseInt(tableObj.props.currentRow)][parseInt(tableObj.props.currentCol)]['equation'];
                        var thisReal=tableObj['props']['data'][parseInt(tableObj.props.currentRow)][parseInt(tableObj.props.currentCol)]['real'];
                        var thisImag=tableObj['props']['data'][parseInt(tableObj.props.currentRow)][parseInt(tableObj.props.currentCol)]['imag'];
                        var thisUnits=tableObj['props']['data'][parseInt(tableObj.props.currentRow)][parseInt(tableObj.props.currentCol)]['units'];
                        if (direction=="up")
                        {   for (var row=0; row<tableObj.props.currentRow; row++)
                            {   tableObj['props']['data'][row][parseInt(tableObj.props.currentCol)]['equation']=thisEquation;  
                                tableObj['props']['data'][row][parseInt(tableObj.props.currentCol)]['real']=thisReal;  
                                tableObj['props']['data'][row][parseInt(tableObj.props.currentCol)]['imag']=thisImag;  
                                tableObj['props']['data'][row][parseInt(tableObj.props.currentCol)]['units']=thisUnits;  
                            }    
                        }
                        if (direction=="down")
                        {   for (var row=tableObj.props.currentRow; row<tableObj.props.data.length; row++)
                            {   tableObj['props']['data'][row][parseInt(tableObj.props.currentCol)]['equation']=thisEquation;  
                                tableObj['props']['data'][row][parseInt(tableObj.props.currentCol)]['real']=thisReal;  
                                tableObj['props']['data'][row][parseInt(tableObj.props.currentCol)]['imag']=thisImag;  
                                tableObj['props']['data'][row][parseInt(tableObj.props.currentCol)]['units']=thisUnits;  
                            }    
                        }
                        if (direction=="left")
                        {   for (var col=0; col<tableObj.props.currentCol; col++)
                            {   tableObj['props']['data'][parseInt(tableObj.props.currentRow)][col]['equation']=thisEquation;  
                                tableObj['props']['data'][parseInt(tableObj.props.currentRow)][col]['real']=thisReal;  
                                tableObj['props']['data'][parseInt(tableObj.props.currentRow)][col]['imag']=thisImag;  
                                tableObj['props']['data'][parseInt(tableObj.props.currentRow)][col]['units']=thisUnits;  
                            }    
                        }
                        if (direction=="right")
                        {   for (var col=tableObj.props.currentCol; col<tableObj.props.data[0].length; col++)
                            {   tableObj['props']['data'][parseInt(tableObj.props.currentRow)][col]['equation']=thisEquation;  
                                tableObj['props']['data'][parseInt(tableObj.props.currentRow)][col]['real']=thisReal;  
                                tableObj['props']['data'][parseInt(tableObj.props.currentRow)][col]['imag']=thisImag;  
                                tableObj['props']['data'][parseInt(tableObj.props.currentRow)][col]['units']=thisUnits;  
                            }    
                        }
                    }else
                    {   tableObj['props']['direction']=direction;
                        $scope.createEqObj(tableObj['itemid'], function() { $scope.callSolver(tableObj['itemid'], "SolveTableFill"); });
                    }
                }
            }
        };        


        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                                    FOR LOOP ITEMS

            These items are functions related to for loops. These functions include:
            
            ForLoop             :   Prompts     :   Called when a user clicks on the icon to add a for loop
                                    Inputs      :   loopObj - object holding properties for the loop 
                                    Description :   This function creates a new for loop object that is added to the worksheet 
                                                    
        ------------------------------------------------------------------------------------------------------------------------------------------*/

        // The function to create a new for loop
        $scope.ForLoop=function (loopObj) 	
        { 	this.Format_id=loopObj['Format_id'];	
            this.Page_position=0;	
            this.Page_topparentid='none';	
            this.Page_parentid='none';	
            this.counter='a';	
            this.Loop_counterValue=0;	
            this.valueid='';	
            this.startText='0';	
            this.start=0;	
            this.stopText='1';
            this.stop=1;	
            this.increment=1;
            this.incrementText='1';	
            this.numSteps=1;
            this.status=0;
            this.Format_haschanged=1;
            this.firstRun=0;
            this.limitFactor='<';
            this.Errors_flag=0;
            this.Errors_errors=new Array();	
            this.fileid=loopObj['fileid'];
            this.startInputEdit=false;
            this.incrementEdit=false;
            this.stopInputEdit=false;
            this.limitInputEdit=false;
            this.sublineEdit=false;
            this.needsUpdateFlag=false;
            for (var item in loopObj){ this[item]=loopObj[item]; }
        }

        // The function moves a subitem down one
        $scope.moveSubItemDown=function (itemID) 	
        { 	var thisParent='';
            console.log('Moving the item '+itemID+' up one.');
            for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['itemid']==itemID)
                {   for (var b=0; b<$scope.cadwolf_worksheet.length; b++)
                    {   if ($scope.cadwolf_worksheet[b]['itemid']==$scope.cadwolf_worksheet[a]['parentid'])
                        {   if ($scope.cadwolf_worksheet[b]['Page_lastposition']==$scope.cadwolf_worksheet[a]['location'])
                            {   if ($scope.cadwolf_worksheet[b]['parentid']=='none')
                                {   $scope.cadwolf_worksheet[a]['parentid']='none';
                                    $scope.cadwolf_worksheet[a]['topparentid']='none';
                                    $scope.cadwolf_worksheet[b]['Page_lastposition']=$scope.cadwolf_worksheet[b]['Page_lastposition']-1;
                                }else
                                {   for (var c=0; c<$scope.cadwolf_worksheet.length; c++)
                                    {   if ($scope.cadwolf_worksheet[c]['itemid']==$scope.cadwolf_worksheet[b]['parentid'])  
                                        {   $scope.cadwolf_worksheet[a]['parentid']=$scope.cadwolf_worksheet[c]['parentid'];
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // The function moves a subitem up one
        $scope.moveSubItemDown=function (itemID) 	
        { 	console.log('Moving the item '+itemID+' down one.');
            for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[b]['itemid']==$scope.cadwolf_worksheet[b]['parentid'])
                {   
                    
                }
            }
        }

         /*------------------------------------------------------------------------------------------------------------------------------------------
                                                                    IF ELSE ITEMS

            These items are functions related to for loops. These functions include:
            
            IfElse              :   Prompts     :   Called when a user clicks on the icon to add an if else statement
                                    Inputs      :   loopObj - object holding properties for the statement 
                                    Description :   This function creates a new if else object that is added to the worksheet 

            statementItem       :   Prompts     :   Called from the program when the statement is created or when a statement is added
                                    Inputs      :   none 
                                    Description :   This function creates a new statement object that is added to the if else statement

            addStatement        :   Prompts     :   Called when the user clicks an icon on the while loop or if else statement to add a new statement
                                    Inputs      :   itemID          - the ID of the while loop or if/else statement
                                                    type            - the phrase 'ifelse' or 'whileloop'
                                                    blockIndex      - the index of the block the statement is to be added to
                                                    statementIndex  - the index of the statement that the statement is to be added after
                                    Description :   This function adds an object to the statementBlock at the block index given and one step after
                                                    the statement index given. The new object is a statementItem

            addBlock            :   Prompts     :   Called when the user clicks an icon on the while loop or if else statement to add a new block
                                    Inputs      :   itemID          - the ID of the while loop or if/else statement
                                                    type            - the phrase 'ifelse' or 'whileloop'
                                                    blockIndex      - the index of the block the new block is to be added after
                                    Description :   This function adds a new block object to the statementBlock after the block index given a new
                                                    statement is added at the zero index of the new block

            deleteStatement     :   Prompts     :   Called when the user clicks an icon on the while loop or if else statement to delete a statement
                                    Inputs      :   itemID          - the ID of the while loop or if/else statement
                                                    type            - the phrase 'ifelse' or 'whileloop'
                                                    blockIndex      - the index of the block the statement is to be deleted from
                                                    statementIndex  - the index of the statement to be deleted
                                    Description :   This function deletes a statement from the statementBlock array for the block and statement index
                                                    given. If the statement is the last one remaining in the block then the block is deleted 

            setStatementOption  :   Prompts     :   Called when the user clicks an icon on the while loop or if else statement to delete a statement
                                    Inputs      :   itemID          - the ID of the while loop or if/else statement
                                                    type            - the phrase 'ifelse' or 'whileloop'
                                                    blockIndex      - the index of the block where the option is being set
                                                    statementIndex  - the index of the statement where the option is being set
                                                    optionType      - a || or && meaning an "and" or an "or" 
                                    Description :   This function sets the option for the statement. This option is the "and" or the "or" that proceeds
                                                    the statement in question. If the index is 0, then the option is for the block

            solveStatement      :   Prompts     :   Called when the user changes a flag or a dependent value
                                    Inputs      :   itemID          - the ID of the while loop or if/else statement
                                                    type            - the phrase 'ifelse' or 'whileloop'
                                                    blockIndex      - the index of the block where the option is being set
                                                    statementIndex  - the index of the statement where the option is being set
                                    Description :   This function calls the solver algorithm and solves all of the statement blocks in the if/else
                                                    or the while loop. It returns the values and the true/false for each statement as well as the
                                                    strings used in the specifics view

        ------------------------------------------------------------------------------------------------------------------------------------------*/

        // The function to create a new if else statement
        $scope.IfElse=function (loopObj) 	
        { 	this.Format_id=loopObj['Format_id'];	
            this.Page_position=0;	
            this.parentStatement=loopObj['Format_id'];	
            this.Page_topparentid='none';	
            this.Page_parentid='none';	
            this.Statement_Type="if";
            this.Statement_String='';
            this.Statement_TFString='';
            this.Statement_ValueString='';
            this.Statement_truefalse=false;	
            this.Statement_Execute='0';	
            this.Statement_Parent=loopObj['Format_id'];	
            this.Statement_Order=new Array();
            this.Errors_errors=new Array();	
            this.Errors_flag=0;
            this.parentStatement=loopObj['Format_id'];
            this.statementBlock=[];
            this.statementBlock[0]=[];
            this.statementBlock[0].push(new $scope.statementItem());
            this.firstRun=1;	
            this.fileid=loopObj['fileid'];
            this.sublineEdit=false;
            this.needsUpdateFlag=false;
            this.needsBlockUpdateFlag=false;
            this.Dependents={};
            for (var item in loopObj){ this[item]=loopObj[item]; }
        }
        
        // Function to create a new statement for if else statements and while loops
        $scope.statementItem=function ()
        {   var thisObject={};
            thisObject['blockOption']="||";
            thisObject['conditionText']="==";
            thisObject['dependentText']="1";
            thisObject['dependentValue']=1;	
            thisObject['flagText']="flag";
            thisObject['flagValue']=1;
            thisObject['truefalse']=false;
            thisObject['flagInputEdit']=false;
            thisObject['dependentInputEdit']=false;
            thisObject['conditionInputEdit']=false;
            thisObject['showClass']='falsestatements';
            thisObject['showOptions']=false;
            thisObject['needsUpdateFlag']=false;
            return thisObject;
        }
        
        // Function to add a new statement to an if else statement or to a while loop
        $scope.addStatement=function (itemID, type, blockIndex, statementIndex)
        {   console.log('The add statement function was called with the id of '+itemID+' block index of '+blockIndex+', and statement index of '+statementIndex);
            for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['itemid']==itemID)
                {   var newStatement=new $scope.statementItem();
                    $scope.cadwolf_worksheet[a][type]['statementBlock'][blockIndex].splice(statementIndex+1, 0, newStatement);
                    break
                }
            }
         myScope=$scope;
        }

        // Function to add a new block to an if else statement or to a while loop
        $scope.addBlock=function (itemID, type, blockIndex)
        {   console.log('The add block function was called with the id of '+itemID+' block index of '+blockIndex);
            for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['itemid']==itemID)
                {   var statementBlock=[];
                    statementBlock.push(new $scope.statementItem());
                    $scope.cadwolf_worksheet[a][type]['statementBlock'].splice(blockIndex+1, 0, statementBlock);
                    break
                }
            }
         myScope=$scope;
        }
        
        // Function to delete a statement from a block
        $scope.deleteStatement=function (itemID, type, blockIndex, statementIndex)
        {   console.log('The delete statement function was called with the id of '+itemID+' block index of '+blockIndex+' and a statement index of '+statementIndex);
            for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['itemid']==itemID)
                {   $scope.cadwolf_worksheet[a][type]['statementBlock'][blockIndex].splice(statementIndex, 1);
                    if ($scope.cadwolf_worksheet[a][type]['statementBlock'][blockIndex].length==0)
                    {   $scope.cadwolf_worksheet[a][type]['statementBlock'].splice(blockIndex, 1);    }
                    if ($scope.cadwolf_worksheet[a][type]['statementBlock'].length==0)
                    {   $scope.cadwolf_worksheet[a][type]['statementBlock'][0]=[];
                        $scope.cadwolf_worksheet[a][type]['statementBlock'][0].push(new $scope.statementItem());    }
                    break
                }
            }
        }
        
        // Function to set the option for a block
        $scope.setStatementOption=function(itemID, type, blockIndex, statementIndex, optionType)
        {   console.log('The set block option function was called with the id of '+itemID+', type of '+type+' block index of '+blockIndex+', a statement index of '+statementIndex+' and a optionType of '+optionType);
            for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['itemid']==itemID)
                {   $scope.cadwolf_worksheet[a][type]['statementBlock'][blockIndex][statementIndex]['blockOption']=optionType;  
                    $scope.runEquationDigest();
                    break
                }
            }
        }
        
        // Function to solve for an option block statement
        $scope.solveStatement=function(itemID, type, blockIndex, statementIndex)
        {   console.log('The solve statement function was called with the id of '+itemID+', type of '+type+' block index of '+blockIndex+' and a statement index of '+statementIndex);
            for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['itemid']==itemID)
                {}
            }
        }
                
        
        
         /*------------------------------------------------------------------------------------------------------------------------------------------
                                                                    WHILE LOOP ITEMS

            These items are functions related to for loops. These functions include:
            
            WhileLoop           :   Prompts     :   Called when a user clicks on the icon to add a while loop
                                    Inputs      :   loopObj - object holding properties for the loop
                                    Description :   This function creates a new while loop object that is added to the worksheet 

        ------------------------------------------------------------------------------------------------------------------------------------------*/

        // The function to create a new if else statement
        $scope.WhileLoop=function (loopObj) 	
        { 	this.Format_id=loopObj['Format_id'];	
            this.Page_position=0;	
            this.Page_topparentid='none';	
            this.Page_parentid='none';	
            this.Loop_numsteps='';		
            this.Loop_stepLimit=100;
            this.Loop_counterValue=0;
            this.Loop_TFString='';
            this.Loop_ValueString='';
            this.Loop_truefalse=false;	
            this.Errors_errors=new Array();	
            this.Errors_flag=0;
            this.statementBlock=[];
            this.statementBlock[0]=[];
            this.statementBlock[0].push(new $scope.statementItem());
            this.firstRun=1;	
            this.fileid=loopObj['fileid'];
            this.sublineEdit=false;
            this.needsUpdateFlag=false;
            for (var item in loopObj){ this[item]=loopObj[item]; }
        }

        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                            BIBLIOGRAPHY FUNCTIONS

            These items are functions related to the bibliogaphy. This includes the class object for the reference item and the functions to add
            or delete a reference. The way references are used now is that a reference is added to the document on the bibliography view. In the
            specifics view for all of the items, the user then tags a reference to an item when they want to use it. This lets us add a reference
            to multiple items.
            
            Reference           :   Prompts     :   Called when the user clicks to add a new reference item
                                    Inputs      :   refObj - an object that contains any of the properties that you may wish to rewrite when the 
                                                    object is created. The object should have the id for the reference as created by the get_id.
                                    Description :   This function simply creates the reference object for a new reference.                                                    

            addReference        :   Prompts     :   Called when the user clicks the button to add a new reference to the document
                                    Inputs      :   
                                    Description :   This function simply adds a new reference item to the global object                                                    

            addDeleteReference  :   Prompts     :   Called when the user tags a reference to an item
                                    Inputs      :   refID   -   the ID of the reference being tagged
                                                    thisItem  - the current item object
                                    Description :   This function simply adds a new reference item to the global object                                                    

        ------------------------------------------------------------------------------------------------------------------------------------------*/

        $scope.Reference=function (refObj) 	
        {   this['refID']='';
            this['type']='web';
            this['author']='Author';
            this['reftext']='';
            this['address']='http://www.cadwolf.com';
            this['pagetitle']='Page Title';	
            this['sitetitle']='Site Name';	
            this['dateaccessed']='January 1, 2016';	
            this['booktitle']='Book Title';	
            this['publisher']='Publisher';	
            this['datepublished']='January 1, 2016';
            this['articletitle']='Article Title';	
            this['magpapername']='Magazine Name';	
            this['page']='1';	
            this['entryname']='Entry Name';	
            this['encname']='Encyclopedia Name';
            this['edition']='1';
            this['year']='2016';	
            this['showEdits']=true;
            this['refNum']=0;	        
            for (var refProp in refObj) { this[refProp]=refObj[refProp]; }
        };
        
        $scope.addReference=function (refObj) 	
        {   $scope.cadwolf_references.push(new $scope.Reference({refID:$scope.getID('Ref', 'thisFile'), refNum:$scope.cadwolf_references.length})); 
            $scope.cadwolf_references.sort($scope.dynamicSort("refNum"));
            myScope=$scope;    
        };
        
        $scope.addDeleteReference=function (refID, thisItem) 	
        {   var flag=0, refIndex=0;
            if (thisItem['Values']['References']===undefined){  thisItem['Values']['References']=[];    }
            for (var a=0; a<thisItem['Values']['References'].length; a++){   if (thisItem['Values']['References'][a]==refID){   flag=1; refIndex=a;    }   }
            if (flag==0) {   thisItem['Values']['References'].push(refID);    }
            if (flag==1) {   thisItem['Values']['References'].splice(refIndex, 1);    }
            var tempArray=[];
            for (var a=0; a<$scope.cadwolf_references.length; a++)
            {   for (var b=0; b<thisItem['Values']['References'].length; b++)
                {   if ($scope.cadwolf_references[a]['refID']==thisItem['Values']['References'][b])
                    {   tempArray.push($scope.cadwolf_references[a]['refID']);   }
                }
            }
            thisItem['Values']['References']=tempArray;
            myScope=$scope;
        };
        

        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                            UTILITY FUNCTIONS

            These items are functions related to the items that are called on page load. These functions do a number of things. There is one that 
            is invoked when loaded and calls the server for data. Another then sets the starting parameters. These functions include:
            
            dynamicSort         :   Prompts     :   Called to sort arrays like cadwolf_worksheet by location
                                    Inputs      :   text representing the name of the property to sort by
                                    Description :   This function is invoked on an array and is given a property of the objects that comprise that
                                                    array. It then sorts the array by that property. I use it to sort the worksheet object by 
                                                    location so that I can step through and set dependencies more easily.                                                    

            inputArray          :   Prompts     :   Called from view when user enters new labels in plot spec
                                    Inputs      :   text containing the string that is to be parsed
                                    Description :   This function takes a string that is to be labels for an item and parses that string into
                                                    an array that is equally separated by commas. That is to say that it looks at parenthesis and
                                                    other things and places those within containing commas.

        ------------------------------------------------------------------------------------------------------------------------------------------*/
        
        // Sort an array using a property
        $scope.dynamicSort = function(property) 
        {   var sortOrder = 1;
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a,b) 
            {   var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0; 
                return result * sortOrder;
            }
        }
        
        // Converts a string into an array for inputs - used here for labels on column or pie charts
        $scope.inputArray = function(text)	
        {   var inputarray=new Array();	var numarray=new Array();	var flip=0;	var bcount=0; var pcount=0;	
            inputarray=$scope.splitText(text);		
            for (var a=0; a<inputarray.length; a++)	{ if (inputarray[a]!=",") { numarray[a]=1;}else { numarray[a]=0; } }
            for (var a=0; a<inputarray.length; a++)	
            {	if (inputarray[a]=="(") { flip=1; bcount=parseInt(bcount, 10)+1; }
                if (inputarray[a]=="[") { flip=1; pcount=parseInt(pcount, 10)+1; }
                if (inputarray[a-1]==")") { bcount=bcount-1; }
                if (inputarray[a-1]=="]") { pcount=pcount-1; }
                if (((inputarray[a-1]==")")||(inputarray[a-1]=="]"))&&((bcount===0)&&(pcount===0))) { flip=0; }	
                if (flip==1) { numarray[a]=1; }	
            }
            for (var i = inputarray.length; i >0; i--) 
            {	if ((numarray[i] == '1')&&(numarray[parseInt(i, 10)-1] == '1'))	
                {	inputarray[i-1]=inputarray[i-1]+inputarray[i];
                    inputarray.splice(i, 1); 
                    numarray.splice(i, 1);
            }	}
            for (var i = inputarray.length; i >=0; i--) { if ((inputarray[i]==',')||(inputarray[i]==' ')||(inputarray[i]==='')){ inputarray.splice(i, 1); }	}
            return inputarray;
        };
        
        // Splits text up along the desired parameters
        $scope.splitText=function(temp)				
        {	temp=temp.replace(/\s+[+]\s+/g,"?+?");
            temp=temp.replace(/\s+[-]\s+/g,"?-?");
            temp=temp.replace(/\s+[*]\s+/g,"?*?");
            temp=temp.replace(/\.\*/g,"?#?");	
            temp=temp.replace(/\+/g,"?+?");		
            temp=temp.replace(/\-/g,"?-?");		
            temp=temp.replace(/\*/g,"?*?");		
            temp=temp.replace(/\,/g,"?,?");		
            temp=temp.replace(/\;/g,"?;?");		
            temp=temp.replace(/\:/g,"?:?");		
            temp=temp.replace(/\s/g,"?");		
            temp=temp.replace(/{/g,"?{?");     	
            temp=temp.replace(/}/g,"?}?");		
            temp=temp.replace(/\]/g,"?]?");		
            temp=temp.replace(/\[/g,"?[?");	    
            temp=temp.replace(/\(/g,"?(?"); 
            temp=temp.replace(/\)/g,"?)?");     
            temp=temp.replace(/\\/g,"? \\?");	
            temp=temp.replace(/\//g,"?/?");		
            temp=temp.replace(/,+$/,"");		
            temp=temp.replace(/\^/g,"?^?");		
            temp=temp.replace(/\?{2,100}/g,"?");
            temp=temp.replace(/^\?\-\?/,"-?");	
            temp=temp.replace(/\s+$/,'');		
            temp=temp.replace(/^\s+/,'');		
            splittext=temp.split("?");			
            return splittext;					
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
        };	
        
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
            {	for ( var i = 0; i < this['Chart_dataobj'][dataIndex].surfaceGeometry.vertices.length; i++ ) 	
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
                    {	wireTexture.wrapS = wireTexture.wrapT = THREE.RepeatWrapping; 		
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
                graphMesh.id = dataID;	
                graphMesh.name = dataID;
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
        $scope.initializeSurface = function(plotID, reset)	
        {	console.log('Initializing the surface for '+plotID);
            $scope.cadwolf_worksheet.forEach(function(thisItem, index)
            {   if (thisItem.itemid==plotID)
                {   if (thisItem['vartype']==9) { thisItem['vartype']=13; this['Chart_dataobj']=[] }
                    delete thisItem.Plot;
                    if (reset==1)				
                    {	for (var dataIndex in thisItem['Surface']['Chart_dataobj'])				
                        {	var dataObj=new $scope.surfaceData(thisItem['Surface']['Chart_dataobj'][dataIndex]['Format_id'], plotID, thisItem['Surface']['Chart_dataobj'][dataIndex]);				
                            thisItem.Surface.Chart_dataobj[dataIndex]=dataObj;
                        }						
                    }else
                    {   thisItem.Surface=new $scope.surface(plotID);
                    }
                    thisItem.Surface.Scene=new THREE.Scene();
                    thisItem.Surface.Camera = new THREE.PerspectiveCamera( thisItem.Surface.Props.view_angle, thisItem.Surface.Props.aspect, thisItem.Surface.Props.near, thisItem.Surface.Props.far);	
                    thisItem.Surface.Camera.up = new THREE.Vector3( 0, 0, 1 );
                    thisItem.Surface.Camera.name = 'camera';
                    thisItem.Surface.Keyboard = new THREEx.KeyboardState();	
                    thisItem.Surface.Clock = new THREE.Clock();
                    thisItem.Surface.Scene.add(thisItem.Surface.Camera);
                    if ( Detector.webgl ) { thisItem.Surface.Renderer = new THREE.WebGLRenderer( {antialias:true} ); } else { thisItem.Surface.Renderer = new THREE.CanvasRenderer(); }	
                    thisItem.Surface.Renderer.setSize(thisItem.Surface.Props.screen_width, thisItem.Surface.Props.screen_height);	
                    thisItem.Surface.Renderer.setClearColor( 0xffffff, 1);	
                    console.log('The item id is '+thisItem.itemid);
                    container = document.getElementById( thisItem.itemid );			
                    container.appendChild( thisItem.Surface.Renderer.domElement );					
                    thisItem.Surface.Controls = new THREE.TrackballControls( thisItem.Surface.Camera, thisItem.Surface.Renderer.domElement );	
                }
            });
            myScope=$scope;
        };

        // Render a surface object
        $scope.surface.prototype.Render = function (plotID) 			
        {	CPLOT=plotID;	
            console.log('Rendering '+plotID);
            this.axisHelper=1;
            this.Renderer.setClearColor( 0xFFFFFF, 1 );				
            this.Controls.update();
            this.Renderer.render( this.Scene, this.Camera ); 
            var container = document.getElementById( plotID );			
            container.appendChild( this.Renderer.domElement );					
            this.setLegend();        
        }								

        // Start and stop the request animation frame from the GPU
        $scope.animate = function (){ cancelAnimationFrame( $scope.APLOT ); $scope.APLOT=requestAnimationFrame( $scope.animate ); $scope.currentPlot['Surface'].Renderer.render( $scope.currentPlot['Surface'].Scene, $scope.currentPlot['Surface'].Camera ); $scope.currentPlot['Surface'].Controls.update(); }
        $scope.cancel_animate = function () { console.log('Canceling animation frame'); cancelAnimationFrame( $scope.APLOT ); } 	

        // Redraw a surface
        $scope.surface.prototype.reDrawItem = function (plotObj, dataID, toRender, callback) 	
        {	var thisID='';
            if (dataID=='all')
            {   
                for (var dataIndex=0; dataIndex<plotObj['Surface']['Chart_dataobj'].length; dataIndex++)				
                {	thisID=plotObj['Surface']['Chart_dataobj'][dataIndex]['Format_id'];
                    if (dataIndex==plotObj['Surface']['Chart_dataobj'].length-1){ toRender=1; }else{ toRender=0; }
                    console.log('I should be drawing a '+plotObj['Surface']['Chart_dataobj'][dataIndex]['type']+' for '+thisID+' with a render of '+toRender);
                    if ((plotObj['Surface']['Chart_dataobj'][dataIndex]['type']=="Surface")||(plotObj['Surface']['Chart_dataobj'][dataIndex]['type']=="PointCloud"))
                    {	if (toRender=="1") { plotObj['Surface'].removeItem(thisID, function() { plotObj['Surface'].setSurfaceVertices(thisID, function() { plotObj['Surface'].setPlotExtremes(function() {plotObj['Surface'].setSurfaceColors( thisID, function(){plotObj['Surface'].setMeshes( thisID, function(){plotObj['Surface'].setPositions(  function(){ plotObj['Surface'].Render( plotObj['Surface'].Format_plotid )} )} )} )} )} )} ); 
                        }else              { plotObj['Surface'].removeItem(thisID, function() { plotObj['Surface'].setSurfaceVertices(thisID, function() { plotObj['Surface'].setPlotExtremes(function() {plotObj['Surface'].setSurfaceColors( thisID, function(){plotObj['Surface'].setMeshes( thisID, function(){plotObj['Surface'].setPositions( )} )} )} )} )} );  }
                    }else if (plotObj['Surface']['Chart_dataobj'][dataIndex]['type']=="Line")		
                    {	if (toRender=="1") { plotObj['Surface'].removeItem(thisID,  function() {plotObj['Surface'].setLineColors( thisID, function(){plotObj['Surface'].setMeshes( thisID,  function(){plotObj['Surface'].setPositions( function(){plotObj['Surface'].Render( plotObj['Surface'].Format_plotid )} )} )} )} ); 
                        }else              { plotObj['Surface'].removeItem(thisID,  function() {plotObj['Surface'].setLineColors( thisID, function(){plotObj['Surface'].setMeshes( thisID,  function(){plotObj['Surface'].setPositions( )} )} )} );  }
                    }else if (plotObj['Surface']['Chart_dataobj'][dataIndex]['type']=="Lathe")
                    {       plotObj['Surface'].formatLatheData(plotObj['Surface']['itemid'], thisID);	
                    }else { plotObj['Surface'].createShape(plotObj['Surface']['Chart_dataobj'][dataIndex]['type'], plotObj['itemid'], thisID, toRender);		}
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
                        }else if (plotObj['Surface']['Chart_dataobj'][dataIndex]['type']=="Lathe")
                        {       plotObj['Surface'].formatLatheData(plotObj['Surface']['itemid'], dataID);	
                        }else { plotObj['Surface'].createShape(plotObj['Surface']['Chart_dataobj'][dataIndex]['type'], plotObj['itemid'], dataID, toRender);		}
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
                {   $('#'+legendID).empty();
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
                    container = document.getElementById(legendID);				
                    console.log('Trying to append the legend to '+legendID);
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
                    $('#'+plotID+'LegendTicks').empty();					
                    var width=parseInt(800/this.Props.Legend.numTicks, 10);
                    for ( var i = 0; i < this.Props.Legend.numTicks; i++ ) 
                    {	var number=this.Props.zMin+i*(this.Props.zMax-this.Props.zMin)/(this.Props.Legend.numTicks-1); 
                        $('#'+plotID+'LegendTicks').append('<div class="Legend_Tick">'+Math.round(10000*number)/10000+'</div>');
                    }						
                    $('#'+plotID+'LegendTicks').find('.Legend_Tick').css('width',width);			
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
                        $('#'+legendID+'Legend').empty();					
                        container = document.getElementById(legendID+'Legend');				
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
                        $('#'+legendID+'LegendTicks').empty();					
                        var width=parseInt(800/this['Chart_dataobj'][dataIndex]['legendNumTicks'], 10);
                        for ( var i = 0; i < this['Chart_dataobj'][dataIndex].legendNumTicks; i++ ) 
                        {	var number=this['Chart_dataobj'][dataIndex].zMin+i*(this['Chart_dataobj'][dataIndex].zMax-this['Chart_dataobj'][dataIndex].zMin)/(this['Chart_dataobj'][dataIndex].legendNumTicks-1); 
                            $('#'+legendID+'LegendTicks').append('<div class="Legend_Tick">'+Math.round(10000*number)/10000+'</div>');		}
                        $('#'+legendID+'LegendTicks').find('.Legend_Tick').css('width',width);			
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

        $scope.deleteSurfaceDataset=function (plotObj, dataID)		        								
        {	var seriesNum="NA";
            for (var a=0; a<plotObj['Surface']['Chart_dataobj'].length; a++)
            {   if (plotObj['Surface']['Chart_dataobj'][a]['Format_id']==dataID)
                {   seriesNum=plotObj['Surface']['Chart_dataobj'][a]['series'];
                    plotObj['Surface']['Chart_dataobj'].splice(a, 1);
                }
            }
            for (var a=0; a<plotObj['Surface']['Chart_dataobj'].length; a++)
            {   if ((plotObj['Surface']['Chart_dataobj'][a]['series']>=seriesNum)&&(seriesNum!="NA"))
                {   plotObj['Surface']['Chart_dataobj'][a]['series']=plotObj['Surface']['Chart_dataobj'][a]['series']-1;  }   }
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
        {	console.log('Creating a '+thisShape+' for dataset '+dataID+' with a render of '+toRender);
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
            if (thisShape=="Cylinder"){	    var shape = THREE.SceneUtils.createMultiMaterialObject( new THREE.CylinderGeometry(parseFloat(thisData.topRadius), parseFloat(thisData.botRadius), thisData.height, thisData.radSegs, thisData.heightSegs, thisData.openEnded, ts, tl), multiMaterial );}	
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


        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                   SURFACE MAP SECTION 6 - SOLVING AND SETTING DATA 

            The two functions in this section call the solver for the surface data once one of the data items has been edited and then handle the 
            data that is returned from the web worker.

            solveSurfaceData     :  Prompts     :   
                                    Inputs      :   plotID - the id of the plot in question
                                                    dataID - the id of the dataset in question
                                                    plotObject - the overall object on the worksheet
                                    Description :  

            callSurfaceSolver    :  Prompts     :   
                                    Inputs      :   thisShape - text representing the shape being created. This is "Cube", "Sphere", etc
                                                    dataID - the id of the dataset in question 
                                                    toRender - a "1" or a "0" defining whether or not the surface is ready to be rendered
                                    Description :  

        ------------------------------------------------------------------------------------------------------------------------------------------*/

        // Function call to solve for the surface data
        $scope.solveSurfaceData = function (plotID, dataID, plotObject, axis, type){	$scope.createEqObj(plotID, function() { $scope.callSurfaceSolver(plotID, dataID, plotObject, axis, type) });	}

        // Call the web worker and deal with the data that it returns
        $scope.callSurfaceSolver = function (plotID, dataID, plotObject, axis, type)		
        {	console.log('In the call surface solver with a plot ID of '+plotID+', a data ID of '+dataID+' an axis of '+axis+' and a type of '+type);
            thisItem={}, sendObj={};
            for (var a=0; a<$scope.cadwolf_worksheet.length; a++)
            {   if ($scope.cadwolf_worksheet[a]['itemid']==plotID)
                {   sendObj=$scope.cadwolf_worksheet[a]['sendObj']; 
                    for (var b=0; b<$scope.cadwolf_worksheet[a]['Surface']['Chart_dataobj']; b++)
                    {   if ($scope.cadwolf_worksheet[a]['Surface']['Chart_dataobj'][b]['Format_id']==dataID)
                        {   $scope.cadwolf_worksheet[a]['Surface']['Chart_dataobj'][b]['surfaceGeometry']={}; 
                            $scope.cadwolf_worksheet[a]['Surface']['Chart_dataobj'][b]['xData']={}; 
                            $scope.cadwolf_worksheet[a]['Surface']['Chart_dataobj'][b]['yData']={}; 
                            $scope.cadwolf_worksheet[a]['Surface']['Chart_dataobj'][b]['zData']={}; 
                    }   }
                    thisItem=$scope.cadwolf_worksheet[a]; 
            }   }
            surfaceObject={			
                "cadwolfType":"SolveSurfaceData", 		
//                "dataObject":plotObject['Chart_dataobj'],	
                "dataObject":JSON.stringify(thisItem['Surface']['Chart_dataobj']),	
                "Props":thisItem['Surface']['Props'],		
                "axis":axis,			
                "PlotID":plotID,		
                "DataID":dataID,		
                "Units_Object":$scope.cadwolf_scaleUnits,
                "ParseUnits":$scope.cadwolf_parseUnits,
                "ImportedFunctions":$scope.cadwolf_fileFunData.impFunctions,
                "FileID":thisItem['fileid'],
                "Location":thisItem['location'],
                "type":type,	
                "Constants":$scope.cadwolf_constants,
                "EqObj":sendObj
            };							
            equationWorker.postMessage(surfaceObject);			
            equationWorker.onmessage = function(e) 	
            {	returnObject=e.data;	
                var xMax=-99999999, xMin=999999999, yMax=-99999999, yMin=999999999, zMax=-99999999, zMin=999999999, cMax=-99999999, cMin=999999999;		
                $scope.cadwolf_worksheet.forEach(function(item, index)
                {   if (item.itemid==returnObject['PlotID'])
                    {   for (var dataIndex=0; dataIndex<returnObject['dataObject'].length; dataIndex++)
                        {   if (returnObject['dataObject'][dataIndex]['Format_id']==returnObject['DataID']){ var returnIndex=dataIndex; } }
                        for (var dataIndex=0; dataIndex<item['Surface']['Chart_dataobj'].length; dataIndex++)
                        {   if (item['Surface']['Chart_dataobj'][dataIndex]['Format_id']==returnObject['DataID'])
                            {   $scope.digestStatus=1;
                                item['Surface']['Props']=JSON.parse(JSON.stringify(returnObject['Props']));					
                                item['Surface']['Chart_dataobj'][dataIndex]['xMax']=JSON.parse(JSON.stringify(returnObject['dataObject'][returnIndex]['xMax']));
                                item['Surface']['Chart_dataobj'][dataIndex]['xMin']=JSON.parse(JSON.stringify(returnObject['dataObject'][returnIndex]['xMin']));
                                item['Surface']['Chart_dataobj'][dataIndex]['yMax']=JSON.parse(JSON.stringify(returnObject['dataObject'][returnIndex]['yMax']));
                                item['Surface']['Chart_dataobj'][dataIndex]['yMin']=JSON.parse(JSON.stringify(returnObject['dataObject'][returnIndex]['yMin']));
                                item['Surface']['Chart_dataobj'][dataIndex]['zMax']=JSON.parse(JSON.stringify(returnObject['dataObject'][returnIndex]['zMax']));
                                item['Surface']['Chart_dataobj'][dataIndex]['zMin']=JSON.parse(JSON.stringify(returnObject['dataObject'][returnIndex]['zMin']));
                                item['Surface']['Chart_dataobj'][dataIndex]['cMax']=JSON.parse(JSON.stringify(returnObject['dataObject'][returnIndex]['cMax']));
                                item['Surface']['Chart_dataobj'][dataIndex]['cMin']=JSON.parse(JSON.stringify(returnObject['dataObject'][returnIndex]['cMin']));
                                item['Surface']['Chart_dataobj'][dataIndex]['xData']=JSON.parse(JSON.stringify(returnObject['dataObject'][returnIndex]['xData']));
                                item['Surface']['Chart_dataobj'][dataIndex]['yData']=JSON.parse(JSON.stringify(returnObject['dataObject'][returnIndex]['yData']));
                                item['Surface']['Chart_dataobj'][dataIndex]['zData']=JSON.parse(JSON.stringify(returnObject['dataObject'][returnIndex]['zData']));
                                item['Surface']['Chart_dataobj'][dataIndex]['cData']=JSON.parse(JSON.stringify(returnObject['dataObject'][returnIndex]['cData']));
                                if ((returnObject['type']=="Surface")||(returnObject['type']=="PointCloud"))
                                {   item['Surface']['Chart_dataobj'][dataIndex]['xLength']=returnObject['dataObject'][returnIndex]['xLength'];
                                    item['Surface']['Chart_dataobj'][dataIndex]['yLength']=returnObject['dataObject'][returnIndex]['yLength'];
                                    item['Surface'].removeItem(dataID, 	
                                        function(){item['Surface'].setSurfaceVertices( returnObject['DataID'], 	
                                        function(){item['Surface'].setPlotExtremes( 					
                                        function(){item['Surface'].setSurfaceColors( returnObject['DataID'], 	
                                        function(){item['Surface'].setMeshes( returnObject['DataID'], 			
                                        function(){item['Surface'].setPositions( 	 			
                                        function(){item['Surface'].Render( returnObject['PlotID'])} )} )} )} )} )} );		

                                }else if (returnObject['type']=="Line")	
                                {   item['Surface']['Chart_dataobj'][dataIndex]['lineGeometry']=JSON.parse(JSON.stringify(returnObject['dataObject'][returnIndex]['lineGeometry']));
                                    item['Surface'].removeItem(returnObject['DataID'], 	
                                        function(){item['Surface'].setPlotExtremes( 					
                                        function(){item['Surface'].setLineColors( returnObject['DataID'], 		
                                        function(){item['Surface'].setMeshes( returnObject['DataID'],			
                                        function(){item['Surface'].setPositions( 	 			
                                        function(){item['Surface'].Render( returnObject['PlotID'] )} )} )} )} )} );    
                                }else if (returnObject['type']=="Lathe")
                                {	item['Surface']['Chart_dataobj'][dataIndex]['xLength']=returnObject['dataObject'][returnIndex]['xLength'];
                                    item['Surface']['Chart_dataobj'][dataIndex]['yLength']=returnObject['dataObject'][returnIndex]['yLength'];
                                    item['Surface'].formatLatheData(returnObject['PlotID'], returnObject['DataID']);
                                }
                            }
                        }
                        $scope.updateItem(item);
                    }
                });
                myScope=$scope;
            }
        };
        
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
