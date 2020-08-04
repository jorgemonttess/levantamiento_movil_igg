<?php
	session_start();
	require_once('conexion_pg.php');

	$folio_buscar = $_POST['folio_buscar'];

    
	$query = "SELECT * FROM levantamiento WHERE folio ='$folio_buscar'";

    $ejecutaBusqueda= pg_query($conexion, $query);

    $valida = pg_num_rows($ejecutaBusqueda);

    if($valida > 0){
        
        while($datos = pg_fetch_array($ejecutaBusqueda)){
            $folio = $datos[4];
            $incidencia = $datos[6];
        }

		echo "existe|".$folio."|".$incidencia;
	}else{
		echo "no_existe";
	}
    

?>	