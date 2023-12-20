import * as React from "react";
import './index.scss';
import {StyleFolder } from "@lib/interfaces";
import { generateFolder } from "./helper";

export const FolderContainer = ({ styles, styleItem, onAddItem, custom }: 
    { 
        styles: Array<StyleFolder>, 
        styleItem: React.FunctionComponent, 
        onAddItem: any,
        custom?:{}
    }) => {

    return (<div className="folder-container">
        {generateFolder(styles, styleItem, onAddItem, custom)}
    </div>);
}