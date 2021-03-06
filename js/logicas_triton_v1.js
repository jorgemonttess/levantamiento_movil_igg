                                                                                                                                                                                                
function Startpage(){
    /*startAutolocate();
    setTimeout(function(){
        stopAutolocate();
    }, 1000);*/
};

var mymap;
var ctlScale;
var ctlLayers;
var ctlMeasure;
var lyrSearch;
var lyrGPt;
var jsnGPt;
var lyrAO;
var jsnAO;
var objBasemaps;
var objOverlays;
var mrkCurrentLocation;
var posCurrent;
var posPrevious;
var posLastTime;
var dtAverageFinish;
var arAverage;
var intAverage;
var intAutolocate;
var lyrColoniasAO;
var arColoniasAO=[];

$(function() {
    $("#folio_buscar").autocomplete({
        source: 'includes/accion_buscarFolio.php'
    });	
});


$(document).ready(function(){
    
    //  ********* Map Initialization ****************

    mymap = L.map('divMap', {center:[19.33, -99.26], zoom:11});

    mymap.locate();

    var roadMutant = L.gridLayer.googleMutant({
        maxZoom: 24,
        type:'roadmap'
    }).addTo(mymap);

    var hybridMutant = L.gridLayer.googleMutant({
        maxZoom: 24,
        type:'hybrid'
    });

    mymap.on("zoomend", function(e){
        console.log("Zoom level: ", mymap.getZoom());
    if(mymap.getZoom() > 15){ 
          mymap.removeLayer(roadMutant);
          hybridMutant.addTo(mymap);
        }else{
          mymap.removeLayer(hybridMutant);
          roadMutant.addTo(mymap);
        }
    });
    
    startAutolocate();
    
    /********* Setup Layer Control  ***************/
            
    objBasemaps = {
        "Google Streets":roadMutant,
        "Google Satellite":hybridMutant
    };

    objOverlays = {};

    ctlLayers = L.control.layers(objBasemaps, objOverlays).addTo(mymap);

    ctlScale = L.control.scale({position:'bottomright', imperial:false, maxWidth:200}).addTo(mymap);

    mymap.locate();
    
    /********* Colonias ***************/
    
    var styleColonias= {
        "color":"#FACC2E",
        "fillOpacity": 0
    }
    
    function popUp(feature,layer) {
                layer.bindPopup('<h7><b>'+ feature.properties.nombre +'</b></h7>')};
    
    lyrColoniasAO = L.geoJSON.ajax('geojson/ao_colonias_igg.geojson', {style:styleColonias, onEachFeature:popUp}).addTo(mymap);
    lyrColoniasAO.on('data:loaded', function(){
        arColoniasAO.sort(function(a,b){return a-b});
    });
    
    
    
    
	var searchControl = new L.Control.Search({
		layer: lyrColoniasAO,
		propertyName: 'nombre',
		marker: false,
		moveToLocation: function(latlng, title, mymap) {
			//map.fitBounds( latlng.layer.getBounds() );
			var zoom = mymap.getBoundsZoom(latlng.layer.getBounds());
  			mymap.setView(latlng, zoom); // access the zoom
		}
	});

	searchControl.on('search:locationfound', function(e) {

		e.layer.setStyle({fillColor: '#DF3A01', fillOpacity:0.5});
		if(e.layer._popup)
			e.layer.openPopup();

	}).on('search:collapsed', function(e) {

		lyrColoniasAO.eachLayer(function(layer) {	//restore feature color
			lyrColoniasAO.resetStyle(layer);
		});	
	});
	
	mymap.addControl( searchControl );

    // ************ Location Events **************

    setInterval(function(){
        mymap.locate();
        var dt=new Date();
        var tsf=((dt-posLastTime)/1000).toFixed(0);
        if (posPrevious) {
            tsf+="s, "+((dt-posPrevious.timestamp)/1000).toFixed(0);
        }
    }, 1000);

    mymap.on('locationfound', function(e) {
        $(".info_cur_acc").html(e.accuracy.toFixed(0));
        if ($("#btnFilter").html()=="") {
            var flt=$("#numFilter").val();
        } else {
            var flt=100000;
        }
        if (e.accuracy<flt){
        posCurrent=randomizePos(e);
        posLastTime=new Date();   
        } else {
            if(posCurrent)
            posCurrent.accuracy=e.accuracy;
        }
    });

    mymap.on('locationerror', function(e) {
        console.log(e);
    })

    mymap.on('contextmenu',function(e){
            populateCollect("generic_point");
            $("#lat").val(posCurrent.latitude.toFixed(6));
            $("#long").val(posCurrent.longitude.toFixed(6));
    })

    if (localStorage.jsnSettings){
        var jsnSettings=JSON.parse(localStorage.jsnSettings);
        $("#btnAutolocate").html(jsnSettings.autolocate);
        $("#numAutolocate").val(jsnSettings.numAutolocate);
        $("#valAutolocate").html(jsnSettings.numAutolocate);
        if (jsnSettings.autolocate==""){
            startAutolocate();
        }  
        $("#btnFilter").html(jsnSettings.filter);
        $("#numFilter").val(jsnSettings.numFilter);
        $("#valFilter").html(jsnSettings.numFilter);
    }

    /*BOTON CERRAR SESIÓN*/
    $("#sessionOff").click(function(){
        var idUsuario = $("#numUsuario").val();
        $("#loading").css("display","block");
        
        $.post("includes/accion_logout.php", {
            idUsuario:idUsuario
        }, function(respuesta){
            if(respuesta=="logoff"){
                alertify.error('<font face="Roboto">Sesión Finalizada</font>');
                setTimeout(function(){
                    $("#loading").css("display","none");
				    $(location).attr('href',"index.php");;
                }, 2000);  
            }
        })
    })
    /*BOTON CERRAR SESIÓN*/

    $("#vistamap").click(function(){
        $("#divMap").css("display","block");
        $("#altaPunto").css("display","none");
    })
    
    $("#addPoint").click(function(){
        $("#divMap").css("display","none");
        $("#busquedaFolio").css("display","block");
        populateCollect("generic_point");
    })
    
    $("#btnBuscar").click(function(){
        
        var folio_buscar = $("#folio_buscar").val();
        
        
        
        $.post("includes/accion_datosFolio.php", {
            folio_buscar:folio_buscar
        }, function(respuesta){
            var datos = respuesta.trim();
            var datosResp = datos.split("|");
            
            var r = datosResp[0];

            if(r.trim()=="no_existe"){
               
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text:'El folio no existe',
                    showConfirmButton: true,
                    confirmButtonColor: '#9D2449',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick:false,
                    allowEscapeKey:false,
                    allowEnterKey:true,
                    animation: true,
                })
            }
            else if(r.trim()=="existe"){
                $("#folio").val(datosResp[1]);
                $("#incidencia").val(datosResp[2]);
                
                $("#busquedaFolio").css("display","none");
                $("#levantamientoFolio").css("display","block");
            }
        })
        
    })
    
    $('#archivo').on('change',function(){
        $('#inputval').text($(this).val());
    });
    
    $("#btnIngresar").click(function(){
        $("#mapa").css("display","none");
        $("#cuestionario").css("display","block");
    })
    

    $(".combo").click(function(){
        $(this).css("background","#FFFFFF");
    })
    
    $(".libre").keypress(function(){
        $(this).css("background","#FFFFFF");
    })
    

    $("#btnAutolocate").click(function(){
        if ($("#btnAutolocate").html()=="On"){
            stopAutolocate();
        } else {
            startAutolocate();
        }
    });

    $("#numAutolocate").on("change", function(){
        $("#valAutolocate").html($("#numAutolocate").val());
        startAutolocate();
    });
    
    $("#gen_ao_list").click(function(){
        populateFeaturesAO("ao_colonias_igg");
    });
    
    
    $("#btnGuardar").click(function(){
        var idUsuario = $("#idUsuario").val();
        var folio = $("#folio").val();
        var incidencia = $("#incidencia").val();
        var lat = $("#lat").val();
        var long = $("#long").val();
        var observacion = $("#observacion").val();
        
        var infoArchivo = new FormData($("#form_archivo")[0]);
        
        $.ajax({
            data:infoArchivo,
            url:"includes/accion_cargaArchivo.php",
            type:"POST",
            contentType:false,
            processData:false,
        }).done(function(respuesta){
            
            var datos = respuesta.trim();
            var datoRespuesta = datos.split("|");
            
            var archivo  = datoRespuesta[1];
            
             if(datoRespuesta[0]=="cargado"){
                 $("#loading").css("display","block");
                 $.post("includes/accion_guadarCuestionario.php", {
                    archivo:archivo,
                    idUsuario:idUsuario,
                    folio:folio,
                    incidencia:incidencia,
                    lat:lat,
                    long:long,
                    observacion:observacion
                     
                }, function(r){

                    if(r.trim()=="fallo"){
                        $("#loading").css("display","none");
                        Swal.fire({
                            icon: 'error',
                            title: 'Algo salio mal',
                            showConfirmButton: true,
                            confirmButtonColor: '#9D2449',
                            confirmButtonText: 'Aceptar',
                            allowOutsideClick:false,
                            allowEscapeKey:false,
                            allowEnterKey:true,
                            animation: true,
                        })
                    }
                    else if(r.trim()=="generado"){
                        $("#loading").css("display","none");
                        Swal.fire({
                            icon: 'success',
                            title: 'Levantamiento Generado',
                            showConfirmButton: true,
                            confirmButtonColor: '#9D2449',
                            confirmButtonText: 'Aceptar',
                            allowOutsideClick:false,
                            allowEscapeKey:false,
                            allowEnterKey:true,
                            animation: true,
                        })
                        
                        $("#folio").val("");
                        $("#incidencia").val("");
                        $("#lat").val("");
                        $("#long").val("");
                        $("#observacion").val("");
                        $("#archivo").val("");
                        $("#inputval").val("");

                    }
                })
                 
             }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Algo salio mal, el archivo no fue cargado',
                            showConfirmButton: true,
                            confirmButtonColor: '#9D2449',
                            confirmButtonText: 'Aceptar',
                            allowOutsideClick:false,
                            allowEscapeKey:false,
                            allowEnterKey:true,
                            animation: true,
                        })
             }
            
         });

        return false;
        

        

    })
        
})
