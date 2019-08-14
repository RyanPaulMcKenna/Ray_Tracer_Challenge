export function cross(a: Vector, b: Vector): Vector{

    return new Vector(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x)

}
export function dot(a: Vector, b: Vector): number{

    return  a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
}

export function equal(a: number, b: number): Boolean{

    let EPSILON = 0.00001;
    let diff = a -b;

    if (diff < 0)
         diff = diff * -1;

    if (diff < EPSILON){
        return true;
    }else{
        return false;
    }

}


export function equalTuples(a: Tuple, b: Tuple): Boolean{

    if(
        equal(a.x,b.x) &&
        equal(a.y,b.y) &&
        equal(a.z,b.z) &&
        equal(a.w,b.w)){

        return true;
    }else{
        return false;
    }

}

export function equalColours(a: IColour, b: IColour): Boolean{

    if(
        equal(a.red,b.red) &&
        equal(a.green,b.green) &&
        equal(a.blue,b.blue)){

        return true;
    }else{
        return false;
    }
}

export interface IColour {
	multiply(colourB: IColour): IColour;
	scale(scalar: number): IColour;
    sub(PointB: IColour): IColour;
	plus(tupleB: IColour): IColour;
    red: number;
    green: number;
    blue: number;
}


export class Colour implements IColour{

    constructor(red: number,green: number,blue: number){
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    multiply(c: IColour): IColour{
        return new Colour(this.red*c.red,this.green*c.green,this.blue*c.blue);
    }

    scale(n: number): IColour{
        return new Colour(this.red * n, this.green * n,this.blue * n);
    }

    sub(colour: IColour): IColour {
        return new Colour(this.red-colour.red,this.green-colour.green,this.blue-colour.blue);
    }

    plus(colour: IColour): IColour {
        return new Colour(this.red+colour.red,this.green+colour.green,this.blue+colour.blue);
    }

    red: number;
    green: number;
    blue: number;


}

export interface ITuple {
	divide(divisor: number): ITuple;
	scale(scalar: number): ITuple;
	negate(): ITuple;
	sub(PointB: ITuple): ITuple;
	plus(tupleB: ITuple): ITuple;
    x: number;
    y: number;
    z: number;
    w: number;
}

export class Tuple implements ITuple {
    constructor(X0: number,Y0: number,Z0 :number, W0: number){
        this.x = X0;
        this.y = Y0;
        this.z = Z0;
        this.w = W0;
    }

    //Methods
    public plus(tupleB: ITuple): ITuple {
        return new Tuple(this.x+tupleB.x,this.y+tupleB.y,this.z+tupleB.z,this.w+tupleB.w);
    }

    public sub(tupleB: ITuple): ITuple {
       return new Tuple(this.x-tupleB.x,this.y-tupleB.y,this.z-tupleB.z,this.w-tupleB.w);
    }

    public negate(): Tuple {
        return new Tuple(-this.x,-this.y,-this.z,-this.w);
    }

    public scale(scalar: number): ITuple{
        return new Tuple(this.x*scalar,this.y*scalar,this.z*scalar,this.w*scalar);
    }

    public divide(divisor: number): ITuple{
        let t = this;
        return t.scale(1/divisor);
    }

    //Members
    public x: number;
    public y: number;
    public z: number;
    public w: number;
}


export class Point extends Tuple{
    constructor(x: number, y: number, z: number){
        super(x,y,z,1);
        this.x=x;
        this.y=y;
        this.z=z;
        this.w=1;
    }

    public x: number;
    public y: number;
    public z: number;
    public w: number;

    public negate(): Point{
        throw new Error('Illegal operation: Can\'t negate a point.');
    }

    public plus(tupleB: ITuple): ITuple {
        // Point + Vector
        if(tupleB.w === 0){
           return new Point(this.x+tupleB.x,this.y+tupleB.y,this.z+tupleB.z);
        }

        throw new Error('Illegal operation: Can\'t add a Point to another Point.');
    }

    public sub(pointB: ITuple): ITuple {
        // Point - Point = Vector
        if(pointB.w === 1){
            let t1 = new Tuple(pointB.x,pointB.y,pointB.z,pointB.w);
            let t2 = new Tuple(this.x,this.y,this.z,this.w);
            let t3 = t2.sub(t1);

            return new Vector(t3.x,t3.y,t3.z);
        }
        // Point - Vector = Point
        if(pointB.w === 0){
            let t1 = new Tuple(pointB.x,pointB.y,pointB.z,pointB.w);
            let t2 = new Tuple(this.x,this.y,this.z,this.w);
            let t3 = t2.sub(t1);

            return new Point(t3.x,t3.y,t3.z);
        }

        // This should never run
        return new Tuple(0,0,0,0);

    }

}

export class Vector extends Tuple{

	public magnitude(): number {
        let xSqr = Math.pow(this.x,2);
        let ySqr = Math.pow(this.y,2);
        let zSqr = Math.pow(this.z,2);
        let wSqr = Math.pow(this.w,2);

        return Math.sqrt(xSqr+ySqr+zSqr+wSqr);
	}


    public plus(vector: Vector): Vector {
        return new Vector(this.x+vector.x,this.y+vector.y, this.z+vector.z);
    }

    public sub(tupleB: Vector): Vector {
        return new Vector(this.x-tupleB.x,this.y-tupleB.y,this.z-tupleB.z);
     }

    public normalize(): Vector {
        let magnitude =  this.magnitude();
        return new Vector(this.x/magnitude,this.y/magnitude,this.z/magnitude);
	}

    constructor(x: number, y: number, z: number){
        super(x,y,z, 0);
        this.x=x;
        this.y=y;
        this.z =z;
        this.w=0;

    }

    public x: number;
    public y: number;
    public z: number;
    public w: number;
}
