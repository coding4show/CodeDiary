using UnityEngine;
using UnityEditor;
using System.Collections;
/// <summary>
/// 检查Unity工程中, 没能载入成功的图片
/// </summary>
public class TextureImportTools : EditorWindow {
	[MenuItem("Tools/Asset/TextureImportTool")]
	public static void ShowView(){
		EditorWindow.GetWindow<TextureImportTools>();
	}
	
	Texture2D texture = null;
	void OnGUI(){
		if (GUILayout.Button("Check")){
			string[] imageSuffixs = new string[]{"png", "jpg", "tga", "psd"};
			
			string[] guids = AssetDatabase.FindAssets("t:DefaultAsset");		
			foreach (var guid in guids){
				string assetPath = AssetDatabase.GUIDToAssetPath(guid);
				foreach (var suffix in imageSuffixs){
					if (assetPath.EndsWith(suffix)){
						Debug.LogError("Error : " + assetPath);
						AssetDatabase.ImportAsset(assetPath, ImportAssetOptions.ForceUpdate);
						break;
					}
				}
			}
			
			Debug.Log("Check Over");
		}
	}
}
