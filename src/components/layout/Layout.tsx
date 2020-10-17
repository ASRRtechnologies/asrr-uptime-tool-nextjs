import React, {FunctionComponent} from 'react';
import Header from "../navigation/Header";

interface MainProps {
    collapsed: boolean,
    className?:string,
    props?:any,
    children: any,
}

const Layout: FunctionComponent<MainProps> = ({collapsed, children, className, ...props}) => {
    return (
        <div className={`main ${className}`}>
            <Header collapsed/>
            {children}
        </div>
    );
};

export default Layout;