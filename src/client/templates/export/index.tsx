import { ExportContent } from "@components/export-content";
import { Sidepanel } from "@components/sidepanel";
import { Export as IExport } from "@ctypes/export";
import { init } from "@lib/slices/export.template";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.scss';

export const Export = (template: IExport) => {

    const exportTemplate = useSelector((state: any) => state.export);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(init(template));
    }, [template]);

    return (<div className="export-template full-height flex f-row">
        {exportTemplate.sidepanel && <Sidepanel {...exportTemplate} />}
        <ExportContent></ExportContent>
    </div>);
}