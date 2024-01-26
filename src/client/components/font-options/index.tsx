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


export const FontOptions = (style: TextSet) => {

    const { options } = style;
    const cssStyle = cssTextStyle(style, 'OBJECT') as Record<string, any>;
    const inputStyle = {
        minified: true,
        arrow: false,
        stroke: false
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
            {(!options || options?.fontFamily) && <li className='font-options-font-family'><small>{String(style.fontName?.family)}</small></li>}
            {(!options || options?.fontSize) && <li className='font-options-font-size'><Input {...dragInputs.fontSize} /></li>}
            <ul className="flex f-row gap-s">
                {
                    (!options || options?.letterSpacing) &&
                    <li className='font-options-letter-spacing flex f-row gap-xs f-center-h'>
                        <Icon icon={ArrowHorizontal} />
                        <Input {...dragInputs.letterSpacing} />
                    </li>
                }
                {
                    (!options || options?.lineHeight) &&
                    < li className='font-options-line-height flex f-row gap-xs f-center-h'>
                        <Icon icon={ArrowVertical} />
                        <Input {...dragInputs.lineHeight} />
                    </li>
                }

            </ul>
        </ul >
    );
}