using System;
using SuperSocket.SocketBase;

namespace server
{
    class MainClass
    {
        const int port = 1254;

        public static void Main(string[] args)
        {
            AppServer appServer = new AppServer();

            appServer.NewRequestReceived += AppServer_NewRequestReceived;
            appServer.NewSessionConnected += AppServer_NewSessionConnected;
            appServer.SessionClosed += AppServer_SessionClosed;

            //Setup
            if (!appServer.Setup(port))
            {
                Console.WriteLine("Failded to Setup!");
                Console.ReadKey();
                return;
            }

            //Start
            if (!appServer.Start())
            {
                Console.WriteLine("Failed to Start!");
                Console.ReadKey();
                return;
            }

            Console.WriteLine("The server started successfully, press key 'q' to stop it!");
            while (Console.ReadKey().KeyChar != 'q')
            {
                Console.WriteLine();
                continue;
            }

            //Stop
            appServer.Stop();
        }

        static void AppServer_SessionClosed (AppSession session, CloseReason value)
        {
            Console.WriteLine("AppServer_SessionClosed " + session.SessionID + " " + value);
        }

        static void AppServer_NewSessionConnected (AppSession session)
        {
            Console.WriteLine("AppServer_NewSessionConnected " + session.SessionID);
        }

        static void AppServer_NewRequestReceived (AppSession session, SuperSocket.SocketBase.Protocol.StringRequestInfo requestInfo)
        {
            Console.WriteLine("AppServer_NewRequestReceived " + session.SessionID + " " + requestInfo);
        }
    }
}
