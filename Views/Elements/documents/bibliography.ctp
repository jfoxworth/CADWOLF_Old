
<div class="mainSection" ng-show="bibShow" ng-cloak>

    <div class="fileheader">Bibliography</div>

    <div class="file_description">This view lets the user add, delete, and edit references for the document. These 
        references can then be assigned to individual items in the worksheet view. You must have edit permissions to 
        set a reference.
    </div>

    <div id="addReference" 
         ng-if="editPerm" 
         ng-click="addReference()">Add a Reference
    </div>

    
    <!-- Loop over the references and display the appropriate information -->

    <div ng-repeat="obj in cadwolf_references | orderBy:obj.refNum track by obj.refID">

        <div ng-if="obj['type']=='web'" 
             class="bib_line">
            <div class="bib_num">{{obj['refNum']+1}}</div>
            {{obj['author']}}. 
            <a href="{{address}}">{{obj['webtitle']}}</a>.
            <u>{{obj['pagetitle']}}</u> - 
            {{obj['sitetitle']}}. 
            Date accessed : {{obj['dateaccessed']}}
        </div>
    
        <div ng-if="obj['type']=='book'" 
             class="bib_line">
            <div class="bib_num">{{obj['refNum']+1}}</div>
            {{obj['author']}}. 
            <u>{{obj['booktitle']}}</u>. 
            {{obj['publisher']}}. 
            {{obj['datepublished']}}. Edition - 
            {{obj['edition']}}. 
            Page - {{obj['page']}}.
        </div>
    
        <div ng-if="obj['type']=='mag'" 
             class="bib_line">
            <div class="bib_num">{{obj['refNum']+1}}</div>
            {{obj['author']}}. 
            {{obj['pagetitle']}}. 
            {{obj['magpapername']}}. 
            {{obj['datepublished']}}. 
            Page - {{obj['page']}}.
        </div>
    
        <div ng-if="obj['type']=='enc'" 
             class="bib_line">
            <div class="bib_num">{{obj['refNum']+1}}</div>
            {{obj['author']}}. 
            {{obj['entryname']}}. 
            {{obj['encname']}}. 
            Edition - {{obj['edition']}} {{obj['year']}}. 
            Page - {{obj['page']}}.
        </div>
    
        <div ng-if="editPerm">
    
            <div ng-show="obj.showEdits">
        
                <div class="ref_typeline">
            
                    <div class="ref_type">
                        <input type="radio" ng-model="obj['type']" value="web">Website
                    </div>
                    
                    <div class="ref_type">
                        <input type="radio" ng-model="obj['type']" value="book">Book
                    </div>
                    
                    <div class="ref_type">
                        <input type="radio" ng-model="obj['type']" value="mag">Journal, Magazine
                    </div>
                    
                    <div class="ref_type">
                        <input type="radio" ng-model="obj['type']" value="enc">Encyclopedia
                    </div>
                
                </div>
                
                <div ng-if="obj.type=='web'" class="ref_line">
                    <div class="ref_text">Author</div>
                    <input class="ref_input" ng-model="obj['author']">
                </div>
                
                <div ng-if="obj.type=='web'" class="ref_line">
                    <div class="ref_text">Address</div>
                    <input class="ref_input" ng-model="obj['address']">
                </div>
                
                <div ng-if="obj.type=='web'" class="ref_line">
                    <div class="ref_text">Page Title</div>
                    <input class="ref_input" ng-model="obj['pagetitle']">
                </div>
                
                <div ng-if="obj.type=='web'" class="ref_line">
                    <div class="ref_text">Website Title</div>
                    <input class="ref_input" ng-model="obj['sitetitle']">
                </div>
                
                <div ng-if="obj.type=='web'" class="ref_line">
                    <div class="ref_text">Date Accessed</div>
                    <input class="ref_input" ng-model="obj['dateaccessed']">
                </div>
                
                <div ng-if="obj.type=='book'" class="ref_line">
                    <div class="ref_text">Book Title</div>
                    <input class="ref_input" ng-model="obj['booktitle']">
                </div>
                
                <div ng-if="obj.type=='book'" class="ref_line">
                    <div class="ref_text">Publisher</div>
                    <input class="ref_input" ng-model="obj['publisher']">
                </div>
                
                <div ng-if="obj.type=='book'" class="ref_line">
                    <div class="ref_text">Date Published</div>
                    <input class="ref_input" ng-model="obj['datepublished']">
                </div>
                
                <div ng-if="obj.type=='mag'" class="ref_line">
                    <div class="ref_text">Title</div>
                    <input class="ref_input" ng-model="obj['articletitle']">
                </div>
                
                <div ng-if="obj.type=='mag'" class="ref_line">
                    <div class="ref_text">Mag or Paper Name</div>
                    <input class="ref_input" ng-model="obj['magpapername']">
                </div>
                
                <div ng-if="obj.type=='mag'" class="ref_line">
                    <div class="ref_text">Date Published</div>
                    <input class="ref_input" ng-model="obj['datepublished']">
                </div>
                
                <div ng-if="obj.type=='mag'" class="ref_line">
                    <div class="ref_text">Page</div>
                    <input class="ref_input" ng-model="obj['page']">
                </div>
                
                <div ng-if="obj.type=='enc'" class="ref_line">
                    <div class="ref_text">Entry Name</div>
                    <input class="ref_input" ng-model="obj['entryname']">
                </div>
                
                <div ng-if="obj.type=='enc'" class="ref_line">
                    <div class="ref_text">Encyclopedia Name</div>
                    <input class="ref_input" ng-model="obj['encname']">
                </div>
                
                <div ng-if="obj.type=='enc'" class="ref_line">
                    <div class="ref_text">Edition</div>
                    <input class="ref_input" ng-model="obj['edition']">
                </div>
                
                <div ng-if="obj.type=='enc'" class="ref_line">
                    <div class="ref_text">Year</div>
                    <input class="ref_input" ng-model="obj['year']">
                </div>
            
            </div>

            <div class="refEditLine" 
                 ng-click="obj.showEdits=!obj.showEdits">Show / Hide Edit
            </div>
    
        </div>

    </div>

</div>
