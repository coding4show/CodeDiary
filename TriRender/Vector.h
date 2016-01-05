@pragma once

struct Vector3;
struct Matrix4x4;
struct Quaternion;

/**
 * 三维向量
 */
struct Vector3
{
	float x;
	float y;
	float z;

	static float Length(Vector3 v);
	static Vector3 Normalize(Vector3 v);

	static Vector3 Add(Vector3 v1, Vector3 v2);
	static Vector3 Subtract(Vector3 v1, Vector3 v2);
	static float Dot(Vector3 v);
	static Vector3 Cross(Vector3 v);
	static Vector3 Scale(Vector3 v, float scale);
	
	static Vector3 Lerp(Vector3 from, Vector3 to, float t);
};

/**
 * 四阶矩阵
 */
struct Matrix4x4
{
	float m00; float m01; float m02; float m03; 
	float m10; float m11; float m12; float m13;
	float m20; float m21; float m22; float m23; 
	float m30; float m31; float m32; float m33; 
};

/**
 * 
 */
struct Quaternion
{
	float x;
	float y;
	float z;
	float w;
};