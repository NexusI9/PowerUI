import { Button as ButtonInterface } from '@ctypes/input';
import './index.scss';


export const Button = ({ text, onClick, role }: ButtonInterface) => {

    return (
        <button className='button flex f-row f-center' data-role={role} onClick={onClick}>
            {text}
        </button>
    );
}