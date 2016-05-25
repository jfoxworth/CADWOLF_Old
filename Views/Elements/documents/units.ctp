<div class="mainSection" ng-show="numbersShow" ng-cloak>
    <div class="file_description">
        <div class="fileheader">Scaling Factors</div>
        The table below shows the units that may be entered by the user and then scaled. The first column shows the text that the user must enter for the units. 
        The second column shows the units that the first column is converted to, and the third shows the conversion factor used to accomplish it. The fourth column shows the quantity 
        of the units.
    </div>
    <table id="units_temperature" class="units">
        <tr><th>Name</th><th>Quantity</th><th>Unit</th><th>Conversion Unit</th><th>Factor</th><th>System</th></tr>
        <tr ng-repeat="obj in cadwolf_scaleUnits | orderBy:obj.ScaledUnit.quantity">
            <td>{{obj.ScaledUnit.name}}</td>
            <td>{{obj.ScaledUnit.quantity}}</td>
            <td>{{obj.ScaledUnit.unit}}</td>
            <td>{{obj.ScaledUnit.conv_unit}}</td>
            <td>{{obj.ScaledUnit.conv_factor}}</td>
            <td>{{obj.ScaledUnit.Class}}</td>
        </tr>
    </table>
</div>
