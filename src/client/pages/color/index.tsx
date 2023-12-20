import { Swatch } from "@components/style-item/swatch";
import { StyleTemplate } from "@components/templates";
import PaintPlus from '@icons/paint-plus.svg';
import { ButtonPad } from "@lib/interfaces";
import { send } from "@lib/ipc";

export default () => {
    
    const buttonPadStyle: ButtonPad = {
        icon: PaintPlus,
        text: 'Create Swatch',
        onClick: () => 0
    };

    const handleAddItem = ({folder, name}:{folder:string, name:string}) => {
        send({type:"ADD_STYLE_COLOR", folder, name});
    }

    
    return (
        <StyleTemplate
            title="Colors"
            onAddItem={handleAddItem}
            onSwitchDisplay={() => 0}
            padStyle={buttonPadStyle}
            getStyleMethod="GET_PAINT_STYLES"
            styleItem={Swatch}
        />);
}