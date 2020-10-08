import React, {useState} from 'react'
import '../styles/App/App.scss'
import {SWRConfig} from 'swr'
import {ToastContainer} from 'react-toastify'
import styled from '@emotion/styled'
import Sidebar from "../components/navigation/Sidebar";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

const StyledToast = styled(ToastContainer)`
            
`;

const Application = styled("div")`
       
`;

const App = (props) => {
    const {Component, pageProps, router} = props;
    const [collapsed, setCollapsed] = useState(false);
    const Layout = Component.layout;

    const toggleSidebar = () => {
        setCollapsed(!collapsed)
    };

    return (
        <RecoilRoot>
            <Application className="app">
                <StyledToast limit={3} closeButton={false} draggablePercent={60} hideProgressBar={false}/>
                <Sidebar className={collapsed ? "sidebar-collapsed" : ""} toggleSidebar={toggleSidebar}
                         collapsed={collapsed}/>

                <Layout className={collapsed ? "" : "main-collapsed"} collapsed={collapsed}>
                    <SWRConfig value={{
                        // dedupingInterval:20000,
                        refreshInterval: 3000,
                        fetcher: (...args) => fetch(...args).then(res => res.json()),
                    }}>
                        <Component {...pageProps} key={router.route}/>
                    </SWRConfig>
                </Layout>
            </Application>
        </RecoilRoot>
    )
};

export default App
