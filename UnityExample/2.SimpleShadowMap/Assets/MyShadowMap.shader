Shader "Unlit/MyShadowMap"
{
	Properties
	{
		_ShadowMap ("Texture", 2D) = "white" {}
	}
	SubShader
	{
		Tags { "RenderType"="Opaque" }
		LOD 100

		Pass
		{
			CGPROGRAM
// Upgrade NOTE: excluded shader from DX11 and Xbox360; has structs without semantics (struct v2f members smuv)
#pragma exclude_renderers d3d11 xbox360
			#pragma vertex vert
			#pragma fragment frag
			
			#include "UnityCG.cginc"

			struct appdata
			{
				float4 vertex : POSITION;
				float2 uv : TEXCOORD0;
			};

			struct v2f
			{
				float4 vertex : SV_POSITION;
				float2 smuv;
				float smZ;
			};

			sampler2D _ShadowMap;
			float4 _ShadowMap_ST;
			
			float4x4 _ShadowMVP;
			
			v2f vert (appdata v)
			{
				v2f o;
				
				o.vertex = mul(UNITY_MATRIX_MVP, v.vertex);
				
				
				float4 smPos = mul(_ShadowMVP, mul(_Object2World, v.vertex));
				o.smuv = smPos.xy / smPos.w * 0.5 + float2(0.5, 0.5);
				o.smZ = smPos.z / smPos.w;
				
				return o;
			}
			
			fixed4 frag (v2f i) : SV_Target
			{
				//fixed4 col = tex2D(_ShadowMap, i.smuv);
				float dep = tex2D(_ShadowMap, i.smuv).r;
				
				float light = 0.8;
				float dark = 0.4;
				
				if (i.smZ <= dep){
					return fixed4(light, light, light, 1);
				}
				else{
					return fixed4(dark, dark, dark, 1);
				}
			}
			ENDCG
		}
	}
}
