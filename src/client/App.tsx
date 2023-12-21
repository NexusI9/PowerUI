import "@styles/index.scss";
import Sidebar from '@components/sidebar';
import Container from '@components/container';
import { ContextMenu } from "@components/context-menu";
import Color from './pages/color';
import Home from './pages/home';
import Font from './pages/font';

import { useSelector } from 'react-redux';

const router = {
    home: <Home/>, 
    color: <Color/>, 
    font: <Font/> 
};

export default () => {

    const page = useSelector( (state:{page:string} ) => state.page);

    return(
        <>
            <Sidebar />
            <Container>
                {router[page as keyof typeof router || 'home']}
            </Container>
            <ContextMenu/>
        </>
    );
}