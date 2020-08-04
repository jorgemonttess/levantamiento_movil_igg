<?
date_default_timezone_set('America/Mexico_City');

require('config.php');


$idpregunta = $_POST['sigPregunta'];
    

$queryPreguntas = $mysqli->query ("SELECT * 
                          FROM cuestionario_sedatu
                          WHERE nivel='pregunta'
                          AND num_pregunta='$idpregunta'
                          ORDER BY 6 ASC");

$queryPreguntas2 = $mysqli->query ("SELECT * 
                          FROM cuestionario_sedatu
                          WHERE nivel='pregunta'
                          AND num_pregunta='$idpregunta'
                          ORDER BY 6 ASC");


?>
