import { useSelector } from "react-redux";
import { WorkbenchContent } from "@components/workbench-content";
import { Sidepanel } from "@components/sidepanel";
import { useDispatch } from "react-redux";
import { destroy } from "@lib/slices/workbench.template";
import { FloatingWindow } from "@components/floating-window";

export const WorkBench = () => {

    const dispatch = useDispatch();
    const template = useSelector((state: any) => state.workbench);

    return (
        <FloatingWindow
            onDestroy={() => dispatch(destroy())}
            template={template}
        >
            <Sidepanel {...template} />
            <WorkbenchContent {...template} />
        </FloatingWindow>
    );

}