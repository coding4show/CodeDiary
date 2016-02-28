/**
 * ObjectParser
 */
/// <reference path="Render.ts" />
var ObjectParser = (function () {
    function ObjectParser() {
        //Cache
        this.vertexCache = [];
        this.uvCache = [];
        this.normalCache = [];
        //Mesh Element
        this.vertices = [];
        this.uvs = [];
        this.normals = [];
        this.triangles = [];
    }
    //Ignore First Word
    ObjectParser.prototype.ParseVector3 = function (words) {
        if (words.length == 4) {
            var x = parseFloat(words[1]);
            var y = parseFloat(words[2]);
            var z = parseFloat(words[3]);
            return new Vector3(x, y, z);
        }
        return null;
    };
    //Ignore First Word
    ObjectParser.prototype.ParseVector2 = function (words) {
        if (words.length == 3) {
            var x = parseFloat(words[1]);
            var y = parseFloat(words[2]);
            return new Vector2(x, y);
        }
        return null;
    };
    //解析Face的一个元素
    ObjectParser.prototype.ParseElement = function (word) {
        var words = word.split("/");
        var posIndex = parseInt(words[0]);
        if (posIndex < 1 || posIndex > this.vertexCache.length) {
            console.log("Error!");
        }
        this.vertices.push(this.vertexCache[posIndex - 1]);
        //uv
        if (words.length >= 2 && words[1].length > 0) {
            var uvIndex = parseInt(words[1]);
            this.uvs.push(this.uvCache[uvIndex - 1]);
        }
        //normal
        if (words.length >= 3 && words[2].length > 0) {
            var normalIndex = parseInt(words[2]);
            this.normals.push(this.normalCache[normalIndex - 1]);
        }
    };
    //Ignore First Word
    ObjectParser.prototype.ParseFace = function (words) {
        var vertexCount = this.vertices.length;
        if (words.length == 4) {
            for (var i = 1; i < words.length; ++i) {
                this.ParseElement(words[i]);
            }
            this.triangles.push(vertexCount, vertexCount + 1, vertexCount + 2);
        }
        else if (words.length == 5) {
            for (var i = 1; i < words.length; ++i) {
                this.ParseElement(words[i]);
            }
            this.triangles.push(vertexCount, vertexCount + 1, vertexCount + 2, vertexCount, vertexCount + 2, vertexCount + 3);
        }
    };
    ObjectParser.prototype.ParseLines = function (fileContent) {
        var lines = fileContent.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var element = lines[i];
            if (element.charAt(0) == "#") {
                continue;
            }
            var words = element.split(" ");
            switch (words[0]) {
                case 'v':
                    this.vertexCache.push(this.ParseVector3(words));
                    break;
                case 'vt':
                    this.uvCache.push(this.ParseVector2(words));
                    break;
                case "vn":
                    this.normalCache.push(this.ParseVector3(words));
                    break;
                case 'f':
                    this.ParseFace(words);
                    break;
                default: break;
            }
        }
    };
    ObjectParser.prototype.Parse = function (fileContent) {
        this.ParseLines(fileContent);
        var mesh = new Mesh();
        mesh.vertices = this.vertices;
        mesh.uv = this.uvs;
        mesh.triangles = this.triangles;
        return mesh;
    };
    return ObjectParser;
})();
