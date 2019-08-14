import React from 'react'
// @ts-ignore
import { CanvasDisplay } from './CanvasDisplay.tsx';
import  { ICanvas, Canvas } from '../utils/canvas/canvas';
import { trajectory, Environment, Projectile, IEnvironment, IProjectile } from '../physics/projectile';
import { Vector, Point, IColour, Colour } from '../utils/functions/utils';


interface IContainer{
    canvas: ICanvas
    colour: IColour;
    environment: IEnvironment;
    projectile: IProjectile;
}

export class Container extends React.Component<IContainer,IContainer>{

    constructor(props: IContainer){
        super(props);

        this.state = {
            canvas: new Canvas(100,100),
            colour: new Colour(1,0,0),
            environment: new Environment(new Vector(0,0.3,0),new Vector(0.1,0,0)),
            projectile: new Projectile(new Point(0,99,0), new Vector(1.1,-1^2*2+1,0))
        }
    }

    public componentDidMount(){

        setInterval(()=> this.tick(),0.5);
    }

    public tick = () => {

        let path = trajectory(this.state.canvas, this.state.environment, this.state.projectile, this.state.colour);

        this.setState({ canvas: path.canvas, environment: path.environment, projectile: path.projectile, colour: path.colour} );


    }

    public render(){
        return(
        <div id="container">

           <CanvasDisplay canvas={this.state.canvas.canvas}/>

        </div>
        );

    }
}

