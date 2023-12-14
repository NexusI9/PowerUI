import "./index.scss";
import * as React from 'react';
import { SquareButton } from '@components/squarebutton';
import Paint from "@icons/paint.svg";
import Font from "@icons/font.svg";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import { setPage } from '@lib/page.slice';

const pageMap = [
    { page: 'color', icon: Paint },
    { page: 'typeface', icon: Font }
]

export default () => {

    const dispatch:Dispatch = useDispatch();

    return (
        <nav className="sidebar">
            {pageMap.map((item, index) =>
                <SquareButton
                    key={`buttonsidebar${index}`}
                    icon={item.icon}
                    onClick={() => dispatch(setPage(item.page))  }
                />
            )}
        </nav>
    );
};