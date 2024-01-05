import { Label } from "@components/label";
import { Checkbox as ICheckbox } from "@ctypes/input";
import './index.scss';

export const Checkbox = ({ value, label, onChange }: ICheckbox) => {

    return (
        <div className="input-checkbox flex f-row gap-s f-center-h">
            <input type='checkbox' onChange={onChange || void 0} defaultChecked={value} />
            {label && <Label><small>{label}</small></Label>}
        </div>
    );
}