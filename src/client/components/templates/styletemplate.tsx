import * as React from "react";
import { useState, useEffect } from "react";
import { SectionHeader } from "@components/sectionheader";
import List from '@icons/list-bulleted.svg';
import Plus from '@icons/add.svg';
import { ButtonPad } from "@components/button-pad";
import { FolderContainer } from "@components/folder-container";
import { ButtonPad as ButtonPadInterface, Option as OptionInterface } from "@lib/interfaces";
import { get, listen } from '@lib/ipc';

interface StyleTemplate {
    title: string;
    onSwitchDisplay: any;
    onAddStyle: any;
    padStyle: ButtonPadInterface;
    getStyleMethod?: string;
    styleItem: React.FunctionComponent;
    custom?: {};
};


export default ({ 
    title, 
    onSwitchDisplay, 
    onAddStyle, 
    padStyle, 
    getStyleMethod, 
    styleItem,
    custom={}
}: StyleTemplate) => {

    const optionMap = [
        { icon: List, onClick: onSwitchDisplay },
        { icon: Plus, onClick: onAddStyle },
    ];


    const [styles, setStyles] = useState([]);
    const handleOnMessage = (e:any) => console.log(e);
    listen(handleOnMessage);

    useEffect(() => {

        if (getStyleMethod) {
            get({ type: getStyleMethod }).then( ({styles}:{styles:Array<never>}) => setStyles(styles) );
        }

    }, []);





    return (<>
        <SectionHeader title={title} options={optionMap} />
        {!!styles && !!styles.length ?
            //styles view
            <FolderContainer styles={styles} styleItem={styleItem} custom={{...custom}} />
            :
            //default view
            <div className="full-height full-width flex f-center">
                <ButtonPad icon={padStyle.icon} text={padStyle.text} onClick={padStyle.onClick} />
            </div>
        }
    </>);
};