using System;
using System.Net;

namespace SocketServer
{
    class MainClass
    {
        public static void Main(string[] args)
        {
            Server s = new Server(10, 1024);
            s.Init();
            IPEndPoint iep = new IPEndPoint(IPAddress.Parse("127.0.0.1"), 1254);
            s.Start(iep);
        }
    }

}
