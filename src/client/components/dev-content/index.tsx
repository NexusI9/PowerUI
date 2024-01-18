import { Dev } from "@ctypes/dev.template";
import './index.scss';
import { BaseSyntheticEvent } from "react";

export const DevContent = (props: Dev) => {

    console.log(props.code);
    return (
        <textarea readOnly={true} className="dev-content paper full-width" defaultValue={props.code} onClick={ (e:BaseSyntheticEvent) =>{e.target.focus(); e.target.select();}}>
        </textarea>
    );
}