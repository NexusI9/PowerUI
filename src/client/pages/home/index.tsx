import "./index.scss";
import * as React from "react";
import { PadButton } from "@components/padbutton";
import PaintPlus from '@icons/paint-plus.svg';
import FontPlus from '@icons/font-plus.svg';
import { useDispatch } from "react-redux";
import { setPage } from "@lib/page.slice";

const padMap = [
    { page: 'color', icon: PaintPlus, text: 'Create Swatch' },
    { page: 'typeface', icon: FontPlus, text: 'Create Font set' }
];

export default () => {

    const dispatch = useDispatch();

    return (<section className="page home flex f-col gap-xl">

        <header>
            <h1>Welcome to PowerUI</h1>
            <h3>Start building your styles below</h3>
        </header>
        <div className="flex f-row gap-s">
            {
                padMap.map(btn => <PadButton
                    key={btn.page}
                    icon={btn.icon}
                    text={btn.text}
                    onClick={() => dispatch(setPage(btn.page)) }
                />)
            }
        </div>

    </section>);
};