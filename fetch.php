<?php
    error_reporting(0);
    $con = mysqli_connect('localhost','excelarf','**T0y*6z8e0c','excelarf_vikas');
    $page_limit = 5;
    if(isset($_POST["page"]))
    {
        $page = intval($_POST["page"]);
    }
    else
    {
        $page =1 ;
    }
    $start_page = (($page-1) * $page_limit);

    $result=mysqli_query($con,"select *from `info` order by `id` desc limit {$start_page},{$page_limit}");
    $count=mysqli_num_rows($result);      
    if ($count> 0)
    {
        while($row = mysqli_fetch_array($result))
        {      
         $tmp[] = $row;
        }
    }
    else
    {
        echo "0 results";
    }

    $result = mysqli_query($con,"select count(*) from `info`");
    $rows = mysqli_num_rows($result);

    $total = $result->fetch_row()[0];

    echo  "{ \"data\":".json_encode($tmp).", \"count\":". $total." }";
 
    $con->close();
?>