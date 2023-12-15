import * as React from "react";
import './index.scss';

export default(
    {children}
    :
    {children:React.JSX.Element}
    ) => {


    return(<div className="container">
        {children}
    </div>);
}