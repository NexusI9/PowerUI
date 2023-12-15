import * as React from 'react';
import './index.scss';
import { Folder as FolderInterface } from '@lib/interfaces';
import { OptionsRow } from '@components/options-row';
import Move from '@icons/mobile.svg';
import Carrot from '@icons/carrot.svg'

export const Folder = ({ title, options, children }: FolderInterface) => {
    <div className='folder'>
        <div className='folder-header flex f-row'></div>
        <div className='folder-body'></div>
        <div className='folder-footer'></div>
    </div>

};