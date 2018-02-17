
function iniciarsession() {
    valores = $("#loginForm").form('get values');
    valores.gethash =true;
    $.ajax({
        url: servicio+'usuario/login',
        type: 'post',
        data: valores,
        success: function (r) {
            sessionStorage.setItem('sesion',r.token);         
            location.replace(ruta+"/usuario.html");
            location.replace(ruta+"/usuario.html");
            
        },
        error:function(res){
           alert(res.responseJSON.mensaje);
        }
    });
}
