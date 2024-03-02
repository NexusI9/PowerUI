import "./index.scss";
import { ButtonPad } from "@components/button-pad";
import PaintPlus from '@icons/paint-plus.svg';
import FontPlus from '@icons/font-plus.svg';
import { useDispatch } from "react-redux";
import { setPage } from "@lib/slices/page";

const padMap = [
    { page: 'color', icon: PaintPlus, text: 'Create Swatch' },
    { page: 'font', icon: FontPlus, text: 'Create Font Set' }
];

export default () => {

    const dispatch = useDispatch();

    return (<section className="page home flex f-col gap-xl">

        <header>
            <h1>Welcome to stylee</h1>
            <h3>Start building your styles below</h3>
        </header>
        <div className="flex f-row gap-m">
            {
                padMap.map(btn =>
                    <ButtonPad
                        key={btn.page}
                        icon={btn.icon}
                        text={btn.text}
                        onClick={() => dispatch(setPage(btn.page))}
                    />)
            }
        </div>

    </section>);
};