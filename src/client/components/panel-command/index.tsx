import { PanelCommand as PanelCommandInterface } from "@lib/interfaces";
import { useEffect, useState } from "react";
import './index.scss';
import { useSelector } from "react-redux";

export const PanelCommand = () => {

    const commands = useSelector( (state:{panelcommand:Array<PanelCommandInterface>}) => state.panelcommand );
    const [display, setDisplay] = useState(false);
    const [position, setPosition] = useState({x:0,y:0});
    
    useEffect( () => {
        
        const onClick = (e:any) => console.log(e);
        const onMouseMove = (e:any) => !display && setPosition({x:e.clientX, y:e.clientY});

        window.addEventListener('click', onClick);
        window.addEventListener('mousemove', onMouseMove );

        return () => {
            window.removeEventListener('click', onClick);
            window.removeEventListener('click', onMouseMove);
        }
    },[]);

    useEffect(() => {

        setDisplay(true);
        console.log({commands,position});

    },[commands]);

    return(
        <ul className={`panelCommand ${!display && 'hide' || ''}`}>
        { commands?.map(command => <li onClick={command.onClick}>{command.text}</li>) }
        </ul>
    );

}