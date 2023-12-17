import { ButtonIcon } from '@components/button-icon';
import { Option } from "@lib/interfaces";
import './index.scss';

export const OptionsRow = ({ options, className }:{options:Array<Option>, className?:string}) => (
    <div className={`options-row flex f-row gap-s ${className && className || ''}`}>{
        options.map( option =>  
            <ButtonIcon 
                key={option.icon}
                icon={option.icon} 
                onClick={option.onClick}
                disabled={!!option.disabled}
            />)
    }</div>
);