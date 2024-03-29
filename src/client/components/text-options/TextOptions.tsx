import './TextOptions.scss';
import { Input as IInput } from 'src/types/input';
import ArrowHorizontal from '@icons/horizontal.svg';
import ArrowVertical from '@icons/vertical.svg';
import { Icon } from '@components/icon';
import { cssTextStyle, valueUnitFrom } from '@lib/utils/font';
import { TextSet } from '@ctypes/text';
import { Input } from '@components/input';
import { BaseSyntheticEvent, useState } from 'react';
import { updateAttribute } from './TextOptions.helper';
import { Dropdown } from '@components/dropdown';
import { ContextMenuListener } from '@components/context-menu';
import { ContextMenuCommand } from '@ctypes/contextmenu';
import { send } from '@lib/ipc';


export default (style: TextSet) => {

    const { options } = style;
    const cssStyle = cssTextStyle(style, 'OBJECT') as Record<string, any>;
    const [active, setActive] = useState(false);

    const inputStyle = {
        minified: true,
        arrow: false,
        stroke: false
    }

    const contextMenuCommands = [
        {
            action: 'UPDATE_TEXT_FONT',
            callback: (e: ContextMenuCommand) => {
                send({
                    action: 'UPDATE_STYLE_TEXT',
                    payload: {
                        style: e.payload,
                        newStyle: { fontName: { ...e.payload.fontName, family: e.value } }
                    }
                });
            }
        },
        {
            action: 'UPDATE_TEXT_WEIGHT',
            callback: (e: ContextMenuCommand) => {
                send({
                    action: 'UPDATE_STYLE_TEXT',
                    payload: {
                        style: e.payload,
                        newStyle: { fontName: { ...e.payload.fontName, style: e.value } }
                    }
                });
            }
        }
    ];


    const dragInputs: { [key: string]: IInput } = {
        fontSize: {
            type: 'AMOUNT',
            value: cssStyle.fontSize,
            appearance: inputStyle,
            onBlur: (e: BaseSyntheticEvent) => updateAttribute(style, 'fontSize', Math.max(1, valueUnitFrom(e.target.value).value)),
            onEnter: (e: BaseSyntheticEvent) => updateAttribute(style, 'fontSize', Math.max(1, valueUnitFrom(e.target.value).value)),
            onChange: (e: BaseSyntheticEvent) => updateAttribute(style, 'fontSize', Math.max(1, valueUnitFrom(e.target.value).value))
        },
        letterSpacing: {
            type: 'AMOUNT',
            value: cssStyle.letterSpacing,
            appearance: inputStyle,
            onBlur: (e: BaseSyntheticEvent) => updateAttribute(style, 'letterSpacing', valueUnitFrom(e.target.value)),
            onEnter: (e: BaseSyntheticEvent) => updateAttribute(style, 'letterSpacing', valueUnitFrom(e.target.value)),
            onChange: (e: BaseSyntheticEvent) => updateAttribute(style, 'letterSpacing', valueUnitFrom(e.target.value))
        },
        lineHeight: {
            type: 'AMOUNT',
            value: cssStyle.lineHeight,
            appearance: inputStyle,
            onBlur: (e: BaseSyntheticEvent) => updateAttribute(style, 'lineHeight', valueUnitFrom(e.target.value)),
            onEnter: (e: BaseSyntheticEvent) => updateAttribute(style, 'lineHeight', valueUnitFrom(e.target.value)),
            onChange: (e: BaseSyntheticEvent) => updateAttribute(style, 'lineHeight', valueUnitFrom(e.target.value)),
        },
    }

    return (
        <ContextMenuListener commands={contextMenuCommands}>
            <ul
                className="text-options flex f-col gap-s"
                data-active={active}
            >
                {(!options || options?.fontFamily) &&
                    <li className='text-options-font-family full-width'>
                        <Dropdown
                            list={[{ value: { action: 'FONT_LIST', placeholder: String(style.fontName?.family), payload: style.fontName?.family }, receiver: 'STORE', action: 'UPDATE_TEXT_FONT', payload: style }]}
                            appearance={{ stroke: false, minified: true }}
                            value={String(style.fontName?.family)}
                            onFocus={() => setActive(true)}
                            onBlur={() => setActive(false)}
                        />
                    </li>
                }
                <ul className="flex f-row gap-s full-width">
                    {(!options || options?.fontSize) && <li className='text-options-font-size'><Input {...dragInputs.fontSize} /></li>}
                    {(!options || options?.fontWeight) && <li className='text-options-font-weight'>
                        <Dropdown
                            key={`weight${String(style.fontName?.family)}${String(style.id)}`}
                            list={[{ value: { action: 'FONT_WEIGHTS', placeholder: String(style.fontName?.family), payload: style.fontName?.family }, receiver: 'STORE', action: 'UPDATE_TEXT_WEIGHT', payload: style }]}
                            appearance={{ stroke: false, minified: true }}
                            value={String(style.fontName?.style)}
                            onFocus={() => setActive(true)}
                            onBlur={() => setActive(false)}
                        />
                    </li>}
                </ul>
                <ul className="flex f-row gap-s full-width">
                    {
                        (!options || options?.letterSpacing) &&
                        <li className='text-options-letter-spacing flex f-row gap-xs f-center-h'>
                            <Icon icon={ArrowHorizontal} />
                            <Input {...dragInputs.letterSpacing} />
                        </li>
                    }
                    {
                        (!options || options?.lineHeight) &&
                        < li className='text-options-line-height flex f-row gap-xs f-center-h'>
                            <Icon icon={ArrowVertical} />
                            <Input {...dragInputs.lineHeight} />
                        </li>
                    }

                </ul>
            </ul >
        </ContextMenuListener>
    );
}