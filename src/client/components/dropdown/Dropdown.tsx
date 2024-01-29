import './Dropdown.scss';
import { Dropdown as IDropdown } from "src/types/input";
import Carrot from '@icons/carrot.svg';
import { BaseSyntheticEvent, useEffect, useState, useRef } from "react";
import { loadFetch, setYPos } from "./Dropdown.helper";
import { Label } from '@components/label';
import { useDispatch, useSelector } from 'react-redux';
import { display as displayContextMenu } from '@lib/slices/contextmenu';
import { ContextMenuCommand } from 'src/types/contextmenu';

export default (props: IDropdown) => {

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
        if (!commandList.current.length) {
            loadFetch(props.list).then(e => commandList.current = e);
        }
    }, []);

    useEffect(() => {

        if (activeItem) {
            //set value priority (if no props value then...)
            const activeValue: string =
                typeof props.value === 'string' && String(props.value)
                || typeof activeItem.value === 'string' && activeItem.value
                || typeof activeItem.value === 'object' && activeItem.value.placeholder
                || '';

            setValue(activeValue);
            //external callback
            if (props.onChange) props.onChange(activeItem);
        }
    }, [activeItem, props.value]);

    useEffect(() => {
        //set last active command
        if (lastState.activeCommand && lastState.id === id.current) {
            setActiveItem(lastState.activeCommand);
        }
    }, [lastState.activeCommand]);

    return (
        <div
            className="dropdown flex f-col gap-xs"
            data-stroke={props.appearance?.stroke === undefined || !!props.appearance.stroke}
            data-minified={!!props?.appearance?.minified}
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