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
        var length = this.Length();
        if (length > 0) {
            this.x /= length;
            this.y /= length;
            this.z /= length;
        }
        else {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
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
    Vector3.Normalize = function (a) {
        var length = a.Length();
        if (length > 0) {
            return Vector3.ScaleS(a, 1 / length);
        }
        else {
            return Vector3.zero;
        }
    };
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
    Matrix4x4.prototype.GetTranspose = function () {
        var re = new Matrix4x4();
        re.m00 = this.m00;
        re.m01 = this.m00;
        re.m02 = this.m20;
        re.m03 = this.m30;
        re.m10 = this.m01;
        re.m11 = this.m11;
        re.m12 = this.m21;
        re.m13 = this.m31;
        re.m20 = this.m02;
        re.m21 = this.m12;
        re.m22 = this.m22;
        re.m23 = this.m32;
        re.m30 = this.m03;
        re.m31 = this.m13;
        re.m32 = this.m23;
        re.m33 = this.m33;
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
        return Matrix4x4.MultiplyMatrix4x4(Matrix4x4.MultiplyMatrix4x4(mtxTranslation, mtxRotation), mtxScale);
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
    //需要优化
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
    Matrix4x4.Perspective = function (fov, aspect, zNear, zFar) {
        var halfAngle = fov * Math.PI / 180 / 2;
        var cot = 1 / Math.tan(halfAngle);
        var re = new Matrix4x4();
        re.m00 = cot / aspect;
        re.m01 = 0;
        re.m02 = 0;
        re.m03 = 0;
        re.m10 = 0;
        re.m11 = cot;
        re.m12 = 0;
        re.m13 = 0;
        re.m20 = 0;
        re.m21 = 0;
        re.m22 = (zFar + zNear) / (zFar - zNear);
        re.m23 = -zFar * zNear / (zFar - zNear);
        re.m30 = 0;
        re.m31 = 0;
        re.m32 = 1;
        re.m33 = 1;
        return re;
    };
    Matrix4x4.Ortho = function (left, right, bottom, top, zNear, zFar) {
        var re = new Matrix4x4();
        re.m00 = 2 / (right - left);
        re.m01 = 0;
        re.m02 = 0;
        re.m03 = -(right + left) / (right - left);
        re.m10 = 0;
        re.m11 = 2 / (top - bottom);
        re.m12 = 0;
        re.m13 = -(top + bottom) / (top - bottom);
        re.m20 = 0;
        re.m21 = 0;
        re.m22 = 2 / (zFar - zNear);
        re.m23 = -(zFar + zNear) / (zFar - zNear);
        re.m30 = 0;
        re.m31 = 0;
        re.m32 = 0;
        re.m33 = 1;
        return re;
    };
    Matrix4x4.LookAt = function (eye, target, top) {
        var look = Vector3.Normalize(Vector3.Subtract(target, eye));
        var right = Vector3.Normalize(Vector3.Cross(top, look));
        var up = Vector3.Normalize(Vector3.Cross(look, right));
        var re = new Matrix4x4();
        re.m00 = right.x;
        re.m01 = right.y;
        re.m02 = right.z;
        re.m03 = -Vector3.Dot(right, eye);
        re.m10 = up.x;
        re.m11 = up.y;
        re.m12 = up.z;
        re.m13 = -Vector3.Dot(up, eye);
        re.m20 = look.x;
        re.m21 = look.y;
        re.m22 = look.z;
        re.m23 = -Vector3.Dot(look, eye);
        re.m30 = 0;
        re.m31 = 0;
        re.m32 = 0;
        re.m33 = 1;
        return re;
    };
    return Matrix4x4;
})();
