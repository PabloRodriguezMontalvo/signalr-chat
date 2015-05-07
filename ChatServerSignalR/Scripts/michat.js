var chatHub;
$(document).ready(function () {
    chatHub = $.connection.chatHub;
    registrarEventos();


});

function registrarLlamadas() {

    $("#btnRegistrar").click(function() {
        var nombre = $("#txtLogin").val();
        chatHub.server.conectar(nombre);
    });

    $("#btnEnviar").click(function() {
        var texto = $("#mensaje").val();
        chatHub.server.enviarMensaje(miNombre, texto);
        $("#mensaje").val("");
    });


}


function registrarEventos() {

    chatHub.client.onConnected = function(id, nombre, usuarios, mensajes) {


    };
    chatHub.client.onNewUserConnected=function(id, nombre) {
        


    };

    chatHub.client.usuarioDesconectado = function(id, nombre) {
        


    };

    chatHub.client.mensaje = function(usuario, mensaje) {
        


    };

    chatHub.client.enviarPrivado = function(id, nombre, mensaje) {


    };

}

