/// <reference path="Render.ts" />
/**
 * Book.ts
 */
var Book = (function () {
    function Book(gl, width, height, row, col) {
        this._gl = gl;
        this.width = width;
        this.height = height;
        this.row = row;
        this.col = col;
    }
    Book.prototype.CreatePlane = function () {
        var mesh = new Mesh();
        mesh.vertices = [];
        var segX = this.width / this.col;
        var segY = this.height / this.row;
        for (var j = 0; j < this.row + 1; j++) {
            for (var i = 0; i < this.col + 1; i++) {
                var posX = segX * i;
                var posY = segY * j;
                mesh.vertices.push(new Vector3(posX, posY));
            }
        }
        //index
        mesh.triangles = [];
        for (var j = 0; j < this.row; j++) {
            for (var i = 0; i < this.col; i++) {
                var leftTop = j * (this.col + 1) + i;
                var leftBottom = leftTop + (this.col + 1);
                var rightTop = leftTop + 1;
                var rightBottom = leftBottom + 1;
                mesh.triangles.push(leftTop, rightTop, rightBottom);
                mesh.triangles.push(leftTop, rightBottom, leftBottom);
            }
        }
        return mesh;
    };
    Book.prototype.CreateCamera = function () {
        var camera = new Camera();
        camera.mode = ProjectMode.Ortho;
        camera.near = -1000;
        camera.far = 1000;
        camera.aspect = this.width / this.height;
        camera.eye = new Vector3(this.width / 2, this.height / 2);
        camera.target = Vector3.Add(camera.eye, new Vector3(0, 0, 1));
        camera.top = new Vector3(0, 1, 0);
        camera.orthoSize = this.height;
        return camera;
    };
    Book.prototype.Load = function () {
        var material = new Material(this._gl);
        material.Load(this.vs, this.fs);
        this.material = material;
        this.mesh = this.CreatePlane();
        this.camera = this.CreateCamera();
        //var render = new MeshRender(this._gl);
        var render = new WireFrameMeshRender(this._gl);
        render.material = material;
        render.mesh = this.mesh;
        render.camera = this.camera;
        render.transform = new Transform();
        ;
        render.LoadMesh();
        this.render = render;
    };
    Book.prototype.Draw = function () {
        this.render.Draw();
    };
    return Book;
})();
