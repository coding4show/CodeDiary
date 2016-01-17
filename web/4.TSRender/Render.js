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
/**
 * Vector2
 */
var Vector2 = (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    return Vector2;
})();
/**
 * Vector3
 */
var Vector3 = (function () {
    function Vector3(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    return Vector3;
})();
/**
 * Quaternion
 */
var Quaternion = (function () {
    function Quaternion() {
    }
    return Quaternion;
})();
/**
 * Matrix
 */
var Matrix = (function () {
    function Matrix() {
    }
    return Matrix;
})();
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
 * Transform
 */
var Transform = (function () {
    function Transform() {
    }
    Transform.prototype.Use = function () {
        var initMatrix = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];
        var modelviewLocation = Context.currentMaterail.modelviewLocation;
        Context.gl.uniformMatrix4fv(modelviewLocation, false, new Float32Array(initMatrix));
    };
    return Transform;
})();
/**
 * Texture
 */
var Texture = (function () {
    function Texture() {
    }
    return Texture;
})();
/**
 * Materail
 */
var Materail = (function () {
    function Materail() {
    }
    Object.defineProperty(Materail.prototype, "verticesLocation", {
        get: function () {
            return this._verticesLocation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Materail.prototype, "modelviewLocation", {
        get: function () {
            return this._modelviewLocation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Materail.prototype, "projectLocation", {
        get: function () {
            return this._projectLocation;
        },
        enumerable: true,
        configurable: true
    });
    Materail.prototype.Load = function (vs, fs) {
        this._program = this.CreateProgram(vs, fs);
    };
    Materail.prototype.Unload = function () {
    };
    Materail.prototype.Use = function () {
        Context.gl.useProgram(this._program);
        this._verticesLocation = Context.gl.getAttribLocation(this._program, "aVertexPosition");
        Context.gl.enableVertexAttribArray(this._verticesLocation);
        this._modelviewLocation = Context.gl.getUniformLocation(this._program, "uMVMatrix");
        this._projectLocation = Context.gl.getUniformLocation(this._program, "uPMatrix");
        Context.currentMaterail = this;
    };
    Materail.prototype.CreateVertexShader = function (str) {
        var shader = Context.gl.createShader(Context.gl.VERTEX_SHADER);
        if (this.CompileShader(shader, str)) {
            return shader;
        }
        else {
            return null;
        }
    };
    Materail.prototype.CreateFragmentShader = function (str) {
        var shader = Context.gl.createShader(Context.gl.FRAGMENT_SHADER);
        if (this.CompileShader(shader, str)) {
            return shader;
        }
        else {
            return null;
        }
    };
    Materail.prototype.CompileShader = function (shader, str) {
        Context.gl.shaderSource(shader, str);
        Context.gl.compileShader(shader);
        if (!Context.gl.getShaderParameter(shader, Context.gl.COMPILE_STATUS)) {
            alert(Context.gl.getShaderInfoLog(shader));
            return false;
        }
        return true;
    };
    Materail.prototype.CreateProgram = function (vs, fs) {
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
    };
    return Materail;
})();
/**
 * Mesh
 */
var Mesh = (function () {
    function Mesh() {
    }
    Mesh.prototype.Load = function () {
        this._verticesBuff = Context.gl.createBuffer();
        Context.gl.bindBuffer(Context.gl.ARRAY_BUFFER, this._verticesBuff);
        Context.gl.bufferData(Context.gl.ARRAY_BUFFER, this.Vector3Array2Float32Array(this.vertices), Context.gl.STATIC_DRAW);
    };
    Mesh.prototype.Unload = function () { };
    Mesh.prototype.Draw = function () {
        Context.gl.bindBuffer(Context.gl.ARRAY_BUFFER, this._verticesBuff);
        Context.gl.vertexAttribPointer(Context.currentMaterail.verticesLocation, 3, Context.gl.FLOAT, false, 0, 0);
        Context.gl.drawArrays(Context.gl.TRIANGLES, 0, this.vertices.length);
        //Context.gl.bindBuffer(Context.gl.ELEMENT_ARRAY_BUFFER, this._trianglesBuff);
        //Context.gl.drawElements(Context.gl.TRIANGLES, 0, 0, 0);
    };
    Mesh.prototype.Vector3Array2Float32Array = function (vertices) {
        var re = new Float32Array(vertices.length * 3);
        for (var i = 0; i < vertices.length; ++i) {
            re[i * 3 + 0] = vertices[i].x;
            re[i * 3 + 1] = vertices[i].y;
            re[i * 3 + 2] = vertices[i].z;
        }
        return re;
    };
    return Mesh;
})();
/**
 * MeshRender
 */
var MeshRender = (function () {
    function MeshRender() {
    }
    return MeshRender;
})();
/**
 * GameObject
 */
var GameObject = (function () {
    function GameObject() {
    }
    return GameObject;
})();
/**
 * Camera
 */
var Camera = (function () {
    function Camera() {
    }
    Camera.prototype.Use = function () {
        var initMatrix = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];
        var projectLocation = Context.currentMaterail.projectLocation;
        Context.gl.uniformMatrix4fv(projectLocation, false, new Float32Array(initMatrix));
    };
    return Camera;
})();
/**
 * Context
 */
var Context = (function () {
    function Context() {
    }
    Context.InitGL = function (canvas) {
        Context.canvas = canvas;
        try {
            Context.gl = canvas.getContext("experimental-webgl");
            Context.gl.viewport(0, 0, canvas.width, canvas.height);
            //TestClear
            Context.gl.clearColor(0.0, 0.0, 0.0, 1.0);
            Context.gl.clear(Context.gl.COLOR_BUFFER_BIT | Context.gl.DEPTH_BUFFER_BIT);
            Context.gl.enable(Context.gl.DEPTH_TEST);
        }
        catch (e) { }
        if (!Context.gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    };
    return Context;
})();
function OnLoadShader(vs, fs) {
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
function TestDraw() {
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
    vsLoader.Load("diff.vs", function (vstext) {
        var fsLoader = new FileLoader();
        fsLoader.Load("diff.fs", function (fstext) {
            OnLoadShader(vstext, fstext);
        });
    });
}
