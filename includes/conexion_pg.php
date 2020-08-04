<?
    $dbhost = "ec2-18-214-119-135.compute-1.amazonaws.com";
    $dbuser = "lhowhjczqkvkmn";
    $dbpass = "56bd792020d33b21f1bdfda7ff6b648dd354d9d23d8c7eaba2cd0562320db6fa";
    $db = "db0ltmo0lk8joc";
    $port = "5432";

    $conexion_pg = "host=$dbhost port=$port dbname=$db user=$dbuser password=$dbpass";
    $conexion = pg_connect($conexion_pg);

    if(!$conexion) {
        echo "Error: No se ha podido conectar a la base de datos\n";
    }

?>
