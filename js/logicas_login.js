function Startpage() {

}
$(document).ready(function(){
    
	$("#btn_login").click(function(){
		var txt_usuario = $("#txt_usuario").val();
		var txt_pass = $("#txt_pass").val();
        
        //$("#loading").css("display","block");

		if(txt_usuario=="" || txt_pass==""){
			alertify.alert('<font face=Arial color=Red>ERROR</font>', '<font face=Arial>¡Hey, Existen campos sin información!</font>');
		}
		else{
			$.post("includes/accion_loginPG.php", {
				txt_usuario:txt_usuario,
				txt_pass:txt_pass
			}, function(respuesta){
				if(respuesta.trim()=="log_error"){
					$("#txt_usuario").val("");
					$("#txt_pass").val("");
					alertify.alert('<font face=Arial color=Red>ERROR</font>', '<font face=Arial>¡El Usuario o la contraseña son incorrectos!</font>');
                    //$("#loading").css("display","none");
				}
				else{
                    alertify.success('<font face="Roboto">Sesión Iniciada</font>');
                    setTimeout(function(){
                        //$("#loading").css("display","none");
					    $(location).attr('href',"levantamiento.php");
                    }, 1000);
				}
			})
		}
	})
})