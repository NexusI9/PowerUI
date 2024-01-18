import { useSelector } from "react-redux";
import { Sidepanel } from "@components/sidepanel";
import { useDispatch } from "react-redux";
import { destroy } from "@lib/slices/dev.template";
import { FloatingWindow } from "@components/floating-window";
import { DevContent } from "@components/dev-content";

export const Dev = () => {

    const dispatch = useDispatch();
    const template = useSelector((state: any) => state.dev);

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