<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    include "dbClass.php";
    $request = json_decode($postdata);
    $obj = new Database();
    $obj->deleteRecords($request);
}

