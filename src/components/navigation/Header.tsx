import React, {FunctionComponent} from 'react';

interface HeaderProps {
    collapsed: boolean,
    className?:string,
    props?:any
}

const Header: FunctionComponent<HeaderProps> = ({collapsed, className, ...props}) => {
    return (
        <div className={`header ${className}`}>


        </div>
    );
}

export default Header;