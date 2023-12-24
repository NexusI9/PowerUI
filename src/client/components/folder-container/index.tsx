import * as React from "react";
import './index.scss';
import {DisplayMode, FolderCustom, StyleFolder } from "@lib/interfaces";
import { generateFolder } from "./helper";

export const FolderContainer = ({ styles, styleItem, onAddItem, displayMode='grid', custom }: 
    { 
        styles: Array<StyleFolder>, 
        styleItem: React.FunctionComponent, 
        onAddItem: any,
        displayMode:DisplayMode,
        custom?:FolderCustom
    }) => {

    return (<div className="folder-container" data-display-mode={displayMode}>
        {generateFolder(styles, styleItem, onAddItem, custom)}
    </div>);
}