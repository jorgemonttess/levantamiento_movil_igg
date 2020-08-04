<?
date_default_timezone_set('America/Mexico_City');

require_once 'config_pg.php';


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

$resultado = mysqli_query( $conexion, $queryFinal);

while ($fila2 =  mysqli_fetch_array($resultado)) {
    $final = $fila2["num_pregunta"] - 1 ;

}

?>
