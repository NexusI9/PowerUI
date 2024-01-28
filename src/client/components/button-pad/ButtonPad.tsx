import './index.scss';
import {Icon} from '@components/icon';

export default ({icon, text, onClick}:{icon:string, text:string, onClick?:any}) => (
    <button 
        className='button-pad'
        onClick={ () => { if(onClick) onClick(); }}
        >
        <Icon icon={icon}/>
        <h5>{text}</h5>
    </button>
);