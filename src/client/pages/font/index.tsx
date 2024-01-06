import { Font } from "@components/font/font";
import { Style } from "@templates/style";
import FontPlus from '@icons/font-plus.svg';
import { GET_TEXT_STYLES_COMMAND } from "@lib/constants";


export default () => (
    <Style
        title="Fonts"
        onAddItem={() => 0}
        onSwitchDisplay={() => 0}
        padStyle={{
            icon: FontPlus,
            text: 'Create Fonts Set',
            onClick: () => 0
        }}
        getStyleMethod={GET_TEXT_STYLES_COMMAND}
        styleItem={Font}
    />
);