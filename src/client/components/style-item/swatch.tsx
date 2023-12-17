import { StyleItem } from '@lib/interfaces';
import { rgb } from './swatch.helper';
import './swatch.scss';


export const Swatch = (props: any) => (<>
    {
        props.paints.map( (paint:any) => 
            <div key={props.id} className="style-item-swatch" style={{ backgroundColor: rgb(paint.color) }}>
            </div> 
            )
    }
</>);