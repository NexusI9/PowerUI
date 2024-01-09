import './index.scss';
import { Dropdown as IDropdown } from "@ctypes/input";
import Carrot from '@icons/carrot.svg';
import { BaseSyntheticEvent, useEffect, useState, useRef } from "react";
import { setYPos } from "./helper";
import { Label } from '@components/label';
import { useDispatch, useSelector } from 'react-redux';
import { display as displayContextMenu } from '@lib/slices/contextmenu';
import { ContextMenuCommand } from '@ctypes/contextmenu';
import { AsyncThunkAction } from '@reduxjs/toolkit';

export const Dropdown = (props: IDropdown) => {

    const [activeItem, setActiveItem] = useState<ContextMenuCommand | undefined>();
    const id = useRef<number>(performance.now());
    const lastState = useSelector((state: any) => state.contextmenu);
    const dispatch = useDispatch();

    const handleOnClick = (e: BaseSyntheticEvent) => {
        if(!activeItem){ return; }
        const { x, y } = e.target.getBoundingClientRect() || 0;
        const offset = Math.max(0, setYPos(activeItem, 20, props.list));
        dispatch<any>(displayContextMenu({ commands: props.list, position: { x: x, y: y + offset }, id: id.current }));
    }

    useEffect(() => {
        setActiveItem(Array.isArray(props.list[0]) ? props.list[0][0] : props.list[0]);
    }, []);

    useEffect(() => {
        if (props.onChange && activeItem) {
            props.onChange(activeItem);
        }
    }, [activeItem]);

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
                {activeItem && <Label iconLeft={activeItem.icon}>{activeItem.text}</Label> || <p>Undefined</p>}
                <Carrot />
            </label>
        </div>
    );
}