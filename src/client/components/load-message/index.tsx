import { useSelector } from 'react-redux';
import './index.scss';
import { LoadSpinner } from "@components/load-spinner";
import { listen } from '@lib/ipc';
import { useState } from 'react';

export const LoadMessage = () => {
    const storeMessage = useSelector((state: any) => state.load.message);
    const [message, setMessage] = useState(storeMessage);

    const handleOnMessage = (e: any) => {
        if (e.payload?.message) {
            setMessage(String(e.payload?.message));
        }
    }

    listen(handleOnMessage);

    return (
        <div className="load-message flex f-row gap-s f-center-h">
            {
                message && <>
                    <LoadSpinner />
                    <p><small>{message}</small></p>
                </>
            }
        </div>
    );

}