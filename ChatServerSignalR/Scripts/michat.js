var chatHub;
var miNombre;
var nPrivado;
$(document).ready(function () {
    chatHub = $.connection.chatHub;

   

   
    
    registrarEventos();

    $.connection.hub.start().done(function() {
        
        registrarLlamadas();
        bootbox.prompt("¿Como te llamas?", function (resultado) {
            if (resultado != null) {
                miNombre = resultado;
                chatHub.server.conectar(miNombre);
            }

        });
    });
});

function registrarLlamadas() {

   $("#btnEnviar").click(function() {
        var texto = $("#mensaje").val();
        chatHub.server.enviarMensaje(miNombre, texto);
        $("#mensaje").val("");
    });

    $("#btnEnviarPrivado").click(function() {
        var texto = $("#txtPrivado").val();
        chatHub.server.enviarMensajePrivado(nPrivado, texto);

    });

}

function privado(id) {
    nPrivado = $("#usuario-" + id).html();
    $("#dialogoPrivado").dialog();
   // $("#mensajesPrivado").html("");
}
function registrarEventos() {

    chatHub.client.onConnected = function(id, nombre, usuarios, mensajes) {
        for (var i = 0; i < usuarios.length; i++) {
            if(usuarios[i].Nombre!=miNombre)
                $("#usuarios").append("<li id='usuario-" + usuarios[i].Id +
                    "' onclick='privado(\""+usuarios[i].Id+"\")'>" +
                    usuarios[i].Nombre + "</li>");
        }
        for (var j = 0; j < mensajes.length; j++) {
            $("#mensajes").append("<div>" + mensajes[j].Usuario +
                " dice " + mensajes[j].Contenido + "</div>");
        }

     
    };
    chatHub.client.onNewUserConnected=function(id, nombre) {
        $("#usuarios").append("<li id='usuario-" + id + "' onclick='privado(\"" + id + "\")'>" +
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
        var texto;
        if (nombre == miNombre) {
            texto = "Tu dices " + mensaje;

        } else {
            texto = nombre + " dice " + mensaje;
        }
        $("#mensajesPrivado").append("<div>" + texto + "</div>");
        $("#dialogoPrivado").dialog();

    };

}

