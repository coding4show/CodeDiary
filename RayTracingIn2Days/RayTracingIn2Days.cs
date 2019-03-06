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

			if (GUILayout.Button ("TestHit")) {
				CreatePng (1024, 512, CreateColorForTestHitRecord (1024, 512), "testhit.png");
			}

			//CreateColorForTestAntialiasing

			if (GUILayout.Button ("Anti")) {
				CreatePng (1024, 512, CreateColorForTestAntialiasing (1024, 512), "testanti.png");
			}

			// CreateColorForTestDiffusing
			if (GUILayout.Button ("Diffusing")) {
				CreatePng (1024, 512, CreateColorForTestDiffusing (1024, 512), "testdiff.png");
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
		#endregion

		#region HIT
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
				// (ray.original + t * ray.direction - center).mag = radius;

				// 圆心在ray上的垂点, 到垂点的距离
				float dis = Vector3.Dot (center - ray.original, ray.normalDirection);
				Vector3 orthoPos = dis * ray.normalDirection + ray.original;
				Vector3 normal = center - orthoPos;
				float orthoDis = normal.magnitude;

				if (orthoDis < radius) {

					float halfBow = Mathf.Sqrt (radius * radius - orthoDis * orthoDis);
					float t = dis - halfBow;
					if (t >= t_min && t <= t_max) {
						rec.t = t;
						rec.p = ray.original + ray.normalDirection * rec.t;
						rec.normal = (rec.p - center).normalized;
						return true;
					}
					t = dis + halfBow;
					if (t >= t_min && t <= t_max) {
						rec.t = t;
						rec.p = ray.original + ray.normalDirection * rec.t;
						rec.normal = (rec.p - center).normalized;
						return true;
					}
				}
				return false;
			}
		}

		public class HitableList : Hitable {
			public List<Hitable> list;
			public HitableList () { list = new List<Hitable> (); }

			public override bool Hit (Ray ray, float t_min, float t_max, ref HitRecord rec) {
				HitRecord tempRecord = new HitRecord ();
				bool hitAnything = false;
				float closest = t_max;
				foreach (var h in list) {
					if (h.Hit (ray, t_min, closest, ref tempRecord)) {
						hitAnything = true;
						closest = tempRecord.t;
						rec = tempRecord;
					}
				}
				return hitAnything;
			}
		}

		Color GetColorForTestHitRecord (Ray ray, HitableList hitableList) {
			HitRecord record = new HitRecord ();
			if (hitableList.Hit (ray, 0f, float.MaxValue, ref record)) {
				return 0.5f * new Color (record.normal.x + 1, record.normal.y + 1, record.normal.z + 1, 2f);
			}
			float t = 0.5f * ray.normalDirection.y + 1f;
			return (1 - t) * new Color (1, 1, 1) + t * new Color (0.5f, 0.7f, 1);
		}

		Color[] CreateColorForTestHitRecord (int width, int height) {
			//视锥体的左下角、长宽和起始扫射点设定
			Vector3 lowLeftCorner = new Vector3 (-2, -1, -1);
			Vector3 horizontal = new Vector3 (4, 0, 0);
			Vector3 vertical = new Vector3 (0, 2, 0);
			Vector3 original = new Vector3 (0, 0, 0);
			int l = width * height;
			HitableList hitableList = new HitableList ();
			hitableList.list.Add (new Sphere (new Vector3 (0, 0, -1), 0.5f));
			hitableList.list.Add (new Sphere (new Vector3 (0, -100.5f, -1), 100f));
			Color[] colors = new Color[l];
			for (int j = height - 1; j >= 0; j--)
				for (int i = 0; i < width; i++) {
					Ray r = new Ray (original, lowLeftCorner + horizontal * i / (float) width + vertical * j / (float) height);
					colors[i + j * width] = GetColorForTestHitRecord (r, hitableList);
				}
			return colors;
		}

		Color[] CreateColorForTestAntialiasing(int width, int height)
        {
			int SAMPLE = 50;

            //视锥体的左下角、长宽和起始扫射点设定
            Vector3 lowLeftCorner = new Vector3(-2, -1, -1);
            Vector3 horizontal = new Vector3(4, 0, 0);
            Vector3 vertical = new Vector3(0, 2, 0);
            Vector3 original = new Vector3(0, 0, 0);
            int l = width * height;
            HitableList hitableList = new HitableList();
            hitableList.list.Add(new Sphere(new Vector3(0, 0, -1), 0.5f));
            hitableList.list.Add(new Sphere(new Vector3(0, -100.5f, -1), 100f));
            Color[] colors = new Color[l];
            
            float recip_width = 1f / width;
            float recip_height = 1f / height;
            for (int j = height - 1; j >= 0; j--)
                for (int i = 0; i < width; i++)
                {
                    Color color = new Color(0,0,0);
                    for (int s = 0; s < SAMPLE; s++)
                    {
						Ray r = new Ray (original, lowLeftCorner + horizontal * (i + Random.Range(0f, 1f)) / (float) width + vertical * (j + Random.Range(0f, 1f)) / (float) height);
                        color += GetColorForTestHitRecord(r, hitableList);
                    }
                    color /= SAMPLE;
                    color.a = 1f;
                    colors[i + j * width] = color;
                }
            return colors;
        }

		#endregion

		 #region 第七版（测试Diffuse）
        //此处用于取得无序的反射方向，并用于模拟散射模型
        Vector3 GetRandomPointInUnitSphereForTestDiffusing()
        {
            Vector3 p = 2f * new Vector3(Random.Range(0f, 1f), Random.Range(0f, 1f), Random.Range(0f, 1f)) - Vector3.one;
            p = p.normalized * Random.Range(0f, 1f);
            return p;
        }
        
        Color GetColorForTestDiffusing(Ray ray, HitableList hitableList)
        {
			
            HitRecord record = new HitRecord();
            if (hitableList.Hit(ray, 0.0001f, float.MaxValue, ref record))
            {
                Vector3 target = record.p + record.normal + GetRandomPointInUnitSphereForTestDiffusing();
                //此处假定有50%的光被吸收，剩下的则从入射点开始取随机方向再次发射一条射线
                return 0.5f * GetColorForTestDiffusing(new Ray(record.p, target - record.p), hitableList);
            }
			
			return new Color(0.8f, 0.8f, 0.8f, 1);
            // float t = 0.5f * ray.normalDirection.y + 1f;
            // return (1 - t) * new Color(1, 1, 1) + t * new Color(0.5f, 0.7f, 1);
        }

        Color[] CreateColorForTestDiffusing(int width, int height)
        {
			int SAMPLE = 10;

            //视锥体的左下角、长宽和起始扫射点设定
            Vector3 lowLeftCorner = new Vector3(-2, -1, -1);
            Vector3 horizontal = new Vector3(4, 0, 0);
            Vector3 vertical = new Vector3(0, 2, 0);
            Vector3 original = new Vector3(0, 0, 0);
            int l = width * height;
            HitableList hitableList = new HitableList();
            hitableList.list.Add(new Sphere(new Vector3(0, 0, -1), 0.5f));
            hitableList.list.Add(new Sphere(new Vector3(0, -100.5f, -1), 100f));
            Color[] colors = new Color[l];
            
            float recip_width = 1f / width;
            float recip_height = 1f / height;
            for (int j = height - 1; j >= 0; j--)
                for (int i = 0; i < width; i++)
                {
                    Color color = new Color(0, 0, 0);
                    for (int s = 0; s < SAMPLE; s++)
                    {
                        Ray r = new Ray (original, lowLeftCorner + horizontal * (i + Random.Range(0f, 1f)) / (float) width + vertical * (j + Random.Range(0f, 1f)) / (float) height);
                        color += GetColorForTestDiffusing(r, hitableList);
                    }
                    color /= SAMPLE;
                    //为了使球体看起来更亮，改变gamma值
                    //color = new Color(Mathf.Sqrt(color.r), Mathf.Sqrt(color.g), Mathf.Sqrt(color.b), 1f);
                    color.a = 1f;
                    colors[i + j * width] = color;
                }
            return colors;
        }
        #endregion

	}
	


}
