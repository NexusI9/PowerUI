import {ContextMenu as ContextMenuInterface } from "@lib/interfaces";
import { useEffect, useState } from "react";
import './index.scss';
import { useSelector } from "react-redux";
import { send } from "@lib/ipc";

export const ContextMenu = () => {

    const { commands, position } = useSelector( (state:{contextmenu:ContextMenuInterface}) => state.contextmenu );
    const [display, setDisplay] = useState(false);
    
    useEffect( () => {
        const onClick = () => setDisplay(false);
        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    },[]);

    useEffect(() => {
        
    
        if(!!commands.length){
            setDisplay(true);
        }

    },[commands]);

    return(
        <ul 
            className={`panel-command ${!display && 'hide' || ''}`} 
            style={{top:`${position.y}px`, left:`${position.x}px`}}
        >
        { commands?.map( (command,i) => <li key={JSON.stringify(command)+i} onClick={ () => send({type:command.action, payload:command.value}) }>{command.text}</li>) }
        </ul>
    );

}