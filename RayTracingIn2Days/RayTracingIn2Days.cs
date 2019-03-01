// https://zhuanlan.zhihu.com/p/36238483

using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;

namespace RT {
	public class RayTracingIn2Days : EditorWindow {
		[MenuItem ("Tools/RayTracingIn2Days")]
		public static void ShowWindow () {
			EditorWindow.GetWindow<RayTracingIn2Days> ();
		}

		void OnGUI () {
			if (GUILayout.Button ("TestCreatePNG")) {
				CreatePng (1024, 512, CreateColorForTestPNG (1024, 512), "testpng.png");
			}

			if (GUILayout.Button ("TestRay")) {
				CreatePng (1024, 512, CreateColorForTestRay (1024, 512), "testray.png");
			}

			if (GUILayout.Button ("TestSphere")) {
				CreatePng (1024, 512, CreateColorForTestSphere (1024, 512), "testsphere.png");
			}
		}

		void CreatePng (int width, int height, Color[] colors, string fileName) {
			if (width * height != colors.Length) {
				EditorUtility.DisplayDialog ("Error", "长宽与数组长度无法对应!", "OK");
				return;
			}
			Texture2D tex = new Texture2D (width, height, TextureFormat.ARGB32, false);
			tex.SetPixels (colors);
			tex.Apply ();
			byte[] bytes = tex.EncodeToPNG ();
			File.WriteAllBytes (Path.Combine (Application.dataPath, fileName), bytes);
		}

		#region TesPNG
		Color[] CreateColorForTestPNG (int width, int height) {
			int l = width * height;
			Color[] colors = new Color[l];
			for (int j = height - 1; j >= 0; j--) {
				for (int i = 0; i < width; i++) {
					colors[i + j * width] = new Color (
						i / (float) width,
						j / (float) height,
						0.2f
					);
				}
			}
			return colors;
		}

		#endregion		

		#region TestRay
		public class Ray {
			public Vector3 original;
			public Vector3 direction;
			public Vector3 normalDirection;

			public Ray (Vector3 o, Vector3 d) {
				original = o;
				direction = d;
				normalDirection = d.normalized;
			}

			public Vector3 GetPoint (float t) {
				return original + t * direction;
			}

		}

		Color GetColorForTestRay (Ray ray) {
			float t = 0.5f * (ray.normalDirection.y + 1f);
			return (1 - t) * new Color (1, 1, 1) + t * new Color (0.5f, 0.7f, 1);
		}

		Color[] CreateColorForTestRay (int width, int height) {
			Vector3 lowLeftCorner = new Vector3 (-2, -1, -1);
			Vector3 horizontal = new Vector3 (4, 0, 0);
			Vector3 vertical = new Vector3 (0, 2, 0);
			Vector3 original = new Vector3 (0, 0, 0);
			int l = width * height;
			Color[] colors = new Color[l];
			for (int j = height - 1; j >= 0; j--) {
				for (int i = 0; i < width; i++) {
					Ray r = new Ray (original, lowLeftCorner + horizontal * i / (float) width + vertical * j / (float) height);
					colors[i + j * width] = GetColorForTestRay (r);
				}
			}
			return colors;
		}
		#endregion

		#region 法线
		bool isHitSphereForTestSphere (Vector3 center, float radius, Ray ray) {
			var oc = ray.original - center;
			float a = Vector3.Dot (ray.direction, ray.direction);
			float b = 2f * Vector3.Dot (oc, ray.direction);
			float c = Vector3.Dot (oc, oc) - radius * radius;
			float discriminant = b * b - 4 * a * c;
			return (discriminant > 0);
		}

		Color GetColorForTestSphere (Ray ray) {
			if (isHitSphereForTestSphere (new Vector3 (0, 0, -1), 0.5f, ray)) {
				return new Color (1, 0, 0);
			}

			return GetColorForTestRay (ray);
		}

		Color[] CreateColorForTestSphere (int width, int height) {
			Vector3 lowLeftCorner = new Vector3 (-2, -1, -1);
			Vector3 horizontal = new Vector3 (4, 0, 0);
			Vector3 vertical = new Vector3 (0, 2, 0);
			Vector3 original = new Vector3 (0, 0, 0);
			int l = width * height;
			Color[] colors = new Color[l];
			for (int j = height - 1; j >= 0; j--) {
				for (int i = 0; i < width; i++) {
					Ray r = new Ray (original, lowLeftCorner + horizontal * i / (float) width + vertical * j / (float) height);
					colors[i + j * width] = GetColorForTestSphere (r);
				}
			}
			return colors;
		}

		public class HitRecord {
			public float t;
			public Vector3 p;
			public Vector3 normal;
		}

		public abstract class Hitable {
			public abstract bool Hit (Ray ray, float t_min, float t_max, ref HitRecord rec);
		}

		public class Sphere : Hitable {
			public Vector3 center;
			public float radius;

			public Sphere (Vector3 cen, float rad) {
				center = cen;
				radius = rad;
			}

			public override bool Hit (Ray ray, float t_min, float t_max, ref HitRecord rec) {
				return false;
			}
		}

		float HitSphereForTestNormal (Vector3 center, float radius, Ray ray) {
			return 0;
		}
	}
	#endregion

}
