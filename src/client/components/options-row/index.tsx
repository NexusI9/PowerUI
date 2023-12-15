import * as React from 'react';
import { ButtonIcon } from '@components/button-icon';
import { Option } from "@lib/interfaces";

export const OptionsRow = ({ options }:{options:Array<Option>}) => (
    <div className='options-row flex f-row gap-s'>{
        options.map( option =>  
            <ButtonIcon 
                key={option.icon}
                icon={option.icon} 
                onClick={option.onClick}
            />)
    }</div>
);