import './index.scss';
import {ContextMenu as ContextMenuInterface } from "@lib/interfaces";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { send } from "@lib/ipc";
import { destroy as destroyTooltip } from '@lib/slices/tooltip.slice';
import { useDispatch } from 'react-redux';

export const ContextMenu = () => {

    const dispatch = useDispatch();
    const { commands, position } = useSelector( (state:{contextmenu:ContextMenuInterface}) => state.contextmenu );
    const [display, setDisplay] = useState(false);
    
    console.log({commands, position});
    useEffect( () => {
        const onClick = () => {
            if(display){
                setDisplay(false);
            }
        };

        console.log(display);

        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    },[]);

    useEffect(() => {
        dispatch(destroyTooltip());
        setDisplay(!!commands.length);
    },[commands]);

    return(
        <ul 
            className={`context-menu panel ${!display && 'hide' || ''}`} 
            style={{top:`${position.y}px`, left:`${position.x}px`}}
        >
        { commands?.map( (command,i) => <li key={JSON.stringify(command)+i} onClick={ () => send({type:command.action, ...command.payload}) }>{command.text}</li>) }
        </ul>
    );

}