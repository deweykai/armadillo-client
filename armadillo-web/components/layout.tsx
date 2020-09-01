import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

export default function Layout({ children, home = false }: { children: any, home:any}) {
    return (
        <div>
            <Navbar />
            {!home && <Sidebar />}
            <div className="flex mt-12 inset-0">
                {!home && <div className="w-48 flex-none" />}
                <main className="flex-grow">
                    {children}
                </main>
            </div>
        </div>
    );
};