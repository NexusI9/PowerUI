import { folderNameFromPath } from '@lib/utils/style';
import './index.scss';
import { useSelector } from 'react-redux';
import { Input } from '@components/input';
import { BaseSyntheticEvent } from 'react';
import { send } from '@lib/ipc';
import { cssTextStyle } from '@lib/utils/font';
import { FontOptions } from '@components/font-options';

export const Font = (props: any) => {

    const displayMode = useSelector((state: any) => state.style.display);
    const style = cssTextStyle(props);

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
        <FontOptions style={props} />
    </div>);
}