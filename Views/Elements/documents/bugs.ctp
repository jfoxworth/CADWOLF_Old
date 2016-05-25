<div class="mainSection" ng-show="bugShow">
    
    <div class="description">
        
        <div class="fileheader">Report a Bug</div>
    
        <div class=""><p>If you encountered a problem on this page, please fill out the information below. If the 
            problem occured with an equation, select the appropriate item. Be as descriptive as possible and describe 
            the problem, what actions prompted the problem, and if the problem is repetitive.</p>
        </div>
    
    </div>
    
    <div class="bug_item" id="bugreturn">&nbsp</div>
    
    <div class="bug_item"><textarea id="bugdesc" rows="30" cols="115">Describe the bug</textarea></div>

    <div class="bug_item" id="bugdone" ng-click="submitBug()">Submit Bug Info</div>

</div>
