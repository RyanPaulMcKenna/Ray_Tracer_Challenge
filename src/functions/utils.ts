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

    public x: number;
    public y: number;
    public z: number;
    public w: number;
}


export class Point implements ITuple{
    constructor(X0: number, Y0: number, Z0: number){
        this.x = X0;
        this.y = Y0;
        this.z = Z0;
        this.w = 1;
    }
    public x: number;
    public y: number;
    public z: number;
    public w: number;
}

export class Vector implements ITuple{
    constructor(X0: number, Y0: number, Z0: number){
        this.x = X0;
        this.y = Y0;
        this.z = Z0;
        this.w = 0;
    }
    public x: number;
    public y: number;
    public z: number;
    public w: number;
}
