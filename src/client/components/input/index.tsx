import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import colorNamer from "color-namer";
import './index.scss';
import { Input as IInput } from '@ctypes/input';
import ChevronDown from '@icons/chevron-down.svg';
import ChevronUp from '@icons/chevron-up.svg';
import { ButtonIcon } from '@components/button-icon';
import { clamp } from '@lib/utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { send as sendPortal } from '@lib/slices/input';

export const Input = ({ type = 'DEFAULT', dynamicValue, value, placeholder = 'Enter a value', onChange, onBlur, onFocus, onEnter, style, range = [1, 10], step = 1, portal, appearance={minified:false, stroke:true, label:false} }: IInput) => {

    const [innerValue, setInnerValue] = useState(value);
    const [manualyChanged, setManualyChanged] = useState(false);
    const portalSelector = useSelector((state: any) => state.input.portal);
    const dispatch = useDispatch();
    const updatePortal = ({ target, value }: { target: string; value: string | number; }) => dispatch(sendPortal({ target: target, value: value }));
    const input = useRef<any>();

    const handleOnChange = (e: BaseSyntheticEvent) => {

        //update manualy changed state (prevent portal override)
        setManualyChanged(true);

        //handle amount clamping
        switch (type) {
            case 'AMOUNT':
                if (e.target.value.length) { e.target.value = clamp(range[0], Number(e.target.value), range[1]) || range[0]; }
                setInnerValue(String(e.target.value));
                break;
        }

        //external callback
        if (onChange) { onChange(e); }

        //store update (portal)
        if (portal?.target) { updatePortal({ target: portal.target as string, value: e.target.value }); }

    }


    useEffect(() => {
        if (dynamicValue !== undefined) {
            setInnerValue(dynamicValue);
            handleOnChange({ target: { value: dynamicValue } } as BaseSyntheticEvent);
        }
    }, [dynamicValue]);


    useEffect(() => {

        if (input.current && innerValue) {

            let storeValue = innerValue || '';

            //update color name from hex value
            if (type === 'COLOR' && portal?.colorformat === 'NAME') {
                const { ntc } = colorNamer(innerValue, { pick: 'ntc' });
                storeValue = ntc[0].name || innerValue;
            }

            //update store target
            if (portal?.target) {
                updatePortal({ target: portal?.target, value: storeValue });
            }

            //update ref value
            input.current.value = String(innerValue);

            //call external callback
            if (onChange) { onChange({ target: input.current }); }


        }
    }, [innerValue]);

    useEffect(() => {

        //portal receiving
        if (
            (portal?.key && portalSelector.target === portal.key) &&
            (!portal?.override && !manualyChanged)
        ) {
            setInnerValue(portalSelector.value);
        }
    }, [portalSelector]);



    return (
        <div className='input-field flex f-col gap-xs' data-minified={String(appearance?.minified)} data-stroke={String(appearance?.stroke)}>
            {appearance?.label && <p className='input-field-label frozen'><small><b>{placeholder}</b></small></p>}
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
                    {...(style && {style:style})}
                    placeholder={placeholder}
                    defaultValue={value}
                    onChange={handleOnChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyDown={(e: any) => {
                        if (e.code === 'Enter' && onEnter) { onEnter(e); e.target.blur(); }
                        if (type === 'AMOUNT') {
                            if (e.code === 'ArrowUp') { e.preventDefault(); setInnerValue(clamp(range[0], Number(innerValue) + step, range[1])); }
                            if (e.code === 'ArrowDown') { e.preventDefault(); setInnerValue(clamp(range[0], Number(innerValue) - step, range[1])); }
                        }
                    }}
                />
                {
                    //Display amount arrows
                    type === 'AMOUNT' &&
                    <label className='input-field-amount flex f-col'>
                        <ButtonIcon icon={ChevronUp} onClick={() => setInnerValue(clamp(range[0], Number(innerValue) + step, range[1]))} />
                        <ButtonIcon icon={ChevronDown} onClick={() => setInnerValue(clamp(range[0], Number(innerValue) - step, range[1]))} />
                    </label>
                }
            </div>
        </div>
    );
}