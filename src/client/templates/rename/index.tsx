import { useSelector } from "react-redux";
import { Sidepanel } from "@components/sidepanel";
import { useDispatch } from "react-redux";
import { destroy } from "@lib/slices/dev.template";
import { FloatingWindow } from "@components/floating-window";
import { DevContent } from "@components/dev-content";

export const Rename = () => {

    const dispatch = useDispatch();
    const template = useSelector((state: any) => state.rename);

    return (
        <FloatingWindow
            onDestroy={() => dispatch(destroy())}
            template={template}
        >
            <Sidepanel {...template} />
            <DevContent {...template} />
        </FloatingWindow>
    );

}