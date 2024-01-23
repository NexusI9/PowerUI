import './index.scss';
import { Dropdown as IDropdown } from "src/types/input";
import Carrot from '@icons/carrot.svg';
import { BaseSyntheticEvent, useEffect, useState, useRef } from "react";
import { setYPos } from "./helper";
import { Label } from '@components/label';
import { useDispatch, useSelector } from 'react-redux';
import { display as displayContextMenu } from '@lib/slices/contextmenu';
import { ContextMenuCommand } from 'src/types/contextmenu';
import { traverseCallback } from '@lib/utils/utils';
import { get } from '@lib/ipc';

export const Dropdown = (props: IDropdown) => {

    const [activeItem, setActiveItem] = useState<ContextMenuCommand | undefined>();
    const [value, setValue] = useState<string>(String(props.value));
    const id = useRef<number>(performance.now());
    const commandList = useRef<any>([]);

    const lastState = useSelector((state: any) => state.contextmenu);
    const dispatch = useDispatch();


    const handleOnClick = (e: BaseSyntheticEvent) => {
        const { x, y } = e.target.getBoundingClientRect() || 0;
        const offset = Math.max(0, setYPos(activeItem, 20, props.list));
        dispatch<any>(displayContextMenu({ commands: commandList.current, position: { x: x, y: y + offset }, id: id.current }));
    }

    useEffect(() => {
        //INIT => Convert async values to actual context menu command values and store it in a ref for persistent memory
        async function loadFetch() {
            //check if commands have fetch propreties to replace content with fetch results
            const fetchPromises: Array<any> = props.list.map((command) =>
                traverseCallback(
                    command,
                    (cm: ContextMenuCommand) => {
                        if (cm.value && typeof cm.value === 'object') { return get(cm.value).then(e => e.payload); }
                        else { return cm; }
                    }
                )
            );
            return await Promise.all(fetchPromises);
        }

        loadFetch().then(e => commandList.current = e);
    }, []);

    useEffect(() => {

        if (props.onChange && activeItem) {

            //set value priority (if no props value then...)
            const activeValue: string =
                typeof props.value === 'string' && String(props.value)
                || typeof activeItem.value === 'string' && activeItem.value
                || typeof activeItem.value === 'object' && activeItem.value.placeholder
                || '';

            setValue(activeValue);
            //external callback
            props.onChange(activeItem);
        }
    }, [activeItem, props.value]);

    useEffect(() => {
        if (lastState.activeCommand && lastState.id === id.current) setActiveItem(lastState.activeCommand);
    }, [lastState.activeCommand]);

    return (
        <div
            className="dropdown flex f-col gap-xs"
        >
            {props.appearance?.label && <p className="dropdown-label frozen"><small><b>{props.placeholder}</b></small></p>}
            <label
                className="flex f-row f-center f-between"
                onClick={handleOnClick}
            >
                <Label iconLeft={activeItem?.icon}>{String(value)}</Label>
                <Carrot />
            </label>
        </div>
    );
}