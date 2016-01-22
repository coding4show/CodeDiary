using UnityEngine;
using System.Collections;

public class WaveMeshBuilder : MonoBehaviour {

	public int xCnt = 10;
	public int yCnt = 10;
	public float xLen = 1f;
	public float yLen = 1f;
	public Vector4 Wave;
	
	void Start () {
		MeshFilter mf = gameObject.GetComponent<MeshFilter>();
		if (mf == null){
			mf = gameObject.AddComponent<MeshFilter>();
		}
		
		for (int x=0; x<xCnt; ++x){
			for (int y=0; y<yCnt; ++y){
				
			}
		}
	}
	
	float waveHeight(Vector2 pos, Vector2 dir, float phase, float magnitude){
		return Mathf.Sin(pos.x * dir.x + pos.y * dir.y + phase) * magnitude;
	}
	
	Vector3 waveNormal(Vector2 pos, Vector2 dir, float phase, float magnitude){
		float dx = magnitude * Mathf.Cos(pos.x * dir.x + pos.y * dir.y + phase) * dir.x;
		Vector3 nx = new Vector3(1, 0, dx);
		float dy = magnitude * Mathf.Cos(pos.x * dir.x + pos.y * dir.y + phase) * dir.y;
		Vector3 ny = new Vector3(0, 1, dy);
		
		Vector3 n = Vector3.Cross(nx, ny);
		return new Vector3(n.x, n.z, n.y);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
