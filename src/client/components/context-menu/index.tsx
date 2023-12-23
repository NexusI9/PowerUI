import './index.scss';
import { ContextMenu as ContextMenuInterface } from "@lib/interfaces";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { send } from "@lib/ipc";
import { destroy as destroyTooltip } from '@lib/slices/tooltip.slice';
import { useDispatch } from 'react-redux';

export const ContextMenu = () => {

    const dispatch = useDispatch();
    const { commands, position } = useSelector((state: { contextmenu: ContextMenuInterface }) => state.contextmenu);
    const [display, setDisplay] = useState(false);

    useEffect(() => {

        const onClick = () => {
            if(commands.length){
                setDisplay(false);
            }
        };

        console.log(commands.length);

        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    }, []);

    useEffect(() => {

        dispatch(destroyTooltip());
        setDisplay(!!commands.length);

    }, [commands]);

    return (
        <ul
            className={`context-menu panel ${!display && 'hide' || ''} pop`}
            style={{ top: `${position.y}px`, left: `${position.x}px` }}
        >
            {commands?.map((command, i) => <li key={JSON.stringify(command) + i} onClick={() => send({ type: command.action, ...command.payload })}>{command.text}</li>)}
        </ul>
    );

}