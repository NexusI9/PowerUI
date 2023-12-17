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



export const Folder = ({ title, children, hideHeader = false }: FolderInterface) => {

    const folderIconMap: Array<OptionInterface> = [
        { icon: Move, onClick: () => 0 },
        { icon: Carrot, onClick: () => 0 }
    ];

    const editIconMap: Array<OptionInterface> = [
        { icon: Pen, onClick: () => 0 },
        { icon: Add, onClick: () => 0 },
        { icon: Kebab, onClick: () => 0 }
    ];

    return (

        <div className='folder flex f-col'>
            {!hideHeader && <div className='folder-header flex f-row'>
                <div className="folder-header-left flex f-row gap-s">
                    <OptionsRow options={folderIconMap} className='folder-grab' />
                    <p className='heading-8'><b>{title}</b></p>
                </div>
                <OptionsRow options={editIconMap} />
            </div>
            }
            <div className={`folder-body flex f-col gap-s`}>
                {children}
            </div>
        </div>
    );
}