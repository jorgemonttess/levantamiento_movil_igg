<?php
session_start();
$_SESSION["log"] = "sesion_off";

session_unset();
session_destroy();
echo"<meta http-equiv=refresh content=0;url=../index.php>";
?>