<?php
    require_once('conexion_pg.php');

    $buscar = $_GET['term'];

    $queryFolio = "SELECT * 
                    FROM levantamiento 
                    WHERE folio LIKE '%$buscar%' 
                    LIMIT 15";

    $ejecutaBusqueda= pg_query($conexion, $queryFolio);
    
    while($opciones = pg_fetch_array($ejecutaBusqueda)){
        $data[] = $opciones[4];
    }

    echo json_encode($data);

?>