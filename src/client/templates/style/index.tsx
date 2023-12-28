import * as React from "react";
import { useState, useEffect } from "react";
import { SectionHeader } from "@components/section-header";
import List from '@icons/list-bulleted.svg';
import Plus from '@icons/add.svg';
import Grid from '@icons/table.svg';
import { ButtonPad } from "@components/button-pad";
import { FolderContainer } from "@components/folder-container";
import { ButtonPad as IButtonPad } from "@ctypes/input";
import { FolderOptions } from '@ctypes/folder';
import { get, listen } from '@lib/ipc';

interface StyleTemplate {
    title: string;
    onSwitchDisplay: any;
    onAddItem: any;
    padStyle: IButtonPad;
    getStyleMethod?: string;
    styleItem: React.FunctionComponent;
    options?: FolderOptions;
};


export const Style = ({
    title,
    onSwitchDisplay,
    onAddItem,
    padStyle,
    getStyleMethod,
    styleItem,
    options
}: StyleTemplate) => {

    const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
    const [reload, setReload] = useState(0);
    const [styles, setStyles] = useState([]);

    const optionMap = [
        {
            icon: displayMode === 'grid' ? List : Grid,
            onClick: () => {
                const newDisplayMode = displayMode == 'grid' ? 'list' : 'grid';
                setDisplayMode(newDisplayMode);
                onSwitchDisplay(newDisplayMode);
            }
        },
        {
            icon: options?.header?.add?.icon || Plus,
            onClick: options?.header?.add?.onClick
        },
    ];


    const handleOnMessage = (e: any) => {
        if (e.action === 'RELOAD_PAGE') {
            setReload(Date.now());
        }
    };

    listen(handleOnMessage);

    useEffect(() => {

        if (getStyleMethod) {
            get({ action: getStyleMethod }).then(({ styles }: { styles: Array<never> }) => setStyles(styles));
        }

    }, [reload]);


    return (<>
        <SectionHeader title={title} options={optionMap} />
        {!!styles && !!styles.length ?
            //styles view
            <FolderContainer
                styles={styles}
                styleItem={styleItem}
                options={{ ...options }}
                onAddItem={onAddItem}
                displayMode={displayMode}
            />
            :
            //default view
            <div className="full-height full-width flex f-center">
                <ButtonPad icon={padStyle.icon} text={padStyle.text} onClick={padStyle.onClick} />
            </div>
        }
    </>);
};