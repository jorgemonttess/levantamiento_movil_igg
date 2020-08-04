function Startpage(){
    $(".proyecto").attr("disabled","true");
    $(".ubicacion").attr("disabled","true");
    $(".combo").attr("disabled","true");
    $(".comentarios").attr("disabled","true");
    $(".datosUpaxer").attr("disabled","true");
    
};



$(document).ready(function(){
    
    /*BOTON CERRAR SESIÓN*/
    $("#sessionOff").click(function(){
        var idUsuario = $("#numUsuario").val();
        $.post("includes/accion_logout.php", {
            idUsuario:idUsuario
        }, function(respuesta){
            if(respuesta=="logoff"){
                $(location).attr('href',"index.php");
            }
        })
    })
    /*BOTON CERRAR SESIÓN*/
    
    /*LISTA NUMERO DE PROYECTOS*/
    $("#num_pro").change(function(){
        var num_proyectos = $(this).val();
        
        for(var i=1; i<=num_proyectos; i++){
            $(".proyecto").attr("disabled","true");
            $(".combo").attr("disabled","true");
            $(".comentarios").attr("disabled","true");
            $(".datosUpaxer").attr("disabled","true");
            $(".ubicacion").attr("disabled","true");
        }
        
        if(num_proyectos > 0){
            for(var i=1; i<=num_proyectos; i++){
                $("#proyecto"+i).removeAttr("disabled");
                $("#tienda"+i).removeAttr("disabled");
                $("#cmbReport"+i).removeAttr("disabled");
                $("#comentarios"+i).removeAttr("disabled");
                $("#idUpaxer").removeAttr("disabled");
                $("#nomUpaxer").removeAttr("disabled");
	        }
        }else{
            $(".proyecto").attr("disabled","true");
            $(".ubicacion").attr("disabled","true");
            $(".combo").attr("disabled","true");
            $(".comentarios").attr("disabled","true");
            $(".datosUpaxer").attr("disabled","true");
        }    
    })
    /*LISTA NUMERO DE PROYECTOS*/
    
    /*CAMPO PROYECTOS*/
    $(".proyecto").blur(function(){
        var idProyecto = $(this).attr("id");
        var largo = idProyecto.length - 1;
        var idCampo = idProyecto.substr(largo);

        if($(this).val() !== ""){
            var nomProyecto = $(this).val();
            $.post("includes/accion_valida_Proyectos_v2.php", { 
                nomProyecto:nomProyecto
            }, function(respuesta){
                var elemntProy= respuesta.split('|');
                var resultado = elemntProy[0];

                if(resultado.trim()=="Invalido"){
                    $("#checkproyecto"+idCampo).addClass("oculto");
                    $("#errorproyecto"+idCampo).removeClass("oculto");
                    $("#proyecto"+idCampo).removeClass("verde");
                    alertify.alert('<font face=Arial color=Red>Gestor UPAX WEB: ERROR 504</font>', '<font face=Arial>¡Proyecto NO valido!</font><br><br><img src="images/sad.png">');
                    $(this).val("");
                }else if(resultado.trim()=="Correcto"){
                    $("#tipoProyecto"+idCampo).val(elemntProy[1]);
                    $("#folioProyecto"+idCampo).val(elemntProy[2]);
                    $("#codProyecto"+idCampo).val(elemntProy[3]);
                    $("#errorproyecto"+idCampo).addClass("oculto");
                    $("#checkproyecto"+idCampo).removeClass("oculto");
                    $("#proyecto"+idCampo).addClass("verde");
                }
            });
        }
    })
    
    $(".proyecto").keyup(function(){
        var idProyecto = $(this).attr("id");
        var dato = $(this).val();
        var largo = idProyecto.length - 1;
        var idCampo = idProyecto.substr(largo);
        
        if(dato==""){
            $("#checkproyecto"+idCampo).addClass("oculto");  
            $("#errorproyecto"+idCampo).addClass("oculto");
        }
    })
    /*CAMPO PROYECTOS*/
    
    var tipoBusqueda = "";
    
    /*CAMPO ID PAX*/
    $("#idUpaxer").keyup(function(){
        var flagID = $(this).val();
        $(this).removeClass("error");
        $("#nomUpaxer").removeClass("error");
        $(this).css("background","#FFF");
        
        if(flagID !== ""){
            $("#nomUpaxer").attr("disabled","true");
            tipoBusqueda = "idUpaxer";
        }else{
            $("#nomUpaxer").removeAttr("disabled");
            tipoBusqueda = "";
        }
    });
    /*CAMPO ID PAX*/
    
    /*CAMPO NOMBRE PAX*/
    $("#nomUpaxer").keyup(function(){
        var flagNombre = $(this).val();
        $(this).removeClass("error");
        $("#idUpaxer").removeClass("error");
        $(this).css("background","#FFF");
        
        if(flagNombre !== ""){
            $("#idUpaxer").attr("disabled",true);
            tipoBusqueda = "nombreUpaxer";
        }else{
            $("#idUpaxer").removeAttr("disabled");
            tipoBusqueda = "";
        }
     });
    /*CAMPO NOMBRE PAX*/
    
    /*BOTON BUSCAR*/
    $("#btnBuscar").click(function(){
        if($("#idUpaxer").val() == "" && $("#nomUpaxer").val() == ""){
            alertify.alert('<font face=Arial color=Red>Campos sin Información</font>', '<font face=Arial>¡Debes indicar un parametro para realziar la busqueda!</font>');
            $("#idUpaxer").addClass("error");
            $("#nomUpaxer").addClass("error");
        }else{
            var idUpaxer = $("#idUpaxer").val();
            var nomUpaxer = $("#nomUpaxer").val();

            $.post("includes/accion_consulta_DatosUpaxer.php", { 
                idUpaxer:idUpaxer,
                nomUpaxer:nomUpaxer,
                tipoBusqueda:tipoBusqueda 
            }, function(respuesta){
                alert(respuesta);
                if(respuesta.trim()=="no_existe"){
                   alertify.alert('<font face=Arial color=Red>Sin Información</font>', '<font face=Arial>¡El UPAXER que intentas buscar NO existe!</font>');
                }else{
                    var elemntPAX= respuesta.split('|');
                    if(tipoBusqueda=="nombreUpaxer"){
                        $("#idUpaxer").val(elemntPAX[0]);
                    }else if(tipoBusqueda=="idUpaxer"){
                        $("#nomUpaxer").val(elemntPAX[1]); 
                    }
				    $("#telUpaxer").val(elemntPAX[2]);
					$("#ubicaUpaxer").val(elemntPAX[3])
					$("#lat").val(elemntPAX[4]);
					$("#long").val(elemntPAX[5]);
                    $("#btnBuscar").addClass("oculto");
                    $("#btnBorrar").removeClass("oculto");
                    
                }
            })
        }
    })
    /*BOTON BUSCAR*/
    
    /*BOTON BORRAR*/
    $("#btnBorrar").click(function(){ 
        $("#idUpaxer").val("");
        $("#nomUpaxer").val(""); 
        $("#telUpaxer").val("");
        $("#ubicaUpaxer").val("")
        $("#lat").val("");
		$("#long").val("");
        $("#btnBorrar").addClass("oculto");
        $("#btnBuscar").removeClass("oculto");
    })
    /*BOTON BORRAR*/
    
    
    
})

$(function() {
    $("#idUpaxer").autocomplete({
        source: 'includes/accion_buscarPAX_v2.php'
    });	
    
    $("#nomUpaxer").autocomplete({
        source: 'includes/accion_buscarPAXNombre_v2.php'
    });
    
    $(".proyecto").autocomplete({
	  source: 'includes/accion_buscarProyectos_v2.php'
    });
});
