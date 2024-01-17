import { TextSet } from "@components/font-set";
import { Fragment, createElement } from "react";
import { PaintSet } from "@components/shade-set";
import { Workbench } from "@ctypes/workbench";
import './index.scss';

const mapComponent: any = {
    'PAINT': PaintSet,
    'TEXT': TextSet
};

export const WorkbenchContent = (template:Workbench) => {

    const { type, set } = template;

    return (<div className="workbench-content flex f-col ">
        {set?.map((item, i) =>
            <Fragment key={JSON.stringify(item) + i}>
                {createElement(mapComponent[type] || <></>, item)}
            </Fragment>)
        }
    </div>);
}