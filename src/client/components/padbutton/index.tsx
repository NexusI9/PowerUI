import './index.scss';
import {Icon} from '@components/icon';

export const PadButton = ({icon, text, onClick}:{icon:string, text:string, onClick?:any}) => (
    <button 
        className='padbutton'
        onClick={ () => { if(onClick) onClick(); }}
        >
        <Icon icon={icon}/>
        <h5>{text}</h5>
    </button>
);