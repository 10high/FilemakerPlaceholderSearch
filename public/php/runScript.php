<?php
use fmRESTor\fmRESTor;
session_start();
require_once 'fmRESTor.php';

$url = $_GET['url'];
$user = $_SERVER['HTTP_USER'];
$password = $_SERVER['HTTP_PASSWORD'];
$scriptName = $_SERVER['HTTP_SCRIPTNAME'];
$placeholderNumber =  $_SERVER['HTTP_PLACEHOLDERNUMBER'];

$fm = new fmRESTor($url, "2023-03-08 Placeholder Check_German", "PLACEHOLDERFROMCUSTOMFILES", $user, $password, array("allowInsecure" => true));

$scriptParameters = [
	"script.param" => $placeholderNumber
];

$result = $fm->runScript($scriptName, $scriptParameters);

if(!$fm->isError($result)){
    $response = $fm->getResponse($result);
    echo json_encode(array('response' => $response));

} else {

    echo "Request Failed: ";

}


exit();