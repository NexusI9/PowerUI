import * as React from "react";
import { Folder } from "@components/folder";
import './index.scss';
import { StyleItem, StyleFolder } from "@lib/interfaces";
import { generateFolder } from "./helper";

export const FolderContainer = ({ styles, styleItem }: { styles: Array<StyleItem|StyleFolder>, styleItem: React.FunctionComponent }) => {

    return (<div className="folder-container">
        {generateFolder(styles, styleItem)}
    </div>);
}