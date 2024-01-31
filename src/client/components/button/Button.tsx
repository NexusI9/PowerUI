import { Button as IButton } from 'src/types/input';
import './Button.scss';
import { Label } from '@components/label';


export default (props: IButton) => {
    const { value, onClick, role, size, onMouseDown, className } = props;

    return (
        <button
            className={`${className && `${className} ` || ''}button flex f-row f-center`}
            data-role={role}
            data-size={size}
            onClick={onClick && onClick || undefined}
            onMouseDown={onMouseDown && onMouseDown || undefined}
        >
            <Label {...props}>{value && value}</Label>
        </button>
    );
}