

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
 * Utils 
 */
class Utils
{
    static ConvertVector3Array2Float32Array(vertices: Vector3[]) : Float32Array
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
    
    static ConvertVector2Array2Float32Array(vertices: Vector2[]) : Float32Array
    {
        var re = new Float32Array(vertices.length * 2);
        for (var i=0; i<vertices.length; ++i)
        {
            re[i*2 + 0] = vertices[i].x;
            re[i*2 + 1] = vertices[i].y;
        }
        return re;
    }
    
    static ConvertNumberArray2Uint16Array(nums: number[]): Uint16Array
    {
        var re = new Uint16Array(nums.length);
        for (var i=0; i<nums.length; ++i)
        {
            re[i] = nums[i];
        }
        return re;
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
    
    GetNormalMatrix(): Matrix4x4
    {
        var reversScale = new Vector3(1/this.scale.x, 1/this.scale.y, 1/this.scale.z);
        reversScale.Normalize();
        return Matrix4x4.MultiplyMatrix4x4(Matrix4x4.RotationFromEuler(this.rotation), Matrix4x4.Scale(reversScale));
    }
}

/**
 * Texture
 */
class Texture 
{
	private _gl: WebGLRenderingContext;
    private _texture: WebGLTexture;
    
    constructor(gl: WebGLRenderingContext)
    {
        this._gl = gl;
    }
    
    get texture(): WebGLTexture
    {
        return this._texture;
    }
    
    Load(image: HTMLImageElement)
    {
        var gl = this._gl;
        this._texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
}

/**
 * Material
 */
class Material {
    private _gl : WebGLRenderingContext;
    private _program : WebGLProgram;
    private _textures = {}
    
    constructor(gl: WebGLRenderingContext)
    {
        this._gl = gl;
    }
    
	textures : Texture[];
    Register(name: string, texture: Texture){
        this._textures[name] = texture;
    }
    UseTextures(){
        var gl : WebGLRenderingContext = this._gl;
        var index = 0;
        for (var textureName in this._textures) {
            if (this._textures.hasOwnProperty(textureName)) {
                var texture: Texture = this._textures[textureName];
                gl.activeTexture(gl.TEXTURE0 + index);
                gl.bindTexture(gl.TEXTURE_2D, texture.texture);
                gl.uniform1i(this.GetUniformLocation(textureName), index);
            }
        }
    }
    
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
    
    SetUniform4f(name: string, x: number, y: number, z: number, w: number)
    {
        var uniformLocation = this.GetUniformLocation(name);
        this._gl.uniform4f(uniformLocation, x, y, z, w);
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
		var vertexShader = this.CreateVertexShader(vs);
		var fragmentShader = this.CreateFragmentShader(fs);

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
    vertices : Vector3[];
    uv : Vector2[];
    normals : Vector3[];
    colors : Color[];
    triangles : number[];
    
    constructor()
    {
        
    }
    
    static CreateBox(): Mesh
    {
        var mesh = new Mesh();
        mesh.vertices = [
            new Vector3(-1, -1, 1),
            new Vector3(-1, -1, -1),
            new Vector3(1, -1, -1),
            new Vector3(1, -1, 1),
            new Vector3(-1, 1, 1),
            new Vector3(-1, 1, -1),
            new Vector3(1, 1, -1),
            new Vector3(1, 1, 1),
        ];
        mesh.triangles = [
            1, 2, 3,
            7, 6, 5,
            0, 4, 5,
            1, 5, 6,
            6, 7, 3,
            0, 3, 7,
            0, 1, 3,
            4, 7, 5,
            1, 0, 5,
            2, 1, 6,
            2, 6, 3,
            4, 0, 7,
        ];
        return mesh;
    }
}

enum ProjectMode{
    Perspective,
    Ortho,
}

/**
 * Camera
 */
class Camera
{
    mode: ProjectMode;
    
    eye: Vector3;
    target: Vector3;
    top: Vector3;
    
    far: number;
    near: number;
    
    aspect: number;
    
    orthoSize: number;
    fov: number;
    
    GetViewMatrix(): Matrix4x4
    {
        return Matrix4x4.LookAt(this.eye, this.target, this.top);
    }
    
    GetProjectMatrix(): Matrix4x4
    {
        if (this.mode == ProjectMode.Perspective){
            return Matrix4x4.Perspective(this.fov, this.aspect, this.near, this.far);
        }
        else{
            var halfHeight = this.orthoSize/2;
            var halfWidth = halfHeight * this.aspect;
            return Matrix4x4.Ortho(-halfWidth, halfWidth, -halfHeight, halfHeight, this.near, this.far);
        }
    }
}

/**
 * MeshRender
 */
class MeshRender
{
    private _gl: WebGLRenderingContext;
    private _verticesBuff: WebGLBuffer;
    private _normalsBuff: WebGLBuffer;
    private _uv0Buff: WebGLBuffer;
    private _trianglesBuff: WebGLBuffer;
    
    mesh : Mesh;
    material : Material;
    transform : Transform;
    camera : Camera;
    
    constructor(gl: WebGLRenderingContext)
    {
        this._gl = gl;
    }
    
    LoadMesh()
    {
        this._verticesBuff = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._verticesBuff);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, Utils.ConvertVector3Array2Float32Array(this.mesh.vertices), this._gl.STATIC_DRAW);
        
        this._normalsBuff = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._normalsBuff);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, Utils.ConvertVector3Array2Float32Array(this.mesh.normals), this._gl.STATIC_DRAW);
        
        this._uv0Buff = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._uv0Buff);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, Utils.ConvertVector2Array2Float32Array(this.mesh.uv), this._gl.STATIC_DRAW);
        
        this._trianglesBuff = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._trianglesBuff);
        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, Utils.ConvertNumberArray2Uint16Array(this.mesh.triangles), this._gl.STATIC_DRAW);
    }
    
    Draw()
    {
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._verticesBuff);
        this._gl.vertexAttribPointer(this.material.GetAttribLocation("atbPosition"), 3, this._gl.FLOAT, false, 0, 0);
        
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._normalsBuff);
        this._gl.vertexAttribPointer(this.material.GetAttribLocation("atbNormal"), 3, this._gl.FLOAT, false, 0, 0);
        
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._uv0Buff);
        this._gl.vertexAttribPointer(this.material.GetAttribLocation("atbUV"), 2, this._gl.FLOAT, false, 0, 0);
        
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._trianglesBuff);
        
        this.material.SetUniformMatrix4fv("uModelMatrix", this.transform.GetModelMatrix());
        this.material.SetUniformMatrix4fv("uViewMatrix", this.camera.GetViewMatrix());
        this.material.SetUniformMatrix4fv("uProjectMatrix", this.camera.GetProjectMatrix());
        this.material.SetUniformMatrix4fv("uNormalMatrix", this.transform.GetNormalMatrix());
        
        this.material.UseTextures();
        
        this._gl.drawElements(this._gl.TRIANGLES, this.mesh.triangles.length, this._gl.UNSIGNED_SHORT, 0);
    }
}

/**
 * WireFrameMeshRender
 */
class WireFrameMeshRender {
    private _gl: WebGLRenderingContext;
    private _verticesBuff: WebGLBuffer;
    private _normalsBuff: WebGLBuffer;
    private _uv0Buff: WebGLBuffer;
    private _trianglesBuff: WebGLBuffer;
    
    mesh : Mesh;
    material : Material;
    transform : Transform;
    camera : Camera;
    
    constructor(gl: WebGLRenderingContext)
    {
        this._gl = gl;
    }
    
    ConvertTriangles2Lines(triangles: number[]): number[]
    {
        var lines: number[] = [];
        var trianglesCount = Math.floor(triangles.length/3);
        for (var i=0; i<trianglesCount; ++i)
        {
            lines.push(triangles[i * 3]);
            lines.push(triangles[i * 3 + 1]);
            
            lines.push(triangles[i * 3 + 1]);
            lines.push(triangles[i * 3 + 2]);
            
            lines.push(triangles[i * 3 + 2]);
            lines.push(triangles[i * 3]);
        }
        return lines;
    }
    
    LoadMesh()
    {
        this._verticesBuff = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._verticesBuff);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, Utils.ConvertVector3Array2Float32Array(this.mesh.vertices), this._gl.STATIC_DRAW);
        
        this._normalsBuff = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._normalsBuff);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, Utils.ConvertVector3Array2Float32Array(this.mesh.normals), this._gl.STATIC_DRAW);
        
        this._uv0Buff = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._uv0Buff);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, Utils.ConvertVector2Array2Float32Array(this.mesh.uv), this._gl.STATIC_DRAW);
        
        this._trianglesBuff = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._trianglesBuff);
        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, Utils.ConvertNumberArray2Uint16Array(this.ConvertTriangles2Lines(this.mesh.triangles)), this._gl.STATIC_DRAW);
    }
    
    Draw()
    {
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._verticesBuff);
        this._gl.vertexAttribPointer(this.material.GetAttribLocation("atbPosition"), 3, this._gl.FLOAT, false, 0, 0);
        
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._normalsBuff);
        this._gl.vertexAttribPointer(this.material.GetAttribLocation("atbNormal"), 3, this._gl.FLOAT, false, 0, 0);
        
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._uv0Buff);
        this._gl.vertexAttribPointer(this.material.GetAttribLocation("atbUV"), 2, this._gl.FLOAT, false, 0, 0);
        
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._trianglesBuff);
        
        this.material.SetUniformMatrix4fv("uModelMatrix", this.transform.GetModelMatrix());
        this.material.SetUniformMatrix4fv("uViewMatrix", this.camera.GetViewMatrix());
        this.material.SetUniformMatrix4fv("uProjectMatrix", this.camera.GetProjectMatrix());
        this.material.SetUniformMatrix4fv("uNormalMatrix", this.transform.GetNormalMatrix());
        
        this.material.UseTextures();
        
        this._gl.drawElements(this._gl.TRIANGLES, this.mesh.triangles.length * 2, this._gl.UNSIGNED_SHORT, 0);
    }
}
             
/*            
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