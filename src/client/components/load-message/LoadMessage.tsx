import { useSelector } from 'react-redux';
import './index.scss';
import { LoadSpinner } from "@components/load-spinner";
import { listen } from '@lib/ipc';
import { useEffect, useState } from 'react';

export default () => {
    const storeMessage = useSelector((state: any) => state.load.message);
    const [message, setMessage] = useState(storeMessage);

    const handleOnMessage = (e: any) => {
        if (e.action === 'LOAD_MESSAGE' && e.payload?.message) {
            setMessage(String(e.payload?.message));
        }
    }

    listen(handleOnMessage);
    useEffect(() => {
        setMessage(storeMessage);
    }, [storeMessage])
    return (
        <div className="load-message flex f-row gap-s f-center-h">
            {
                message && <>
                    <LoadSpinner />
                    <p><small>{String(message)}</small></p>
                </>
            }
        </div>
    );

}