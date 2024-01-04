import * as React from "react";
import './index.scss';

export default(
    {children}
    :
    {children:0 |React.JSX.Element}
    ) => {


    return(<div className="container">
        {children && children}
    </div>);
}