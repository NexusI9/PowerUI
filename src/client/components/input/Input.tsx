import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import colorNamer from "color-namer";
import './index.scss';
import { Input as IInput } from 'src/types/input';
import { clamp, roundDecimal } from '@lib/utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { send as sendPortal } from '@lib/slices/input';
import { Color } from './Color';
import { AmountArrows } from './AmountArrow';
import { convertUnit, valueUnitFrom } from '@lib/utils/font';
import { InputPortal } from './Portal';

export default ({
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

    const handleOnKeyDown = (e: any) => {

        if (e.code === 'Enter' && onEnter) {
            onEnter(e);
            e.target.blur();
        }

        if (type === 'AMOUNT') {
            let mStep = e.shiftKey ? 10 : e.altKey ? 0.1 : step;
            if (e.code === 'ArrowUp') {
                e.preventDefault();
                setInnerValue(valueUnit.value + mStep + convertUnit(valueUnit.unit));
            }
            if (e.code === 'ArrowDown') {
                e.preventDefault();
                setInnerValue(valueUnit.value - mStep + convertUnit(valueUnit.unit));
            }
        }
    }


    useEffect(() => { dynamicValue !== undefined && setInnerValue(dynamicValue); }, [dynamicValue]);
    //useEffect(() => { setInnerValue(value) }, [value]);

    useEffect(() => {
        /*
        * MAIN VALUE CHANGE HANDLER
        * [external value] => [inner value] => [validated and filtered] => [actually changed value]
        */

        //Convert methods
        const convertAmount = (val: string): string => {
            /* 
            ** Clamp amount value and append unit (end string) to incremented value
            */
            const { value, unit } = valueUnitFrom(String(val));
            return (range ? clamp(range[0], value, range[1]) : value) + convertUnit(unit);
        }

        const convertColor = (val: string): string => {
            //update color name from hex value
            if (portal?.colorformat === 'NAME') {
                try {
                    const { ntc } = colorNamer(innerValue, { pick: 'ntc' });
                    val = ntc[0].name || innerValue;
                } catch { }
            }

            return val;
        }


        if (input.current && innerValue) {

            let storeValue = String(innerValue);
            let inputValue = String(innerValue);

            switch (type) {
                case 'COLOR':
                    storeValue = convertColor(storeValue);
                    break;

                case 'AMOUNT':
                    inputValue = convertAmount(inputValue);
                    break;
            }


            //update ref value
            input.current.value = String(inputValue);

            //update store target
            portal?.target && updatePortal({ target: portal?.target, value: storeValue });

            //call external callback
            onChange && onChange({ target: input.current });
        }

    }, [innerValue]);

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
                        onChange={(e) => { setManualyChanged(true); setInnerValue(e.target.value); }}
                        onKeyDown={handleOnKeyDown}
                    />
                    {
                        //Display amount arrows
                        type === 'AMOUNT' &&
                        <AmountArrows
                            onUp={() => setInnerValue(valueUnit.value + step)}
                            onDown={() => setInnerValue(valueUnit.value - step)}
                        />
                    }
                </div>
            </div>
        </InputPortal>
    );
}