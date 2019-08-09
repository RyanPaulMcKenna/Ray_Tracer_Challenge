import { AssertionError } from "assert";

export function equal(a: number, b: number){

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

export function equalTuples(a: ITuple, b: ITuple){

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
    constructor(X0: number, Y0: number, Z0: number){
        super(X0,Y0,Z0,1);
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
            let t = new Tuple(this.x,this.y,this.z,this.w);
            return t.plus(tupleB);
        }
        // Point + Point
        if(tupleB.w === 1){
            throw new Error('Illegal operation: Can\'t add a Point to another Point.');
        }
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

    }

}

export class Vector extends Tuple{
	public magnitude(): number {
		return Math.sqrt(this.x^2+this.y^2+this.z^2);
	}

    constructor(X0: number, Y0: number, Z0: number){
        super(X0,Y0,Z0, 0);
    }

    public x: number;
    public y: number;
    public z: number;
    public w: number;
}
