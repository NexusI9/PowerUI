import { useEffect } from "react";
import { useSelector } from "react-redux";

export const InputPortal = ({ children, portalKey, onMessage }: { children: JSX.Element; portalKey: string | undefined; onMessage(e: any): any }) => {

    const portalSelector = useSelector((state: any) => state.input.portal);

    useEffect(() => {
        //portal receiving
        if (portalKey && portalSelector.target === portalKey) { onMessage(portalSelector); }
    }, [portalSelector]);

    return (<>{children}</>);
}