import { Workbench } from "@ctypes/workbench";
import { useSelector } from "react-redux";
import Close from '@icons/x.svg';
import { ButtonIcon } from "@components/button-icon";
import { Button } from "@components/button";
import { Content } from "./components/content";
import { Sidepanel } from "./components/sidepanel";
import { useDispatch } from "react-redux";
import { destroy } from "@lib/slices/workbench";
import './index.scss';

export const WorkBench = () => {

    const dispatch = useDispatch();
    const { title, sidepanel, content, footer, active } = useSelector((state: { workbench: Workbench }) => state.workbench);

    return (<>{active &&
        <div className="workbench-wrapper flex f-center">
            <div className="workbench-window panel flex f-col">
                <header className="workbench-header flex f-row f-center-h f-between">
                    <p className="heading-8 frozen"><b>{title}</b></p>
                    <ButtonIcon icon={Close} onClick={() => dispatch(destroy()) } />
                </header>
                <div className="workbench-container flex f-row">   
                    <Sidepanel {...sidepanel}/>
                    <Content/>
                </div>
                <footer className="workbench-footer flex f-row f-end gap-m">
                    <Button text='Cancel' onClick={() => dispatch(destroy()) } role='SECONDARY' />
                    <Button text={footer?.primaryAction.text || 'ADD'} onClick={() => 0} role='PRIMARY' />
                </footer>
            </div>
        </div>}
    </>);

}