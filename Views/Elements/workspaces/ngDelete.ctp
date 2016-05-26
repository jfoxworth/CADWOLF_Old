<script type="text/ng-template" id="deleteDialog">
    
    <div>
        
        <h2>Confirm Delete</h2>
        
        <div>You are preparing to delete a file or folder named "{{ngDialogData.Workspace.name}}". 
        Please confirm this or cancel.</div>
        
        <div class="ngdialog-buttons">
            
            <button type="button" class="ngdialog-button ngdialog-button-secondary" 
                    ng-click=closeThisDialog("Cancel")>Cancel</button>
            
            <button type="button" class="ngdialog-button ngdialog-button-primary" 
                    ng-click=confirm("OK")>OK</button>
        
        </div>
    
    </div>

</script>
