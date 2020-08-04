startAutolocate();
function Startpage(){
    
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


$(document).ready(function(){
    
    //  ********* Map Initialization ****************

    mymap = L.map('divMap', {center:[19.42, -99.18], zoom:13});

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
    
    /********* Setup Layer Control  ***************/
            
    objBasemaps = {
        "Google Streets":roadMutant,
        "Google Satellite":hybridMutant
    };

    objOverlays = {};

    ctlLayers = L.control.layers(objBasemaps, objOverlays).addTo(mymap);

    ctlScale = L.control.scale({position:'bottomright', imperial:false, maxWidth:200}).addTo(mymap);

    mymap.locate();

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
        if ($("#btnFilter").html()=="On") {
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
        if (jsnSettings.autolocate=="On"){
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
        $("#altaPunto").css("display","block");
        populateCollect("generic_point");
    })
    
    $("#addPoint").click(function(){
        $("#divMap").css("display","none");
        $("#altaPunto").css("display","block");
    })
    
    $("#btnIngresar").click(function(){
        $("#mapa").css("display","none");
        $("#cuestionario").css("display","block");
    })
    
    var origen = "";
    var siguiente = "";
    var anterior = "";
    var numPregunta = "";

    $(".radioBtn").click(function(){
        origen = $(this).attr("origen");
        siguiente = $(this).attr("destino");
        numPregunta = $(this).val();

        var pregOrigen = $(this).attr("indice");

        $("#pregSig"+pregOrigen).val(siguiente);
    })
    
    
    $(".checkBtn").click(function(){
        origen = $(this).attr("origen");
        siguiente = $(this).attr("destino");
        numPregunta = $(this).val();

        var pregOrigen = $(this).attr("indice");

        $("#pregSig"+pregOrigen).val(siguiente);
    })
    
    $(".combo").click(function(){
        $(this).css("background","#FFFFFF");
    })
    
    $(".libre").keypress(function(){
        $(this).css("background","#FFFFFF");
    })
    
    $(".siguiente").click(function(){
        var tipo = $(this).attr("tipo");
        var idBtnSigActual = $(this).attr("id");
        var idBtnSA = idBtnSigActual.replace("btnSiguiente","");
        var pregSig =  $("#pregSig"+idBtnSA).val();
        
        var final = $("#finalPregunta").val();
        
        if(pregSig=="-"){
            alertify.alert('<font face=Arial color=Red><b><span class="fas fa-times"></span> Error</b></font>', '<font face=Arial>¡El campo es requerido!</font>');
        }else if(pregSig=="final"){
            $("#mensaje").removeClass("oculto");
            $("#btnGuardar").removeClass("oculto");
            $("#contenedor"+idBtnSA).addClass("oculto");
        }else{
        
            var divDestino = $("#pregSig"+idBtnSA).val();

            $("#pregOrigen"+divDestino).val(idBtnSA);
            
            $("#contenedor"+idBtnSA).addClass("oculto");
            $("#contenedor"+divDestino).removeClass("oculto");
            
        }
    })
    
    $(".anterior").click(function(){
        var idBtnAntActual = $(this).attr("id");
        var idBtnAA = idBtnAntActual.replace("btnAnterior","");
        
        var divOrigen =  $("#pregOrigen"+idBtnAA).val();

        $("#contenedor"+idBtnAA).addClass("oculto");
        $("#contenedor"+divOrigen).removeClass("oculto");
    })
    
    
    $("#btnGuardar").click(function(){
        alert("guardar");
        $("#loading").css("display","block");
        
        var encuestador = $("#encuestador").val();
        var cometarios = $("#cometarios").val();
        var lat = $("#lat").val();
        var long = $("#long").val();
        
        var idUsuario = $("#idUsuario").val();
        var resp1 = $('input:radio[name=respuesta1]:checked').val();
        var resp2 = $('input:radio[name=respuesta2]:checked').val();
        var resp3 = $('input:radio[name=respuesta3]:checked').val();
        var resp4 = $('input:radio[name=respuesta4]:checked').val();
        var resp5 = $('input:radio[name=respuesta5]:checked').val();
        var resp6 = $('input:radio[name=respuesta6]:checked').val();
        var resp7 = $('input:radio[name=respuesta7]:checked').val();
        var resp8 = $('input:radio[name=respuesta8]:checked').val();
        var resp9 = $('input:radio[name=respuesta9]:checked').val();
        var resp10 = $('input:radio[name=respuesta10]:checked').val();
        var resp11 = $('input:radio[name=respuesta11]:checked').val();
        var resp12 = $('input:radio[name=respuesta12]:checked').val();
        var resp13 = $('input:radio[name=respuesta13]:checked').val();
        var resp14 = $('input:radio[name=respuesta14]:checked').val();
        var resp15 = $('input:radio[name=respuesta15]:checked').val();
        var resp16 = $('input:radio[name=respuesta16]:checked').val();
        var resp17 = $('input:radio[name=respuesta17]:checked').val();
        var resp18 = $('input:radio[name=respuesta18]:checked').val();
        var resp19 = $('input:radio[name=respuesta19]:checked').val();
        var resp20 = $('input:radio[name=respuesta20]:checked').val();
        var resp21 = $('input:radio[name=respuesta21]:checked').val();
        var resp22 = $('input:radio[name=respuesta22]:checked').val();
        var resp23 = $('input:radio[name=respuesta23]:checked').val();
        var resp24 = $('input:radio[name=respuesta24]:checked').val();
        var resp25 = $('input:radio[name=respuesta25]:checked').val();
        
        var resp1val = $('input:radio[name=respuesta1]:checked').attr("ponderador");
        var resp2val = $('input:radio[name=respuesta2]:checked').attr("ponderador");
        var resp3val = $('input:radio[name=respuesta3]:checked').attr("ponderador");
        var resp4val = $('input:radio[name=respuesta4]:checked').attr("ponderador");
        var resp5val = $('input:radio[name=respuesta5]:checked').attr("ponderador");
        var resp6val = $('input:radio[name=respuesta6]:checked').attr("ponderador");
        var resp7val = $('input:radio[name=respuesta7]:checked').attr("ponderador");
        var resp8val = $('input:radio[name=respuesta8]:checked').attr("ponderador");
        var resp9val = $('input:radio[name=respuesta9]:checked').attr("ponderador");
        var resp10val = $('input:radio[name=respuesta10]:checked').attr("ponderador");
        var resp11val = $('input:radio[name=respuesta11]:checked').attr("ponderador");
        var resp12val = $('input:radio[name=respuesta12]:checked').attr("ponderador");
        var resp13val = $('input:radio[name=respuesta13]:checked').attr("ponderador");
        var resp14val = $('input:radio[name=respuesta14]:checked').attr("ponderador");
        var resp15val = $('input:radio[name=respuesta15]:checked').attr("ponderador");
        var resp16val = $('input:radio[name=respuesta16]:checked').attr("ponderador");
        var resp17val = $('input:radio[name=respuesta17]:checked').attr("ponderador");
        var resp18val = $('input:radio[name=respuesta18]:checked').attr("ponderador");
        var resp19val = $('input:radio[name=respuesta19]:checked').attr("ponderador");
        var resp20val = $('input:radio[name=respuesta20]:checked').attr("ponderador");
        var resp21val = $('input:radio[name=respuesta21]:checked').attr("ponderador");
        var resp22val = $('input:radio[name=respuesta22]:checked').attr("ponderador");
        var resp23val = $('input:radio[name=respuesta23]:checked').attr("ponderador");
        var resp24val = $('input:radio[name=respuesta24]:checked').attr("ponderador");
        var resp25val = $('input:radio[name=respuesta25]:checked').attr("ponderador");
        
        

        $.post("includes/accion_guadarCuestionario.php", {
            idUsuario:idUsuario,
            resp1:resp1,
            resp2:resp2,
            resp3:resp3,
            resp4:resp4,
            resp5:resp5,
            resp6:resp6,
            resp7:resp7,
            resp8:resp8,
            resp9:resp9,
            resp10:resp10,
            resp11:resp11,
            resp12:resp12,
            resp13:resp13,
            resp14:resp14,
            resp15:resp15,
            resp16:resp16,
            resp17:resp17,
            resp18:resp18,
            resp19:resp19,
            resp20:resp20,
            resp21:resp21,
            resp22:resp22,
            resp23:resp23,
            resp24:resp24,
            resp25:resp25,
            resp1val:resp1val,
            resp2val:resp2val,
            resp3val:resp3val,
            resp4val:resp4val,
            resp5val:resp5val,
            resp6val:resp6val,
            resp7val:resp7val,
            resp8val:resp8val,
            resp9val:resp9val,
            resp10val:resp10val,
            resp11val:resp11val,
            resp12val:resp12val,
            resp13val:resp13val,
            resp14val:resp14val,
            resp15val:resp15val,
            resp16val:resp16val,
            resp17val:resp17val,
            resp18val:resp18val,
            resp19val:resp19val,
            resp20val:resp20val,
            resp21val:resp21val,
            resp22val:resp22val,
            resp23val:resp23val,
            resp24val:resp24val,
            resp25val:resp25val,
            encuestador:encuestador,
            cometarios:cometarios,
            lat:lat,
            long:long
        }, function(respuesta){
            alert(respuesta);
            if(respuesta.trim()=="fallo"){
                alertify.alert('<font face=Arial color=Red><b><span class="fas fa-times"></span>ERROR</b></font>', '<font face=Arial>¡Ocurrio un problema, por favor vuelve a intentar!</font>');
                $("#loading").css("display","none");
            }
            else if(respuesta.trim()=="generado"){
                alertify.alert('<font face=Arial color=Green><b><span class="fas fa-check-circle"></span> Encuesta Guardada</b></font>', '<font face=Arial>¡Encuesta guardada con exito!</font>');
                setTimeout(function(){
                    $("#loading").css("display","none");
				    $(location).attr('href',"cuestionario.php");;
                }, 2000);  
            }
        })

    })
        
})
