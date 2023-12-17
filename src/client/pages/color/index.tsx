import { Swatch } from "@components/style-item/swatch";
import { StyleTemplate } from "@components/templates";
import PaintPlus from '@icons/paint-plus.svg';
import { ButtonPad } from "@lib/interfaces";

export default () => {
    
    const buttonPadStyle: ButtonPad = {
        icon: PaintPlus,
        text: 'Create Swatch',
        onClick: () => 0
    };

    
    return (
        <StyleTemplate
            title="Colors"
            onAddStyle={() => 0}
            onSwitchDisplay={() => 0}
            padStyle={buttonPadStyle}
            getStyleMethod="getPaintStyles"
            styleItem={Swatch}
        />);
}