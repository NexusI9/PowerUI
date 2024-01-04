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
import { StyleColor, StyleFolder, StyleText } from "@ctypes/style";

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
    const [styles, setStyles] = useState<null | Array<StyleFolder>>();
    const [headerOptions, setHeaderOptions] = useState<any>([]);


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

    useEffect(() => {
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
                onClick: () => styles?.map(style => options?.header?.add?.onClick(style))
            },
        ];

        setHeaderOptions(optionMap);
    }, [styles]);


    return (<>
        {!!headerOptions.length && <SectionHeader title={title} options={headerOptions} />}
        {styles ? (!!styles.length ?
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
            </div>) : <></>
        }
    </>);
};