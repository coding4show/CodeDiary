using System;
using System.Net;
using System.Net.Sockets;
using System.Collections.Generic;

public class SocketAsyncEventArgsPool
{
    Stack<SocketAsyncEventArgs> m_pool;

    public SocketAsyncEventArgsPool(int capacity)
    {
        m_pool = new Stack<SocketAsyncEventArgs>(capacity);
    }

    public void Push(SocketAsyncEventArgs item)
    {
        if (item == null)
        {
            throw new ArgumentNullException("Can't Push null");
        }
        lock (m_pool)
        {
            m_pool.Push(item);
        }
    }

    public SocketAsyncEventArgs Pop()
    {
        lock (m_pool)
        {
            return m_pool.Pop();
        }
    }

    public int Count
    {
        get { return m_pool.Count; }
    }
}

