import React from 'react';
import Navbar from './navbar';

export default function Layout({ children, home = false }: { children: any, home:Boolean}) {
    return (
        <div>
            <Navbar />
            {home ? "Home" : "Not Home"}
            {children}
        </div>
    );
};