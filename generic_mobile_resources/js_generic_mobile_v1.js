function openSubScreen(scrn){
    $(".modal").hide();
    $("#"+scrn).show();
}

function randomizePos(e){
    return e;
}

function startAutolocate(){
    $("#btnAutolocate").html("On");
    storeSettings();
    clearInterval(intAutolocate);
    intAutolocate=setInterval(function(){
        if (mrkCurrentLocation) {
            mrkCurrentLocation.remove();
        }
        if($("#btnFilter").html()=="On"){
            var flt = $("#numFilter").val();
        } else {
            var flt= 500000;
        }
        if (posCurrent.accuracy<flt){
            var radius = Math.min(200, posCurrent.accuracy/2)
            radius = Math.max(10, radius)
            mrkCurrentLocation = L.circle(posCurrent.latlng, {radius:radius}).addTo(mymap);
            mymap.setView(posCurrent.latlng, 17);
        }
    }, $("#numAutolocate").val()*1000)
}

function stopAutolocate(){
    $("#btnAutolocate").html("Off");
    storeSettings();
    clearInterval(intAutolocate);
}

function populateFeatures(tbl){
    $("#hdrFeatures").html(tbl);
    $.ajax({
        url:"generic_mobile_resources/php_generic_list.php",
        //url:"php/load_table.php",
        data:{tbl:tbl, user:user.username},
        type:'POST',
        success: function(response){
            $("#features").html(response);
            $(".btnFindGen").click(function(){
                var id = $(this).attr("data-id");
                var table = $(this).attr("data-table");
                findFeature(table, id);
            });
            $(".btnEditGen").click(function(){
                var id = $(this).attr("data-id");
                var table = $(this).attr("data-table");
                editFeature(table,id);
            });
            $(".btnDeleteGen").click(function(){
                var id = $(this).attr("data-id");
                var table = $(this).attr("data-table");
                if (confirm("Are you sure that you want to delete this record?")){
                    deleteRecord(table, id, function(){
                        populateFeatures(table);
                        switch (table){
                            case "generic_point":
                                refreshGPt();
                                break;
                        }
                    })
                }
            });
            openSubScreen("divFeatures");
        }, 
        error: function(xhr, status, error){
            $("#features").html("ERROR: "+error);
            openSubScreen("divFeatures");
        } 
    })
}

function populateFeaturesAO(tbl){
    $("#hdrFeatures").html(tbl);
    $.ajax({
        url:"generic_mobile_resources/php_generic_listAO.php",
        data:{tbl:tbl, user:user.username},
        type:'POST',
        success: function(response){
            $("#features").html(response);
            $(".btnFindGen").click(function(){
                var id = $(this).attr("data-id");
                var table = $(this).attr("data-table");
                findFeature(table, id);
            });
            $(".btnEditGen").click(function(){
                var id = $(this).attr("data-id");
                var table = $(this).attr("data-table");
                alert("Editing feature "+id+" in table "+table);
            });
            $(".btnDeleteGen").click(function(){
                var id = $(this).attr("data-id");
                var table = $(this).attr("data-table");
                alert("Deleting feature "+id+" in table "+table);
            });
            openSubScreen("divFeatures");
        }, 
        error: function(xhr, status, error){
            $("#features").html("ERROR: "+error);
            openSubScreen("divFeatures");
        } 
    })
}

function populateCollect(tbl){
    $("#gen_id").val("New");
    $("#gen_name").val("");
    $("#gen_descr").val("");
    $("#lat").val(posCurrent.latitude.toFixed(6));
    $("#long").val(posCurrent.longitude.toFixed(6));
    $("#gen_geojson").val("");
    $("#hdrGenForm").html(tbl);
    $("#btnGenFormInsert").html("Subir encuesta a "+tbl);
    $("#btnGenFormInsert").show();
    $("#btnGenFormUpdate").hide();
    if (tbl=="generic_point"){
        $("#gen_form_pt").show();
        $("#gen_form_ln").hide();
        
    } else{
        $("#gen_form_pt").hide();
        $("#gen_form_lm").show();
    }
    openSubScreen("divGenForm");
}

function calculateAverage(){
    $("#divAverage").show();
    $("#btnLayers").attr("disabled",true);
    dtAverageFinish=new Date(Date.now()+60000);
    arAverage=[];
    intAverage=setInterval(function(){
        var dt=new Date();
        var seconds = (dtAverageFinish-dt)/1000;
        if(seconds > 0){
            $("#divAverage").html(seconds.toFixed(0)+"s remaining");
            $("#mode").html("AVERAGING ("+seconds.toFixed(0)+"s)");
            arAverage.push(posCurrent.latlng);
            populateAverage(arAverage);
        }else{
            $("#mode").html("Basic");
            $("#divAverage").hide();
            $("#btnLayers").attr("disabled",false);
            openSubScreen("divGenForm");
            clearInterval(intAverage);
        }
    }, 1000)
};

function populateAverage(arLL){
    var sumLat=0;
    var sumLng=0;
    arLL.forEach(function(ll,ndx){
        sumLat+=ll.lat;
        sumLng+=ll.lng;
    });
    $("#lat").val((sumLat/arLL.length).toFixed(6));
    $("#long").val((sumLng/arLL.length).toFixed(6));
}


function storeSettings(){
    var jsnSettings={};
    jsnSettings.autolocate=$("#btnAutolocate").html();
    jsnSettings.numAutolocate=$("#numAutolocate").val();
    jsnSettings.filter=$("#btnFilter").html();
    jsnSettings.numFilter=$("#numFilter").val();
    localStorage.jsnSettings=JSON.stringify(jsnSettings);
}

function refreshGPt() {
    $.ajax({url:'php/load_data.php', 
        data: {tbl:'generic_point'},
        type: 'POST',
        success: function(response){
            if (response.substring(0,5)=="ERROR"){
                alert(response);
            } else {
                jsnGPt = JSON.parse(response);
                if (lyrGPt) {
                    ctlLayers.removeLayer(lyrGPt);
                    lyrGPt.remove();
                }
                lyrGPt = L.geoJSON(jsnGPt, {pointToLayer:returnGPt}).addTo(mymap);
                ctlLayers.addOverlay(lyrGPt, "Generic Points");
            }
        }, 
        error: function(xhr, status, error){
           alert("ERROR: "+error);
        } 
    });
}

function returnGPt(jsn, ll){
    if (!jsn.properties.comments){
        jsn.properties.comments="";
    }
    return L.circleMarker(ll, {radius:10, color:'orange'}).bindPopup("<h4>"+jsn.properties.name+"</h4>"+jsn.properties.comments+"<br>Created by: "+jsn.properties.createdby);
}

function refreshAO() {
    $.ajax({url:'php/load_data.php', 
        data: {tbl:'ao_colonias_igg'},
        type: 'POST',
        success: function(response){
            if (response.substring(0,5)=="ERROR"){
                alert(response);
            } else {
                jsnAO = JSON.parse(response);
                if (lyrAO) {
                    ctlLayers.removeLayer(lyrAO);
                    lyrAO.remove();
                }
                lyrAO = L.geoJSON(jsnAO, {onEachFeature:processAO, style:{color:'blue',opacity:0.5, fillOpacity:0}}).addTo(mymap);
                ctlLayers.addOverlay(lyrAO, "Generic Mnz");
            }
        }, 
        error: function(xhr, status, error){
           alert("ERROR: "+error);
        } 
    });
}

function processAO(jsn, lyr){
    if (!jsn.properties.comments){
        jsn.properties.comments="";
    }
    lyr.bindPopup("<h4>"+jsn.properties.nombre+"</h4>");
}

function findFeature(tbl, id){
    $.ajax({
        url:"php/load_data.php",
        data:{tbl:tbl, where:"id="+id},
        type:"POST",
        success: function(response){
            if (response.substring(0,5)=="ERROR"){
                $("#features").append(response);
            } else {
                stopAutolocate();
                var jsn=JSON.parse(response).features[0];
                if(lyrSearch){
                    lyrSearch.remove();
                }
                if (jsn.geometry.type=="Point"){
                    var ll=L.latLng(jsn.geometry.coordinates[1],jsn.geometry.coordinates[0])
                    lyrSearch=L.circleMarker(ll,{radius:15, color:'darkred',weight:6}).addTo(mymap);
                    mymap.setView(ll, 17);
                } else{
                    lyrSearch=L.geoJSON(jsn,{style:{color:'darkred',weight:8}}).addTo(mymap);
                    mymap.fitBounds(lyrSearch.getBounds());
                }
                openSubScreen();
            }
        }, 
        error: function(xhr, status, error){
           $("#features").append("ERROR: "+error);
        } 
    });
}

function editFeature(tbl, id){
    $.ajax({
        url:"php/load_data.php",
        data:{tbl:tbl, where:"id="+id},
        type:"POST",
        success: function(response){
            if (response.substring(0,5)=="ERROR"){
                $("#features").append(response);
            } else {
                var jsn=JSON.parse(response).features[0];
                $("#gen_id").val(jsn.properties.id);
                $("#gen_name").val(jsn.properties.name);
                $("#gen_descr").val(jsn.properties.descr);
                $("#gen_p1").val(jsn.properties.p1);
                $("#hdrGenForm").html(tbl);
                $("#btnGenFormUpdate").html("Update "+tbl);
                $("#btnGenFormInsert").hide();
                $("#btnGenFormUpdate").show();
                if (tbl=="generic_point"){
                    $("#lat").val(jsn.geometry.coordinates[1].toFixed(6));
                    $("#long").val(jsn.geometry.coordinates[0].toFixed(6));
                    $("#gen_form_pt").show();
                    $("#gen_form_ln").hide();
                } else{   
                    $("#gen_geojson").val(JSON.stringify(jsn.geometry));
                    $("#gen_form_pt").hide();
                    $("#gen_form_ln").show();
                }
                openSubScreen("divGenForm");
            }
        }, 
        error: function(xhr, status, error){
           $("#features").append("ERROR: "+error);
        } 
    });
}

function insertGenForm(tbl){
    var jsn=returnFormData("inpGenForm");
    if (jsn.name==""){
        alert("Please enter a name for this geometry");
    } else {
        jsn.tbl=tbl;
        delete jsn.id;
        if (tbl="generic_point"){
            var geojson={};
            geojson.type="Point";
            geojson.coordinates=[Number(jsn.lng), Number(jsn.lat)];
            jsn.geojson=JSON.stringify(geojson);
        }
        delete jsn.lng;
        delete jsn.lat;
        insertRecord(jsn, function(response){
            openSubScreen();
            switch(tbl){
                case "generic_point":
                    refreshGPt();
                    break;
            }
        });
    }
}

function updateGenForm(tbl){
    var jsn=returnFormData("inpGenForm");
    if (jsn.name==""){
        alert("Please enter a name for this geometry");
    } else {
        jsn.tbl=tbl;
        if (tbl="generic_point"){
            var geojson={};
            geojson.type="Point";
            geojson.coordinates=[Number(jsn.lng), Number(jsn.lat)];
            jsn.geojson=JSON.stringify(geojson);
        }
        delete jsn.lng;
        delete jsn.lat;
        updateRecord(jsn, function(response){
            openSubScreen();
            switch(tbl){
                case "generic_point":
                    refreshGPt();
                    break;
            }
        });
    }
}