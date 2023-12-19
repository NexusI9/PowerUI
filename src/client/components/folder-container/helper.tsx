import { StyleFolder, Option as OptionInterface } from "@lib/interfaces";
import { Folder } from "@components/folder";
import * as React from 'react';

export function generateFolder(folder: Array<StyleFolder>, styleItem: React.FunctionComponent, level = 0, custom?: {}): any {
    return folder.map((item, i) => {
        level += 1;
        return <Folder
            key={item.title + i}
            title={item.title}
            custom={custom}
            allowEdit={!!item.styles.length}
            attributes={item}
            level={level-1}
            root={item.title === 'root'}
        >
            <>
                <div className="flex f-row gap-s">
                    {item.styles.map(style => React.createElement(styleItem, { key: style.id, ...style }))}
                </div>
                {generateFolder(item.folders, styleItem, level, custom)}
            </>
        </Folder>
    });

}