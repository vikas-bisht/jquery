<?php
$con = mysqli_connect('localhost','excelarf','**T0y*6z8e0c','excelarf_vikas');
$query=mysqli_query($con,"select * from info order by id desc limit 0,5") or die (mysqli_error($con));
$result_data=array();
while($row = mysqli_fetch_array($query))
{
	$result_data[]=$row;
}
echo json_encode($result_data);
?>