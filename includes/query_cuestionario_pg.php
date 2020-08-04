<?
date_default_timezone_set('America/Mexico_City');

require_once 'conexion_pg.php';


$queryTotal = "SELECT count(nivel) as conteo 
                FROM cuestionario_sedatu 
                WHERE nivel='pregunta'";  

$resultado = pg_query($conexion, $queryTotal);

while ($fila =  pg_fetch_array($resultado)) {
    $numPreguntas = $fila["conteo"];
}


$queryFinal = "SELECT *
               FROM cuestionario_sedatu
               WHERE redirige ='final'";

$resultado2 = pg_query($conexion, $queryFinal);

while ($fila2 =  pg_fetch_array($resultado2)) {
    $final = $fila2["num_pregunta"] - 1 ;
}

?>
