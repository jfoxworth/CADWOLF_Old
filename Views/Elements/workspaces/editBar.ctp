<div ng-if="editPerm"
     class="left_subcolumn" 
     id="insertOptions" 
     ng-show="showInsert">
    
    <div class="left_subcolumnInnerShort leftMask">
        
        <div class="lc_block" 
             id="Insert_Block">
            
            <div class="lc_description" 
                 id="add_block">
                Add an Item
            </div>
            
            <div class="lc_description_left">&nbsp</div>
            
            <div class="lc_description_right">&nbsp</div>
            
            <div class="lc_description_bottom">&nbsp</div>
            
            <div class="newblock_block">
                
                <div class="insertLine" 
                     ng-Click="addFileFolder(1)">
                    
                    <div class="insertImage" id="addfolder">&nbsp</div>
                    
                    <div id="addfolderText" class="insertText">Folder</div>
                
                </div>
                
                <div class="insertLine" 
                     ng-Click="addFileFolder(2)">
                   
                    <div class="insertImage" id="addfile">&nbsp</div>
                    
                    <div id="addfileText" class="insertText">Document</div>
                
                </div>
                
                <div class="insertLine" 
                     ng-Click="showImageUpload=true">
                    
                    <div class="insertImage" id="addimage">&nbsp</div>
                    
                    <div id="addimageText" class="insertText">Image</div>
                
                </div>
                
                <div class="insertLine" 
                     ng-Click="addFileFolder(3)">
                    
                    <div class="insertImage" id="adddataset">&nbsp</div>
                   
                    <div id="adddatasetText" class="insertText">Dataset</div>
               
                </div>
                
                <div class="insertLine" 
                     ng-Click="addFileFolder(4)">
                    
                    <div class="insertImage" id="addparttree">&nbsp</div>
                    
                    <div id="addparttreeText" class="insertText">Part Tree</div>
                
                </div>
            
            </div>	
        
        </div>		
    
    </div>

</div>


