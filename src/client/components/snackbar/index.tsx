import { useSelector } from 'react-redux';
import './index.scss';

export const Snackbar = () => {

    const { type, message } = useSelector((state: any) => state.snackbar);
    console.log({type, message});
    
    return (<>
        {message.length ?
            <div className="snackbar panel flex f-col f-center" data-type={type}>
                <p>{message}</p>
            </div> : <></>}
    </>);
}