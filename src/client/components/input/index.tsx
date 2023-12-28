import { useEffect, useRef, useState } from 'react';
import './index.scss';
import { Input as IInput } from '@ctypes/input';
import ChevronDown from '@icons/chevron-down.svg';
import ChevronUp from '@icons/chevron-up.svg';
import { ButtonIcon } from '@components/button-icon';

export const Input = ({ type = 'DEFAULT', value, placeholder = 'Enter a value', onChange, onBlur, onFocus, onEnter, style }: IInput) => {

    const [innerValue, setInnerValue] = useState(value);
    const input = useRef<any>();

    useEffect(() => {
        if (input.current) {
            input.current.value = String(innerValue);
        }
    }, [innerValue]);

    return (
        <div className={'input-field'}>
            {style?.label && <p className='input-field-label frozen'><small><b>{placeholder}</b></small></p>}
            <div className='input-field-content' data-type={type}>
                {
                    type === 'COLOR' &&
                    <label style={{ backgroundColor: String(innerValue) }} >
                        <input type='color' onChange={e => setInnerValue(e.target.value)} />
                    </label>
                }
                <input
                    type="text"
                    ref={input}
                    placeholder={placeholder}
                    defaultValue={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyDown={(e: any) => {
                        if (e.code === 'Enter') { onEnter(e); e.target.blur(); }
                        if(type ==='AMOUNT'){
                            if(e.code === 'ArrowUp'){ e.preventDefault(); setInnerValue(Number(innerValue)+1); }
                            if(e.code === 'ArrowDown'){ e.preventDefault(); setInnerValue(Number(innerValue)-1); }
                        }
                    }}
                />
                {
                    type === 'AMOUNT' &&
                    <label className='input-field-amount flex f-col'>
                        <ButtonIcon icon={ChevronUp} onClick={ () => setInnerValue(Number(innerValue)+1) }/>
                        <ButtonIcon icon={ChevronDown} onClick={ () => setInnerValue(Number(innerValue)-1) }/>
                    </label>
                }
            </div>
        </div>
    );
}