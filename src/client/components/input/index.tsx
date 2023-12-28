import { useEffect, useRef, useState } from 'react';
import './index.scss';
import { Input as InputInterface } from '@ctypes/input';

export const Input = ({ type = 'DEFAULT', value, placeholder = 'Enter a value', onChange, onBlur, onFocus, onEnter, style }: InputInterface) => {

    const [innerValue, setInnerValue] = useState(value);
    const input = useRef<any>();

    useEffect(() => {
        if (input.current) {
            input.current.value = String(innerValue);
        }
    }, [innerValue]);

    return (
        <div className={'input-field'}>
            {style?.label && <p className='input-field-label'><small>{placeholder}</small></p>}
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
                        if (e.code === 'Enter') {
                            onEnter(e);
                            e.target.blur();
                        }
                    }}
                />
            </div>
        </div>
    );
}