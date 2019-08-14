import React from 'react'
import './Canvas.css';
import { IColour } from '../utils/functions/utils';


interface IPixelProps{
    pixel: IColour;
}


function toHex(red: number,green: number,blue: number){


    let r = Math.round((red * 225)).toString(16);
    let g = Math.round((green * 225)).toString(16);
    let b = Math.round((blue * 225)).toString(16);

    /*
    * Prefix single values with a 0.
    */
        if(r.length === 1) {
            r = 0 + r;
        }
        if(g.length === 1) {
            g = 0 + g;
        }
        if(b.length === 1) {
            b = 0 + b;
        }

        return r + g + b;

}


export class Pixel extends React.Component<IPixelProps>{

    public render(){

        let pixelColour = {
            backgroundColor: "#000000",
            height: "10px",
            width: "10px"
        }

        pixelColour.backgroundColor = "#".concat(toHex(this.props.pixel.red,this.props.pixel.green,this.props.pixel.blue));


        return(
        <div style={pixelColour} className="pixel">

        </div>
        );

    }
}
