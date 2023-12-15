import * as React from "react";
import { SectionHeader } from "@components/sectionheader";
import List from '@icons/list-bulleted.svg';
import Plus from '@icons/add.svg';
import PaintPlus from '@icons/paint-plus.svg';
import { ButtonPad } from "@components/button-pad";

const optionMap = [
    {icon: List, onClick: () => console.log('list') },
    {icon: Plus, onClick: () => console.log('add') },
]

export default() => (<>
    <SectionHeader title="Color" options={optionMap}/>
    <div className="full-height full-width flex f-center">
        <ButtonPad icon={PaintPlus} text="Create Swatch" onClick={ () => console.log('add') }/>
    </div>
</>);