import "./index.scss";
import { ButtonSquare } from '@components/button-square';
import Paint from "@icons/paint.svg";
import Font from "@icons/font.svg";
import Upload from "@icons/upload.svg";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '@lib/slices/page';

const pageMap = [
    { page: 'color', icon: Paint },
    { page: 'font', icon: Font }
]

export default () => {

    const dispatch: Dispatch = useDispatch();
    const activePage: string = useSelector((state: { page: string }) => state.page);

    return (
        <nav className="sidebar flex f-col f-center">
            <div className="flex f-col f-center full-width">
                {pageMap.map((item, index) =>
                    <ButtonSquare
                        key={`buttonsidebar${index}`}
                        icon={item.icon}
                        onClick={() => dispatch(setPage(item.page))}
                        defaultActive={item.page === activePage}

                    />
                )}
            </div>
        </nav>
    );
};