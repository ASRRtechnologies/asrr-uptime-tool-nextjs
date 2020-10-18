import React from 'react';
import PropTypes, {object} from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import useSWR from "swr";
import humanizeDuration from 'humanize-duration';
import {Beenhere, Brightness1} from "@material-ui/icons";
import {Checkbox} from "@material-ui/core";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function createData(application) {
    return {
        name: application.applicationName,
        company: application.companyName,
        online: application.online,
        onlineServices: application.onlineServices,
        totalServices: application.totalServices,
        services: application.services,
    };
}

function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow hover className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.applicationName}
                </TableCell>
                <TableCell align="right">{row.companyName}</TableCell>
                <TableCell align="right">{row.online ? "online" : "offline"}</TableCell>
                <TableCell align="right">{row.onlineServices}/{row.totalServices}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={0}>
                            <Table size="small" aria-label="purchases" color="grey">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Restarts</TableCell>
                                        <TableCell align="right">Uptime</TableCell>
                                        {/*<TableCell align="right">Updated</TableCell>*/}
                                        <TableCell align="right">%</TableCell>
                                        <TableCell align="right">Nodes</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.services.map((service) => (
                                        <TableRow key={service.serviceName}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={service.online}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {service.serviceName}
                                            </TableCell>
                                            <TableCell align="right">{service.restarts}</TableCell>
                                            <TableCell
                                                align="right">{humanizeDuration(service.uptime * 1000, {largest: 1})}</TableCell>
                                            {/*<TableCell align="right">{service.updated}</TableCell>*/}
                                            <TableCell align="right">
                                                {Math.round(service.upTicks / (service.downTicks + service.upTicks) * 100)}%
                                            </TableCell>
                                            <TableCell
                                                align="right">{service.nodes && Object.keys(service.nodes).length}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        online: PropTypes.bool.isRequired,
        onlineServices: PropTypes.number.isRequired,
        totalServices: PropTypes.number.isRequired,
        services: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};


export default function CollapsibleTable() {
    const {data: applications} = useSWR('https://uptime-tool.asrr-tech.com/api/v1/uptime/all')

    const rows = applications ? applications.map(application => {
        return createData(application)
    }) : {}

    console.log(applications)

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Application Name</TableCell>
                        <TableCell align="right">Company</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Services</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {applications && applications.map((app) => (
                        <Row key={app.applicationName} row={app}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
