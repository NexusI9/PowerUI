import * as React from 'react';
import "@styles/index.scss";
import Sidebar from '@components/sidebar';
import Container from '@components/container';

import Color from './pages/color';
import Home from './pages/home';
import Typeface from './pages/typeface';

import { useSelector } from 'react-redux';

const router = {
    home: <Home/>, 
    color: <Color/>, 
    typeface: <Typeface/> 
};

export default () => {

    const page = useSelector( (state:{page:string} ) => state.page);

    return(
        <>
            <Sidebar />
            <Container>
                {router[page as keyof typeof router || 'home']}
            </Container>
        </>
    );
}