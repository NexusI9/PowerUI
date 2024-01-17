import { useSelector } from "react-redux";
import Close from '@icons/x.svg';
import { ButtonIcon } from "@components/button-icon";
import { Button } from "@components/button";
import { Content } from "@components/workbench-content";
import { Sidepanel } from "@components/sidepanel";
import { useDispatch } from "react-redux";
import { destroy } from "@lib/slices/workbench.template";
import { send } from "@lib/ipc";
import './index.scss';
import { FloatingWindow } from "@components/floating-window";


export const WorkBench = () => {

    const dispatch = useDispatch();
    const workbenchPayload = useSelector((state: any) => state.workbench);

    return (
        <FloatingWindow
        onDestroy={() => dispatch(destroy())}
        template={workbenchPayload}
        >
            <Sidepanel {...workbenchPayload} />
            <Content  />
        </FloatingWindow>
    );

}