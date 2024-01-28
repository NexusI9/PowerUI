import { Label } from "@components/label";
import { Tab as ITab } from "@ctypes/input";
import './index.scss';

export default (props: ITab) => (
    <div
        className="tab flex f-center-h"
        data-active={props.active}
        onClick={() => props.onClick && props.onClick(props) || void 0}
    >
        <Label {...props}>{props.value}</Label>
    </div>
);