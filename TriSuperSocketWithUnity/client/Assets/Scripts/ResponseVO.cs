using System;
using SuperSocket.ClientEngine.Protocol;
using SuperSocket.ClientEngine.Proxy;
using SuperSocket.ProtoBase;

public class ResponseVO : IPackageInfo{
    public static int HeadLength = 4;
    public short length;
    public short type;
    public byte[] data;
}

public class ResponseReceiveFilter : FixedHeaderReceiveFilter<ResponseVO>
{
    public ResponseReceiveFilter(): base(ResponseVO.HeadLength)
    {}

    protected override int GetBodyLengthFromHeader(IBufferStream bufferStream, int length)
    {
        ushort bodyLength = bufferStream.ReadUInt16();
        return (int)bodyLength;
    }

    public override ResponseVO ResolvePackage(IBufferStream bufferStream)
    {
        ResponseVO response = new ResponseVO();
        int dataLength = (int)(bufferStream.Length - ResponseVO.HeadLength);
        response.data = new byte[dataLength];
        bufferStream.Skip(ResponseVO.HeadLength).Read(response.data, 0, dataLength);

        return response;
    }
}
