using System;
using System.Threading;
using System.Threading.Tasks.Dataflow;
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
        private BufferBlock<int> _mailbox;

        public Gate()
        {
            
        }

        bool Update()
        {
            
            return true;
        }
    }
}

