<?php
require_once "conexion_pg.php";

$hoy = date("Y-m-d");
$hoyC = date("Y-m-d h:i:s");

$idUsuario = $_POST["idUsuario"];
$folio = $_POST["folio"];
$incidencia = $_POST["incidencia"];
$lat = $_POST["lat"];
$long = $_POST["long"];
$observacion = $_POST["observacion"];
$archivo = $_POST["archivo"];

$query = "INSERT INTO levantamiento_movil (usuario,fecha,folio,incidencia,lat,long,observaciones,fotografia)
	      VALUES ('$idUsuario','$hoyC','$folio','$incidencia','$lat','$long','$observacion','$archivo')";

$resultado = pg_query($conexion, $query);

if($resultado > 0){
    echo "generado";
}else{
    echo "fallo";
}

?>