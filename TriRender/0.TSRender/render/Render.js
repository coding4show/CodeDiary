/**
 * Color
 */
var Color = (function () {
    function Color(r, g, b, a) {
        if (r === void 0) { r = 0; }
        if (g === void 0) { g = 0; }
        if (b === void 0) { b = 0; }
        if (a === void 0) { a = 0; }
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    return Color;
})();
/**
 * Utils
 */
var Utils = (function () {
    function Utils() {
    }
    Utils.ConvertVector3Array2Float32Array = function (vertices) {
        var re = new Float32Array(vertices.length * 3);
        for (var i = 0; i < vertices.length; ++i) {
            re[i * 3 + 0] = vertices[i].x;
            re[i * 3 + 1] = vertices[i].y;
            re[i * 3 + 2] = vertices[i].z;
        }
        return re;
    };
    Utils.ConvertVector2Array2Float32Array = function (vertices) {
        var re = new Float32Array(vertices.length * 2);
        for (var i = 0; i < vertices.length; ++i) {
            re[i * 2 + 0] = vertices[i].x;
            re[i * 2 + 1] = vertices[i].y;
        }
        return re;
    };
    Utils.ConvertNumberArray2Uint16Array = function (nums) {
        var re = new Uint16Array(nums.length);
        for (var i = 0; i < nums.length; ++i) {
            re[i] = nums[i];
        }
        return re;
    };
    return Utils;
})();
/**
 * Transform
 */
var Transform = (function () {
    function Transform() {
        this.parent = null;
        this.position = Vector3.zero;
        this.scale = Vector3.one;
        this.rotation = Vector3.zero;
    }
    Transform.prototype.GetModelMatrix = function () {
        return Matrix4x4.TRS(this.position, this.rotation, this.scale);
    };
    Transform.prototype.GetNormalMatrix = function () {
        var reversScale = new Vector3(1 / this.scale.x, 1 / this.scale.y, 1 / this.scale.z);
        reversScale.Normalize();
        return Matrix4x4.MultiplyMatrix4x4(Matrix4x4.RotationFromEuler(this.rotation), Matrix4x4.Scale(reversScale));
    };
    return Transform;
})();
/**
 * Texture
 */
var Texture = (function () {
    function Texture(gl) {
        this._gl = gl;
    }
    Object.defineProperty(Texture.prototype, "texture", {
        get: function () {
            return this._texture;
        },
        enumerable: true,
        configurable: true
    });
    Texture.prototype.Load = function (image) {
        var gl = this._gl;
        this._texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    return Texture;
})();
/**
 * Material
 */
var Material = (function () {
    function Material(gl) {
        this._textures = {};
        this._gl = gl;
    }
    Material.prototype.Register = function (name, texture) {
        this._textures[name] = texture;
    };
    Material.prototype.UseTextures = function () {
        var gl = this._gl;
        var index = 0;
        for (var textureName in this._textures) {
            if (this._textures.hasOwnProperty(textureName)) {
                var texture = this._textures[textureName];
                gl.activeTexture(gl.TEXTURE0 + index);
                gl.bindTexture(gl.TEXTURE_2D, texture.texture);
                gl.uniform1i(this.GetUniformLocation(textureName), index);
            }
        }
    };
    Material.prototype.Load = function (vs, fs) {
        this._program = this.CreateProgram(vs, fs);
    };
    Material.prototype.Unload = function () {
    };
    Material.prototype.Use = function () {
        this._gl.useProgram(this._program);
    };
    Material.prototype.GetAttribLocation = function (name) {
        var re = this._gl.getAttribLocation(this._program, name);
        this._gl.enableVertexAttribArray(re);
        return re;
    };
    Material.prototype.GetUniformLocation = function (name) {
        var re = this._gl.getUniformLocation(this._program, name);
        return re;
    };
    Material.prototype.SetUniformMatrix4fv = function (name, mtx) {
        var uniformLocation = this.GetUniformLocation(name);
        this._gl.uniformMatrix4fv(uniformLocation, false, mtx.ToFloat32Array());
    };
    Material.prototype.SetUniform4f = function (name, x, y, z, w) {
        var uniformLocation = this.GetUniformLocation(name);
        this._gl.uniform4f(uniformLocation, x, y, z, w);
    };
    Material.prototype.CreateVertexShader = function (str) {
        var shader = this._gl.createShader(this._gl.VERTEX_SHADER);
        if (this.CompileShader(shader, str)) {
            return shader;
        }
        else {
            return null;
        }
    };
    Material.prototype.CreateFragmentShader = function (str) {
        var shader = this._gl.createShader(this._gl.FRAGMENT_SHADER);
        if (this.CompileShader(shader, str)) {
            return shader;
        }
        else {
            return null;
        }
    };
    Material.prototype.CompileShader = function (shader, str) {
        this._gl.shaderSource(shader, str);
        this._gl.compileShader(shader);
        if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
            alert(this._gl.getShaderInfoLog(shader));
            return false;
        }
        return true;
    };
    Material.prototype.CreateProgram = function (vs, fs) {
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
    };
    return Material;
})();
/**
 * Mesh
 */
var Mesh = (function () {
    function Mesh() {
    }
    Mesh.CreateBox = function () {
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
    };
    return Mesh;
})();
var ProjectMode;
(function (ProjectMode) {
    ProjectMode[ProjectMode["Perspective"] = 0] = "Perspective";
    ProjectMode[ProjectMode["Ortho"] = 1] = "Ortho";
})(ProjectMode || (ProjectMode = {}));
/**
 * Camera
 */
var Camera = (function () {
    function Camera() {
    }
    Camera.prototype.GetViewMatrix = function () {
        return Matrix4x4.LookAt(this.eye, this.target, this.top);
    };
    Camera.prototype.GetProjectMatrix = function () {
        if (this.mode == ProjectMode.Perspective) {
            return Matrix4x4.Perspective(this.fov, this.aspect, this.near, this.far);
        }
        else {
            var halfHeight = this.orthoSize / 2;
            var halfWidth = halfHeight * this.aspect;
            return Matrix4x4.Ortho(-halfWidth, halfWidth, -halfHeight, halfHeight, this.near, this.far);
        }
    };
    return Camera;
})();
/**
 * MeshRender
 */
var MeshRender = (function () {
    function MeshRender(gl) {
        this._gl = gl;
    }
    MeshRender.prototype.LoadMesh = function () {
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
    };
    MeshRender.prototype.Draw = function () {
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
    };
    return MeshRender;
})();
/**
 * WireFrameMeshRender
 */
var WireFrameMeshRender = (function () {
    function WireFrameMeshRender(gl) {
        this._gl = gl;
    }
    WireFrameMeshRender.prototype.ConvertTriangles2Lines = function (triangles) {
        var lines = [];
        var trianglesCount = Math.floor(triangles.length / 3);
        for (var i = 0; i < trianglesCount; ++i) {
            lines.push(triangles[i * 3]);
            lines.push(triangles[i * 3 + 1]);
            lines.push(triangles[i * 3 + 1]);
            lines.push(triangles[i * 3 + 2]);
            lines.push(triangles[i * 3 + 2]);
            lines.push(triangles[i * 3]);
        }
        return lines;
    };
    WireFrameMeshRender.prototype.LoadMesh = function () {
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
    };
    WireFrameMeshRender.prototype.Draw = function () {
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
    };
    return WireFrameMeshRender;
})();
/*
 * Context
 */
var Context = (function () {
    function Context() {
    }
    Context.InitGL = function (canvas) {
        Context.canvas = canvas;
        try {
            var gl;
            gl = canvas.getContext("experimental-webgl");
            gl.viewport(0, 0, canvas.width, canvas.height);
            //TestClear
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.enable(gl.DEPTH_TEST);
            Context.gl = gl;
        }
        catch (e) { }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    };
    return Context;
})();
/**
 * FileLoader
 */
var FileLoader = (function () {
    function FileLoader() {
    }
    FileLoader.prototype.Load = function (url, callback) {
        var request = new XMLHttpRequest();
        request.responseType = "text";
        request.onload = function () {
            callback(request.responseText);
        };
        request.open("GET", url, true);
        request.send(null);
    };
    return FileLoader;
})();
