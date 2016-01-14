function Start() : void 
{    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.responseType = "text";
    xmlHttp.onload = function(){
        document.body.innerText = xmlHttp.responseText;
    }
    xmlHttp.open("GET", "testloadfile.txt", true);
    xmlHttp.send(null);
}

/**
 * Vector2
 */
class Vector2
{
    x : number;
    y : number;
    
    constructor(x : number = 0, y : number = 0)
    {
        this.x = x;
        this.y = y;
    }
}

/**
 * Vector3
 */
class Vector3
{
    x : number;
    y : number;
    z : number;
    
    constructor(x : number = 0, 
                y : number = 0, 
                z : number = 0){
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

/**
 * Quaternion
 */
class Quaternion
{
    x : number;
    y : number;
    z : number;
    w : number;
}

/**
 * Color
 */
class Color
{
    r : number;
    g : number;
    b : number;
    a : number;
    
    constructor(r : number = 0,
                g : number = 0,
                b : number = 0,
                a : number = 0){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

/**
 * Transform
 */
class Transform
{
    parent : Transform;
    position : Vector3;
    scale : Vector3;
    rotation : Quaternion;
}

/**
 * Mesh
 */
class Mesh
{
    vertices : Vector3[];
    uv : Vector2[];
    colors : Color[];
    triangles : number[];
}

class MeshRender
{
    mesh : Mesh;
}

class Component
{
    
}

class GameObject
{
    transform : Transform;
    compnents : Component[];
}