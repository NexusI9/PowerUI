import { TextArea as ITextArea } from "@ctypes/input";
import { get } from "@lib/ipc";
import { useEffect, useState } from "react";
import './index.scss';

export default ({ value, resize=false, readonly=false }: ITextArea) => {

    const [innerValue, setInnerValue] = useState(value);

    useEffect(() => {

        if (typeof value === 'string') { setInnerValue(value); }
        else if (typeof value === 'object') { 
            get(value).then(({payload}) => setInnerValue(payload)); 
            setInnerValue(value.placeholder);
        }

    }, [value]);

    return (<textarea className='input-text-area' readOnly={readonly} data-resize={resize} defaultValue={String(innerValue)}></textarea>)
}