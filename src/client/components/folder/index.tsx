import * as React from 'react';
import './index.scss';
import { Folder as FolderInterface } from '@lib/interfaces';
import { OptionsRow } from '@components/options-row';
import Move from '@icons/move.svg';
import Carrot from '@icons/carrot.svg';
import Add from '@icons/add.svg';
import Pen from '@icons/pencil.svg';
import Kebab from '@icons/kebab-vertical.svg';
import { Option as OptionInterface } from '@lib/interfaces';

const folderIconMap:Array<OptionInterface> = [
    {icon: Move, onClick: () => 0},
    {icon: Carrot, onClick: () => 0}
];

const editIconMap:Array<OptionInterface> = [
    {icon: Move, onClick: () => 0},
    {icon: Carrot, onClick: () => 0},
    {icon: Kebab, onClick: () => 0}
]

export const Folder = ({ title, item }: FolderInterface) => (
    <div className='folder'>
        <div className='folder-header flex f-row'>
            <div>
                <OptionsRow options={folderIconMap}/>
                {title}
            </div>

            <OptionsRow options={editIconMap}/>
        </div>
        <div className='folder-body'>
            {item}
        </div>
        <div className='folder-footer'></div>
    </div>
);