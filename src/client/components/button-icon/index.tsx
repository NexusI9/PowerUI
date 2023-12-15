import './index.scss';
import * as React from 'react';
import { Icon } from '@components/icon';


export const ButtonIcon = ({icon, onClick}:{icon:string, onClick:any}) => (
    <button className="button-icon" onClick={ !!onClick && onClick } >
        <Icon icon={icon}/>
    </button>
);