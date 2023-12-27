//styles
import "@styles/index.scss";

//reducer
import { useSelector } from 'react-redux';

//structural
import Sidebar from '@components/sidebar';
import Container from '@components/container';

//modales & menu
import { ContextMenu } from "@components/context-menu";
import { Tooltip } from "@components/tooltip";

//pages
import Color from './pages/color';
import Home from './pages/home';
import Font from './pages/font';
import { Snackbar } from "@components/snackbar";
import { WorkBench } from "@components/templates/workbench";


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
            <Tooltip/>
            <Snackbar/>

            <WorkBench />
        </>
    );
}