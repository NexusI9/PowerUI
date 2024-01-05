import { Label } from "@components/label";
import { Checkbox as ICheckbox } from "@ctypes/input";

export const Checkbox = ({value, label, onChange}:ICheckbox) => {

    return(
        <div className="flex f-row gap-s">
            <input type='checkbox' onChange={onChange || void 0} defaultChecked={value} />
            {label && <Label>{label}</Label>}
        </div>
    );
}