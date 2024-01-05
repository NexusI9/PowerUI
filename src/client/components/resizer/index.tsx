import { ButtonIcon } from "@components/button-icon";
import ResizerIcon from '@icons/resizer.svg';
import './index.scss';
import { send } from "@lib/ipc";
import { useEffect, useState } from "react";

export const Resizer = () => {

    const [active, setActive] = useState(false);

    useEffect(() => {

        const onMouseMove = (e: any) => send({ action: 'RESIZE_WINDOW', width: e.x, height: e.y });
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
        <ButtonIcon
            icon={ResizerIcon}
            onMouseDown={() => setActive(true)}
            className="resizer"
            style={{ hover: false }}
        />);
}