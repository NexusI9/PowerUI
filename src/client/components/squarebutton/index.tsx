import './index.scss';
import * as React from 'react';
import { useState } from 'react';

export const SquareButton = ({icon, onClick=()=>0, defaultActive=false}:{icon:string, onClick?:any, defaultActive?:boolean }) => {

    const [active, setActive] = useState(defaultActive);
    const DynamicIcon = icon;

    return(
        <div 
            className="squarebutton"
            onClick={ () => { setActive(active); onClick(); } }
            >
            <DynamicIcon />
        </div>
    )
};