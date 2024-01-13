import { folderNameFromPath, styleContextMenu } from '@lib/utils/style';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@components/input';
import { BaseSyntheticEvent } from 'react';
import { send } from '@lib/ipc';
import { FontOptions } from '@components/font-options';
import { cssTextStyle } from '@lib/utils/font';
import { TextSet } from '@ctypes/text';
import { display as displayContextMenu } from '@lib/slices/contextmenu';

export const Font = (props: TextSet) => {

    const displayMode = useSelector((state: any) => state.style.display);
    const dispatch = useDispatch();

    const updateName = (e: BaseSyntheticEvent) => {
        send({
            action: 'UPDATE_STYLE_TEXT',
            payload: {
                style: props,
                newStyle: { name: e.target.value }
            }
        });
    }

    return (<div
        className="style-item-font flex"
        onContextMenu={(e: any) => {
            displayMode === 'grid' && dispatch<any>(displayContextMenu({
                commands: styleContextMenu({ style: props, editCommand: 'MODALE_EDIT_STYLE_COLOR' }),
                position: { x: e.clientX, y: e.clientY }
            }))
        }}
    >
        <Input
            {...(displayMode === 'list' && { style: cssTextStyle(props) })}
            value={folderNameFromPath(String(props?.name)).name}
            appearance={{ minified: true, stroke: false }}
            onBlur={updateName}
            onEnter={updateName}
        />
        <FontOptions style={props} />
    </div>);
}