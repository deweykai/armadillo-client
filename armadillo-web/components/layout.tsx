import React from 'react';
import Navbar from './navbar';

export default function Layout({ children, home }: { children: any, home:boolean }) {
    return (
        <div>
            <Navbar />
            {home ? "Home" : "Not Home"}
            {children}
        </div>
    );
};