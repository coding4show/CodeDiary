
/**
 * Vector2
 */
class Vector2
{
    x : number;
    y : number;
    
    constructor(x : number = 0, y : number = 0)
    {
        this.x = x;
        this.y = y;
    }
}

/**
 * Vector3
 */
class Vector3
{
    x : number;
    y : number;
    z : number;
    
    constructor(x : number = 0, 
                y : number = 0, 
                z : number = 0)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    Length() : number
    {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    }
    
    Normalize() : void
    {
        
    }
    
    //
    // Static Properties
    //
    static get zero() : Vector3
    {
        return new Vector3(0, 0, 0);
    }
    static get one() : Vector3
    {
        return new Vector3(1, 1, 1);
    }
    static get back() : Vector3
    {
        return new Vector3(0, 0, -1);
    }
    static get left() : Vector3
    {
        return new Vector3(-1, 0, 0);
    }
    static get up() : Vector3
    {
        return new Vector3(0, 1, 0);
    }
    static get down() : Vector3
    {
        return new Vector3(0, -1, 0);
    }
    static get right() : Vector3
    {
        return new Vector3(1, 0, 0);
    }
    static get front() : Vector3
    {
        return new Vector3(0, 0, 1);
    }
    
    //
    // Static Method
    //
    static Add(a: Vector3, b: Vector3) : Vector3
    {
        return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
    }
    static Subtract(a: Vector3, b: Vector3): Vector3
    {
        return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
    }
    static ScaleS(a: Vector3, b: number): Vector3
    {
        return new Vector3(a.x * b, a.y * b, a.z * b);
    }
    static ScaleV(a: Vector3, b: Vector3): Vector3
    {
        return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
    }
    static Lerp(a: Vector3, b: Vector3, t: number): Vector3
    {
        return Vector3.Add(a, Vector3.ScaleS(Vector3.Subtract(b, a), t));
    }
    static Dot(a: Vector3, b: Vector3): number
    {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    static Cross(a: Vector3, b: Vector3): Vector3
    {
        return new Vector3 (a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    }
}

/**
 * Quaternion
 */
class Quaternion
{
    x : number;
    y : number;
    z : number;
    w : number;
    
    constructor(x: number = 0, 
                y: number = 0,
                z: number = 0, 
                w: number = 0)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    
    static get identity() : Quaternion
    {
        return new Quaternion();
    }
}

/**
 * Matrix 
 */
class Matrix4x4
{
    m00: number; m01: number; m02: number; m03: number;
    m10: number; m11: number; m12: number; m13: number;
    m20: number; m21: number; m22: number; m23: number;
    m30: number; m31: number; m32: number; m33: number;
    
    ToFloat32Array(): Float32Array
    {
        var re = new Float32Array(16);
        re[0] = this.m00; re[4] = this.m01; re[8] = this.m02; re[12] = this.m03;
        re[1] = this.m10; re[5] = this.m11; re[9] = this.m12; re[13] = this.m13;
        re[2] = this.m20; re[6] = this.m21; re[10] = this.m22; re[14] = this.m23;
        re[3] = this.m30; re[7] = this.m31; re[11] = this.m32; re[15] = this.m33;
        return re;
    }
    
    static get identity()
    {
        var re = new Matrix4x4();
        re.m00 = 1; re.m01 = 0; re.m02 = 0; re.m03 = 0;
        re.m10 = 0; re.m11 = 1; re.m12 = 0; re.m13 = 0;
        re.m20 = 0; re.m21 = 0; re.m22 = 1; re.m23 = 0;
        re.m30 = 0; re.m31 = 0; re.m32 = 0; re.m33 = 1;
        return re;
    }
    
    static MultiplyMatrix4x4(lhs: Matrix4x4, rhs: Matrix4x4): Matrix4x4
    {
        var re = new Matrix4x4();
        re.m00 = lhs.m00 * rhs.m00 + lhs.m01 * rhs.m10 + lhs.m02 * rhs.m20 + lhs.m03 * rhs.m30,
		re.m01 = lhs.m00 * rhs.m01 + lhs.m01 * rhs.m11 + lhs.m02 * rhs.m21 + lhs.m03 * rhs.m31,
		re.m02 = lhs.m00 * rhs.m02 + lhs.m01 * rhs.m12 + lhs.m02 * rhs.m22 + lhs.m03 * rhs.m32,
		re.m03 = lhs.m00 * rhs.m03 + lhs.m01 * rhs.m13 + lhs.m02 * rhs.m23 + lhs.m03 * rhs.m33,
		re.m10 = lhs.m10 * rhs.m00 + lhs.m11 * rhs.m10 + lhs.m12 * rhs.m20 + lhs.m13 * rhs.m30,
		re.m11 = lhs.m10 * rhs.m01 + lhs.m11 * rhs.m11 + lhs.m12 * rhs.m21 + lhs.m13 * rhs.m31,
		re.m12 = lhs.m10 * rhs.m02 + lhs.m11 * rhs.m12 + lhs.m12 * rhs.m22 + lhs.m13 * rhs.m32,
		re.m13 = lhs.m10 * rhs.m03 + lhs.m11 * rhs.m13 + lhs.m12 * rhs.m23 + lhs.m13 * rhs.m33,
		re.m20 = lhs.m20 * rhs.m00 + lhs.m21 * rhs.m10 + lhs.m22 * rhs.m20 + lhs.m23 * rhs.m30,
		re.m21 = lhs.m20 * rhs.m01 + lhs.m21 * rhs.m11 + lhs.m22 * rhs.m21 + lhs.m23 * rhs.m31,
		re.m22 = lhs.m20 * rhs.m02 + lhs.m21 * rhs.m12 + lhs.m22 * rhs.m22 + lhs.m23 * rhs.m32,
		re.m23 = lhs.m20 * rhs.m03 + lhs.m21 * rhs.m13 + lhs.m22 * rhs.m23 + lhs.m23 * rhs.m33,
		re.m30 = lhs.m30 * rhs.m00 + lhs.m31 * rhs.m10 + lhs.m32 * rhs.m20 + lhs.m33 * rhs.m30,
		re.m31 = lhs.m30 * rhs.m01 + lhs.m31 * rhs.m11 + lhs.m32 * rhs.m21 + lhs.m33 * rhs.m31,
		re.m32 = lhs.m30 * rhs.m02 + lhs.m31 * rhs.m12 + lhs.m32 * rhs.m22 + lhs.m33 * rhs.m32,
		re.m33 = lhs.m30 * rhs.m03 + lhs.m31 * rhs.m13 + lhs.m32 * rhs.m23 + lhs.m33 * rhs.m33
        return re;
    }
    
    MultiplyVector3(v: Vector3): Vector3
    {
        var result = new Vector3();
        result.x = this.m00 * v.x + this.m01 * v.y + this.m02 * v.z + this.m03;
        result.y = this.m10 * v.x + this.m11 * v.y + this.m12 * v.z + this.m13;
        result.z = this.m20 * v.x + this.m21 * v.y + this.m22 * v.z + this.m23;
        return result;
    }
    
    
    static TRS(pos: Vector3, r: Vector3, s: Vector3): Matrix4x4
    {
        var mtxTranslation = Matrix4x4.Translation(pos);
        var mtxRotation = Matrix4x4.RotationFromEuler(r);
        var mtxScale = Matrix4x4.Scale(s); 
        return Matrix4x4.MultiplyMatrix4x4(Matrix4x4.MultiplyMatrix4x4(mtxRotation, mtxScale), mtxTranslation);
    }
    
    static Translation(tr: Vector3): Matrix4x4
    {
        var re = new Matrix4x4();
        
        re.m00 = 1; re.m01 = 0; re.m02 = 0; re.m03 = tr.x;
        re.m10 = 0; re.m11 = 1; re.m12 = 0; re.m13 = tr.y;
        re.m20 = 0; re.m21 = 0; re.m22 = 1; re.m23 = tr.z;
        re.m30 = 0; re.m31 = 0; re.m32 = 0; re.m33 = 1;
        
        return re;
    }
    
    static RotationFromEulerX(r: number): Matrix4x4
    {
        var re = new Matrix4x4();
        var cos = Math.cos(r);
        var sin = Math.sin(r);
        re.m00 = 1; re.m01 = 0; re.m02 = 0; re.m03 = 0;
        re.m10 = 0; re.m11 = cos; re.m12 = -sin; re.m13 = 0;
        re.m20 = 0; re.m21 = sin; re.m22 = cos; re.m23 = 0;
        re.m30 = 0; re.m31 = 0; re.m32 = 0; re.m33 = 1;
        
        return re;
    }
    
    static RotationFromEulerY(r: number): Matrix4x4
    {
        var re = new Matrix4x4();
        var cos = Math.cos(r);
        var sin = Math.sin(r);
        re.m00 = cos; re.m01 = 0; re.m02 = sin; re.m03 = 0;
        re.m10 = 0; re.m11 = 1; re.m12 = 0; re.m13 = 0;
        re.m20 = -sin; re.m21 = 0; re.m22 = cos; re.m23 = 0;
        re.m30 = 0; re.m31 = 0; re.m32 = 0; re.m33 = 1;
        
        return re;
    }
    
    static RotationFromEulerZ(r: number): Matrix4x4
    {
        var re = new Matrix4x4();
        var cos = Math.cos(r);
        var sin = Math.sin(r);
        re.m00 = cos; re.m01 = -sin; re.m02 = 0; re.m03 = 0;
        re.m10 = sin; re.m11 = cos; re.m12 = 0; re.m13 = 0;
        re.m20 = 0; re.m21 = 0; re.m22 = 1; re.m23 = 0;
        re.m30 = 0; re.m31 = 0; re.m32 = 0; re.m33 = 1;
        
        return re;
    }
    
    //需要优化
    static RotationFromEuler(r: Vector3): Matrix4x4
    {
        var mtxRotateX = Matrix4x4.RotationFromEulerX(r.x);
        var mtxRotateY = Matrix4x4.RotationFromEulerY(r.y);
        var mtxRotateZ = Matrix4x4.RotationFromEulerZ(r.z);
        return Matrix4x4.MultiplyMatrix4x4(mtxRotateX, Matrix4x4.MultiplyMatrix4x4(mtxRotateZ, mtxRotateY));
    }
    
    //TODO
    static RotationFromQuaternion(q: Quaternion): Matrix4x4
    {
        return Matrix4x4.identity;
    }
    
    static Scale(s: Vector3): Matrix4x4
    {
        var re = new Matrix4x4();
        re.m00 = s.x; re.m01 = 0; re.m02 = 0; re.m03 = 0;
        re.m10 = 0; re.m11 = s.y; re.m12 = 0; re.m13 = 0;
        re.m20 = 0; re.m21 = 0; re.m22 = s.z; re.m23 = 0;
        re.m30 = 0; re.m31 = 0; re.m32 = 0; re.m33 = 1;
        return re;
    }
    
    //TODO
    static Perspective(fov: number, aspect: number, zNear: number, zFar: number): Matrix4x4
    {
        var halfAngle = fov * Math.PI / 180 / 2; 
        var halfW = Math.tan(halfAngle) * zNear;
        var halfH = halfW / aspect;
        var re = new Matrix4x4();
        
        re.m00 = zNear/halfW; re.m01 = 0; re.m02 = 0; re.m03 = 0;
        re.m10 = 0; re.m11 = zNear/halfH; re.m12 = 0; re.m13 = 0;
        re.m20 = 0; re.m21 = 0; re.m22 = zFar/(zFar-zNear); re.m23 = -zFar*zNear/(zFar-zNear);
        re.m30 = 0; re.m31 = 0; re.m32 = 0; re.m33 = 1;
        
        return re;
    }
    
    //TODO
    static Ortho(left: number, right: number, bottom: number, top: number, zNear: number, zFar: number): Matrix4x4
    {
        var re = new Matrix4x4();
        
        re.m00 = 1; re.m01 = 0; re.m02 = 0; re.m03 = 0;
        re.m10 = 0; re.m11 = 1; re.m12 = 0; re.m13 = 0;
        re.m20 = 0; re.m21 = 0; re.m22 = 1; re.m23 = 0;
        re.m30 = 0; re.m31 = 0; re.m32 = 0; re.m33 = 1;
        
        return re;
    }
}

/**
 * Color
 */
class Color
{
    r : number;
    g : number;
    b : number;
    a : number;
    
    constructor(r : number = 0,
                g : number = 0,
                b : number = 0,
                a : number = 0){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

/**
 * Transform
 */
class Transform
{
    parent : Transform;
    position : Vector3;
    scale : Vector3;
    rotation : Vector3;
    
    constructor()
    {
        this.parent = null;
        this.position = Vector3.zero;
        this.scale = Vector3.one;
        this.rotation = Vector3.zero;
    }
    
    GetModelMatrix(): Matrix4x4 
    {
        return Matrix4x4.TRS(this.position, this.rotation, this.scale);
    }
}

/**
 * Texture
 */
class Texture {
	
}

/**
 * Material
 */
class Material {
    private _gl : WebGLRenderingContext;
    private _program : WebGLProgram;
    
    constructor(gl: WebGLRenderingContext)
    {
        this._gl = gl;
    }
    
	textures : Texture[];
    
    Load(vs: string, fs: string)
    {
        this._program = this.CreateProgram(vs, fs);
    }
    
    Unload()
    {
        
    }
    
    Use()
    {
        this._gl.useProgram(this._program);
    }
    
    GetAttribLocation(name: string): number
    {
        var re = this._gl.getAttribLocation(this._program, name);
        this._gl.enableVertexAttribArray(re);
        return re;
    }
    
    GetUniformLocation(name: string): WebGLUniformLocation
    {
        var re = this._gl.getUniformLocation(this._program, name);
        return re;
    }
    
    SetUniformMatrix4fv(name: string, mtx: Matrix4x4)
    {
        var uniformLocation = this.GetUniformLocation(name);
        this._gl.uniformMatrix4fv(uniformLocation, false, mtx.ToFloat32Array());
    }
    
    private CreateVertexShader(str: string) : WebGLShader
	{
		var shader = this._gl.createShader(this._gl.VERTEX_SHADER);
		if (this.CompileShader(shader, str)){
			return shader;
		}
		else{
			return null;
		}
	}

	private CreateFragmentShader(str: string) : WebGLShader
	{
		var shader = this._gl.createShader(this._gl.FRAGMENT_SHADER);
		if (this.CompileShader(shader, str)) {
			return shader;
		}
		else{
			return null;
		}
	}

	private CompileShader(shader: WebGLShader, str: string) : boolean
	{
		this._gl.shaderSource(shader, str);
	    this._gl.compileShader(shader);

		if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
			alert(this._gl.getShaderInfoLog(shader));
		    return false;
		}

        return true;
	}

	private CreateProgram(vs: string, fs: string) : WebGLProgram
	{
		var fragmentShader = this.CreateVertexShader(vs);
		var vertexShader = this.CreateFragmentShader(fs);

        var shaderProgram = this._gl.createProgram();
        this._gl.attachShader(shaderProgram, vertexShader);
        this._gl.attachShader(shaderProgram, fragmentShader);
        this._gl.linkProgram(shaderProgram);

        if (!this._gl.getProgramParameter(shaderProgram, this._gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
            return null;
        }

        return shaderProgram;
	}
}

/**
 * Mesh
 */
class Mesh
{
    private _gl: WebGLRenderingContext;
    private _verticesBuff: WebGLBuffer;
    private _trianglesBuff: WebGLBuffer;
    
    vertices : Vector3[];
    uv : Vector2[];
    colors : Color[];
    triangles : number[];
    
    constructor(gl: WebGLRenderingContext)
    {
        this._gl = gl;
    }
    
    Load()
    {
        this._verticesBuff = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._verticesBuff);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, this.Vector3Array2Float32Array(this.vertices), this._gl.STATIC_DRAW);
    }
    
    Unload()
    {}
    
    GetVerticesBuffer(): WebGLBuffer
    {
        return this._verticesBuff;
    }
    
    GetTrianglesBuff(): WebGLBuffer
    {
        return this._trianglesBuff;
    }
    
    private Vector3Array2Float32Array(vertices: Vector3[]) : Float32Array
    {
        var re = new Float32Array(vertices.length * 3);
        for (var i=0; i<vertices.length; ++i)
        {
            re[i*3 + 0] = vertices[i].x;
            re[i*3 + 1] = vertices[i].y;
            re[i*3 + 2] = vertices[i].z;
        }
        return re;
    }
}


/**
 * Camera
 */
class Camera
{
    transform: Transform;
    far: number;
    near: number;
    fov: number;
    aspect: number;
    
    GetViewMatrix(): Matrix4x4
    {
        var re = new Matrix4x4();
        
        re.m00 = 1; re.m01 = 0; re.m02 = 0; re.m03 = 0;
        re.m10 = 0; re.m11 = 1; re.m12 = 0; re.m13 = 0;
        re.m20 = 0; re.m21 = 0; re.m22 = 1; re.m23 = 0;
        re.m30 = 0; re.m31 = 0; re.m32 = 0; re.m33 = 1;
        
        return re;
    }
    
    GetProjectMatrix(): Matrix4x4
    {
        return Matrix4x4.Perspective(this.fov, this.aspect, this.near, this.far);
    }
}

/**
 * MeshRender
 */
class MeshRender
{
    private _gl: WebGLRenderingContext;
    
    mesh : Mesh;
    material : Material;
    transform : Transform;
    camera : Camera;
    
    constructor(gl: WebGLRenderingContext)
    {
        this._gl = gl;
    }
    
    Draw()
    {
        this.material.Use();
        
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this.mesh.GetVerticesBuffer());
        this._gl.vertexAttribPointer(this.material.GetAttribLocation("aVertexPosition"), 3, this._gl.FLOAT, false, 0, 0);
        
        this.material.SetUniformMatrix4fv("uMtxModel", this.transform.GetModelMatrix());
        this.material.SetUniformMatrix4fv("uMtxView", this.camera.GetViewMatrix());
        this.material.SetUniformMatrix4fv("uMtxProject", this.camera.GetProjectMatrix());
        //this.material.SetUniformMatrix4fv("uMtxProject", Matrix4x4.identity);
        
        this._gl.drawArrays(this._gl.TRIANGLES, 0, this.mesh.vertices.length);
    }
}

/**
 * Context
 */
class Context
{
	static canvas;
	static gl : WebGLRenderingContext;
    
	static InitGL(canvas)
	{
        Context.canvas = canvas;
	    try 
		{
            var gl: WebGLRenderingContext;
	        gl = canvas.getContext("experimental-webgl");
			gl.viewport(0, 0, canvas.width, canvas.height);
            
            //TestClear
			gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.enable(gl.DEPTH_TEST);
            
            Context.gl = gl;
	    }
		catch (e) 
		{}
	    
		if (!gl)
		{
	        alert("Could not initialise WebGL, sorry :-(");
	    }
	}	
}

function OnLoadShader(vs: string, fs: string)
{   
    var gl = Context.gl;
    
    var mat = new Material(gl);
    mat.Load(vs, fs);
    
    var mesh = new Mesh(gl);
    mesh.vertices = [new Vector3(-1, -1, 0), new Vector3(-1, 1, 0), new Vector3(1, 1, 1)];
    mesh.triangles = [0, 1, 2];
    mesh.Load();
    
    var camera = new Camera();
    camera.aspect = 1;
    camera.fov = 90;
    camera.near = 0.5;
    camera.far = 100;
    
    var transform = new Transform();
    //transform.position = new Vector3(0, 0, -0.5);
    transform.position = Vector3.zero;
    transform.rotation = Vector3.zero;
    
    var render = new MeshRender(gl);
    render.mesh = mesh;
    render.camera = camera;
    render.material = mat;
    render.transform = transform;
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    render.Draw();
    
    /*
    var f = 0;
    
    setInterval(function(){
        
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        f += 0.1;
        
        transform.position = new Vector3(-0.5);
        transform.rotation = new Vector3(0, f, 0);
        
        render.Draw();
        
    }, 16);
    */
}

/**
 * FileLoader
 */
class FileLoader
{
	Load(url: string, callback:{(textContent: string): void;})
	{
		var request = new XMLHttpRequest();
		request.responseType = "text";
		request.onload = function() { 
			callback(request.responseText);
		};
		request.open("GET", url, true);
		request.send(null);
	}
    
    static Load(urls: string[])
    {
        
    }
}

function TestDraw()
{
    var vsLoader = new FileLoader();
    vsLoader.Load("diff.vs", function(vstext: string){
        var fsLoader = new FileLoader();
        fsLoader.Load("diff.fs", function(fstext: string){
            OnLoadShader(vstext, fstext);
        });
    });   
}