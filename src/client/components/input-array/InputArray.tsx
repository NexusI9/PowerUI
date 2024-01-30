import './InputArray.scss';
import { InputArray as IInputArray } from 'src/types/input';
import { Input } from '@components/input';
import { BaseSyntheticEvent, useState } from 'react';
import { Button } from '@components/button';
import Cross from '@icons/x.svg'

export default ({ value = [], min, max, float = false, placeholder = 'Enter a value', type = 'NUMBER', onChange = () => 0, appearance }: IInputArray) => {

    const [innerValues, setInnerValues] = useState<Array<number | string>>(value);

    const onRemove = ({ value, index }: { value: number | string; index: number }) => {
        let newValues = [...innerValues];
        newValues.splice(index, 1);
        setInnerValues(newValues);
        onChange({ target: { value: newValues } });
    }

    const onAdd = ({ value }: { value: number | string }) => {
        //convert to right type
        value = type === 'NUMBER' ? Number(value) : String(value);

        //filter non valid values
        if (isNaN(value as number) && !(value as string).length) { return; }

        //clamp
        if (max && (value as number) > max) { value = max };
        if (min && (value as number) < min) { value = min };
        //round
        if (!float && type === 'NUMBER') { value = Math.round(value as number); }
        //update
        let newValues = [...innerValues];
        newValues.push(value);
        newValues.sort((a, b) => {
            switch (type) {
                case 'NUMBER':
                    return Number(a) < Number(b) ? -1 : 1;
                case 'STRING':
                    return a < b ? -1 : 1;
            }
        });
        setInnerValues([...newValues]);
        onChange({ target: { value: newValues } });
    };

    return (<div className='input-array flex f-col gap-xs'>
        {appearance?.label && <p className='input-array-label frozen'><small><b>{placeholder}</b></small></p>}
        <div className='input-array-container flex f-col gap-m'>
            <div className='input-array-stack flex f-row f-wrap gap-s'>
                {[...innerValues].map((val, i) =>
                    <span key={String(val) + String(i)} className='input-array-value flex f-row gap-xs f-center'>
                        <small>{val}</small>
                        <Button iconLeft={Cross} onClick={() => onRemove({ value: val, index: i })} role='DISABLED' />
                    </span>
                )}
            </div>
            <Input onEnter={(e: BaseSyntheticEvent) => { onAdd({ value: e.target.value }); e.target.value = ''; }} placeholder={placeholder} />
        </div>

    </div>);
};