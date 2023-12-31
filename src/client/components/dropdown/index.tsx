import './index.scss';
import { Dropdown as IDropdown } from "@ctypes/input"
import Carrot from '@icons/carrot.svg';
import { Fragment, useEffect, useState } from "react";
import { setYPos } from "./helper";
import { itemFromIndex } from "@lib/utils/utils";


export const Dropdown = (props: IDropdown) => {

    const [active, setActive] = useState<number | Array<number>>(0);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        //init
        setActive(Array.isArray(props.list[0]) ? [0, 0] : 0);
    }, []);

    useEffect(() => {
        if (props.onChange) props.onChange({ id: active, item: itemFromIndex(active, props.list) });
    }, [active]);

    useEffect(() => {
        const onClick = () => setExpanded(false);

        if (expanded) {
            //window.addEventListener('click', onClick);
        } else {
            window.removeEventListener('click', onClick);
        }

        () => window.removeEventListener('click', onClick);

    }, [expanded]);

    return (
        <div
            className="dropdown flex f-col gap-xs"
            data-expanded={String(expanded)}
        >
            {props.style?.label && <p className="dropdown-label frozen"><small><b>{props.placeholder}</b></small></p>}
            <label className="flex f-row f-center f-between" onClick={(() => setExpanded(true))}>{itemFromIndex(active, props.list).text} <Carrot /></label>
            <ul
                className="dropdown-choices panel flex f-col gap-xs"
                data-expanded={String(expanded)}
                style={{ transform: `translate3d(0px, ${setYPos(active, 20, props.list)}px, 0px)` }}
            >
                {
                    props.list.map((item, i) =>
                        Array.isArray(item) ?
                            <Fragment key={JSON.stringify(item) + i}>
                                {item.map((it, j) => <li key={it.text + i * j} onClick={() => { setActive([i, j]); setExpanded(false); }}>{it.text}</li>)}
                                {i < props.list.length - 1 && <hr />}
                            </Fragment> :
                            <li key={item.text + i} onClick={() => { setActive(i); setExpanded(false); }}>{item.text}</li>
                    )
                }
            </ul>
        </div>
    );
}