import { DropdownCommand } from "@ctypes/input"
import Carrot from '@icons/carrot.svg';
import { Fragment, useEffect, useState } from "react";
import './index.scss';
import { setYPos } from "./helper";
import { set_multi_array_active_item } from "@lib/utils/utils";


export const Dropdown = ({ onChange, list }: { onChange?: any, list: Array<DropdownCommand> | Array<Array<DropdownCommand>> }) => {

    const [active, setActive] = useState<number | Array<number>>(0);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        //init
        setActive(Array.isArray(list[0]) ? [0, 0] : 0);
    }, []);

    useEffect(() => {
        if (onChange) onChange(active);
    }, [active])

    return (
        <div
            className="dropdown"
            data-expanded={String(expanded)}
        >
            <label className="flex f-row f-center f-between" onClick={(() => setExpanded(true))}>{set_multi_array_active_item(active, list).text} <Carrot /></label>
            <ul
                className="dropdown-choices panel flex f-col gap-xs"
                data-expanded={String(expanded)}
                style={{ transform: `translate3d(0px, ${setYPos(active, 20, list)}px, 0px)` }}
            >
                {
                    list.map((item, i) =>
                        Array.isArray(item) ?
                            <Fragment key={JSON.stringify(item) + i}>
                                {
                                    item.map((it, j) => <li key={it.text + i * j} onClick={() => { setActive([i, j]); setExpanded(false); }}>{it.text}</li>)
                                }
                                {i < list.length - 1 ? <hr /> : <></>}
                            </Fragment> :
                            <li key={item.text + i} onClick={() => { setActive(i); setExpanded(false); }}>{item.text}</li>
                    )
                }
            </ul>
        </div>
    );
}