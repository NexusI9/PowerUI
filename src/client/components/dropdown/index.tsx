import { DropdownCommand, Dropdown as DropdownInterface } from "@ctypes/input"
import Carrot from '@icons/carrot.svg';
import { useEffect, useState } from "react";
import './index.scss';


export const Dropdown = (props: DropdownInterface) => {

    const {list} = props;

    const activeItem = (active: number | Array<number>): DropdownCommand => {
        if(Array.isArray(active)) {
            return (list as Array<Array<DropdownCommand>>)[0][0];
        }
        return (list as Array<DropdownCommand>)[active];
    };

    const [active, setActive] = useState<number | Array<number>>(0);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        //init
        setActive(Array.isArray(props.list[0]) ? [0, 0] : 0);
    }, []);

    return (
        <div
            className="dropdown"
            data-expanded={String(expanded)}
        >
            <label className="flex f-row f-center f-between">{activeItem(active).text} <Carrot/></label>
        </div>
    );
}