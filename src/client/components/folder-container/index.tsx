import * as React from "react";
import './index.scss';
import {FolderOptions } from "@ctypes/folder";
import {DisplayMode, StyleFolder } from "@ctypes/style";
import { generateFolder } from "./helper";

export const FolderContainer = ({ styles, styleItem, onAddItem, displayMode='grid', options }: 
    { 
        styles: Array<StyleFolder>, 
        styleItem: React.FunctionComponent, 
        onAddItem: any,
        displayMode:DisplayMode,
        options?:FolderOptions
    }) => {

    return (<div className="folder-container" data-display-mode={displayMode}>
        {generateFolder(styles, styleItem, onAddItem, options)}
    </div>);
}