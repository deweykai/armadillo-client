import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Head from 'next/head';

export default function Layout({ children, name, home = false}: { children: any, name: string, home?:any}) {
    return (
        <>
            <Head>
                <title>{name}</title>
            </Head>
            <Navbar title={name} />
            {!home && <Sidebar />}
            <div className="flex mt-12 inset-0">
                {!home && <div className="w-48 flex-none" />}
                <main className="flex-grow">
                    {children}
                </main>
            </div>
        </>
    );
};