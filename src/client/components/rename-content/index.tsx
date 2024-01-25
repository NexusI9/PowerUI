import { Workbench } from "@ctypes/workbench.template";
import './index.scss';

export const RenameContent = (template: Workbench) => {

    return (<ul className="rename-content full-width full-height flex f-col gap-m">
        <li className='color-text-tertiary'><small>Preview</small></li>
        {template?.set?.map( (item,i) => <li key={String(item.name)+i}>{item.name}</li>)}
    </ul>);
}