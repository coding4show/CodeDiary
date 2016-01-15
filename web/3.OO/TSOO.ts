class Vector3
{
    x : number;
    y : number;
    z : number;
    
    constructor(x:number = 0, y:number = 0, z:number = 0)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    Desc()
    {
        return "(" + this.x + ", " + this.y + ", " + this.z + ")";
    }
}

var v : Vector3 = new Vector3(1, 2, 3);
console.log(v.Desc());