import React, {FunctionComponent} from 'react';
import Dashboard from "../icons/Dashboard";
import Indent from "../icons/Indent";

interface SidebarProps {
    collapsed: boolean,
    className?:string,
    [x:string]: any;
}

const routes = {

};

const Sidebar: FunctionComponent<SidebarProps> = ({collapsed, className, ...props}) => {
    return (
        <div className={`sidebar ${className}`}>
            <div className={`sidebar-header ${collapsed ? "sidebar-header-collapsed": ""}`}>
                {/*<img src={} alt="ASRR-Logo"/>*/}
                <h1>ASRR</h1>
            </div>
            <ul className="sidebar-list">
                <li className="sidebar-item">
                    <Dashboard/>
                    <a>Dashboard</a>
                </li>
            </ul>

            <div className="sidebar-footer">
                <Indent onClick={props.toggleSidebar}/>
            </div>



        </div>
    );
}

export default Sidebar;