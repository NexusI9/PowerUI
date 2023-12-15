import * as React from "react";
import { useState } from "react";
import { SectionHeader } from "@components/sectionheader";
import List from '@icons/list-bulleted.svg';
import Plus from '@icons/add.svg';
import { ButtonPad } from "@components/button-pad";
import { ButtonPad as ButtonPadInterface } from "@lib/interfaces";
import { get } from '@lib/ipc';

interface StyleTemplate {
    children: React.JSX.Element;
    title: string;
    onSwitchDisplay: any;
    onAddStyle: any;
    padStyle: ButtonPadInterface;
};


export default ({ children, title, onSwitchDisplay, onAddStyle, padStyle }: StyleTemplate) => {

    const optionMap = [
        { icon: List, onClick: onSwitchDisplay },
        { icon: Plus, onClick: onAddStyle },
    ];

    const [styles, setStyles] = useState([]);

    get({type:'getPaintStyles'}).then(r => console.log({r}));


    return (<>
        {console.log(styles)}
        <SectionHeader title={title} options={optionMap} />
        <div className="full-height full-width flex f-center">
            <ButtonPad icon={padStyle.icon} text={padStyle.text} onClick={padStyle.onClick} />
        </div>
        {children}
    </>);
};