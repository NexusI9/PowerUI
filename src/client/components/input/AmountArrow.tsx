import ChevronDown from '@icons/chevron-down.svg';
import ChevronUp from '@icons/chevron-up.svg';
import { Button } from '@components/button';

export const AmountArrows = ({ onUp, onDown }: any) => (
    <label className='input-field-amount flex f-col'>
        <Button iconLeft={ChevronUp} onClick={onUp || void 0} role='DISABLED' />
        <Button iconLeft={ChevronDown} onClick={onDown || void 0} role='DISABLED' />
    </label>
)