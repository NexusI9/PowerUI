import { useSelector } from "react-redux";
import { Sidepanel } from "@components/sidepanel";
import { useDispatch } from "react-redux";
import { destroy } from "@lib/slices/rename";
import { FloatingWindow } from "@components/floating-window";
import { RenameContent } from "@components/rename-content";

export const Rename = () => {

    const dispatch = useDispatch();
    const template = useSelector((state: any) => state.rename);

    return (
        <FloatingWindow
            onDestroy={() => dispatch(destroy())}
            template={template}
        >
            <Sidepanel {...template} />
            <RenameContent {...template} />
        </FloatingWindow>
    );

}