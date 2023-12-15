import './index.scss';
import * as React from 'react';
import { Icon } from '@components/icon';

export const ButtonSquare = ({ icon, onClick = () => 0, defaultActive = false }: { icon: string, onClick?: any, defaultActive?: boolean }) => (
    <div
        className={`button-square ${defaultActive ? 'active' : ''}`}
        onClick={onClick}
    >
        <Icon icon={icon} />
    </div>
);