import './index.scss';
import {FunctionComponent, forwardRef, useRef} from 'react';

export const Tooltip = forwardRef(
    ({ children, content }: { children: FunctionComponent, content: FunctionComponent }, ref) => {

        const childrenRef = useRef();
        
        return (<>
            {children}
        </>);
    });