import { useSelector } from "react-redux";
import { TextSet } from "@components/font-set";
import { Fragment, createElement } from "react";
import { PaintSet } from "@components/shade-set";
import { PaintSet as IPaintSet } from "src/types/shade";
import { TextSet as ITextSet } from "src/types/text";
import './index.scss';

export const Content = () => {

    const { type, set } = useSelector((state: any) => state.workbench);

    const mapComponent: any = {
        'PAINT': PaintSet as React.FC,
        'TEXT': TextSet as React.FC
    };

    return (<div className="workbench-content flex f-col ">
        {set?.map((item: ITextSet | IPaintSet, i: number) =>
            <Fragment key={JSON.stringify(item) + i}>
                {createElement(mapComponent[type] || <></>, item)}
            </Fragment>)
        }
    </div>);
}