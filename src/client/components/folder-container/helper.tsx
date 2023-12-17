import { StyleFolder, StyleItem } from "@lib/interfaces";
import { Folder } from "@components/folder";
import * as React from 'react';

export function generateFolder(folder: Array<StyleFolder>, styleItem: React.FunctionComponent): any {
    return folder.map((item, i) => {

        return <Folder
            key={item.title + i}
            title={item.title}
        >
            <>
                <div className="flex f-row gap-s">
                    {item.styles.map(style => React.createElement(styleItem, style))}
                </div>
                {generateFolder(item.folders, styleItem)}
            </>
        </Folder>

    });

}