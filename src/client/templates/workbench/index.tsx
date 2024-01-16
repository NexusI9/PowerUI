import { Workbench } from "src/types/workbench";
import { useSelector } from "react-redux";
import Close from '@icons/x.svg';
import { ButtonIcon } from "@components/button-icon";
import { Button } from "@components/button";
import { Content } from "@components/workbench-content";
import { Sidepanel } from "@components/sidepanel/sidepanel";
import { useDispatch } from "react-redux";
import { destroy } from "@lib/slices/workbench";
import { send } from "@lib/ipc";
import './index.scss';

export const WorkBench = () => {

    const dispatch = useDispatch();
    const workbenchPayload = useSelector( (state:any) => state.workbench);
    const { title, footer, active } = useSelector((state: { workbench: Workbench }) => state.workbench);

    return (<>{active &&
        <div className="workbench-wrapper flex f-center">
            <div className="workbench-window panel flex f-col">
                <header className="workbench-header flex f-row f-center-h f-between">
                    <p className="heading-8 frozen"><b>{title}</b></p>
                    <ButtonIcon icon={Close} onClick={() => dispatch(destroy()) } />
                </header>
                <div className="workbench-container flex f-row">   
                    <Sidepanel />
                    <Content />
                </div>
                <footer className="workbench-footer flex f-row f-end gap-s">
                    <Button value='Cancel' onClick={() => dispatch(destroy()) } role='SECONDARY' />
                    <Button value={footer?.primaryAction.value || 'ADD'} onClick={() => { send({action:footer?.primaryAction.action || '', payload:{...workbenchPayload}}); dispatch(destroy()); }} role='PRIMARY' />
                </footer>
            </div>
        </div>}
    </>);

}