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
    Vector3.prototype.Length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    Vector3.prototype.Normalize = function () {
    };
    Object.defineProperty(Vector3, "zero", {
        //
        // Static Properties
        //
        get: function () {
            return new Vector3(0, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "one", {
        get: function () {
            return new Vector3(1, 1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "back", {
        get: function () {
            return new Vector3(0, 0, -1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "left", {
        get: function () {
            return new Vector3(-1, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "up", {
        get: function () {
            return new Vector3(0, 1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "down", {
        get: function () {
            return new Vector3(0, -1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "right", {
        get: function () {
            return new Vector3(1, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "front", {
        get: function () {
            return new Vector3(0, 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    //
    // Static Method
    //
    Vector3.Add = function (a, b) {
        return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
    };
    Vector3.Subtract = function (a, b) {
        return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
    };
    Vector3.ScaleS = function (a, b) {
        return new Vector3(a.x * b, a.y * b, a.z * b);
    };
    Vector3.ScaleV = function (a, b) {
        return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
    };
    Vector3.Lerp = function (a, b, t) {
        return Vector3.Add(a, Vector3.ScaleS(Vector3.Subtract(b, a), t));
    };
    Vector3.Dot = function (a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    };
    Vector3.Cross = function (a, b) {
        return new Vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    };
    return Vector3;
})();
/**
 * Quaternion
 */
var Quaternion = (function () {
    function Quaternion(x, y, z, w) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (w === void 0) { w = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    Object.defineProperty(Quaternion, "identity", {
        get: function () {
            return new Quaternion();
        },
        enumerable: true,
        configurable: true
    });
    return Quaternion;
})();
/**
 * Matrix
 */
var Matrix4x4 = (function () {
    function Matrix4x4() {
    }
    Matrix4x4.prototype.ToFloat32Array = function () {
        var re = new Float32Array(16);
        re[0] = this.m00;
        re[4] = this.m01;
        re[8] = this.m02;
        re[12] = this.m03;
        re[1] = this.m10;
        re[5] = this.m11;
        re[9] = this.m12;
        re[13] = this.m13;
        re[2] = this.m20;
        re[6] = this.m21;
        re[10] = this.m22;
        re[14] = this.m23;
        re[3] = this.m30;
        re[7] = this.m31;
        re[11] = this.m32;
        re[15] = this.m33;
        return re;
    };
    Object.defineProperty(Matrix4x4, "identity", {
        get: function () {
            var re = new Matrix4x4();
            re.m00 = 1;
            re.m01 = 0;
            re.m02 = 0;
            re.m03 = 0;
            re.m10 = 0;
            re.m11 = 1;
            re.m12 = 0;
            re.m13 = 0;
            re.m20 = 0;
            re.m21 = 0;
            re.m22 = 1;
            re.m23 = 0;
            re.m30 = 0;
            re.m31 = 0;
            re.m32 = 0;
            re.m33 = 1;
            return re;
        },
        enumerable: true,
        configurable: true
    });
    Matrix4x4.MultiplyMatrix4x4 = function (lhs, rhs) {
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
            re.m33 = lhs.m30 * rhs.m03 + lhs.m31 * rhs.m13 + lhs.m32 * rhs.m23 + lhs.m33 * rhs.m33;
        return re;
    };
    Matrix4x4.prototype.MultiplyVector3 = function (v) {
        var result = new Vector3();
        result.x = this.m00 * v.x + this.m01 * v.y + this.m02 * v.z + this.m03;
        result.y = this.m10 * v.x + this.m11 * v.y + this.m12 * v.z + this.m13;
        result.z = this.m20 * v.x + this.m21 * v.y + this.m22 * v.z + this.m23;
        return result;
    };
    Matrix4x4.TRS = function (pos, r, s) {
        var mtxTranslation = Matrix4x4.Translation(pos);
        var mtxRotation = Matrix4x4.RotationFromEuler(r);
        var mtxScale = Matrix4x4.Scale(s);
        return Matrix4x4.MultiplyMatrix4x4(Matrix4x4.MultiplyMatrix4x4(mtxRotation, mtxScale), mtxTranslation);
    };
    Matrix4x4.Translation = function (tr) {
        var re = new Matrix4x4();
        re.m00 = 1;
        re.m01 = 0;
        re.m02 = 0;
        re.m03 = tr.x;
        re.m10 = 0;
        re.m11 = 1;
        re.m12 = 0;
        re.m13 = tr.y;
        re.m20 = 0;
        re.m21 = 0;
        re.m22 = 1;
        re.m23 = tr.z;
        re.m30 = 0;
        re.m31 = 0;
        re.m32 = 0;
        re.m33 = 1;
        /*
        re.m00 = 1; re.m01 = 0; re.m02 = 0; re.m03 = 0;
        re.m10 = 0; re.m11 = 1; re.m12 = 0; re.m13 = 0;
        re.m20 = 0; re.m21 = 0; re.m22 = 1; re.m23 = 0;
        re.m30 = tr.x; re.m31 = tr.y; re.m32 = tr.z; re.m33 = 1;
        */
        return re;
    };
    Matrix4x4.RotationFromEulerX = function (r) {
        var re = new Matrix4x4();
        var cos = Math.cos(r);
        var sin = Math.sin(r);
        re.m00 = 1;
        re.m01 = 0;
        re.m02 = 0;
        re.m03 = 0;
        re.m10 = 0;
        re.m11 = cos;
        re.m12 = -sin;
        re.m13 = 0;
        re.m20 = 0;
        re.m21 = sin;
        re.m22 = cos;
        re.m23 = 0;
        re.m30 = 0;
        re.m31 = 0;
        re.m32 = 0;
        re.m33 = 1;
        return re;
    };
    Matrix4x4.RotationFromEulerY = function (r) {
        var re = new Matrix4x4();
        var cos = Math.cos(r);
        var sin = Math.sin(r);
        re.m00 = cos;
        re.m01 = 0;
        re.m02 = sin;
        re.m03 = 0;
        re.m10 = 0;
        re.m11 = 1;
        re.m12 = 0;
        re.m13 = 0;
        re.m20 = -sin;
        re.m21 = 0;
        re.m22 = cos;
        re.m23 = 0;
        re.m30 = 0;
        re.m31 = 0;
        re.m32 = 0;
        re.m33 = 1;
        return re;
    };
    Matrix4x4.RotationFromEulerZ = function (r) {
        var re = new Matrix4x4();
        var cos = Math.cos(r);
        var sin = Math.sin(r);
        re.m00 = cos;
        re.m01 = -sin;
        re.m02 = 0;
        re.m03 = 0;
        re.m10 = sin;
        re.m11 = cos;
        re.m12 = 0;
        re.m13 = 0;
        re.m20 = 0;
        re.m21 = 0;
        re.m22 = 1;
        re.m23 = 0;
        re.m30 = 0;
        re.m31 = 0;
        re.m32 = 0;
        re.m33 = 1;
        return re;
    };
    //TODO
    Matrix4x4.RotationFromEuler = function (r) {
        var mtxRotateX = Matrix4x4.RotationFromEulerX(r.x);
        var mtxRotateY = Matrix4x4.RotationFromEulerY(r.y);
        var mtxRotateZ = Matrix4x4.RotationFromEulerZ(r.z);
        return Matrix4x4.MultiplyMatrix4x4(mtxRotateX, Matrix4x4.MultiplyMatrix4x4(mtxRotateZ, mtxRotateY));
    };
    //TODO
    Matrix4x4.RotationFromQuaternion = function (q) {
        return Matrix4x4.identity;
    };
    Matrix4x4.Scale = function (s) {
        var re = new Matrix4x4();
        re.m00 = s.x;
        re.m01 = 0;
        re.m02 = 0;
        re.m03 = 0;
        re.m10 = 0;
        re.m11 = s.y;
        re.m12 = 0;
        re.m13 = 0;
        re.m20 = 0;
        re.m21 = 0;
        re.m22 = s.z;
        re.m23 = 0;
        re.m30 = 0;
        re.m31 = 0;
        re.m32 = 0;
        re.m33 = 1;
        return re;
    };
    //TODO
    Matrix4x4.Perspective = function (fov, aspect, zNear, zFar) {
        return Matrix4x4.identity;
    };
    //TODO
    Matrix4x4.Ortho = function (left, right, bottom, top, zNear, zFar) {
        return Matrix4x4.identity;
    };
    return Matrix4x4;
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
        this.parent = null;
        this.position = Vector3.zero;
        this.scale = Vector3.one;
        this.rotation = Vector3.zero;
    }
    Transform.prototype.Use = function () {
        var curMatrix = Matrix4x4.TRS(this.position, this.rotation, this.scale);
        var modelviewLocation = Context.currentMaterail.modelviewLocation;
        Context.gl.uniformMatrix4fv(modelviewLocation, false, curMatrix.ToFloat32Array());
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
 * Material
 */
var Material = (function () {
    function Material() {
    }
    Object.defineProperty(Material.prototype, "verticesLocation", {
        get: function () {
            return this._verticesLocation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "modelviewLocation", {
        get: function () {
            return this._modelviewLocation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "projectLocation", {
        get: function () {
            return this._projectLocation;
        },
        enumerable: true,
        configurable: true
    });
    Material.prototype.Load = function (vs, fs) {
        this._program = this.CreateProgram(vs, fs);
    };
    Material.prototype.Unload = function () {
    };
    Material.prototype.Use = function () {
        Context.gl.useProgram(this._program);
        this._verticesLocation = Context.gl.getAttribLocation(this._program, "aVertexPosition");
        Context.gl.enableVertexAttribArray(this._verticesLocation);
        this._modelviewLocation = Context.gl.getUniformLocation(this._program, "uMVMatrix");
        this._projectLocation = Context.gl.getUniformLocation(this._program, "uPMatrix");
        Context.currentMaterail = this;
    };
    Material.prototype.CreateVertexShader = function (str) {
        var shader = Context.gl.createShader(Context.gl.VERTEX_SHADER);
        if (this.CompileShader(shader, str)) {
            return shader;
        }
        else {
            return null;
        }
    };
    Material.prototype.CreateFragmentShader = function (str) {
        var shader = Context.gl.createShader(Context.gl.FRAGMENT_SHADER);
        if (this.CompileShader(shader, str)) {
            return shader;
        }
        else {
            return null;
        }
    };
    Material.prototype.CompileShader = function (shader, str) {
        Context.gl.shaderSource(shader, str);
        Context.gl.compileShader(shader);
        if (!Context.gl.getShaderParameter(shader, Context.gl.COMPILE_STATUS)) {
            alert(Context.gl.getShaderInfoLog(shader));
            return false;
        }
        return true;
    };
    Material.prototype.CreateProgram = function (vs, fs) {
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
    return Material;
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
        var projectLocation = Context.currentMaterail.projectLocation;
        Context.gl.uniformMatrix4fv(projectLocation, false, Matrix4x4.identity.ToFloat32Array());
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
    var mat = new Material();
    mat.Load(vs, fs);
    mat.Use();
    var mesh = new Mesh();
    mesh.vertices = [new Vector3(), new Vector3(0.5, 0, 0), new Vector3(0, 0.5, 0)];
    mesh.triangles = [0, 1, 2];
    mesh.Load();
    var f = 0;
    setInterval(function () {
        Context.gl.clear(Context.gl.COLOR_BUFFER_BIT | Context.gl.DEPTH_BUFFER_BIT);
        f += 0.03;
        var transform = new Transform();
        transform.position = new Vector3(-0.5);
        transform.rotation = new Vector3(0, f, 0);
        transform.Use();
        var camera = new Camera();
        camera.Use();
        mesh.Draw();
    }, 16);
}
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
