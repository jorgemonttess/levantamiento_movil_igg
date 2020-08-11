<?php 
    session_start();
    require_once "includes/conexion_pg.php";
?>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="icon" href="images/igg.png" type="image/png" />
        <title>Triton</title>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />
        
        
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">    
        <link rel="stylesheet" href="css/leaflet.css">
        
        <link href="js/jquery-ui.css" rel="stylesheet">
        <link href="lib/bootstrap/bootstrap.min4.css" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="lib/alertifyjs/css/alertify.css">
        <link rel="stylesheet" type="text/css" href="lib/alertifyjs/css/themes/bootstrap.css">
        <link href="lib/fontawesome/css/fontawesome.min.css" rel="stylesheet">
        <link href="lib/fontawesome/css/all.css" rel="stylesheet">  
        
        <link rel="stylesheet" type="text/css" href="css/estilos_gestor.css">

        <link rel="stylesheet" href="lib/plugins/easy-button.css">
        <link rel="stylesheet" href="lib/plugins/leaflet.awesome-markers.css">
        <link rel="stylesheet" href="lib/plugins/MarkerCluster.css">
        <link rel="stylesheet" href="lib/plugins/MarkerCluster.Default.css">
        <link rel="stylesheet" href="generic_mobile_resources/css_generic_mobile.css">
        <link rel="stylesheet" href="lib/plugins/leaflet-search.css">

    </head>
    <body  onload="Startpage()">
        <div id="loading">
            <img src="images/loading.gif" class="cargando">
        </div>
        <div id="principal" class="container-fluid main">
            <nav id="header" class="navbar fixed-top navbar-light bg_red fuenteBlanca">
                 <span class="tituloHead borde">Sistema | SIGE</span>
                 <div class="col-xs-3 div-no-padding"><span class="pull-right">(&plusmn; <span class="info_cur_acc"></span>m)</span></div>
                <button class="navbar-toggler fuenteBlanca" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon fuenteBlanca"></span>
                </button>
                <div class="collapse navbar-collapse borde" id="navbarNavAltMarkup">
                    
                    <div class="col-sm-12 col-lg-4 datosUsuario borde">
                        <div class="row">
                            <div class="col-sm-12 col-lg-1 borde">
                                <img src="images/user.png" class="icono_user">
                            </div>
                            <div class="col-sm-12 col-lg-10 borde">
                                <input id="idUsuario" type="hidden" class="form-control form-control-sm datosUpaxer" value="<?php echo $_SESSION["usuario"]; ?>">
                                <input id="nomUsuario" type="hidden" class="form-control form-control-sm datosUpaxer" value="<?php echo $_SESSION["nombre"]; ?>">
                                <div class="col-sm-12 col-lg-12">
                                    <div class="datos_usuario"><?php echo $_SESSION["usuario"]; ?></div>
                                </div>
                                <div class="col-sm-12 col-lg-12">
                                    <div class="datos_usuario"><?php echo $_SESSION["nombre"]; ?></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-sm-12 col-lg-8 borde">
                        <div class="navbar-nav derecho borde">
                            <a id="sessionOff" class="nav-item nav-link barraNav" href="#" tabindex="-1"> <span class="fas fa-sign-out-alt textoOrange"></span> Cerrar sesión</a>
                            <input id="numUsuario" type="hidden" class="form-control form-control-sm" value="<?php echo $id_usuario; ?>">
                        </div>
                    </div>
                    
                </div>
            </nav>
            <div class="row">
                <div id="mapa" class="col-sm-12 col-lg-12 borde">
                    <div id="divMap" class="borde"><!--Capa del Mapa-->
                        <!--<div class="botonMapa">
                                <button id="btnAutolocate" class="btn"></button>
                                <i id="divCross" class="fa fa-crosshairs fa-2x"></i>
                        </div>-->
                        
                        <div id="slider" class="col-xs-2" >
                            <div id="sldrAutolocate" >
                                <div  id="contenedorSlider">
                                    <input id="numAutolocate" type="range" min="1" max="31" step="30" value="1">
                                </div>
                                <div >
                                    <input class="sliderText " type="text"  placeholder="On     Off">
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    <!--Busqueda de folio--> 
                    <div id="busquedaFolio" class="borde">                   
                        <div class="row">
                            <div class="col-sm-12 cajas">
                                <p class="tituloFolio"><span class="fas fa-search-location"></span>    Busqueda de Folio</p>
                            </div>
                            <div class="col-sm-12 cajas">
                                <input type="text" id="folio_buscar" placeholder="Ingresa tu Folio" class="form-control form-control-lg">
                                <div class="ui-widget";></div>
                            </div>
                            <div class="col-sm-12 cajas">
                                <button id="btnBuscar" class="btn btn-primary centrado btn_ingresar">Buscar</button>
                            </div>
                        
                        </div>
                    </div>
                    <!--Busqueda de folio-->
                    
                    <!--Levantamiento-->
                    <div id="levantamientoFolio" class="borde">
                        <div class="row">
                            <div class="col-12 cajasLev">
                                <input type="text" id="folio" class="form-control controlesLev" disabled>
                            </div>
                             <div class="col-12 cajasLev">
                                <input type="text" id="incidencia" class="form-control controlesLev" disabled>
                            </div>
                            <div class="col-6 cajasLev">
                                <input type="text" id="lat" class="form-control controlesLev" disabled>
                            </div>
                            <div class="col-6 cajasLev">
                                <input type="text" id="long" class="form-control controlesLev" disabled>
                            </div>
                            <div class="col-12 cajasLev">
                                <label>Observaciones</label>
                            </div>
                            <div class="col-12 cajasLev">
                                <textarea id="observacion" class="form-control" rows="3"></textarea>
                            </div>
                            <div class="col-12 cajasLev">
                                 <div class="input__row uploader">
                                    <div id="inputval" class="input-value"></div>
                                    <label for="archivo"></label>
                                    <form id="form_archivo" name="form_archivo" method="post" enctype="multipart/form-data">
                                        <input name="archivo" id="archivo" class="upload" type="file">
                                     </form>
                                </div>
                            </div>
                            <div class="col-12 cajasLev">
                                <button id="btnGuardar" class="btn btn-primary centrado btn_ingresar">Guardar</button>
                            </div>
                        </div>
                    </div>                   
                    
                    <!--Levantamiento-->
                    
                    
                    <footer id="footer"><!--Botones a pie de Pagina-->
                        <div class="row">
                            <div class="col-4 borde">
                                <button id="vistamap" class="btnMenu"><span class="fas fa-globe-americas"></span></button>
                            </div>
                            <div class="col-4 borde">
                                <button id="addPoint" class="btnMenu"><span class="fas fa-map-marker-alt"></span></button>
                            </div>
                            <div class="col-4 borde">
                                <button id="info" class="btnMenu"><span class="fas fa-info"></span></button>
                            </div>
                        </div>
                    </footer>
                </div>
                    
                
            </div>
        </div>
        
        <script src="js/jquery.min.js"></script>
        <script src="js/jquery-ui.js"></script>
        <script src="lib/bootstrap/bootstrap.min4.js"></script>
        <script src="lib/alertifyjs/alertify.js"></script>
        <script src="js/sweetalert2.min.js"></script>

        <script src="js/leaflet.js"></script>
        <script src="lib/plugins/leaflet.ajax.min.js"></script>
        <script src="lib/plugins/easy-button.js"></script>
        <script src="lib/plugins/leaflet-providers.js"></script>
        <script src="lib/plugins/leaflet.awesome-markers.min.js"></script>
        <script src="lib/plugins/leaflet.markercluster.js"></script>
        <script src="lib/plugins/leaflet.geometryutil.js"></script>
        <script src="generic_mobile_resources/js_generic_mobile.js"></script>
        <script src="https://maps.google.com/maps/api/js?key=AIzaSyCQQSs0dPp_21EUf6eATD97BM6e432mi_E"></script>
        <script src="lib/plugins/Leaflet.GoogleMutant.js"></script>
        <script src="lib/plugins/leaflet-search.js"></script>
        
        <script src="js/logicas_triton_v1.js"></script>

    </body>
</html>
