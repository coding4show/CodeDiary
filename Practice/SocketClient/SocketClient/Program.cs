using System;
using System.Net;
using System.Net.Sockets;
using System.Collections;
using System.Collections.Generic;
using System.Threading;

namespace SocketClient
{
    class MainClass
    {
        class SocketState
        {
            public const int BUFFER_SIZE = 1024;
            public byte[] buffer = new byte[BUFFER_SIZE];
            public Socket socket;
        }

        static AutoResetEvent autoEvent = new AutoResetEvent(false);

        public static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            Socket socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);

            IPEndPoint ipe = new IPEndPoint(IPAddress.Parse("127.0.0.1"), 1254);
            socket.Bind(ipe);
            socket.Listen(10);

            while (true)
            {
                Console.WriteLine("BeginAccept ManagedThreadId:" + Thread.CurrentThread.ManagedThreadId);

                socket.BeginAccept(new AsyncCallback(OnAccept), socket);
                autoEvent.WaitOne();
            }
            Console.ReadKey();
        }

        static void OnAccept(IAsyncResult iar)
        {
            Console.WriteLine("OnAccept ManagedThreadId:" + Thread.CurrentThread.ManagedThreadId);

            Socket serverSocket = (Socket)iar.AsyncState;
            Socket clientSocket = serverSocket.EndAccept(iar);

            SocketState ss = new SocketState();
            ss.socket = clientSocket;
            clientSocket.BeginReceive(ss.buffer, 0, SocketState.BUFFER_SIZE, SocketFlags.None, OnReceive, ss);

            autoEvent.Reset();
        }

        static void OnReceive(IAsyncResult iar)
        {
            Console.WriteLine("OnReceive ManagedThreadId:" + Thread.CurrentThread.ManagedThreadId);

            SocketState ss = (SocketState)iar.AsyncState;
            int len = ss.socket.EndReceive(iar);
            string str = System.Text.Encoding.UTF8.GetString(ss.buffer, 0, len);
            Console.WriteLine("Recv: " + str);

            ss.socket.BeginReceive(ss.buffer, 0, SocketState.BUFFER_SIZE, SocketFlags.None, OnReceive, ss);
        }
    }
}
