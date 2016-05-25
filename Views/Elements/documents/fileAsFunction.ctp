<div class="mainSection" ng-show="fafShow" ng-cloak>
    <div class="fileheader">Name of file as a function</div>
    <div class="file_description">Each page can be used as a function that is called from another sheet. The user can set the name used to call this file as a function. 
        For example, if the users sets this name as "FunctionName" then this file would be called within an equation using the statement "FunctionName("Input1, Input1)." This 
        name cannot be the same as a built in function such as sin or cos. CAD Wolf will search through this file\'s parent folders, and then the folders listed in the creator\'s 
        path to find a file with the appropriate name.</div>
    <div class="file_info">
        <div class="file_nameline"><div id="filename_error"></div></div>
        <div class="file_nameline">
            <div class="file_nametext">Name of the file as a function : </div>
            <div ng-if="editPerm" id="filefunctionname" class="file_nameinput"><input type="text" ng-enter="saveFileInfo()" ng-model="cadwolf_fileFunData.fileFunName" id="file_functionname"></div>
            <div ng-if="!editPerm" id="filefunctionname" class="file_nameinput">{{cadwolf_fileFunData.fileFunName}}</div>
        </div>
    </div>
    <div class="fileheader">Inputs for file as a function</div>
    <div class="file_description">
        The inputs given to this function and how they are interpreted are set here. The sheet is called by its name and with the set number of inputs below in the form FunctionName(Input1, Input2, ... Input N). You can add 
        or delete inputs and assign them the name they will be used as in the function. For example, if the one input is set and given the name "X", then the sheet will be solved used whatever value of "X" sent.</div>
    <div class="file_info">
        <div ng-if="editPerm" class="file_infoline"><div id="addfileinput" ng-click="addInOut('input')">Add File Input</div></div>
        <div id="FileInputList">
            <div ng-repeat="obj in cadwolf_fileFunData.fileFunInputs | orderBy:obj.number track by $index">
                <div class="functioninputline"> 
                    <div class="functioninputnumber">Input Number : {{$index}}</div>
                    <div ng-show="!obj.showEdit" ng-dblclick="obj.showEdit=!obj.showEdit" class="functioninputname">{{obj['name']}}</div>
                    <div class="functioninputname" ng-show="obj.showEdit"><select ng-model="obj.name" ng-options="thisEntry.Equation.Format_name as thisEntry.Equation.Format_name for thisEntry in cadwolf_worksheet | filter:{vartype:'3'}" ng-change="obj.showEdit=!obj.showEdit; saveFileInfo()"></select></div>
                    <div class="functioninputdelete" ng-click="deleteInputOutput('input', $index)"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="fileheader">Outputs for file as a function</div>
    <div class="file_description">When the page is called as a function, it will return the values set here. This is done by calling the function in the following format [Output1, Output2]=FunctionName(Input1, Input2).</div>                  
    <div class="file_info">
        <div ng-if="editPerm" class="file_infoline"><div id="addfileoutput" ng-click="addInOut('output')">Add File Output</div></div>
        <div id="FileOutputList">
            <div ng-repeat="obj in cadwolf_fileFunData.fileFunOutputs | orderBy:obj.number track by $index">
                <div class="functionoutputline"> 
                    <div class="functionoutputnumber">Output Number : {{$index}}</div>
                    <div ng-show="!obj.showEdit" ng-dblclick="obj.showEdit=!obj.showEdit" class="functionoutputname">{{obj['name']}}</div>
                    <div class="functioninputname" ng-show="obj.showEdit"><select ng-model="obj.name" ng-options="thisEntry.Equation.Format_name as thisEntry.Equation.Format_name for thisEntry in cadwolf_worksheet | filter:{vartype:'3'}" ng-change="obj.showEdit=!obj.showEdit; saveFileInfo()"></select></div>
                    <div class="functionoutputdelete" ng-click="deleteInputOutput('output', $index)"></div>
                </div>
            </div>
        </div>
    </div>
</div>
