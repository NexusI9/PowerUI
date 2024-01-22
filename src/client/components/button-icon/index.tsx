import { ButtonIcon as IButtonIcon } from 'src/types/input';
import './index.scss';
import { Icon } from '@components/icon';


export const ButtonIcon = ({ icon, onClick, disabled, appearance = { hover: true }, className, onMouseDown, onMouseUp}: IButtonIcon) => (
    <button
        className={`button-icon ${className && className || ''} flex f-center`}
        onClick={onClick || void 0}
        onMouseDown={ onMouseDown || void 0}
        onMouseUp={onMouseUp || void 0}
        data-hover={appearance?.hover ? '1' : '0'}
        data-disabled={disabled ? '1' : '0'}
    >
        <Icon icon={icon} />
    </button>
);