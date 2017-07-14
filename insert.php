<?php
$con = mysqli_connect('localhost','excelarf','**T0y*6z8e0c','excelarf_vikas');
$name=$_POST['name'];
$email=$_POST['email'];
$message=$_POST['message'];
$date=$_POST['date'];
$insert = "INSERT INTO `info`(`name`, `email`, `message`, `date`) VALUES ('$name','$email','$message','$date')";
$query=mysqli_query($con, $insert);

?>