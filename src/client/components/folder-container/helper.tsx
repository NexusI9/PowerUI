import { StyleFolder, StyleItem } from "@lib/interfaces";
import { Folder } from "@components/folder";
import * as React from 'react';

export function generateFolder(folder: Array<StyleFolder | StyleItem>, styleItem: React.FunctionComponent): any {
    return folder.map((item, i) => {
        switch (item.type) {

            case 'style':
                const child = React.createElement(styleItem, item);
                return child;
                break;

            case 'folder':
                return <Folder
                    key={item.title + i}
                    title={item.title}
                    display="list"
                >
                   {generateFolder(item.children, styleItem) }
                </Folder>
                break;

        }

    });

}