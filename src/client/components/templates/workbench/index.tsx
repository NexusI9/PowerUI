import { Sidepanel } from "@ctypes/workbench";

export const WorkBench = ({ sidepanel, content }: { sidepanel: Sidepanel, content: React.JSX.Element }) => {

    return (<div className="workbench-wrapper">
        <div className="workbench-window">
            <div className="workbench-container">
                <div className="workbench-sidepanel">
                </div>
                <div className="workbench-content">
                </div>
            </div>
            <div className="workbench-footer">

            </div>
        </div>
    </div>);

}