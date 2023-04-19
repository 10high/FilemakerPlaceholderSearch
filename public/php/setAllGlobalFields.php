<?php
use fmRESTor\fmRESTor;
session_start();
require_once 'fmRESTor.php';

$url = $_GET['url'];
$user = $_SERVER['HTTP_USER'];
$password = $_SERVER['HTTP_PASSWORD'];
$searchInput = $_SERVER['HTTP_SEARCHINPUT'];
$sourceTarget = $_SERVER['HTTP_SOURCETARGET'];
$language = $_SERVER['HTTP_LANGUAGE'];

$fm = new fmRESTor($url, "2023-03-08 Placeholder Check_German", "PLACEHOLDERFROMCUSTOMFILES", $user, $password, array("allowInsecure" => true));

$parameters = array(
	"globalFields" => array(
        "PlaceholderFromCustomFiles::Search_Input" => $searchInput,
        "PlaceholderFromCustomFiles::_Switch_Language" => $sourceTarget,
        "PlaceholderFromCustomFiles::Search_Input_IsSourceTarget" => $language
    )
);

$result = $fm->setGlobalField($parameters); 


if(!$fm->isError($result)){
    $response = $fm->getResponse($result);
    echo json_encode(array('response' => $response));

} else {

    echo "Request Failed: ";

}


exit();