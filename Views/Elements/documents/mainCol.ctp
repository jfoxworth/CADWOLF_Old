<!-- 

    This is the main column repeater loop. It loops through the main array and outputs the html for the type of item
    at each index.

    1. Text item
    2. Header
    3. Equation
    4. Symbolic Equation
    5. Table
    6. For Loop
    7. While Loop
    8. If/Else
    9. Plot
    10. Image
    11. Line Break
    12. Video
    13. 3D plot

-->


<div class="mainSection" ng-show="worksheetShow" style="width: 845px;">

    <div ng-if="currentItem=='top'" 
         id="clicktotopenterCurrent" 
         ng-click="setCurrent('top')">&nbsp
    </div>
    
    <div ng-if="currentItem!='top'" 
         id="clicktotopenter" 
         ng-click="setCurrent('top')">&nbsp
    </div>

    <div class="titleblock">{{cadwolf_fileInfo.title}}</div>
    
    <div ng-if="{{cadwolf_fileInfo.subtitle}}!='Enter Subtitle'" 
         class="subtitleblock">
        {{cadwolf_fileInfo.subtitle}}
    </div>

    <!-- The main repeat to iterate over all of the document components -->
    <div class="main_item" 
         ng-repeat="obj in cadwolf_worksheet | orderBy:'location' track by obj.itemid" 
         ng-switch on="obj.vartype" 
         ng-click="$parent.setCurrent(obj)">
        
        <div class="" 
             style="width: {{obj.width}}px; 
                    margin-top:{{obj.margintop}}px; 
                    margin-bottom:{{obj.marginbottom}}px; 
                    margin-left:{{obj.marginleft}}px; 
                    margin-right:{{obj.marginright}}px;" >
            
            <div ng-switch="obj.vartype">

                <?php   
                echo $this->element('documents/mainCol/text'); 
                echo $this->element('documents/mainCol/header'); 
                echo $this->element('documents/mainCol/equation'); 
                echo $this->element('documents/mainCol/symbolic'); 
                echo $this->element('documents/mainCol/table'); 
                echo $this->element('documents/mainCol/forLoop'); 
                echo $this->element('documents/mainCol/whileLoop'); 
                echo $this->element('documents/mainCol/ifElse'); 
                echo $this->element('documents/mainCol/plot'); 
                echo $this->element('documents/mainCol/image'); 
                echo $this->element('documents/mainCol/lineBreak'); 
                echo $this->element('documents/mainCol/video'); 
                echo $this->element('documents/mainCol/threeDPlot'); 
                ?>
                
            </div>
        </div>
    </div>                        

</div>
