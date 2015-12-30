<?php    
echo('<div id="container">');
	echo('<div id="fb-root"></div>');
	echo('<div id="facebookid"></div>');
	echo('<div id="left_side">');
		echo('<div id="left_container">');
			echo('<div id="title_block">CAD W<img src="/Images/Pages/wolfpaw2.gif" height="26px"/>lf</div>');
		echo('</div>');
	echo('</div>');
	
	echo('<div id="right_side2">');
		echo('<div id="main_wrapper">');
			echo('<div id="users_wrapper">');
				echo('<div class="users_form">');
					echo $this->Form->create('User'); 
			    		echo('<fieldset><legend>Traditional or Facebook Login</legend>');
			    	    	echo $this->Form->input('username', array('class' => 'half_input'));
			  	    	  	echo $this->Form->input('password', array('class' => 'half_input'));
			   			echo('</fieldset>');
					echo $this->Form->end(__('Login')); 
				echo('</div>');
			echo('</div>');
		
			echo('<div id="facebookusers_wrapper">');
				echo('<div class="users_form">');
					echo $this->Form->create('User'); 
			    		echo('<fieldset>');
							echo('<div id="facebook_data"></div>');
			   				echo('<div id="fb_button"><fb:login-button autologoutlink="true"></div>');
			   			echo('</fieldset>');
				echo('</div>');
			echo('</div>');
		echo('</div>');
	echo('</div>');
echo('</div>');
