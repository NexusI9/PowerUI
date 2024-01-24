import { ButtonIcon } from '@components/button-icon';
import { Option } from "src/types/folder";
import './index.scss';
import { MultiArray } from '@ctypes/global';
import { traverseCallback } from '@lib/utils/utils';

export const OptionsRow = ({ options, className }: { options: MultiArray<Option>, className?: string }) => (
    <div className={`options-row flex f-row gap-m ${className && className || ''}`}>{
        options.map((option, i) => <div key={JSON.stringify(option) + i} className='flex f-row gap-xs'>
            {traverseCallback(option, (option: Option) => <ButtonIcon
                key={option.icon}
                icon={option.icon}
                onClick={option.onClick}
                disabled={!!option.disabled}
            />)
            }
        </div>)
    }</div>
);