using UnityEngine;
using System.Collections;

public class WaveSim : MonoBehaviour {

	Renderer target;
	public float speed0;
	public float speed1;
	
	void Start(){
		target = GetComponent<Renderer>();
	}
	
	void Update(){
		if (target != null){
			
			Vector4 wave0 = target.material.GetVector("_Wave0");
			wave0.w += speed0;
			target.material.SetVector("_Wave0", wave0);
			
			Vector4 wave1 = target.material.GetVector("_Wave1");
			wave1.w += speed1;
			target.material.SetVector("_Wave1", wave1);
		}
	}
}
