using System;
using System.IO;
using System.Net;
using SuperSocket.SocketBase;
using SuperSocket.ProtoBase;

namespace server
{

    public class ResponseVO{
        public static int HeadLength = 4;
        public short length;
        public short type;
        public byte[] data;

        public byte[] ToBytes()
        {
            MemoryStream ms = new MemoryStream();
            BinaryWriter bw = new BinaryWriter(ms);
            bw.Write(IPAddress.HostToNetworkOrder(length));
            bw.Write(IPAddress.HostToNetworkOrder(type));
            bw.Write(data);
            bw.Close();
            return ms.ToArray();
        }
    }

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

            Console.WriteLine("The server started successfully, input 'quit' to stop it!");


            while (true)
            {
                string command = Console.ReadLine();
                if (command == "quit")
                {
                    break;
                }
                else
                {
                    foreach (var session in appServer.GetAllSessions())
                    {
                        ResponseVO r = new ResponseVO();
                        r.type = 123;
                        r.data = System.Text.Encoding.UTF8.GetBytes(command);
                        r.length = (short)r.data.Length;

                        byte[] bytes = r.ToBytes();
                        session.Send(bytes, 0, bytes.Length);
                    }
                }
                continue;
            }

            //Stop
            appServer.Stop();
        }

        static void AppServer_SessionClosed (AppSession session, SuperSocket.SocketBase.CloseReason value)
        {
            Console.WriteLine("AppServer_SessionClosed " + session.SessionID + " " + value);
        }

        static void AppServer_NewSessionConnected (AppSession session)
        {
            Console.WriteLine("AppServer_NewSessionConnected " + session.SessionID);
        }

        static void AppServer_NewRequestReceived (AppSession session, SuperSocket.SocketBase.Protocol.StringRequestInfo requestInfo)
        {
            Console.WriteLine("AppServer_NewRequestReceived " + session.SessionID + " " + requestInfo.Key + ":" + string.Concat(requestInfo.Parameters));
        }
    }
}
