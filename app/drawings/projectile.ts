import { ICanvas, Canvas } from "../../src/utils/canvas/canvas";
import { Point, Vector } from "../../src/utils/functions/utils";


export interface IProjectile{
    position: Point;    velocity: Vector;
}

export class Projectile implements IProjectile{
    position: Point;    velocity: Vector;
    constructor(p: Point, v: Vector){
        this.position = p;
        this.velocity = v;
    }
}

export interface IEnvironment{
    gravity: Vector;
    wind: Vector;
}

export class Environment implements IEnvironment{
    gravity: Vector;    wind: Vector;
    constructor(g: Vector, w: Vector){
        this.gravity = g;
        this.wind = w;
    }


}

export function tick(env, proj): Projectile{
    let position = proj.position + proj.velocity;
    let velocity = proj.velocity + env.gravity + env.wind;

    return new Projectile(position, velocity);

}

// export function Trajectory(): Projectile{
//     let canvas: ICanvas = new Canvas(20,20);
//     let env: IEnvironment = new Environment(new Vector(0,1,0),new Vector(1,0,0));
//     let proj: IProjectile = new Projectile(new Point(0,20,0,), new Vector(5,5,0));

//     return tick(env,proj);

// }
