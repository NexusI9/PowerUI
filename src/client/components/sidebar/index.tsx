import "./index.scss";
import * as React from 'react';
import { SquareButton } from '@components/squarebutton';
import Paint from "@icons/paint.svg";
import Font from "@icons/font.svg";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '@lib/page.slice';

const pageMap = [
    { page: 'color', icon: Paint },
    { page: 'typeface', icon: Font }
]

export default () => {

    const dispatch:Dispatch = useDispatch();
    const activePage:string = useSelector( (state:{page:string}) => state.page );

    return (
        <nav className="sidebar">
            {pageMap.map((item, index) =>
                <SquareButton
                    key={`buttonsidebar${index}`}
                    icon={item.icon}
                    onClick={() => dispatch(setPage(item.page))}
                    defaultActive={item.page === activePage}
                    
                />
            )}
        </nav>
    );
};