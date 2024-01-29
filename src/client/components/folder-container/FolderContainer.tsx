import './FolderContainer.scss';
import { FolderOptions } from "src/types/folder";
import { DisplayMode, StyleFolder } from "src/types/style";
import { generateFolder } from "./helper";

interface FolderContainer {
    styles: Array<StyleFolder>;
    styleItem: React.FunctionComponent<PaintStyle | TextStyle>;
    onAddItem: any;
    displayMode: DisplayMode;
    options?: FolderOptions
}

export default ({ styles, styleItem, onAddItem, displayMode = 'grid', options }: FolderContainer) => (
    <div className="folder-container" data-display-mode={displayMode}>
        {generateFolder(styles, styleItem, onAddItem, options)}
    </div>
);