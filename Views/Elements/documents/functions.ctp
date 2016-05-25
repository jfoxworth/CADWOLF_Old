<div class="mainSection" ng-show="functionsShow" ng-cloak>
    <div class="fileheader">Function List for this file</div>
    <div class="file_description" id="functiontext">CADWOLF allows for the use of files as functions. To do this, the name of any function must be tagged to the proper file. The list 
        below pairs function names in this file with outside files. To add a file as a function, click the add symbol below. To import your personal list of files and functions, click the 
        appropriate button. Note that you cannot overwrite an existing function name without first deleting it.</div>

    <div id="FAFList">
        <div ng-if="editPerm" id="AddFAFLine" ng-click="addFAF()">Add a File as a Function</div>
        <div id="FAFHeaderRow"><div class="Profile_FAF_header2 FAFHeader">URL of File</div><div class="Profile_FAF_header1 FAFHeader">Name of Function</div></div>
        <div id="Profile_FAF">
            <div ng-repeat="obj in cadwolf_fileFunData.impFunctions">
                <div ng-if="(!editPerm)||(editPerm&&(!obj.fafShowEdit))" ng-click="obj.fafShowEdit=true" class="Profile_FAF_line">
                    <div class="Profile_FAF_addressholder"><div class="Profile_FAF_address">{{obj.fileAddress}}</div></div>
                    <div class="Profile_FAF_nameholder"><div class="Profile_FAF_name">{{obj.functionName}}</div></div>
                </div>
                <div ng-if="editPerm&&obj.fafShowEdit" class="Profile_FAF_line">
                    <div class="Profile_FAF_addressholder"><div class="Profile_FAF_address"><input type="text" class="FAF_input" ng-model="obj.fileAddress" ng-enter="getFafData(obj)" placeholder="Enter URL of File" /></div></div>
                    <div class="Profile_FAF_nameholder"><div class="Profile_FAF_name">{{obj.functionName}}</div></div>
                    <div class="File_FAF_delete" ng-click="deleteFAF(obj)">&nbsp</div>
                </div>
            </div>
        </div>
    </div>	
</div>
