import * as React from 'react';
import "@styles/index.scss";
import Sidebar from '@components/sidebar';
import Container from '@components/container';

import Color from './pages/color';
import Home from './pages/home';
import Typeface from './pages/typeface';

const router = {
    home: <Home/>, 
    color: <Color/>, 
    typeface: <Typeface/> 
};

export default () => (
    <>
        <Sidebar />
        <Container>
            <></>
        </Container>
    </>
);