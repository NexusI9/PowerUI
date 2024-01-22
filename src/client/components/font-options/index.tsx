import './index.scss';
import { Input as IInput } from 'src/types/input';
import ArrowHorizontal from '@icons/horizontal.svg';
import ArrowVertical from '@icons/vertical.svg';
import { Icon } from '@components/icon';
import { cssTextStyle, valueUnitFrom } from '@lib/utils/font';
import { TextSet } from '@ctypes/text';
import { Input } from '@components/input';
import { BaseSyntheticEvent } from 'react';
import { updateAttribute } from './helper';

interface FontOptions {
    style: TextSet;
    config?: { fontFamily: boolean; style: boolean; }
}

export const FontOptions = ({ style, config }: FontOptions) => {

    const cssStyle = cssTextStyle(style, 'OBJECT') as Record<string, any>;
    const inputStyle = {
        minified: true,
        arrow: false
    }


    const dragInputs: { [key: string]: IInput } = {
        fontSize: {
            type: 'AMOUNT',
            value: cssStyle.fontSize,
            appearance: inputStyle,
            onBlur: (e: BaseSyntheticEvent) => updateAttribute(style, 'fontSize', Math.max(1, valueUnitFrom(e.target.value).value)),
            onEnter: (e: BaseSyntheticEvent) => updateAttribute(style, 'fontSize', Math.max(1, valueUnitFrom(e.target.value).value))
        },
        letterSpacing: {
            type: 'AMOUNT',
            value: cssStyle.letterSpacing,
            appearance: inputStyle,
            onBlur: (e: BaseSyntheticEvent) => updateAttribute(style, 'letterSpacing', valueUnitFrom(e.target.value)),
            onEnter: (e: BaseSyntheticEvent) => updateAttribute(style, 'letterSpacing', valueUnitFrom(e.target.value))
        },
        lineHeight: {
            type: 'AMOUNT',
            value: cssStyle.lineHeight,
            appearance: inputStyle,
            onBlur: (e: BaseSyntheticEvent) => updateAttribute(style, 'lineHeight', valueUnitFrom(e.target.value)),
            onEnter: (e: BaseSyntheticEvent) => updateAttribute(style, 'lineHeight', valueUnitFrom(e.target.value)),
        },
    }

    return (
        <ul className="font-options flex f-col gap-s">
            {config?.fontFamily && <li><small>{String(style.fontName?.family)}</small></li>}
            <li><Input {...dragInputs.fontSize} /></li>
            <ul className="flex f-row gap-s">
                <li className='flex f-row gap-xs f-center-h'>
                    <Icon icon={ArrowHorizontal} />
                    <Input {...dragInputs.letterSpacing} />
                </li>
                <li className='flex f-row gap-xs f-center-h'>
                    <Icon icon={ArrowVertical} />
                    <Input {...dragInputs.lineHeight} />
                </li>
            </ul>
        </ul>
    );
}