import { folderNameFromPath, styleContextMenu } from '@lib/utils/style';
import './Text.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@components/input';
import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import { send } from '@lib/ipc';
import { TextOptions } from '@components/text-options';
import { loadFont } from '@lib/utils/font.action';
import { cssTextStyle, valueUnitFrom } from '@lib/utils/font';
import { TextSet } from '@ctypes/text';
import { display as displayTooltip, destroy as destroyTooltip } from '@lib/slices/tooltip';
import { display as displayContextMenu } from '@lib/slices/contextmenu';

export default (props: TextSet) => {

    const dispatch = useDispatch();

    const displayMode = useSelector((state: any) => state.style.display);
    const styleName = folderNameFromPath(String(props.name)).name;
    const cssStyle = cssTextStyle(props) as any;

    //Set Dynamic Height
    const MIN_HEIGHT = 96;
    const lineHeightValue = valueUnitFrom(cssStyle.lineHeight).value || MIN_HEIGHT;
    const expandedHeight = cssStyle.lineHeight !== 'auto' ? Math.max(lineHeightValue, MIN_HEIGHT) + 'px' : `${cssStyle.fontSize}px`;
    const initHeight = cssStyle.lineHeight !== 'auto' ? cssStyle.lineHeight : `${cssStyle.fontSize}px`;
    const [active, setActive] = useState(false);

    const dynamicOptions: boolean = props.options?.dynamic === undefined || !!props.options?.dynamic;

    const containerRef = useRef<any>();
    const currentFont = useRef<string>();

    useEffect(() => {
        if (currentFont.current !== props.fontName?.family) {
            loadFont(props.fontName);
            currentFont.current = String(props.fontName?.family);
        }
    }, [props.fontName?.family]);

    useEffect(() => {

        const handleOnMouseLeave = (e: BaseSyntheticEvent) => {
            displayMode === 'grid' && dispatch(destroyTooltip());
            const hasActiveChildren = e.target.querySelector('input:focus') || e.target.querySelector('.text-options[data-active=\'true\']');
            displayMode === 'list' && !hasActiveChildren && setActive(false);
        };

        const handleOnMouseEnter = (e: BaseSyntheticEvent) => {
            displayMode === 'grid' && handleToolTip(e.target);
            displayMode === 'list' && dynamicOptions && setActive(true);
        };

        if (containerRef.current) {
            containerRef.current.addEventListener('mouseenter', handleOnMouseEnter);
            containerRef.current.addEventListener('mouseleave', handleOnMouseLeave);
        }

        return () => {
            containerRef.current?.removeEventListener('mouseenter', handleOnMouseEnter);
            containerRef.current?.removeEventListener('mouseleave', handleOnMouseLeave);
        }


    }, [displayMode]);

    const updateName = (e: BaseSyntheticEvent) => {
        send({
            action: 'UPDATE_STYLE_TEXT',
            payload: {
                style: props,
                newStyle: { name: e.target.value }
            }
        });
    };


    const handleToolTip = (ref: any) => {
        const { x, y, width, height } = ref.getBoundingClientRect();
        dispatch(displayTooltip({
            content: [
                { type: 'INPUT', value: styleName, action: 'UPDATE_STYLE_NAME', payload: { style: props, name: null } },
                { type: 'TEXT', value: String(props.fontName?.family) },
                { type: 'TEXT', value: String(props.fontName?.style) },
            ],
            boundingBox: { x, y, width, height }
        }));
    }

    return (<div
        className="style-item-font flex"
        onContextMenu={(e: any) => {
            e.preventDefault();
            dispatch<any>(displayContextMenu({
                commands: styleContextMenu({ style: props, editCommand: 'MODALE_EDIT_STYLE_COLOR' }),
                position: { x: e.clientX, y: e.clientY }
            }))
        }}
        ref={containerRef}
        data-line-height={!!(props.options?.lineHeightBorder !== undefined ? props.options?.lineHeightBorder : displayMode === 'list')}
        data-display-mode={props.options?.displayMode || displayMode}
        data-dynamic-options={dynamicOptions}
        {...(displayMode === 'list' && { style: { height: `${active ? expandedHeight : initHeight}` } })}  // set padding as LineHeight to emulate de height
    >
        <div className='style-item-font-container flex f-center-h full-width' >
            <Input {...((displayMode === 'list' || props.options?.displayMode === 'list') && { style: { ...cssStyle, ...(dynamicOptions && { height: cssStyle.lineHeight }) } })}
                value={styleName}
                appearance={{ minified: false, stroke: false }}
                onBlur={updateName}
                onEnter={updateName}
            />
        </div>

        <TextOptions {...props} />
    </div>);
}