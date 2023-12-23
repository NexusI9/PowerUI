import { Font } from "@components/font/font";
import { StyleTemplate } from "@components/templates";
import FontPlus from '@icons/font-plus.svg';


export default () => (
    <StyleTemplate
        title="Fonts"
        onAddItem={() => 0}
        onSwitchDisplay={() => 0}
        padStyle={{
            icon: FontPlus,
            text: 'Create Fonts Set',
            onClick: () => 0
        }}
        getStyleMethod="GET_TEXT_STYLES"
        styleItem={Font}
    />
    );