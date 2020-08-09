<?php
    session_start();
    date_default_timezone_set('America/Mexico_City');

    require_once "conexion_pg.php";

    $hoyCompleto = date("Y-m-d h:i:s");
    $hora = date("h:i:s");

    $txt_usuario = $_POST['txt_usuario'];
    $txt_pass = $_POST['txt_pass'];

    $consultaLog = "SELECT * FROM usuarios 
                    WHERE usuario ='$txt_usuario' 
                    AND pass ='$txt_pass'
                    AND estatus ='Activo'";

    $resultado = pg_query($conexion, $consultaLog);

    $valida = pg_num_rows($resultado);

    if($valida > 0){
        while ($rowP1 = pg_fetch_array($resultado)) {
            $_SESSION["login"] = "sesion_on";
            $_SESSION["usuario"] = $rowP1["usuario"];
            $_SESSION["nombre"] = $rowP1["nombre"]." ".$rowP1["ap_paterno"]." ".$rowP1["ap_materno"];
        }

        echo "conectado";
    }else{
        echo "log_error";
    }

?>


