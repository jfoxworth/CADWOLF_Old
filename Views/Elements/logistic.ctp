<body ng-controller="logisticsController">

    <div id="container">																														
        <div id="leftColumnWrapper" ng-mouseenter="leftNav=true;" ng-mouseleave="leftNav=false;">																														
            <div id="leftColumnIconsWrapper">																												
                <div class="logoWrapper">																													
                    <div id="logo">&nbsp</div>																												
                </div>																																		
                <div class="userWrapper">																												
                    <div id="user">&nbsp</div>																											                    																								
                    <?php
                    if($loggedIn)
                    {   echo('<div class="leftBlank">&nbsp</div>');
                        echo('<div class="leftBlank">&nbsp</div>');
                        echo('<div class="leftBlank">&nbsp</div>');
                    }
                    ?>

                </div>																																	
                <div class="leftColumnWrapper">																											
                    <div id="leftColumnIcons">																												
                        <div class="leftIcon" ng-click="leftClick(1);"><i class="fa fa-bug fa-lg"></i></div>																			
                        <div class="leftIcon" ng-click="leftClick(2);"><i class="fa fa-gears fa-lg"></i></div>																			
                        <div class="leftIcon" ng-click="leftClick(3);"><i class="fa fa-rebel fa-lg"></i></div>																			
                    </div>																																	
                </div>																																		
            </div>																																			
            <div id="leftColumnTextWrapper" ng-show="leftNav">																												
                <div class="logoWrapper">																													
                    <div id="logoText">CADWOLF</div>																										
                </div>																																		

                <?php
                if ($loggedIn)			
                {	echo('<div class="userWrapper">');	
                    $profileAddress='http://www.cadwolf.com/Profiles/'.str_replace(" ","_",$this->Session->read('Auth.User.username'));	
                    $workspaceAddress='http://www.cadwolf.com/Workspaces/'.str_replace(" ","_",$this->Session->read('Auth.User.username'));	
                    echo('<div id="userText">'.$this->Session->read('Auth.User.username').'</div>');		
                    echo('<div class="userLine"><a class="userItem" href="'.$workspaceAddress.'">Workspace</a></div>');		
                    echo('<div class="userLine"><a class="userItem" href="'.$profileAddress.'">User Page</a></div>');	
                    echo('<div class="userLine"><a class="userItem" href="http://www.cadwolf.com/users/logout">Log Out</a></div>');	
                     echo('</div>');	
                } else 		
                {	echo('<div id="userText"><a class="userAnchor" href="http://www.cadwolf.com/Users">Login</a></div>');		}				

                ?>

                <div class="leftColumnWrapper">																											
                    <div id="leftColumnText">																												
                        <div ng-class="bugTextClass" ng-click="leftClick(1);">Bugs</div>																
                        <div ng-class="todoTextClass" ng-click="leftClick(2);">To Do List</div>																
                        <div ng-class="featureTextClass" ng-click="leftClick(3);">Feature Requests</div>																
                    </div>																																	
                </div>																																		
            </div>																																			
        </div>																																		

        <div id="Format_Wrapper">
            <div id="NicEdit_Wrapper"><div id="cktoolbar" style="width: 935px;"> </div></div>
        </div>		

        <div id="main_wrapper" ng-cloak>
            <div id="content_wrapper">

                <div id="logisticsWrapper">
                    <div id="logisticsInner">
                        <h1>Logistics page for CADWOLF</h1>
                        <p class="lead">The lines below show a list of bugs, a list of high level features that will eventually be added, and a to do list. Clicking on the text and icons on the left switches between the three views. The titles, modules, descriptions, and status can be changed as needed.</p>
                        <h2 ng-show="showBugs">Bug List</h2>
                        <p ng-show="showBugs">The list below is intended to show both a list of user entered items as well as a list of items submitted by programmers. It's simply a way to easily keep track of the things we are working on. It can be a bug in the true sense of the word where something is broken, or it can be a suggested improvement in an algorithm or UI/UX.</p>
                        <h2 ng-show="showTodo">To Do Items</h2>
                        <p ng-show="showTodo">The to do list is meant to encompass things that need to be done that are not software features. This could be things that need to be ordered or made or emails to be sent or anything like that.</p>
                        <h2 ng-show="showFeatures">Features</h2>
                        <p ng-show="showFeatures">There are a number of things that will be added to CADWOLF before it is done. Some of the things on this list are small items to add to existing modules. Some of them are high level things to be added on eventually. This page is just a good way of keeping track of those eventual things.</p>
                        <!-- Button to add a new item -->
                        <div class="btn-group">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add New Item <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li><a href="#" ng-click="newItem(0)">Bug</a></li>
                                <li><a href="#" ng-click="newItem(2)">To Do</a></li>
                                <li><a href="#" ng-click="newItem(1)">Feature</a></li>
                            </ul>
                        </div>                        
                        <div ng-show="showBugs" ng-repeat="obj in cadwolfLogistics.bug | orderBy:obj.created track by obj.id">
                            
                            <div ng-if="obj.dataObject.status==0" class="bs-callout bs-callout-danger">
                                <row>
                                    <h4><span ng-if="!obj.dataObject.moduleEdit" ng-click="obj.dataObject.moduleEdit=true">{{obj.dataObject.module}}</span>
                                        <span ng-if="obj.dataObject.moduleEdit">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Module <span class="caret"></span></button>
                                                <ul class="dropdown-menu">
                                                    <li><a href="#" ng-click="obj.dataObject.module='Documents; obj.dataObject.moduleEdit=false; saveItem(obj)'">Documents</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Workspaces; obj.dataObject.moduleEdit=false; saveItem(obj)'">Workspaces</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Datasets'; obj.dataObject.moduleEdit=false; saveItem(obj)">Datasets</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Part Trees'; obj.dataObject.moduleEdit=false; saveItem(obj)">Part Trees</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Plots'; obj.dataObject.moduleEdit=false; saveItem(obj)">Plots</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Surfaces'; obj.dataObject.moduleEdit=false; saveItem(obj)">Surfaces</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Profiles'; obj.dataObject.moduleEdit=false; saveItem(obj)">Profiles</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Home Page'; obj.dataObject.moduleEdit=false; saveItem(obj)">Home Page</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Login Page'; obj.dataObject.moduleEdit=false; saveItem(obj)">Login Page</a></li>
                                                </ul>
                                            </div>
                                        </span> - 
                                        <span ng-if="!obj.dataObject.titleEdit" ng-click="obj.dataObject.titleEdit=true">{{obj.dataObject.title}}</span>
                                        <span ng-if="obj.dataObject.titleEdit"><form class="form-inline"><input type="text" class="form-control" ng-model="obj.dataObject.title" ng-enter="obj.dataObject.titleEdit=false; saveItem(obj)"/></form></span>
                                        <button type="button" class="close" aria-label="Close" ng-click="deleteItem(obj)"><span aria-hidden="true">&times;</span></button>
                                    </h4>
                                </row>
                                <div class="spacer20">&nbsp</div>
                                <row>
                                <div ng-click="setCKEditor('bug', obj.id)"  id="bug{{obj.id}}" data-ng-bind-html="obj.dataObject.description" ng-blur="saveItem(obj);"></div>
                                </row>
                                <div class="spacer20">&nbsp</div>
                                <row>{{obj.cdate | date : 'EEE, MMM d, y - h:mm a'}}</row>
                                <div class="spacer20">&nbsp</div>
                                <div class="dropdown">
                                    <button class="btn btn-default dropdown-toggle" type="button" id="status{{obj.id}}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Change Status<span class="caret"></span></button>
                                    <ul class="dropdown-menu" aria-labelledby="status{{obj.id}}">
                                        <li><a href="#" ng-click="obj.dataObject.status='0'; saveItem(obj);">Needs Action</a></li>
                                        <li><a href="#" ng-click="obj.dataObject.status='1'; saveItem(obj);">In Work</a></li>
                                        <li><a href="#" ng-click="obj.dataObject.status='2'; saveItem(obj);">Resolved</a></li>
                                    </ul>
                                </div>
                                <div class="spacer10">&nbsp</div>
                            </div>
                            <div ng-if="obj.dataObject.status==1" class="bs-callout bs-callout-warning">
                                <row>
                                    <h4><span ng-if="!obj.dataObject.moduleEdit" ng-click="obj.dataObject.moduleEdit=true">{{obj.dataObject.module}}</span>
                                        <span ng-if="obj.dataObject.moduleEdit">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Module <span class="caret"></span></button>
                                                <ul class="dropdown-menu">
                                                    <li><a href="#" ng-click="obj.dataObject.module='Documents; obj.dataObject.moduleEdit=false; saveItem(obj)'">Documents</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Workspaces; obj.dataObject.moduleEdit=false; saveItem(obj)'">Workspaces</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Datasets'; obj.dataObject.moduleEdit=false; saveItem(obj)">Datasets</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Part Trees'; obj.dataObject.moduleEdit=false; saveItem(obj)">Part Trees</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Plots'; obj.dataObject.moduleEdit=false; saveItem(obj)">Plots</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Surfaces'; obj.dataObject.moduleEdit=false; saveItem(obj)">Surfaces</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Profiles'; obj.dataObject.moduleEdit=false; saveItem(obj)">Profiles</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Home Page'; obj.dataObject.moduleEdit=false; saveItem(obj)">Home Page</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Login Page'; obj.dataObject.moduleEdit=false; saveItem(obj)">Login Page</a></li>
                                                </ul>
                                            </div>
                                        </span> - 
                                        <span ng-if="!obj.dataObject.titleEdit" ng-click="obj.dataObject.titleEdit=true">{{obj.dataObject.title}}</span>
                                        <span ng-if="obj.dataObject.titleEdit"><form class="form-inline"><input type="text" class="form-control" ng-model="obj.dataObject.title" ng-enter="obj.dataObject.titleEdit=false; saveItem(obj)"/></form></span>
                                        <button type="button" class="close" aria-label="Close" ng-click="deleteItem(obj)"><span aria-hidden="true">&times;</span></button>
                                    </h4>
                                </row>
                                <div class="spacer20">&nbsp</div>
                                <row>
                                <div ng-click="setCKEditor('bug', obj.id)"  id="bug{{obj.id}}" data-ng-bind-html="obj.dataObject.description" ng-blur="saveItem(obj);"></div>
                                </row>
                                <div class="spacer20">&nbsp</div>
                                <row>{{obj.cdate | date : 'EEE, MMM d, y - h:mm a'}}</row>
                                <div class="spacer20">&nbsp</div>
                                <div class="dropdown">
                                    <button class="btn btn-default dropdown-toggle" type="button" id="status{{obj.id}}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Change Status<span class="caret"></span></button>
                                    <ul class="dropdown-menu" aria-labelledby="status{{obj.id}}">
                                        <li><a href="#" ng-click="obj.dataObject.status='0'; saveItem(obj);">Needs Action</a></li>
                                        <li><a href="#" ng-click="obj.dataObject.status='1'; saveItem(obj);">In Work</a></li>
                                        <li><a href="#" ng-click="obj.dataObject.status='2'; saveItem(obj);">Resolved</a></li>
                                    </ul>
                                </div>
                                <div class="spacer10">&nbsp</div>
                            </div>
                            <div ng-if="obj.dataObject.status==2" class="bs-callout bs-callout-success">
                                <row>
                                    <h4><span ng-if="!obj.dataObject.moduleEdit" ng-click="obj.dataObject.moduleEdit=true">{{obj.dataObject.module}}</span>
                                        <span ng-if="obj.dataObject.moduleEdit">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Module <span class="caret"></span></button>
                                                <ul class="dropdown-menu">
                                                    <li><a href="#" ng-click="obj.dataObject.module='Documents; obj.dataObject.moduleEdit=false; saveItem(obj)'">Documents</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Workspaces; obj.dataObject.moduleEdit=false; saveItem(obj)'">Workspaces</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Datasets'; obj.dataObject.moduleEdit=false; saveItem(obj)">Datasets</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Part Trees'; obj.dataObject.moduleEdit=false; saveItem(obj)">Part Trees</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Plots'; obj.dataObject.moduleEdit=false; saveItem(obj)">Plots</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Surfaces'; obj.dataObject.moduleEdit=false; saveItem(obj)">Surfaces</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Profiles'; obj.dataObject.moduleEdit=false; saveItem(obj)">Profiles</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Home Page'; obj.dataObject.moduleEdit=false; saveItem(obj)">Home Page</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Login Page'; obj.dataObject.moduleEdit=false; saveItem(obj)">Login Page</a></li>
                                                </ul>
                                            </div>
                                        </span> - 
                                        <span ng-if="!obj.dataObject.titleEdit" ng-click="obj.dataObject.titleEdit=true">{{obj.dataObject.title}}</span>
                                        <span ng-if="obj.dataObject.titleEdit"><form class="form-inline"><input type="text" class="form-control" ng-model="obj.dataObject.title" ng-enter="obj.dataObject.titleEdit=false; saveItem(obj)"/></form></span>
                                        <button type="button" class="close" aria-label="Close" ng-click="deleteItem(obj)"><span aria-hidden="true">&times;</span></button>
                                    </h4>
                                </row>
                                <div class="spacer20">&nbsp</div>
                                <row>
                                <div ng-click="setCKEditor('bug', obj.id)"  id="bug{{obj.id}}" data-ng-bind-html="obj.dataObject.description" ng-blur="saveItem(obj);"></div>
                                </row>
                                <div class="spacer20">&nbsp</div>
                                <row>{{obj.cdate | date : 'EEE, MMM d, y - h:mm a'}}</row>
                                <div class="spacer20">&nbsp</div>
                                <div class="dropdown">
                                    <button class="btn btn-default dropdown-toggle" type="button" id="status{{obj.id}}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Change Status<span class="caret"></span></button>
                                    <ul class="dropdown-menu" aria-labelledby="status{{obj.id}}">
                                        <li><a href="#" ng-click="obj.dataObject.status='0'; saveItem(obj);">Needs Action</a></li>
                                        <li><a href="#" ng-click="obj.dataObject.status='1'; saveItem(obj);">In Work</a></li>
                                        <li><a href="#" ng-click="obj.dataObject.status='2'; saveItem(obj);">Resolved</a></li>
                                    </ul>
                                </div>
                                <div class="spacer10">&nbsp</div>
                            </div>
                        </div>
                        <div ng-show="showTodo" ng-repeat="obj in cadwolfLogistics.toDo | orderBy:obj.dataObj.precedence track by obj.id">
                            <div ng-if="obj.dataObject.status==0" class="bs-callout bs-callout-primary">
                                <row>
                                    <h4><span ng-if="!obj.dataObject.moduleEdit" ng-click="obj.dataObject.moduleEdit=true">{{obj.dataObject.module}}</span>
                                        <span ng-if="obj.dataObject.moduleEdit">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Module <span class="caret"></span></button>
                                                <ul class="dropdown-menu">
                                                    <li><a href="#" ng-click="obj.dataObject.module='Documents; obj.dataObject.moduleEdit=false; saveItem(obj)'">Documents</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Workspaces; obj.dataObject.moduleEdit=false; saveItem(obj)'">Workspaces</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Datasets'; obj.dataObject.moduleEdit=false; saveItem(obj)">Datasets</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Part Trees'; obj.dataObject.moduleEdit=false; saveItem(obj)">Part Trees</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Plots'; obj.dataObject.moduleEdit=false; saveItem(obj)">Plots</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Surfaces'; obj.dataObject.moduleEdit=false; saveItem(obj)">Surfaces</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Profiles'; obj.dataObject.moduleEdit=false; saveItem(obj)">Profiles</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Home Page'; obj.dataObject.moduleEdit=false; saveItem(obj)">Home Page</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Login Page'; obj.dataObject.moduleEdit=false; saveItem(obj)">Login Page</a></li>
                                                </ul>
                                            </div>
                                        </span> - 
                                        <span ng-if="!obj.dataObject.titleEdit" ng-click="obj.dataObject.titleEdit=true">{{obj.dataObject.title}}</span>
                                        <span ng-if="obj.dataObject.titleEdit"><form class="form-inline"><input type="text" class="form-control" ng-model="obj.dataObject.title" ng-enter="obj.dataObject.titleEdit=false; saveItem(obj)"/></form></span>
                                        <button type="button" class="close" aria-label="Close" ng-click="deleteItem(obj)"><span aria-hidden="true">&times;</span></button>
                                    </h4>
                                </row>
                                <div class="spacer20">&nbsp</div>
                                <row>
                                <div ng-click="setCKEditor('toDo', obj.id)"  id="bug{{obj.id}}" data-ng-bind-html="obj.dataObject.description" ng-blur="saveItem(obj);"></div>
                                </row>
                                <div class="spacer20">&nbsp</div>
                                <div class="dropdown">
                                    <button class="btn btn-default dropdown-toggle" type="button" id="status{{obj.id}}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Change Status<span class="caret"></span></button>
                                    <ul class="dropdown-menu" aria-labelledby="status{{obj.id}}">
                                        <li><a href="#" ng-click="obj.dataObject.status='0'; saveItem(obj);">Needs Action</a></li>
                                        <li><a href="#" ng-click="obj.dataObject.status='1'; saveItem(obj);">Done</a></li>
                                    </ul>
                                </div>
                                <div class="spacer10">&nbsp</div>
                            </div>
                            <div ng-if="obj.dataObject.status==1" class="bs-callout bs-callout-success">
                                <row>
                                    <h4><span ng-if="!obj.dataObject.moduleEdit" ng-click="obj.dataObject.moduleEdit=true">{{obj.dataObject.module}}</span>
                                        <span ng-if="obj.dataObject.moduleEdit">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Module <span class="caret"></span></button>
                                                <ul class="dropdown-menu">
                                                    <li><a href="#" ng-click="obj.dataObject.module='Documents; obj.dataObject.moduleEdit=false; saveItem(obj)'">Documents</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Workspaces; obj.dataObject.moduleEdit=false; saveItem(obj)'">Workspaces</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Datasets'; obj.dataObject.moduleEdit=false; saveItem(obj)">Datasets</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Part Trees'; obj.dataObject.moduleEdit=false; saveItem(obj)">Part Trees</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Plots'; obj.dataObject.moduleEdit=false; saveItem(obj)">Plots</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Surfaces'; obj.dataObject.moduleEdit=false; saveItem(obj)">Surfaces</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Profiles'; obj.dataObject.moduleEdit=false; saveItem(obj)">Profiles</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Home Page'; obj.dataObject.moduleEdit=false; saveItem(obj)">Home Page</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Login Page'; obj.dataObject.moduleEdit=false; saveItem(obj)">Login Page</a></li>
                                                </ul>
                                            </div>
                                        </span> - 
                                        <span ng-if="!obj.dataObject.titleEdit" ng-click="obj.dataObject.titleEdit=true">{{obj.dataObject.title}}</span>
                                        <span ng-if="obj.dataObject.titleEdit"><form class="form-inline"><input type="text" class="form-control" ng-model="obj.dataObject.title" ng-enter="obj.dataObject.titleEdit=false; saveItem(obj)"/></form></span>
                                        <button type="button" class="close" aria-label="Close" ng-click="deleteItem(obj)"><span aria-hidden="true">&times;</span></button>
                                    </h4>
                                </row>
                                <div class="spacer20">&nbsp</div>
                                <row>
                                <div ng-click="setCKEditor('toDo', obj.id)"  id="bug{{obj.id}}" data-ng-bind-html="obj.dataObject.description" ng-blur="saveItem(obj);"></div>
                                </row>
                                <div class="spacer20">&nbsp</div>
                                <div class="dropdown">
                                    <button class="btn btn-default dropdown-toggle" type="button" id="status{{obj.id}}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Change Status<span class="caret"></span></button>
                                    <ul class="dropdown-menu" aria-labelledby="status{{obj.id}}">
                                        <li><a href="#" ng-click="obj.dataObject.status='0'; saveItem(obj);">Needs Action</a></li>
                                        <li><a href="#" ng-click="obj.dataObject.status='1'; saveItem(obj);">Done</a></li>
                                    </ul>
                                </div>
                                <div class="spacer10">&nbsp</div>
                            </div>
                                                        
                        </div>
                        <div ng-show="showFeatures" ng-repeat="obj in cadwolfLogistics.feature | orderBy:obj.created track by obj.id">
                            <div ng-if="obj.dataObject.status==0" class="bs-callout bs-callout-info">
                                <row>
                                    <h4><span ng-if="!obj.dataObject.moduleEdit" ng-click="obj.dataObject.moduleEdit=true">{{obj.dataObject.module}}</span>
                                        <span ng-if="obj.dataObject.moduleEdit">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Module <span class="caret"></span></button>
                                                <ul class="dropdown-menu">
                                                    <li><a href="#" ng-click="obj.dataObject.module='Documents; obj.dataObject.moduleEdit=false; saveItem(obj)'">Documents</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Workspaces; obj.dataObject.moduleEdit=false; saveItem(obj)'">Workspaces</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Datasets'; obj.dataObject.moduleEdit=false; saveItem(obj)">Datasets</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Part Trees'; obj.dataObject.moduleEdit=false; saveItem(obj)">Part Trees</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Plots'; obj.dataObject.moduleEdit=false; saveItem(obj)">Plots</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Surfaces'; obj.dataObject.moduleEdit=false; saveItem(obj)">Surfaces</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Profiles'; obj.dataObject.moduleEdit=false; saveItem(obj)">Profiles</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Home Page'; obj.dataObject.moduleEdit=false; saveItem(obj)">Home Page</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Login Page'; obj.dataObject.moduleEdit=false; saveItem(obj)">Login Page</a></li>
                                                </ul>
                                            </div>
                                        </span> - 
                                        <span ng-if="!obj.dataObject.titleEdit" ng-click="obj.dataObject.titleEdit=true">{{obj.dataObject.title}}</span>
                                        <span ng-if="obj.dataObject.titleEdit"><form class="form-inline"><input type="text" class="form-control" ng-model="obj.dataObject.title" ng-enter="obj.dataObject.titleEdit=false; saveItem(obj)"/></form></span>
                                        <button type="button" class="close" aria-label="Close" ng-click="deleteItem(obj)"><span aria-hidden="true">&times;</span></button>
                                    </h4>
                                </row>
                                <div class="spacer20">&nbsp</div>
                                <row>
                                <div ng-click="setCKEditor('feature', obj.id)"  id="bug{{obj.id}}" data-ng-bind-html="obj.dataObject.description" ng-blur="saveItem(obj);"></div>
                                </row>
                                <div class="spacer20">&nbsp</div>
                                <div class="dropdown">
                                    <button class="btn btn-default dropdown-toggle" type="button" id="status{{obj.id}}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Change Status<span class="caret"></span></button>
                                    <ul class="dropdown-menu" aria-labelledby="status{{obj.id}}">
                                        <li><a href="#" ng-click="obj.dataObject.status='0'; saveItem(obj);">Needs Action</a></li>
                                        <li><a href="#" ng-click="obj.dataObject.status='1'; saveItem(obj);">Implemented</a></li>
                                    </ul>
                                </div>
                                <div class="spacer10">&nbsp</div>
                            </div>
                            <div ng-if="obj.dataObject.status==1" class="bs-callout bs-callout-success">
                                <row>
                                    <h4><span ng-if="!obj.dataObject.moduleEdit" ng-click="obj.dataObject.moduleEdit=true">{{obj.dataObject.module}}</span>
                                        <span ng-if="obj.dataObject.moduleEdit">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Module <span class="caret"></span></button>
                                                <ul class="dropdown-menu">
                                                    <li><a href="#" ng-click="obj.dataObject.module='Documents; obj.dataObject.moduleEdit=false; saveItem(obj)'">Documents</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Workspaces; obj.dataObject.moduleEdit=false; saveItem(obj)'">Workspaces</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Datasets'; obj.dataObject.moduleEdit=false; saveItem(obj)">Datasets</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Part Trees'; obj.dataObject.moduleEdit=false; saveItem(obj)">Part Trees</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Plots'; obj.dataObject.moduleEdit=false; saveItem(obj)">Plots</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Surfaces'; obj.dataObject.moduleEdit=false; saveItem(obj)">Surfaces</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Profiles'; obj.dataObject.moduleEdit=false; saveItem(obj)">Profiles</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Home Page'; obj.dataObject.moduleEdit=false; saveItem(obj)">Home Page</a></li>
                                                    <li><a href="#" ng-click="obj.dataObject.module='Login Page'; obj.dataObject.moduleEdit=false; saveItem(obj)">Login Page</a></li>
                                                </ul>
                                            </div>
                                        </span> - 
                                        <span ng-if="!obj.dataObject.titleEdit" ng-click="obj.dataObject.titleEdit=true">{{obj.dataObject.title}}</span>
                                        <span ng-if="obj.dataObject.titleEdit"><form class="form-inline"><input type="text" class="form-control" ng-model="obj.dataObject.title" ng-enter="obj.dataObject.titleEdit=false; saveItem(obj)"/></form></span>
                                        <button type="button" class="close" aria-label="Close" ng-click="deleteItem(obj)"><span aria-hidden="true">&times;</span></button>
                                    </h4>
                                </row>
                                <div class="spacer20">&nbsp</div>
                                <row>
                                <div ng-click="setCKEditor('feature', obj.id)"  id="bug{{obj.id}}" data-ng-bind-html="obj.dataObject.description" ng-blur="saveItem(obj);"></div>
                                </row>
                                <div class="spacer20">&nbsp</div>
                                <div class="dropdown">
                                    <button class="btn btn-default dropdown-toggle" type="button" id="status{{obj.id}}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Change Status<span class="caret"></span></button>
                                    <ul class="dropdown-menu" aria-labelledby="status{{obj.id}}">
                                        <li><a href="#" ng-click="obj.dataObject.status='0'; saveItem(obj);">Needs Action</a></li>
                                        <li><a href="#" ng-click="obj.dataObject.status='1'; saveItem(obj);">Implemented</a></li>
                                    </ul>
                                </div>
                                <div class="spacer10">&nbsp</div>
                            </div>
                        </div>
                    </div>                            
                </div>
            </div>
                    
        </div>

    </div>
    
    <script src="http://www.cadwolf.com/js/jqueryV1.js"></script>
    <script src="http://www.cadwolf.com/js/bootstrap.min.js"></script>
    <script src="http://www.cadwolf.com/js/angular/angular.min.js"></script>
    <script src="http://www.cadwolf.com/js/angular/angular-sanitize.min.js"></script>
    <script src="http://www.cadwolf.com/js/angular/httpBackend.js"></script>
    <script src="http://www.cadwolf.com/js/angular/ngDialog.min.js"></script>
    <script src="http://www.cadwolf.com/js/logistics/app.js"></script>
    <script src="http://www.cadwolf.com/js/logistics/controllers.js"></script>
    <script src="http://www.cadwolf.com/js/logistics/directives.js"></script>
	<script src="http://www.cadwolf.com/ckeditor/ckeditor.js"></script>
	<script src="http://www.cadwolf.com/ckeditor/adapters/jquery.js"></script>
    <script>angular.bootstrap(document, ['logisticsApp']);</script>


</body>
