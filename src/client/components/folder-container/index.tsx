import * as React from "react";
import './index.scss';
import { Option as OptionInterface, StyleFolder } from "@lib/interfaces";
import { generateFolder } from "./helper";

export const FolderContainer = ({ styles, styleItem, custom }: { styles: Array<StyleFolder>, styleItem: React.FunctionComponent, custom?:{}}) => {

    return (<div className="folder-container">
        {generateFolder(styles, styleItem, custom)}
    </div>);
}