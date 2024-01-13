import './index.scss';
import { Input as IInput } from 'src/types/input';
import ArrowHorizontal from '@icons/horizontal.svg';
import ArrowVertical from '@icons/vertical.svg';
import { Icon } from '@components/icon';
import { cssTextStyle } from '@lib/utils/font';
import { TextSet } from '@ctypes/text';
import { Input } from '@components/input';

interface FontOptions {
    style: TextSet;
    config?: { fontFamily: boolean; style: boolean; }
}

export const FontOptions = ({ style, config }: FontOptions) => {

    const cssStyle = cssTextStyle(style);
    const inputStyle = {
        minified: true,
        stroke: false,
        arrow: false
    }
    const dragInputs: { [key: string]: IInput } = {
        fontSize: { type: 'AMOUNT', value: style.fontSize, range: [0, 1000], step: 1, appearance: inputStyle },
        letterSpacing: { type: 'AMOUNT', value: cssStyle.letterSpacing, range: [-100, 100], step: 1, appearance: inputStyle },
        lineHeight: { type: 'AMOUNT', value: cssStyle.lineHeight, range: [0, 100], step: 1, appearance: inputStyle },
    }

    return (
        <ul className="font-options flex f-col">
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