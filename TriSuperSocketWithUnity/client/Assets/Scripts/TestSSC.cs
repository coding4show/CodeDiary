using UnityEngine;
using System.Collections;
using System.Net;
using System.IO;
using SuperSocket.ClientEngine;
using SuperSocket.ProtoBase;


public class TestSSC : MonoBehaviour 
{
    AsyncTcpSession session;
	void Start () 
    {
        Debug.Log("Start " + System.Threading.Thread.CurrentThread.ManagedThreadId);

        EasyClient<ResponseVO> client = new EasyClient<ResponseVO>();
        client.Initialize(new ResponseReceiveFilter());

        System.Net.IPAddress ipaddr = IPAddress.Parse("127.0.0.1");
        System.Net.IPEndPoint ipep = new IPEndPoint(ipaddr, 1254);

        client.BeginConnect(ipep);
        client.Connected += Client_Connected;
        client.NewPackageReceived += Client_NewPackageReceived;
        client.Error += Client_Error;
	}

    void Client_Error (object sender, SuperSocket.ClientEngine.ErrorEventArgs e)
    {
        Debug.Log("Client_Error : " + e.Exception.ToString());
    }

    void Client_NewPackageReceived (object sender, PackageEventArgs<ResponseVO> e)
    {
        string msg = System.Text.Encoding.UTF8.GetString(e.Package.data);
        Debug.Log("Client_NewPackageReceived " + msg);
    }

    void Client_Connected (object sender, System.EventArgs e)
    {
        Debug.Log("Client_Connected " + System.Threading.Thread.CurrentThread.ManagedThreadId);
    }
}
