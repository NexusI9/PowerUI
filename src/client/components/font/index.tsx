import { folderNameFromPath, styleContextMenu } from '@lib/utils/style';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@components/input';
import { BaseSyntheticEvent, useEffect, useRef } from 'react';
import { send } from '@lib/ipc';
import { FontOptions } from '@components/font-options';
import { loadFont } from '@lib/utils/font.action';
import { cssTextStyle } from '@lib/utils/font';
import { TextSet } from '@ctypes/text';
import { display as displayTooltip, destroy as destroyTooltip } from '@lib/slices/tooltip';
import { display as displayContextMenu } from '@lib/slices/contextmenu';

export const Font = (props: TextSet) => {

    const displayMode = useSelector((state: any) => state.style.display);
    const dispatch = useDispatch();
    const fontLoaded = useRef(false);
    const styleName = folderNameFromPath(String(props.name)).name;

    useEffect(() => {
        if (!fontLoaded.current) {
            loadFont(props.fontName);
            fontLoaded.current = true;
        }
    }, []);

    const updateName = (e: BaseSyntheticEvent) => {
        send({
            action: 'UPDATE_STYLE_TEXT',
            payload: {
                style: props,
                newStyle: { name: e.target.value }
            }
        });
    }

    const handleToolTip = (ref: any) => {
        const { x, y, width, height } = ref.getBoundingClientRect();
        dispatch(displayTooltip({
            content: [
                { type: 'INPUT', value: styleName, action: 'UPDATE_STYLE_NAME', payload: { style: props, name: null } },
            ],
            boundingBox: { x, y, width, height }
        }));
    }

    return (<div
        className="style-item-font flex"
        onContextMenu={(e: any) => {
            displayMode === 'grid' && dispatch<any>(displayContextMenu({
                commands: styleContextMenu({ style: props, editCommand: 'MODALE_EDIT_STYLE_COLOR' }),
                position: { x: e.clientX, y: e.clientY }
            }))
        }}
        onMouseEnter={(e) => displayMode === 'grid' && handleToolTip(e.target)}
        onMouseLeave={() => dispatch(destroyTooltip())}
    >
        <Input
            {...(displayMode === 'list' && { style: cssTextStyle(props) })}
            value={styleName}
            appearance={{ minified: true }}
            onBlur={updateName}
            onEnter={updateName}
        />
        <FontOptions style={props} />
    </div>);
}