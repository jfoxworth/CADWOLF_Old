<div ng-if="editPerm" class="left_subcolumn" id="insertOptions">	
    
    <div class="left_subcolumnInner leftMask">	
        
        <div class="lc_block" id="Insert_Block">
            
            <div class="lc_description" id="add_block">Insert an Item</div>	
            
            <div class="lc_description_left">&nbsp</div>
            <div class="lc_description_right">&nbsp</div>
            
            <div class="lc_description_bottom">&nbsp</div>	
            
            <div class="newblock_block">	
            
                <div class="insertLine" ng-click="addItem('Text', {})">
                    <div class="insertImage" id="addtext">&nbsp</div>
                    <div id="addtextText" class="insertText">Text</div>
                </div>
                
                <div class="insertLine" ng-click="addItem('Header', {})">
                    <div class="insertImage" id="addheader">&nbsp</div>
                    <div id="addheaderText" class="insertText">Header</div>
                </div>
                
                <div class="insertLine" ng-click="addItem('LineBreak', {})">
                    <div class="insertImage" id="addline">&nbsp</div>
                    <div id="addlineText" class="insertText">Break Line</div>
                </div>
                
                <div class="insertLine" ng-click="addItem('Equation', {})">
                    <div class="insertImage" id="addequation">&nbsp</div>
                    <div id="addequationText" class="insertText">Equation</div>
                </div>	
                
                <div class="insertLine" ng-click="addItem('Plot', {})">
                    <div class="insertImage" id="addplot">&nbsp</div>
                    <div id="addplotText" class="insertText">Chart</div>
                </div>	
                
                <div class="insertLine" ng-click="addItem('Table', {})">
                    <div class="insertImage" id="addtable">&nbsp</div>
                    <div id="addtableText" class="insertText">Table</div>
                </div>
                
                <div class="insertLine" ng-click="addItem('ForLoop', {})">
                    <div class="insertImage" id="addforloop">&nbsp</div>
                    <div id="addforloopText" class="insertText">For Loop</div>
                </div>
                
                <div class="insertLine" ng-click="addItem('WhileLoop', {})">
                    <div class="insertImage" id="addwhileloop">&nbsp</div>
                    <div id="addwhileloopText" class="insertText">While Loop</div>
                </div>
                
                <div class="insertLine" ng-click="addItem('IfElse', {})">
                    <div class="insertImage" id="addifelse">&nbsp</div>
                    <div id="addifelseText" class="insertText">If / Else</div>
                </div>
                
                <div class="insertLine" ng-click="addItem('Symbolic', {})">
                    <div class="insertImage" id="addsymbolic">&nbsp</div
                        div id="addsymbolicText" class="insertText">Symbolic</div>
                </div>
                
                
                <div class="insertLine" ng-click="addItem('Image', {})">
                    <div class="insertImage" id="addimage">&nbsp</div>
                    <div id="addimageText" class="insertText">Image</div>
                </div>	
                
                <div class="insertLine" ng-click="addItem('Video', {})">
                    <div class="insertImage" id="addvideo">&nbsp</div>
                    <div id="addvideoText" class="insertText">Video</div>
                </div>	
            
            </div>	
        
        </div>	

        <div class="lc_block" id="Move_Block">	
        
            <div class="lc_description" id="add_block">Move an Item</div>	
            
            <div class="lc_description_left">&nbsp</div>
            <div class="lc_description_right">&nbsp</div>
            
            <div class="lc_description_bottom">&nbsp</div>	
            
            <div class="newblock_block">
            
                <div class="tool_movewrapper">
                    <div id="move_loc" >
                        <input id="thislocation" 
                               ng-enter="changeLocation('move')" 
                               value="{{currentItem.location}}">
                    </div>
                </div>	
                
                
                <div class="tool_movewrapper">
                    <div class="tool_move" 
                         id="upone" 
                         ng-click="changeLocation('up')">&nbsp
                    </div>
                </div>
                
                <div class="tool_movewrapper">
                    <div class="tool_move" 
                         id="downone" 
                         ng-click="changeLocation('down')">&nbsp
                    </div>
                </div>
            
            </div>	
        
        </div>

        <div class="lc_block" id="Format_Block">
    
            <div class="lc_description">Width / Margin</div>
            
            <div class="lc_description_left">&nbsp</div>
            <div class="lc_description_right">&nbsp</div>	
            
            <div class="lc_description_bottom">&nbsp</div>	
            
            <div class="left_section formatborder" 
                 id="formatsection">	
            
                <div class="left_suboptions">	
                
                    <div class="left_line">
                        <div class="left_item">Width :</div>
                        <div class="right_item">
                            <input id="width" 
                                   class="left_format" 
                                   ng-model="currentItem.width" 
                                   ng-enter="updateFormats()"></div>
                        <div class="left_px">px</div>
                    </div>

                    <div class="left_line">
                        <div class="left_item">Top :</div>
                        <div class="right_item">
                            <input id="topmargin" 
                                   class="left_format" 
                                   ng-model="currentItem.margintop" 
                                   ng-enter="updateFormats()"></div>
                        <div class="left_px">px</div>
                    </div>
                
                    <div class="left_line">
                        <div class="left_item">Bottom :</div>
                        <div class="right_item">
                            <input id="bottommargin" 
                                   class="left_format" 
                                   ng-model="currentItem.marginbottom" 
                                   ng-enter="updateFormats()">
                        </div>
                        <div class="left_px">px</div>
                    </div>
                
                    <div class="left_line">
                        <div class="left_item">Left :</div>
                        <div class="right_item">
                            <input id="leftmargin" 
                                   class="left_format" 
                                   ng-model="currentItem.marginleft" 
                                   ng-enter="updateFormats()">
                        </div>
                        <div class="left_px">px</div>
                    </div>
                
                    <div class="left_line">
                        <div class="left_item">Right :</div>
                        <div class="right_item">
                            <input id="rightmargin" 
                                   class="left_format" 
                                   ng-model="currentItem.marginright" 
                                   ng-enter="updateFormats()">
                        </div>
                        <div class="left_px">px</div>
                    </div>
                
                </div>	
            
            </div>
        
        </div>
    
    </div>

</div>
