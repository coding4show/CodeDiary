using UnityEngine;
using System.Collections;

[ExecuteInEditMode]
public class ShadowMapDemo : MonoBehaviour {

	public Renderer targetRender;
	public Camera lightCamera;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if (lightCamera != null && targetRender != null){
			var mat = targetRender.sharedMaterial;
			if (Application.isPlaying){
				mat = targetRender.material;
			}
			
			if (mat){
				mat.SetMatrix("_ShadowMVP", lightCamera.projectionMatrix * lightCamera.worldToCameraMatrix);
			}
		}
	}
}
