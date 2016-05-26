<div id="image_uploader" 
     ng-show="showImageUpload">
    
    <input type="file" 
           id="image_to_upload" 
           onchange="angular.element(this).scope().uploadImage(this.files)"/>

</div>
