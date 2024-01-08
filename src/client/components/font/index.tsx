import ArrowHorizontal from '@icons/horizontal.svg';
import ArrowVertical from '@icons/vertical.svg';
import { convertFont, convertUnit, folderNameFromPath } from '@lib/utils/style';
import './index.scss';
import { Icon } from '@components/icon';
import { useSelector } from 'react-redux';
import { Input } from '@components/input';
import { BaseSyntheticEvent } from 'react';
import { send } from '@lib/ipc';
import { Input as IInput } from '@ctypes/input';

export const Font = (props: any) => {

    const displayMode = useSelector((state: any) => state.style.display);

    const style = {
        fontWeight: convertFont(props.fontName.style),
        fontSize: props.fontSize + 'px',
        letterSpacing: String((props.letterSpacing.value || 0) + convertUnit(props.letterSpacing.unit)),
        lineHeight: String((props.lineHeight.value || '') + convertUnit(props.lineHeight.unit)),
    }

    const dragInputs:{[key:string]: IInput} = {
        fontSize: { value: style.fontSize, range: [0, 1000], step:1 },
        letterSpacing: { value: style.letterSpacing, range: [-100, 100], step:1 },
        lineHeight: { value: style.lineHeight, range: [0, 100], step:1 },
    }

    const updateName = (e: BaseSyntheticEvent) => {
        send({
            action: 'UPDATE_STYLE_TEXT',
            payload: {
                style: props,
                newStyle: { name: e.target.value }
            }
        });
    }


    return (<div className="style-item-font flex">
        <Input
            {...(displayMode === 'list' && { style: style })}
            value={folderNameFromPath(props.name).name}
            appearance={{ minified: true, stroke: false }}
            onBlur={updateName}
            onEnter={updateName}
        />
        <ul className="style-item-font-details flex f-col">
            <li><small>{props.fontName.family}</small></li>
            <li><small>{props.fontSize}px</small></li>
            <ul className="flex f-row gap-m">
                <li className='flex f-row gap-xs f-center-h'>
                    <Icon icon={ArrowHorizontal} />
                    <small>{style.letterSpacing}</small>
                </li>
                <li className='flex f-row gap-xs f-center-h'>
                    <Icon icon={ArrowVertical} />
                    <small>{style.lineHeight}</small>
                </li>
            </ul>
        </ul>
    </div>);
}