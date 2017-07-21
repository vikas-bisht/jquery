<?php
	$option=$_POST["option"];
	$fetch=$_POST["fetch"];
	$data=array(
	'option1'=> $option,
	'fetch1' => $fetch
	);
	echo json_encode($data);
?>