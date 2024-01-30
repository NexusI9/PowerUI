import ResizerIcon from '@icons/resizer.svg';
import './Resizer.scss';
import { send } from "@lib/ipc";
import { useEffect, useState } from "react";
import { Button } from "@components/button";

export default () => {

    const [active, setActive] = useState(false);

    useEffect(() => {

        const onMouseMove = (e: any) => send({ action: 'RESIZE_WINDOW', payload: { width: e.x, height: e.y } });
        const setFalse = () => setActive(false);

        if (active) {
            window.addEventListener('mousemove', onMouseMove)
            window.addEventListener('mouseup', setFalse);
        } else {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', setFalse);
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', setFalse);
        }

    }, [active]);

    return (
        <Button
            iconLeft={ResizerIcon}
            onMouseDown={() => setActive(true)}
            className="resizer"
            role='DISABLED'
        />);
}