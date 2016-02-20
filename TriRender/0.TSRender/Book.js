/// <reference path="Render.ts" />
/**
 * Book.ts
 */
var Book = (function () {
    function Book(gl) {
        this._gl = gl;
    }
    Book.prototype.CreatePlane = function () {
        var mesh = new Mesh();
        mesh.vertices = [];
        var segX = this.width / this.col;
        var segY = this.height / this.row;
        for (var i = 0; i < this.col + 1; i++) {
            for (var j = 0; j < this.row + 1; j++) {
                var posX = segX * i;
                var posY = segY * j;
                mesh.vertices.push(new Vector3(posX, posY));
            }
        }
        //index
        mesh.triangles = [];
        for (var i = 0; i < this.col; i++) {
            for (var j = 0; j < this.row; j++) {
                var leftTop = j * this.col + i;
                var leftBottom = leftTop + this.col;
                var rightTop = leftTop + 1;
                var rightBottom = leftBottom + 1;
                mesh.triangles.push(leftTop, rightTop, rightBottom);
                mesh.triangles.push(leftTop, rightBottom, leftBottom);
            }
        }
        return mesh;
    };
    Book.prototype.CreateCamera = function () {
        return null;
    };
    Book.prototype.Load = function () { };
    Book.prototype.Draw = function () { };
    return Book;
})();
