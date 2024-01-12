import { StyleFolder } from "src/types/style";
import { Folder } from "@components/folder";
import * as React from 'react';
import { ButtonIcon } from "@components/button-icon";
import Add from '@icons/add.svg';
import { concatFolderName } from "@lib/utils/style";

export function generateFolder(folder: Array<StyleFolder>, styleItem: React.FunctionComponent<PaintStyle | TextStyle>, onAddItem: any, options?: {}): any {
    return folder.map((item: StyleFolder, i: number) => {

        const isRoot = !item.name.length;
        const handleAddItem = () => onAddItem({ name: concatFolderName([item.name, 'new-style']), type:'PAINT' });

        return <Folder
            key={item.name + i}
            title={item.name}
            options={options}
            allowEdit={!!item.styles.length}
            attributes={item}
            level={item.level}
            root={isRoot}
        >
            <>
                <div className="folder-style flex f-row gap-s f-center-h">
                    {item.styles.map((style, i) => <React.Fragment key={style.id + i}>{React.createElement(styleItem, style)}</React.Fragment>)}
                    <ButtonIcon icon={Add} onClick={handleAddItem} />
                </div>
                {generateFolder(item.folders, styleItem, onAddItem, options)}
            </>
        </Folder>
    });

}