
import { Sidepanel } from "@components/sidepanel";
import { Export as IExport } from "@ctypes/export";
import { init } from "@lib/slices/export.template";
import { Attributes, createElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.scss';

export const Export = ({ template, component }: { template: IExport, component: React.FC }) => {

    const exportTemplate = useSelector((state: any) => state.export);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(init(template));
    }, [template]);

    return (<div className="export-template full-height flex f-row">
        {exportTemplate.sidepanel && <Sidepanel {...exportTemplate} />}
        <div className="export-content flex f-center">
            {createElement(component, exportTemplate.config as Attributes)}
        </div>
    </div>);
}