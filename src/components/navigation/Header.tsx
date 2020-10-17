import React, {FunctionComponent, useState} from 'react';
import {transactionListState} from "../../recoil/atoms/atoms";
import {useRecoilValue, useSetRecoilState} from "recoil";

interface HeaderProps {
    collapsed: boolean,
    className?: string,
    props?: any
}

const Header: FunctionComponent<HeaderProps> = ({collapsed, className, ...props}) => {

    const setTransactionList = useSetRecoilState(transactionListState)
    const NewTransaction = e => {
        setTransactionList(oldTransactionList => [
            ...oldTransactionList,
            {
                 id:2
            },
        ])
    };


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
                {/*{transactionList[0].pc}*/}
            </div>


        </div>
    );
}

export default Header;