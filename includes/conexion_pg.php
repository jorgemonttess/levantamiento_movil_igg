<?
    $dbhost = "localhost";
    $dbuser = "postgres";
    $dbpass = "circulo9";
    $db = "triton";
    $port = "5432";

    $conexion_pg = "host=$dbhost port=$port dbname=$db user=$dbuser password=$dbpass";
    $conexion = pg_connect($conexion_pg);

    if(!$conexion) {
        echo "Error: No se ha podido conectar a la base de datos\n";
    }

?>