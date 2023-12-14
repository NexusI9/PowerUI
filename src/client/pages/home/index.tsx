import "./index.scss";
import * as React from "react";
import { PadButton } from "@components/padbutton";
import PaintPlus from '@icons/paint-plus.svg';
import FontPlus from '@icons/font-plus.svg';

const padMap = [
    { name:'color', icon: PaintPlus, text: 'Create Swatch'},
    { name:'font', icon: FontPlus, text: 'Create Font set'}
];

export default () => (<section className="page home flex f-col gap-xl">

    <header>
        <h1>Welcome to PowerUI</h1>
        <h3>Start building your styles below</h3>
    </header>
    <div className="flex f-row gap-s">
        {
            padMap.map( btn => <PadButton key={btn.name} icon={btn.icon} text={btn.text} />)
        }
    </div>

</section>);