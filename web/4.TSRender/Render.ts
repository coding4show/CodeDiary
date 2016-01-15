class FileLoader
{
	Load(url: string, callback:{(textContent: string): void;})
	{
		var request = new XMLHttpRequest();
		request.responseType = "text";
		request.onload = function() { 
			callback(request.responseText);
		};
		request.open("GET", url, true);
		request.send(null);
	}
}

class Materail {
	
}

class Texture {
	
}

class Context
{
	canvas;
	gl;

	constructor(canvas)
	{
		this.canvas = canvas;
	}

	InitGL()
	{
	    try 
		{
	        this.gl = this.canvas.getContext("experimental-webgl");
			this.gl.viewportWidth = this.canvas.width;
			this.gl.viewportHeight = this.canvas.height;
	    }
		catch (e) 
		{}
	    
		if (!this.gl)
		{
	        alert("Could not initialise WebGL, sorry :-(");
	    }
	}

	CreateVertexShader(str: string)
	{
		var shader = this.gl.createShader(this.gl.VERTEX_SHADER);
		if (this.CompileShader(shader, str)){
			return shader;
		}
		else{
			return null;
		}
	}

	CreateFragmentShader(str: string)
	{
		var shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
		if (this.CompileShader(shader, str)) {
			return shader;
		}
		else{
			return null;
		}
	}

	private CompileShader(shader, str: string) : boolean
	{
		this.gl.shaderSource(shader, str);
	    this.gl.compileShader(shader);

		if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
			alert(this.gl.getShaderInfoLog(shader));
		    return false;
		}

        return true;
	}

	CreateProgram(vs: string, fs: string)
	{
		var fragmentShader = this.CreateVertexShader(vs);
		var vertexShader = this.CreateFragmentShader(fs);

        var shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);

        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }
	}
}