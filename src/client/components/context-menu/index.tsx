import './index.scss';
import { ContextMenuCommand, ContextMenu as ContextMenuInterface } from "@lib/interfaces";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { send } from "@lib/ipc";
import { destroy as destroyTooltip } from '@lib/slices/slice.tooltip';
import { destroy as destroyContextMenu } from '@lib/slices/slice.contextmenu';
import { useDispatch } from 'react-redux';
import { clamp } from '@lib/utils/utils';

export const ContextMenu = () => {

    const dispatch = useDispatch();
    const { commands, position, id } = useSelector((state: { contextmenu: ContextMenuInterface }) => state.contextmenu);
    const [display, setDisplay] = useState(false);
    const MENU_WIDTH = 160;
    const lastId = useRef(id);

    useEffect(() => { lastId.current = id; }, [display]);

    useEffect(() => {

        const onClick = () => {
            //if new id has same as before means user clicked outside (since no new id invoked)
            if (lastId.current === id) {
                dispatch(destroyContextMenu());
            }else{
                lastId.current = id;   
            }
        };
        window.addEventListener('click', onClick);
        dispatch(destroyTooltip());
        setDisplay(!!commands.length);

        return () => {
            lastId.current = id;
            window.removeEventListener('click', onClick);
        }

    }, [id]);


    return (
        <ul
            className={`context-menu panel ${!display && 'hide' || ''} pop`}
            style={{ top: `${position.y}px`, left: `${clamp(0, position.x, window.innerWidth - 1.1 * MENU_WIDTH) || position.x}px` }}
        >
            {commands?.map((command, i) => {
                if(Array.isArray(command) ){
                    return <Fragment key={JSON.stringify(command) + i}>{command.map( cm => <li key={JSON.stringify(cm) + i} onClick={() => send({ action: cm.action, ...cm.payload })}>{cm.text}</li>)}{i < command.length-1 ? <hr/> : <></>}</Fragment>
                }else{
                    return(<li key={JSON.stringify(command) + i} onClick={() => send({ action: command.action, ...command.payload })}>{command.text}</li>)
                }
            })}
        </ul>
    );

}