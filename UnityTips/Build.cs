using UnityEngine;
using UnityEditor;
using UnityEditor.Callbacks;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Diagnostics;

/**
* 打包脚本的命令行接口
*/

public class Build {
	
	#region CommandLine Interface
	public static void BuildIOSDebug(){
		BuildIOS(true);
	}
	public static void BuildIOSRelease(){
		BuildIOS(false);
	}
	public static void BuildAndroidDebug(){
		BuildAndroid(true);
	}
	public static void BuildAndroidRelease(){
		BuildAndroid(false);
	}
	public static void BuildIOSDebug_ReplaceMode(){
		BuildIOS(true, false);
	}
	#endregion
	
	[MenuItem("Tools/Build/BuildIOSDebug")]
	static void BuildIOSProject(){
		BuildIOS(true);
	}
	
	static string[] GetLevels(){
		List<string> levels = new List<string>();
		foreach(SceneId scene in Enum.GetValues(typeof(SceneId))){
			levels.Add("Assets/Scenes/" + scene.ToString() + ".unity");
		}
		return levels.ToArray();
	}
	
	static void BuildIOS(bool debug, bool append = true){
		BuildTarget buildTarget = BuildTarget.iOS;
		
		// change platform
		if (EditorUserBuildSettings.activeBuildTarget != buildTarget){
			EditorUserBuildSettings.SwitchActiveBuildTarget(buildTarget);
		}
		
		// options
		BuildOptions options = BuildOptions.SymlinkLibraries;
		if (debug){
			options |= BuildOptions.Development;
		}
		
		if (append){
			options |= BuildOptions.AcceptExternalModificationsToPlayer;
		}
		
		DirectoryInfo di = new DirectoryInfo(Application.dataPath);
		string projPath = Path.Combine(di.Parent.Parent.FullName, "proj_ios");
		
		BuildPipeline.BuildPlayer(GetLevels(), projPath, buildTarget, options);
	}
	
	static void BuildAndroid(bool debug, MobileTextureSubtarget subtarget = MobileTextureSubtarget.ETC){
		BuildTarget buildTarget = BuildTarget.Android;
		
		// change platform
		if (EditorUserBuildSettings.activeBuildTarget != buildTarget){
			EditorUserBuildSettings.SwitchActiveBuildTarget(buildTarget);
		}
		
		// options
		BuildOptions options = BuildOptions.SymlinkLibraries;
		if (debug){
			options |= BuildOptions.Development;
		}
		
		// subtarget
		EditorUserBuildSettings.androidBuildSubtarget = MobileTextureSubtarget.ETC;
		
		DirectoryInfo di = new DirectoryInfo(Application.dataPath);
		string apkPath = Path.Combine(di.Parent.Parent.FullName, "throne_" + (debug ? "debug" : "release") + ".apk");
		
		BuildPipeline.BuildPlayer(GetLevels(), apkPath, buildTarget, options);
	}
}
