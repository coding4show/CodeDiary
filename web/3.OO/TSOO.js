var Vector3 = (function () {
    function Vector3(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector3.prototype.Desc = function () {
        return "(" + this.x + ", " + this.y + ", " + this.z + ")";
    };
    return Vector3;
})();
var v = new Vector3(1, 2, 3);
console.log(v.Desc());
