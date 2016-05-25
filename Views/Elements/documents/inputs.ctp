<div class="mainSection" ng-show="inputsShow" ng-cloak>
    <div class="fileheader">Inputs from Worksheets</div>
    <div class="Input_Desc">Inputs can be taken from data sets that have been uploaded to a directory, or from other worksheets. To accomplish this, select one of the items below 
    and follow the instructions. Note that to prevent erroneous calculations, the current worksheet cannot have an equation with the same name as an imported equation.</div>
    <div ng-if="editPerm" id="Inputs_files">
        <div class="Inputs_largedesc">Enter the directory to start navigating for files</div>
        <div id="Inputs_location"><input id="Inputs_currentlocation" ng-model="$parent.inputLocation" ng-enter="getFileFolderData()" /></div>
        <div class="Inputs_smalldesc">Select the file to take inputs from</div>
        <div class="Inputs_smalldesc">Check the equations to use as inputs</div>
        <div id="Inputs_folderwindow">
            <div ng-repeat="obj in $parent.inputData" ng-switch on="obj.Workspace.File_or_Folder">
                <div ng-switch-when="0" class="folderline" ng-dblclick="$parent.$parent.$parent.inputLocation=$parent.$parent.$parent.inputLocation+'/'+obj.Workspace.name; $parent.$parent.$parent.getFileFolderData();">
                    <div class="filefoldername" ng-dblclick="$parent.$parent.$parent.inputLocation=$parent.$parent.$parent.inputLocation+'/'+obj.Workspace.name; $parent.$parent.$parent.getFileFolderData();">{{obj.Workspace.name}}</div>
                </div>
                <div ng-switch-when="1" class="fileline" ng-dblclick="$parent.$parent.$parent.inputLocation=$parent.$parent.$parent.inputLocation+'/'+obj.Workspace.name; $parent.$parent.$parent.getFileFolderData();">
                    <div class="filefoldername" ng-dblclick="$parent.$parent.$parent.inputLocation=$parent.$parent.$parent.inputLocation+'/'+obj.Workspace.name; $parent.$parent.$parent.getFileFolderData();">{{obj.Workspace.name}}</div>
                </div>
            </div>
        </div>

        <div id="Inputs_equationwindow">
            <div ng-repeat="obj in $parent.inputEquations">
                <div class="equationline">
                    <div class="equationlinecheckbox">
                        <input type="checkbox" ng-if="obj['currentInput']===true" class="inputcheckbox" checked="checked" ng-click="obj['currentInput']=false; $parent.deleteByID(obj.itemid)">
                        <input type="checkbox" ng-if="obj['currentInput']===false" class="inputcheckbox" ng-click="obj['currentInput']=true; $parent.addItem('Equation', {Page_position:0, location:0, inputType:'File', inputID:obj.itemid, Format_name:obj.name, inputURL:$parent.inputLocation, Solution_real:obj.Solution_real, Solution_imag:obj.Solution_imag, Format_size:obj.size, Units_units:obj.Units_units, Units_quantity:obj.Units_quantity})">
                    </div>
                    <div class="equationlinename">{{obj.name}}</div>
                    <div class="equationlinevalue">{{obj.showValue}}</div>
                </div>
            </div>
        </div>
    </div>
    <div id="Inputs_currentinputs">
        <div class="fileheader">Current Inputs</div>
        <table id="inputstable" class="inputs">			
            <tr><th width="175px">Original Name</th><th width="125px">Value</th><th width="75px">Units</th><th width="75px">Source</th><th width="350px">Source Name</th><th width="25px"></th></tr>	
            <tr ng-repeat="obj in cadwolf_worksheet">
                <td ng-if="obj.Equation.inputType=='File'">{{obj.Equation.Format_name}}</td>
                <td ng-if="obj.Equation.inputType=='File'">{{obj.Equation.Format_size}}</td>
                <td ng-if="obj.Equation.inputType=='File'">{{obj.Equation.Units_units}}</td>
                <td ng-if="obj.Equation.inputType=='File'">File</td>
                <td ng-if="obj.Equation.inputType=='File'">{{obj.Equation.inputName}}</td>
                <td ng-if="obj.Equation.inputType=='File'">{{obj.Equation.inputURL}}</td>
                <td ng-if="obj.Equation.inputType=='File'"><div class="delete_input" ng-click="$parent.deleteItem(obj)">&nbsp</div></td>
            </tr>
        </table>
    </div>
</div>
