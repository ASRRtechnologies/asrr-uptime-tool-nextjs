import React, {FunctionComponent} from 'react';
import Layout from "../components/layout/Layout";
import DeviceOverviewDashboard from "../components/dashboards/DeviceOverviewDashboard";

interface PageProps {
    className?: string,
    collapsed?: boolean,
}

type IPanel<P> = React.FunctionComponent<P> & {
    layout: typeof Layout;
}

const Index: IPanel<PageProps> = ({className, collapsed, ...props}) => {

    return (
        <div className={` ${className}`}>
            <h1>Hihihi</h1>
            <DeviceOverviewDashboard/>
        </div>
    )

};

Index.layout = Layout;
export default Index;
