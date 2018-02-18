
var usuario;
var tiempo;
obtenerColaboradores();
obtenerTipoAtencion();
window.onbeforeunload = function () {
    var rpt = confirm('Esta seguro de querer salir?');
    if (rpt) {
        sessionStorage.clear();
    }

};
function obtenerColaboradores() {
    $.ajax({
        url: servicio + 'colaborador/listarColaboradores',
        type: 'get',
        success: function (r) {
            r = r.colaborador;
            $('#dni').empty();
            $('#dni').append('<option value="">Seleccione</option>');
            for (i = 0; i < r.length; i++) {
                $('#dni').append("<option value='" + r[i]['_id'] + "'>" + r[i]['nombres'] + ' ' + r[i]['apellidos'] + "<option>");
            }
            $('#dni').dropdown();
        },
        error: function (res) {
            console.log(res.responseJSON.mensaje);
        }
    });
}
function obtenerTipoAtencion() {
    $('#tipoAtencion').empty();
    $('#tipoAtencion').append('<option value="">Seleccione</option>');
    for (i = 0; i < tipoAtencion.length; i++) {
        $('#tipoAtencion').append("<option value='" + tipoAtencion[i] + "'>" + tipoAtencion[i] + "<option>");
    }
    $('#tipoAtencion').dropdown();

}

function mostrarModalRegistro() {
    $("#modal1").modal('show');
}
function mostrarModalPendientes() {
    $("#modal2").modal('show');
    consultarAtenciones();
}
function atender() {
    //valores = $("#formulario").form('get values');
    valores = {};
    valores.tipoAtencion = $("#tipoAtencion option:selected").val();
    valores.descripcion = $("#detalle").val();
    valores.colaborador = $("#dni option:selected").val();

    // valores.t_inicio = tiempo;
    console.log(valores);
    $.ajax({
        url: servicio + 'atencion/registrarAtencion',
        data: valores,
        type: 'post',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", sessionStorage.getItem('sesion'));
        },
        success: function (r) {
            if (r) {
                limpiarFormulario();
                alert('Se registro satisfactoriamente!');
            }
            else {
                alert('no eres xevere');
            }
        }
    });
}

function consultarAtenciones() {
    $.ajax({
        url: servicio + 'atencion/listarAtenciones',
        // data: valores,
        type: 'get',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", sessionStorage.getItem('sesion'));
        },
        success: function (r) {
            $("#tbListaAtencion").empty();
            for (i = 0; i < r.atencion.length; i++) {
                $("#tbListaAtencion").append('<tr><td>' + r.atencion[i].colaborador.nombres + ' ' + r.atencion[i].colaborador.apellidos + '</td><td>' + r.atencion[i].colaborador.area + '</td><td>' + r.atencion[0].fecha_inicio + '</td><td><button class="ui inverted red basic button" onclick="finalizarAtencion(\'' + r.atencion[i]._id + '\')" >Cerrar</button></td></tr>');
            }
        }
    });
}

function finalizarAtencion(id) {
    $.ajax({
        url: servicio + 'atencion/cerrarAtencion/' + id,
        type: 'put',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", sessionStorage.getItem('sesion'));
        },
        success: function (r) {
            debugger;
            $("#tbListaAtencion").empty();
            consultarAtenciones();
        }
    });
}
function cancelarRegistro() {
    limpiarFormulario();
}
function limpiarFormulario() {
    $("#formulario").form('clear');
    $("#formulario").form('reset');
    $("#tbListaAtencion").empty();
}