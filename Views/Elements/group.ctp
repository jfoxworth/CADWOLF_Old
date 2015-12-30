<div id="group_wrapper">
	<?php 
	if ($type=="normal")
	{
		echo('<div id="group_groups">');
			echo('<h2 class="group_grouptitle">My Groups</h2>');
			echo('<div id="group_groupbox">');
				echo('<div class="groups_topgroupline">');
					echo('<div class="topgroupline_name">Group Name</div>');
					echo('<div class="topgroupline_creator">Creator</div>');
					echo('<div class="topgroupline_admin">Admin</div>');
					echo('<div class="topgroupline_date">Creation Date</div>');
				echo('</div>');
				foreach ($UserData as &$value) { 																													//
					echo('<div class="groups_groupline" groupid="'.$value['Groupuser']['groupid'].'">');
						if ($value['Groupuser']['admin']=='1')	{	echo('<div class="groupline_usernameadmin">'.$value['Groupuser']['name'].'</div>'); }else { echo('<div class="groupline_username">'.$value['Groupuser']['name'].'</div>');}
						if ($value['Groupuser']['creator']=='1'){ 	echo('<div class="groupline_creator check">&nbsp</div>');							}else {echo('<div class="groupline_creator cross">&nbsp</div>'); }
						if ($value['Groupuser']['admin']=='1') 	{ 	echo('<div class="groupline_admin check">&nbsp</div>');								}else {echo('<div class="groupline_admin cross">&nbsp</div>'); }
						echo('<div class="groupline_date">'.$this->Time->format('M jS, Y h:i A', $value['Groupuser']['created'], null, $timezone).'</div>');
					echo('</div>');
				}																																					//
			echo('</div>');
		echo('</div>');
	
		echo('<div id="group_actions">');
			echo('<h2 class="group_actiontitle">Actions</h2>');
			echo('<div id="group_newgroup" class="group_action">Create Group</div>');
			echo('<div id="group_deletegroup" class="group_action">Delete Group</div>');
			echo('<div id="group_adduser" class="group_action">Add User</div>');
			echo('<div id="group_removeuser" class="group_action">Remove User</div>');
		echo('</div>');
	
		echo('<div id="group_messageholder">');
			echo('<h2 class="group_actiontitle">Messages</h2>');
			echo('<div id="group_messages"></div>');
		echo('</div>');
		
		echo('<div id="group_members">');
			echo('<h2 class="group_title">Group Members</h2>');
			echo('<div id="group_memberbox">Click on a group to see its members</div>');
		echo('</div>');
	
		echo('<div id="group_perms">');
			echo('<h2 class="group_title">Group Permissions</h2>');
			echo('<div class="group_permbox">Click on a group to see its permissions</div>');
		echo('</div>');
	}else
	{
		echo('<div id="group_specs">');
			echo('<h2 class="group_spectitle">Information for Group - '.$GroupData['Group']['name'].' </h2>');
			echo('<div id="group_specbox">');
				echo('<div class="specbox_line"><div class="specbox_left">Group Name</div><div class="specbox_left">'.$GroupData['Group']['name'].'</div></div>');
				echo('<div class="specbox_line"><div class="specbox_left">Date Created</div><div class="specbox_left">'.$GroupData['Group']['created'].'</div></div>');
				echo('<div class="specbox_line"><div class="specbox_left">Number of Members</div><div class="specbox_left">'.$NumMembers.'</div></div>');
				echo('<div class="specbox_line"><div class="specbox_left">Administrators</div><div class="specbox_left">');
				foreach ($MemberData as &$value) {	if ($value['Groupuser']['admin']=='1') { echo($value['Groupuser']['username']); }	} echo('</div></div>');																																					//
			echo('</div>');
		echo('</div>');
	}

echo('</div>');

?>