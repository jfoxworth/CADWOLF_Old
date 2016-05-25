<div class="mainSection" ng-show="constantsShow" ng-cloak>
    
    <div class="description">
        
        <div class="fileheader">Constants Used in Calculations</div>
        The table below shows the constants that can be entered by the user to be recognized on the worksheet.
        To use the constant, enter the text as shown in the second column and the item will appear as shown in
        the first column with the appropriate numeric value and units. Note that you cannot designate your own 
        variable that has the same name as one of the constants.
    
    </div>
        
    <table id="constants" class="units">			
        
        <tr>
            <th width="125px">Symbol</th>
            <th width="125px">Text</th>
            <th width="175px">Value</th>
            <th width="125px">Units</th>
            <th width="100px">Quantity</th>
        </tr>	
        
        <tr ng-repeat="obj in cadwolf_constants">
            
            <td><span mathjax-bind="obj.Constant.showvalue"></span></td>
            
            <td>{{obj.Constant.name}}</td>
            
            <td>{{obj.Constant.value}}</td>
            
            <td>{{obj.Constant.units}}</td>
            
            <td>{{obj.Constant.measurement}}</td>
        
        </tr>
    
    </table>

</div>
