Shader "Custom/Water" {
	Properties {
		_Color ("Color", Color) = (1,1,1,1)
		_MainTex ("Albedo (RGB)", 2D) = "white" {}
		_Wave0 ("Wave 0", Vector) = (1, 1, 1, 1)
		_Wave1 ("Wave 1", Vector) = (1, 1, 1, 1)
	}
	SubShader {
		Tags { "RenderType"="Opaque" }
		LOD 200
		Cull Off
		CGPROGRAM
		#pragma surface surf BlinnPhong vertex:vert

		// Use shader model 3.0 target, to get nicer looking lighting
		#pragma target 3.0

		sampler2D _MainTex;
		struct Input {
			float2 uv_MainTex;
		};

		fixed4 _Color;
		fixed4 _Wave0;
		fixed4 _Wave1;
		
		
//		// Consider Z up
//		float waveHeight(float2 pos, float2 dir, float phase, float magnitude){
//			//return sin(dot(pos, dir) + phase) * magnitude;
//			return sin(pos.x * dir.x + pos.y * dir.y + phase) * magnitude;
//		}
		
// 		//Consider Z up
//		float3 waveNormal(float2 pos, float2 dir, float phase, float magnitude){
//			float dx = magnitude * cos(pos.x * dir.x + pos.y * dir.y + phase) * dir.x;
//			float3 nx = float3(1, 0, dx);
//			float dy = magnitude * cos(pos.x * dir.x + pos.y * dir.y + phase) * dir.y;
//			float3 ny = float3(0, 1, dy);
//			
//			float3 n = cross(nx, ny);
//			return float3(n.x, n.z, n.y);
//		}
		
		void vert (inout appdata_full v) {
			float h0 = sin(v.vertex.x * _Wave0.x + v.vertex.z * _Wave0.y + _Wave0.w) * _Wave0.z;
			float cos0 = cos(v.vertex.x * _Wave0.x + v.vertex.z * _Wave0.y + _Wave0.w);
			float dx0 = _Wave0.z * _Wave0.x * cos0;
			float dy0 = _Wave0.z * _Wave0.y * cos0;
			
			float h1 = sin(v.vertex.x * _Wave1.x + v.vertex.z * _Wave1.y + _Wave1.w) * _Wave1.z;
			float cos1 = cos(v.vertex.x * _Wave1.x + v.vertex.z * _Wave1.y + _Wave1.w);
			float dx1 = _Wave1.z * _Wave1.x * cos1;
			float dy1 = _Wave1.z * _Wave1.y * cos1;
			
        	v.vertex.xyz += float3(0, h0 + h1 + 0.5, 0);
        	
        	float3 nx = float3(1, 0, dx0 + dx1);
        	float3 ny = float3(0, 1, dy0 + dy1);
        	float3 n = normalize(cross(nx, ny).xzy);
        	
        	v.normal = n;
      	}

		void surf (Input IN, inout SurfaceOutput o) {
			fixed4 c = tex2D (_MainTex, IN.uv_MainTex) * _Color;
			o.Albedo = c.rgb;
			o.Alpha = c.a;
		}
		ENDCG
	} 
	FallBack "Diffuse"
}
