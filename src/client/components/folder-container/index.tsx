import * as React from "react";
import { Folder } from "@components/folder";
import './index.scss';
import { CleanStyle } from "@lib/interfaces";

export const FolderContainer = ({styles}:{styles:Array<CleanStyle>}) => {

    return(<div className="folder-container">
        {styles.map( style => {
            return <Folder key={style.key }title={style.name} item={<p>{style.name}</p>}/>
        })}
    </div>);
}