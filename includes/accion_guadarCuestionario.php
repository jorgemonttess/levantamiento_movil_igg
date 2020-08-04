<?php
require_once "conexion_pg.php";

$hoy = date("Y-m-d");
$hora = date("h:i:s");
$fin_encuesta = date("Y-m-d h:i:s");

$idUsuario = $_POST["idUsuario"];
$resp1 = $_POST["resp1"];
$resp2 = $_POST["resp2"];
$resp3 = $_POST["resp3"];
$resp4 = $_POST["resp4"];
$resp5 = $_POST["resp5"];
$resp6 = $_POST["resp6"];
$resp7 = $_POST["resp7"];
$resp8 = $_POST["resp8"];
$resp9 = $_POST["resp9"];
$resp10 = $_POST["resp10"];
$resp11 = $_POST["resp11"];
$resp12 = $_POST["resp12"];
$resp13 = $_POST["resp13"];
$resp14 = $_POST["resp14"];
$resp15 = $_POST["resp15"];
$resp16 = $_POST["resp16"];
$resp17 = $_POST["resp17"];
$resp18 = $_POST["resp18"];
$resp19 = $_POST["resp19"];
$resp20 = $_POST["resp20"];
$resp21 = $_POST["resp21"];
$resp22 = $_POST["resp22"];
$resp23 = $_POST["resp23"];
$resp24 = $_POST["resp24"];
$resp25 = $_POST["resp25"];

$resp1val = $_POST["resp1val"];
$resp2val = $_POST["resp2val"];
$resp3val = $_POST["resp3val"];
$resp4val = $_POST["resp4val"];
$resp5val = $_POST["resp5val"];
$resp6val = $_POST["resp6val"];
$resp7val = $_POST["resp7val"];
$resp8val = $_POST["resp8val"];
$resp9val = $_POST["resp9val"];
$resp10val = $_POST["resp10val"];
$resp11val = $_POST["resp11val"];
$resp12val = $_POST["resp12val"];
$resp13val = $_POST["resp13val"];
$resp14val = $_POST["resp14val"];
$resp15val = $_POST["resp15val"];
$resp16val = $_POST["resp16val"];
$resp17val = $_POST["resp17val"];
$resp18val = $_POST["resp18val"];
$resp19val = $_POST["resp19val"];
$resp20val = $_POST["resp20val"];
$resp21val = $_POST["resp21val"];
$resp22val = $_POST["resp22val"];
$resp23val = $_POST["resp23val"];
$resp24val = $_POST["resp24val"];
$resp25val = $_POST["resp25val"];
$encuestador = $_POST["encuestador"];
$cometarios = $_POST["cometarios"];
$lat = $_POST["lat"];
$long = $_POST["long"];

$valorEncuesta = $resp1val+$resp2val+$resp3val+$resp4val+$resp5val+$resp6val+$resp7val+$resp8val+$resp9val+$resp10val+$resp11val+$resp12val+$resp13val+$resp14val+$resp15val+$resp16val+$resp17val+$resp18val+$resp19val+$resp20val+$resp21val+$resp22val+$resp23val+$resp24val+$resp25val;

$query = "INSERT INTO respuestas_cuest (fecha,hora_fin,usuario,preg1,valpreg1,preg2,valpreg2,preg3,valpreg3,preg4,valpreg4,preg5,valpreg5,preg6,valpreg6,preg7,valpreg7,preg8,valpreg8,preg9,valpreg9,preg10,valpreg10,preg11,valpreg11,preg12,valpreg12,preg13,valpreg13,preg14,valpreg14,preg15,valpreg15,preg16,valpreg16,preg17,valpreg17,preg18,valpreg18,preg19,valpreg19,preg20,valpreg20,preg21,valpreg21,preg22,valpreg22,preg23,valpreg23,preg24,valpreg24,preg25,valpreg25,valEncuesta,encuestador,comentarios,latitud,longitud)
	      VALUES ('$hoy',
                  '$fin_encuesta',
                  '$idUsuario',
                  '$resp1',
                  '$resp1val',
                  '$resp2',
                  '$resp2val',
                  '$resp3',
                  '$resp3val',
                  '$resp4',
                  '$resp4val',
                  '$resp5',
                  '$resp5val',
                  '$resp6',
                  '$resp6val',
                  '$resp7',
                  '$resp7val',
                  '$resp8',
                  '$resp8val',
                  '$resp9',
                  '$resp9val',
                  '$resp10',
                  '$resp10val',
                  '$resp11',
                  '$resp11val',
                  '$resp12',
                  '$resp12val',
                  '$resp13',
                  '$resp13val',
                  '$resp14',
                  '$resp14val',
                  '$resp15',
                  '$resp15val',
                  '$resp16',
                  '$resp16val',
                  '$resp17',
                  '$resp17val',
                  '$resp18',
                  '$resp18val',
                  '$resp19',
                  '$resp19val',
                  '$resp20',
                  '$resp20val',
                  '$resp21',
                  '$resp21val',
                  '$resp22',
                  '$resp22val',
                  '$resp23',
                  '$resp23val',
                  '$resp24',
                  '$resp24val',
                  '$resp25',
                  '$resp25val',
                  '$valorEncuesta',
                  '$encuestador',
                  '$cometarios',
                  '$lat',
                  '$long'
                  )";

$resultado = pg_query($conexion, $query);

if($resultado > 0){
    echo "generado";
}else{
    echo "fallo";
}

?>