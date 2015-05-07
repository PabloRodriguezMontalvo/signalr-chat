var chatHub;
var miNombre;
$(document).ready(function () {
    chatHub = $.connection.chatHub;
   
   
    $("#login").dialog({
        modal: true
    });
    registrarEventos();

    $.connection.hub.start().done(function() {
        
        registrarLlamadas();
    });
});

function registrarLlamadas() {

    $("#btnRegistrar").click(function() {
        miNombre = $("#txtLogin").val();
        chatHub.server.conectar(miNombre);
        
    });

    $("#btnEnviar").click(function() {
        var texto = $("#mensaje").val();
        chatHub.server.enviarMensaje(miNombre, texto);
        $("#mensaje").val("");
    });


}


function registrarEventos() {

    chatHub.client.onConnected = function(id, nombre, usuarios, mensajes) {
        for (var i = 0; i < usuarios.length; i++) {
            if(usuarios[i].Nombre!=miNombre)
                $("#usuarios").append("<li id='usuario-" + usuarios[i].Id + "'>" +
                    usuarios[i].Nombre + "</li>");
        }
        for (var j = 0; j < mensajes.length; j++) {
            $("#mensajes").append("<div>" + mensajes[j].Usuario +
                " dice " + mensajes[j].Contenido + "</div>");
        }

        $("#login").dialog("close");

    };
    chatHub.client.onNewUserConnected=function(id, nombre) {
        $("#usuarios").append("<li id='usuario-" + id + "'>" +
                   nombre + "</li>");
        $("#mensajes").append("<div> Se ha conectado "+ nombre +"</div>");
    };

    chatHub.client.usuarioDesconectado = function(id, nombre) {
        $("#usuarios").remove($("#usuario-"+id));
        $("#mensajes").append("<div> Se ha marchado " + nombre + "</div>");
    };

    chatHub.client.mensaje = function(usuario, mensaje) {
        $("#mensajes").append("<div>" + usuario +
                " dice " + mensaje + "</div>");
        };

    chatHub.client.enviarPrivado = function(id, nombre, mensaje) {


    };

}

