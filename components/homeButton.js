import React from 'react';
import Link from 'next/link';

const HomeButton = () => {
    return (
        <Link href='/'>
            <a className="block px-4 py-1 rounded bg-orange-100">Home</a>
        </Link>
    );
};

export default HomeButton;
