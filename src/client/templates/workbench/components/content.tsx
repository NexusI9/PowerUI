import { useSelector } from "react-redux";
import { FontSet } from "@components/font-set";
import { Fragment, createElement } from "react";
import { ShadeSet } from "@components/shade-set";
import { WorkbenchComponent } from "@ctypes/workbench";
import { ShadeSet as IShadeSet } from "@ctypes/shade";
import { FontSet as IFontSet } from "@ctypes/text";

export const Content = () => {
    
    const { type, set } = useSelector((state: any) => state.workbench);

    const mapComponent: any = {
        'COLOR': ShadeSet as React.FC<WorkbenchComponent<IShadeSet>>,
        'TEXT': FontSet as React.FC<WorkbenchComponent<IFontSet>>
    };

    return (<div className="workbench-content flex f-col ">
        {set?.map((item: WorkbenchComponent<IShadeSet | IFontSet>, i: number) =>
            <Fragment key={JSON.stringify(item) + i}>
                {createElement(mapComponent[type], item)}
            </Fragment>)
        }
    </div>);
}