using UnityEngine;
using System.Collections;

[ExecuteInEditMode]
public class LookAt : MonoBehaviour {
	
	public Transform target = null;
	
	// Update is called once per frame
	void Update () {
		if (target != null){
			transform.LookAt(target);
		}
	}
}
