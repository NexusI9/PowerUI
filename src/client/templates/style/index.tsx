import { useState, useEffect } from "react";
import { SectionHeader } from "@components/section-header";
import List from '@icons/list-bulleted.svg';
import Plus from '@icons/add.svg';
import Grid from '@icons/table.svg';
import Upload from '@icons/upload.svg';
import Dev from '@icons/dev.svg';
import { ButtonPad } from "@components/button-pad";
import { FolderContainer } from "@components/folder-container";
import { ButtonPad as IButtonPad } from "src/types/input";
import { FolderOptions } from 'src/types/folder';
import { get, listen } from '@lib/ipc';
import { StyleFolder } from "src/types/style";
import { useDispatch, useSelector } from "react-redux";
import { switchDisplay } from "@lib/slices/style";

interface StyleTemplate {
    title: string;
    onAddItem: any;
    padStyle: IButtonPad;
    getStyleMethod?: string;
    styleItem: any;
    options?: FolderOptions;
};


export const Style = ({
    title,
    onAddItem,
    padStyle,
    getStyleMethod,
    styleItem,
    options
}: StyleTemplate) => {

    const [reload, setReload] = useState(0);
    const [folder, setFolder] = useState<null | Array<StyleFolder>>();
    const [headerOptions, setHeaderOptions] = useState<any>([]);
    const dispatch = useDispatch();
    const displayMode = useSelector((state: any) => state.style.display);
    const handleOnMessage = (e: any) => (e.action === 'RELOAD_PAGE') && setReload(performance.now());

    listen(handleOnMessage);

    useEffect(() => {

        if (getStyleMethod) {
            get({ action: getStyleMethod }).then(({ styles }: { styles: Array<never> }) => setFolder(styles));
        }

    }, [reload]);

    useEffect(() => {

        //set header option;
        const optionMap = [
            {
                icon: options?.header?.add?.icon || Plus,
                onClick: () => folder?.map(folder => options?.header?.add?.onClick(folder))
            },
            {
                icon:  options?.header?.export?.icon || Upload,
                onClick: () => folder?.map(folder => options?.header?.export?.onClick(folder))
            },
            {
                icon:  options?.header?.dev?.icon || Dev,
                onClick: () => folder?.map(folder => options?.header?.dev?.onClick(folder))
            },
            {
                icon: displayMode === 'grid' ? List : Grid,
                onClick: () => dispatch(switchDisplay(null))
            }
        ];

        setHeaderOptions(optionMap);
    }, [folder, displayMode]);

    return (<>
        {!!headerOptions.length && <SectionHeader title={title} options={headerOptions} />}
        {folder ? (folder[0].styles.length || folder[0].folders.length ?
            //styles view
            <FolderContainer
                styles={folder}
                styleItem={styleItem}
                options={options}
                onAddItem={onAddItem}
                displayMode={displayMode}
            />
            :
            //default view
            <div className="full-height full-width flex f-center">
                <ButtonPad icon={padStyle.icon} text={padStyle.value} onClick={() => folder?.map(folder => padStyle.onClick(folder))} />
            </div>) : <></>
        }
    </>);
};