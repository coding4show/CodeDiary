

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
                z : number = 0){
        this.x = x;
        this.y = y;
        this.z = z;
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
}

/**
 * Matrix 
 */
class Matrix
{
    
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
    rotation : Quaternion;
    
    Use() : void
    {
        /*
        var initMatrix = [
			1.0, 0.0, 0.0, 0.0, 
			0.0, 1.0, 0.0, 0.0, 
			0.0, 0.0, 1.0, 0.0, 
			0.0, 0.0, 0.0, 1.0, 
		];
        var modelviewLocation = Context.currentMaterail.modelviewLocation;
        Context.gl.uniformMatrix4fv(modelviewLocation, false, new Float32Array(initMatrix));
        */
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
        
        /*
        this._modelviewLocation = Context.gl.getUniformLocation(this._program, "uMVMatrix");
        this._projectLocation = Context.gl.getUniformLocation(this._program, "uPMatrix");
        */
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
        var vertices = [
             0.0,  0.05,  0.0,
            -0.05, -0.05,  0.0,
             0.05, -0.05,  0.0
        ];
        
        //Context.gl.bufferData(Context.gl.ARRAY_BUFFER, this.Vector3Array2Float32Array(this.vertices), Context.gl.STATIC_DRAW);
        Context.gl.bufferData(Context.gl.ARRAY_BUFFER, new Float32Array(vertices), Context.gl.STATIC_DRAW);
        
    }
    
    Unload()
    {}
    
    Draw()
    {
        Context.gl.bindBuffer(Context.gl.ARRAY_BUFFER, this._verticesBuff);
        Context.gl.vertexAttribPointer(Context.currentMaterail.verticesLocation, 3, Context.gl.FLOAT, false, 0, 0);
        Context.gl.drawArrays(Context.gl.TRIANGLES, 0, this.vertices.length);
        alert(Context.gl.getError());
        
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
        /*
        var initMatrix = [
			1.0, 0.0, 0.0, 0.0, 
			0.0, 1.0, 0.0, 0.0, 
			0.0, 0.0, 1.0, 0.0, 
			0.0, 0.0, 0.0, 1.0, 
		];
        var projectLocation = Context.currentMaterail.projectLocation;
        Context.gl.uniformMatrix4fv(projectLocation, false, new Float32Array(initMatrix));
        */
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
    var mat = new Materail();
    mat.Load(vs, fs);
    mat.Use();
    
    var transform = new Transform();
    transform.Use();
    
    var camera = new Camera();
    camera.Use();
     
    var mesh = new Mesh();
    mesh.vertices = [new Vector3(), new Vector3(0.5, 0, 0), new Vector3(0, 0.5, 0)];
    mesh.triangles = [0, 1, 2];
    mesh.Load();
    
    mesh.Draw();
}

function TestDraw()
{
    var vsLoader = new FileLoader();
    vsLoader.Load("diff.vs", function(vstext: string){
        var fsLoader = new FileLoader();
        fsLoader.Load("diff.fs", function(fstext: string){
            try {
                OnLoadShader(vstext, fstext);
            } catch (error) {
                alert(error);
            }
            
        });
    });
}