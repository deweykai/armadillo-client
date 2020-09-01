import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import useStyles from '../common/styles';

export default function Layout({ children, home = false }: { children: any, home:any}) {
    const classes = useStyles();
    return (
        <div>
            <Navbar />
            <div className={classes.offset} />
            <div className={classes.root}>
                {!home && <Sidebar />}
                <main className={classes.content}>
                    {children}
                </main>
            </div>
        </div>
    );
};