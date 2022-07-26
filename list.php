<?php
header('Access-Control-Allow-Origin: *');
include "dbClass.php";
$obj = new Database();
echo json_encode ($obj->getRecords());
?>