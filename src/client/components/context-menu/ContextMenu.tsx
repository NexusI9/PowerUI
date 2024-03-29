import './ContextMenu.scss';
import { ContextMenu as IContextMenu, ContextMenuCommand } from "src/types/contextmenu";
import { BaseSyntheticEvent, Fragment, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { send } from "@lib/ipc";
import { destroy as destroyTooltip } from '@lib/slices/tooltip';
import { destroy as destroyContextMenu, setActiveCommand } from '@lib/slices/contextmenu';
import { useDispatch } from 'react-redux';
import { clamp, traverseCallback } from '@lib/utils/utils';
import { Label } from '@components/label';
import { freezeScroll, setPosition } from './ContextMenu.Helper';

export default () => {

    const DEFAULT_WIDTH = 160;
    const FREEZE_COMPONENTS_CLASS = ['.container', '.template-sidepanel']; //component that get frozen scroll when the context menu is enabled

    const dispatch = useDispatch();
    const { commands, position, id, activeCommand } = useSelector((state: { contextmenu: IContextMenu }) => state.contextmenu);
    const panel = useRef<any>();
    const lastId = useRef(id);


    useEffect(() => {

        let timeout: number;
        let query: string = '';
        const onKeyDown = (e: KeyboardEvent) => {

            //create query string
            clearTimeout(timeout);
            query += e.key.toLowerCase();
            timeout = setTimeout(() => { query = '' }, 500);

            //look for indexed values in array
            const result = indexedValues.filter(item => item.value.match(new RegExp(query)));
            if (result.length && panel.current) {
                const targetItem = panel.current.querySelector(`:nth-child(${result[0].id})`);
                //scroll to item
                if (targetItem && targetItem.offsetTop) {
                    panel.current.scrollTo(0, targetItem.offsetTop - 20);
                    targetItem.classList.add('selected');
                }
            }
        }

        //assign each values to its index (= nth child within panel) 
        const indexedValues: Array<{ value: string; id: number }> = [];
        let id = 1;
        traverseCallback(commands, (c: ContextMenuCommand) => {
            indexedValues.push({ value: (c.value as string).toLowerCase(), id: id });
            id++;
        });

        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        }
    }, [commands]);

    /*
    * Dispatch clicked command & add additional information so we can keep track of the active command position in the context menu
    */
    const routeDispatch = (command: ContextMenuCommand, element: any) => {

        const payload: IContextMenu['activeCommand'] = {
            ...command,
            offsetTop: element.offsetTop,
            scroll: panel.current.scrollTop,
            id: Number(id)
        };

        switch (command.receiver) {
            case 'API':
                send({ action: command.action || '', ...payload });
                return dispatch(destroyContextMenu());
            case 'STORE':
                return dispatch(setActiveCommand(payload));
        }
    }

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
            setPosition({
                panel: panel.current,
                panelY: position.y,
                scroll: activeCommand?.scroll || 0,
                offsetTop: activeCommand?.offsetTop || 0,
                commandid: Number(activeCommand?.id),
                id: Number(id),
            });
        }

        //freeze scroll if id (== panel open)
        freezeScroll(FREEZE_COMPONENTS_CLASS, id !== 0);

        window.addEventListener('click', onClick);
        window.addEventListener('contextmenu', onClick);
        dispatch(destroyTooltip());

        return () => {
            lastId.current = id;
            window.removeEventListener('click', onClick);
            window.removeEventListener('contextmenu', onClick);
        }

    }, [id, activeCommand]);

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
                            {command.map(cm =>
                                <li
                                    key={JSON.stringify(cm) + i}
                                    onClick={(e) => routeDispatch(cm, e.target as Element)}
                                    onMouseLeave={(e: BaseSyntheticEvent) => e.target.classList.contains('selected') && e.target.classList.remove('selected')}
                                >
                                    <Label iconLeft={cm.icon}>{String(cm.value)}</Label>
                                </li>)
                            }
                            {(i < commands.length - 1) && <hr />}
                        </Fragment>
                    } else {
                        return (
                            <li
                                key={JSON.stringify(command) + i}
                                onClick={(e) => routeDispatch(command, e.target as Element)}
                                onMouseLeave={(e: BaseSyntheticEvent) => e.target.classList.contains('selected') && e.target.classList.remove('selected')}
                            >
                                <Label iconLeft={command.icon}>{String(command.value)}</Label>
                            </li>
                        );
                    }
                })}
            </ul >
        }
    </>);

}