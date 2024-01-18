import { useSelector } from "react-redux";
import { Sidepanel } from "@components/sidepanel";
import { useDispatch } from "react-redux";
import { destroy } from "@lib/slices/export.template";
import { FloatingWindow } from "@components/floating-window";
import { ExportContent } from "@components/export-content";

import './index.scss';


export const Dev = () => {

    const dispatch = useDispatch();
    const template = useSelector((state: any) => state.export);

    return (
        <FloatingWindow
            onDestroy={() => dispatch(destroy())}
            template={template}
        >
            <Sidepanel {...template} />
            <ExportContent {...template} />
        </FloatingWindow>
    );

}