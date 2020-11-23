import React, {FunctionComponent} from 'react';
import Layout from "../components/layout/Layout";
import DeviceOverviewDashboard from "../components/dashboards/DeviceOverviewDashboard";
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

interface PageProps {
    className?: string,
        collapsed?: boolean,
}

type IPanel<P> = React.FunctionComponent<P> & {
    layout: typeof Layout;
}

const Docs: IPanel<PageProps> = ({className, collapsed, ...props}) => {

    return (
        <div className={`content ${className}`}>
            <SwaggerUI url="https://acceptatie.element-db.vw.api.asrr-tech.com/api/v1/api-docs" />
        </div>
    )

};

Docs.layout = Layout;
export default Docs;
