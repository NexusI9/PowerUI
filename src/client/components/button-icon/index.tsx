import './index.scss';
import { Icon } from '@components/icon';


export const ButtonIcon = ({icon, onClick, disabled, style={hover:true}}:{icon:string, onClick:any, disabled?:boolean, style?:{hover?:boolean}}) => (
    <button className={`button-icon ${disabled && 'disabled' || ''}`} onClick={ !!onClick && onClick } data-hover={style?.hover ? '1': '0'}>
        <Icon icon={icon}/>
    </button>
);