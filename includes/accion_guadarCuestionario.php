<?php
require_once "conexion_pg.php";

$hoy = date("Y-m-d");
$hoyC = date("Y-m-d h:i:s");

$idUsuario = $_POST["idUsuario"];
$id_reg = $_POST["id_reg"];
$folio = $_POST["folio"];
$incidencia = $_POST["incidencia"];
$lat = $_POST["lat"];
$long = $_POST["long"];
$observacion = $_POST["observacion"];


$query = "INSERT INTO levantamiento_movil (id_reg,usuario,fecha,folio,incidencia,lat,long,observaciones)
	      VALUES ('$id_reg','$idUsuario','$hoyC','$folio','$incidencia','$lat','$long','$observacion')";

$resultado = pg_query($conexion, $query);

if($resultado > 0){
    echo "generado";
}else{
    echo "fallo";
}

?>