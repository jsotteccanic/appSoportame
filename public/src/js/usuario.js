
var usuario;
var tiempo;
obtenerColaboradores();
obtenerTipoAtencion();
window.onbeforeunload = function () {
    var rpt = confirm('Esta seguro de querer salir?');
    if(rpt){
        sessionStorage.clear();
    }
    
};
function obtenerColaboradores() {
    $.ajax({
        url: ruta + 'colaborador/listarColaboradores',
        type: 'get',
        success: function (r) {
            r = r.colaborador;
            $('#dni').empty();
            $('#dni').append('<option value="">Seleccione</option>');
            for (i = 0; i < r.length; i++) {
                $('#dni').append("<option value='" + r[i]['dni'] + "'>" + r[i]['nombres'] + ' ' + r[i]['apellidos'] + "<option>");
            }
            $('#dni').dropdown();
        },
        error: function (res) {
            console.log(res.responseJSON.mensaje);
        }
    });
}
function obtenerTipoAtencion() {
debugger;
    $('#tipoAtencion').empty();
    $('#tipoAtencion').append('<option value="">Seleccione</option>');
    for (i = 0; i < tipoAtencion.length; i++) {
        $('#tipoAtencion').append("<option value='" + tipoAtencion[i] + "'>" + tipoAtencion[i] + "<option>");
    }
    $('#tipoAtencion').dropdown();

}

function mostrarModal() {
    $("#modal").modal('show');
    $.ajax({
        url: 'php/enrutador.php?type=7',
        type: 'post',
        success: function (r) {
            datos = JSON.parse(r);
            tiempo = datos[0]['fecha'];
            $("#modal").modal('show');
        }
    });



}
function atender() {
    //valores = $("#formulario").form('get values');
    valores = {};
    valores.dni = $("#dni option:selected").val();
    valores.tipoAtencion = $("#tipoAtencion option:selected").val();
    valores.detalle = $("#detalle").val();
    valores.t_inicio = tiempo;
    console.log(valores);
    $.ajax({
        url: 'php/enrutador.php?type=4',
        data: valores,
        type: 'post',
        success: function (r) {
            rpt = JSON.parse(r);
            if (rpt[0]['ok'] == '1') {

                $("#formulario").form('clear');
                $("#formulario").form('reset');
                // $('#tipoAtencion').dropdown();
                //  $('#dni').dropdown();
                alert('Se registro satisfactoriamente!');
            }
            else {
                alert('no eres xevere');
            }
        }
    });


}