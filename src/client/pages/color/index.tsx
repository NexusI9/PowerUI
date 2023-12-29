import { Swatch } from "@components/swatch/swatch";
import { Style } from "@templates/style";
import PaintPlus from '@icons/paint-plus.svg';
import { ButtonPad } from "@ctypes/input";
import { send } from "@lib/ipc";
import SwatchIcon from '@icons/swatch.svg';
import { useDispatch } from "react-redux";
import { spawn } from "@lib/slices/workbench";
import { CREATE_SWATCH_CONFIG } from "./workbench.config";
import { StyleFolder } from "@lib/types/style";

export default () => {

    const buttonPadStyle: ButtonPad = {
        icon: PaintPlus,
        text: 'Create Swatch',
        onClick: () => 0
    };

    const handleAddItem = ({ folder, name }: { folder: string, name: string }) => {
        send({ action: "ADD_STYLE_COLOR", folder, name, type: 'COLOR' });
    }

    const dispatch = useDispatch();

    return (
        <Style
            title="Colors"
            onAddItem={handleAddItem}
            onSwitchDisplay={() => 0}
            padStyle={buttonPadStyle}
            getStyleMethod="GET_PAINT_STYLES"
            styleItem={Swatch}
            options={{
                header: {
                    add: { icon: SwatchIcon, onClick: () => dispatch(spawn({ ...CREATE_SWATCH_CONFIG, folder: 'root' })) }
                },
                folder: {
                    add: { icon: SwatchIcon, onClick: (folder: StyleFolder) => dispatch(spawn({ ...CREATE_SWATCH_CONFIG, folder: folder.fullpath })) },
                    kebab: [
                        { text: 'Sort by name', action: 'SORT_STYLE_NAME', payload: {} },
                        { text: 'Sort by brightness', action: 'SORT_STYLE_COLOR_BRIGHTNESS', payload: {} },
                        { text: 'Sort by saturation', action: 'SORT_STYLE_COLOR_SATURATION', payload: {} }
                    ],
                    edit:{onClick: () => 0}
                }
            }}
        />);
}