import { Swatch } from "@components/swatch/swatch";
import { Style } from "@templates/style";
import PaintPlus from '@icons/paint-plus.svg';
import SwatchIcon from '@icons/swatch.svg';
import { ButtonPad } from "src/types/input";
import { send } from "@lib/ipc";
import { useDispatch } from "react-redux";
import { init as initWorkbench } from "@lib/slices/workbench.template";
import { CREATE_SWATCH_CONFIG, EDIT_SWATCH_CONFIG } from "./workbench.config";
import { StyleFolder } from "src/types/style";
import { GET_PAINT_STYLES_COMMAND } from "@lib/constants";
import { FolderOptions } from "src/types/folder";

export default () => {

    const createSwatch = (folder: StyleFolder) => dispatch(initWorkbench({ ...CREATE_SWATCH_CONFIG, folder: folder }));

    const buttonPadStyle: ButtonPad = {
        icon: PaintPlus,
        value: 'Create Swatch',
        onClick: createSwatch
    };

    const options: FolderOptions = {
        header: {
            add: { icon: SwatchIcon, onClick: createSwatch },
            export: { onClick: () => 0 },
            dev: { onClick: () => 0 }
        },
        folder: {
            add: { icon: SwatchIcon, onClick: createSwatch },
            kebab: [
                { value: 'Sort by name', action: 'SORT_STYLE_NAME', payload: {}, receiver: 'API' },
                { value: 'Sort by brightness', action: 'SORT_STYLE_COLOR_BRIGHTNESS', payload: {}, receiver: 'API' },
                { value: 'Sort by saturation', action: 'SORT_STYLE_COLOR_SATURATION', payload: {}, receiver: 'API' }
            ],
            edit: { onClick: (folder: StyleFolder) => dispatch(initWorkbench({ ...EDIT_SWATCH_CONFIG, folder: folder, config: { styles: [...folder.styles as Array<PaintStyle>] } })) }
        }
    };

    const handleAddItem = ({ name }: { name: string }) => {
        send({ action: "ADD_STYLE", payload: { name, type: 'PAINT' } });
    };

    const dispatch = useDispatch();

    return (
        <Style
            title="Colors"
            onAddItem={handleAddItem}
            padStyle={buttonPadStyle}
            getStyleMethod={GET_PAINT_STYLES_COMMAND}
            styleItem={Swatch}
            options={options}
        />);
}