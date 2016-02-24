/// <reference path="Render.ts" />

/**
 * Book.ts
 */

class Book
{
    private _gl: WebGLRenderingContext;
    private render: MeshRender;
    private mesh: Mesh;
    private camera: Camera;
    private material: Material; 
    
    private width: number;
    private height: number;
    private row: number;
    private col: number;
    
    vs: string;
    fs: string;
    
    constructor(gl: WebGLRenderingContext){
        this._gl = gl;
    }
    
    private CreatePlane(): Mesh
    {
        var mesh = new Mesh();
        mesh.vertices = [];
        
        var segX = this.width/this.col;
        var segY = this.height/this.row;
        
        for (var i = 0; i < this.col+1; i++) {
            for (var j=0; j< this.row+1; j++){
                var posX = segX * i;
                var posY = segY * j;
                mesh.vertices.push(new Vector3(posX, posY));
            }
        }
        
        //index
        mesh.triangles = [];
        for (var i=0; i<this.col; i++){
            for (var j=0; j<this.row; j++){
                var leftTop = j * this.col + i;
                var leftBottom = leftTop + this.col;
                var rightTop = leftTop + 1;
                var rightBottom = leftBottom + 1;
                mesh.triangles.push(leftTop, rightTop, rightBottom);
                mesh.triangles.push(leftTop, rightBottom, leftBottom);
            }
        }
        return mesh;
    }
    
    private CreateCamera(): Camera
    {
        var camera = new Camera();
        camera.mode = ProjectMode.Ortho;
        camera.near = -1000;
        camera.far = 1000;
        camera.aspect = this.width/this.height;
        
        camera.eye = Vector3.zero;
        camera.target = new Vector3(0, 0, 1);
        camera.top = new Vector3(0, 1, 0);
        
        camera.orthoSize = this.height/2;
        return camera;
    }
    
    Load()
    {
        var material = new Material(this._gl);
        material.Load(this.vs, this.fs);
        this.material = material;
        this.mesh = this.CreatePlane();
        this.camera = this.CreateCamera();
        
        var render = new MeshRender(this._gl);
        render.material = material;
        render.mesh = this.mesh;
        render.camera = this.camera;
        
        render.transform = new Transform();;
        render.LoadMesh();
        
        this.render = render;
    }
    
    Draw()
    {
        this.render.Draw();
    }
}