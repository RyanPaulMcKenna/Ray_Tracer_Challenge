import React from 'react'
import { IColour } from '../utils/functions/utils';
// @ts-ignore
import { Column } from '../components/Column.tsx';
import './Canvas.css';

interface IRowProps{
    row: IColour[];
}

export class Row extends React.Component<IRowProps>{


    public render(){
        return(
        <div className="row">
               {this.props.row.map((pixel: IColour,index: number) => <Column key={index+1000} pixel={pixel} /> )}

        </div>
        );

    }
}
