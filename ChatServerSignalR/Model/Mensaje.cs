using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChatServerSignalR.Model
{
    public class Mensaje
    {
        public String Usuario { get; set; }
        public String Contenido { get; set; }
    }
}