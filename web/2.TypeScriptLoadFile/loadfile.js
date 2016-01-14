function Start() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.responseType = "text";
    xmlHttp.onload = function () {
        document.body.innerText = xmlHttp.responseText;
    };
    xmlHttp.open("GET", "testloadfile.txt", true);
    xmlHttp.send(null);
}
var Vector2 = (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    return Vector2;
})();
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
var Color = (function () {
    function Color() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0;
    }
    return Color;
})();
var Mesh = (function () {
    function Mesh() {
    }
    return Mesh;
})();
var MeshRender = (function () {
    function MeshRender() {
    }
    return MeshRender;
})();
