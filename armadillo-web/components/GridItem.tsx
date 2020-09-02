import React from 'react';

const GridItem = ({children, title}: {children: any, title: string}) => {
    return (
        <div className="p-3 rounded shadow">
            <div className="mb-3">
                <h4 className="text-lg">{title}</h4>
            </div>

            {children}
        </div>
    );
};

export default GridItem;