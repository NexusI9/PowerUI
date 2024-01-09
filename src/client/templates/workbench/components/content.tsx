import { useSelector } from "react-redux";
import { Shade as IShade } from "@ctypes/shade";
import { FontSet } from "@components/font-set";
import { Fragment, createElement } from "react";
import { ShadeSet } from "@components/shade-set";

export const Content = () => {

    const { type, set } = useSelector((state: any) => state.workbench);

    const mapComponent:any = {
        'COLOR': ShadeSet as React.FC<IShade>,
        'TEXT': FontSet as React.FC<TextStyle>
    };

    return (<div className="workbench-content flex f-col ">
        {set?.map((item: any, i: number) =>
            <Fragment key={JSON.stringify(item) + i}>
                {createElement(mapComponent[type], item)}
            </Fragment>)
        }
    </div>);
}