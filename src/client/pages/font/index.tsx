import { Font } from "@components/font";
import { Style } from "@templates/style";
import FontPlus from '@icons/font-plus.svg';
import { GET_TEXT_STYLES_COMMAND } from "@lib/constants";
import { FolderOptions } from "@ctypes/folder";
import { StyleFolder } from "@ctypes/style";
import { useDispatch } from "react-redux";
import { spawn } from "@lib/slices/workbench";
import { CREATE_SWATCH_CONFIG, EDIT_SWATCH_CONFIG } from "./workbench.config";
import SetIcon from '@icons/font-set.svg';
import { switchDisplay } from "@lib/slices/style";

export default () => {

    const dispatch = useDispatch();
    const onCreateSet = (folder: StyleFolder) => {
        dispatch(spawn({ ...CREATE_SWATCH_CONFIG, folder: folder }));
        dispatch(switchDisplay('list'));
    }

    const options: FolderOptions = {
        header: {
            add: { icon: SetIcon, onClick: onCreateSet  }
        },
        folder: {
            add: { icon: SetIcon, onClick: onCreateSet },
            kebab: [
                { text: 'Sort by name', action: 'SORT_STYLE_NAME', payload: {}, receiver: 'API' },
                { text: 'Sort by brightness', action: 'SORT_STYLE_COLOR_BRIGHTNESS', payload: {}, receiver: 'API' },
                { text: 'Sort by saturation', action: 'SORT_STYLE_COLOR_SATURATION', payload: {}, receiver: 'API' }
            ],
            edit: { onClick: (folder: StyleFolder) => dispatch(spawn({ ...EDIT_SWATCH_CONFIG, folder: folder, config: { styles: [...folder.styles as Array<PaintStyle>] } })) }
        }
    };

    return(
        <Style
            title="Fonts"
            onAddItem={() => 0}
            padStyle={{
                icon: FontPlus,
                text: 'Create Fonts Set',
                onClick: () => 0
            }}
            getStyleMethod={GET_TEXT_STYLES_COMMAND}
            styleItem={Font}
            options={options}
        />
    );
}