using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks.Dataflow;
using System.Net;
using System.Net.Sockets;

namespace SharpServer
{
    /// <summary>
    /// Gate.
    /// 两个职责
    /// 1.接受客户端的链接
    /// 2.维持和客户端的通信, 客户端和游戏逻辑的中转
    /// </summary>
    public class Gate
    {
        private BufferBlock<ToGateMsg> _mailbox;
        private LoopService _worker;
        private Dictionary<string, Connection> _connections;

        public Gate()
        {
            
        }

        public void Post(ToGateMsg msg)
        {
            _mailbox.Post(msg);
        }

        void Start()
        {
            _worker = new LoopService();
            _worker.Start(Setup, Update);
        }

        void Setup()
        {
            Socket server = new Socket(SocketType.Stream, ProtocolType.IPv4);
            IPEndPoint iep = new IPEndPoint(IPAddress.Any, 1255);
            server.Bind(iep);
            server.Listen(100);
            server.BeginAccept(OnAccept, server);
        }

        void OnAccept(IAsyncResult iar)
        {
            Socket serverSocket = iar.AsyncState as Socket;
            Socket clientSocket = serverSocket.EndAccept(iar);

            clientSocket.BeginReceive(null, SocketFlags.None, OnReceive, clientSocket);
            serverSocket.BeginAccept(OnAccept, serverSocket);
        }

        void OnReceive(IAsyncResult iar)
        {
            
        }

        void OnSend(IAsyncResult iar)
        {
            
        }

        bool Update()
        {
            return true;
        }
    }
}

