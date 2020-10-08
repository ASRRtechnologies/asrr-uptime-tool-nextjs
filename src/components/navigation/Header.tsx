import React, {FunctionComponent} from 'react';

interface HeaderProps {
    collapsed: boolean,
    className?: string,
    props?: any
}

const Header: FunctionComponent<HeaderProps> = ({collapsed, className, ...props}) => {
    return (
        <div className={`header ${className}`}>

            <div className="header-information">
                <h1>Overzicht</h1>
                <span className="header-dropdown">
                    <p>Application</p>
                    <select>
                        <option>Today</option>
                    </select>
                </span>
            </div>

            <div>

            </div>


        </div>
    );
}

export default Header;