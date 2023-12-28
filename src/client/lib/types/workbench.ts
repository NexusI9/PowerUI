import { Dropdown, Input, Slider, InputAmount } from "@ctypes/input";
import { Command } from "./global";


export type SidepanelList = {type: 'INPUT'; attributes:Input;} |
                            {type: 'DROPDOWN'; attributes:Dropdown;} |
                            {type: 'COLOR'; attributes:Input;} |
                            {type: 'AMOUNT'; attributes:InputAmount;} |
                            {type: 'SLIDER'; attributes:Slider;}

export interface SidepanelOptions{
    text: string;
    content: Array<SidepanelList> | Array<Array<SidepanelList>>;
};

export interface Sidepanel {
    active?:string;
    options:Array<SidepanelOptions> | Array<Array<SidepanelOptions>>;
}

export interface Content {
    item?:React.JSX.Element;
}

interface Footer {
    primaryAction: {text:string; action:string};
}

export interface Workbench {
    active?:boolean;
    parent:string; 
    title: string;
    sidepanel: Sidepanel;
    content: Content;
    footer?: Footer;
}

