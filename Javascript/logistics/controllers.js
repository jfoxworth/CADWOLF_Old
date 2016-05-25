// CONTROLLERS
/*
This is the main controller file for the logistics module of CADWOLF.


*/
logisticsApp.controller('logisticsController', ['$scope', '$http', '$sce', 'ngDialog',
    function($scope, $http, $sce, ngDialog)
    {   
        
        // Function to handle when the user clicks on one of the icons on the left
        $scope.leftClick =  function(num)
        {   if (num==1)
            {   $scope.showBugs=true;       $scope.bugTextClass="leftNavTextCurrent";
                $scope.showTodo=false;      $scope.todoTextClass="leftNavText";
                $scope.showFeatures=false;  $scope.featureTextClass="leftNavText";
            }
            if (num==2)
            {   $scope.showBugs=false;      $scope.bugTextClass="leftNavText";
                $scope.showTodo=true;       $scope.todoTextClass="leftNavTextCurrent";
                $scope.showFeatures=false;  $scope.featureTextClass="leftNavText";
            }
            if (num==3)
            {   $scope.showBugs=false;      $scope.bugTextClass="leftNavText";
                $scope.showTodo=false;      $scope.todoTextClass="leftNavText";
                $scope.showFeatures=true;   $scope.featureTextClass="leftNavTextCurrent";
            }

        };
        
        
        
         // Function run one time to parse the initial data
        $scope.parseInitialData =  function(thisData)
        {   var thisItem={};
            $scope.cadwolfLogistics['bug']=[];
            $scope.cadwolfLogistics['toDo']=[];
            $scope.cadwolfLogistics['feature']=[];
            for (var a=0; a<thisData.length; a++)
            {   thisItem=new $scope.logisticsItem(thisData[a]['Bugs']['id'], thisData[a]['Bugs']['bugorfeature'], JSON.parse(thisData[a]['Bugs']['dataObject']));
                thisData[a]['Bugs']['dataObject']=thisItem;
                var thisDate=thisData[a]['Bugs']['modified'].split(' ');
                thisData[a]['Bugs']['mdate']=new Date(thisDate[0]+'T'+thisDate[1]);
                var thisDate=thisData[a]['Bugs']['created'].split(' ');
                thisData[a]['Bugs']['cdate']=new Date(thisDate[0]+'T'+thisDate[1]);
                if (thisData[a]['Bugs']['bugorfeature']=='0'){ $scope.cadwolfLogistics['bug'].push(thisData[a]['Bugs']); }
                if (thisData[a]['Bugs']['bugorfeature']=='1'){ $scope.cadwolfLogistics['feature'].push(thisData[a]['Bugs']); }
                if (thisData[a]['Bugs']['bugorfeature']=='2'){ $scope.cadwolfLogistics['toDo'].push(thisData[a]['Bugs']); }
            }
        };

        
        // The prototype for an item
        $scope.logisticsItem = function(thisID, type, logObject)
        {   this.id=thisID='' ? 0 : thisID
            this.parentID=0;
            this.type=type;
            this.fileID='';
            this.title="thisTitle";
            this.description="thisDescription";
            this.module='Documents';
            this.precedence=1;
            this.user='';
            this.userID='';
            this.status='';
            this.titleEdit=false;
            this.moduleEdit=false;
            this.descriptionEdit=false;
            for (var thisProp in logObject){ this[thisProp]=logObject[thisProp]; }
        }

        // The function called to create a new item
        $scope.newItem = function(type)
        {   var myItem={};
            myItem.id=0;
            myItem.parentid=0;
            myItem.type=type;
            myItem.fileID='';
            if (type==0) { myItem.title="New Bug"; }
            if (type==1) { myItem.title="New Feature"; }
            if (type==2) { myItem.title="New To Do Item"; }
            myItem.description="Click to enter the text of the new item";
            myItem.module='Documents';
            myItem.precedence=1;
            myItem.user='';
            myItem.userID='';
            myItem.status='0';
            myItem.dataObject=new $scope.logisticsItem(0, type, {});
            myScope=$scope;
            $http.post('http://www.cadwolf.com/Logistics/newItem', {fullData:myItem }, {}).
            then(function(response)
             {  myResponse=response;
                myItem['id']=response.data[0]['Bugs']['id'];
                myItem['created']=response.data[0]['Bugs']['created'];
                myItem['modified']=response.data[0]['Bugs']['modified'];
                var thisDate=response.data[0]['Bugs']['modified'].split(' ');
                myItem['mdate']=new Date(thisDate[0]+'T'+thisDate[1]);
                var thisDate=response.data[0]['Bugs']['created'].split(' ');
                myItem['cdate']=new Date(thisDate[0]+'T'+thisDate[1]);
                if (type==0){ $scope.cadwolfLogistics['bug'].push(myItem); }
                if (type==1){ $scope.cadwolfLogistics['feature'].push(myItem); }
                if (type==2){ $scope.cadwolfLogistics['toDo'].push(myItem); }
                
             }, function(){  }); 
            
        }

        // The function to save an item when edited
        $scope.saveItem = function(obj)
        {   obj['dataObject']['description']=CKEDITOR.instances['bug'+obj.id].getData();
            $http.post('http://www.cadwolf.com/Logistics/saveItem', {fullData:obj }, {}).
            then(function(response)
             {  myResponse=response;
             }, function(){  }); 
            
        }

        // The function called to grab the initial data and setup some parameters - IIFE
        $scope.getInitialData=function ()
        {   $scope.displayGoodMessage=false;
            $scope.displayBadMessage=false;
            $scope.showBugs=true;
            $scope.showTodo=false;
            $scope.showFeatures=false;
            $scope.goodMessageText="";
            $scope.badMessageText="";
            $scope.cadwolfLogistics={};
            $scope.bugTextClass="leftNavTextCurrent";
            $scope.todoTextClass="leftNavText";
            $scope.featureTextClass="leftNavText";
            $http.post('http://www.cadwolf.com/Logistics/getInitialData', {}, {}).
            then(function(response)
             {  myResponse=response;
                $scope.parseInitialData(response.data);
                var config =																																		
                {   skin: 'kama',	uiColor:'#ECECEC',	extraPlugins : 'autogrow', removePlugins : 'elementspath',					
                    toolbarCanCollapse : false, width:'750', height:'75', margin:0, resize_enabled: false, sharedSpaces :  {  top : 'cktoolbar' },											
                    toolbar :  [ [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'Link', 'Unlink', 'Table', 'HorizontalRule', 'ShowBlocks', 'TextColor', 'BGColor', 'FontSize' ] ] 
                };
                myScope=$scope;
             }, function(){  }); 
        }();
        
 
        // Set a text space as a ckeditor
        $scope.setCKEditor=function(type, itemID)
        {   if (type=='bug'){ var myArray=$scope.cadwolfLogistics['bug']; }
            if (type=='feature'){ var myArray=$scope.cadwolfLogistics['feature']; }
            if (type=='toDo'){ var myArray=$scope.cadwolfLogistics['toDo']; }

            var config =
            {   skin: 'kama',	uiColor:'#ECECEC',	extraPlugins : 'autogrow', extraPlugins : 'sharedspace', removePlugins : 'elementspath', 
                toolbarCanCollapse : false, width:'800',  resize_enabled: false, sharedSpaces :  {  top : 'cktoolbar' },	
                toolbar :  [ [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'Link', 'Unlink', 'Table', 'HorizontalRule', 'ShowBlocks', 'TextColor', 'BGColor', 'FontSize' ] ] 
            }; 			
            if (CKEDITOR.instances['bug'+itemID]===undefined)
            {   for (var a=0; a<myArray.length; a++)
                {   if (myArray[a]['id']==itemID)
                    {   $('#bug'+itemID).attr('contenteditable','true');
                        $('#bug'+itemID).ckeditor(config);
                        CKEDITOR.instances['bug'+itemID].setData(myArray[a]['dataObject']['description']);
                    }
                }
            }
        };
        
    }
]);

