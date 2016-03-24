using System;
using System.Threading;

namespace SharpServer
{
    /// <summary>
    /// Loop service.
    /// 启动一个线程, 循环调用传入的LoopFunc, 当LoopFunc返回false时停止
    /// </summary>
    public class LoopService
    {
        protected Thread _worker;
        protected volatile bool _running;
        protected Func<bool> _loopFunc;

        public void Start(Func<bool> loopFunc)
        {
            _loopFunc = loopFunc;
            _running = true;
            _worker = new Thread(Run);
            _worker.Start();
        }

        public void Stop()
        {
            _running = false;
        }

        void Run()
        {
            while (_running)
            {
                bool loopResult = _loopFunc.Invoke();
                if (!loopResult)
                {
                    _running = false;
                }
            }
        }
    }
}

