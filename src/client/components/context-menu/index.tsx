import './index.scss';
import { ContextMenu as IContextMenu, ContextMenuCommand } from "src/types/contextmenu";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { send } from "@lib/ipc";
import { destroy as destroyTooltip } from '@lib/slices/tooltip';
import { destroy as destroyContextMenu, setActiveCommand } from '@lib/slices/contextmenu';
import { useDispatch } from 'react-redux';
import { clamp } from '@lib/utils/utils';
import { Label } from '@components/label';
import { freezeScroll } from './helper';


export const ContextMenu = () => {

    const DEFAULT_WIDTH = 160;
    const FREEZE_COMPONENTS_CLASS = ['.container', '.template-sidepanel']; //component that get frozen scroll when the context menu is enabled

    const dispatch = useDispatch();
    const { commands, position, id } = useSelector((state: { contextmenu: IContextMenu }) => state.contextmenu);
    const [display, setDisplay] = useState<boolean>(false);
    const panel = useRef<any>();
    const lastId = useRef(id);

    const routeDispatch = (command: ContextMenuCommand) => {
        switch (command.receiver) {
            case 'API':
                return send({ action: command.action || '', payload: { ...command.payload } });
            case 'STORE':
                return dispatch(setActiveCommand(command));
        }
    }

    useEffect(() => {
        //update lastId;
        lastId.current = id;
    }, [display]);


    useEffect(() => {

        const onClick = () => {
            //if new id has same as before means user clicked outside (since no new id invoked)
            if (lastId.current === id) {
                dispatch(destroyContextMenu());
            } else {
                lastId.current = id;
            }
        };

        //set panel height
        if (panel.current) {
            panel.current.style.height = 'auto';
            const { height } = panel.current.getBoundingClientRect();
            const margin = 30;
            let newHeight = (position.y + height > window.innerHeight) ? `${window.innerHeight - position.y - margin}px` : `auto`;
            panel.current.style.height = newHeight;
        }

        //freeze scroll if id (== panel open)
        freezeScroll(FREEZE_COMPONENTS_CLASS, id !== 0);

        window.addEventListener('click', onClick);
        dispatch(destroyTooltip());
        setDisplay(!!commands.length);

        return () => {
            lastId.current = id;
            window.removeEventListener('click', onClick);
        }

    }, [id]);

    return (<>
        {
            !!commands.length &&
            <ul
                className={`context-menu panel`}
                ref={panel}
                style={{
                    top: `${position.y}px`,
                    left: `${clamp(0, position.x, window.innerWidth - 1.1 * DEFAULT_WIDTH) || position.x}px`
                }}
            >
                {commands?.map((command, i) => {
                    if (Array.isArray(command)) {
                        return <Fragment key={JSON.stringify(command) + i}>
                            {
                                command.map(cm => <li key={JSON.stringify(cm) + i} onClick={() => routeDispatch(cm)}><Label iconLeft={cm.icon}>{String(cm.value)}</Label></li>)
                            }
                            {
                                i < commands.length - 1 && <hr />
                            }
                        </Fragment>
                    } else {
                        return (<li key={JSON.stringify(command) + i} onClick={() => routeDispatch(command)}><Label iconLeft={command.icon}>{String(command.value)}</Label></li>)
                    }
                })}
            </ul>
        }
    </>);

}