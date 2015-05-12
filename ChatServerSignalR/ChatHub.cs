using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using ChatServerSignalR.Model;
using Microsoft.AspNet.SignalR;

namespace ChatServerSignalR
{
    public class ChatHub : Hub
    {
        protected static List<Usuario> Usuarios=new List<Usuario>();
        protected static List<Mensaje> Mensajes=new List<Mensaje>();

        public void Conectar(String nombre)
        {
            var id = Context.ConnectionId;

            if (Usuarios.All(o => o.Id != id))
            {
               Usuarios.Add(new Usuario(){Id = id,Nombre = nombre});
                
                Clients.Caller.onConnected(id,nombre,Usuarios,Mensajes);
                Clients.AllExcept(id).onNewUserConnected(id, nombre);
            }

        }

        public void EnviarMensaje(String usuario, String mensaje)
        {
            Mensajes.Add(new Mensaje(){Contenido = mensaje,Usuario = usuario});

            if(Mensajes.Count>30)
                Mensajes.RemoveAt(0);

            Clients.All.mensaje(usuario, mensaje);

        }

        public void EnviarMensajePrivado(string destino, String mensaje)
        {
            string origen = Context.ConnectionId;

            var usuarioOrigen = Usuarios.FirstOrDefault(o => o.Id == origen);
            var usuarioDestino = Usuarios.FirstOrDefault(o => o.Nombre == destino);

            if (usuarioOrigen != null && usuarioDestino != null)
            {
                Clients.Client(usuarioDestino.Id).enviarPrivado(usuarioOrigen.Id,
                    usuarioOrigen.Nombre, mensaje);

                Clients.Caller.enviarPrivado(destino,
                    usuarioDestino.Nombre, mensaje);

            }

        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var item = Usuarios.FirstOrDefault(o => o.Id == Context.ConnectionId);
            
            if (item != null)
            {
                Usuarios.Remove(item);
                Clients.All.usuarioDesconectado(item.Id, item.Nombre);
            }

            return base.OnDisconnected(stopCalled);
        }
    }
}






