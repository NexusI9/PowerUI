import { Checkbox } from "@ctypes/input";
import { BaseSyntheticEvent, useState } from "react";
import './index.scss';

export default (props: Checkbox) => {

    const [active, setActive] = useState(props.value);
    const handleOnClick = (e: BaseSyntheticEvent) => {
        setActive(e.target.checked);
        if (props.onChange) props.onChange(e);
    };

    return (
        <label className="toggle flex f-center" data-active={active}>
            <input type='checkbox' defaultChecked={props.value} onClick={handleOnClick} />
            <p><small>{props.label}</small></p>
        </label>
    );
}