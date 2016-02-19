/// <reference path="Render.ts" />

/**
 * Book.ts
 */

class Book
{
    private _gl: WebGLRenderingContext;
    private render: MeshRender;
    private mesh: Mesh;
    
    private width: number;
    private height: number;
    private row: number;
    private col: number;
    
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
    
    CreateCamera(): Camera
    {
        return null;
    }
    
    Load()
    {}
    
    Draw()
    {}
}