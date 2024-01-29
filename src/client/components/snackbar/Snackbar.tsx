import { useSelector } from 'react-redux';
import './Snackbar.scss';

export default () => {

    const { type, message } = useSelector((state: any) => state.snackbar);
    
    return (<>
        {message.length ?
            <div className="snackbar panel flex f-col f-center" data-type={type}>
                <p>{message}</p>
            </div> : <></>}
    </>);
}