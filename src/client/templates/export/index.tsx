import { useSelector } from "react-redux";
import { Sidepanel } from "@components/sidepanel";
import { useDispatch } from "react-redux";
import { destroy } from "@lib/slices/export.template";
import { FloatingWindow } from "@components/floating-window";

import './index.scss';

export const Export = () => {

    const dispatch = useDispatch();
    const exportTemplate = useSelector((state: any) => state.export);

    return (
        <FloatingWindow
            onDestroy={() => dispatch(destroy())}
            template={exportTemplate}
        >
            <Sidepanel {...exportTemplate} />

        </FloatingWindow>
    );

}