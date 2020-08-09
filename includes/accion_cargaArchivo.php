<?php
    
    $archivoTemp = $_FILES['archivo']['tmp_name'];
    $archivoReal = $_FILES['archivo']['name'];

    if(move_uploaded_file($_FILES['archivo']['tmp_name'],"../files/".$archivoReal)){
        echo "cargado|".$archivoReal;
    }else{
        echo "fallo";
    }
        

?>