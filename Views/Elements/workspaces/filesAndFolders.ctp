<div id="workspace_wrapper" ng-controller="filesController" ng-show="fileDisplay">
				    
    <!-- The input element to re-upload and replace an image -->
    <?php    echo $this->element('workspaces/filesAndFolders/replaceImage'); ?>

    <div id="workspace_bodywide">
    
        <div ng-class="mainWrapperClass">

            <!-- The title and the description -->
            <?php    echo $this->element('workspaces/filesAndFolders/titleDesc'); ?>


            <!-- The image upload button -->
            <?php    echo $this->element('workspaces/filesAndFolders/imageUpload'); ?>

            <!-- The button to move up one directory -->
            <?php    echo $this->element('workspaces/filesAndFolders/upOne'); ?>

            <!-- The select item to order the contents -->
            <?php    echo $this->element('workspaces/filesAndFolders/orderBy'); ?>


            <div id="workspace_foldercontents">

                <!-- The header line for the contents -->
                <?php    echo $this->element('workspaces/filesAndFolders/headerRow'); ?>

                <!-- The repeater for the workspace contents -->
                <?php    echo $this->element('workspaces/filesAndFolders/folderContents'); ?>

            </div>

        </div>

    </div>
    
</div>
