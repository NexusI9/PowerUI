import { Swatch } from "@components/swatch/swatch";
import { StyleTemplate } from "@components/templates";
import PaintPlus from '@icons/paint-plus.svg';
import { ButtonPad } from "@lib/interfaces";
import { send } from "@lib/ipc";
import SwatchIcon from '@icons/swatch.svg';


export default () => {

    const buttonPadStyle: ButtonPad = {
        icon: PaintPlus,
        text: 'Create Swatch',
        onClick: () => 0
    };

    const handleAddItem = ({ folder, name }: { folder: string, name: string }) => {
        send({ action: "ADD_STYLE_COLOR", folder, name, type:'COLOR' });
    }


    return (
        <StyleTemplate
            title="Colors"
            onAddItem={handleAddItem}
            onSwitchDisplay={() => 0}
            padStyle={buttonPadStyle}
            getStyleMethod="GET_PAINT_STYLES"
            styleItem={Swatch}
            custom={{
                options: {
                    add: { icon: SwatchIcon },
                    kebab: [
                        { text: 'Sort by brightness', action: 'SORT_STYLE_COLOR_BRIGHTNESS', payload: {} },
                        { text: 'Sort by saturation', action: 'SORT_STYLE_COLOR_SATURATION', payload: {} }
                    ]
                }
            }}
        />);
}