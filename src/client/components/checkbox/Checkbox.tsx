import { Label } from "@components/label";
import { Checkbox as ICheckbox } from "src/types/input";
import './index.scss';

export default ({ value, label, onChange }: ICheckbox) => {

    return (
        <div className="input-checkbox flex f-row gap-s f-center-h">
            <input type='checkbox' onLoad={onChange} onChange={onChange || void 0} defaultChecked={value} />
            {label && <Label><small>{label}</small></Label>}
        </div>
    );
}