<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="icon" href="images/igg.png" type="image/png" />
		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />  
		<title>Pandora</title>
		<?php 
            require_once "libreriasindex.php";
        ?>
		<script src="js/logicas_login.js"></script>
	</head>
	<body class="fondoOficial">
        <div id="loading">
            <img src="images/loading.gif" class="cargando">
        </div>
		<div class="col-sm-12 col-md-11 col-lg-12">
                <div class="col-sm-12 col-lg-4 cargLogin">
                    <div class="col-sm-12 col-lg-12">
                        <p>Inicio de sesión en Pandora</p>
                    </div>
                    <div class="col-sm-12 col-lg-12">
                        <input type="text" id="txt_user" class="form-control form-control-sm"  placeholder="Usuario" autocomplete="off">
                    </div>
                    <div class="col-sm-12 col-lg-12">
                        <input type="password" id="txt_password" class="form-control form-control-sm" autocomplete="off" placeholder="Contraseña">
                    </div>
                    <div class="col-sm-12 col-lg-12">
                        <button id="btn_login" class="btn btn-primary btn_ingresar centrado">Iniciar Sesión</button>
                    </div>
                
                </div>
		</div>
        <div class="div_by">Sistema Pandora</div>
	</body>
</html>