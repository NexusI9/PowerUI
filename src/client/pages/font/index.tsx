import * as React from "react";

import { StyleTemplate } from "@components/templates";
import FontPlus from '@icons/font-plus.svg';


export default () => (
    <StyleTemplate
        title="Fonts"
        onAddStyle={() => 0}
        onSwitchDisplay={() => 0}
        padStyle={{
            icon: FontPlus,
            text: 'Create Fonts Set',
            onClick: () => 0
        }}
    >
        <></>
    </StyleTemplate>);