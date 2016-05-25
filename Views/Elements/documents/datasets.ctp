<div class="mainSection" ng-show="datasetsShow" ng-cloak>
    
    <div class="fileheader">Datasets for this file</div>
    
    <div class="file_description" 
         id="functiontext">CADWOLF lets users create datasets in workspaces and then pull those datasets into 
        documents as variables. To add a dataset as a variable, click the button below and then enter the URL of 
        the dataset where appropriate.
    </div>	
    
    <div ng-if="editPerm" 
         id="AddDataset" 
         ng-click="addItem('Equation', {Page_position:0, location:0, inputType:'Dataset', Format_name:'datasetInput'})">
        Add a new dataset
    </div>
    
    <div id="dataset_fail"></div>
    
    <div id="dataset_success"></div>
    
    <div id="DatasetList">
    
        <div ng-repeat="obj in cadwolf_worksheet">
        
            <div class="dataset_line" 
                 ng-if="(obj['Equation']['inputType']=='Dataset')&&(obj['Equation']['inputShow']===true)" 
                 ng-init="obj['Equation']['inputShow']=true">
            
                <div class="datasetname_holder">
                    <input type="text" 
                           class="dataset_name" 
                           ng-model="obj['Equation']['Format_name']" 
                           ng-enter="obj['Equation']['inputShow']=false">
                </div>
                
                <div class="datasetname_holder">
                    <div class="dataset_size">{{obj['Equation']['Format_size']}}</div>
                </div>
                
                <div class="dataseturl_holder">
                    <input type="text" 
                           class="dataset_url" 
                           ng-model="obj['Equation']['datasetURL']" 
                           ng-enter="getDataset(obj['Equation']['datasetURL'], obj['itemid']); obj['Equation']['inputShow']=false">
                </div>
                
                <div class="dataset_delete" ng-click="$parent.deleteItem(obj)"></div>
            
            </div>
            
            <div class="dataset_line" 
                 ng-if="(obj['Equation']['inputType']=='Dataset')&&(obj['Equation']['inputShow']===false)" 
                 ng-click="obj['Equation']['inputShow']=true">
            
                <div class="datasetname_holder">
                    <div class="dataset_name">{{obj['Equation']['Format_name']}}</div>
                </div>
                
                <div class="datasetname_holder">
                    <div class="dataset_size">{{obj['Equation']['Format_size']}}</div>
                </div>
                
                <div class="dataseturl_holder">
                    <div>{{obj['Equation']['datasetURL']}}</div>
                </div>
                
                <div class="dataset_delete" ng-click="$parent.deleteItem(obj)"></div>
            
            </div>
        
        </div>                        
    
    </div>                

</div>
