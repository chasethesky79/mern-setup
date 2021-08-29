import list from './api-user';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        padding: theme.spacing(1),
        margin: theme.spacing(5)
    }),
    title: {
        padding: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
        color: theme.palette.openTitle 
    }
}))

export default function Users() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    useEffect(async () => {
        const abortController = new AbortController();
        const { signal } = abortController;
        try {
           setUsers(await list(signal));
        } catch(error) {
            console.log(error);
        }
        return () => abortController.abort();
    }, []);

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant='h6' className={classes.title}>All Users</Typography>
        </Paper>
    )
}