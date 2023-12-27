import { StyleFolder } from "@ctypes/style";
import { Folder } from "@components/folder";
import * as React from 'react';
import { ButtonIcon } from "@components/button-icon";
import Add from '@icons/add.svg';

export function generateFolder(folder: Array<StyleFolder>, styleItem: React.FunctionComponent, onAddItem: any, custom?: {}): any {
    return folder.map((item: StyleFolder, i: number) => {

        const isRoot = item.title === 'root';
        const handleAddItem = () => onAddItem({ folder: item.fullpath, name: 'new-style'});

        return <Folder
            key={item.title + i}
            title={item.title}
            custom={custom}
            allowEdit={!!item.styles.length}
            attributes={item}
            level={item.level}
            root={isRoot}
        >
            <>
                <div className="folder-style flex f-row gap-s f-center-h">
                    {item.styles.map(style => React.createElement(styleItem, { key: style.id, ...style }))}
                    <ButtonIcon icon={Add} onClick={handleAddItem} />
                </div>
                {generateFolder(item.folders, styleItem, onAddItem, custom)}
            </>
        </Folder>
    });

}