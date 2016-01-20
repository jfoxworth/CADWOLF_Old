// CONTROLLERS
datasetApp.controller('mainController', ['$scope', '$http',
    function($scope, $http)
    {   $scope.displaySettings=false;
        $scope.displayInfo=true;
        $scope.displayPaste=false;
        $scope.displayResults=false;
        $scope.infoDisplay="view_info_current";
        $scope.infoClass="leftNavTextCurrent";
        $scope.settingsDisplay="view_settings";
        $scope.settingsClass="leftNavText";
        $scope.pasteDisplay="view_paste";
        $scope.pasteClass="leftNavText";
        $scope.resultsDisplay="view_results";
        $scope.resultsClass="leftNavText";
        
        $scope.showMain = function(num) {
            // Shows/hides the main content
            if (num==1)
            {   $scope.displayInfo=true;            $scope.infoDisplay = "view_info_current";           $scope.infoClass = "leftNavTextCurrent";
                $scope.displaySettings=false;       $scope.settingsDisplay = "view_settings";           $scope.settingsClass = "leftNavText";
                $scope.displayPaste=false;          $scope.pasteDisplay = "view_paste";                  $scope.pasteClass = "leftNavText";
                $scope.displayResults=false;        $scope.resultsDisplay = "view_results";             $scope.resultsClass = "leftNavText";
                
            }
            if (num==2)
            {   $scope.displayInfo=false;           $scope.infoDisplay = "view_info";                   $scope.infoClass = "leftNavText";
                $scope.displaySettings=true;        $scope.settingsDisplay = "view_settings_current";   $scope.settingsClass = "leftNavTextCurrent";
                $scope.displayPaste=false;          $scope.pasteDisplay = "view_paste";                  $scope.pasteClass = "leftNavText";
                $scope.displayResults=false;        $scope.resultsDisplay = "view_results";             $scope.resultsClass = "leftNavText";
            }
            if (num==3)
            {   $scope.displayInfo=false;           $scope.infoDisplay = "view_info";                   $scope.infoClass = "leftNavText";
                $scope.displaySettings=false;       $scope.settingsDisplay = "view_settings";           $scope.settingsClass = "leftNavText";
                $scope.displayPaste=true;           $scope.pasteDisplay = "view_paste_current";          $scope.pasteClass = "leftNavTextCurrent";
                $scope.displayResults=false;        $scope.resultsDisplay = "view_results";             $scope.resultsClass = "leftNavText";
            }
            if (num==4)
            {   $scope.displayInfo=false;           $scope.infoDisplay = "view_info";                   $scope.infoClass = "leftNavText";
                $scope.displaySettings=false;       $scope.settingsDisplay = "view_settings";           $scope.settingsClass = "leftNavText";
                $scope.displayPaste=false;          $scope.pasteDisplay = "view_paste";                  $scope.pasteClass = "leftNavText";
                $scope.displayResults=true;         $scope.resultsDisplay = "view_results_current";     $scope.resultsClass = "leftNavTextCurrent";
            }
        };

        $scope.URL={url:'http://www.cadwolf.com/Datasets/Documentation/Examples/Tensile_Test'};
        $scope.getInitial=function (){ $http.post('http://www.cadwolf.com/Datasets/getData', $scope.URL).then($scope.showInitialData(), $scope.showInitialError()); };
        angular.element(document).ready(function(){ $scope.getInitialFake(); });

        $scope.getInitialFake=function(){
            $scope.Data={};
            $scope.Data.string="1,2,3,4,5,6;7,8,9,10,11,12";
            $scope.Data.size="2x6";
            $scope.Parsers={};
            $scope.Parsers['0']=',';
            $scope.Parsers['1']=';';
            $scope.Parsers['2']='*';
            $scope.Parsers['3']="\n";
            $scope.Parsers['4']='#';
            $scope.Data.real={};
            $scope.Data.real['0-0']=1;
            $scope.Data.real['0-1']=2;
            $scope.Data.real['0-2']=3;
            $scope.Data.real['0-3']=4;
            $scope.Data.real['0-4']=5;
            $scope.Data.real['0-5']=6;
            $scope.Data.real['1-0']=7;
            $scope.Data.real['1-1']=8;
            $scope.Data.real['1-2']=9;
            $scope.Data.real['1-3']=10;
            $scope.Data.real['1-4']=11;
            $scope.Data.real['1-5']=12;
            $scope.Data.imag={};
            $scope.Data.imag['0-0']=1;
            $scope.Data.imag['0-1']=2;
            $scope.Data.imag['0-2']=3;
            $scope.Data.imag['0-3']=4;
            $scope.Data.imag['0-4']=5;
            $scope.Data.imag['0-5']=6;
            $scope.Data.imag['1-0']=7;
            $scope.Data.imag['1-1']=8;
            $scope.Data.imag['1-2']=9;
            $scope.Data.imag['1-3']=10;
            $scope.Data.imag['1-4']=11;
            $scope.Data.imag['1-5']=12;
            $scope.Data.dateCreated="2015-03-16 19:21:46";
            $scope.Data.dateModified="2015-03-17 02:35:32";
            $scope.Data.description="<p>This dataset represents test data from a tensile test. The first row represents time in seconds. The second row represents extension in mm. The third row represents load in Newtons. The final row represents strain in terms of mm/mm.</p><p>This dataset is used in the example on tensile testing to show the use of datasets in files and to show the use of several functions and plots.</p><p>The material is 1045 Annealed.</p>";
            $scope.dataAction="radio_overwrite";
            $scope.formattedData="This is the formatted data";
            $scope.parseOptions = [{
                id: 1,
                label: 'Remove Text',
                subItem: { name: 'RemoveText' }
            }, {
                id: 2,
                label: 'Text Creates Errors',
                subItem: { name: 'TextError' }
            }];
            $scope.parseType = $scope.parseOptions[0].subItem;
        };
     
        $scope.showInitialData=function(){
            
        };

    
        $scope.showInitialError=function(){
            
        };

    }
]);