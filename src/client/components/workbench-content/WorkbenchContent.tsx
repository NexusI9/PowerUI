import { TextSet } from "@components/text-set";
import { Fragment, createElement } from "react";
import { PaintSet } from "@components/paint-set";
import { Workbench } from "@ctypes/workbench.template";
import './WorkbenchContent.scss';

const mapComponent: any = {
    'PAINT': PaintSet,
    'TEXT': TextSet
};

export default (template: Workbench) => {

    const { type, set } = template;

    return (<div className="workbench-content flex f-col ">
        {set?.map((item, i) =>
            <Fragment key={JSON.stringify(item) + i}>
                {createElement(mapComponent[type] || 'span', item)}
            </Fragment>)
        }
    </div>);
}