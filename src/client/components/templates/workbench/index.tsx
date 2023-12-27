import { Workbench } from "@ctypes/workbench";
import { useSelector } from "react-redux";
import Close from '@icons/x.svg';
import { ButtonIcon } from "@components/button-icon";
import { Button } from "@components/button";
import { Content } from "./content";
import { Sidepanel } from "./sidepanel";

export const WorkBench = () => {

    const { title, sidepanel, content, footer, active } = useSelector((state: { workbench: Workbench }) => state.workbench);

    return (<>{active &&
        <div className="workbench-wrapper">
            <div className="workbench-window">
                <header className="workbench-header">
                    {title}
                    <ButtonIcon icon={Close} onClick={() => 0} />
                </header>
                <div className="workbench-container">   
                    <Sidepanel {...sidepanel}/>
                    <Content/>
                </div>
                <footer className="workbench-footer">
                    <Button text='Cancel' onClick={() => 0} role='SECONDARY' />
                    <Button text={footer?.primaryAction.text || 'ADD'} onClick={footer?.primaryAction.onClick} role='SECONDARY' />
                </footer>
            </div>
        </div>
        || <></>}
    </>);

}