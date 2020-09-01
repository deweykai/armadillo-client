import React from 'react';
import HomeButton from './homeButton';

const Navbar = () => {
    const title = 'Armadillo';

    return (
        <nav className="flex z-50 h-12 inset-x-0 absolute top-0 inset-x-0 items-center shadow justify-between bg-orange-400">
            <div className="p-4">
                <HomeButton />
            </div>
            <h3 className="p-4">{title}</h3>
            <div />
        </nav>
    );
};

export default Navbar;
