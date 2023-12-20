import * as React from "react";
import { useState, useEffect } from "react";
import { SectionHeader } from "@components/sectionheader";
import List from '@icons/list-bulleted.svg';
import Plus from '@icons/add.svg';
import { ButtonPad } from "@components/button-pad";
import { FolderContainer } from "@components/folder-container";
import { ButtonPad as ButtonPadInterface } from "@lib/interfaces";
import { get, listen } from '@lib/ipc';

interface StyleTemplate {
    title: string;
    onSwitchDisplay: any;
    onAddItem: any;
    padStyle: ButtonPadInterface;
    getStyleMethod?: string;
    styleItem: React.FunctionComponent;
    custom?: {};
};


export default ({ 
    title, 
    onSwitchDisplay, 
    onAddItem, 
    padStyle, 
    getStyleMethod, 
    styleItem,
    custom={}
}: StyleTemplate) => {

    const optionMap = [
        { icon: List, onClick: onSwitchDisplay },
        { icon: Plus, onClick: () => onAddItem({folder:'', name:'new-item'}) },
    ];

    const [reload, setReload] = useState(0);
    const [styles, setStyles] = useState([]);
    const handleOnMessage = (e:any) =>{
        if(e.type === 'RELOAD_PAGE'){
            const date = new Date();
            setReload(date.getTime());
        }
    };
    
    listen(handleOnMessage);

    useEffect(() => {

        if (getStyleMethod) {
            get({ type: getStyleMethod }).then( ({styles}:{styles:Array<never>}) => setStyles(styles) );
        }

    }, [reload]);


    return (<>
        <SectionHeader title={title} options={optionMap} />
        {!!styles && !!styles.length ?
            //styles view
            <FolderContainer styles={styles} styleItem={styleItem} custom={{...custom}} onAddItem={onAddItem} />
            :
            //default view
            <div className="full-height full-width flex f-center">
                <ButtonPad icon={padStyle.icon} text={padStyle.text} onClick={padStyle.onClick} />
            </div>
        }
    </>);
};