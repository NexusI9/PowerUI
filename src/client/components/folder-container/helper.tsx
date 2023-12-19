import { StyleFolder, Option as OptionInterface } from "@lib/interfaces";
import { Folder } from "@components/folder";
import * as React from 'react';
import { ButtonIcon } from "@components/button-icon";
import Add from '@icons/add.svg';

export function generateFolder(folder: Array<StyleFolder>, styleItem: React.FunctionComponent, level = 0, custom?: {}): any {
    return folder.map((item, i) => {
        const isRoot = item.title === 'root';
        level += 1;
        return <Folder
            key={item.title + i}
            title={item.title}
            custom={custom}
            allowEdit={!!item.styles.length}
            attributes={item}
            level={level-1}
            root={isRoot}
        >
            <>
                <div className="flex f-row gap-s f-center-h">
                    {item.styles.map(style => React.createElement(styleItem, { key: style.id, ...style }))}
                    {!isRoot && <ButtonIcon icon={Add} onClick={() => 0} />}
                </div>
                {generateFolder(item.folders, styleItem, level, custom)}
            </>
        </Folder>
    });

}