import { ContextMenuCommand } from "@ctypes/contextmenu";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type ContextMenuListener = { children: React.JSX.Element; commands: Array<{ action: string; callback(e: ContextMenuCommand): any }>; };

export default ({ children, commands }: ContextMenuListener) => {

    const activeCommand = useSelector((state: any) => state.contextmenu.activeCommand);

    useEffect(() => {

        if (!activeCommand) { return; }

        commands.forEach(({ action, callback }) => {
            if (action === activeCommand?.action) {
                callback(activeCommand);
            }
        });
    }, [activeCommand]);


    return (<>{children}</>);


}