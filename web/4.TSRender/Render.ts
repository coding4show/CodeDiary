

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
}

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
        
        /*
        re.m00 = 1; re.m01 = 0; re.m02 = 0; re.m03 = 0;
        re.m10 = 0; re.m11 = 1; re.m12 = 0; re.m13 = 0;
        re.m20 = 0; re.m21 = 0; re.m22 = 1; re.m23 = 0;
        re.m30 = tr.x; re.m31 = tr.y; re.m32 = tr.z; re.m33 = 1;
        */
        
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
    
    //TODO
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
        return Matrix4x4.identity;
    }
    
    //TODO
    static Ortho(left: number, right: number, bottom: number, top: number, zNear: number, zFar: number): Matrix4x4
    {
        return Matrix4x4.identity;
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
    
    Use() : void
    {
        var curMatrix = Matrix4x4.TRS(this.position, this.rotation, this.scale);
        var modelviewLocation = Context.currentMaterail.modelviewLocation;
        Context.gl.uniformMatrix4fv(modelviewLocation, false, curMatrix.ToFloat32Array());
    }
}

/**
 * Texture
 */
class Texture {
	
}

/**
 * Materail
 */
class Materail {
    private _program : WebGLProgram;
    private _verticesLocation : number;
    private _modelviewLocation : WebGLUniformLocation;
    private _projectLocation : WebGLUniformLocation;
    
    get verticesLocation() : number{
        return this._verticesLocation;
    }
    get modelviewLocation() : WebGLUniformLocation{
        return this._modelviewLocation;
    }
    get projectLocation() : WebGLUniformLocation{
        return this._projectLocation;
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
        Context.gl.useProgram(this._program);
        
        this._verticesLocation = Context.gl.getAttribLocation(this._program, "aVertexPosition");
        Context.gl.enableVertexAttribArray(this._verticesLocation);
        
        this._modelviewLocation = Context.gl.getUniformLocation(this._program, "uMVMatrix");
        this._projectLocation = Context.gl.getUniformLocation(this._program, "uPMatrix");
        
        Context.currentMaterail = this;
    }
    
    private CreateVertexShader(str: string) : WebGLShader
	{
		var shader = Context.gl.createShader(Context.gl.VERTEX_SHADER);
		if (this.CompileShader(shader, str)){
			return shader;
		}
		else{
			return null;
		}
	}

	private CreateFragmentShader(str: string) : WebGLShader
	{
		var shader = Context.gl.createShader(Context.gl.FRAGMENT_SHADER);
		if (this.CompileShader(shader, str)) {
			return shader;
		}
		else{
			return null;
		}
	}

	private CompileShader(shader: WebGLShader, str: string) : boolean
	{
		Context.gl.shaderSource(shader, str);
	    Context.gl.compileShader(shader);

		if (!Context.gl.getShaderParameter(shader, Context.gl.COMPILE_STATUS)) {
			alert(Context.gl.getShaderInfoLog(shader));
		    return false;
		}

        return true;
	}

	private CreateProgram(vs: string, fs: string) : WebGLProgram
	{
		var fragmentShader = this.CreateVertexShader(vs);
		var vertexShader = this.CreateFragmentShader(fs);

        var shaderProgram = Context.gl.createProgram();
        Context.gl.attachShader(shaderProgram, vertexShader);
        Context.gl.attachShader(shaderProgram, fragmentShader);
        Context.gl.linkProgram(shaderProgram);

        if (!Context.gl.getProgramParameter(shaderProgram, Context.gl.LINK_STATUS)) {
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
    private _verticesBuff: WebGLBuffer;
    private _trianglesBuff: WebGLBuffer;
    
    vertices : Vector3[];
    uv : Vector2[];
    colors : Color[];
    triangles : number[];
    
    
    Load()
    {
        this._verticesBuff = Context.gl.createBuffer();
        Context.gl.bindBuffer(Context.gl.ARRAY_BUFFER, this._verticesBuff);
        Context.gl.bufferData(Context.gl.ARRAY_BUFFER, this.Vector3Array2Float32Array(this.vertices), Context.gl.STATIC_DRAW);
    }
    
    Unload()
    {}
    
    Draw()
    {
        Context.gl.bindBuffer(Context.gl.ARRAY_BUFFER, this._verticesBuff);
        Context.gl.vertexAttribPointer(Context.currentMaterail.verticesLocation, 3, Context.gl.FLOAT, false, 0, 0);
        Context.gl.drawArrays(Context.gl.TRIANGLES, 0, this.vertices.length);
        
        //Context.gl.bindBuffer(Context.gl.ELEMENT_ARRAY_BUFFER, this._trianglesBuff);
        //Context.gl.drawElements(Context.gl.TRIANGLES, 0, 0, 0);
    }
    
    Vector3Array2Float32Array(vertices: Vector3[]) : Float32Array
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
 * MeshRender
 */
class MeshRender
{
    mesh : Mesh;
    materail : Materail;
}

/**
 * GameObject
 */
class GameObject
{
    transform : Transform;
    render : MeshRender;
}

/**
 * Camera
 */
class Camera
{
    Use():void
    {
        var projectLocation = Context.currentMaterail.projectLocation;
        Context.gl.uniformMatrix4fv(projectLocation, false, Matrix4x4.identity.ToFloat32Array());
    }
}

/**
 * Context
 */
class Context
{
	static canvas;
	static gl : WebGLRenderingContext;
    static currentMaterail : Materail;
    
	static InitGL(canvas)
	{
        Context.canvas = canvas;
	    try 
		{
	        Context.gl = canvas.getContext("experimental-webgl");
			Context.gl.viewport(0, 0, canvas.width, canvas.height);
            
            //TestClear
			Context.gl.clearColor(0.0, 0.0, 0.0, 1.0);
            Context.gl.clear(Context.gl.COLOR_BUFFER_BIT | Context.gl.DEPTH_BUFFER_BIT);
            Context.gl.enable(Context.gl.DEPTH_TEST);
	    }
		catch (e) 
		{}
	    
		if (!Context.gl)
		{
	        alert("Could not initialise WebGL, sorry :-(");
	    }
	}	
}

function OnLoadShader(vs: string, fs: string)
{
    Context.gl.clear(Context.gl.COLOR_BUFFER_BIT | Context.gl.DEPTH_BUFFER_BIT);
    
    var mat = new Materail();
    mat.Load(vs, fs);
    mat.Use();
    
    var transform = new Transform();
    //transform.position = new Vector3(0.5);
    transform.Use();
    
    var camera = new Camera();
    camera.Use();
     
    var mesh = new Mesh();
    mesh.vertices = [new Vector3(), new Vector3(0.5, 0, 0), new Vector3(0, 0.5, 0)];
    mesh.triangles = [0, 1, 2];
    mesh.Load();
    
    mesh.Draw();
    
    transform.position = new Vector3(-0.5);
    transform.rotation = new Vector3(0, 0, 1);
    transform.Use();
    mesh.Draw();
}

function TestDraw()
{
    /*
    var vs = "attribute vec3 aVertexPosition;\
            uniform mat4 uMVMatrix;\
            uniform mat4 uPMatrix;\
            varying vec4 vColor;\
            void main(void) {\
            gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\
            vColor = vec4(1,0,0,1);\
        }";
        
    var fs = 'precision mediump float;\
            varying vec4 vColor;\
void main(void) {\
    gl_FragColor = vColor;\
}';
    
    OnLoadShader(vs, fs);
    */
    
    var vsLoader = new FileLoader();
    vsLoader.Load("diff.vs", function(vstext: string){
        var fsLoader = new FileLoader();
        fsLoader.Load("diff.fs", function(fstext: string){
            OnLoadShader(vstext, fstext);
        });
    });   
}