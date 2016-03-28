using System;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using System.Collections;
using System.Collections.Generic;

public class Server
{
    private int m_numConnections;
    private int m_receiveBuffSize;
    BufferManager m_bufferManager;
    const int opsToPreAlloc = 2;
    Socket listenSocket;
    SocketAsyncEventArgsPool m_readWritePool;
    int m_totalBytesRead;
    int m_numConnectedSockets;
    Semaphore m_maxNumberAcceptedClients;

    public Server(int numConnections, int receiveBufferSize)
    {
        m_totalBytesRead = 0;
        m_numConnectedSockets = 0;
        m_numConnections = numConnections;
        m_receiveBuffSize = receiveBufferSize;

        m_bufferManager = new BufferManager(receiveBufferSize * numConnections * opsToPreAlloc, receiveBufferSize);
        m_readWritePool = new SocketAsyncEventArgsPool(numConnections);
        m_maxNumberAcceptedClients = new Semaphore(numConnections, numConnections);
    }

    public void Init()
    {
        m_bufferManager.InitBuffer();
        SocketAsyncEventArgs readWriteEventArgs;

        for (int i = 0; i < m_numConnections; i++)
        {
            readWriteEventArgs = new SocketAsyncEventArgs();
            readWriteEventArgs.Completed += new EventHandler<SocketAsyncEventArgs>(IO_Completed);
            readWriteEventArgs.UserToken = new AsyncUserToken();

            m_bufferManager.SetBuffer(readWriteEventArgs);
            m_readWritePool.Push(readWriteEventArgs);
        }
    }

    public void Start(IPEndPoint localEndPoint)
    {
        listenSocket = new Socket(localEndPoint.AddressFamily, SocketType.Stream, ProtocolType.Tcp);
        listenSocket.Bind(localEndPoint);
        listenSocket.Listen(100);

        StartAccept(null);
        Console.WriteLine("Press any key to terminate the server process ...");
        Console.ReadKey();
    }

    void PrintThreadID(string msg)
    {
        Console.WriteLine(msg + " ThreadID : " + Thread.CurrentThread.ManagedThreadId);
    }

    public void StartAccept(SocketAsyncEventArgs accepEventArg)
    {
        PrintThreadID("StartAccept");
        if (accepEventArg == null)
        {
            accepEventArg = new SocketAsyncEventArgs();
            accepEventArg.Completed += new EventHandler<SocketAsyncEventArgs>(AcceptEventArg_Completed);
        }
        else
        {
            accepEventArg.AcceptSocket = null;
        }

        m_maxNumberAcceptedClients.WaitOne();
        bool willRaiseEvent = listenSocket.AcceptAsync(accepEventArg);
        if (!willRaiseEvent)
        {
            ProcessAccept(accepEventArg);
        }
    }

    void AcceptEventArg_Completed(object sender, SocketAsyncEventArgs e)
    {
        ProcessAccept(e);
    }

    private void ProcessAccept(SocketAsyncEventArgs e)
    {
        PrintThreadID("ProcessAccept");
        Interlocked.Increment(ref m_numConnectedSockets);
        Console.WriteLine("Client connection accepted. There are {0} clients connected to the server", m_numConnectedSockets);

        SocketAsyncEventArgs readEventArgs = m_readWritePool.Pop();
        ((AsyncUserToken)readEventArgs.UserToken).Socket = e.AcceptSocket;

        bool willRaiseEvent = e.AcceptSocket.ReceiveAsync(readEventArgs);
        if (!willRaiseEvent)
        {
            ProcessAccept(readEventArgs);
        }

        StartAccept(e);
    }

    void IO_Completed(object sender, SocketAsyncEventArgs e)
    {
        switch (e.LastOperation)
        {
            case SocketAsyncOperation.Receive:
                ProcessReceive(e);
                break;

            case SocketAsyncOperation.Send:
                ProcessSend(e);
                break;

            default:
                throw new ArgumentException("The last operation completed on the socket was not a receive or send");
        }
    }

    private void ProcessReceive(SocketAsyncEventArgs e)
    {
        PrintThreadID("ProcessReceive");
        AsyncUserToken token = (AsyncUserToken)e.UserToken;
        if (e.BytesTransferred > 0 && e.SocketError == SocketError.Success)
        {
            Interlocked.Add(ref m_totalBytesRead, e.BytesTransferred);
            Console.WriteLine("The server has read a total of {0} bytes", m_totalBytesRead);

            e.SetBuffer(e.Offset, e.BytesTransferred);

            bool willRaiseEvent = token.Socket.SendAsync(e);
            if (!willRaiseEvent)
            {
                ProcessSend(e);
            }
        }
        else
        {
            CloseClientSocket(e);
        }
    }

    private void ProcessSend(SocketAsyncEventArgs e)
    {
        PrintThreadID("ProcessSend");
        if (e.SocketError == SocketError.Success)
        {
            AsyncUserToken token = (AsyncUserToken)e.UserToken;
            // read the next block of data send from the client
            bool willRaiseEvent = token.Socket.ReceiveAsync(e);
            if (!willRaiseEvent)
            {
                ProcessReceive(e);
            }
        }
        else
        {
            CloseClientSocket(e);
        }
    }

    private void CloseClientSocket(SocketAsyncEventArgs e)
    {
        AsyncUserToken token = e.UserToken as AsyncUserToken;

        // close the socket associated with the client
        try
        {
            token.Socket.Shutdown(SocketShutdown.Send);
        }
        // throws if client process has already closed
        catch (Exception) { }
        token.Socket.Close();

        // decrement the counter keeping track of the total number of clients connected to the server
        Interlocked.Decrement(ref m_numConnectedSockets);
        m_maxNumberAcceptedClients.Release();
        Console.WriteLine("A client has been disconnected from the server. There are {0} clients connected to the server", m_numConnectedSockets);

        // Free the SocketAsyncEventArg so they can be reused by another client
        m_readWritePool.Push(e);
    }

    internal class AsyncUserToken
    {
        public System.Net.Sockets.Socket Socket { get; set; }
    }
}

