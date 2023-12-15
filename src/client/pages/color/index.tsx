import * as React from "react";

import { StyleTemplate } from "@components/templates";
import PaintPlus from '@icons/paint-plus.svg';


export default() => (
    <StyleTemplate
        title="Colors"
        onAddStyle={ () => 0}
        onSwitchDisplay={ () => 0}
        padStyle={{
            icon:PaintPlus,
            text:'Create Swatch',
            onClick: () => 0
        }}
        getStyleMethod="getPaintStyles"
    >
    <></>
    </StyleTemplate>);