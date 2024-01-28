import './index.scss';
import { Icon } from '@components/icon';

export default ({ icon, onClick = () => 0, defaultActive = false }: { icon: string, onClick?: any, defaultActive?: boolean }) => (
    <div
        className={`button-square ${defaultActive ? 'active' : ''}`}
        onClick={onClick}
    >
        <Icon icon={icon} />
    </div>
);