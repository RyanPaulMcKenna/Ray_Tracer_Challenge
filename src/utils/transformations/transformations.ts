import { IdentityMatrix } from '../matrices/matrices';


export class Translation extends IdentityMatrix{

    constructor(x: number, y: number, z:number){
        super();

        this.matrix[0][3] = x;
        this.matrix[1][3] = y;
        this.matrix[2][3] = z;


    }

}

export class Scaling extends IdentityMatrix{

    constructor(x: number, y: number, z:number){
        super();

        this.matrix[0][0] = x;
        this.matrix[1][1] = y;
        this.matrix[2][2] = z;


    }

}

export class Rotation_X extends IdentityMatrix{

    constructor(r: number){
        super();

        this.matrix[1][1] = Math.cos(r);
        this.matrix[2][1] = Math.sin(r);
        this.matrix[1][2] = -Math.sin(r);
        this.matrix[2][2] = Math.cos(r);

    }

}


export class Rotation_Y extends IdentityMatrix{

    constructor(r: number){
        super();

        this.matrix[0][0] = Math.cos(r);
        this.matrix[0][2] = Math.sin(r);
        this.matrix[2][0] = -Math.sin(r);
        this.matrix[2][2] = Math.cos(r);

    }

}

export class Rotation_Z extends IdentityMatrix{

    constructor(r: number){
        super();

        this.matrix[0][0] = Math.cos(r);
        this.matrix[0][1] = -Math.sin(r);
        this.matrix[1][0] = Math.sin(r);
        this.matrix[1][1] = Math.cos(r);

    }

}


export class Shearing extends IdentityMatrix{
    constructor(xy: number, xz: number, yx: number, yz: number, zx: number, zy: number){
        super();

        this.matrix[0][1] = xy;
        this.matrix[0][2] = xz;

        this.matrix[1][0] = yx;
        this.matrix[1][2] = yz;

        this.matrix[2][0] = zx;
        this.matrix[2][1] = zy;
    }


}
