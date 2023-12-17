import './index.scss';
import { Icon } from '@components/icon';


export const ButtonIcon = ({icon, onClick, disabled}:{icon:string, onClick:any, disabled?:boolean}) => (
    <button className={`button-icon ${disabled && 'disabled' || ''}`} onClick={ !!onClick && onClick } >
        <Icon icon={icon}/>
    </button>
);