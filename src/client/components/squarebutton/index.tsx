import './index.scss';
import * as React from 'react';
import { useState } from 'react';
import { Icon } from '@components/icon';

export const SquareButton = ({icon, onClick=()=>0, defaultActive=false}:{icon:string, onClick?:any, defaultActive?:boolean }) => {

    const [active, setActive] = useState(defaultActive);

    return(
        <div 
            className="squarebutton"
            onClick={ () => { setActive(active); onClick(); } }
            >
            <Icon icon={icon} />
        </div>
    )
};