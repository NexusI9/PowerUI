import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import colorNamer from "color-namer";
import './index.scss';
import { Input as IInput } from 'src/types/input';
import { clamp, roundDecimal } from '@lib/utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { send as sendPortal } from '@lib/slices/input';
import { Color } from './color';
import { AmountArrows } from './amountarrows';
import { convertUnit, valueUnitFrom } from '@lib/utils/font';
import { InputPortal } from './portal';

export const Input = ({
    type = 'DEFAULT',
    dynamicValue,
    value,
    placeholder = 'Enter a value',
    onChange = () => 0,
    onBlur,
    onFocus,
    onEnter,
    range,
    style,
    step = 1,
    portal,
    appearance = { minified: false, stroke: true, label: false }
}: IInput
) => {

    const [innerValue, setInnerValue] = useState(value);
    const [manualyChanged, setManualyChanged] = useState(false);
    const dispatch = useDispatch();
    const updatePortal = ({ target, value }: { target: string; value: string | number; }) => dispatch(sendPortal({ target: target, value: value }));
    const input = useRef<any>();
    const valueUnit = valueUnitFrom(String(innerValue));

    const handleOnChange = (e: BaseSyntheticEvent) => {
        //update manualy changed state (prevent portal override)
        setManualyChanged(true);

        //handle amount clamping
        switch (type) {
            case 'AMOUNT':
           
                //clamp 
                if (e.target.value.length && range) {
                    e.target.value = clamp(range[0], Number(e.target.value), range[1]) || range[0];
                }

                setInnerValue(String(e.target.value));
                break;
        }

        //external callback
        onChange(e);

        //store update (portal)
        if (portal?.target) { updatePortal({ target: portal.target as string, value: e.target.value }); }

    }

    const convertAmount = (val: number): string => {
        return (range ? clamp(range[0], val, range[1]) : val) + convertUnit(valueUnit.unit);
    }

    const handleOnKeyDown = (e: any) => {
        if (e.code === 'Enter' && onEnter) { onEnter(e); e.target.blur(); }
        if (type === 'AMOUNT') {
            let mStep = e.shiftKey ? 10 : e.altKey ? 0.1 : step;
            if (e.code === 'ArrowUp') { e.preventDefault(); setInnerValue(convertAmount((valueUnit.value + mStep))); }
            if (e.code === 'ArrowDown') { e.preventDefault(); setInnerValue(convertAmount((valueUnit.value - mStep))); }
        }
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
                try{
                    const { ntc } = colorNamer(innerValue, { pick: 'ntc' });
                    storeValue = ntc[0].name || innerValue;
                }catch{}
            }

            //update store target
            if (portal?.target) { updatePortal({ target: portal?.target, value: storeValue }); }

            //update ref value
            input.current.value = String(innerValue);
            //call external callback
            onChange({ target: input.current });
        }

    }, [innerValue]);


    useEffect(() => { setInnerValue(value) }, [value])

    return (
        <InputPortal
            portalKey={portal?.key}
            onMessage={(e: any) => !portal?.override && !manualyChanged && setInnerValue(e.value)}
        >

            <div className='input-field flex f-col gap-xs' data-minified={String(appearance?.minified)} data-stroke={String(appearance?.stroke)}>
                {appearance?.label && <p className='input-field-label frozen'><small><b>{placeholder}</b></small></p>}
                <div className='input-field-content' data-type={type}>
                    {
                        //Display color swatch square
                        type === 'COLOR' &&
                        <Color
                            style={{ backgroundColor: String(innerValue) }}
                            onChange={(e: BaseSyntheticEvent) => setInnerValue(e.target.value)}
                            onClick={() => input.current?.focus()}
                        />
                    }
                    <input
                        type='text'
                        ref={input}
                        {...(style && { style: style })}
                        placeholder={placeholder}
                        defaultValue={value}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        onChange={handleOnChange}
                        onKeyDown={handleOnKeyDown}
                    />
                    {
                        //Display amount arrows
                        type === 'AMOUNT' &&
                        <AmountArrows
                            onUp={() => setInnerValue(convertAmount(valueUnit.value + step))}
                            onDown={() => setInnerValue(convertAmount(valueUnit.value - step))}
                        />
                    }
                </div>
            </div>
        </InputPortal>
    );
}