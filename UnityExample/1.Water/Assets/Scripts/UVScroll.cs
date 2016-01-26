using UnityEngine;
using System.Collections;

public class UVScroll : MonoBehaviour {
	Renderer target;
	public Vector2 direct;
	public float speed;
	
	void Start(){
		target = GetComponent<Renderer>();
	}
	
	void Update(){
		if (target != null){
			//direct.Normalize();
			float len = Time.deltaTime * speed;
			Vector2 uvOffset = direct * len;
			
			//target.material.mainTextureOffset = target.material.mainTextureOffset + uvOffset;
			Vector4 wave0 = target.material.GetVector("_Wave0");
			wave0.w += direct.x;
			target.material.SetVector("_Wave0", wave0);
			
			Vector4 wave1 = target.material.GetVector("_Wave1");
			wave1.w += direct.y;
			target.material.SetVector("_Wave1", wave1);
		}
	}
}
