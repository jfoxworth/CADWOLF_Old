
<div id="fb-root"></div>
<div id="fbdata"></div>

<body id="page-top">

    <nav id="mainNav" class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand page-scroll" href="http://www.cadwolf.com">CADWOLF</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a class="page-scroll" href="#features">Features</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#licenses">Licenses</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>

    <header>
        <div class="header-fade">
            <div class="header-content">
                <div class="header-content-inner">
                    <h1>We are in Beta Testing</h1>
                    <p>Licenses are available for individual users and students for free</p>
                </div>
                <div id="downArrow"><a data-scroll="true" data-id="#overview" class="scroll-arrow hidden-xs hidden-sm"><i class="fa fa-angle-down"></i></a></div>
            </div>
        </div>
    </header>


      <section id="features">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Licenses Available</h2>
                    <hr class="primary">
                </div>
            </div>          
            <div class="row">
                <div class="col-md-4 col-md-offset-2">
                    <div class="panel panel-primary text-center">
                        <div class="panel-heading">
                            <h3 class="panel-title">Student/Research License<span class="label label-success">Beta</span></h3>
                            
                        </div>
                        <div class="panel-body">
                            <span class="price"></span>
                            <span class="period">No Cost</span>
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>1</strong> User</li>
                            <li class="list-group-item"><strong>1</strong> Workspace</li>
                            <li class="list-group-item"><strong>Unlimited</strong> Subfolders</li>
                            <li class="list-group-item"><strong>Unlimited</strong> Documents</li>
                            <li class="list-group-item"><strong></strong> Full access to all functions</li>
<!---                            <li class="list-group-item"><a href="#" class="btn btn-primary">Sign Up!</a>   -->
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="panel panel-primary text-center">
                        <div class="panel-heading">
                            <h3 class="panel-title">Commercial License</h3>
                        </div>
                        <div class="panel-body">
                            <span class="price"></span>
                            <span class="period">Coming Soon</span>
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item"><strong></strong>Pay per user</li>
                            <li class="list-group-item"><strong>1</strong> Workspace</li>
                            <li class="list-group-item"><strong>Unlimited</strong> Subfolders</li>
                            <li class="list-group-item"><strong>Unlimited</strong> Documents</li>
                            <li class="list-group-item"><strong></strong> Full access to all functions</li>
<!---                            <li class="list-group-item"><a href="#" class="btn btn-primary">Sign Up!</a>   -->
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="licenses">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Sign Up or Log In</h2>
                    <hr class="primary">
                </div>
            </div>          
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                    <div class="alert alert-danger" role="alert" id="name_error">The user name must start with a letter, be at least 5 characters long, and can only have letters, numbers, and spaces.</div>            
                    <div class="alert alert-danger" role="alert" id="name_duplicate">That user name is already taken.</div>            
                    <div class="alert alert-danger" role="alert" id="pass_error1">The password must be at least 5 characters long</div>            
                    <div class="alert alert-danger" role="alert" id="pass_error2">This password must match the one above</div>            
                    <div class="alert alert-danger" role="alert" id="email_error">The email address must be of the proper format abc@xyz.com</div>            
                    <div class="alert alert-danger" role="alert" id="email_error2">That email address is already linked to an account.</div>            
                    <div class="alert alert-danger" role="alert" id="firstname_error">The first name must have only have letters, dashes, apostrophes, and spaces.</div>            
                    <div class="alert alert-danger" role="alert" id="lastname_error">The last name must have only letters, dashes, apostrophes, and spaces.</div>            
                    <div class="alert alert-danger" role="alert" id="login_inactive">Account not yet active</div>            
                    <div class="alert alert-danger" role="alert" id="login_noname">No account by that name</div>            
                    <div class="alert alert-success" role="alert" id="passReset1">Account reset and email sent</div>            
                    <div class="alert alert-danger" role="alert" id="passReset2">No account found with that email</div>            
                </div>
            </div>          
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 ">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-1">
                                    <h3>Create Account</h2>
                                    <p text="">A user name, password, and email are required. Before the account can be used, a verification email will be sent to the entered address. Once the account is verified, it can be linked to a facebook account and the user can log in through facebook. Each facebook account can only be linked to 1 CADWOLF account.</p><p>The user name selected will be part of the address for all your files and folders. For example, the user name "The Wolf" will have as their home directory "www.cadwolf.com/Workspaces/The_Wolf/". User names can have letters, numbers, and spaces.</p>
                                    <form class="form-horizontal">
                                      <div class="form-group">
                                        <label for="create_username" class="col-sm-3 control-label">User Name</label>
                                        <div class="col-sm-8">
                                          <input type="text" class="form-control" id="create_username" placeholder="User Name">
                                        </div>
                                      </div>
                                      <div class="form-group">
                                        <label for="create_pass" class="col-sm-3 control-label">Password</label>
                                        <div class="col-sm-8">
                                          <input type="password" class="form-control" id="create_pass" placeholder="Password">
                                        </div>
                                      </div>
                                      <div class="form-group">
                                        <label for="create_pass2" class="col-sm-3 control-label">Password</label>
                                        <div class="col-sm-8">
                                          <input type="password" class="form-control" id="create_pass2" placeholder="Repeat Password">
                                        </div>
                                      </div>
                                      <div class="form-group">
                                        <label for="create_email" class="col-sm-3 control-label">Email Address</label>
                                        <div class="col-sm-8">
                                          <input type="email" class="form-control" id="create_email" placeholder="email address">
                                        </div>
                                      </div>
                                      <div class="form-group">
                                        <label for="create_firstname" class="col-sm-3 control-label">First Name</label>
                                        <div class="col-sm-8">
                                          <input type="text" class="form-control" id="create_firstname" placeholder="First Name">
                                        </div>
                                      </div>
                                      <div class="form-group">
                                        <label for="create_lastname" class="col-sm-3 control-label">Last Name</label>
                                        <div class="col-sm-8">
                                          <input type="text" class="form-control" id="create_lastname" placeholder="Last Name">
                                        </div>
                                      </div>
                                      <div class="form-group">
                                        <div class="col-sm-offset-4 col-sm-10">
                                          <button type="submit" class="btn btn-primary btn-xl" id="create_button">Create Account</button>
                                        </div>
                                      </div>
                                    </form>
                                </div>
                                <div class="col-lg-4">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <h3>User Login</h2>
                                                <?php
                                                    echo $this->Form->create('User', array('class' => 'form-horizontal')); 
                                                        echo('<div class="form-group">');
                                                            echo('<div class="col-lg-10">');
                                                                echo $this->Form->input('username', array('class' => 'form-control', 'id'=>'login_name', 'placeholder'=>'User Name', 'label'=>false));
                                                            echo('</div>');
                                                        echo('</div>');
                                                        echo('<div class="form-group">');
                                                            echo('<div class="col-lg-10">');
                                                                echo $this->Form->input('password', array('class' => 'form-control', 'id'=>'login_pass', 'placeholder'=>'Password', 'label'=>false));
                                                            echo('</div>');
                                                        echo('</div>');
                                                        echo('<div class="form-group">');
                                                            echo('<div class="col-lg-offset-3 col-lg-12">');
                                                                $options = array('class'=>'btn btn-primary btn-xl', 'value' => 'Login', 'id' => 'loginsubmit'	);
                                                                echo $this->Form->end($options);
                                                            echo('</div>');
                                                        echo('</div>');
                                                        ?>
                                                
                                            </div>        
                                        </div>          
                                    </div>          

                                    <div class="container">
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <h3>Facebook Login</h2>
                        						<div id="create_facebook"></div>
                                                <div id="facebook_data">
                                                    <div id="fbtext"></div>
                                                    <div id="fb_button"><fb:login-button autologoutlink="true"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="container">
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <h3>Reset Login</h2>
                                                <p>If you have forgotten your password, enter your email address here and a new password will be sent and the account reset.</p>
                                                <form class="form-horizontal">
                                                    <div class="form-group">
                                                        <div class="col-lg-10">
                                                            <input type="email" class="form-control" id="passReset" placeholder="email">
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-offset-3 col-lg-12">
                                                            <button type="submit" class="btn btn-primary btn-xl" id="resetsubmit">Reset</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>        
                                        </div>          
                                    </div>          
                                </div>          
                            </div>
                        </div>
                    </div>          
                </div>          
            </div>          
        </div>          
    </section>
 
    <!-- jQuery -->
    <script src="js/jqueryV1.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="js/jquery.easing.min.js"></script>
    <script src="js/jquery.fittext.js"></script>
    <script src="js/wow.min.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="js/HomePage.js"></script>
    <script src="http://connect.facebook.net/en_US/all.js"></script>
    <script src="js/UserLogin.js"></script>

    <!-- Go to www.addthis.com/dashboard to customize your tools -->
    <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-544ab34c65dd3a23" async="async"></script>
</body>
