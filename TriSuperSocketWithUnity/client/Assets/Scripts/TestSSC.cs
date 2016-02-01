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
        System.Net.IPAddress ipaddr = IPAddress.Parse("127.0.0.1");
        System.Net.IPEndPoint ipep = new IPEndPoint(ipaddr, 1254);
        session = new AsyncTcpSession(ipep);
        session.Connect();

        session.Connected += Session_Connected;

//        var client = new EasyClient<MyPackage>();
//        var filter = new MyFilter();
//        client.Initialize(filter);
	}

    void Session_Connected (object sender, System.EventArgs e)
    {
        byte[] bytes = System.Text.ASCIIEncoding.ASCII.GetBytes("1 Hello, World!\r\n");
        session.Send(bytes, 0, bytes.Length);
    }

	void Update () {
	
	}
}
