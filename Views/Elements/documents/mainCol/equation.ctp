<div ng-switch-when="3" 
     class="switchWrapper" 
     ng-if="((obj.Equation.inputType!='Dataset')&&(obj.Equation.inputType!='File')&&(obj.Equation.isConnectedID!=1))
                    &&obj.location>=showStartLoc&&obj.location<showEndLoc" 
     ng-mouseover="showIcons=true;" 
     ng-mouseout="showIcons=false" 
     ng-dblclick="obj.showEdit=true">

    <div ng-if="editPerm" 
         ng-show="showIcons" 
         class="icon_wrapper">
        
        <div class="icon_holder">
            <div class="deletebutton" 
                 ng-click="$parent.deleteItem(obj)">
            </div>
            <div class="equationspecs" 
                 ng-click="showSpecs(obj.itemid, 'equation')">
            </div>
        </div>
    
    </div>

    <div class="equationblock">
        <div class="eqshow" 
             id="{{obj.itemid}}"
             ng-if="editPerm||(usePerm&&(obj.Equation.Format_editinuse==1))" 
             ng-show="!obj.showEdit">
                <span mathjax-bind="obj.Equation.Format_left"></span>=
                <span mathjax-bind="obj.Equation.Format_showequation"></span>=
                <span mathjax-bind="obj.Equation.Format_showsolution"></span>
        </div>
        
        <input class="standardInput"
               ng-if="editPerm||(usePerm&&(obj.Equation.Format_editinuse==1))" 
               ng-show="obj.showEdit" 
               ng-enter="obj.showEdit=false; obj.needsUpdateFlag=1; runEquationDigest()" 
               ng-model="obj.Equation.newEquation" />
        
        <div class="eqshow" 
             id="{{obj.itemid}}"
             ng-if="!editPerm&&(!usePerm||(obj.Equation.Format_editinuse!=1))">
            <span mathjax-bind="obj.Equation.Format_left"></span>=
            <span mathjax-bind="obj.Equation.Format_showequation"></span>=
            <span mathjax-bind="obj.Equation.Format_showsolution"></span>
        </div>
    
    </div>

    <span ref-num="obj.Values.References"></span>

</div>
