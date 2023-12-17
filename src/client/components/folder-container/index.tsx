import * as React from "react";
import './index.scss';
import { StyleFolder } from "@lib/interfaces";
import { generateFolder } from "./helper";

export const FolderContainer = ({ styles, styleItem }: { styles: Array<StyleFolder>, styleItem: React.FunctionComponent}) => {

    return (<div className="folder-container">
        {generateFolder(styles, styleItem)}
    </div>);
}