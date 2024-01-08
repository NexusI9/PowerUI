import ChevronDown from '@icons/chevron-down.svg';
import ChevronUp from '@icons/chevron-up.svg';
import { ButtonIcon } from '@components/button-icon';

export const AmountArrows = ({onUp, onDown}:any) => (
    <label className='input-field-amount flex f-col'>
        <ButtonIcon icon={ChevronUp} onClick={onUp || void 0} />
        <ButtonIcon icon={ChevronDown} onClick={onDown || void 0} />
    </label>
)