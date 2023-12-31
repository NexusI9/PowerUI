import { Slider as ISlider } from "@ctypes/input";
import './index.scss';
import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { Input } from "@components/input";

export const Slider = ({ placeholder, onChange = (e: BaseSyntheticEvent) => void 0, value = 0.5, background }: ISlider) => {


    const [innerValue, setInnerValue] = useState(value);
    const ref = useRef<any>();

    const handleOnChange = (e: BaseSyntheticEvent) => {
        setInnerValue(Number(e.target.value));
        onChange(e);
    }

    useEffect(() => {
        if (ref.current) {
            ref.current.value = innerValue;
        }
    }, [innerValue]);



    return (<div className='input-slider flex f-col gap-xs'>
        <div className="input-slider-header flex f-row f-between">
            {placeholder && <p className="input-slider-label"><small><b>{placeholder}</b></small></p>}
            <Input
                type='AMOUNT'
                value={value}
                dynamicValue={innerValue}
                placeholder={placeholder}
                range={[0, 1]}
                onChange={handleOnChange}
                step={0.1}
                style={{ minified: true }}
            />
        </div>

        <input
            ref={ref}
            type='range'
            min={0}
            max={1}
            step={0.01}
            defaultValue={value}
            onChange={handleOnChange}
            onDoubleClick={() => setInnerValue(value)}
            style={{background:background}}
        />
    </div>);
}