import { Dev } from "@ctypes/dev.template";
import './index.scss';

export const DevContent = (props: Dev) => {

    console.log(props.code);
    return (
        <code className="dev-content paper full-width ">
            {props.code}
        </code>
    );
}