using System;
using System.Threading;

namespace SharpServer
{
    /// <summary>
    /// Loop service.
    /// 启动一个线程, 执行Setup, 然后循环调用传入的LoopFunc, 当LoopFunc返回false时停止
    /// </summary>
    public class LoopService
    {
        protected Thread _worker;
        protected volatile bool _running;
        protected Action _setup;
        protected Func<bool> _loop;

        public void Start(Action setup, Func<bool> loop)
        {
            _setup = setup;
            _loop = loop;
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
            if (_setup != null)
            {
                _setup.Invoke();
                _setup = null;
            }

            while (_running)
            {
                bool loopResult = _loop.Invoke();
                if (!loopResult)
                {
                    _running = false;
                }
            }
        }
    }
}

