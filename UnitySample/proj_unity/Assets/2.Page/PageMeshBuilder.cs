using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class PageMeshBuilder : MonoBehaviour {

	int xSegment = 10;
	int ySegment = 10;
	float xLength = 1f;
	float yLength = 1.5f;
	
	float fanCenter = -0.1f;
	float fanAngleDeg = 120f;
	
	
	void Start () {
		ReBuildPageMesh ();
	}
	
	void ReBuildPageMesh () {
	
		MeshFilter mf = gameObject.GetComponent<MeshFilter>();
		if (mf == null){
			mf = gameObject.AddComponent<MeshFilter>();
		}
		
		int vertexCnt = (xSegment+1) * (ySegment+1);
		Vector3[] vertice = new Vector3[vertexCnt];
		Vector2[] uvs = new Vector2[vertexCnt];
		
		float xDis = xLength / xSegment;
		float yDis = yLength / ySegment;
		float uDis = 1f / xSegment;
		float vDis = 1f / ySegment;
		
		for (int x=0; x<xSegment+1; ++x){
			for (int y=0; y<ySegment+1; ++y){
				Vector3 src = new Vector3(xDis * x, yDis * y, 0);
				Vector2 uv = new Vector2(uDis * x, vDis * y);
				int index = (xSegment+1) * y + x;
				
				Vector3 dst = PageTransfer(src, fanCenter, fanAngleDeg);
				vertice[index] = dst;
				uvs[index] = uv;
			}
		}
		
		int[] indice = new int[xSegment * ySegment * 6];
		for (int x=0; x<xSegment; ++x){
			for (int y=0; y<ySegment; ++y){
				int lb = y * (xSegment + 1) + x;
				int rb = lb + 1;
				int lt = lb + xSegment + 1;
				int rt = lt + 1;
				
				int begin = (y * xSegment + x) * 6;
				indice[begin] = lb;
				indice[begin + 1] = rt;
				indice[begin + 2] = rb;
				
				indice[begin + 3] = lb;
				indice[begin + 4] = lt;
				indice[begin + 5] = rt;
			}
		}
		
		Mesh m = new Mesh();
		m.vertices = vertice;
		m.uv = uvs;
		m.triangles = indice;
		mf.mesh = m;
	}
	
	//以书脊为旋转起点，旋转轴在yz平面时的特殊情况
	Vector3 PageTransfer(Vector3 source, float fanCenter, float fanAngleDeg){
		//圆锥的中轴向量
		float coneL = 1f;
		float coneR = fanAngleDeg / 360f;
		float halfConeTopAngle = Mathf.Asin(coneR / coneL) * Mathf.Rad2Deg;
		
		Vector3 coneCenterAxis = Quaternion.AngleAxis(halfConeTopAngle, Vector3.left) * Vector3.up;
		coneCenterAxis.Normalize();

		//圆锥顶点
		Vector3 coneTop = new Vector3(0, fanCenter, 0);
		Vector3 offset = source - coneTop;

		//相对于中轴的旋转角
		float offsetAngle = Mathf.Atan(offset.x / offset.y ) * Mathf.Rad2Deg;
		offsetAngle = offsetAngle * 360f / fanAngleDeg;
		Quaternion rotate = Quaternion.AngleAxis(offsetAngle, coneCenterAxis);
		
		//offset在中轴的投影
		Vector3 project = Vector3.Dot(offset, coneCenterAxis) * coneCenterAxis;
		
		//source在启动边上的旋转投影点
		Vector3 start = coneTop + new Vector3(0, offset.magnitude, 0);

		//旋转时，将绕点移回坐标原点
		return rotate * (start - project - coneTop) + project + coneTop;
	}

	//书脊可能已经有一定的旋转角度了，特别是当书页翻过一半的时候，书脊处的书页切线不在xy平面上了
	//此时，不要去算新的圆锥轴是多少，简化为上面整体模型的绕y轴旋转，逻辑上是等价的

	string strFanCenter = "";
	string strFanAngleDeg = "";
	
	void OnGUI(){
		strFanCenter = GUILayout.TextField(strFanCenter);
		float tFanCenter = 0;
		if (float.TryParse(strFanCenter, out tFanCenter)){
			fanCenter = tFanCenter;
		}
		
		strFanAngleDeg = GUILayout.TextField(strFanAngleDeg);
		float tFanAngleDeg = 0;
		if (float.TryParse(strFanAngleDeg, out tFanAngleDeg)){
			fanAngleDeg = tFanAngleDeg;
		}
		
		if (GUILayout.Button("ReBuildPageMesh")){
			ReBuildPageMesh();
		}
	}
}
