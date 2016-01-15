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
var Materail = (function () {
    function Materail() {
    }
    return Materail;
})();
var Texture = (function () {
    function Texture() {
    }
    return Texture;
})();
var Context = (function () {
    function Context(canvas) {
        this.canvas = canvas;
    }
    Context.prototype.InitGL = function () {
        try {
            this.gl = this.canvas.getContext("experimental-webgl");
            this.gl.viewportWidth = this.canvas.width;
            this.gl.viewportHeight = this.canvas.height;
            this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
            this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        }
        catch (e) { }
        if (!this.gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    };
    Context.prototype.CreateVertexShader = function (str) {
        var shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        if (this.CompileShader(shader, str)) {
            return shader;
        }
        else {
            return null;
        }
    };
    Context.prototype.CreateFragmentShader = function (str) {
        var shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        if (this.CompileShader(shader, str)) {
            return shader;
        }
        else {
            return null;
        }
    };
    Context.prototype.CompileShader = function (shader, str) {
        this.gl.shaderSource(shader, str);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            alert(this.gl.getShaderInfoLog(shader));
            return false;
        }
        return true;
    };
    Context.prototype.CreateProgram = function (vs, fs) {
        var fragmentShader = this.CreateVertexShader(vs);
        var vertexShader = this.CreateFragmentShader(fs);
        var shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);
        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
            return null;
        }
        return shaderProgram;
    };
    return Context;
})();
