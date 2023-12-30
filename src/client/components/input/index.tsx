import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import './index.scss';
import { Input as IInput } from '@ctypes/input';
import ChevronDown from '@icons/chevron-down.svg';
import ChevronUp from '@icons/chevron-up.svg';
import { ButtonIcon } from '@components/button-icon';
import { clamp } from '@lib/utils/utils';

export const Input = ({ type = 'DEFAULT', value, placeholder = 'Enter a value', onChange, onBlur, onFocus, onEnter, style, range = [1, 10] }: IInput) => {

    const [innerValue, setInnerValue] = useState(value);
    const input = useRef<any>();

    const handleOnChange = (e: BaseSyntheticEvent) => {
        //handle amount clamping
        if (range && type === 'AMOUNT') {
            if (e.target.value.length) { e.target.value = clamp(range[0], Number(e.target.value), range[1]) || range[0]; }
            setInnerValue(String(e.target.value));
        }
        //external callback
        if (onChange) { onChange(e); }
    }

    useEffect(() => {
        if (input.current) {
            input.current.value = String(innerValue);
            if (onChange) { onChange({ target: input.current }); }
        }
    }, [innerValue]);

    return (
        <div className={'input-field'}>
            {style?.label && <p className='input-field-label frozen'><small><b>{placeholder}</b></small></p>}
            <div className='input-field-content' data-type={type}>
                {
                    //Display color swatch square
                    type === 'COLOR' &&
                    <label style={{ backgroundColor: String(innerValue) }} >
                        <input type='color' onChange={e => setInnerValue(e.target.value)} onClick={() => input.current?.focus()} />
                    </label>
                }
                <input
                    type='text'
                    ref={input}
                    placeholder={placeholder}
                    defaultValue={value}
                    onChange={handleOnChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyDown={(e: any) => {
                        if (e.code === 'Enter' && onEnter) { onEnter(e); e.target.blur(); }
                        if (type === 'AMOUNT') {
                            if (e.code === 'ArrowUp') { e.preventDefault(); setInnerValue(clamp(range[0], Number(innerValue) + 1, range[1])); }
                            if (e.code === 'ArrowDown') { e.preventDefault(); setInnerValue(clamp(range[0], Number(innerValue) - 1, range[1])); }
                        }
                    }}
                />
                {
                    //Display amount arrows
                    type === 'AMOUNT' &&
                    <label className='input-field-amount flex f-col'>
                        <ButtonIcon icon={ChevronUp} onClick={() => setInnerValue(clamp(range[0], Number(innerValue) + 1, range[1]))} />
                        <ButtonIcon icon={ChevronDown} onClick={() => setInnerValue(clamp(range[0], Number(innerValue) - 1, range[1]))} />
                    </label>
                }
            </div>
        </div>
    );
}