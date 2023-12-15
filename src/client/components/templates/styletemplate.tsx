import * as React from "react";
import { useState, useEffect } from "react";
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
    getStyleMethod?:string;
};


export default ({ children, title, onSwitchDisplay, onAddStyle, padStyle, getStyleMethod }: StyleTemplate) => {

    const optionMap = [
        { icon: List, onClick: onSwitchDisplay },
        { icon: Plus, onClick: onAddStyle },
    ];

    const [styles, setStyles] = useState([]);

    useEffect(() => {

        if(getStyleMethod){
            get({ type: getStyleMethod }).then(r => setStyles(r)); 
        }

    }, []);

    return (<>
        <SectionHeader title={title} options={optionMap} />
        {!!styles && !!styles.length ?
            //styles view
            { children }
            :
            //default view
            <div className="full-height full-width flex f-center">
                <ButtonPad icon={padStyle.icon} text={padStyle.text} onClick={padStyle.onClick} />
            </div>
        }
    </>);
};