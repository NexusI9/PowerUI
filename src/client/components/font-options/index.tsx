import './index.scss';
import { Input as IInput } from 'src/types/input';
import ArrowHorizontal from '@icons/horizontal.svg';
import ArrowVertical from '@icons/vertical.svg';
import { Icon } from '@components/icon';
import { cssTextStyle } from '@lib/utils/font';

interface FontOptions {
    style:TextStyle;
    config?: { fontFamily:boolean; style:boolean;  }
}

export const FontOptions = ({style, config}:FontOptions) => {

    const cssStyle = cssTextStyle(style);

    const dragInputs: { [key: string]: IInput } = {
        fontSize: { value: style.fontSize, range: [0, 1000], step: 1 },
        letterSpacing: { value: cssStyle.letterSpacing, range: [-100, 100], step: 1 },
        lineHeight: { value: cssStyle.lineHeight, range: [0, 100], step: 1 },
    }

    return (
        <ul className="font-options flex f-col">
            { config?.fontFamily && <li><small>{style.fontName.family}</small></li> }
            <li><small>{style.fontSize}px</small></li>
            <ul className="flex f-row gap-m">
                <li className='flex f-row gap-xs f-center-h'>
                    <Icon icon={ArrowHorizontal} />
                    <small>{cssStyle.letterSpacing}</small>
                </li>
                <li className='flex f-row gap-xs f-center-h'>
                    <Icon icon={ArrowVertical} />
                    <small>{cssStyle.lineHeight}</small>
                </li>
            </ul>
        </ul>
    );
}