import './index.scss';
import * as React from 'react';
import { Icon } from '@components/icon';

export const SquareButton = ({ icon, onClick = () => 0, defaultActive = false }: { icon: string, onClick?: any, defaultActive?: boolean }) => (
    <div
        className={`squarebutton ${defaultActive ? 'active' : ''}`}
        onClick={onClick}
    >
        <Icon icon={icon} />
    </div>
);