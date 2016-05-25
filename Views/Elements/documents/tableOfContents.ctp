<div class="mainSection" ng-show="tocShow">
    <div class="titleblock">{{cadwolf_fileInfo.title}}</div>
    <div class="subtitleblock">{{cadwolf_fileInfo.subtitle}}</div>
    <div id="tocviewblock">

        <div id="viewalldoc" 
             ng-click="showStartLoc=0; 
                       showEndLoc=cadwolf_worksheet.length; 
                       tocShow=false; 
                       worksheetShow=true">View Entire Document
        </div>

        <div id="viewtocsections" 
             ng-click="showTocHead=true" 
             ng-init="showTocHead=false">Headers to show
        </div>

        <div id="tocsections" ng-show="showTocHead">
            <div class="viewtocs" id="viewtocH1" ng-click="showTocHead=false; showTocLevel=1;">H1</div>
            <div class="viewtocs" id="viewtocH2" ng-click="showTocHead=false; showTocLevel=2;">H2</div>
            <div class="viewtocs" id="viewtocH3" ng-click="showTocHead=false; showTocLevel=3;">H3</div>
            <div class="viewtocs" id="viewtocH4" ng-click="showTocHead=false; showTocLevel=4;">H4</div>
            <div class="viewtocs" id="viewtocH5" ng-click="showTocHead=false; showTocLevel=5;">H5</div>
        </div>

    </div>
    
    
    <div class="fileheader">Table of Contents</div>
    

    <!-- Loop over the headers and display according to level. When clicked, worksheet shows only items within that header -->
    <div id="TOC_holder">

        <div ng-repeat="obj in cadwolf_worksheet | orderBy:obj.location track by obj.itemid" 
             ng-switch on="obj.vartype">
            
            <div class="switchWrapper" 
                 ng-switch-when="2" 
                 ng-if="obj.data.hClass=='header1'||(obj.data.hClass=='header2'&&showTocLevel>1)||(obj.data.hClass=='header3'&&showTocLevel>2)||(obj.data.hClass=='header4'&&showTocLevel>3)||(obj.data.hClass=='header5'&&showTocLevel>4)">
                
                <div ng-class="obj.data.hClass" 
                     data-ng-bind-html="obj.data.text" 
                     ng-click="getEndLoc(obj.location, obj.data.hClass); tocShow=false; worksheetShow=true">
                </div>

            </div>

        </div>

    </div>

</div>
