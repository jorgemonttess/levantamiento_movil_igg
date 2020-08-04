<?
session_start();
date_default_timezone_set('America/Mexico_City');

require_once "config.php";

$hoyCompleto = date("Y-m-d");
$hora = date("h:i:s");

$txt_user = $_POST['txt_user'];
$txt_password = $_POST['txt_password'];

$consultaLog = "SELECT * FROM usuarios_sedatu 
                WHERE id_usuario='$txt_user' 
                AND pass_usuario='$txt_password'
                AND estatus ='activo'";

$resultado = mysqli_query($conexion, $consultaLog);

$valida = mysqli_num_rows($resultado);

if($valida > 0){
    while ($rowP1 =  mysqli_fetch_array($resultado)) {
        $_SESSION["login"] = "sesion_on";
        $_SESSION["id_usuario"] = $rowP1["id_usuario"];
        $_SESSION["nombre"] = $rowP1["nombre"]." ".$rowP1["ap_paterno"]." ".$rowP1["ap_materno"];
	}
}else{
	echo "log_error";
}

?>


