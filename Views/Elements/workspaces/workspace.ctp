<body ng-controller="workspacesController">

    <?php echo('<div id="username">'.$this->Session->read('Auth.User.username').'</div>'); ?> 
    <?php echo('<div id="userid">'.$this->Session->read('Auth.User.id').'</div>'); ?>
    
    <div id="container">																														

        <!-- The left column showing user info and views -->
        <?php    echo $this->element('workspaces/leftBar'); ?>
        
        <!-- The bar at the top holding the text editor icons -->
        <?php    echo $this->element('workspaces/formatBar'); ?>

        <!-- The column that lets users add items -->
        <?php    echo $this->element('workspaces/editBar'); ?>

        <div id="main_wrapper" ng-cloak>
            
            <div id="content_wrapper">

                <!-- Good / Bad message bar across the top -->
                <?php    echo $this->element('workspaces/messageBar'); ?>
                

                <!-- The title, description, contents, and other items in the main folder contents -->
                <?php    echo $this->element('workspaces/filesAndFolders'); ?>
                    
                <!-- The permissions tree view -->
                <?php    echo $this->element('workspaces/permissions'); ?>

            </div>
        </div>
    </div>
    
    <!-- The files that are included in this download -->
    <?php    echo $this->element('workspaces/includes'); ?>

    <!-- The ngDialog popup to make sure the user wants to delete a file -->
    <?php    echo $this->element('workspaces/ngDelete'); ?>

    <script>angular.bootstrap(document, ['cadwolfApp']);</script>


</body>
