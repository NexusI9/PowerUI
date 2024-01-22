//styles
import "@styles/index.scss";

//reducer
import { useDispatch, useSelector } from 'react-redux';

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

//other
import { Snackbar } from "@components/snackbar";
import { WorkBench } from "@templates/workbench";
import { useEffect } from "react";
import { get } from "@lib/ipc";
import { GET_PAINT_STYLES_COMMAND, GET_TEXT_STYLES_COMMAND } from "@lib/constants";
import { setPage } from "@lib/slices/page";
import { Resizer } from "@components/resizer";
import { Export } from "@templates/export";
import { Dev } from "@templates/dev";


const router = {
    home: <Home />,
    color: <Color />,
    font: <Font />
};

export default () => {

    const page = useSelector((state: { page: string }) => state.page);
    const dispatch = useDispatch();

    useEffect(() => {

        const getStyles = async function () {
            const textArray = await get({ action: GET_TEXT_STYLES_COMMAND });
            const colorArray = await get({ action: GET_PAINT_STYLES_COMMAND });
            dispatch(setPage(colorArray.styles.length ? 'color' : textArray.styles.length ? 'font' : 'home'));
        }

        getStyles();

    }, []);

    return (
        <>
            <Sidebar />
            <Container>
                {!!page.length ? router[page as keyof typeof router || 'home'] : <></>}
            </Container>

            <ContextMenu />
            <Tooltip />
            <Snackbar />

            <WorkBench />
            <Export />
            <Dev />
            <Resizer />
        </>
    );
}